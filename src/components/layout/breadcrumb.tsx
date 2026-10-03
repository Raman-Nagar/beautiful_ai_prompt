import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "./container";
import { generateBreadcrumbJsonLd } from "@/lib/seo";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
  withContainer?: boolean;
}

export function Breadcrumb({
  items,
  className = "",
  withContainer = true,
}: BreadcrumbProps) {
  // Format items for JSON-LD (leaf item URL is optional in schema.org)
  const jsonLdItems = items.map((item) => ({
    name: item.label,
    url: item.href,
  }));

  const jsonLd = generateBreadcrumbJsonLd(jsonLdItems);

  const content = (
    <nav
      aria-label="Breadcrumb"
      className="flex h-12 items-center text-xs text-[var(--muted-foreground)] overflow-x-auto"
    >
      <ol className="flex items-center gap-2 whitespace-nowrap">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <li key={idx} className="flex items-center gap-2">
              {idx > 0 && (
                <ChevronRight
                  className="h-3 w-3 text-[var(--border-strong)] shrink-0"
                  aria-hidden="true"
                />
              )}

              {isLast || !item.href ? (
                <span
                  className="truncate font-medium text-[var(--foreground)] max-w-[200px] sm:max-w-md"
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="hover:text-[var(--foreground)] transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div
        className={`border-b border-[var(--border)] bg-[var(--card)]/40 backdrop-blur-xs ${className}`}
      >
        {withContainer ? <Container>{content}</Container> : content}
      </div>
    </>
  );
}
