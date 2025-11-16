"use client";
import React, { useState } from "react";

const TabButton: React.FC<{ id: string; label: string }> = ({ id, label }) => {
  const [active, setActive] = useState<string | null>(null);
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

export default TabButton;
