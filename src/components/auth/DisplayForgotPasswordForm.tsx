"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { forgotPasswordSchema } from "@/lib/schema/auth/forgot-password.schema";
import { useState } from "react";

export function DisplayForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [form, setForm] = useState({ email: "" });
  const [errors, setErrors] = useState<{ email?: string }>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.id]: undefined }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = forgotPasswordSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: { email?: string } = {};
      result.error.issues.forEach((err) => {
        if (err.path[0] === "email") fieldErrors.email = err.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    // TODO: handle successful forgot password (call API, etc.)
  }

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Recover Your Password</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to recover your password
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="company@example.com"
            value={form.email}
            onChange={handleChange}
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <span id="email-error" className="text-red-500 text-xs">
              {errors.email}
            </span>
          )}
        </Field>
        <Field>
          <Button type="submit">Send Reset Link</Button>
        </Field>
      </FieldGroup>
    </form>
  );
}
