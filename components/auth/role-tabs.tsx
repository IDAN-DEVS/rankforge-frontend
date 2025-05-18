"use client";

import { motion } from "motion/react";
import { UserRole } from "@/lib/validations/auth";

interface RoleTabsProps {
  selectedRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export function RoleTabs({ selectedRole, onRoleChange }: RoleTabsProps) {
  return (
    <div className="flex w-full rounded-full p-1 bg-gray-100">
      <TabButton
        isActive={selectedRole === "contributor"}
        onClick={() => onRoleChange("contributor")}
        label="Contributor"
      />
      <TabButton
        isActive={selectedRole === "admin"}
        onClick={() => onRoleChange("admin")}
        label="Admin"
      />
    </div>
  );
}

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
}

function TabButton({ isActive, onClick, label }: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative flex-1 py-2 text-sm font-medium rounded-full transition-colors ${
        isActive ? "" : "text-gray-600 hover:text-gray-900"
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-white rounded-full shadow-sm"
          transition={{ duration: 0.2, type: "spring", bounce: 0.25 }}
        />
      )}
      <span className="relative z-10">{label}</span>
    </button>
  );
}
