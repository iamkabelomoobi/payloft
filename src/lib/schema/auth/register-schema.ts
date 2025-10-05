import { z } from "zod";

export const userRegisterSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(50, { message: "First name must be at most 50 characters" })
    .regex(/^[A-Za-z\s'-]+$/, {
      message:
        "First name can only contain letters, spaces, hyphens, and apostrophes",
    }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(50, { message: "Last name must be at most 50 characters" })
    .regex(/^[A-Za-z\s'-]+$/, {
      message:
        "Last name can only contain letters, spaces, hyphens, and apostrophes",
    }),
  email: z.email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(10, { message: "Phone number must be at most 10 digits" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    }),
});

export type UserRegisterSchema = z.infer<typeof userRegisterSchema>;
