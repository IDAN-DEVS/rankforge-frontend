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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MoreHorizontal,
  Search,
  User,
  Shield,
  Award,
  Crown,
  UserCheck,
  UserX,
  MailIcon,
  Calendar,
  UserPlus,
  AlertCircle,
  CheckCircle,
  XCircle,
  Filter,
} from "lucide-react";

// Define user type
interface UserData {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  role: string;
  status: string;
  joinedAt: string;
  contributions: number;
  score: number;
  rank: string;
  lastActive: string;
  bio: string;
}

// Mock user data with consistent details across admin pages
const mockUsers = [
  {
    id: "u1",
    name: "Sarah Johnson",
    username: "sarah_dev",
    email: "sarah@example.com",
    avatar: "/images/user_avatar.png",
    role: "contributor",
    status: "active",
    joinedAt: "2024-01-15T00:00:00Z",
    contributions: 28,
    score: 92,
    rank: "gold",
    lastActive: "2024-05-29T09:15:00Z",
    bio: "Full-stack developer with a passion for open source. Working primarily with React and Node.js.",
  },
  {
    id: "u2",
    name: "Michael Chen",
    username: "mchen",
    email: "michael@example.com",
    avatar: "/images/user_avatar.png",
    role: "contributor",
    status: "active",
    joinedAt: "2024-02-03T00:00:00Z",
    contributions: 16,
    score: 78,
    rank: "silver",
    lastActive: "2024-05-28T14:30:00Z",
    bio: "Backend engineer specializing in Python and distributed systems.",
  },
  {
    id: "u3",
    name: "Jessica Williams",
    username: "jwilliams",
    email: "jessica@example.com",
    avatar: "/images/user_avatar.png",
    role: "admin",
    status: "active",
    joinedAt: "2023-11-10T00:00:00Z",
    contributions: 42,
    score: 96,
    rank: "platinum",
    lastActive: "2024-05-30T08:45:00Z",
    bio: "Platform administrator and open source advocate. Contributing to UI/UX improvements.",
  },
  {
    id: "u4",
    name: "David Rodriguez",
    username: "drodriguez",
    email: "david@example.com",
    avatar: "/images/user_avatar.png",
    role: "contributor",
    status: "inactive",
    joinedAt: "2024-03-22T00:00:00Z",
    contributions: 5,
    score: 65,
    rank: "bronze",
    lastActive: "2024-04-15T16:20:00Z",
    bio: "DevOps engineer interested in CI/CD pipelines and infrastructure as code.",
  },
  {
    id: "u5",
    name: "Emily Thompson",
    username: "emily_t",
    email: "emily@example.com",
    avatar: "/images/user_avatar.png",
    role: "contributor",
    status: "pending",
    joinedAt: "2024-05-25T00:00:00Z",
    contributions: 0,
    score: 0,
    rank: "none",
    lastActive: "2024-05-25T11:10:00Z",
    bio: "Frontend developer focusing on React and modern CSS. Excited to contribute!",
  },
  {
    id: "u6",
    name: "Alex Turner",
    username: "aturner",
    email: "alex@example.com",
    avatar: "/images/user_avatar.png",
    role: "contributor",
    status: "suspended",
    joinedAt: "2024-01-30T00:00:00Z",
    contributions: 12,
    score: 73,
    rank: "silver",
    lastActive: "2024-04-02T15:30:00Z",
    bio: "Machine learning engineer working on NLP and computer vision projects.",
  },
  {
    id: "u7",
    name: "Lisa Morgan",
    username: "lisa_m",
    email: "lisa@example.com",
    avatar: "/images/user_avatar.png",
    role: "moderator",
    status: "active",
    joinedAt: "2023-12-05T00:00:00Z",
    contributions: 31,
    score: 88,
    rank: "gold",
    lastActive: "2024-05-29T17:25:00Z",
    bio: "Quality assurance specialist and documentation enthusiast. Focuses on improving test coverage.",
  },
];

