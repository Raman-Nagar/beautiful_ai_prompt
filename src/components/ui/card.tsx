import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
  interactive?: boolean;
  variant?: "default" | "subtle" | "glass" | "outline";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    { className, hoverable = false, interactive = false, variant = "default", children, ...props },
    ref
  ) => {
    const variantStyles = {
      default: "bg-[var(--card)] border-[var(--border)] shadow-xs",
      subtle: "bg-[var(--secondary)]/50 border-[var(--border-subtle)]",
      glass: "glass-surface",
      outline: "bg-transparent border-[var(--border-strong)]",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[var(--radius-lg)] border text-[var(--foreground)]",
          variantStyles[variant],
          hoverable && "card-lift hover:bg-[var(--card-hover)]",
          interactive && "card-lift cursor-pointer active:scale-[0.99] hover:bg-[var(--card-hover)]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-5 pb-3", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

export const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-base font-semibold leading-tight tracking-tight text-[var(--foreground)]",
      className
    )}
    {...props}
  >
    {children}
  </h3>
));
CardTitle.displayName = "CardTitle";

export const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-[var(--muted-foreground)] leading-relaxed", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-5 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between border-t border-[var(--border-subtle)] p-5 pt-3 text-xs text-[var(--muted-foreground)]",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";
