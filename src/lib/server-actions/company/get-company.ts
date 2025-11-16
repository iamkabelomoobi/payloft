"use server";
import { prisma } from "@/lib/prisma";

export const getCompany = async (companyId: string) => {
  try {
    const existingCompany = await prisma.company.findFirst({
      where: {
        id: companyId,
      },
    });
    if (!existingCompany) {
      return {};
    }

    return {
      success: true,
      data: existingCompany,
    };
  } catch (error) {
    console.error("Error getting company:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
};
