"use server";

import { prisma } from "@/lib/prisma";
import { authClient } from "@/lib/auth";
import { RegisterSchema } from "@/lib/schema";

export const register = async (input: RegisterSchema) => {
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
      return {
        success: false,
        message: "Account already exists, please login.",
      };
    }

    const { user } = await authClient.api.signUpEmail({
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

      await tx.admin.create({
        data: {
          userId: user.id,
          companyId: newCompany.id,
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
