import React from "react";

interface TabButtonProps {
  id: string;
  label: string;
  activeTab: string;
  onChange: (id: string) => void;
}

const TabButton: React.FC<TabButtonProps> = ({
  id,
  label,
  activeTab,
  onChange,
}) => {
  const isActive = activeTab === id;
  return (
    <button
      onClick={() => onChange(id)}
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
