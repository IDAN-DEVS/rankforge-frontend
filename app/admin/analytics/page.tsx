"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "motion/react";
import {
  BarChart,
  LineChart,
  PieChart,
  Pie,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import {
  Users,
  FileText,
  TrendingUp,
  Clock,
  Calendar,
  BarChart2,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
} from "lucide-react";

// Mock data for analytics
const contributionData = [
  { month: "Jan", contributions: 65, reviews: 28, users: 12 },
  { month: "Feb", contributions: 72, reviews: 32, users: 15 },
  { month: "Mar", contributions: 85, reviews: 37, users: 18 },
  { month: "Apr", contributions: 93, reviews: 41, users: 22 },
  { month: "May", contributions: 105, reviews: 45, users: 24 },
  { month: "Jun", contributions: 112, reviews: 48, users: 25 },
];

const scoreDistribution = [
  { name: "90-100", value: 32, color: "#10b981" },
  { name: "80-89", value: 45, color: "#3b82f6" },
  { name: "70-79", value: 28, color: "#6366f1" },
  { name: "60-69", value: 15, color: "#f59e0b" },
  { name: "Below 60", value: 8, color: "#ef4444" },
];

const rankDistribution = [
  { name: "Platinum", value: 12, color: "#818cf8" },
  { name: "Gold", value: 35, color: "#fbbf24" },
  { name: "Silver", value: 48, color: "#94a3b8" },
  { name: "Bronze", value: 29, color: "#d97706" },
  { name: "None", value: 15, color: "#9ca3af" },
];

const typeDistribution = [
  { name: "Bug Fix", value: 38, color: "#ef4444" },
  { name: "Feature", value: 52, color: "#10b981" },
  { name: "Documentation", value: 22, color: "#3b82f6" },
  { name: "Performance", value: 18, color: "#f59e0b" },
  { name: "Accessibility", value: 15, color: "#8b5cf6" },
];

const timeEngagement = [
  { time: "00:00", active: 12 },
  { time: "03:00", active: 8 },
  { time: "06:00", active: 15 },
  { time: "09:00", active: 45 },
  { time: "12:00", active: 53 },
  { time: "15:00", active: 61 },
  { time: "18:00", active: 48 },
  { time: "21:00", active: 30 },
];

const summaryMetrics = [
  {
    title: "Total Users",
    value: 139,
    change: 12,
    changeType: "increase",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "Total Contributions",
    value: 532,
    change: 23,
    changeType: "increase",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "Avg. Score",
    value: 84.2,
    change: 2.3,
    changeType: "increase",
    icon: <TrendingUp className="h-5 w-5" />,
  },
  {
    title: "Active Time (hrs/day)",
    value: 2.8,
    change: 0.5,
    changeType: "increase",
    icon: <Clock className="h-5 w-5" />,
  },
];

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("6m");
  const [chartType, setChartType] = useState("bar");

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold mb-1">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Platform usage and contribution metrics
        </p>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryMetrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    metric.changeType === "increase"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {metric.icon}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span
                    className={
                      metric.changeType === "increase"
                        ? "text-green-600"
                        : "text-red-600"
                    }
                  >
                    {metric.changeType === "increase" ? "+" : "-"}
                    {metric.change}
                  </span>{" "}
                  from last month
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main analytics section */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Tabs defaultValue="overview" className="flex-1">
          <TabsList>
            <TabsTrigger value="overview" className="flex items-center gap-1">
              <BarChart2 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>Users</span>
            </TabsTrigger>
            <TabsTrigger
              value="contributions"
              className="flex items-center gap-1"
            >
              <FileText className="h-4 w-4" />
              <span>Contributions</span>
            </TabsTrigger>
            <TabsTrigger value="time" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Time</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex flex-col sm:flex-row gap-4">
          <Select
            value={timeRange}
            onValueChange={setTimeRange}
            defaultValue="6m"
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 days</SelectItem>
              <SelectItem value="30d">30 days</SelectItem>
              <SelectItem value="3m">3 months</SelectItem>
              <SelectItem value="6m">6 months</SelectItem>
              <SelectItem value="1y">1 year</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={chartType}
            onValueChange={setChartType}
            defaultValue="bar"
          >
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Chart type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bar">
                <div className="flex items-center">
                  <BarChart2 className="h-4 w-4 mr-2" />
                  Bar
                </div>
              </SelectItem>
              <SelectItem value="line">
                <div className="flex items-center">
                  <LineChartIcon className="h-4 w-4 mr-2" />
                  Line
                </div>
              </SelectItem>
              <SelectItem value="pie">
                <div className="flex items-center">
                  <PieChartIcon className="h-4 w-4 mr-2" />
                  Pie
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Growth chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Platform Growth</CardTitle>
            <CardDescription>
              Contributions, reviews, and user growth over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === "bar" ? (
                  <BarChart data={contributionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="contributions"
                      name="Contributions"
                      fill="#8884d8"
                    />
                    <Bar dataKey="reviews" name="Reviews" fill="#82ca9d" />
                    <Bar dataKey="users" name="New Users" fill="#ffc658" />
                  </BarChart>
                ) : chartType === "line" ? (
                  <LineChart data={contributionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="contributions"
                      name="Contributions"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="reviews"
                      name="Reviews"
                      stroke="#82ca9d"
                    />
                    <Line
                      type="monotone"
                      dataKey="users"
                      name="New Users"
                      stroke="#ffc658"
                    />
                  </LineChart>
                ) : (
                  <PieChart>
                    <Tooltip />
                    <Legend />
                    <Pie
                      data={scoreDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label
                    >
                      {scoreDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Distribution charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Score Distribution</CardTitle>
              <CardDescription>
                Contribution scores by percentage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip />
                    <Pie
                      data={scoreDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label
                    >
                      {scoreDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>User Ranks</CardTitle>
              <CardDescription>Distribution by rank level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip />
                    <Pie
                      data={rankDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label
                    >
                      {rankDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Contribution Types</CardTitle>
              <CardDescription>
                Distribution by contribution category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Tooltip />
                    <Pie
                      data={typeDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      nameKey="name"
                      label
                    >
                      {typeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Time engagement */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>User Engagement by Time</CardTitle>
            <CardDescription>
              Active users throughout the day (UTC)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={timeEngagement}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="active" name="Active Users" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
