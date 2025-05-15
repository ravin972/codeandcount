
"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  // To prevent hydration mismatch, render a placeholder or null until mounted.
  // A disabled button matching the final size with a default icon is a good approach.
  if (!mounted) {
    return (
      <Button variant="outline" size="icon" disabled aria-label="Loading theme toggle" className="rounded-full">
        <Sun className="h-[1.2rem] w-[1.2rem]" /> {/* Placeholder icon */}
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
      className="rounded-full"
    >
      <Sun
        className={cn(
          "h-[1.2rem] w-[1.2rem] transition-all",
          resolvedTheme === 'dark' ? "rotate-0 scale-100" : "-rotate-90 scale-0"
        )}
      />
      <Moon
        className={cn(
          "absolute h-[1.2rem] w-[1.2rem] transition-all",
          resolvedTheme === 'dark' ? "rotate-90 scale-0" : "rotate-0 scale-100"
        )}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
