import { DashboardTab } from "@/app/types/dashboard";
import {
  Users,
  FileText,
  CreditCard,
  LayoutDashboard,
  Settings2,
  Wallet,
  FileSpreadsheet,
  LifeBuoy,
  Send,
  Layers,
  UserCog,
  FileSearch,
} from "lucide-react";

const data = {
  navMain: [
    {
      title:
        DashboardTab.DASHBOARD.charAt(0).toUpperCase() +
        DashboardTab.DASHBOARD.slice(1),
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      title: "Clients",
      url: "/clients",
      icon: Users,
      items: [
        {
          title: "All Clients",
          url: "/clients",
        },
        {
          title: "Add Client",
          url: "/clients/new",
        },
        {
          title: "Client Groups",
          url: "/clients/groups",
        },
      ],
    },
    {
      title: "Invoices",
      url: "/invoices",
      icon: FileText,
      items: [
        {
          title: "All Invoices",
          url: "/invoices",
        },
        {
          title: "Create Invoice",
          url: "/invoices/new",
        },
        {
          title: "Recurring Invoices",
          url: "/invoices/recurring",
        },
        {
          title: "Invoice Templates",
          url: "/invoices/templates",
        },
      ],
    },
    {
      title: "Estimates & Quotes",
      url: "/estimates",
      icon: FileSearch,
      items: [
        {
          title: "All Estimates",
          url: "/estimates",
        },
        {
          title: "Create Estimate",
          url: "/estimates/new",
        },
        {
          title: "Converted to Invoices",
          url: "/estimates/converted",
        },
      ],
    },
    {
      title: "Payments",
      url: "/payments",
      icon: CreditCard,
      items: [
        {
          title: "Transactions",
          url: "/payments",
        },
        {
          title: "Payment Integrations",
          url: "/payments/integrations",
        },
        {
          title: "Refunds",
          url: "/payments/refunds",
        },
      ],
    },
    {
      title: "Taxes & Currency",
      url: "/taxes",
      icon: Wallet,
      items: [
        {
          title: "Tax Settings",
          url: "/taxes/settings",
        },
        {
          title: "Currencies",
          url: "/taxes/currencies",
        },
        {
          title: "Exchange Rates",
          url: "/taxes/rates",
        },
      ],
    },
    {
      title: "Team & Collaboration",
      url: "/team",
      icon: UserCog,
      items: [
        {
          title: "Team Members",
          url: "/team",
        },
        {
          title: "Roles & Permissions",
          url: "/team/roles",
        },
        {
          title: "Activity Log",
          url: "/team/activity",
        },
      ],
    },
    {
      title: "Settings & Customization",
      url: "/settings",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "/settings/general",
        },
        {
          title: "Invoice Branding",
          url: "/settings/branding",
        },
        {
          title: "Notifications",
          url: "/settings/notifications",
        },
        {
          title: "Integrations",
          url: "/settings/integrations",
        },
      ],
    },
  ],

  navSecondary: [
    {
      title: "Reports & Analytics",
      url: "/reports",
      icon: FileSpreadsheet,
    },
    {
      title: "Support",
      url: "/support",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "/feedback",
      icon: Send,
    },
  ],

  projects: [
    {
      name: "Client Projects",
      url: "/projects/clients",
      icon: Layers,
    },
    {
      name: "Internal Finance",
      url: "/projects/finance",
      icon: Wallet,
    },
    {
      name: "Marketing Reports",
      url: "/projects/marketing",
      icon: LayoutDashboard,
    },
  ],
};

export default data;
