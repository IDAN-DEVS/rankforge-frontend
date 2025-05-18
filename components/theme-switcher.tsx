"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-9 w-9 relative"
          aria-label={`Change theme, current theme: ${theme}`}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className={theme === "light" ? "bg-accent" : ""}
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className={theme === "dark" ? "bg-accent" : ""}
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className={theme === "system" ? "bg-accent" : ""}
        >
          <Monitor className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Simple variant for use in settings page
export function ThemeSelector() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex flex-col space-y-4">
      <div
        className={`flex items-center space-x-2 py-3 px-4 rounded-lg border cursor-pointer transition-colors hover:bg-accent ${
          theme === "light" ? "border-primary bg-accent" : "border-border"
        }`}
        onClick={() => setTheme("light")}
      >
        <Sun className="h-5 w-5" />
        <div>
          <p className="font-medium">Light</p>
          <p className="text-sm text-muted-foreground">Use light theme</p>
        </div>
      </div>

      <div
        className={`flex items-center space-x-2 py-3 px-4 rounded-lg border cursor-pointer transition-colors hover:bg-accent ${
          theme === "dark" ? "border-primary bg-accent" : "border-border"
        }`}
        onClick={() => setTheme("dark")}
      >
        <Moon className="h-5 w-5" />
        <div>
          <p className="font-medium">Dark</p>
          <p className="text-sm text-muted-foreground">Use dark theme</p>
        </div>
      </div>

      <div
        className={`flex items-center space-x-2 py-3 px-4 rounded-lg border cursor-pointer transition-colors hover:bg-accent ${
          theme === "system" ? "border-primary bg-accent" : "border-border"
        }`}
        onClick={() => setTheme("system")}
      >
        <Monitor className="h-5 w-5" />
        <div>
          <p className="font-medium">System</p>
          <p className="text-sm text-muted-foreground">
            Follow system appearance
          </p>
        </div>
      </div>
    </div>
  );
}
