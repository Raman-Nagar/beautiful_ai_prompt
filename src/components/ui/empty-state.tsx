import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { SearchX, Inbox, BookmarkX, Sparkles } from "lucide-react";

export type EmptyStateVariant = "search" | "favorites" | "default" | "error";

export interface EmptyStateProps {
  variant?: EmptyStateVariant;
  icon?: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
}

export function EmptyState({
  variant = "default",
  icon,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className,
}: EmptyStateProps) {
  const defaultIcons: Record<EmptyStateVariant, React.ReactNode> = {
    search: <SearchX className="h-6 w-6 text-[var(--muted-foreground)]" />,
    favorites: <BookmarkX className="h-6 w-6 text-[var(--muted-foreground)]" />,
    default: <Inbox className="h-6 w-6 text-[var(--muted-foreground)]" />,
    error: <Sparkles className="h-6 w-6 text-[var(--status-error)]" />,
  };

  return (
    <div
      className={cn(
        "flex min-h-[320px] w-full flex-col items-center justify-center rounded-[var(--radius-xl)] border border-dashed border-[var(--border)] bg-[var(--card)]/30 p-8 text-center animate-in fade-in duration-200",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--secondary)] shadow-xs">
        {icon || defaultIcons[variant]}
      </div>
      <h3 className="mt-4 text-base font-semibold tracking-tight text-[var(--foreground)]">
        {title}
      </h3>
      <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-[var(--muted-foreground)]">
        {description}
      </p>
      {(actionLabel || secondaryActionLabel) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {actionLabel && onAction && (
            <Button size="sm" variant="primary" onClick={onAction}>
              {actionLabel}
            </Button>
          )}
          {secondaryActionLabel && onSecondaryAction && (
            <Button size="sm" variant="outline" onClick={onSecondaryAction}>
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
