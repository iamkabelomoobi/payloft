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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import {
  companyRegisterSchema,
  CompanyRegisterSchema,
} from "@/lib/schema/auth/company-register.schema";
import { registerCompany } from "@/lib/server-actions/auth/register-company";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function DisplayRegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    reset,
  } = useForm<CompanyRegisterSchema>({
    resolver: zodResolver(companyRegisterSchema),
    defaultValues: {
      companyName: "",
      industry: "",
      website: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (data: CompanyRegisterSchema) => {
    setIsSubmitting(true);
    try {
      const response = await registerCompany(data);

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
      console.log("Error during registration:", error);
      const errorMessage = "An unexpected error occurred. Please try again.";
      setError("root", { message: errorMessage });
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
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Create an account to get started with our services.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="firstName">First Name</FieldLabel>
            <Input
              id="firstName"
              type="text"
              placeholder="John"
              {...register("firstName")}
              required
              aria-invalid={!!errors.firstName}
              aria-describedby={
                errors.firstName ? "firstName-error" : undefined
              }
            />
            {errors.firstName && (
              <span id="firstName-error" className="text-red-500 text-xs">
                {errors.firstName.message}
              </span>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
            <Input
              id="lastName"
              type="text"
              placeholder="Doe"
              {...register("lastName")}
              required
              aria-invalid={!!errors.lastName}
              aria-describedby={errors.lastName ? "lastName-error" : undefined}
            />
            {errors.lastName && (
              <span id="lastName-error" className="text-red-500 text-xs">
                {errors.lastName.message}
              </span>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="admin@example.com"
              {...register("email")}
              required
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <span id="email-error" className="text-red-500 text-xs">
                {errors.email.message}
              </span>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="phone">Phone</FieldLabel>
            <Input
              id="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              {...register("phone")}
              required
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
            {errors.phone && (
              <span id="phone-error" className="text-red-500 text-xs">
                {errors.phone.message}
              </span>
            )}
          </Field>
        </div>

        <div className="space-y-4">
          <Field>
            <FieldLabel htmlFor="companyName">Company Name</FieldLabel>
            <Input
              id="companyName"
              type="text"
              placeholder="Acme Corp"
              {...register("companyName")}
              required
              aria-invalid={!!errors.companyName}
              aria-describedby={
                errors.companyName ? "companyName-error" : undefined
              }
            />
            {errors.companyName && (
              <span id="companyName-error" className="text-red-500 text-xs">
                {errors.companyName.message}
              </span>
            )}
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field>
              <FieldLabel htmlFor="industry">Industry</FieldLabel>
              <Input
                id="industry"
                type="text"
                placeholder="Technology"
                {...register("industry")}
                required
                aria-invalid={!!errors.industry}
                aria-describedby={
                  errors.industry ? "industry-error" : undefined
                }
              />
              {errors.industry && (
                <span id="industry-error" className="text-red-500 text-xs">
                  {errors.industry.message}
                </span>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="website">Website (Optional)</FieldLabel>
              <Input
                id="website"
                type="url"
                placeholder="https://example.com"
                {...register("website")}
                aria-invalid={!!errors.website}
                aria-describedby={errors.website ? "website-error" : undefined}
              />
              {errors.website && (
                <span id="website-error" className="text-red-500 text-xs">
                  {errors.website.message}
                </span>
              )}
            </Field>
          </div>

          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              required
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
            />
            {errors.password && (
              <span id="password-error" className="text-red-500 text-xs">
                {errors.password.message}
              </span>
            )}
          </Field>
        </div>

        {errors.root && (
          <div className="text-red-500 text-sm text-center">
            {errors.root.message}
          </div>
        )}

        <Field>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "Register"
            )}
          </Button>
        </Field>

        <FieldSeparator></FieldSeparator>
        <Field>
          {/* <Button variant="outline" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                fill="currentColor"
              />
            </svg>
            Login with GitHub
          </Button> */}
          <FieldDescription className="text-center">
            Already have an account?{" "}
            <a href="/auth/login" className="underline underline-offset-4">
              Login
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
