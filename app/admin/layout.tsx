"use client";

import { useState, useEffect } from "react";
import { AdminSidebarNav, adminNavItems } from "@/components/admin/sidebar-nav";
import { AdminHeader } from "@/components/admin/admin-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, Search } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  // Handle hydration issue
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <AdminHeader />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="hidden md:flex md:items-center md:justify-between mb-6 pb-4 border-b">
          <div className="flex-1 flex items-center">
            <Link href="/" className="flex items-center space-x-2 mr-8">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">RF</span>
              </div>
              <span className="text-xl font-bold">RankForge Admin</span>
            </Link>

            <div className="relative max-w-md w-full hidden lg:flex">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 py-2 pr-4 rounded-md bg-muted/60 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src="/images/user_avatar.png" alt="Admin" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <div className="hidden lg:block">
                <p className="text-sm font-medium">Jessica Williams</p>
                <p className="text-xs text-muted-foreground">Admin</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6">
          <div className="hidden md:block">
            <Card className="p-4 sticky top-4">
              <AdminSidebarNav items={adminNavItems} />
            </Card>
          </div>
          <div>{children}</div>
        </div>
      </div>
    </>
  );
}
