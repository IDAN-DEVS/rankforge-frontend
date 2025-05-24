"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { MOCK_PROFILES } from "@/lib/constants";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// Mock data types

type SortField = "name" | "contributions" | "score" | "rank";
type SortDirection = "asc" | "desc";

export function LeaderboardTable() {
  const [sortField, setSortField] = useState<SortField>("score");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  const sortedUsers = [
    ...Object.values(MOCK_PROFILES).map((user) => ({
      id: user.id,
      name: user.name,
      username: user.username,
      contributions: user.contributions,
      score: user.score,
      rank: user.rank,
      avatar: user.avatar,
    })),
  ].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const podium = sortedUsers.slice(0, 3);
  const rest = sortedUsers.slice(3);

  const getPodiumColor = (index: number) => {
    if (index === 0) return "bg-yellow-400";
    if (index === 1) return "bg-gray-400";
    if (index === 2) return "bg-amber-400";
    return "bg-white";
  };

  return (
    <div className="space-y-8 py-8">
      {/* Podium display */}
      <div className="flex justify-center items-end gap-6">
        {[1, 0, 2].map((i) => {
          const user = podium[i];
          return (
            <div
              key={user.id}
              className={`flex flex-col items-center justify-end w-32 p-2 rounded-lg border relative z-10 transition-transform duration-300 shadow-[0_6px_0_0_#f8ff7a,0_2px_8px_0_rgba(248,255,122,0.25)] hover:shadow-[0_4px_0_0_#f8ff7a,0_1px_6px_0_rgba(248,255,122,0.2)]
          ${i === 1 ? "h-36" : i === 0 ? "h-42" : "h-32"} ${getPodiumColor(i)}`}
            >
              <span className="absolute -top-6 bg-yellow-400 text-white text-sm font-bold px-2 py-1 rounded-full shadow">
                #{i + 1}
              </span>

              <div className="flex items-center justify-center mb-2">
                <Avatar className="h-12 w-12 border-4 border-background">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-md font-bold">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="font-semibold text-center text-sm truncate">
                <Link
                  href={`/profile/${user.username}`}
                  className="text-secondary font-medium"
                >
                  {user.name}
                </Link>
              </div>
              <div className="text-xs text-gray-500">{user.score} pts</div>
              <div
                className={`text-xs font-medium mt-1 px-2 py-0.5 rounded-full
            ${
              user.rank === "Gold"
                ? "bg-yellow-100 text-yellow-800"
                : user.rank === "Silver"
                ? "bg-gray-100 text-gray-800"
                : "bg-amber-100 text-amber-800"
            }`}
              >
                {user.rank}
              </div>
            </div>
          );
        })}
      </div>

      {/* Leaderboard table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("name")}
                  className="flex items-center gap-1 font-medium"
                >
                  Name
                  {sortField === "name" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )
                  ) : (
                    <ArrowUpDown className="h-4 w-4" />
                  )}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("contributions")}
                  className="flex items-center gap-1 font-medium"
                >
                  Contributions
                  {sortField === "contributions" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )
                  ) : (
                    <ArrowUpDown className="h-4 w-4" />
                  )}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("score")}
                  className="flex items-center gap-1 font-medium"
                >
                  Score
                  {sortField === "score" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )
                  ) : (
                    <ArrowUpDown className="h-4 w-4" />
                  )}
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("rank")}
                  className="flex items-center gap-1 font-medium"
                >
                  Rank
                  {sortField === "rank" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )
                  ) : (
                    <ArrowUpDown className="h-4 w-4" />
                  )}
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rest.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{index + 4}</TableCell>
                <TableCell>
                  <Link
                    href={`/profile/${user.username}`}
                    className="hover:underline"
                  >
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell>{user.contributions}</TableCell>
                <TableCell>{user.score}</TableCell>
                <TableCell>
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded-full
                      ${
                        user.rank === "Gold"
                          ? "bg-yellow-100 text-yellow-800"
                          : user.rank === "Silver"
                          ? "bg-gray-100 text-gray-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                  >
                    {user.rank}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// (No replacement lines; the block is removed entirely)
// type SortField = "name" | "contributions" | "score" | "rank";
// type SortDirection = "asc" | "desc";

// export function LeaderboardTable() {
//   const [sortField, setSortField] = useState<SortField>("score");
//   const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

//   const handleSort = (field: SortField) => {
//     if (sortField === field) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//     } else {
//       setSortField(field);
//       setSortDirection("desc");
//     }
//   };

//   const sortedUsers = [
//     ...Object.values(MOCK_PROFILES).map((user) => ({
//       id: user.id,
//       name: user.name,
//       username: user.username,
//       contributions: user.contributions,
//       score: user.score,
//       rank: user.rank,
//     })),
//   ].sort((a, b) => {
//     const aValue = a[sortField];
//     const bValue = b[sortField];

//     if (sortDirection === "asc") {
//       return aValue > bValue ? 1 : -1;
//     } else {
//       return aValue < bValue ? 1 : -1;
//     }
//   });

//   return (
//     <div className="rounded-md border">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead className="w-[100px]">Rank</TableHead>
//             <TableHead>
//               <Button
//                 variant="ghost"
//                 onClick={() => handleSort("name")}
//                 className="flex items-center gap-1 font-medium"
//               >
//                 Name
//                 {sortField === "name" ? (
//                   sortDirection === "asc" ? (
//                     <ChevronUp className="h-4 w-4" />
//                   ) : (
//                     <ChevronDown className="h-4 w-4" />
//                   )
//                 ) : (
//                   <ArrowUpDown className="h-4 w-4" />
//                 )}
//               </Button>
//             </TableHead>
//             <TableHead>
//               <Button
//                 variant="ghost"
//                 onClick={() => handleSort("contributions")}
//                 className="flex items-center gap-1 font-medium"
//               >
//                 Contributions
//                 {sortField === "contributions" ? (
//                   sortDirection === "asc" ? (
//                     <ChevronUp className="h-4 w-4" />
//                   ) : (
//                     <ChevronDown className="h-4 w-4" />
//                   )
//                 ) : (
//                   <ArrowUpDown className="h-4 w-4" />
//                 )}
//               </Button>
//             </TableHead>
//             <TableHead>
//               <Button
//                 variant="ghost"
//                 onClick={() => handleSort("score")}
//                 className="flex items-center gap-1 font-medium"
//               >
//                 Score
//                 {sortField === "score" ? (
//                   sortDirection === "asc" ? (
//                     <ChevronUp className="h-4 w-4" />
//                   ) : (
//                     <ChevronDown className="h-4 w-4" />
//                   )
//                 ) : (
//                   <ArrowUpDown className="h-4 w-4" />
//                 )}
//               </Button>
//             </TableHead>
//             <TableHead>
//               <Button
//                 variant="ghost"
//                 onClick={() => handleSort("rank")}
//                 className="flex items-center gap-1 font-medium"
//               >
//                 Rank
//                 {sortField === "rank" ? (
//                   sortDirection === "asc" ? (
//                     <ChevronUp className="h-4 w-4" />
//                   ) : (
//                     <ChevronDown className="h-4 w-4" />
//                   )
//                 ) : (
//                   <ArrowUpDown className="h-4 w-4" />
//                 )}
//               </Button>
//             </TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {sortedUsers.map((user, index) => (
//             <TableRow key={user.id}>
//               <TableCell className="font-medium">{index + 1}</TableCell>
//               <TableCell>
//                 <Link
//                   href={`/profile/${user.username}`}
//                   className="hover:underline"
//                 >
//                   {user.name}
//                 </Link>
//               </TableCell>
//               <TableCell>{user.contributions}</TableCell>
//               <TableCell>{user.score}</TableCell>
//               <TableCell>
//                 <span
//                   className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
//                     user.rank === "Gold"
//                       ? "bg-yellow-100 text-yellow-800"
//                       : user.rank === "Silver"
//                       ? "bg-gray-100 text-gray-800"
//                       : "bg-amber-100 text-amber-800"
//                   }`}
//                 >
//                   {user.rank}
//                 </span>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// }
