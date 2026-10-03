"use client";

import React, { useState, useMemo } from "react";
import { Guide } from "@/types/guide";
import { GuideCard } from "./guide-card";
import { Search, Sparkles, BookOpen, X } from "lucide-react";

interface GuidesExplorerProps {
  guides: Guide[];
  featuredGuides: Guide[];
}

const TOPIC_FILTERS = [
  { label: "All Guides", value: "all" },
  { label: "Prompt Engineering", value: "prompt-engineering" },
  { label: "Software Engineering", value: "coding" },
  { label: "Career & Interviews", value: "career" },
  { label: "Marketing & Creators", value: "marketing" },
  { label: "Business & Freelance", value: "business" },
  { label: "Productivity & Research", value: "productivity" },
];

export function GuidesExplorer({ guides, featuredGuides }: GuidesExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("all");

  const filteredGuides = useMemo(() => {
    let result = guides;

    // Topic filtering
    if (selectedTopic !== "all") {
      result = result.filter((g) => {
        const cat = g.category.toLowerCase();
        const catIds = g.categoryIds?.map((c) => c.toLowerCase()) || [];
        const tags = g.tags.map((t) => t.toLowerCase());

        switch (selectedTopic) {
          case "prompt-engineering":
            return (
              cat.includes("prompt") ||
              cat.includes("beginner") ||
              tags.some((t) => t.includes("prompt") || t.includes("beginner"))
            );
          case "coding":
            return (
              cat.includes("software") ||
              cat.includes("coding") ||
              catIds.includes("coding") ||
              tags.some((t) => t.includes("engineering") || t.includes("code"))
            );
          case "career":
            return (
              cat.includes("resume") ||
              cat.includes("interview") ||
              cat.includes("career") ||
              catIds.includes("resume") ||
              catIds.includes("job-interview")
            );
          case "marketing":
            return (
              cat.includes("marketing") ||
              cat.includes("video") ||
              cat.includes("youtube") ||
              catIds.includes("marketing") ||
              catIds.includes("youtube")
            );
          case "business":
            return (
              cat.includes("business") ||
              cat.includes("freelance") ||
              catIds.includes("business") ||
              catIds.includes("freelancing")
            );
          case "productivity":
            return (
              cat.includes("productivity") ||
              cat.includes("learning") ||
              cat.includes("research") ||
              catIds.includes("productivity") ||
              catIds.includes("research") ||
              catIds.includes("education")
            );
          default:
            return true;
        }
      });
    }

    // Search query filtering
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((g) => {
        const titleMatch = g.title.toLowerCase().includes(q);
        const excerptMatch = (g.excerpt || "").toLowerCase().includes(q);
        const descMatch = (g.description || "").toLowerCase().includes(q);
        const categoryMatch = g.category.toLowerCase().includes(q);
        const tagsMatch = g.tags.some((t) => t.toLowerCase().includes(q));
        return titleMatch || excerptMatch || descMatch || categoryMatch || tagsMatch;
      });
    }

    return result;
  }, [guides, selectedTopic, searchQuery]);

  const isFiltering = selectedTopic !== "all" || searchQuery.trim().length > 0;

  return (
    <div className="space-y-12">
      {/* Featured Playbooks Section (Only shown when not actively filtering) */}
      {!isFiltering && featuredGuides.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[var(--status-warning)]" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                Featured Guides
              </h2>
            </div>
            <span className="text-xs text-[var(--muted-foreground)] font-mono">
              Editorial Selections
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} featured />
            ))}
          </div>
        </section>
      )}

      {/* Search & Topic Filters Controls */}
      <section className="space-y-6 pt-4 border-t border-[var(--border)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)] flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[var(--primary)]" />
              <span>All Guides ({filteredGuides.length})</span>
            </h2>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">
              Filter by engineering domain, career stage, or functional discipline.
            </p>
          </div>

          {/* Search Input Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)] pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search guides, topics, tags..."
              className="w-full pl-9 pr-8 py-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] text-xs text-[var(--foreground)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                aria-label="Clear search"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Topic Pills */}
        <div className="flex flex-wrap gap-2 pt-1">
          {TOPIC_FILTERS.map((topic) => {
            const isActive = selectedTopic === topic.value;
            return (
              <button
                key={topic.value}
                onClick={() => setSelectedTopic(topic.value)}
                className={`px-3 py-1.5 rounded-[var(--radius-full)] text-xs font-medium transition-all ${
                  isActive
                    ? "bg-[var(--primary)] text-white shadow-xs"
                    : "bg-[var(--secondary)] text-[var(--subtle-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--card-hover)] border border-[var(--border-subtle)]"
                }`}
              >
                {topic.label}
              </button>
            );
          })}

          {isFiltering && (
            <button
              onClick={() => {
                setSelectedTopic("all");
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-[var(--radius-full)] text-xs font-medium text-[var(--primary)] hover:underline"
            >
              <X className="h-3 w-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </section>

      {/* Guides Grid */}
      {filteredGuides.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <GuideCard key={guide.id} guide={guide} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 rounded-[var(--radius-xl)] border border-dashed border-[var(--border)] bg-[var(--card)]/50">
          <BookOpen className="h-8 w-8 text-[var(--muted-foreground)] mx-auto mb-3 opacity-60" />
          <h3 className="text-base font-bold text-[var(--foreground)]">No guides found</h3>
          <p className="text-xs text-[var(--muted-foreground)] max-w-sm mx-auto mt-1">
            No guides match your search query &quot;{searchQuery}&quot;. Try adjusting your keywords or clearing the active topic filter.
          </p>
          <button
            onClick={() => {
              setSelectedTopic("all");
              setSearchQuery("");
            }}
            className="mt-4 px-4 py-2 rounded-[var(--radius-md)] bg-[var(--primary)] text-white text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
}
