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

// Mock data for demonstration
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    username: "johndoe",
    contributions: 32,
    score: 94,
    rank: "Gold",
  },
  {
    id: "2",
    name: "Jane Smith",
    username: "janesmith",
    contributions: 28,
    score: 87,
    rank: "Silver",
  },
  {
    id: "3",
    name: "Robert Johnson",
    username: "rjohnson",
    contributions: 45,
    score: 92,
    rank: "Gold",
  },
  {
    id: "4",
    name: "Emily Davis",
    username: "emilyd",
    contributions: 19,
    score: 78,
    rank: "Bronze",
  },
  {
    id: "5",
    name: "Michael Wilson",
    username: "mwilson",
    contributions: 37,
    score: 89,
    rank: "Silver",
  },
];

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

  const sortedUsers = [...mockUsers].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  return (
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
          {sortedUsers.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
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
                  className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
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
  );
}
