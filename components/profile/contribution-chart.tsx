"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface ContributionChartProps {
  data?: ContributionDay[];
}

const LEVEL_COLORS = {
  0: "bg-[#18181b]",
  1: "bg-[#DAFF01]/20",
  2: "bg-[#DAFF01]/40",
  3: "bg-[#DAFF01]/60",
  4: "bg-[#DAFF01]",
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const mockData: ContributionDay[] = [
  { date: "2024-03-01", count: 5, level: 2 },
  { date: "2024-03-02", count: 8, level: 3 },
  { date: "2024-03-03", count: 12, level: 4 },
  { date: "2024-03-04", count: 3, level: 1 },
  { date: "2024-03-05", count: 0, level: 0 },
  { date: "2024-03-06", count: 6, level: 2 },
  { date: "2024-03-07", count: 9, level: 3 },
  { date: "2024-03-08", count: 4, level: 2 },
  { date: "2024-03-09", count: 7, level: 3 },
  { date: "2024-03-10", count: 2, level: 1 },
  { date: "2024-03-11", count: 0, level: 0 },
  { date: "2024-03-12", count: 5, level: 2 },
  { date: "2024-03-13", count: 8, level: 3 },
  { date: "2024-03-14", count: 11, level: 4 },
  { date: "2024-03-15", count: 3, level: 1 },
  { date: "2024-03-16", count: 0, level: 0 },
  { date: "2024-03-17", count: 6, level: 2 },
  { date: "2024-03-18", count: 9, level: 3 },
  { date: "2024-03-19", count: 4, level: 2 },
  { date: "2024-03-20", count: 7, level: 3 },
  { date: "2024-03-21", count: 2, level: 1 },
  { date: "2024-03-22", count: 0, level: 0 },
  { date: "2024-03-23", count: 5, level: 2 },
  { date: "2024-03-24", count: 8, level: 3 },
  { date: "2024-03-25", count: 11, level: 4 },
  { date: "2024-03-26", count: 3, level: 1 },
  { date: "2024-03-27", count: 0, level: 0 },
  { date: "2024-03-28", count: 6, level: 2 },
  { date: "2024-03-29", count: 9, level: 3 },
  { date: "2024-03-30", count: 4, level: 2 },
  { date: "2024-03-31", count: 7, level: 3 },
];

export function ContributionChart({ data = mockData }: ContributionChartProps) {
  const [weeks, setWeeks] = useState<ContributionDay[][]>([]);
  const [monthLabels, setMonthLabels] = useState<
    { month: string; index: number }[]
  >([]);

  useEffect(() => {
    // Organize data into weeks, ensuring each week starts on Sunday
    const weeksData: ContributionDay[][] = [];
    const firstDay = new Date(data[0].date);
    const firstDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Add empty days at the start if needed
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDayOfWeek);

    let currentWeek: ContributionDay[] = [];
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push({
        date: startDate.toISOString().split("T")[0],
        count: 0,
        level: 0,
      });
      startDate.setDate(startDate.getDate() + 1);
    }

    // Add the actual data
    data.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        weeksData.push(currentWeek);
        currentWeek = [];
      }
    });

    // Add empty days at the end if needed
    while (currentWeek.length < 7) {
      const lastDate = new Date(
        currentWeek[currentWeek.length - 1]?.date || data[data.length - 1].date
      );
      lastDate.setDate(lastDate.getDate() + 1);
      currentWeek.push({
        date: lastDate.toISOString().split("T")[0],
        count: 0,
        level: 0,
      });
    }
    if (currentWeek.length > 0) {
      weeksData.push(currentWeek);
    }

    setWeeks(weeksData);

    // Generate month labels
    const labels: { month: string; index: number }[] = [];
    let currentMonth = -1;
    data.forEach((day, index) => {
      const month = new Date(day.date).getMonth();
      if (month !== currentMonth) {
        labels.push({ month: MONTHS[month], index });
        currentMonth = month;
      }
    });
    setMonthLabels(labels);
  }, [data]);

  return (
    <Card className="bg-[#18181b] border-none w-full">
      <CardHeader>
        <CardTitle className="text-white">Contribution Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          {/* Day labels */}
          <div className="flex flex-col justify-around text-xs text-gray-400 pt-8">
            {DAYS.map((day) => (
              <div key={day} className="h-3">
                {day}
              </div>
            ))}
          </div>

          <div className="flex-1">
            {/* Month labels */}
            <div className="flex justify-between mb-2">
              {monthLabels.map(({ month, index }) => (
                <span
                  key={month + index}
                  className="text-xs text-gray-400"
                  style={{ marginLeft: `${(index / weeks.length) * 100}%` }}
                >
                  {month}
                </span>
              ))}
            </div>

            {/* Contribution grid */}
            <div className="flex gap-1">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {week.map((day, dayIndex) => (
                    <motion.div
                      key={day.date}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.2,
                        delay: (weekIndex * 7 + dayIndex) * 0.01,
                      }}
                      className={`w-3 h-3 rounded-sm ${
                        LEVEL_COLORS[day.level]
                      }`}
                      title={`${day.count} contributions on ${new Date(
                        day.date
                      ).toLocaleDateString()}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-1 mt-4">
          <span className="text-xs text-gray-400">Less</span>
          {Object.values(LEVEL_COLORS).map((color, index) => (
            <div key={index} className={`w-3 h-3 rounded-sm ${color}`} />
          ))}
          <span className="text-xs text-gray-400">More</span>
        </div>
      </CardContent>
    </Card>
  );
}
