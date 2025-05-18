import React from "react";
import {
  LineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ComposedChart,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartTooltip,
} from "@/components/ui/chart";

// Define types for the different chart configurations
interface BaseChartConfig {
  showLegend?: boolean;
  xAxisKey?: string;
  dataKey?: string;
}

interface PieChartConfig extends BaseChartConfig {
  colors?: string[];
  nameKey?: string;
}

interface MixedChartConfig extends BaseChartConfig {
  lineKey?: string;
  barKey?: string;
  lineColor?: string;
  barColor?: string;
  leftDomain?: [number, number] | ["auto", "auto"];
  rightDomain?: [number, number] | ["auto", "auto"];
  showRightAxis?: boolean;
  lineAxis?: string;
  barAxis?: string;
}

interface CombinedChartProps {
  type: "line" | "bar" | "pie" | "mixed";
  data: Record<string, unknown>[];
  height?: number;
  config?: BaseChartConfig | PieChartConfig | MixedChartConfig;
}

export default function CombinedChart({
  type,
  data,
  height = 200,
  config = {},
}: CombinedChartProps) {
  if (type === "pie") {
    const pieConfig = config as PieChartConfig;
    return (
      <ChartContainer
        config={Object.fromEntries(
          (pieConfig.colors || []).map((color: string, i: number) => [
            `category-${i}`,
            { color },
          ])
        )}
        className={`h-[${height}px] w-full`}
      >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey={pieConfig.dataKey || "value"}
            nameKey={pieConfig.nameKey || "name"}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  pieConfig.colors?.[index] || `var(--color-category-${index})`
                }
              />
            ))}
          </Pie>
          {pieConfig.showLegend && <Legend />}
        </PieChart>
      </ChartContainer>
    );
  }

  // For mixed charts (line + bar)
  if (type === "mixed") {
    const mixedConfig = config as MixedChartConfig;
    return (
      <ChartContainer
        config={{
          line: {
            color: mixedConfig.lineColor || "#3b82f6",
          },
          bar: {
            color: mixedConfig.barColor || "#10b981",
          },
        }}
        className={`h-[${height}px] w-full`}
      >
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={mixedConfig.xAxisKey || "name"}
            tickLine={true}
            tickMargin={10}
          />
          <YAxis
            yAxisId="left"
            orientation="left"
            domain={mixedConfig.leftDomain || ["auto", "auto"]}
          />
          {mixedConfig.showRightAxis && (
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={mixedConfig.rightDomain || ["auto", "auto"]}
            />
          )}
          <ChartTooltip content={<ChartTooltipContent />} />
          {mixedConfig.showLegend && <Legend />}
          <Bar
            yAxisId={mixedConfig.barAxis || "left"}
            dataKey={mixedConfig.barKey || "value"}
            fill="var(--color-bar)"
            radius={[4, 4, 0, 0]}
          />
          <Line
            yAxisId={mixedConfig.lineAxis || "left"}
            type="monotone"
            dataKey={mixedConfig.lineKey || "value"}
            stroke="var(--color-line)"
            dot={{ fill: "var(--color-line)" }}
          />
        </ComposedChart>
      </ChartContainer>
    );
  }

  // Default for simple line or bar charts
  const baseConfig = config as BaseChartConfig;
  return (
    <ChartContainer
      config={{
        data: {
          color: "#3b82f6",
        },
      }}
      className={`h-[${height}px] w-full`}
    >
      {type === "line" ? (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey={baseConfig.xAxisKey || "name"}
            tickLine={true}
            tickMargin={10}
          />
          <YAxis domain={["auto", "auto"]} />
          <ChartTooltip content={<ChartTooltipContent />} />
          {baseConfig.showLegend && <Legend />}
          <Line
            type="monotone"
            dataKey={baseConfig.dataKey || "value"}
            stroke="var(--color-data)"
            dot={{ fill: "var(--color-data)" }}
          />
        </LineChart>
      ) : (
        <RechartsBarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey={baseConfig.xAxisKey || "name"}
            tickLine={true}
            tickMargin={10}
          />
          <YAxis domain={["auto", "auto"]} />
          <ChartTooltip content={<ChartTooltipContent />} />
          {baseConfig.showLegend && <Legend />}
          <Bar
            dataKey={baseConfig.dataKey || "value"}
            fill="var(--color-data)"
            radius={[4, 4, 0, 0]}
          />
        </RechartsBarChart>
      )}
    </ChartContainer>
  );
}
