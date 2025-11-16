import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import React, { useMemo, useState } from "react";

const MyAccount: React.FC<MyAccountProps> = ({ user }) => {
  const [fullName, setfullName] = React.useState<string | null>(null);
  const [isSaving, setIsSaving] = React.useState(false);

  useMemo(() => {
    if (user) {
      const name = user?.name.split(" ");
      setfullName(name || null);
    }
  }, [user]);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      console.log("Save clicked - implement save logic here", { user });
      // TODO: call save API / server action to persist changes
      // await saveAccountChanges({ ... })
      // show notification on success/failure
    } catch (err) {
      console.error("Error saving account settings:", err);
    } finally {
      setIsSaving(false);
    }
  };

  console.log("MyAccount user prop:", user?.CompanyMember);
  return (
    <div className="flex-1">
      <Card className="mx-10 mt-10 justify-center">
        <div className="border-b px-6 justify-center">
          <nav className="flex gap-3 overflow-x-auto px-4 py-3 justify-center">
            {[
              { id: "profile", label: "Profile" },
              { id: "company", label: "Company" },
              { id: "integrations", label: "Integrations" },
              { id: "security", label: "Security" },
              { id: "billing", label: "Billing" },
            ].map((tab) => (
              <TabButton key={tab.id} id={tab.id} label={tab.label} />
            ))}
          </nav>
        </div>

        <CardContent>
          <TabbedContent user={user} fullName={fullName} />
        </CardContent>
      </Card>

      {/* Fixed bottom-center Save button */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none">
        <div className="max-w-7xl w-full px-4 pointer-events-auto">
          <div className="flex justify-center">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              aria-label="Save account settings"
              className="px-6"
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface MyAccountProps {
  user: any;
}

export default MyAccount;

// Simple tab state and components
const TabButton: React.FC<{ id: string; label: string }> = ({ id, label }) => {
  const [active, setActive] = useState<string | null>(null);
  // read/write active tab from local storage to persist between mounts
  React.useEffect(() => {
    const saved = window.localStorage.getItem("settingsActiveTab");
    setActive(saved || "profile");
  }, []);

  const handleClick = () => {
    setActive(id);
    window.localStorage.setItem("settingsActiveTab", id);
    const evt = new CustomEvent("settings:tab-change", { detail: id });
    window.dispatchEvent(evt);
  };

  const isActive = active === id;

  return (
    <button
      onClick={handleClick}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-accent"
      }`}
    >
      {label}
    </button>
  );
};

const TabbedContent: React.FC<{ user: any; fullName: string | null }> = ({
  user,
  fullName,
}) => {
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined")
      return window.localStorage.getItem("settingsActiveTab") || "profile";
    return "profile";
  });

  React.useEffect(() => {
    const onChange = (e: Event) =>
      setActiveTab((e as CustomEvent).detail as string);
    window.addEventListener("settings:tab-change", onChange as EventListener);
    return () =>
      window.removeEventListener(
        "settings:tab-change",
        onChange as EventListener
      );
  }, []);

  if (activeTab === "company") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border bg-background p-4">
          <h3 className="font-semibold mb-2">Company Information</h3>
          <p className="text-sm text-muted-foreground">
            Configure your company profile and details.
          </p>
        </div>
        <div className="rounded-lg border bg-background p-4">
          <Label className="text-xs text-muted-foreground uppercase mb-2">
            Company name
          </Label>
          <Input
            placeholder={user?.CompanyMember?.company?.name || "Company name"}
          />
        </div>
      </div>
    );
  }

  if (activeTab === "integrations") {
    return (
      <div>
        <h3 className="font-semibold mb-2">Integrations</h3>
        <p className="text-sm text-muted-foreground">
          Connect external services (placeholder).
        </p>
      </div>
    );
  }

  if (activeTab === "security") {
    return (
      <div>
        <h3 className="font-semibold mb-2">Security</h3>
        <p className="text-sm text-muted-foreground">
          Manage passwords, 2FA and sessions.
        </p>
      </div>
    );
  }

  if (activeTab === "billing") {
    return (
      <div>
        <h3 className="font-semibold mb-2">Billing</h3>
        <p className="text-sm text-muted-foreground">
          Payment methods, invoices and subscriptions.
        </p>
      </div>
    );
  }

  // default: profile
  return (
    <div className="space-y-6">
      <div className="rounded-lg border bg-background p-4">
          <h3 className="font-semibold mb-2">Company Information</h3>
          <p className="text-sm text-muted-foreground">
            Configure your company profile and details.
          </p>
        </div>
      <div className="w-44 rounded-lg border bg-background p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar className="size-8">
              <AvatarImage src="/file.svg" alt="avatar" />
              <AvatarFallback>{"U"}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold">{fullName}</div>
              <div className="text-sm text-muted-foreground">Admin</div>
            </div>
          </div>

          <div>
            <Button variant="outline" size="sm" onClick={() => {}}>
              Upload Now
            </Button>
          </div>
        </div>
      </div>

      <form className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label className="text-xs text-muted-foreground uppercase mb-2">
            First name
          </Label>
          <Input name="firstName" placeholder={"Enter first name"} />
        </div>

        <div>
          <Label className="text-xs text-muted-foreground uppercase mb-2">
            Last name
          </Label>
          <Input name="lastName" placeholder={"Enter last name"} />
        </div>

        <div>
          <Label className="text-xs text-muted-foreground uppercase mb-2">
            Email
          </Label>
          <Input
            name="email"
            placeholder={"Enter email address"}
            type="email"
          />
        </div>

        <div>
          <Label className="text-xs text-muted-foreground uppercase mb-2">
            Phone
          </Label>
          <Input name="phone" placeholder={"Enter phone number"} />
        </div>

        <div>
          <Label className="text-xs text-muted-foreground uppercase mb-2">
            Role
          </Label>
          <Input name="role" placeholder={"Enter role"} />
        </div>

        <div>
          <Label className="text-xs text-muted-foreground uppercase mb-2">
            Department
          </Label>
          <Input name="department" placeholder={"Enter department"} />
        </div>
      </form>
    </div>
  );
};
