"use client";

import React, { useEffect, useState } from "react";
import { TableOfContentsItem } from "@/types/guide";
import { ListOrdered, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface GuideTableOfContentsProps {
  items: TableOfContentsItem[];
  className?: string;
  isMobileDrawer?: boolean;
}

export function GuideTableOfContents({
  items,
  className,
  isMobileDrawer = false,
}: GuideTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);

  useEffect(() => {
    if (items.length === 0) return;

    // Track which section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible section closest to top
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          // Sort by bounding client top
          visibleEntries.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
          );
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px",
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [items]);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", `#${id}`);
      setActiveId(id);
      setIsOpenMobile(false);
    }
  };

  if (items.length === 0) return null;

  // Mobile Accordion presentation
  if (isMobileDrawer) {
    return (
      <div className={cn("rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-4 lg:hidden", className)}>
        <button
          type="button"
          onClick={() => setIsOpenMobile((prev) => !prev)}
          className="flex w-full items-center justify-between text-left text-sm font-semibold text-[var(--foreground)]"
          aria-expanded={isOpenMobile}
        >
          <span className="flex items-center gap-2">
            <ListOrdered className="h-4 w-4 text-[var(--primary)]" />
            Table of Contents
            <span className="text-xs font-normal text-[var(--muted-foreground)]">
              ({items.length} sections)
            </span>
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 text-[var(--muted-foreground)] transition-transform duration-200",
              isOpenMobile && "rotate-180"
            )}
          />
        </button>

        {isOpenMobile && (
          <nav aria-label="Table of contents" className="mt-4 pt-3 border-t border-[var(--border-subtle)] space-y-1">
            {items.map((item, index) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleScrollTo(e, item.id)}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "flex items-center py-1.5 px-2 text-xs rounded-[var(--radius-sm)] transition-colors",
                    isActive
                      ? "bg-[var(--primary)]/10 font-medium text-[var(--primary)]"
                      : "text-[var(--subtle-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]"
                  )}
                >
                  <span className="w-5 text-[10px] text-[var(--muted-foreground)] font-mono">
                    {index + 1}.
                  </span>
                  <span className="truncate">{item.title.replace(/^\d+\.\s*/, "")}</span>
                </a>
              );
            })}
          </nav>
        )}
      </div>
    );
  }

  // Desktop Sticky sidebar presentation
  return (
    <nav
      aria-label="Table of contents"
      className={cn("rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 shadow-xs", className)}
    >
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[var(--border-subtle)] text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
        <ListOrdered className="h-3.5 w-3.5 text-[var(--primary)]" />
        <span>Table of Contents</span>
      </div>

      <div className="space-y-1 text-sm">
        {items.map((item, index) => {
          const isActive = activeId === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleScrollTo(e, item.id)}
              aria-current={isActive ? "location" : undefined}
              className={cn(
                "group flex items-start gap-2 py-1.5 px-2.5 rounded-[var(--radius-sm)] text-xs transition-colors leading-snug",
                isActive
                  ? "bg-[var(--primary)]/10 font-semibold text-[var(--primary)] border-l-2 border-[var(--primary)]"
                  : "text-[var(--subtle-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]"
              )}
            >
              <span
                className={cn(
                  "font-mono text-[11px] shrink-0 mt-0.5",
                  isActive ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]"
                )}
              >
                0{index + 1}
              </span>
              <span className="line-clamp-2">
                {item.title.replace(/^\d+\.\s*/, "")}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
