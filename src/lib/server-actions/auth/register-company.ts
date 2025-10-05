"use server";

import { CompanyRole, MemberStatus } from "@/generated/prisma";
import { authClient } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CompanyRegisterSchema } from "@/lib/schema/auth/company-register.schema";

export const registerCompany = async (input: CompanyRegisterSchema) => {
  const {
    companyName,
    industry,
    website,
    email,
    phone,
    firstName,
    lastName,
    password,
  } = input;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return { success: false, message: "User with this email already exists" };
    }

    const authResult = await authClient.api.signUpEmail({
      body: {
        name: `${firstName} ${lastName}`,
        email,
        password,
        callbackURL: "/dashboard",
      },
    });

    await prisma.$transaction(async (tx) => {
      const newCompany = await tx.company.create({
        data: {
          name: companyName,
          industry,
          website,
          phone,
        },
      });

      await tx.companyMember.create({
        data: {
          userId: authResult.user.id,
          companyId: newCompany.id,
          status: MemberStatus.ACTIVE,
          role: CompanyRole.ADMIN,
        },
      });

      return newCompany;
    });

    return {
      success: true,
      message: "Account created successfully.",
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return { success: false, message: errorMessage };
  }
};
