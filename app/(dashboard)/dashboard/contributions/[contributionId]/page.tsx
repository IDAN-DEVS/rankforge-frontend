"use client";
import { useParams } from "next/navigation";
import { RECENT_CONTRIBUTIONS } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { motion } from "motion/react";
import { CalendarIcon, ClockIcon, CodeIcon } from "lucide-react";

export default function ContributionDetails() {
  const params = useParams();
  const contributionId = params?.contributionId;
  const contribution = RECENT_CONTRIBUTIONS.find(
    (contribution) => Number(contribution.id) === Number(contributionId)
  );

  if (!contribution) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <Card className="w-full max-w-md p-6 text-center">
          <div className="mb-4 text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Contribution Not Found</h2>
          <p className="text-muted-foreground">
            The contribution you&apos;re looking for doesn&apos;t exist or has
            been removed.
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {contribution.title}
            </h1>
            <p className="text-muted-foreground mt-1 flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-primary/70"></span>
              Contribution ID: {contribution.id}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant={
                contribution.score >= 90
                  ? "default"
                  : contribution.score >= 80
                  ? "secondary"
                  : "outline"
              }
              className="px-3 py-1 text-sm font-medium"
            >
              Score: {contribution.score}
            </Badge>
            <Badge
              variant="outline"
              className={`px-3 py-1 text-sm font-medium capitalize ${
                contribution.type === "feature"
                  ? "text-blue-600 bg-blue-50 border-blue-200"
                  : contribution.type === "bugfix"
                  ? "text-red-600 bg-red-50 border-red-200"
                  : "text-purple-600 bg-purple-50 border-purple-200"
              }`}
            >
              {contribution.type}
            </Badge>
            <Badge
              variant={
                contribution.status === "approved"
                  ? "secondary"
                  : contribution.status === "pending"
                  ? "outline"
                  : "destructive"
              }
              className="px-3 py-1 text-sm font-medium"
            >
              {contribution.status.charAt(0).toUpperCase() +
                contribution.status.slice(1)}
            </Badge>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="overflow-hidden border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100">
            <CardTitle className="text-xl">Contribution Details</CardTitle>
            <CardDescription>
              Full information about your submission
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 p-6">
            <div className="space-y-3">
              <h3 className="text-lg font-medium flex items-center gap-2">
                <CodeIcon className="h-5 w-5 text-primary" />
                Description
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {contribution.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5 text-primary" />
                  Submission Date
                </h3>
                <p className="text-muted-foreground">
                  {format(new Date(contribution.date), "EEEE, MMMM d, yyyy")}
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <ClockIcon className="h-5 w-5 text-primary" />
                  Last Updated
                </h3>
                <p className="text-muted-foreground">
                  {format(
                    new Date(contribution.date),
                    "EEEE, MMMM d, yyyy 'at' h:mm a"
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
