"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BarChart3, FileText, Home, Settings, Upload } from "lucide-react";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: React.ReactNode;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn("flex flex-col space-y-1", className)} {...props}>
      {items.map((item) => {
        
        return (
          <Button
            key={item.href}
            variant={pathname === item.href ? "secondary" : "ghost"}
            className={cn(
              "justify-start",
              pathname === item.href
                ? "bg-muted hover:bg-muted"
                : "hover:bg-transparent hover:underline"
            )}
          >
            <Link href={item.href}>
              <span className="mr-2">{item.icon}</span>
              {item.title}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}

export const dashboardNavItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: <Home className="h-4 w-4" />,
  },
  {
    title: "Contributions",
    href: "/dashboard/contributions",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    title: "Submit Contribution",
    href: "/dashboard/submit",
    icon: <Upload className="h-4 w-4" />,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: <BarChart3 className="h-4 w-4" />,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: <Settings className="h-4 w-4" />,
  },
];
