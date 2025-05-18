import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "motion/react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
  isPositive?: boolean;
  delay: number;
  icon: React.ReactNode;
}

export default function MetricCard({
  title,
  value,
  change,
  trend,
  isPositive = trend === "up",
  delay,
  icon,
}: MetricCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay }}
    >
      <Card>
        <div className="absolute top-0 right-0 p-3">{icon}</div>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-bold">{value}</span>
            <span
              className={`text-sm font-medium flex items-center ${
                isPositive ? "text-green-500" : "text-red-500"
              }`}
            >
              {trend === "up" ? (
                <ArrowUpRight className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownRight className="h-3 w-3 mr-1" />
              )}
              {change}
            </span>
          </div>
        </CardHeader>
      </Card>
    </motion.div>
  );
}
