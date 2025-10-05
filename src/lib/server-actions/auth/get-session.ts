"use server";

import { headers } from "next/headers";
import { authClient } from "@/lib/auth";

export interface UserSession {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  emailVerified: boolean;
  name: string | null;
  image?: string | null;
}

export async function getSession(): Promise<{ user: UserSession | null }> {
  try {
    const session = await authClient.api.getSession({
      headers: await headers(),
    });

    return { user: session?.user || null };
  } catch (error) {
    console.error("Error fetching session:", error);
    return { user: null };
  }
}