import { z } from "zod";

export const updatePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { message: "Current password is required" }),

    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, and one number",
      }),

    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your new password" }),
  })
  .superRefine(({ currentPassword, newPassword, confirmPassword }, ctx) => {
    if (currentPassword === newPassword) {
      ctx.addIssue({
        path: ["newPassword"],
        code: "custom",
        message: "New password cannot match your current password",
      });
    }

    if (newPassword !== confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        code: "custom",
        message: "Passwords do not match",
      });
    }
  });

export type UpdatePasswordSchema = z.infer<typeof updatePasswordSchema>;
