"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function MainNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  return (
    <nav className="flex items-center space-x-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-colors
              ${isActive ? "text-primary" : "text-gray-600 hover:text-primary"}
            `}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
