import { z } from "zod";

export const registerSchema = z.object({
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
  companyName: z
    .string()
    .min(3, { message: "Company name must be at least 3 characters" })
    .max(100, { message: "Company name must be at most 100 characters" })
    .regex(/^[A-Za-z0-9\s&.,-]+$/, {
      message:
        "Company name can only contain letters, numbers, spaces, and basic punctuation",
    }),
  industry: z
    .string()
    .min(3, { message: "Industry must be at least 3 characters" })
    .max(100, { message: "Industry must be at most 100 characters" }),
  website: z
    .url({ message: "Please enter a valid website URL" })
    .optional()
    .or(z.literal("")),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    }),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
