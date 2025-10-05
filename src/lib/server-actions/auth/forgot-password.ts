"use server";

import { authClient } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const forgotPassword = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return {
        success: true,
        message: "If your email exists, a password reset link has been sent.",
      };
    }

    await authClient.api.forgetPassword({
      body: {
        email,
        redirectTo: "/auth/reset-password",
      },
    });

    return {
      success: true,
      message: "If your email exists, a password reset link has been sent.",
    };
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
};
