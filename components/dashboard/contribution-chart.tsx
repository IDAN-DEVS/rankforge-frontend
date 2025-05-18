import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "../ui/card";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { CONTRIBUTIONS } from "@/lib/constants";
import { BarChart, Bar, XAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltipContent, ChartTooltip } from "../ui/chart";

export default function ContributionChart() {
  return (
    <Card className="overflow-hidden">
      <div className="absolute top-0 right-0 p-3">
        <TrendingUp className="h-5 w-5 text-green-500" />
      </div>
      <CardHeader className="pb-">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          Total Contributions
        </CardTitle>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-bold">
            {CONTRIBUTIONS.reduce((acc, c) => acc + c.contributions.length, 0)}
          </span>
          <span className="text-sm font-medium text-green-500 flex items-center">
            <ArrowUpRight className="h-3 w-3 mr-1" />
            12.5%
          </span>
        </div>
      </CardHeader>
      <CardContent className="px-2">
        <div className="h-28 w-full overflow-hidden bg-background rounded-b-lg">
          <ChartContainer
            config={{
              contributions: {
                label: "Contributions",
                color: "var(--foreground)",
              },
            }}
            className="min-h-[24px] h-28 w-full"
          >
            <BarChart
              accessibilityLayer
              data={CONTRIBUTIONS.map((c) => ({
                date: c.date,
                contributions: c.contributions.length,
              }))}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={false} />
              <XAxis
                color="var(--foreground)"
                dataKey="date"
                tickLine={true}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 5)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />

              <Bar
                dataKey="contributions"
                fill="var(--primary)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
