"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";

import { Company as ICompany } from "@/generated/prisma";
import { getCompany, updateCompany } from "@/lib/server-actions";
import {
  UpdateCompanySchema,
  updateCompanySchema,
} from "@/lib/schema/company/update-company";
import { useCompany } from "@/context/company-context";

interface CompanyProps {
  company?: ICompany | null;
}

const fields = [
  {
    name: "name",
    label: "Company name",
    placeholder: "Enter company name...",
    type: "text" as const,
  },
  {
    name: "industry",
    label: "Industry",
    placeholder: "Enter industry...",
    type: "text" as const,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter email",
    type: "email" as const,
  },
  {
    name: "phone",
    label: "Phone Number",
    placeholder: "Enter phone number",
    type: "tel" as const,
  },
  {
    name: "address",
    label: "Address",
    placeholder: "Enter address",
    type: "text" as const,
  },
  {
    name: "website",
    label: "Website",
    placeholder: "Enter website",
    type: "text" as const,
  },
] as const;

const Company: React.FC<CompanyProps> = ({ company }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading] = useState<boolean>(false);
  const [localCompany, setLocalCompany] = useState<ICompany | null>(
    company ?? null
  );

  const { setCompany: setGlobalCompany } = useCompany();

  const { register, handleSubmit, reset } = useForm<UpdateCompanySchema>({
    resolver: zodResolver(updateCompanySchema),
    defaultValues: {
      name: localCompany?.name ?? "",
      industry: localCompany?.industry ?? "",
      email: localCompany?.email ?? "",
      phone: localCompany?.phone ?? "",
      address: localCompany?.address ?? "",
      website: localCompany?.website ?? "",
      logo: localCompany?.logo ?? undefined,
    },
  });

  useEffect(() => {
    setLocalCompany(company ?? null);
  }, [company]);

  // Whenever localCompany changes, sync form values
  useEffect(() => {
    reset({
      name: localCompany?.name ?? "",
      industry: localCompany?.industry ?? "",
      email: localCompany?.email ?? "",
      phone: localCompany?.phone ?? "",
      address: localCompany?.address ?? "",
      website: localCompany?.website ?? "",
      logo: localCompany?.logo ?? undefined,
    });
  }, [localCompany, reset]);

  const onSubmit = async (data: UpdateCompanySchema) => {
    const companyId = localCompany?.id ?? company?.id;
    if (!companyId) {
      toast.error("Company ID not found");
      return;
    }

    try {
      setIsSaving(true);

      const result = await updateCompany(companyId, data);

      if (!result || !result.success) {
        toast.error(result?.message ?? "Failed to update company");
        return;
      }

      const refreshed = await getCompany(companyId);
      const refreshedCompany =
        refreshed && typeof refreshed === "object" && "data" in refreshed
          ? (refreshed.data as ICompany)
          : null;

      setLocalCompany(refreshedCompany);

      try {
        setGlobalCompany(refreshedCompany);
      } catch (e) {
        console.warn("Failed to set global company", e);
      }

      reset({
        name: refreshedCompany?.name ?? data.name,
        industry: refreshedCompany?.industry ?? data.industry,
        email: refreshedCompany?.email ?? data.email,
        phone: refreshedCompany?.phone ?? data.phone,
        address: refreshedCompany?.address ?? data.address,
        website: refreshedCompany?.website ?? data.website,
        logo: refreshedCompany?.logo ?? data.logo,
      });

      toast.success("Company updated successfully");
    } catch (err) {
      console.error("Error saving company", err);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <form
        id="Company-form"
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        {fields.map((field) => {
          const currentValue =
            (localCompany as never)?.[field.name] ?? field.placeholder;

          return (
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
                    placeholder={currentValue}
                  />
                </>
              )}
            </div>
          );
        })}

        <div className="col-span-1 mt-4 flex justify-center md:col-span-2">
          <Button
            type="submit"
            form="Company-form"
            disabled={isSaving}
            className="px-6"
            aria-label="Save profile"
          >
            {isSaving ? <Loader2 className="size-4 animate-spin" /> : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Company;
