"use client";
import { AppSidebar } from "@/components/app-sidebar";
import Dashboard from "@/components/dashboard/Dashboard";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Company, User } from "@/generated/prisma";
import { getProfile } from "@/lib/server-actions/profile/get-profile";
import { redirect } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { DashboardTab } from "../types/dashboard";
import Settings from "@/components/dashboard/settings/Settings";
import { CompanyProvider } from "@/context/company-context";
import { ProfileProvider } from "@/context/profile-context";

const DashboardPage = () => {
  const [user, setUser] = useState<Partial<
    User & { phone?: string | null }
  > | null>(null);
  const [company, setCompany] = useState<Partial<Company> | null>(null);
  const [activeTab, setActiveTab] = useState<DashboardTab>(
    DashboardTab.DASHBOARD
  );

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getProfile();

      if (!response.success) {
        redirect("/auth/login");
      }
      setUser(
        response?.data?.user
          ? { ...response.data.user, phone: response.data.phone }
          : null
      );
      setCompany(response?.data?.company ?? null);
    };
    fetchUser();
  }, []);

  const renderTab = useMemo(() => {
    switch (activeTab) {
      case DashboardTab.DASHBOARD:
        return <Dashboard />;
      case DashboardTab.ACCOUNT:
        return <Settings user={user as User} company={company as Company} />;
      default:
        return <Dashboard />;
    }
  }, [activeTab, user, company]);

  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <ProfileProvider user={user} setUser={setUser}>
          <CompanyProvider company={company} setCompany={setCompany}>
            <div className="flex flex-1">
              <AppSidebar
                user={user}
                company={company}
                setActiveTab={setActiveTab}
              />
              <SidebarInset>{renderTab}</SidebarInset>
            </div>
          </CompanyProvider>
        </ProfileProvider>
      </SidebarProvider>
    </div>
  );
};

export default DashboardPage;
