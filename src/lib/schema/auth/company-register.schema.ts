import { z } from "zod";
import { userRegisterSchema } from "./register-schema";

export const companyRegisterSchema = z.object({
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
  ...userRegisterSchema.shape,
});

export type CompanyRegisterSchema = z.infer<typeof companyRegisterSchema>;
