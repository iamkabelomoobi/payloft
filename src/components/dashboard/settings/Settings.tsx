import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import MyProfile from "./MyProfile";
import { Company as CompanyType, User } from "@/generated/prisma";
import Company from "./Company";
import Security from "./Security";

const TABS = [
  { id: "profile", label: "Profile" },
  { id: "company", label: "Company" },
  { id: "integrations", label: "Integrations" },
  { id: "security", label: "Security" },
  { id: "billing", label: "Billing" },
];

const Settings: React.FC<SettingsProps> = ({ user, company }) => {
  const [activeTab, setActiveTab] = useState<string>("profile");

  const renderTabContent = useMemo(() => {
    switch (activeTab) {
      case "profile":
        return <MyProfile admin={user} company={company} />;
      case "company":
        return <Company company={company} />;
      case "security":
        return <Security />;
      default:
        return <MyProfile admin={user} company={company} />;
    }
  }, [activeTab, user, company]);

  return (
    <div className="flex-1">
      <Card className="mx-2 mt-6 sm:mx-6 lg:mx-10">
        {/* NAVIGATION */}
        <div className="border-b px-4">
          <nav
            className="
              flex gap-3 
              overflow-x-auto 
              py-3
              justify-center 
              items-center
              w-full
            "
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    whitespace-nowrap 
                    rounded-full 
                    px-4 
                    py-2 
                    text-sm 
                    font-medium 
                    transition-colors
                    ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent"
                    }
                  `}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* CONTENT */}
        <CardContent className="px-4 py-6">{renderTabContent}</CardContent>
      </Card>
    </div>
  );
};

interface SettingsProps {
  user: User;
  company: CompanyType;
}

export default Settings;
