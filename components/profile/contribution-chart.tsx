import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownRight, Calendar } from "lucide-react";
import { CONTRIBUTIONS } from "@/lib/constants";
import { format } from "date-fns";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ContributionCard() {
  return (
    <Card className="relative bg-[#18181b] border-none">
      <div className="absolute top-0 right-0 p-3">
        <Calendar className="h-5 w-5 text-primary" />
      </div>

      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Consistency
        </CardTitle>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold">{CONTRIBUTIONS.length}</span>
          <span className="text-sm font-medium text-red-500 flex items-center">
            <ArrowDownRight className="h-3 w-3 mr-1" />3
          </span>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-xs text-muted-foreground">
          Days active in the last 30 days
        </p>
        <div className="mt-2 grid grid-cols-15 gap-1">
          {Array.from({ length: 30 }).map((_, i) => {
            // Get date for 30 days ago plus i days
            const date = new Date();
            date.setDate(date.getDate() - (30 - i - 1));

            // Format the date as in the CONTRIBUTIONS array (MM-DD-YYYY)
            const formattedDate = `${String(date.getMonth() + 1).padStart(
              2,
              "0"
            )}-${String(date.getDate()).padStart(
              2,
              "0"
            )}-${date.getFullYear()}`;

            // Find matching contribution data
            const contributionDay = CONTRIBUTIONS.find(
              (c) => c.date === formattedDate
            );

            // Get number of contributions on this day
            const contributionCount =
              contributionDay?.contributions.length || 0;

            // Calculate opacity based on contribution count
            // Find max contributions across all days for normalization
            const maxContributions = CONTRIBUTIONS.reduce(
              (max, day) =>
                day.contributions.length > max ? day.contributions.length : max,
              0
            );

            // Calculate opacity (minimum 0.1, maximum 1.0)
            const opacity =
              contributionCount > 0
                ? 0.1 + (contributionCount / maxContributions) * 0.9
                : 0;

            return (
              <TooltipProvider key={i}>
                <Tooltip>
                  <TooltipTrigger
                    style={{
                      opacity: contributionCount > 0 ? opacity : 0.5,
                    }}
                    className={`w-full aspect-square rounded-sm ${
                      contributionCount > 0 ? "bg-primary" : "bg-gray-500"
                    } cursor-pointer hover:ring-1 hover:ring-primary transition-all duration-200`}
                  />
                  <TooltipContent>
                    <div>
                      <p className="font-medium">
                        {`${format(
                          new Date(formattedDate),
                          "EEEE, do MMMM, yyyy"
                        )}: ${contributionCount} contribution${
                          contributionCount !== 1 ? "s" : ""
                        }`}
                      </p>
                      {contributionDay && contributionCount > 0 && (
                        <ul className="mt-1 text-xs text-white space-y-1">
                          {contributionDay.contributions.map(
                            (contrib, index) => (
                              <li key={index}>
                                {contrib.action} on{" "}
                                {contrib.repo.split("/").pop()}
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              // <div
              //   key={i}
              //   className={`w-full aspect-square rounded-sm ${
              //     contributionCount > 0 ? "bg-primary" : "bg-gray-500"
              //   } cursor-pointer hover:ring-1 hover:ring-primary transition-all duration-200`}
              //   style={{ opacity: contributionCount > 0 ? opacity : 0.5 }}
              //   title={`${formattedDate}: ${contributionCount} contribution${
              //     contributionCount !== 1 ? "s" : ""
              //   }`}
              // />
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
