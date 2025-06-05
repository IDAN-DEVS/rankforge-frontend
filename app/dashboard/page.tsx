"use client";
import {
  CheckBadgeIcon,
  ClockIcon,
  DocumentPlusIcon,
  TrophyIcon,
} from "@heroicons/react/24/outline";

import Image from "next/image";

const mockUser = {
  name: "Alex Johnson",
  email: "alex.j@example.com",
  avatarUrl: "/avatars/1.png",
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
    <div className="min-h-screen w-full bg-[#111113] flex flex-col items-center">
      {/* Profile Summary */}
      <div className="flex flex-col px-5 w-full mt-8 h-full">
        <div className="h-[calc(100vh-10rem)] w-full grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-5 mb-10">
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
          <div className="col-span-1 flex items-center gap-3 flex-col">
            <div className="col-span-1 flex flex-col items-center bg-[#18181b] rounded-2xl shadow-lg p-4 hover:cursor-pointer hover:scale-[101%] transition-all duration-300 h-56">
              <div className="h-2/3 flex items-center justify-center mb-4 gap-6 bg-[#DAFF01] w-full rounded-xl">
                <DocumentPlusIcon className="w-14 h-14 text-black" />
              </div>
              <div className="flex items-center ">
                <span className="text-center px-4 text-white font-semibold text-xl shadow">
                  Log New Contribution
                </span>
              </div>
            </div>
            <div className="col-span-1 flex flex-col items-center bg-[#18181b] rounded-2xl shadow-lg p-4 hover:cursor-pointer hover:scale-[101%] transition-all duration-300 h-56">
              <div className="h-2/3 flex items-center justify-center mb-4 gap-6 bg-[#DAFF01] w-full rounded-xl">
                <DocumentPlusIcon className="w-14 h-14 text-black" />
              </div>
              <div className="flex items-center ">
                <span className="text-center px-4 text-white font-semibold text-xl shadow">
                  Log New Contribution
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
