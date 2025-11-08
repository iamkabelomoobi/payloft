"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { logIn } from "@/lib/server-actions/auth/login";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, loginSchema } from "@/lib/schema/auth/login.schema";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export function DisplayLoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
  });

  const router = useRouter();

  const onSubmit = async (data: LoginSchema) => {
    try {
      const response = await logIn({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe ?? false,
      });

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      toast.success(response.message);
      reset();
      try {
        router.refresh();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {}
    } catch (error) {
      console.log("Error during login:", error);
      const errorMessage = "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
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
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email")}
            required
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
          />
          {errors.email && (
            <span id="email-error" className="text-red-500 text-xs">
              {errors.email?.message as string}
            </span>
          )}
        </Field>
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <div className="relative w-full">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              required
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              className="pr-10"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center p-1 text-muted-foreground hover:text-foreground"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && (
            <span id="password-error" className="text-red-500 text-xs">
              {errors.password?.message as string}
            </span>
          )}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="rounded border-gray-300"
              />
              Remember me
            </label>
            <a
              href="/auth/forgot-password"
              className="text-sm underline hover:underline"
            >
              Forgot your password?
            </a>
          </div>
        </Field>
        <Field>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "Login"
            )}
          </Button>
        </Field>
        <FieldSeparator></FieldSeparator>
        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <a
              href="/auth/register"
              className="ml-auto text-sm underline hover:underline"
            >
              Sign up
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
