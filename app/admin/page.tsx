"use client";

import { motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart3, FileText, Users, TrendingUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Recent users (using consistent data from users page)
const recentUsers = [
  {
    name: "Emily Thompson",
    username: "emily_t",
    joinedAt: "2024-05-25T00:00:00Z",
    avatar: "/images/user_avatar.png",
  },
  {
    name: "David Rodriguez",
    username: "drodriguez",
    joinedAt: "2024-03-22T00:00:00Z",
    avatar: "/images/user_avatar.png",
  },
  {
    name: "Michael Chen",
    username: "mchen",
    joinedAt: "2024-02-03T00:00:00Z",
    avatar: "/images/user_avatar.png",
  },
  {
    name: "Alex Turner",
    username: "aturner",
    joinedAt: "2024-01-30T00:00:00Z",
    avatar: "/images/user_avatar.png",
  },
  {
    name: "Sarah Johnson",
    username: "sarah_dev",
    joinedAt: "2024-01-15T00:00:00Z",
    avatar: "/images/user_avatar.png",
  },
];

// Recent contributions (using consistent data from contributions page)
const recentContributions = [
  {
    title: "Fix responsive navigation menu for mobile devices",
    username: "sarah_dev",
    name: "Sarah Johnson",
    submittedAt: "2024-05-28T14:30:00Z",
  },
  {
    title: "Implement dark mode support with system preference detection",
    username: "mchen",
    name: "Michael Chen",
    submittedAt: "2024-05-27T09:15:00Z",
  },
  {
    title: "Performance optimization for image loading with lazy loading",
    username: "drodriguez",
    name: "David Rodriguez",
    submittedAt: "2024-05-26T11:45:00Z",
  },
  {
    title: "Updated API documentation with comprehensive examples",
    username: "lisa_m",
    name: "Lisa Morgan",
    submittedAt: "2024-05-25T16:20:00Z",
  },
  {
    title: "Accessibility improvements for form components",
    username: "aturner",
    name: "Alex Turner",
    submittedAt: "2024-05-24T10:05:00Z",
  },
];

export default function AdminDashboardPage() {
  function getTimeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        return `${diffMinutes} minutes ago`;
      }
      return `${diffHours} hours ago`;
    } else if (diffDays === 1) {
      return "yesterday";
    } else {
      return `${diffDays} days ago`;
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Platform overview and management
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <div className="h-8 w-8 rounded-md bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-700 dark:text-blue-400">
              <Users className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">139</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Reviews
            </CardTitle>
            <div className="h-8 w-8 rounded-md bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-700 dark:text-amber-400">
              <FileText className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+2 from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Score</CardTitle>
            <div className="h-8 w-8 rounded-md bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-700 dark:text-green-400">
              <BarChart3 className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84.2</div>
            <p className="text-xs text-muted-foreground">
              +1.2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Contributions
            </CardTitle>
            <div className="h-8 w-8 rounded-md bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-700 dark:text-purple-400">
              <TrendingUp className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">532</div>
            <p className="text-xs text-muted-foreground">+23 from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <Card className="col-span-1 h-full">
            <CardHeader>
              <CardTitle>Recent Users</CardTitle>
              <CardDescription>New users who joined recently</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentUsers.map((user, i) => (
                  <div key={i} className="flex items-center">
                    <Avatar className="h-9 w-9 mr-3">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Joined {getTimeAgo(user.joinedAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="col-span-1 h-full">
            <CardHeader>
              <CardTitle>Pending Contributions</CardTitle>
              <CardDescription>
                Contributions waiting for review
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentContributions.map((contribution, i) => (
                  <div
                    key={i}
                    className="border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-sm line-clamp-1 flex-1 mr-2">
                        {contribution.title}
                      </h3>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {getTimeAgo(contribution.submittedAt)}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2 flex items-center">
                      <Avatar className="h-4 w-4 mr-1">
                        <AvatarFallback className="text-[10px]">
                          {contribution.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      Submitted by {contribution.name}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
