"use client";

import React, { useState, useMemo } from "react";
import { Collection } from "@/types/collection";
import { CollectionCard } from "./collection-card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  X,
  Sparkles,
  Layers,
  Filter,
} from "lucide-react";

interface CollectionsExplorerProps {
  collections: Collection[];
  featuredCollections: Collection[];
}

export function CollectionsExplorer({
  collections,
  featuredCollections,
}: CollectionsExplorerProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Extract distinct category facets
  const categoryFilters = useMemo(() => {
    const map = new Map<string, { slug: string; name: string; count: number }>();
    for (const col of collections) {
      const slug = col.category;
      const name = col.categoryName || col.category;
      if (!map.has(slug)) {
        map.set(slug, { slug, name, count: 0 });
      }
      map.get(slug)!.count += 1;
    }
    return Array.from(map.values()).sort((a, b) => b.count - a.count);
  }, [collections]);

  // Filter logic
  const filteredCollections = useMemo(() => {
    let result = collections;

    // 1. Category filter
    if (selectedCategory !== "all") {
      result = result.filter(
        (col) =>
          col.category.toLowerCase() === selectedCategory.toLowerCase() ||
          col.categoryIds?.includes(selectedCategory.toLowerCase())
      );
    }

    // 2. Search query filter
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter((col) => {
        const inTitle = col.title.toLowerCase().includes(query);
        const inDesc = col.description.toLowerCase().includes(query);
        const inShortDesc = col.shortDescription?.toLowerCase().includes(query) ?? false;
        const inCategory = (col.categoryName || col.category).toLowerCase().includes(query);
        const inAudience = col.targetAudience?.toLowerCase().includes(query) ?? false;
        const inTags = col.tags?.some((t) => t.toLowerCase().includes(query)) ?? false;
        return inTitle || inDesc || inShortDesc || inCategory || inAudience || inTags;
      });
    }

    return result;
  }, [collections, selectedCategory, searchQuery]);

  const isFiltering = searchQuery.trim().length > 0 || selectedCategory !== "all";

  return (
    <div className="space-y-12">
      {/* Search and Category Filter Toolbar */}
      <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-4 sm:p-5 shadow-sm space-y-4">
        {/* Search Input Row */}
        <div className="relative">
          <label htmlFor="collections-search" className="sr-only">
            Search prompt collections
          </label>
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)] pointer-events-none" />
          <input
            id="collections-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search collections by outcome, skill, role, or keyword (e.g., 'resume', 'react', 'sales')..."
            className="w-full rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--background)] pl-10 pr-10 py-2.5 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)] p-1 rounded-[var(--radius-sm)]"
              aria-label="Clear search query"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Category Pills Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 no-scrollbar">
          <span className="text-xs font-medium text-[var(--muted-foreground)] shrink-0 flex items-center gap-1.5 mr-1">
            <Filter className="h-3 w-3" />
            Filter:
          </span>

          <button
            onClick={() => setSelectedCategory("all")}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-all shrink-0 ${
              selectedCategory === "all"
                ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-xs"
                : "bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary-hover)]"
            }`}
          >
            All Collections ({collections.length})
          </button>

          {categoryFilters.map((cat) => {
            const isSelected = selectedCategory === cat.slug;
            return (
              <button
                key={cat.slug}
                onClick={() => setSelectedCategory(isSelected ? "all" : cat.slug)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all shrink-0 capitalize ${
                  isSelected
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-xs"
                    : "bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary-hover)]"
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filter State / Results Count */}
      {isFiltering ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                Search Results
              </h2>
              <Badge variant="outline" size="sm" className="font-mono text-xs">
                {filteredCollections.length} {filteredCollections.length === 1 ? "Collection" : "Collections"}
              </Badge>
            </div>

            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="text-xs font-semibold text-[var(--primary)] hover:underline inline-flex items-center gap-1"
            >
              Reset filters
            </button>
          </div>

          {filteredCollections.length === 0 ? (
            <div className="rounded-[var(--radius-xl)] border border-[var(--border-subtle)] bg-[var(--card)] p-12 text-center space-y-4">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--secondary)] text-[var(--muted-foreground)]">
                <Search className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-[var(--foreground)]">
                No matching collections found
              </h3>
              <p className="text-xs text-[var(--muted-foreground)] max-w-md mx-auto">
                No collections matched &ldquo;{searchQuery}&rdquo;. Try searching for broader terms like
                &ldquo;engineering&rdquo;, &ldquo;writing&rdquo;, &ldquo;job&rdquo;, or reset your filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="mt-2 inline-flex items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary)] px-4 py-2 text-xs font-semibold text-[var(--primary-foreground)] hover:bg-[var(--primary-hover)] transition-colors"
              >
                View all {collections.length} collections
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCollections.map((col) => (
                <CollectionCard key={col.id} collection={col} sourcePage="/collections" />
              ))}
            </div>
          )}
        </div>
      ) : (
        /* Default Layout: Featured Collections then All Collections */
        <div className="space-y-16">
          {/* 1. Featured Collections Section */}
          {featuredCollections.length > 0 && (
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <Badge variant="warning" size="sm" className="gap-1">
                      <Sparkles className="h-3 w-3" />
                      Editor&apos;s Selection
                    </Badge>
                    <span className="text-xs text-[var(--muted-foreground)]">
                      {featuredCollections.length} Featured Packs
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
                    Featured Workflows
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-1">
                    Highest-impact prompt sequences covering our most popular multi-stage goals.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredCollections.map((col) => (
                  <CollectionCard key={col.id} collection={col} sourcePage="/collections" />
                ))}
              </div>
            </section>
          )}

          {/* 2. All Collections Section */}
          <section className="space-y-6 pt-6 border-t border-[var(--border)]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge variant="primary" size="sm" className="gap-1">
                    <Layers className="h-3 w-3" />
                    Complete Library
                  </Badge>
                  <span className="text-xs text-[var(--muted-foreground)]">
                    {collections.length} Curated Stacks
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
                  All Collections
                </h2>
                <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-1">
                  Every outcome-oriented prompt collection organized by practical discipline.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collections.map((col) => (
                <CollectionCard key={col.id} collection={col} sourcePage="/collections" />
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
