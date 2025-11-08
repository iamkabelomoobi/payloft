"use client";
import { AppSidebar } from "@/components/app-sidebar";
import Dashboard from "@/components/dashboard/Dashboard";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Company, User } from "@/generated/prisma";
import { getMe } from "@/lib/server-actions/me/get-me";
import { redirect } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { DashboardTab } from "../types/dashboard";

const DashboardPage = () => {
  const [user, setUser] = useState<Partial<User> | null>(null);
  const [company, setCompany] = useState<Partial<Company> | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTab, setActiveTab] = useState<DashboardTab>(
    DashboardTab.ACCOUNT
  );

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getMe();
      if (!response.success) {
        redirect("/auth/login");
      }
      setUser(response?.data?.user ?? null);
      setCompany(response?.data?.company ?? null);
    };
    fetchUser();
  }, []);

  const renderTab = useMemo(() => {
    switch (activeTab) {
      case DashboardTab.DASHBOARD:
        return <Dashboard />;
      default:
        return <Dashboard />;
    }
  }, [activeTab]);

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar user={user} company={company} />
          <SidebarInset>{renderTab}</SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
};

export default DashboardPage;
