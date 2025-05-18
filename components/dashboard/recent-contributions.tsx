"use client";

import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { MoreHorizontal } from "lucide-react";
import { RECENT_CONTRIBUTIONS } from "@/lib/constants";
import { useRouter } from "next/navigation";

export default function RecentContributions() {
  const router = useRouter();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Recent Contributions</CardTitle>
          <CardDescription>Your latest submitted work</CardDescription>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {RECENT_CONTRIBUTIONS.slice(0, 3).map((contribution) => (
            <div
              key={contribution.id}
              className="flex flex-col space-y-2 p-3 bg-background rounded-lg hover:bg-background/80 transition-colors cursor-pointer"
              onClick={() =>
                router.push(`/dashboard/contributions/${contribution.id}`)
              }
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-medium text-sm">{contribution.title}</h3>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {contribution.description}
                  </p>
                </div>
                <div className="flex flex-col items-end space-y-1">
                  <Badge
                    variant={
                      contribution.score >= 90
                        ? "default"
                        : contribution.score >= 80
                        ? "secondary"
                        : "outline"
                    }
                    className="text-xs"
                  >
                    Score: {contribution.score}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {contribution.date}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <Badge
                  variant="outline"
                  className={`text-xs capitalize ${
                    contribution.type === "feature"
                      ? "text-blue-600 bg-blue-50"
                      : contribution.type === "bugfix"
                      ? "text-red-600 bg-red-50"
                      : "text-purple-600 bg-purple-50"
                  }`}
                >
                  {contribution.type}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-xs bg-green-50 text-green-600"
                >
                  {contribution.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          className="w-full mt-4 text-sm"
          onClick={() => router.push("/dashboard/contributions")}
        >
          View all contributions
        </Button>
      </CardContent>
    </Card>
  );
}
