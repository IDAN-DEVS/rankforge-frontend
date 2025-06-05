"use client";
import {
  CheckBadgeIcon,
  ClockIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";

import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import ContributionChart from "@/components/profile/contribution-chart";

const mockUser = {
  name: "Alex Johnson",
  email: "alex.j@example.com",
  avatarUrl: "https://i.pravatar.cc/300",
  totalScore: 1550,
};

const mockSubmissions = [
  {
    id: 1,
    title: "Add OAuth to Login",
    project: "RankForge Frontend",
    status: "Pending",
    date: "2024-06-01",
  },
  {
    id: 2,
    title: "Improve Leaderboard UI",
    project: "RankForge Frontend",
    status: "Scored",
    score: 120,
    date: "2024-05-28",
  },
  {
    id: 3,
    title: "Improve Leaderboard UI",
    project: "RankForge Frontend",
    status: "Scored",
    score: 120,
    date: "2024-05-28",
  },
  {
    id: 4,
    title: "Add OAuth to Login",
    project: "RankForge Frontend",
    status: "Pending",
    date: "2024-06-01",
  },
  {
    id: 5,
    title: "Add OAuth to Login",
    project: "RankForge Frontend",
    status: "Pending",
    date: "2024-06-01",
  },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-[#111113] flex flex-col items-center mt-20">
      {/* Profile Summary */}
      <div className="flex flex-col px-5 w-full mt-8 h-full">
        <div className=" w-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-5 mb-10">
          <div className="col-span-2 h-96 md:h-full flex flex-col-reverse md:flex-row lg:flex-col-reverse bg-[#18181b] rounded-2xl overflow-hidden shadow-lg p-4">
            <div className="w-full md:w-1/2 lg:w-full px-2 py-7 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                {mockUser.name}
              </h3>
              <p className="text-gray-400">
                Get a place on the public leaderboard with the score from your
                contribution.
              </p>
            </div>

            <div className=" flex-1 bg-[#DAFF01] flex items-center justify-center relative rounded-xl overflow-hidden">
              <Image
                src={mockUser.avatarUrl}
                alt="User Avatar"
                className="w-full h-full object-cover"
                width={100}
                height={100}
              />
            </div>
          </div>
          {/* Quick Actions */}
          <div className="col-span-3 flex flex-col gap-6 justify-between bg-[#18181b] rounded-2xl shadow-lg p-5">
            <div>
              <div className="text-lg font-semibold text-white mb-2">
                Recent Submissions
              </div>
              <ul className="flex flex-col gap-3">
                {mockSubmissions.map((sub) => (
                  <li
                    key={sub.id}
                    className="flex items-center gap-3 bg-[#232336] rounded-xl px-4 py-3"
                  >
                    {sub.status === "Pending" ? (
                      <ClockIcon className="w-7 h-7 text-yellow-400" />
                    ) : (
                      <CheckBadgeIcon className="w-7 h-7 text-green-400" />
                    )}
                    <div className="flex-1">
                      <div className="font-semibold text-white text-md">
                        {sub.title}
                      </div>
                      <div className="text-xs text-gray-400">
                        {sub.project} • {sub.date}
                      </div>
                    </div>
                    {sub.status === "Scored" && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-[#DAFF01] text-black font-bold text-xs">
                        <TrophyIcon className="w-4 h-4" /> {sub.score}
                      </span>
                    )}
                    <span
                      className={`ml-2 text-xs font-bold ${
                        sub.status === "Pending"
                          ? "text-yellow-400"
                          : "text-green-400"
                      }`}
                    >
                      {sub.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="md:col-span-1 lg:col-span-2 gap-5 flex flex-col justify-between">
            <ContributionChart />
            <Card className="bg-[#18181b] border-none">
              <CardHeader>
                <CardTitle className="text-white">Skill Proficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "React", level: 90 },
                    { name: "TypeScript", level: 85 },
                    { name: "Node.js", level: 80 },
                  ].map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span className="text-white">{skill.name}</span>
                        <span className="text-gray-400">{skill.level}%</span>
                      </div>
                      <Progress
                        value={skill.level}
                        className="h-2 bg-gray-700"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className=" w-full grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          <Card className="bg-[#18181b] border-none">
            <CardHeader>
              <CardTitle className="text-white">Featured Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between gap-4">
                {[
                  {
                    name: "Project Alpha",
                    description: "A full-stack web application",
                    stars: 120,
                    contributions: 45,
                  },
                  // ... more projects
                ].map((project) => (
                  <div
                    key={project.name}
                    className="p-4 bg-[#232336] rounded-lg"
                  >
                    <h3 className="text-white font-medium">{project.name}</h3>
                    <p className="text-gray-400 text-sm mt-1">
                      {project.description}
                    </p>
                    <div className="flex gap-4 mt-3">
                      <Badge className="bg-[#DAFF01] text-black">
                        ⭐ {project.stars}
                      </Badge>
                      <Badge variant="outline" className="border-gray-700">
                        {project.contributions} contributions
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#18181b] border-none">
            <CardHeader>
              <CardTitle className="text-white">Contribution Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#232336] rounded-lg text-center">
                  <div className="text-3xl font-bold text-[#DAFF01]">98%</div>
                  <p className="text-gray-400">Acceptance Rate</p>
                </div>
                <div className="p-4 bg-[#232336] rounded-lg text-center">
                  <div className="text-3xl font-bold text-[#DAFF01]">4.8</div>
                  <p className="text-gray-400">Average Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
