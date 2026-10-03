import React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "rectangular" | "circular" | "text";
}

export function Skeleton({
  className,
  variant = "rectangular",
  ...props
}: SkeletonProps) {
  const variantStyles = {
    rectangular: "rounded-[var(--radius-md)]",
    circular: "rounded-full",
    text: "rounded-[var(--radius-sm)] h-4 w-full",
  };

  return (
    <div
      className={cn(
        "animate-pulse bg-[var(--secondary)]/80",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

/**
 * Pre-composed PromptCardSkeleton matching the exact layout of PromptCard
 * preventing Cumulative Layout Shift (CLS).
 */
export function PromptCardSkeleton() {
  return (
    <div className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--muted)]/50 p-3 space-y-1.5">
        <Skeleton className="h-3 w-1/3" />
        <Skeleton className="h-3 w-4/5" />
      </div>
      <div className="flex items-center justify-between pt-2 border-t border-[var(--border-subtle)]">
        <div className="flex gap-1.5">
          <Skeleton className="h-4 w-12 rounded-full" />
          <Skeleton className="h-4 w-12 rounded-full" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8 rounded-[var(--radius-md)]" />
          <Skeleton className="h-8 w-20 rounded-[var(--radius-md)]" />
        </div>
      </div>
    </div>
  );
}
