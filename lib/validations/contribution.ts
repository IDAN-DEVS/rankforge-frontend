import * as z from "zod";

export const contributionSchema = z.object({
  title: z
    .string()
    .min(5, {
      message: "Title must be at least 5 characters.",
    })
    .max(100, {
      message: "Title must not exceed 100 characters.",
    }),
  type: z.enum(
    [
      "feature",
      "bug_fix",
      "documentation",
      "design",
      "performance",
      "accessibility",
      "other",
    ],
    {
      required_error: "Please select a contribution type.",
    }
  ),
  description: z
    .string()
    .min(20, {
      message: "Description must be at least 20 characters.",
    })
    .max(1000, {
      message: "Description must not exceed 1000 characters.",
    }),
  pullRequestUrl: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional()
    .or(z.literal("")),
  issueUrl: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional()
    .or(z.literal("")),
  additionalNotes: z
    .string()
    .max(500, {
      message: "Additional notes must not exceed 500 characters.",
    })
    .optional(),
});

export type ContributionValues = z.infer<typeof contributionSchema>;
