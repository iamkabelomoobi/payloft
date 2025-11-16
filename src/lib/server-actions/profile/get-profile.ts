"use server";

import { authClient } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export const getProfile = async () => {
  try {
    const session = await authClient.api.getSession({
      headers: await headers(),
    });
    if (!session?.user?.id) {
      return {
        success: false,
        message: "Not authenticated",
      };
    }

    const admin = await prisma.admin.findFirst({
      where: {
        userId: session.user.id,
      },
      include: {
        user: {
          select: {
            id: true,
            image: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        company: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            address: true,
            industry: true,
            website: true,
            logo: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!admin) {
      return {
        success: false,
        message: "Admin not found",
      };
    }

    return {
      success: true,
      data: admin,
    };
  } catch (error) {
    console.error("Error fetching admin:", error);
    return {
      success: false,
      message: "Internal server error",
    };
  }
};
