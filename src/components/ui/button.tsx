import React from "react";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export type ButtonVariant = 
  | "primary" 
  | "secondary" 
  | "outline" 
  | "ghost" 
  | "glass" 
  | "danger";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "icon" | "icon-sm";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      children,
      leftIcon,
      rightIcon,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium tracking-tight transition-all duration-150 select-none cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-[var(--primary)] focus-visible:outline-offset-2";

    const variantStyles: Record<ButtonVariant, string> = {
      primary:
        "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)] shadow-sm active:scale-[0.97]",
      secondary:
        "bg-[var(--secondary)] text-[var(--secondary-foreground)] hover:bg-[var(--secondary-hover)] border border-[var(--border-strong)] shadow-xs active:scale-[0.97]",
      outline:
        "bg-transparent text-[var(--foreground)] border border-[var(--border-strong)] hover:border-[var(--border-strong)] hover:bg-[var(--secondary)] active:scale-[0.97]",
      ghost:
        "bg-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)] active:scale-[0.97]",
      glass:
        "glass-surface text-[var(--foreground)] hover:border-[var(--border-strong)] active:scale-[0.97]",
      danger:
        "bg-[var(--status-error)] text-white hover:opacity-90 shadow-sm active:scale-[0.97]",
    };

    const sizeStyles: Record<ButtonSize, string> = {
      xs: "text-[11px] h-7 px-2.5 rounded-[var(--radius-sm)] gap-1.5",
      sm: "text-xs h-8 px-3 rounded-[var(--radius-sm)] gap-1.5",
      md: "text-sm h-9 px-4 rounded-[var(--radius-md)] gap-2",
      lg: "text-[0.9rem] h-11 px-5 rounded-[var(--radius-md)] gap-2.5",
      icon: "h-9 w-9 rounded-[var(--radius-md)] p-0",
      "icon-sm": "h-7.5 w-7.5 rounded-[var(--radius-sm)] p-0",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading ? "true" : undefined}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-current" aria-hidden="true" />
        ) : (
          leftIcon && <span className="inline-flex shrink-0" aria-hidden="true">{leftIcon}</span>
        )}
        {children && <span>{children}</span>}
        {!isLoading && rightIcon && (
          <span className="inline-flex shrink-0" aria-hidden="true">{rightIcon}</span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
