"use server";

import { prisma } from "@/lib/prisma";
import { UpdateProfile } from "@/lib/schema/profile/update-profile";

export const updateProfile = async (userId: string, input: UpdateProfile) => {
  const { firstName, lastName, email, phone } = input;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!existingUser) {
      return {
        success: false,
        message: "User not found",
      };
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        name: `${firstName} ${lastName}`,
        email,
      },
    });

    await prisma.admin.updateMany({
      where: { userId },
      data: {
        phone,
      },
    });

    return {
      success: true,
      message: "Profile updated successfully.",
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
};
