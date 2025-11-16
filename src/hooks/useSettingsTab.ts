import { useState, useEffect } from "react";

export function useSettingsTab(defaultTab = "profile") {
  const [activeTab, setActiveTab] = useState<string>(
    () => window.localStorage.getItem("settingsActiveTab") || defaultTab
  );

  useEffect(() => {
    window.localStorage.setItem("settingsActiveTab", activeTab);
    window.dispatchEvent(
      new CustomEvent("settings:tab-change", { detail: activeTab })
    );
  }, [activeTab]);

  return [activeTab, setActiveTab] as const;
}
