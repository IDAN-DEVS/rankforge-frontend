import { CONTRIBUTIONS } from "@/lib/constants";

export interface ContributionData {
  date: string;
  contributions: Array<{
    repo: string;
    action: string;
  }>;
}

// Get total count of each contribution type (commit, PR, issue, etc.)
export function getContributionTypeBreakdown() {
  const typeCounts: Record<string, number> = {};

  CONTRIBUTIONS.forEach((day) => {
    day.contributions.forEach((contribution) => {
      const action = contribution.action;
      typeCounts[action] = (typeCounts[action] || 0) + 1;
    });
  });

  // Transform into format for pie chart
  const pieData = Object.entries(typeCounts).map(([action, count]) => ({
    name: action.charAt(0).toUpperCase() + action.slice(1), // Capitalize
    value: count,
  }));

  return pieData;
}

// Get contribution colors based on action type
export function getContributionTypeColors(): Record<string, string> {
  return {
    commit: "#3b82f6", // blue
    PR: "#ef4444", // red
    issue: "#a855f7", // purple
    create_repo: "#10b981", // green
    default: "#f97316", // orange
  };
}

// Map colors to pie chart data
export function getContributionPieChartData() {
  const data = getContributionTypeBreakdown();
  const colors = getContributionTypeColors();

  // Map the colors to each item
  return {
    data,
    colors: data.map((item) => {
      const actionType = item.name.toLowerCase();
      return colors[actionType] || colors.default;
    }),
  };
}

// Get monthly contribution counts
export function getMonthlyContributionData() {
  const monthNames = [
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

  // Initialize with empty data for all months
  const monthlyData = monthNames.map((month) => ({
    month,
    count: 0,
    score: 75 + Math.floor(Math.random() * 20), // Random score between 75-95 for demo
  }));

  // Fill with actual data
  CONTRIBUTIONS.forEach((day) => {
    const date = new Date(day.date.replace(/(\d+)-(\d+)-(\d+)/, "$3-$1-$2"));
    const monthIndex = date.getMonth();
    monthlyData[monthIndex].count += day.contributions.length;
  });

  return monthlyData;
}

// Get total counts for each repository
export function getRepositoryBreakdown() {
  const repoCounts: Record<string, number> = {};

  CONTRIBUTIONS.forEach((day) => {
    day.contributions.forEach((contribution) => {
      // Extract repo name from URL
      const repoName = contribution.repo.split("/").pop() || "";
      repoCounts[repoName] = (repoCounts[repoName] || 0) + 1;
    });
  });

  return Object.entries(repoCounts).map(([name, value]) => ({
    name,
    value,
  }));
}

// Utility to get total contribution count
export function getTotalContributionCount() {
  return CONTRIBUTIONS.reduce(
    (total, day) => total + day.contributions.length,
    0
  );
}

// Get contribution metrics for dashboard cards
export function getContributionMetrics() {
  const totalContributions = getTotalContributionCount();
  const daysWithActivity = CONTRIBUTIONS.length;

  // Count specific types
  let commits = 0;
  let pullRequests = 0;

  CONTRIBUTIONS.forEach((day) => {
    day.contributions.forEach((contribution) => {
      if (contribution.action === "commit") commits++;
      if (contribution.action === "PR") pullRequests++;
    });
  });

  return {
    totalContributions,
    daysWithActivity,
    commits,
    pullRequests,
  };
}
