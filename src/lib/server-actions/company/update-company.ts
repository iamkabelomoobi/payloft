"use server";
import { prisma } from "@/lib/prisma";
import { UpdateCompanySchema } from "@/lib/schema/company/update-company";

export const updateCompany = async (
  companyId: string,
  input: UpdateCompanySchema
) => {
  const { name, industry, website, logo, email, phone, address } = input;
  try {
    const existingCompany = await prisma.company.findUnique({
      where: {
        id: companyId,
      },
    });
    if (!existingCompany) {
      return {
        success: false,
        message: "Company not found",
      };
    }
    
    await prisma.company.update({
      where: {
        id: companyId,
      },
      data: {
        name,
        industry,
        website,
        logo,
        email,
        phone,
        address,
      },
    });
    return {
      success: true,
      message: "Company profile updated successfully.",
    };
  } catch (error) {
    console.error("Error updating company:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
};
