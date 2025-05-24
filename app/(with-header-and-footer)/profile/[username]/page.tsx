"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useParams } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Github,
  Twitter,
  Linkedin,
  Globe,
  Medal,
  Calendar,
  Flame,
  BookOpen,
  Users,
  Award,
  BarChart3,
  History,
} from "lucide-react";
import { motion } from "motion/react";
import { MOCK_PROFILES } from "@/lib/constants";

// Type for contribution activity heatmap
type ActivityDay = {
  date: string;
  count: number;
};

// Generate mock activity data (would come from API in real app)
const generateMockActivity = (): ActivityDay[] => {
  const activity: ActivityDay[] = [];
  const now = new Date();
  const startDate = new Date(now);
  startDate.setDate(now.getDate() - 90); // Last 90 days

  for (let i = 0; i < 90; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    activity.push({
      date: date.toISOString().split("T")[0],
      count: Math.floor(Math.random() * 5), // 0-4 contributions per day
    });
  }

  return activity;
};

// Component for the activity calendar
const ActivityCalendar = ({ activity }: { activity: ActivityDay[] }) => {
  // Group by week
  const weeks: ActivityDay[][] = [];
  let currentWeek: ActivityDay[] = [];

  activity.forEach((day, index) => {
    currentWeek.push(day);
    if ((index + 1) % 7 === 0 || index === activity.length - 1) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  });

  // Get max count for scaling
  const maxCount = Math.max(...activity.map((day) => day.count));

  return (
    <div className="w-full overflow-x-auto">
      <div className="grid grid-flow-col gap-1 min-w-[500px]">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="grid grid-cols-row gap-1">
            {week.map((day, dayIndex) => {
              const opacity =
                day.count > 0 ? (day.count / maxCount) * 0.9 + 0.1 : 0;
              return (
                <div
                  key={dayIndex}
                  className="w-4 h-4 rounded-sm"
                  style={{
                    backgroundColor: day.count > 0 ? `var(--primary)` : "#888",
                    border: "1px solid var(--primary)",
                    opacity: day.count > 0 ? opacity : 1,
                  }}
                  title={`${day.date}: ${day.count} contributions`}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

// Badge component for contribution types
const TypeBadge = ({ type }: { type: string }) => {
  const getColorClass = (type: string) => {
    switch (type.toLowerCase()) {
      case "bug fix":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "feature":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "documentation":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "design":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      case "performance":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "accessibility":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      case "testing":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <Badge className={`${getColorClass(type)} border-0`} variant="outline">
      {type}
    </Badge>
  );
};

// Rank badge component
const RankBadge = ({ rank }: { rank: string }) => {
  const getRankStyles = (rank: string) => {
    switch (rank.toLowerCase()) {
      case "platinum":
        return "bg-gradient-to-r from-indigo-300 to-indigo-400 text-white";
      case "gold":
        return "bg-gradient-to-r from-amber-300 to-amber-500 text-white";
      case "silver":
        return "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800";
      case "bronze":
        return "bg-gradient-to-r from-amber-600 to-amber-700 text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <Badge
      className={`${getRankStyles(
        rank
      )} px-3 py-1 text-xs font-medium rounded-full`}
    >
      {rank} Contributor
    </Badge>
  );
};

export default function ProfilePage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("overview");

  // Generate mock activity data
  const activityData = generateMockActivity();

  // In a real app, we'd fetch this data from an API
  const profile =
    MOCK_PROFILES[params.username as keyof typeof MOCK_PROFILES] || null;

  if (!profile) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="bg-muted/30">
            <CardContent className="py-16">
              <div className="text-center">
                <h1 className="text-3xl font-bold mb-3">User not found</h1>
                <p className="text-muted-foreground mb-6">
                  The profile you&apos;re looking for doesn&apos;t exist or has
                  been removed.
                </p>
                <Button size="lg" onClick={() => window.history.back()}>
                  Go Back
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
      {/* Profile header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <Card>
          <CardContent className="py-6 px-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <Avatar className="h-24 w-24 border-4 border-background">
                <AvatarImage src={profile.avatar} alt={profile.name} />
                <AvatarFallback className="text-xl font-bold">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-bold">{profile.name}</h1>
                <p className="text-muted-foreground mb-2">
                  @{profile.username}
                </p>

                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
                  <RankBadge rank={profile.rank} />
                  <Badge variant="outline" className="px-3 py-1">
                    {profile.location}
                  </Badge>
                </div>

                <p className="mb-4 max-w-2xl">{profile.bio}</p>

                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={profile.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="mr-1 h-4 w-4" /> GitHub
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={profile.socialLinks.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="mr-1 h-4 w-4" /> Twitter
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={profile.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="mr-1 h-4 w-4" /> LinkedIn
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={profile.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="mr-1 h-4 w-4" /> Website
                    </a>
                  </Button>
                </div>
              </div>

              <div className="hidden lg:flex flex-col items-center justify-center bg-muted/30 p-6 rounded-lg min-w-40">
                <div className="text-4xl font-bold text-primary">
                  {profile.score}
                </div>
                <div className="text-muted-foreground text-sm mb-2">
                  Total Score
                </div>
                <div className="w-full">
                  <div className="text-xs text-center mb-1">
                    Next Rank: {profile.nextRank}
                  </div>
                  <Progress value={profile.nextRankProgress} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
      >
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="mx-auto mb-2 h-6 w-6 text-primary" />
            <div className="text-2xl font-bold">{profile.stats.daysActive}</div>
            <p className="text-xs text-muted-foreground">Days Active</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <BookOpen className="mx-auto mb-2 h-6 w-6 text-primary" />
            <div className="text-2xl font-bold">
              {profile.stats.projectsContributed}
            </div>
            <p className="text-xs text-muted-foreground">Projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Flame className="mx-auto mb-2 h-6 w-6 text-primary" />
            <div className="text-2xl font-bold">{profile.contributions}</div>
            <p className="text-xs text-muted-foreground">Contributions</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Users className="mx-auto mb-2 h-6 w-6 text-primary" />
            <div className="text-2xl font-bold">
              {profile.stats.reviewsCompleted}
            </div>
            <p className="text-xs text-muted-foreground">Reviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Medal className="mx-auto mb-2 h-6 w-6 text-primary" />
            <div className="text-2xl font-bold">{profile.rank}</div>
            <p className="text-xs text-muted-foreground">Current Rank</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Main content with tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <Tabs
          defaultValue="overview"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full"
        >
          <TabsList className="mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger
              value="contributions"
              className="flex items-center gap-1"
            >
              <History className="h-4 w-4" />
              <span>Contributions</span>
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="flex items-center gap-1"
            >
              <Award className="h-4 w-4" />
              <span>Achievements</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Skills and progress */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Activity Calendar</CardTitle>
                  <CardDescription>
                    Contribution activity over the last 90 days
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ActivityCalendar activity={activityData} />
                </CardContent>
                <CardFooter className="text-sm text-muted-foreground">
                  Each square represents a day of activity. Darker colors
                  indicate more contributions.
                </CardFooter>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, i) => (
                        <Badge key={i} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Rank Progress</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span>Current: {profile.score} points</span>
                      <span>Next: {profile.nextRank}</span>
                    </div>
                    <Progress
                      value={profile.nextRankProgress}
                      className="h-2"
                    />
                    <p className="text-sm text-muted-foreground">
                      {100 - profile.nextRankProgress}% more to reach{" "}
                      {profile.nextRank} rank
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Recent contributions preview */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Contributions</CardTitle>
                <CardDescription>Latest activity and scores</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profile.recentContributions
                      .slice(0, 3)
                      .map((contribution) => (
                        <TableRow key={contribution.id}>
                          <TableCell className="font-medium">
                            {contribution.title}
                          </TableCell>
                          <TableCell>
                            <TypeBadge type={contribution.type} />
                          </TableCell>
                          <TableCell>
                            {new Date(contribution.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                contribution.score > 85 ? "default" : "outline"
                              }
                            >
                              {contribution.score}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setActiveTab("contributions")}
                >
                  View all contributions
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Contributions tab */}
          <TabsContent value="contributions">
            <Card>
              <CardHeader>
                <CardTitle>All Contributions</CardTitle>
                <CardDescription>
                  Complete history of contributions and their scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {profile.recentContributions.map((contribution) => (
                      <TableRow key={contribution.id}>
                        <TableCell className="font-medium">
                          {contribution.title}
                        </TableCell>
                        <TableCell>
                          <TypeBadge type={contribution.type} />
                        </TableCell>
                        <TableCell>
                          {new Date(contribution.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              contribution.score > 85 ? "default" : "outline"
                            }
                          >
                            {contribution.score}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements tab */}
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>Achievements</CardTitle>
                <CardDescription>Badges and milestones earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {profile.achievements.map((achievement, i) => (
                    <Card key={i}>
                      <CardContent className="p-6 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <Award className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-medium">{achievement.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {new Date(achievement.date).toLocaleDateString()}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </section>
  );
}
