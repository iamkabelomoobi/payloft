"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { resetPasswordSchema } from "@/lib/schema/auth/reset-password.schema";
import { useState } from "react";

export function DisplayResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
  const [errors, setErrors] = useState<{
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.id]: undefined }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = resetPasswordSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: { newPassword?: string; confirmPassword?: string } =
        {};
      result.error.issues.forEach((err) => {
        if (err.path[0] === "newPassword")
          fieldErrors.newPassword = err.message;
        if (err.path[0] === "confirmPassword")
          fieldErrors.confirmPassword = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    // TODO: handle successful password reset
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Reset Your Password</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Get back into your account by resetting your password.
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
          <Input
            id="newPassword"
            type="password"
            placeholder="Enter new password"
            value={form.newPassword}
            onChange={handleChange}
            required
            aria-invalid={!!errors.newPassword}
            aria-describedby={
              errors.newPassword ? "newPassword-error" : undefined
            }
          />
          {errors.newPassword && (
            <span id="newPassword-error" className="text-red-500 text-xs">
              {errors.newPassword}
            </span>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={
              errors.confirmPassword ? "confirmPassword-error" : undefined
            }
          />
          {errors.confirmPassword && (
            <span id="confirmPassword-error" className="text-red-500 text-xs">
              {errors.confirmPassword}
            </span>
          )}
        </Field>
        <Field>
          <Button type="submit">Reset Password</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
