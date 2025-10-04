import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Company name must be at least 3 characters" })
    .max(100, { message: "Company name must be at most 100 characters" })
    .regex(/^[A-Za-z ]+$/, {
      message: "Company name can only contain letters and spaces",
    }),
  email: z.email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
  industry: z
    .string()
    .min(3, { message: "Industry must be at least 3 characters" })
    .max(100, { message: "Industry must be at most 100 characters" }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
