"use client";

import { useState, useEffect } from "react";
import {
  SidebarNav,
  dashboardNavItems,
} from "@/components/dashboard/sidebar-nav";
import { Button } from "@/components/ui/button";
import { Menu, X, Bell, Search } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CustomDropdown from "@/components/dashboard/custom-dropdown";
import { ThemeSwitcher } from "@/components/theme-switcher";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications] = useState([
    { label: "New Contribution" },
    { label: "New Contribution" },
    { label: "New Contribution" },
    { label: "New Contribution" },
    { label: "New Contribution" },
    { label: "New Contribution" },
    { label: "New Contribution" },
  ]);
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
      {/* Dashboard Layout */}
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar for desktop */}
        <motion.aside
          className="hidden md:flex flex-col w-64 bg-background border-r border-gray-500 fixed top-0 h-screen"
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="p-4 border-b border-gray-500">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-white font-bold">RF</span>
              </div>
              <span className="text-xl font-bold">RankForge</span>
            </Link>
          </div>
          <div className="flex-1 overflow-y-auto py-4 px-3">
            <SidebarNav items={dashboardNavItems} />
          </div>
          <div className="border-t border-gray-500 p-4">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="/images/user_avatar.png" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-500">Silver Contributor</p>
              </div>
            </div>
          </div>
        </motion.aside>

        {/* Mobile sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              className="fixed inset-0 z-50 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="absolute inset-0 bg-black/50"
                onClick={() => setSidebarOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              />
              <motion.aside
                className="absolute top-0 left-0 h-full w-3/4 max-w-xs bg-background"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", damping: 25 }}
              >
                <div className="flex items-center justify-between p-4 border-b border-gray-500">
                  <Link href="/" className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-white font-bold">RF</span>
                    </div>
                    <span className="text-xl font-bold">RankForge</span>
                  </Link>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <div className="py-4 px-3">
                  <SidebarNav items={dashboardNavItems} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 border-t border-gray-500 p-4">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src="/images/user_avatar.png" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-xs text-gray-500">
                        Silver Contributor
                      </p>
                    </div>
                  </div>
                </div>
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main content */}
        <div className="flex-1 flex flex-col md:ml-64 max-w-full">
          {/* Top navbar */}
          <header className="bg-background border-b border-gray-500 sticky top-0 z-10">
            <div className="flex items-center justify-between px-8 py-3">
              <div className="flex items-center md:w-72">
                <Button
                  size="icon"
                  variant="ghost"
                  className="md:hidden mr-2"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-5 w-5" />
                </Button>
                <h1 className="text-xl font-semibold md:hidden">RankForge</h1>
              </div>

              <div className="hidden sm:flex items-center flex-1 max-w-md mx-4">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search contributions..."
                    className="w-full py-2 pl-10 pr-4 rounded-full border border-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <CustomDropdown
                  trigger={
                    <Button size="icon" variant="ghost" className="relative">
                      <Bell className="h-5 w-5" />
                      {notifications.length > 0 && (
                        <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center">
                          {notifications.length}
                        </span>
                      )}
                    </Button>
                  }
                  label="Notifications"
                  items={notifications.map((notification) => ({
                    label: notification.label,
                    href: "/dashboard/notifications",
                  }))}
                />

                <ThemeSwitcher />

                <CustomDropdown
                  trigger={
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/images/user_avatar.png" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  }
                  label="My Account"
                  items={[
                    { label: "Profile", href: "/dashboard/profile" },
                    { label: "Billing", href: "/dashboard/billing" },
                    { label: "Team", href: "/dashboard/team" },
                    { label: "Subscription", href: "/dashboard/subscription" },
                  ]}
                />
              </div>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 overflow-auto p-4 md:p-6 bg-background w-full">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
