import React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  containerClassName?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      error,
      leftIcon,
      rightIcon,
      rightElement,
      containerClassName,
      disabled,
      id,
      "aria-describedby": ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const errorId = id && error ? `${id}-error` : undefined;
    const combinedDescribedBy = [ariaDescribedBy, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className={cn("relative flex w-full flex-col gap-1.5", containerClassName)}>
        <div className="relative flex w-full items-center">
          {leftIcon && (
            <div className="pointer-events-none absolute left-3 flex items-center text-[var(--muted-foreground)]" aria-hidden="true">
              {leftIcon}
            </div>
          )}
          <input
            id={id}
            type={type}
            ref={ref}
            disabled={disabled}
            aria-invalid={error ? "true" : undefined}
            aria-describedby={combinedDescribedBy}
            className={cn(
              "flex h-9.5 w-full rounded-[var(--radius-md)] border border-[var(--input)] bg-[var(--card)] px-3 text-sm text-[var(--foreground)] placeholder:text-[var(--subtle-foreground)] transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50",
              "focus-visible:border-[var(--primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--primary)]",
              leftIcon && "pl-9",
              (rightIcon || rightElement || error) && "pr-10",
              error && "border-[var(--status-error)] focus-visible:border-[var(--status-error)] focus-visible:ring-[var(--status-error)]",
              className
            )}
            {...props}
          />
          {error ? (
            <div className="pointer-events-none absolute right-3 flex items-center text-[var(--status-error)]" aria-hidden="true">
              <AlertCircle className="h-4 w-4" />
            </div>
          ) : rightElement ? (
            <div className="absolute right-2.5 flex items-center">{rightElement}</div>
          ) : rightIcon ? (
            <div className="pointer-events-none absolute right-3 flex items-center text-[var(--muted-foreground)]" aria-hidden="true">
              {rightIcon}
            </div>
          ) : null}
        </div>
        {error && (
          <p id={errorId} role="alert" className="text-[11px] text-[var(--status-error)] flex items-center gap-1 font-medium">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, disabled, id, "aria-describedby": ariaDescribedBy, ...props }, ref) => {
    const errorId = id && error ? `${id}-error` : undefined;
    const combinedDescribedBy = [ariaDescribedBy, errorId].filter(Boolean).join(" ") || undefined;

    return (
      <div className="flex w-full flex-col gap-1.5">
        <textarea
          id={id}
          ref={ref}
          disabled={disabled}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={combinedDescribedBy}
          className={cn(
            "flex min-h-[90px] w-full rounded-[var(--radius-md)] border border-[var(--input)] bg-[var(--card)] p-3 text-sm text-[var(--foreground)] placeholder:text-[var(--subtle-foreground)] transition-colors focus-visible:border-[var(--primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-[var(--status-error)] focus-visible:border-[var(--status-error)] focus-visible:ring-[var(--status-error)]",
            className
          )}
          {...props}
        />
        {error && (
          <p id={errorId} role="alert" className="text-[11px] text-[var(--status-error)] flex items-center gap-1 font-medium">
            <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
            {error}
          </p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
