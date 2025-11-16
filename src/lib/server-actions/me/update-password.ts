"use server";

import { authClient } from "@/lib/auth";
import { UpdatePasswordSchema } from "@/lib/schema/profile/update-password";

export const updatePassword = async (input: UpdatePasswordSchema) => {
  const { currentPassword, newPassword } = input;
  try {
    await authClient.api.changePassword({
      body: {
        currentPassword,
        newPassword,
      },
    });

    return { success: true, message: "Password updated successfully." };
  } catch (error) {
    console.error("Error in updatePassword:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
};
