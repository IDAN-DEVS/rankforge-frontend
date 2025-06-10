"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/lib/constants";
import { useAuth } from "@/lib/auth-context";
export function MainNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  console.log(user);
  return (
    <nav className="flex items-center space-x-1 mx-auto">
      {navItems.map((item) => {
        if (!user && item.label === "Dashboard") return;
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`
              px-4 py-2 rounded-full text-md font-medium transition-colors
              ${
                isActive
                  ? "text-primary pointer-none:"
                  : "text-muted-foreground hover:text-primary"
              }
            `}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
