import { z } from "zod";

export const updateCompanySchema = z.object({
  name: z.string().min(1, { message: "Company name is required" }),
  industry: z.string().min(1, { message: "Industry is required" }),
  website: z.url({ message: "Invalid URL" }).nullable().optional(),
  logo: z.url({ message: "Invalid URL" }).nullable().optional(),
  email: z.email({ message: "Invalid email address" }).nullable().optional(),
  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .nullable()
    .optional(),
  address: z
    .string()
    .min(1, { message: "Address is required" })
    .nullable()
    .optional(),
});

export type UpdateCompanySchema = z.infer<typeof updateCompanySchema>;
