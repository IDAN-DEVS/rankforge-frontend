import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { RECENT_CONTRIBUTIONS } from "@/lib/constants";
import { format } from "date-fns";

// Helper function to format contribution type for display
function formatType(type: string) {
  return type
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Helper function to get badge variant based on status
function getStatusBadgeVariant(
  status: string
): "outline" | "destructive" | "secondary" | "default" {
  switch (status) {
    case "approved":
      return "secondary";
    case "pending":
      return "outline";
    case "rejected":
      return "destructive";
    default:
      return "default";
  }
}

export default function ContributionsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold mb-2">Your Contributions</h1>
          <p className="text-muted-foreground">
            View and manage your submitted contributions
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/submit">Submit New</Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contribution History</CardTitle>
          <CardDescription>
            All your submitted contributions and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {RECENT_CONTRIBUTIONS.map((contribution) => (
                <TableRow key={contribution.id}>
                  <TableCell className="font-medium">
                    <Link
                      href={`/dashboard/contributions/${contribution.id}`}
                      className="hover:underline"
                    >
                      {contribution.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {formatType(contribution.type)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(contribution.status)}>
                      {contribution.status.charAt(0).toUpperCase() +
                        contribution.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{contribution.score ?? "—"}</TableCell>
                  <TableCell>
                    {format(new Date(contribution.date), "EEE, MMM d, yyyy")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
