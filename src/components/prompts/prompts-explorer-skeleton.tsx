import React from "react";
import { PromptCardSkeleton } from "@/components/ui/skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function PromptsExplorerSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Search Input Skeleton */}
      <Skeleton className="h-14 w-full rounded-[var(--radius-lg)]" />

      {/* Filters Toolbar Skeleton */}
      <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)]/60 p-5 space-y-4">
        <Skeleton className="h-4 w-32" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Skeleton className="h-10 rounded-[var(--radius-md)]" />
          <Skeleton className="h-10 rounded-[var(--radius-md)]" />
          <Skeleton className="h-10 rounded-[var(--radius-md)]" />
          <Skeleton className="h-10 rounded-[var(--radius-md)]" />
        </div>
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-6 w-14 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </div>

      {/* Count and Sort Bar Skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-36" />
        <Skeleton className="h-9 w-36 rounded-[var(--radius-md)]" />
      </div>

      {/* Prompts Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => (
          <PromptCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
