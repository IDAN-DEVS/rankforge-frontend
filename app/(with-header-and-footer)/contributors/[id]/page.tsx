/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { use, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
  ArrowLeftIcon,
} from "lucide-react";
import { motion } from "motion/react";
import { MOCK_PROFILES } from "@/lib/constants";
import Link from "next/link";

// Mock data for demonstration
const mockProfile = {
  name: "John Doe",
  username: "johndoe",
  avatar: "/images/avatar.png",
  bio: "Full-stack developer passionate about open source and web development.",
  location: "San Francisco, CA",
  rank: "Gold",
  score: 1250,
  nextRank: "Platinum",
  nextRankProgress: 75,
  contributions: 156,
  socialLinks: {
    github: "https://github.com/johndoe",
    twitter: "https://twitter.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
    website: "https://johndoe.com",
  },
  stats: {
    daysActive: 45,
    projectsContributed: 12,
    reviewsCompleted: 89,
  },
  skills: ["React", "TypeScript", "Node.js", "Python", "AWS"],
  recentContributions: [
    {
      id: 1,
      title: "Added dark mode support",
      type: "feature",
      date: "2024-03-15",
      score: 95,
    },
    {
      id: 2,
      title: "Fixed authentication bug",
      type: "bugfix",
      date: "2024-03-10",
      score: 88,
    },
    {
      id: 3,
      title: "Improved performance",
      type: "optimization",
      date: "2024-03-05",
      score: 92,
    },
  ],
  achievements: [
    {
      name: "First Contribution",
      date: "2024-01-15",
    },
    {
      name: "Top Contributor",
      date: "2024-02-20",
    },
    {
      name: "Bug Hunter",
      date: "2024-03-01",
    },
  ],
};

