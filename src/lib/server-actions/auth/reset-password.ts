"use server";

import { authClient } from "@/lib/auth";

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    await authClient.api.resetPassword({
      body: {
        token,
        newPassword,
      },
    });

    return { success: true, message: "Password has been reset successfully." };
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
};
