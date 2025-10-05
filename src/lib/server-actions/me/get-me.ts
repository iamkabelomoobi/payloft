"use server";

import { authClient } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

export const getMe = async () => {
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

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      include: {
        accounts: true,
        sessions: true,
        CompanyMember: {
          include: { company: true },
        },
      },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    return {
      success: true,
      data: user,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
};
