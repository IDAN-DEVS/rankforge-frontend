"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Github,
  Twitter,
  Linkedin,
  Globe,
  Edit,
  Trophy,
  Star,
  Award,
  Calendar,
  FileText,
  UserCheck,
} from "lucide-react";
import { RECENT_CONTRIBUTIONS } from "@/lib/constants";
import { getContributionMetrics } from "@/lib/utils/contribution-utils";
import Link from "next/link";

// User info - in a real app, this would come from an API
const userInfo = {
  name: "Mark Tochukwu",
  username: "devtochukwu",
  email: "marktochukwu@gmail.com",
  avatar: "/images/user_avatar.png",
  bio: "Full-stack developer passionate about open source contributions. Working primarily with React, Next.js, and Node.js.",
  joinDate: "May 2023",
  rank: "Silver",
  location: "Enugu, Nigeria",
  socialLinks: {
    github: "https://github.com/SimpleX-T",
    twitter: "https://twitter.com/devtochukwu",
    linkedin: "https://linkedin.com/in/mark-tochukwu-30b6eaf",
    website: "https://mark-ndubuisi.vercel.app",
  },
  skills: [
    "JavaScript",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "MongoDB",
    "Git",
  ],
  achievements: [
    {
      name: "First PR",
      icon: <Star className="h-4 w-4" />,
      date: "May 15, 2023",
    },
    {
      name: "10 Contributions",
      icon: <Trophy className="h-4 w-4" />,
      date: "July 2, 2023",
    },
    {
      name: "Code Reviewer",
      icon: <UserCheck className="h-4 w-4" />,
      date: "Aug 18, 2023",
    },
    {
      name: "Top Contributor",
      icon: <Award className="h-4 w-4" />,
      date: "Oct 5, 2023",
    },
  ],
};

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");
  const contributionMetrics = getContributionMetrics();

  // Recent activity (simplified for demo)
  const recentActivity = RECENT_CONTRIBUTIONS.slice(0, 5);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold mb-1">Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information and track your contributions
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile sidebar */}
        <div className="space-y-6">
          {/* Basic profile card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
                    <AvatarFallback>
                      {userInfo.name.charAt(0)}
                      {userInfo.name.split(" ")[1]?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-2xl font-bold">{userInfo.name}</h2>
                  <p className="text-muted-foreground mb-2">
                    @{userInfo.username}
                  </p>

                  <div className="flex items-center space-x-1 mb-4">
                    <Badge variant="secondary" className="rounded-sm">
                      {userInfo.rank} Contributor
                    </Badge>
                    <Badge variant="outline" className="rounded-sm">
                      {userInfo.location}
                    </Badge>
                  </div>

                  <p className="text-sm mb-4">{userInfo.bio}</p>

                  <div className="flex space-x-2 mb-4">
                    <Button variant="outline" size="icon" asChild>
                      <Link
                        href={userInfo.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <Link
                        href={userInfo.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Twitter className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <Link
                        href={userInfo.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <Link
                        href={userInfo.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Globe className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>

                  <Button className="w-full">
                    <Edit className="h-4 w-4 mr-2" /> Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Skills & Technologies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {userInfo.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="rounded-full px-3 py-1"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userInfo.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3 text-primary">
                        {achievement.icon}
                      </div>
                      <div>
                        <p className="font-medium">{achievement.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {achievement.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
          >
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="contributions">Contributions</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <div className="mt-6 space-y-6">
                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6 mt-0">
                  {/* Stats cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <Calendar className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <h3 className="text-2xl font-bold">
                            {contributionMetrics.daysWithActivity}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Active Days
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <FileText className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <h3 className="text-2xl font-bold">
                            {contributionMetrics.totalContributions}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Total Contributions
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <Trophy className="h-8 w-8 mx-auto mb-2 text-primary" />
                          <h3 className="text-2xl font-bold">Silver</h3>
                          <p className="text-sm text-muted-foreground">
                            Current Rank
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Progress to next rank */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        Progress to Gold Rank
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span>Current: 843 points</span>
                          <span>Next Rank: 1000 points</span>
                        </div>
                        <Progress value={84.3} className="h-2" />
                        <p className="text-sm text-muted-foreground">
                          You need 157 more points to reach Gold Rank
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent activity mini-section */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentActivity.map((activity, i) => (
                          <div
                            key={i}
                            className="flex justify-between items-start pb-4 border-b last:border-b-0 last:pb-0"
                          >
                            <div>
                              <p className="font-medium">{activity.title}</p>
                              <p className="text-sm text-muted-foreground">
                                {activity.date}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className={
                                activity.type === "feature"
                                  ? "bg-blue-50 text-blue-600"
                                  : activity.type === "bugfix"
                                  ? "bg-red-50 text-red-600"
                                  : "bg-purple-50 text-purple-600"
                              }
                            >
                              {activity.type}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Contributions Tab (simplified) */}
                <TabsContent value="contributions" className="mt-0">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center p-10">
                        <h3 className="text-xl font-medium mb-2">
                          All Contributions
                        </h3>
                        <p className="text-muted-foreground">
                          View your full contribution history in the
                          Contributions page
                        </p>
                        <Button className="mt-4" asChild>
                          <Link href="/dashboard/contributions">
                            View All Contributions
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Activity Tab (simplified) */}
                <TabsContent value="activity" className="mt-0">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center p-10">
                        <h3 className="text-xl font-medium mb-2">
                          Activity Timeline
                        </h3>
                        <p className="text-muted-foreground">
                          View your detailed activity timeline in the Analytics
                          page
                        </p>
                        <Button className="mt-4" asChild>
                          <Link href="/dashboard/analytics">View Analytics</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