export default function PublicProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [activeTab, setActiveTab] = useState("overview");
  const { id } = use(params);

  // In a real app, we'd fetch this data from an API
  const profiles = MOCK_PROFILES[id as keyof typeof MOCK_PROFILES];
  const profile = mockProfile;

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 flex flex-col gap-4 items-start">
      <Link href="/contributors">
        <Button size="sm" className="flex items-center gap-2 justify-between">
          <>
            <ArrowLeftIcon className="w-4 h-4 inline" />
            Back
          </>
        </Button>
      </Link>
      <section>
        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Card className="bg-[#18181b] border-none">
            <CardContent className="py-6 px-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <Avatar className="h-24 w-24 border-4 border-[#DAFF01]">
                  <AvatarImage src={profile.avatar} alt={profile.name} />
                  <AvatarFallback className="text-xl font-bold bg-[#DAFF01] text-black">
                    {profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 text-center sm:text-left">
                  <h1 className="text-3xl font-bold text-white">
                    {profile.name}
                  </h1>
                  <p className="text-gray-400 mb-2">@{profile.username}</p>

                  <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-4">
                    <Badge className="bg-[#DAFF01] text-black hover:bg-[#DAFF01]/90">
                      {profile.rank}
                    </Badge>
                    <Badge variant="outline" className="text-gray-400">
                      {profile.location}
                    </Badge>
                  </div>

                  <p className="mb-4 max-w-2xl text-gray-300">{profile.bio}</p>

                  <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 hover:bg-gray-800"
                    >
                      <a
                        href={profile.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <Github className="mr-1 h-4 w-4" /> GitHub
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 hover:bg-gray-800"
                    >
                      <a
                        href={profile.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <Twitter className="mr-1 h-4 w-4" /> Twitter
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 hover:bg-gray-800"
                    >
                      <a
                        href={profile.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <Linkedin className="mr-1 h-4 w-4" /> LinkedIn
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-700 hover:bg-gray-800"
                    >
                      <a
                        href={profile.socialLinks.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                      >
                        <Globe className="mr-1 h-4 w-4" /> Website
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="hidden lg:flex flex-col items-center justify-center bg-[#232336] p-6 rounded-lg min-w-40">
                  <div className="text-4xl font-bold text-[#DAFF01]">
                    {profile.score}
                  </div>
                  <div className="text-gray-400 text-sm mb-2">Total Score</div>
                  <div className="w-full">
                    <div className="text-xs text-center mb-1 text-gray-400">
                      Next Rank: {profile.nextRank}
                    </div>
                    <Progress
                      value={profile.nextRankProgress}
                      className="h-2 bg-gray-700"
                    />
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
          <Card className="bg-[#18181b] border-none">
            <CardContent className="p-4 text-center">
              <Calendar className="mx-auto mb-2 h-6 w-6 text-[#DAFF01]" />
              <div className="text-2xl font-bold text-white">
                {profile.stats.daysActive}
              </div>
              <p className="text-xs text-gray-400">Days Active</p>
            </CardContent>
          </Card>

          <Card className="bg-[#18181b] border-none">
            <CardContent className="p-4 text-center">
              <BookOpen className="mx-auto mb-2 h-6 w-6 text-[#DAFF01]" />
              <div className="text-2xl font-bold text-white">
                {profile.stats.projectsContributed}
              </div>
              <p className="text-xs text-gray-400">Projects</p>
            </CardContent>
          </Card>

          <Card className="bg-[#18181b] border-none">
            <CardContent className="p-4 text-center">
              <Flame className="mx-auto mb-2 h-6 w-6 text-[#DAFF01]" />
              <div className="text-2xl font-bold text-white">
                {profile.contributions}
              </div>
              <p className="text-xs text-gray-400">Contributions</p>
            </CardContent>
          </Card>

          <Card className="bg-[#18181b] border-none">
            <CardContent className="p-4 text-center">
              <Users className="mx-auto mb-2 h-6 w-6 text-[#DAFF01]" />
              <div className="text-2xl font-bold text-white">
                {profile.stats.reviewsCompleted}
              </div>
              <p className="text-xs text-gray-400">Reviews</p>
            </CardContent>
          </Card>

          <Card className="bg-[#18181b] border-none">
            <CardContent className="p-4 text-center">
              <Medal className="mx-auto mb-2 h-6 w-6 text-[#DAFF01]" />
              <div className="text-2xl font-bold text-white">
                {profile.rank}
              </div>
              <p className="text-xs text-gray-400">Current Rank</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="bg-[#18181b] p-1">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-[#DAFF01] data-[state=active]:text-black"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="contributions"
                className="data-[state=active]:bg-[#DAFF01] data-[state=active]:text-black"
              >
                Contributions
              </TabsTrigger>
              <TabsTrigger
                value="achievements"
                className="data-[state=active]:bg-[#DAFF01] data-[state=active]:text-black"
              >
                Achievements
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Skills and progress */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-2 bg-[#18181b] border-none">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Recent Activity
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Latest contributions and achievements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-800">
                          <TableHead className="text-gray-400">Title</TableHead>
                          <TableHead className="text-gray-400">Type</TableHead>
                          <TableHead className="text-gray-400">Date</TableHead>
                          <TableHead className="text-gray-400">Score</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {profile.recentContributions.map((contribution) => (
                          <TableRow
                            key={contribution.id}
                            className="border-gray-800"
                          >
                            <TableCell className="font-medium text-white">
                              {contribution.title}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className="border-gray-700"
                              >
                                {contribution.type}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-gray-400">
                              {new Date(contribution.date).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Badge className="bg-[#DAFF01] text-black">
                                {contribution.score}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className="bg-[#18181b] border-none">
                    <CardHeader>
                      <CardTitle className="text-white">Skills</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.map((skill, i) => (
                          <Badge
                            key={i}
                            className="bg-[#232336] text-white hover:bg-[#232336]/80"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#18181b] border-none">
                    <CardHeader>
                      <CardTitle className="text-white">
                        Rank Progress
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between text-sm text-gray-400">
                        <span>Current: {profile.score} points</span>
                        <span>Next: {profile.nextRank}</span>
                      </div>
                      <Progress
                        value={profile.nextRankProgress}
                        className="h-2 bg-gray-700"
                      />
                      <p className="text-sm text-gray-400">
                        {100 - profile.nextRankProgress}% more to reach{" "}
                        {profile.nextRank} rank
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="contributions">
              <Card className="bg-[#18181b] border-none">
                <CardHeader>
                  <CardTitle className="text-white">
                    All Contributions
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Complete history of contributions and their scores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-800">
                        <TableHead className="text-gray-400">Title</TableHead>
                        <TableHead className="text-gray-400">Type</TableHead>
                        <TableHead className="text-gray-400">Date</TableHead>
                        <TableHead className="text-gray-400">Score</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {profile.recentContributions.map((contribution) => (
                        <TableRow
                          key={contribution.id}
                          className="border-gray-800"
                        >
                          <TableCell className="font-medium text-white">
                            {contribution.title}
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="border-gray-700"
                            >
                              {contribution.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-400">
                            {new Date(contribution.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <Badge className="bg-[#DAFF01] text-black">
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

            <TabsContent value="achievements">
              <Card className="bg-[#18181b] border-none">
                <CardHeader>
                  <CardTitle className="text-white">Achievements</CardTitle>
                  <CardDescription className="text-gray-400">
                    Badges and milestones earned
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {profile.achievements.map((achievement, i) => (
                      <Card key={i} className="bg-[#232336] border-none">
                        <CardContent className="p-6 flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-[#DAFF01]/10 flex items-center justify-center text-[#DAFF01]">
                            <Award className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-medium text-white">
                              {achievement.name}
                            </h3>
                            <p className="text-sm text-gray-400">
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
    </section>
  );
}
