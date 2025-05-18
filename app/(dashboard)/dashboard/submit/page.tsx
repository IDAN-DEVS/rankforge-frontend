import { ContributionForm } from "@/components/dashboard/contribution-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SubmitContributionPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold mb-2">Submit Contribution</h1>
        <p className="text-muted-foreground">
          Submit a new contribution for evaluation
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contribution Details</CardTitle>
          <CardDescription>
            Provide information about your contribution to the project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ContributionForm />
        </CardContent>
      </Card>
    </div>
  );
}
