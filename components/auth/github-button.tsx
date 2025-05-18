"use client";

import { useState } from "react";
import { UserRole } from "@/lib/validations/auth";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
      console.error(error);
      toast.error("Authentication failed. Please try again.");
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
      className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 border border-gray-300 rounded-full text-gray-700 bg-white hover:bg-gray-50 transition-colors ${className}`}
    >
      {/* GitHub Logo */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        className="text-black"
      >
        <path
          fill="currentColor"
          d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
        />
      </svg>
      <span className="font-medium">
        {isLoading
          ? `${variant === "signin" ? "Signing in" : "Signing up"}...`
          : `${variant === "signin" ? "Sign in" : "Sign up"} with GitHub`}
      </span>
    </motion.button>
  );
}
