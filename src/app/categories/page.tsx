import React from "react";
import { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CategoryIcon } from "@/components/categories/category-icon";
import { getAllCategories } from "@/lib/data/categories";
import { ArrowRight, Sparkles } from "lucide-react";
import { TrackedCategoryLink } from "@/components/analytics/tracked-link";

import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Categories",
  description:
    "Browse over 20 specialized categories of practical, battle-tested AI prompts for engineering, marketing, business, and productivity.",
  path: "/categories",
  keywords: [
    "AI prompt categories",
    "coding prompts",
    "career prompts",
    "marketing prompts",
    "productivity prompts",
    "prompt directory",
  ],
});

export default function CategoriesPage() {
  const categories = getAllCategories();

  return (
    <div className="py-12 sm:py-16 bg-[var(--background)] min-h-screen">
      <Container>
        {/* Header Section */}
        <div className="max-w-2xl mb-12 space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">
              Taxonomy
            </Badge>
            <span className="text-xs text-[var(--muted-foreground)]">
              {categories.length} Specialized Categories
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--foreground)]">
            Explore All Categories
          </h1>

          <p className="text-sm sm:text-base leading-relaxed text-[var(--muted-foreground)]">
            Discover practical AI prompts engineered for your specific professional workflow, role,
            and industry.
          </p>
        </div>

        {/* Categories Responsive Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => {
            const hasPrompts = (cat.count ?? 0) > 0;
            return (
              <TrackedCategoryLink
                key={cat.slug}
                categorySlug={cat.slug}
                categoryName={cat.name}
                sourcePage="/categories"
                href={`/categories/${cat.slug}`}
                className="group block h-full"
              >
                <Card
                  interactive
                  className="h-full flex flex-col justify-between p-6"
                >
                  <div>
                    {/* Top Row: Icon, Count & Featured Indicator (only from actual data) */}
                    <div className="flex items-center justify-between pb-3 mb-2 border-b border-[var(--border-subtle)]">
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--secondary)] text-[var(--foreground)] group-hover:border-[var(--primary)]/40 group-hover:text-[var(--primary)] transition-colors">
                          <CategoryIcon name={cat.icon} className="h-5 w-5" />
                        </div>
                        {cat.featured && (
                          <Badge variant="warning" size="sm" className="gap-1">
                            <Sparkles className="h-3 w-3" />
                            Popular
                          </Badge>
                        )}
                      </div>

                      <Badge variant={hasPrompts ? "secondary" : "outline"} size="sm">
                        {cat.count ?? 0} {cat.count === 1 ? "prompt" : "prompts"}
                      </Badge>
                    </div>

                    <h2 className="text-lg font-semibold tracking-tight text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                      {cat.name}
                    </h2>

                    <p className="text-xs leading-relaxed text-[var(--muted-foreground)] mt-2 line-clamp-2">
                      {cat.description}
                    </p>

                    {/* Subcategories Chips */}
                    {cat.subcategories && cat.subcategories.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {cat.subcategories.slice(0, 3).map((sub) => (
                          <span
                            key={sub}
                            className="rounded-[var(--radius-sm)] bg-[var(--secondary)] px-2 py-0.5 text-[10px] text-[var(--subtle-foreground)] border border-[var(--border-subtle)]"
                          >
                            {sub}
                          </span>
                        ))}
                        {cat.subcategories.length > 3 && (
                          <span className="text-[10px] text-[var(--muted-foreground)] self-center">
                            +{cat.subcategories.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4 text-xs font-semibold text-[var(--primary)]">
                    <span>Browse {cat.name} Prompts</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </Card>
              </TrackedCategoryLink>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
