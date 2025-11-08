"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  forgotPasswordSchema,
  ForgotPasswordSchema,
} from "@/lib/schema/auth/forgot-password.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import { forgotPassword } from "@/lib/server-actions/auth/forgot-password";
import { Loader2 } from "lucide-react";

export function DisplayForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordSchema) => {
    setIsSubmitting(true);
    try {
      const response = await forgotPassword({ email: data.email });

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
      reset();
    } catch (error) {
      console.log("Error when sending forgot password linku:", error);
      const errorMessage = "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      {...props}
      onSubmit={handleSubmit(onSubmit)}
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
            {...register("email")}
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <span id="email-error" className="text-red-500 text-xs">
              {errors.email.message as string}
            </span>
          )}
        </Field>
        <Field>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "Send Reset Link"
            )}
          </Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Remember Password?{" "}
            <a
              href="/auth/login"
              className="ml-auto text-sm underline hover:underline"
            >
              Sign in
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
