"use client";

import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
}

const emptySubscribe = () => () => {};

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
      className={cn(
        "relative inline-flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] transition-all duration-150 hover:border-[var(--border-strong)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)] focus-visible:outline-2 focus-visible:outline-[var(--primary)] cursor-pointer",
        className
      )}
    >
      {mounted ? (
        resolvedTheme === "dark" ? (
          <Sun className="h-3.5 w-3.5 text-amber-400 transition-transform duration-200 hover:rotate-45" aria-hidden="true" />
        ) : (
          <Moon className="h-3.5 w-3.5 text-indigo-600 transition-transform duration-200 hover:-rotate-12" aria-hidden="true" />
        )
      ) : (
        <span className="h-3.5 w-3.5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
