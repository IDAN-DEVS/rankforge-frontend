import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function LeaderboardCard() {
  // Array of leaderboard entries
  const leaderboardEntries = [
    {
      position: 4,
      name: "Adeline Karter",
      points: 892,
      isCurrentUser: false,
    },
    {
      position: 5,
      name: "Cameron Philips",
      points: 871,
      isCurrentUser: false,
    },
    {
      position: 6,
      name: "You",
      points: 843,
      isCurrentUser: true,
    },
    {
      position: 7,
      name: "Lucas Wong",
      points: 821,
      isCurrentUser: false,
    },
  ];

  const router = useRouter();

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Leaderboard Position</CardTitle>
        <CardDescription>Your standing among contributors</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          {leaderboardEntries.map((entry) => (
            <div
              key={entry.position}
              className={`flex items-center justify-between p-2 rounded ${
                entry.isCurrentUser
                  ? "bg-primary/5 border border-primary/20"
                  : "bg-background"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-xs font-medium ${
                    entry.isCurrentUser
                      ? "bg-primary text-white"
                      : "bg-orange-100 text-orange-600"
                  }`}
                >
                  {entry.position}
                </div>
                <div className="font-medium text-sm">{entry.name}</div>
              </div>
              <div className="text-sm font-medium">{entry.points} pts</div>
            </div>
          ))}
        </div>

        <Button
          variant="ghost"
          className="w-full mt-4 text-sm"
          onClick={() => router.push("/leaderboard")}
        >
          View full leaderboard
        </Button>
      </CardContent>
    </Card>
  );
}
