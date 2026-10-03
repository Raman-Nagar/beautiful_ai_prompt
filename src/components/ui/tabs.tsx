"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface TabItem<T extends string = string> {
  id: T;
  label: string;
  icon?: React.ReactNode;
  count?: number;
}

export interface TabsProps<T extends string = string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onChange: (tabId: T) => void;
  className?: string;
  size?: "sm" | "md";
  variant?: "segmented" | "underline" | "pills";
}

export function Tabs<T extends string = string>({
  tabs,
  activeTab,
  onChange,
  className,
  size = "md",
  variant = "segmented",
}: TabsProps<T>) {
  if (variant === "underline") {
    return (
      <div
        role="tablist"
        className={cn(
          "flex space-x-6 border-b border-[var(--border)] overflow-x-auto no-scrollbar",
          className
        )}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              type="button"
              onClick={() => onChange(tab.id)}
              className={cn(
                "relative flex items-center gap-2 pb-3 pt-1 text-sm font-medium transition-colors cursor-pointer shrink-0",
                isActive
                  ? "text-[var(--foreground)]"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              )}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {typeof tab.count === "number" && (
                <span
                  className={cn(
                    "rounded-full px-1.5 py-0.2 text-[10px] font-semibold",
                    isActive
                      ? "bg-[var(--primary-muted)] text-[var(--primary)]"
                      : "bg-[var(--secondary)] text-[var(--muted-foreground)]"
                  )}
                >
                  {tab.count}
                </span>
              )}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--primary)] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // Segmented control style (Linear / Raycast)
  return (
    <div
      role="tablist"
      className={cn(
        "inline-flex items-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--muted)] p-1",
        size === "sm" ? "h-8" : "h-10",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative inline-flex items-center justify-center gap-1.5 rounded-[var(--radius-sm)] px-3 text-xs font-medium transition-all duration-150 cursor-pointer select-none",
              size === "sm" ? "h-6 text-[11px]" : "h-8 text-xs",
              isActive
                ? "bg-[var(--card)] text-[var(--foreground)] shadow-xs font-semibold"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]/50"
            )}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {typeof tab.count === "number" && (
              <span
                className={cn(
                  "rounded-full px-1.5 py-0.2 text-[10px]",
                  isActive
                    ? "bg-[var(--primary-muted)] text-[var(--primary)]"
                    : "bg-[var(--secondary)] text-[var(--muted-foreground)]"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
