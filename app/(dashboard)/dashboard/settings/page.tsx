"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  // PaintBucket,
  Bell,
  Shield,
  User,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
// import { ThemeSelector } from "@/components/theme-switcher";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({
    newScore: true,
    reachRank: true,
    newComment: false,
    adminMessage: true,
  });

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold mb-1">Settings</h1>
        <p className="text-muted-foreground">
          Customize your dashboard experience
        </p>
      </motion.div>

      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 md:w-fit">
          {/* <TabsTrigger value="appearance" className="flex items-center gap-2">
            <PaintBucket className="h-4 w-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger> */}
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Account</span>
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Privacy</span>
          </TabsTrigger>
        </TabsList>

        <div className="space-y-6">
          {/* <TabsContent value="appearance" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize how the dashboard looks and feels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Theme</h3>
                  <ThemeSelector />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium mb-1">
                    Interface Options
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dense-mode">Dense Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Use compact spacing throughout the interface
                      </p>
                    </div>
                    <Switch id="dense-mode" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="animate">Animations</Label>
                      <p className="text-sm text-muted-foreground">
                        Show animations and transitions
                      </p>
                    </div>
                    <Switch id="animate" defaultChecked />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}

          <TabsContent value="notifications" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>
                  Choose what you want to be notified about
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="new-score">New Scores</Label>
                    <p className="text-sm text-muted-foreground">
                      When your contribution receives a new score
                    </p>
                  </div>
                  <Switch
                    id="new-score"
                    checked={notifications.newScore}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({
                        ...prev,
                        newScore: checked,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="rank-change">Rank Changes</Label>
                    <p className="text-sm text-muted-foreground">
                      When you reach a new rank level
                    </p>
                  </div>
                  <Switch
                    id="rank-change"
                    checked={notifications.reachRank}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({
                        ...prev,
                        reachRank: checked,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="comments">Comments</Label>
                    <p className="text-sm text-muted-foreground">
                      When someone comments on your contribution
                    </p>
                  </div>
                  <Switch
                    id="comments"
                    checked={notifications.newComment}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({
                        ...prev,
                        newComment: checked,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="admin-messages">Admin Messages</Label>
                    <p className="text-sm text-muted-foreground">
                      Important announcements from administrators
                    </p>
                  </div>
                  <Switch
                    id="admin-messages"
                    checked={notifications.adminMessage}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({
                        ...prev,
                        adminMessage: checked,
                      }))
                    }
                  />
                </div>

                <div className="pt-4">
                  <Button className="w-full sm:w-auto">
                    <Save className="mr-2 h-4 w-4" /> Save Notification Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account information and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Account settings will be implemented in a future update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Privacy Settings</CardTitle>
                <CardDescription>
                  Control your privacy and data settings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Privacy settings will be implemented in a future update.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