// Role badge component
const RoleBadge = ({ role }: { role: string }) => {
  const getRoleStyles = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "moderator":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "contributor":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return <Shield className="h-3 w-3 mr-1" />;
      case "moderator":
        return <UserCheck className="h-3 w-3 mr-1" />;
      case "contributor":
        return <User className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <Badge
      className={`${getRoleStyles(role)} border-0 flex items-center`}
      variant="outline"
    >
      {getRoleIcon(role)}
      {role.charAt(0).toUpperCase() + role.slice(1)}
    </Badge>
  );
};

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
      case "pending":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      case "suspended":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <CheckCircle className="h-3 w-3 mr-1" />;
      case "inactive":
        return <XCircle className="h-3 w-3 mr-1" />;
      case "pending":
        return <AlertCircle className="h-3 w-3 mr-1" />;
      case "suspended":
        return <UserX className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <Badge
      className={`${getStatusStyles(status)} border-0 flex items-center`}
      variant="outline"
    >
      {getStatusIcon(status)}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

// Rank badge component
const RankBadge = ({ rank }: { rank: string }) => {
  const getRankStyles = (rank: string) => {
    switch (rank.toLowerCase()) {
      case "platinum":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400";
      case "gold":
        return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      case "silver":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
      case "bronze":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      case "none":
        return "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getRankIcon = (rank: string) => {
    switch (rank.toLowerCase()) {
      case "platinum":
        return <Crown className="h-3 w-3 mr-1" />;
      case "gold":
        return <Award className="h-3 w-3 mr-1" />;
      case "silver":
        return <Award className="h-3 w-3 mr-1" />;
      case "bronze":
        return <Award className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  if (rank.toLowerCase() === "none") {
    return <span className="text-gray-500 text-sm">No rank</span>;
  }

  return (
    <Badge
      className={`${getRankStyles(rank)} border-0 flex items-center`}
      variant="outline"
    >
      {getRankIcon(rank)}
      {rank.charAt(0).toUpperCase() + rank.slice(1)}
    </Badge>
  );
};

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("all");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [rankFilter, setRankFilter] = useState<string>("all");
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [showAddUserDialog, setShowAddUserDialog] = useState<boolean>(false);
  const [newUser, setNewUser] = useState({
    name: "",
    username: "",
    email: "",
    role: "contributor",
  });

  // Filter users based on active tab, search query, role, and rank
  const filteredUsers = mockUsers.filter((user) => {
    // Filter by status tab
    const matchesStatus =
      activeTab === "all" ||
      (activeTab === "active" && user.status === "active") ||
      (activeTab === "pending" && user.status === "pending") ||
      (activeTab === "suspended" && user.status === "suspended") ||
      (activeTab === "inactive" && user.status === "inactive");

    // Filter by search query
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    // Filter by role
    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    // Filter by rank
    const matchesRank = rankFilter === "all" || user.rank === rankFilter;

    return matchesStatus && matchesSearch && matchesRole && matchesRank;
  });

  const handleAddUser = () => {
    // Validation
    if (!newUser.name || !newUser.username || !newUser.email) {
      toast.error("Please fill out all required fields");
      return;
    }

    // In a real app, we would call an API to create the user
    toast.success(
      `User ${newUser.name} (${newUser.username}) added successfully`
    );
    setShowAddUserDialog(false);
    setNewUser({
      name: "",
      username: "",
      email: "",
      role: "contributor",
    });
  };

  const handleSuspendUser = (user: UserData) => {
    // In a real app, we would call an API to suspend the user
    toast.info(`User ${user.username} has been suspended`);
  };

  const handleActivateUser = (user: UserData) => {
    // In a real app, we would call an API to activate the user
    toast.success(`User ${user.username} has been activated`);
  };

  const handleDeleteUser = (user: UserData) => {
    // In a real app, we would call an API to delete the user
    toast.success(`User ${user.username} has been deleted`);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-3xl font-bold mb-1">Manage Users</h1>
        <p className="text-muted-foreground">
          View and manage all user accounts
        </p>
      </motion.div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full sm:w-auto"
        >
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="suspended">Suspended</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="sm:flex items-center"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
          <Button
            size="sm"
            className="ml-auto flex items-center"
            onClick={() => setShowAddUserDialog(true)}
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div>
            <label className="text-sm font-medium block mb-2">Role</label>
            <Select
              value={roleFilter}
              onValueChange={(value) => setRoleFilter(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="moderator">Moderator</SelectItem>
                <SelectItem value="contributor">Contributor</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium block mb-2">Rank</label>
            <Select
              value={rankFilter}
              onValueChange={(value) => setRankFilter(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by rank" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Ranks</SelectItem>
                <SelectItem value="platinum">Platinum</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="bronze">Bronze</SelectItem>
                <SelectItem value="none">No Rank</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search users by name, username, or email..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            {activeTab === "all"
              ? "All registered users"
              : `${
                  activeTab.charAt(0).toUpperCase() + activeTab.slice(1)
                } users`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead>Contributions</TableHead>
                <TableHead>Rank</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>
                            {user.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">
                            @{user.username}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <RoleBadge role={user.role} />
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={user.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>
                          {new Date(user.joinedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{user.contributions}</span>
                    </TableCell>
                    <TableCell>
                      <RankBadge rank={user.rank} />
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => setSelectedUser(user)}
                          >
                            <User className="h-4 w-4 mr-2" />
                            View profile
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <MailIcon className="h-4 w-4 mr-2" />
                            Send email
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.status === "active" ? (
                            <DropdownMenuItem
                              onClick={() => handleSuspendUser(user)}
                              className="text-amber-600 focus:text-amber-600"
                            >
                              <UserX className="h-4 w-4 mr-2" />
                              Suspend
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem
                              onClick={() => handleActivateUser(user)}
                              className="text-green-600 focus:text-green-600"
                            >
                              <UserCheck className="h-4 w-4 mr-2" />
                              Activate
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => handleDeleteUser(user)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10">
                    <div className="flex flex-col items-center justify-center text-muted-foreground">
                      <User className="h-12 w-12 mb-3 opacity-20" />
                      <p>No users found</p>
                      <p className="text-sm">
                        {searchQuery ||
                        roleFilter !== "all" ||
                        rankFilter !== "all"
                          ? "Try adjusting your filters"
                          : `No ${
                              activeTab !== "all" ? activeTab : ""
                            } users to show`}
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="text-sm text-muted-foreground">
            Showing {filteredUsers.length} of {mockUsers.length} users
          </div>
        </CardFooter>
      </Card>

      {/* User profile dialog */}
      {selectedUser && (
        <Dialog
          open={!!selectedUser}
          onOpenChange={() => setSelectedUser(null)}
        >
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>User Profile</DialogTitle>
              <DialogDescription>
                View user details and activity
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={selectedUser.avatar}
                    alt={selectedUser.name}
                  />
                  <AvatarFallback>
                    {selectedUser.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-medium">{selectedUser.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    @{selectedUser.username}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <RoleBadge role={selectedUser.role} />
                    <StatusBadge status={selectedUser.status} />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedUser.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Joined</p>
                  <p className="font-medium">
                    {new Date(selectedUser.joinedAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Last Active</p>
                  <p className="font-medium">
                    {new Date(selectedUser.lastActive).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Score</p>
                  <p className="font-medium">{selectedUser.score}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Activity</p>
                <div className="bg-muted/40 p-3 rounded-md grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">
                      {selectedUser.contributions}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Contributions
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex justify-center mb-1">
                      <RankBadge rank={selectedUser.rank} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Current Rank
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter className="flex justify-between items-center">
              <Button variant="outline" size="sm" asChild>
                <a
                  href={`/admin/contributions?user=${selectedUser.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Contributions
                </a>
              </Button>
              <div className="space-x-2">
                <DialogClose asChild>
                  <Button variant="outline">Close</Button>
                </DialogClose>
                <Button>Edit User</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Add user dialog */}
      <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>Create a new user account</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <Input
                placeholder="John Doe"
                value={newUser.name}
                onChange={(e) =>
                  setNewUser({ ...newUser, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <Input
                placeholder="johndoe"
                value={newUser.username}
                onChange={(e) =>
                  setNewUser({ ...newUser, username: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                type="email"
                placeholder="john@example.com"
                value={newUser.email}
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Select
                value={newUser.role}
                onValueChange={(value) =>
                  setNewUser({ ...newUser, role: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="moderator">Moderator</SelectItem>
                  <SelectItem value="contributor">Contributor</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddUserDialog(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddUser}>Add User</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
