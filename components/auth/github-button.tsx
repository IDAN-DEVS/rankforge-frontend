"use client";

import { useState } from "react";
import { UserRole } from "@/lib/validations/auth";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Github } from "lucide-react";

interface GithubButtonProps {
  variant: "signin" | "signup";
  selectedRole: UserRole;
  className?: string;
}

export function GithubButton({
  variant,
  selectedRole,
  className = "",
}: GithubButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGithubAuth = async () => {
    setIsLoading(true);
    try {
      // This would be replaced with actual GitHub OAuth implementation
      console.log(`GitHub ${variant} with role: ${selectedRole}`);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success(
        `Signed ${variant === "signin" ? "in" : "up"} with GitHub successfully!`
      );

      if (variant === "signup") {
        // Mock user data from GitHub for demo purposes
        const mockGithubUser = {
          name: "GitHub User",
          email: "github-user@example.com",
        };

        // Redirect to verification page for signup
        router.push(
          `/auth/verify?email=${encodeURIComponent(
            mockGithubUser.email
          )}&name=${encodeURIComponent(mockGithubUser.name)}`
        );
      } else {
        // Regular sign in redirect to dashboard
        router.push("/dashboard");
      }
    } catch (error) {
      // console.error(error);
      toast.error("Authentication failed. Please try again.", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleGithubAuth}
      disabled={isLoading}
      className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-600 rounded-full text-primary-foreground hover:text-primary duration-300 bg-foreground hover:bg-background transition-colors ${className}`}
    >
      {/* GitHub Logo */}
      <Github className="w-4 h-4" />
      <span className="font-medium">
        {isLoading
          ? `${variant === "signin" ? "Signing in" : "Signing up"}...`
          : `${variant === "signin" ? "Sign in" : "Sign up"} with GitHub`}
      </span>
    </motion.button>
  );
}
