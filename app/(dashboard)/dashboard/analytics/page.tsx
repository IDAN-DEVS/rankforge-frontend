"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import {
  LineChart,
  BarChart3,
  PieChart,
  Filter,
  Download,
  Calendar,
} from "lucide-react";
import MetricCard from "@/components/dashboard/analytics/metric-card";
import CombinedChart from "@/components/dashboard/analytics/combined-chart";
import {
  getContributionPieChartData,
  getMonthlyContributionData,
  getRepositoryBreakdown,
  getContributionMetrics,
} from "@/lib/utils/contribution-utils";

// Get real contribution data from the utilities
const monthlyData = getMonthlyContributionData();
const pieChartData = getContributionPieChartData();
const repoData = getRepositoryBreakdown();
const metrics = getContributionMetrics();

// Metric card data
const metricCards = [
  {
    title: "Average Score",
    value: `${Math.round(
      monthlyData.reduce((sum, month) => sum + month.score, 0) /
        monthlyData.length
    )}`,
    change: "+2.4",
    trend: "up" as const,
    delay: 0.1,
    icon: <LineChart className="h-5 w-5 text-blue-500" />,
  },
  {
    title: "Total Commits",
    value: `${metrics.commits}`,
    change: "+12",
    trend: "up" as const,
    delay: 0.2,
    icon: <BarChart3 className="h-5 w-5 text-green-500" />,
  },
  {
    title: "Pull Requests",
    value: `${metrics.pullRequests}`,
    change: "+5",
    trend: "up" as const,
    delay: 0.3,
    icon: <PieChart className="h-5 w-5 text-purple-500" />,
  },
  {
    title: "Active Days",
    value: `${metrics.daysWithActivity}`,
    change: "-3",
    trend: "down" as const,
    isPositive: false,
    delay: 0.4,
    icon: <Calendar className="h-5 w-5 text-orange-500" />,
  },
];

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <h1 className="text-3xl font-bold mb-1">Analytics</h1>
          <p className="text-muted-foreground">
            Detailed insights about your contribution patterns and performance
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="flex flex-wrap items-center gap-2"
        >
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Calendar className="h-4 w-4" />
            <span>Last 12 months</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Filter className="h-4 w-4" />
            <span>Filter</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </motion.div>
      </div>

      {/* High-level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metricCards.map((card, index) => (
          <MetricCard
            key={index}
            title={card.title}
            value={card.value}
            change={card.change}
            trend={card.trend}
            isPositive={card.isPositive}
            delay={card.delay}
            icon={card.icon}
          />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Performance Trends</CardTitle>
                  <CardDescription>
                    Score and contribution frequency by month
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-600">
                    Score
                  </Badge>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-600"
                  >
                    Contributions
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="overflow-x-auto w-full">
              <CombinedChart
                type="mixed"
                data={monthlyData}
                height={200}
                config={{
                  xAxisKey: "month",
                  lineKey: "score",
                  barKey: "count",
                  lineColor: "#3b82f6",
                  barColor: "#10b981",
                  leftDomain: [50, 100],
                  showRightAxis: true,
                  rightDomain: [0, 10],
                  lineAxis: "left",
                  barAxis: "right",
                  showLegend: false,
                }}
              />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Contribution Breakdown</CardTitle>
              <CardDescription>Types of contributions made</CardDescription>
            </CardHeader>
            <CardContent>
              <CombinedChart
                type="pie"
                data={pieChartData.data}
                height={250}
                config={{
                  colors: pieChartData.colors,
                  dataKey: "value",
                  nameKey: "name",
                  showLegend: true,
                }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Repository Activity</CardTitle>
              <CardDescription>Where you&apos;ve been active</CardDescription>
            </CardHeader>
            <CardContent>
              <CombinedChart
                type="bar"
                data={repoData}
                height={200}
                config={{
                  xAxisKey: "name",
                  dataKey: "value",
                  showLegend: false,
                }}
              />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
