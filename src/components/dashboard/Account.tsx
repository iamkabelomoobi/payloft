"use client";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  CircleUserRound,
  User,
  CreditCard,
  Link as LinkIcon,
  Languages,
  Lock,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Settings from "./account/Settings";
import { User as UserType } from "@/generated/prisma";

const navigationItems = [
  { id: "general", label: "General", icon: CircleUserRound },
  { id: "account", label: "Account", icon: User },
  { id: "payment", label: "Payment Method", icon: CreditCard },
  { id: "link", label: "Link Account", icon: LinkIcon },
  { id: "language", label: "Language", icon: Languages },
  { id: "password", label: "Password", icon: Lock },
  { id: "notification", label: "Notification", icon: Bell },
];

const Account: React.FC<AccountProps> = ({ user }) => {
  const [activeNav, setActiveNav] = useState("general");

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">My Account</h1>
        <p className="text-sm text-muted-foreground">My Account &gt; General</p>
      </div>

      <div className="flex gap-6">
        {/* Left Navigation Sidebar */}
        <div className="w-64 shrink-0">
          <Card className="p-2">
            <nav className="flex flex-col gap-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveNav(item.id)}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors text-left",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    <Icon className="size-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </Card>
        </div>

        {/* Main Content Area */}
        <Settings user={user} />
      </div>
    </div>
  );
};

interface AccountProps {
  user: UserType | null;
}

export default Account;
