import { LeaderboardTable } from "@/components/leaderboard/leaderboard-table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LeaderboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-32">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Leaderboard</h1>
          <p className="text-muted-foreground">
            Top contributors ranked by their contribution scores
          </p>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Contributors Ranking</CardTitle>
            <CardDescription>
              Sorted by score by default. Click on column headers to change
              sorting.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LeaderboardTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
