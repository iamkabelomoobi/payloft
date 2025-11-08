import { z } from "zod";

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
const PASSWORD_MIN_LENGTH_MESSAGE = "Password must be at least 8 characters";
const PASSWORD_COMPLEXITY_MESSAGE =
  "Password must contain at least one uppercase letter, one lowercase letter, and one number";

export const resetPasswordSchema = z.object({
  token: z.jwt({}).min(1, { message: "Token is required" }),
  newPassword: z
    .string()
    .min(PASSWORD_MIN_LENGTH, { message: PASSWORD_MIN_LENGTH_MESSAGE })
    .regex(PASSWORD_REGEX, {
      message: PASSWORD_COMPLEXITY_MESSAGE,
    }),
});

export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
