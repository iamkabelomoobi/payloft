"use server";
import { headers } from "next/headers";
import { authClient } from "@/lib/auth";

export const logOut = async () => {
  try {
    await authClient.api.signOut({ headers: await headers() });

    return { success: true, message: "Logout successful" };
  } catch (error) {
    console.error("Logout Error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return { success: false, message: errorMessage };
  }
};
