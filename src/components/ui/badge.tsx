import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "default"
  | "primary"
  | "secondary"
  | "outline"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "model";

export type BadgeSize = "sm" | "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  dotColor?: string;
  icon?: React.ReactNode;
}

export function Badge({
  className,
  variant = "default",
  size = "sm",
  dot = false,
  dotColor,
  icon,
  children,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center font-medium transition-colors select-none";

  const sizeStyles: Record<BadgeSize, string> = {
    sm: "text-[11px] px-2 py-0.5 rounded-full gap-1.5 leading-tight",
    md: "text-xs px-2.5 py-1 rounded-full gap-1.5 leading-snug",
  };

  const variantStyles: Record<BadgeVariant, string> = {
    default:
      "bg-[var(--secondary)] text-[var(--foreground)] border border-[var(--border)]",
    primary:
      "bg-[var(--primary-muted)] text-[var(--primary)] border border-[var(--primary)]/20",
    secondary:
      "bg-[var(--muted)] text-[var(--muted-foreground)] border border-[var(--border-subtle)]",
    outline:
      "bg-transparent text-[var(--foreground)] border border-[var(--border-strong)]",
    success:
      "bg-[var(--status-success-bg)] text-[var(--status-success)] border border-[var(--status-success)]/20",
    warning:
      "bg-[var(--status-warning-bg)] text-[var(--status-warning)] border border-[var(--status-warning)]/20",
    error:
      "bg-[var(--status-error-bg)] text-[var(--status-error)] border border-[var(--status-error)]/20",
    info:
      "bg-[var(--status-info-bg)] text-[var(--status-info)] border border-[var(--status-info)]/20",
    model:
      "bg-[var(--secondary)] text-[var(--foreground)] border border-[var(--border)] font-mono text-[11px] tracking-wide",
  };

  return (
    <span
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full shrink-0",
            dotColor || "bg-current"
          )}
        />
      )}
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
