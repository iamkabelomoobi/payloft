"use client";
import React, { createContext, useContext } from "react";
import { Company } from "@/generated/prisma";

type CompanyState = Partial<Company> | null;
type CompanySetter = React.Dispatch<React.SetStateAction<CompanyState>>;

type CompanyContextType = {
  company: CompanyState;
  setCompany: CompanySetter;
};

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider = ({
  company,
  setCompany,
  children,
}: {
  company: CompanyState;
  setCompany: CompanySetter;
  children: React.ReactNode;
}) => {
  return (
    <CompanyContext.Provider value={{ company, setCompany }}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = (): CompanyContextType => {
  const ctx = useContext(CompanyContext);
  if (!ctx) {
    throw new Error("useCompany must be used within a CompanyProvider");
  }
  return ctx;
};
