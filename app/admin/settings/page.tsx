"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";
import { toast } from "sonner";
import {
  Settings,
  RotateCw,
  Bell,
  Users,
  Award,
  Lock,
  FileText,
} from "lucide-react";

export default function AdminSettingsPage() {
  // General settings
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "RankForge",
    siteDescription: "Track and evaluate open-source contributions",
    maintenanceMode: false,
    userRegistration: true,
    requireEmailVerification: true,
    maxFileSize: "5",
    defaultLanguage: "en",
  });

  // Scoring settings
  const [scoringSettings, setScoringSettings] = useState({
    minScore: "0",
    maxScore: "100",
    bronzeThreshold: "60",
    silverThreshold: "75",
    goldThreshold: "85",
    platinumThreshold: "95",
    autoApproveScoreThreshold: "",
    enableAutoRejection: false,
    rejectionThreshold: "40",
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    adminNewSubmission: true,
    adminUserRegistration: true,
    userReviewComplete: true,
    userRankChange: true,
    digestFrequency: "daily",
    customEmailFooter: "© 2024 RankForge. All rights reserved.",
  });

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    maxLoginAttempts: "5",
    lockoutDuration: "30",
    sessionTimeout: "120",
    requireStrongPasswords: true,
    enableTwoFactor: false,
    allowOAuthLogin: true,
    ipLogging: true,
  });

  const handleGeneralChange = (
    name: string,
    value: string | boolean | number
  ) => {
    setGeneralSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleScoringChange = (
    name: string,
    value: string | boolean | number
  ) => {
    setScoringSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleNotificationChange = (
    name: string,
    value: string | boolean | number
  ) => {
    setNotificationSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSecurityChange = (
    name: string,
    value: string | boolean | number
  ) => {
    setSecuritySettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveSettings = () => {
    // In a real app, we would call an API to save these settings
    toast.success("Settings saved successfully");
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold mb-1">Admin Settings</h1>
        <p className="text-muted-foreground">
          Configure platform settings and preferences
        </p>
      </motion.div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general" className="flex items-center gap-1">
            <Settings className="h-4 w-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="scoring" className="flex items-center gap-1">
            <Award className="h-4 w-4" />
            <span>Scoring</span>
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-1"
          >
            <Bell className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-1">
            <Lock className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Basic platform configuration options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={generalSettings.siteName}
                    onChange={(e) =>
                      handleGeneralChange("siteName", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultLanguage">Default Language</Label>
                  <Select
                    value={generalSettings.defaultLanguage}
                    onValueChange={(value) =>
                      handleGeneralChange("defaultLanguage", value)
                    }
                  >
                    <SelectTrigger id="defaultLanguage">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="de">Deutsch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="siteDescription">Site Description</Label>
                <Textarea
                  id="siteDescription"
                  value={generalSettings.siteDescription}
                  onChange={(e) =>
                    handleGeneralChange("siteDescription", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxFileSize">Max File Size (MB)</Label>
                <Input
                  id="maxFileSize"
                  type="number"
                  value={generalSettings.maxFileSize}
                  onChange={(e) =>
                    handleGeneralChange("maxFileSize", e.target.value)
                  }
                />
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenanceMode">Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Temporarily disable public access to the site
                    </p>
                  </div>
                  <Switch
                    id="maintenanceMode"
                    checked={generalSettings.maintenanceMode}
                    onCheckedChange={(value) =>
                      handleGeneralChange("maintenanceMode", value)
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="userRegistration">User Registration</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow new users to register
                    </p>
                  </div>
                  <Switch
                    id="userRegistration"
                    checked={generalSettings.userRegistration}
                    onCheckedChange={(value) =>
                      handleGeneralChange("userRegistration", value)
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="requireEmailVerification">
                      Email Verification
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Require users to verify their email before they can
                      contribute
                    </p>
                  </div>
                  <Switch
                    id="requireEmailVerification"
                    checked={generalSettings.requireEmailVerification}
                    onCheckedChange={(value) =>
                      handleGeneralChange("requireEmailVerification", value)
                    }
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline" type="button">
                <RotateCw className="mr-2 h-4 w-4" />
                Reset to Defaults
              </Button>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Scoring Settings */}
        <TabsContent value="scoring">
          <Card>
            <CardHeader>
              <CardTitle>Scoring and Ranking</CardTitle>
              <CardDescription>
                Configure contribution scoring and rank thresholds
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minScore">Minimum Score</Label>
                  <Input
                    id="minScore"
                    type="number"
                    value={scoringSettings.minScore}
                    onChange={(e) =>
                      handleScoringChange("minScore", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxScore">Maximum Score</Label>
                  <Input
                    id="maxScore"
                    type="number"
                    value={scoringSettings.maxScore}
                    onChange={(e) =>
                      handleScoringChange("maxScore", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Rank Thresholds</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bronzeThreshold">Bronze</Label>
                    <Input
                      id="bronzeThreshold"
                      type="number"
                      value={scoringSettings.bronzeThreshold}
                      onChange={(e) =>
                        handleScoringChange("bronzeThreshold", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="silverThreshold">Silver</Label>
                    <Input
                      id="silverThreshold"
                      type="number"
                      value={scoringSettings.silverThreshold}
                      onChange={(e) =>
                        handleScoringChange("silverThreshold", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="goldThreshold">Gold</Label>
                    <Input
                      id="goldThreshold"
                      type="number"
                      value={scoringSettings.goldThreshold}
                      onChange={(e) =>
                        handleScoringChange("goldThreshold", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="platinumThreshold">Platinum</Label>
                    <Input
                      id="platinumThreshold"
                      type="number"
                      value={scoringSettings.platinumThreshold}
                      onChange={(e) =>
                        handleScoringChange("platinumThreshold", e.target.value)
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="autoApproveScoreThreshold">
                    Auto-Approve Threshold
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="autoApproveScoreThreshold"
                      type="number"
                      placeholder="Disabled"
                      value={scoringSettings.autoApproveScoreThreshold}
                      onChange={(e) =>
                        handleScoringChange(
                          "autoApproveScoreThreshold",
                          e.target.value
                        )
                      }
                    />
                    <Button
                      variant="outline"
                      onClick={() =>
                        handleScoringChange("autoApproveScoreThreshold", "")
                      }
                    >
                      Disable
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Contributions with scores above this threshold will be
                    automatically approved (leave empty to disable)
                  </p>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableAutoRejection">
                      Auto-Reject Low Scores
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically reject contributions below a certain
                      threshold
                    </p>
                  </div>
                  <Switch
                    id="enableAutoRejection"
                    checked={scoringSettings.enableAutoRejection}
                    onCheckedChange={(value) =>
                      handleScoringChange("enableAutoRejection", value)
                    }
                  />
                </div>

                {scoringSettings.enableAutoRejection && (
                  <div className="space-y-2">
                    <Label htmlFor="rejectionThreshold">
                      Rejection Threshold
                    </Label>
                    <Input
                      id="rejectionThreshold"
                      type="number"
                      value={scoringSettings.rejectionThreshold}
                      onChange={(e) =>
                        handleScoringChange(
                          "rejectionThreshold",
                          e.target.value
                        )
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Contributions with scores below this threshold will be
                      automatically rejected
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline" type="button">
                <RotateCw className="mr-2 h-4 w-4" />
                Reset to Defaults
              </Button>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure email and system notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="emailNotifications">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Enable or disable all email notifications
                  </p>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(value) =>
                    handleNotificationChange("emailNotifications", value)
                  }
                />
              </div>

              {notificationSettings.emailNotifications && (
                <>
                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Admin Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="adminNewSubmission"
                          className="flex items-center gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          New Contribution Submission
                        </Label>
                        <Switch
                          id="adminNewSubmission"
                          checked={notificationSettings.adminNewSubmission}
                          onCheckedChange={(value) =>
                            handleNotificationChange(
                              "adminNewSubmission",
                              value
                            )
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="adminUserRegistration"
                          className="flex items-center gap-2"
                        >
                          <Users className="h-4 w-4" />
                          New User Registration
                        </Label>
                        <Switch
                          id="adminUserRegistration"
                          checked={notificationSettings.adminUserRegistration}
                          onCheckedChange={(value) =>
                            handleNotificationChange(
                              "adminUserRegistration",
                              value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">User Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="userReviewComplete"
                          className="flex items-center gap-2"
                        >
                          <FileText className="h-4 w-4" />
                          Contribution Review Complete
                        </Label>
                        <Switch
                          id="userReviewComplete"
                          checked={notificationSettings.userReviewComplete}
                          onCheckedChange={(value) =>
                            handleNotificationChange(
                              "userReviewComplete",
                              value
                            )
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="userRankChange"
                          className="flex items-center gap-2"
                        >
                          <Award className="h-4 w-4" />
                          Rank Change
                        </Label>
                        <Switch
                          id="userRankChange"
                          checked={notificationSettings.userRankChange}
                          onCheckedChange={(value) =>
                            handleNotificationChange("userRankChange", value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="digestFrequency">
                      Admin Digest Frequency
                    </Label>
                    <Select
                      value={notificationSettings.digestFrequency}
                      onValueChange={(value) =>
                        handleNotificationChange("digestFrequency", value)
                      }
                    >
                      <SelectTrigger id="digestFrequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="realtime">Real-time</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      How often to send digest emails to administrators
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="customEmailFooter">
                      Custom Email Footer
                    </Label>
                    <Textarea
                      id="customEmailFooter"
                      value={notificationSettings.customEmailFooter}
                      onChange={(e) =>
                        handleNotificationChange(
                          "customEmailFooter",
                          e.target.value
                        )
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      This text will appear at the bottom of all emails
                    </p>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline" type="button">
                <RotateCw className="mr-2 h-4 w-4" />
                Reset to Defaults
              </Button>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure platform security options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="maxLoginAttempts">Max Login Attempts</Label>
                  <Input
                    id="maxLoginAttempts"
                    type="number"
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) =>
                      handleSecurityChange("maxLoginAttempts", e.target.value)
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Number of failed attempts before account is locked
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lockoutDuration">
                    Lockout Duration (minutes)
                  </Label>
                  <Input
                    id="lockoutDuration"
                    type="number"
                    value={securitySettings.lockoutDuration}
                    onChange={(e) =>
                      handleSecurityChange("lockoutDuration", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">
                  Session Timeout (minutes)
                </Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={securitySettings.sessionTimeout}
                  onChange={(e) =>
                    handleSecurityChange("sessionTimeout", e.target.value)
                  }
                />
                <p className="text-xs text-muted-foreground">
                  How long until inactive users are automatically logged out
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="requireStrongPasswords">
                      Require Strong Passwords
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Enforce password complexity requirements
                    </p>
                  </div>
                  <Switch
                    id="requireStrongPasswords"
                    checked={securitySettings.requireStrongPasswords}
                    onCheckedChange={(value) =>
                      handleSecurityChange("requireStrongPasswords", value)
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="enableTwoFactor">
                      Enable Two-Factor Authentication
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Allow users to enable 2FA for their accounts
                    </p>
                  </div>
                  <Switch
                    id="enableTwoFactor"
                    checked={securitySettings.enableTwoFactor}
                    onCheckedChange={(value) =>
                      handleSecurityChange("enableTwoFactor", value)
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowOAuthLogin">OAuth Login</Label>
                    <p className="text-sm text-muted-foreground">
                      Allow users to sign in with GitHub, Google, etc.
                    </p>
                  </div>
                  <Switch
                    id="allowOAuthLogin"
                    checked={securitySettings.allowOAuthLogin}
                    onCheckedChange={(value) =>
                      handleSecurityChange("allowOAuthLogin", value)
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ipLogging">IP Address Logging</Label>
                    <p className="text-sm text-muted-foreground">
                      Record IP addresses for login attempts and actions
                    </p>
                  </div>
                  <Switch
                    id="ipLogging"
                    checked={securitySettings.ipLogging}
                    onCheckedChange={(value) =>
                      handleSecurityChange("ipLogging", value)
                    }
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="outline" type="button">
                <RotateCw className="mr-2 h-4 w-4" />
                Reset to Defaults
              </Button>
              <Button onClick={handleSaveSettings}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
