"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import {
  BarChart,
  Trophy,
  ArrowUpRight,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import ContributionCard from "@/components/dashboard/contribution-card";
import ContributionChart from "@/components/dashboard/contribution-chart";
import RecentContributions from "@/components/dashboard/recent-contributions";
import LeaderboardCard from "@/components/dashboard/leaderboard-card";

export default function DashboardPage() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">(
    "month"
  );
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, John! Here&apos;s your contribution overview.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex items-center space-x-2"
        >
          <Button
            variant={timeRange === "week" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("week")}
          >
            Week
          </Button>
          <Button
            variant={timeRange === "month" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("month")}
          >
            Month
          </Button>
          <Button
            variant={timeRange === "year" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeRange("year")}
          >
            Year
          </Button>
        </motion.div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <ContributionChart />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card>
            <div className="absolute top-0 right-0 p-3">
              <BarChart className="h-5 w-5 text-blue-500" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Average Score
              </CardTitle>
              <div className="flex items-baseline space-x-2">
                <span className="text-3xl font-bold">87</span>
                <span className="text-sm font-medium text-green-500 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  2.5
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full"
                  style={{ width: "87%" }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                You&apos;re in the top 15% of contributors
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <div className="absolute top-0 right-0 p-3">
              <Trophy className="h-5 w-5 text-amber-500" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Current Rank
              </CardTitle>
              <div className="flex flex-col">
                <span className="text-3xl font-bold">Silver</span>
                <div className="flex items-center text-xs text-amber-600 font-medium mt-1">
                  <div className="inline-block h-2 w-2 rounded-full bg-amber-400 mr-1"></div>
                  13 points to Gold
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-amber-400 h-2.5 rounded-full"
                  style={{ width: "77%" }}
                ></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <ContributionCard />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Contributions */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <RecentContributions />
        </motion.div>

        {/* Activity and Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="space-y-6"
        >
          {/* Leaderboard Snapshot */}
          <LeaderboardCard />

          {/* Suggestions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">
                Improvement Suggestions
              </CardTitle>
              <CardDescription>Areas to focus on</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ChevronUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Code Quality</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      92/100
                    </span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ChevronDown className="h-4 w-4 text-red-500" />
                      <span className="text-sm font-medium">Documentation</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      68/100
                    </span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ChevronUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Collaboration</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      85/100
                    </span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
