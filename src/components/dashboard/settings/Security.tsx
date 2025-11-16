"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { updatePassword } from "@/lib/server-actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UpdatePasswordSchema,
  updatePasswordSchema,
} from "@/lib/schema/profile/update-password";

interface SecurityField {
  id: "currentPassword" | "newPassword" | "confirmPassword";
  label: string;
  grid?: string;
  placeholder: string;
}

const fields: SecurityField[] = [
  {
    id: "currentPassword",
    label: "Current Password",
    placeholder: "Enter current password",
  },
  {
    id: "newPassword",
    label: "New Password",
    placeholder: "Enter new password",
  },
  {
    id: "confirmPassword",
    label: "Confirm New Password",
    placeholder: "Confirm new password",
    grid: "md:col-span-2",
  },
];

const Security: React.FC = () => {
  const [isLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UpdatePasswordSchema>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSave = async (data: UpdatePasswordSchema) => {
    try {
      const result = await updatePassword(data);

      if (!result || !result.success) {
        toast.error(result?.message ?? "Failed to update password");
        return;
      }

      toast.success("Password updated successfully!");
      reset();
    } catch (err) {
      console.error("Password update error", err);
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-lg border bg-background p-4">
        <h3 className="font-semibold mb-2">Security</h3>
        <p className="text-sm text-muted-foreground">
          Update your password to keep your account secure.
        </p>
      </div>

      <form
        id="security-form"
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
        onSubmit={handleSubmit(handleSave)}
      >
        {fields.map((field) => {
          const fieldError = errors[field.id as keyof UpdatePasswordSchema];

          return (
            <div key={field.id} className={field.grid ? field.grid : ""}>
              {isLoading ? (
                <Skeleton className="h-12 w-full" />
              ) : (
                <>
                  <Label
                    htmlFor={field.id}
                    className="text-xs text-muted-foreground uppercase mb-2"
                  >
                    {field.label}
                  </Label>
                  <Input
                    id={field.id}
                    type="password"
                    placeholder={field.placeholder}
                    {...register(field.id as keyof UpdatePasswordSchema)}
                  />
                  {fieldError && (
                    <div className="text-xs text-destructive mt-1">
                      {String(fieldError.message)}
                    </div>
                  )}
                </>
              )}
            </div>
          );
        })}

        <div className="col-span-1 md:col-span-2 mt-4 flex justify-center">
          <Button
            type="submit"
            form="security-form"
            disabled={isSubmitting}
            className="px-6"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Security;
