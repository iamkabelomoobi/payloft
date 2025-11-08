"use server";

import { authClient } from "@/lib/auth";
import { ResetPasswordSchema } from "@/lib/schema";

export const resetPassword = async (input: ResetPasswordSchema) => {
  const { token, newPassword } = input;
  try {
    await authClient.api.resetPassword({
      body: {
        newPassword,
        token
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
