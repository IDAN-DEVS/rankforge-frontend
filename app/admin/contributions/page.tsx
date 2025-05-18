"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "motion/react";
import { toast } from "sonner";
import {
  Calendar,
  Clock,
  FileText,
  Github,
  Link as LinkIcon,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageCircle,
  Sliders,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define contribution type
interface Contribution {
  id: string;
  title: string;
  username: string;
  name: string;
  avatar: string;
  submittedAt: string;
  githubLink: string;
  deployLink: string | null;
  type: string;
  status: string;
  description: string;
}

// Mock contribution data matched with consistent users
const mockContributions = [
  {
    id: "c1",
    title: "Fix responsive navigation menu for mobile devices",
    username: "sarah_dev",
    name: "Sarah Johnson",
    avatar: "/images/user_avatar.png",
    submittedAt: "2024-05-28T14:30:00Z",
    githubLink: "https://github.com/org/rankforge/pull/123",
    deployLink: "https://preview-123.rankforge.dev",
    type: "Bug Fix",
    status: "pending",
    description:
      "Fixed an issue where the navigation menu would disappear on mobile screens smaller than 320px. Implemented a responsive drawer menu that works consistently across all device sizes. Added proper aria labels and keyboard navigation.",
  },
  {
    id: "c2",
    title: "Implement dark mode support with system preference detection",
    username: "mchen",
    name: "Michael Chen",
    avatar: "/images/user_avatar.png",
    submittedAt: "2024-05-27T09:15:00Z",
    githubLink: "https://github.com/org/rankforge/pull/124",
    deployLink: "https://preview-124.rankforge.dev",
    type: "Feature",
    status: "pending",
    description:
      "Built a comprehensive dark mode implementation using CSS variables and a theme provider. Added system preference detection, persistent theme selection, and smooth transitions between modes. Ensured proper contrast ratios for accessibility.",
  },
  {
    id: "c3",
    title: "Performance optimization for image loading with lazy loading",
    username: "drodriguez",
    name: "David Rodriguez",
    avatar: "/images/user_avatar.png",
    submittedAt: "2024-05-26T11:45:00Z",
    githubLink: "https://github.com/org/rankforge/pull/125",
    deployLink: "https://preview-125.rankforge.dev",
    type: "Performance",
    status: "pending",
    description:
      "Improved page load time by implementing lazy loading for all images across the site. Added proper width and height attributes to prevent layout shifts. Also implemented responsive image loading with srcset and sizes attributes to serve appropriately sized images based on device width.",
  },
  {
    id: "c4",
    title: "Updated API documentation with comprehensive examples",
    username: "lisa_m",
    name: "Lisa Morgan",
    avatar: "/images/user_avatar.png",
    submittedAt: "2024-05-25T16:20:00Z",
    githubLink: "https://github.com/org/rankforge/pull/126",
    deployLink: null,
    type: "Documentation",
    status: "pending",
    description:
      "Completely rewrote the API documentation to include better examples, response formats, and error handling. Added a new section on authentication and rate limiting. Created interactive examples using Swagger UI and added test coverage for all documented endpoints.",
  },
  {
    id: "c5",
    title: "Accessibility improvements for form components",
    username: "aturner",
    name: "Alex Turner",
    avatar: "/images/user_avatar.png",
    submittedAt: "2024-05-24T10:05:00Z",
    githubLink: "https://github.com/org/rankforge/pull/127",
    deployLink: "https://preview-127.rankforge.dev",
    type: "Accessibility",
    status: "pending",
    description:
      "Made several accessibility improvements to form components including better keyboard navigation, ARIA labels, and contrast ratios. All components now pass WCAG 2.1 AA standards. Added focus indication, error messages that work with screen readers, and improved tab order.",
  },
];

// Mock scoring criteria
const scoringCriteria = [
  {
    name: "Code Quality",
    description: "Clean, maintainable, and follows best practices",
    min: 0,
    max: 100,
  },
  {
    name: "Impact",
    description: "Significance and value of the contribution",
    min: 0,
    max: 100,
  },
  {
    name: "Complexity",
    description: "Technical difficulty and problem-solving involved",
    min: 0,
    max: 100,
  },
  {
    name: "Documentation",
    description: "Clarity of documentation and commit messages",
    min: 0,
    max: 100,
  },
  {
    name: "Testing",
    description: "Test coverage and quality",
    min: 0,
    max: 100,
  },
];

// Badge component for contribution types
const TypeBadge = ({ type }: { type: string }) => {
  const getTypeStyles = (type: string) => {
    switch (type.toLowerCase()) {
      case "bug fix":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "feature":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "performance":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      case "documentation":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "accessibility":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <Badge className={`${getTypeStyles(type)} border-0`} variant="outline">
      {type}
    </Badge>
  );
};

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "pending":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  return (
    <Badge className={`${getStatusStyles(status)} border-0`} variant="outline">
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

export default function AdminContributionsPage() {
  const [selectedContribution, setSelectedContribution] =
    useState<Contribution | null>(null);
  const [activeTab, setActiveTab] = useState<string>("pending");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [scores, setScores] = useState<{ [key: string]: number }>({
    "Code Quality": 80,
    Impact: 85,
    Complexity: 70,
    Documentation: 90,
    Testing: 75,
  });
  const [reviewNotes, setReviewNotes] = useState<string>("");

  // Filter contributions based on status and search query
  const filteredContributions = mockContributions.filter((contribution) => {
    const matchesStatus =
      activeTab === "all" || contribution.status === activeTab;
    const matchesSearch =
      contribution.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contribution.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contribution.type.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearch;
  });

  const handleScoreChange = (criterion: string, value: number[]) => {
    setScores({ ...scores, [criterion]: value[0] });
  };

  const calculateTotalScore = () => {
    const total = Object.values(scores).reduce((sum, score) => sum + score, 0);
    return Math.round(total / Object.values(scores).length);
  };

  const handleApprove = () => {
    toast.success(`Contribution approved with score: ${calculateTotalScore()}`);
    // In a real app, we would update the API here
    setSelectedContribution(null);
    setReviewNotes("");
  };

  const handleReject = () => {
    toast.error(`Contribution rejected with feedback`);
    // In a real app, we would update the API here
    setSelectedContribution(null);
    setReviewNotes("");
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold mb-1">Review Contributions</h1>
        <p className="text-muted-foreground">
          Evaluate and score user contributions
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <Tabs
          defaultValue="pending"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full md:w-auto"
        >
          <TabsList>
            <TabsTrigger value="pending" className="flex items-center gap-1">
              <AlertCircle className="h-4 w-4" />
              <span>Pending</span>
            </TabsTrigger>
            <TabsTrigger value="approved" className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              <span>Approved</span>
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex items-center gap-1">
              <XCircle className="h-4 w-4" />
              <span>Rejected</span>
            </TabsTrigger>
            <TabsTrigger value="all" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span>All</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search contributions..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Contributions</CardTitle>
          <CardDescription>
            {activeTab === "pending"
              ? "Contributions waiting for review"
              : activeTab === "approved"
              ? "Approved contributions"
              : activeTab === "rejected"
              ? "Rejected contributions"
              : "All contributions"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Contributor</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContributions.length > 0 ? (
                filteredContributions.map((contribution) => (
                  <TableRow key={contribution.id}>
                    <TableCell className="font-medium">
                      {contribution.title}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={contribution.avatar}
                            alt={contribution.name}
                          />
                          <AvatarFallback>
                            {contribution.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {contribution.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            @{contribution.username}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <TypeBadge type={contribution.type} />
                    </TableCell>
                    <TableCell>
                      {new Date(contribution.submittedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={contribution.status} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedContribution(contribution)}
                      >
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <FileText className="h-12 w-12 mb-2 opacity-20" />
                      <p>No contributions found</p>
                      <p className="text-sm">
                        {searchQuery
                          ? "Try a different search term"
                          : `No ${
                              activeTab !== "all" ? activeTab : ""
                            } contributions to show`}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {selectedContribution && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <CardTitle>{selectedContribution.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={selectedContribution.avatar}
                        alt={selectedContribution.name}
                      />
                      <AvatarFallback>
                        {selectedContribution.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span>
                      Submitted by {selectedContribution.name} (@
                      {selectedContribution.username}) on{" "}
                      {new Date(
                        selectedContribution.submittedAt
                      ).toLocaleDateString()}
                    </span>
                  </CardDescription>
                </div>
                <TypeBadge type={selectedContribution.type} />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/40 p-4 rounded-md">
                <h3 className="text-sm font-medium mb-2">Description</h3>
                <p className="text-sm">{selectedContribution.description}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Github className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={selectedContribution.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    View on GitHub
                  </a>
                </div>
                {selectedContribution.deployLink && (
                  <div className="flex items-center gap-2 text-sm">
                    <LinkIcon className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={selectedContribution.deployLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Preview Deployment
                    </a>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {new Date(
                      selectedContribution.submittedAt
                    ).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>
                    {new Date(
                      selectedContribution.submittedAt
                    ).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex flex-row items-center">
                <Sliders className="h-5 w-5 mr-2" />
                <CardTitle>Evaluation</CardTitle>
              </div>
              <CardDescription>
                Score the contribution across different criteria
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {scoringCriteria.map((criterion) => (
                <div key={criterion.name} className="space-y-2">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-sm font-medium">{criterion.name}</h3>
                      <p className="text-xs text-muted-foreground">
                        {criterion.description}
                      </p>
                    </div>
                    <span className="text-lg font-bold">
                      {scores[criterion.name]}
                    </span>
                  </div>
                  <Slider
                    defaultValue={[scores[criterion.name]]}
                    max={criterion.max}
                    min={criterion.min}
                    step={1}
                    onValueChange={(value) =>
                      handleScoreChange(criterion.name, value)
                    }
                  />
                </div>
              ))}

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-2 flex items-center">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Review Notes
                </h3>
                <Textarea
                  placeholder="Provide feedback for the contributor..."
                  className="min-h-28"
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                />
              </div>

              <div className="p-4 bg-muted/40 rounded-md flex flex-col md:flex-row md:items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold">
                    Total Score: {calculateTotalScore()}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Average across all criteria
                  </p>
                </div>
                <div className="text-sm">
                  <span
                    className={`inline-block w-3 h-3 rounded-full mr-1 ${
                      calculateTotalScore() >= 90
                        ? "bg-green-500"
                        : calculateTotalScore() >= 70
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                  ></span>
                  {calculateTotalScore() >= 90
                    ? "Excellent"
                    : calculateTotalScore() >= 70
                    ? "Good"
                    : "Needs Improvement"}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setSelectedContribution(null)}
              >
                Cancel
              </Button>
              <div className="space-x-2">
                <Button
                  variant="destructive"
                  onClick={handleReject}
                  disabled={!reviewNotes.trim()}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button onClick={handleApprove}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
