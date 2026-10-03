"use client";

import React, { useState, useMemo, useEffect } from "react";
import { Search, X, Tag as TagIcon, Check } from "lucide-react";
import { PromptCard } from "@/components/prompts/prompt-card";
import { EmptyState } from "@/components/ui/empty-state";
import { Prompt } from "@/types/prompt";
import { trackSearch } from "@/lib/analytics";

interface CategoryPromptsViewProps {
  initialPrompts: Prompt[];
  categoryName: string;
  subcategories?: string[];
}

export function CategoryPromptsView({
  initialPrompts,
  categoryName,
  subcategories = [],
}: CategoryPromptsViewProps) {
  const [search, setSearch] = useState("");
  const [activeSubcategory, setActiveSubcategory] = useState<string>("all");

  const filteredPrompts = useMemo(() => {
    const q = search.toLowerCase().trim();

    return initialPrompts.filter((p) => {
      // 1. Text search
      if (q) {
        const titleMatch = p.title.toLowerCase().includes(q);
        const descMatch = (p.shortDescription || p.description).toLowerCase().includes(q);
        const tagMatch = p.tags.some((t) => t.toLowerCase().includes(q));
        if (!titleMatch && !descMatch && !tagMatch) {
          return false;
        }
      }

      // 2. Subcategory filter
      if (activeSubcategory !== "all") {
        if (p.subcategory?.toLowerCase() !== activeSubcategory.toLowerCase()) {
          return false;
        }
      }

      return true;
    });
  }, [initialPrompts, search, activeSubcategory]);

  // Track debounced search within category
  useEffect(() => {
    const trimmed = search.trim();
    if (!trimmed) return;
    const timer = setTimeout(() => {
      trackSearch(trimmed, filteredPrompts.length, "category_page", categoryName);
    }, 600);
    return () => clearTimeout(timer);
  }, [search, filteredPrompts.length, categoryName]);

  const handleClearFilters = () => {
    setSearch("");
    setActiveSubcategory("all");
  };

  return (
    <div className="space-y-6">
      {/* Category Search & Subcategory Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Search within Category */}
        <div className="relative flex-1 max-w-md">
          <div className="relative flex items-center w-full h-11 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] px-3 text-xs shadow-xs focus-within:border-[var(--primary)] focus-within:ring-2 focus-within:ring-[var(--primary)]/10">
            <Search className="h-4 w-4 text-[var(--muted-foreground)] mr-2.5 shrink-0" aria-hidden="true" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={`Search within ${categoryName} prompts...`}
              aria-label={`Search within ${categoryName} prompts`}
              className="w-full bg-transparent text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:outline-hidden"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] p-1 cursor-pointer"
                aria-label="Clear search query"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Counter */}
        <div className="text-xs font-semibold text-[var(--muted-foreground)] self-center sm:self-auto shrink-0">
          Showing {filteredPrompts.length} of {initialPrompts.length} prompts
        </div>
      </div>

      {/* Subcategory Pills if Available */}
      {subcategories.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap pt-1">
          <span className="text-[11px] font-medium text-[var(--muted-foreground)] mr-1 flex items-center gap-1">
            <TagIcon className="h-3 w-3" aria-hidden="true" />
            Subtopics:
          </span>
          <button
            type="button"
            onClick={() => setActiveSubcategory("all")}
            aria-pressed={activeSubcategory === "all"}
            aria-label="Show all subtopics"
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-all cursor-pointer ${
              activeSubcategory === "all"
                ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-xs"
                : "border border-[var(--border-subtle)] bg-[var(--secondary)] text-[var(--muted-foreground)] hover:border-[var(--border)] hover:text-[var(--foreground)]"
            }`}
          >
            All
          </button>
          {subcategories.map((sub) => {
            const isSelected = activeSubcategory.toLowerCase() === sub.toLowerCase();
            return (
              <button
                key={sub}
                type="button"
                onClick={() => setActiveSubcategory(isSelected ? "all" : sub)}
                aria-pressed={isSelected}
                aria-label={`Filter by subtopic: ${sub}`}
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-xs"
                    : "border border-[var(--border-subtle)] bg-[var(--secondary)] text-[var(--muted-foreground)] hover:border-[var(--border)] hover:text-[var(--foreground)]"
                }`}
              >
                <span>{sub}</span>
                {isSelected && <Check className="h-2.5 w-2.5" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}

      {/* Prompts Grid or Empty State */}
      {filteredPrompts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
          {filteredPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      ) : (
        <EmptyState
          variant="search"
          title={`No ${categoryName} prompts found`}
          description={
            search
              ? `No prompts matched "${search}". Try searching for another keyword or clear your search.`
              : "No prompts currently match the active subtopic filter."
          }
          actionLabel="Clear filters"
          onAction={handleClearFilters}
          className="my-6"
        />
      )}
    </div>
  );
}
