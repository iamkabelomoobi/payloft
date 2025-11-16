"use client";

import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import React, { useEffect, useMemo, useState } from "react";
import { Company, User } from "@/generated/prisma";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  UpdateProfile as UpdateProfileType,
  updateProfile as updateProfileSchema,
} from "@/lib/schema/profile/update-profile";
import { updateProfile, getProfile } from "@/lib/server-actions";
import { useProfile } from "@/context/profile-context";
import { useCompany } from "@/context/company-context";

interface MyProfileProps {
  admin?: (User & { phone?: string | null }) | null;
  company?: Company | null;
}

const profileFields: {
  name: keyof UpdateProfileType;
  label: string;
  type?: string;
  getPlaceholder: (args: {
    fullNames: [string, string];
    admin?: (User & { phone?: string | null }) | null;
  }) => string;
}[] = [
  {
    name: "firstName",
    label: "First name",
    getPlaceholder: ({ fullNames }) => fullNames[0] || "Enter first name...",
  },
  {
    name: "lastName",
    label: "Last name",
    getPlaceholder: ({ fullNames }) => fullNames[1] || "Enter last name...",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    getPlaceholder: ({ admin }) => admin?.email ?? "Enter email",
  },
  {
    name: "phone",
    label: "Phone Number",
    getPlaceholder: ({ admin }) => admin?.phone ?? "Enter phone number",
  },
];

const MyProfile: React.FC<MyProfileProps> = ({ admin, company }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUser } = useProfile();
  const { setCompany } = useCompany();

  useEffect(() => {
    setIsLoading(true);

    if (
      !admin ||
      Object.keys(admin).length === 0 ||
      !company ||
      Object.keys(company).length === 0
    ) {
      return;
    }

    setIsLoading(false);
  }, [admin, company]);

  const fullNames = useMemo<[string, string]>(() => {
    const name = admin?.name;
    if (!name || typeof name !== "string") return ["", ""];
    const parts = name.split(" ").filter(Boolean);

    if (parts.length === 0) return ["", ""];
    if (parts.length === 1) return [parts[0], ""];
    return [parts[0], parts.slice(1).join(" ")];
  }, [admin]);

  const { register, handleSubmit, reset } = useForm<UpdateProfileType>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      firstName: fullNames[0] ?? "",
      lastName: fullNames[1] ?? "",
      email: admin?.email ?? "",
      phone: admin?.phone ?? "",
    },
  });

  useEffect(() => {
    reset({
      firstName: fullNames[0] ?? "",
      lastName: fullNames[1] ?? "",
      email: admin?.email ?? "",
      phone: admin?.phone ?? "",
    });
  }, [admin, fullNames, reset]);

  const onSubmit = async (data: UpdateProfileType) => {
    const userId = admin?.id;
    if (!userId) {
      toast.error("User id not found");
      return;
    }

    try {
      setIsSaving(true);
      const result = await updateProfile(userId, data);

      if (!result || !result.success) {
        toast.error(result?.message ?? "Failed to update profile");
        return;
      }

      const refreshed = await getProfile();
      const adminData =
        refreshed && typeof refreshed === "object" && "data" in refreshed
          ? refreshed.data
          : null;

      const user = adminData?.user;
      const phone = adminData?.phone;

      try {
        setUser(user ?? null);
      } catch (e) {
        console.warn("Failed to set global user", e);
      }

      try {
        setCompany(adminData?.company ?? null);
      } catch (e) {
        console.warn("Failed to set global company", e);
      }

      const nameParts = user?.name?.split(" ") ?? ["", ""];
      const firstName = nameParts[0];
      const lastName = nameParts.slice(1).join(" ");

      reset({
        firstName: firstName ?? "",
        lastName: lastName ?? "",
        email: user?.email ?? "",
        phone: phone ?? "",
      });

      toast.success("Profile updated successfully");
    } catch (err) {
      console.error("Error updating profile", err);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <form
        id="myprofile-form"
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        {profileFields.map((field) => (
          <div key={field.name}>
            {isLoading ? (
              <Skeleton className="h-12 w-full" />
            ) : (
              <>
                <Label className="mb-2 text-xs uppercase text-muted-foreground">
                  {field.label}
                </Label>
                <Input
                  {...register(field.name)}
                  type={field.type ?? "text"}
                  placeholder={field.getPlaceholder({ fullNames, admin })}
                />
              </>
            )}
          </div>
        ))}

        <div>
          {isLoading ? (
            <Skeleton className="h-12 w-full" />
          ) : (
            <>
              <Label className="mb-2 text-xs uppercase text-muted-foreground">
                Role
              </Label>
              <Input name="role" placeholder={admin?.role ?? "Enter role"} />
            </>
          )}
        </div>

        <div>
          {isLoading ? (
            <Skeleton className="h-12 w-full" />
          ) : (
            <>
              <Label className="mb-2 text-xs uppercase text-muted-foreground">
                Department
              </Label>
              <Input name="department" placeholder="Enter department" />
            </>
          )}
        </div>

        <div className="col-span-1 mt-4 flex justify-center md:col-span-2">
          <Button
            type="submit"
            form="myprofile-form"
            disabled={isSaving}
            className="px-6"
            aria-label="Save profile"
          >
            {isSaving ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MyProfile;
