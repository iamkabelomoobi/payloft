"use server";

import { authClient } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/lib/schema";

export const logIn = async (input: LoginSchema) => {
  const { email, password, rememberMe } = input;
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (!existingUser) {
      return {
        success: false,
        message: "Invalid username or password.",
      };
    }

    const result = await authClient.api.signInEmail({
      body: {
        email,
        password,
        rememberMe,
        callbackURL: "/dashboard",
      },
    });

    return {
      success: true,
      message: "Login successful",
      result,
    };
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Internal Server Error";
    return { success: false, message: errorMessage };
  }
};

export const logInSocial = async (provider: "google" | "github") => {
  try {
    const { url } = await authClient.api.signInSocial({
      body: {
        provider,
        callbackURL: "/dashboard",
      },
    });

    return { success: true, url };
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : `Error authenticating with provider ${provider}.`;
    return { success: false, message: errorMessage };
  }
};
