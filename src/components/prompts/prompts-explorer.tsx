"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, X, SlidersHorizontal, ArrowUpDown, Tag as TagIcon, Check, Bookmark } from "lucide-react";
import { useSavedPromptIds } from "@/lib/storage";
import { PromptCard } from "@/components/prompts/prompt-card";
import { Dropdown, DropdownOption } from "@/components/ui/dropdown";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Prompt, PromptDifficulty, PromptSortOption, AIModelId } from "@/types/prompt";
import { Category } from "@/types/category";
import { AIModel } from "@/types/model";
import { filterPrompts } from "@/lib/data/prompts";
import { trackSearch, trackCategoryClick } from "@/lib/analytics";

interface PromptsExplorerProps {
  initialPrompts: Prompt[];
  categories: Category[];
  models: AIModel[];
  popularTags: string[];
  useCases: string[];
}

export function PromptsExplorer({
  initialPrompts,
  categories,
  models,
  popularTags,
  useCases,
}: PromptsExplorerProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read initial states from URL parameters
  const paramSearch = searchParams.get("search") || "";
  const paramCategory = searchParams.get("category") || "all";
  const paramModel = searchParams.get("model") || "all";
  const paramDifficulty = searchParams.get("difficulty") || "all";
  const paramUseCase = searchParams.get("useCase") || "all";
  const paramTag = searchParams.get("tag") || "all";
  const paramSort = (searchParams.get("sort") as PromptSortOption) || "popular";
  const savedOnly = searchParams.get("saved") === "true";
  const savedIds = useSavedPromptIds();

  // Local state initialized with URL params
  const [search, setSearch] = useState<string>(paramSearch);
  const [category, setCategory] = useState<string>(paramCategory);
  const [model, setModel] = useState<string>(paramModel);
  const [difficulty, setDifficulty] = useState<string>(paramDifficulty);
  const [useCase, setUseCase] = useState<string>(paramUseCase);
  const [tag, setTag] = useState<string>(paramTag);
  const [sort, setSort] = useState<PromptSortOption>(paramSort);

  // Helper to sync state to URL params cleanly
  const updateUrlParams = useCallback(
    (newParams: {
      search?: string;
      category?: string;
      model?: string;
      difficulty?: string;
      useCase?: string;
      tag?: string;
      sort?: string;
      saved?: boolean;
    }) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(newParams).forEach(([k, v]) => {
        if (!v || v === "all" || (k === "sort" && v === "popular") || (k === "saved" && !v)) {
          params.delete(k);
        } else if (k === "saved" && v) {
          params.set("saved", "true");
        } else {
          params.set(k, String(v));
        }
      });

      const queryString = params.toString();
      const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(targetUrl, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  // Handlers for state updates
  const handleSearchChange = (val: string) => {
    setSearch(val);
    updateUrlParams({ search: val, category, model, difficulty, useCase, tag, sort });
  };

  const handleCategoryChange = (val: string) => {
    setCategory(val);
    updateUrlParams({ search, category: val, model, difficulty, useCase, tag, sort });
    if (val !== "all") {
      const cat = categories.find((c) => c.slug === val);
      trackCategoryClick(val, cat?.name, "/prompts");
    }
  };

  const handleModelChange = (val: string) => {
    setModel(val);
    updateUrlParams({ search, category, model: val, difficulty, useCase, tag, sort });
  };

  const handleDifficultyChange = (val: string) => {
    setDifficulty(val);
    updateUrlParams({ search, category, model, difficulty: val, useCase, tag, sort });
  };

  const handleUseCaseChange = (val: string) => {
    setUseCase(val);
    updateUrlParams({ search, category, model, difficulty, useCase: val, tag, sort });
  };

  const handleTagToggle = (selectedTag: string) => {
    const nextTag = tag === selectedTag ? "all" : selectedTag;
    setTag(nextTag);
    updateUrlParams({ search, category, model, difficulty, useCase, tag: nextTag, sort });
  };

  const handleSortChange = (val: PromptSortOption) => {
    setSort(val);
    updateUrlParams({ search, category, model, difficulty, useCase, tag, sort: val });
  };

  const handleClearFilters = () => {
    setSearch("");
    setCategory("all");
    setModel("all");
    setDifficulty("all");
    setUseCase("all");
    setTag("all");
    setSort("popular");
    router.replace(pathname, { scroll: false });
  };

  // Dropdown options
  const categoryOptions: DropdownOption[] = useMemo(
    () => [
      { value: "all", label: "All Categories" },
      ...categories.map((c) => ({
        value: c.slug,
        label: c.name,
        badge: c.count ? `${c.count}` : undefined,
      })),
    ],
    [categories]
  );

  const modelOptions: DropdownOption[] = useMemo(
    () => [
      { value: "all", label: "All AI Models" },
      ...models.map((m) => ({
        value: m.id,
        label: m.name,
      })),
    ],
    [models]
  );

  const difficultyOptions: DropdownOption[] = [
    { value: "all", label: "All Difficulties" },
    { value: "beginner", label: "Beginner" },
    { value: "intermediate", label: "Intermediate" },
    { value: "advanced", label: "Advanced" },
  ];

  const useCaseOptions: DropdownOption[] = useMemo(() => {
    // Curate prominent use cases
    const uniqueShortCases = Array.from(
      new Set(
        useCases.map((uc) => {
          if (uc.length > 32) return uc.slice(0, 30) + "...";
          return uc;
        })
      )
    ).slice(0, 15);

    return [
      { value: "all", label: "All Use Cases" },
      ...uniqueShortCases.map((uc) => ({
        value: uc,
        label: uc,
      })),
    ];
  }, [useCases]);

  const sortOptions: DropdownOption<PromptSortOption>[] = [
    { value: "popular", label: "Popular" },
    { value: "trending", label: "Trending" },
    { value: "newest", label: "Newest" },
    { value: "title", label: "Alphabetical (A–Z)" },
  ];

  // Filter and sort prompts statically
  const filteredPrompts = useMemo(() => {
    let results = filterPrompts({
      search: search.trim() || undefined,
      category: category !== "all" ? category : undefined,
      model: model !== "all" ? (model as AIModelId) : undefined,
      difficulty: difficulty !== "all" ? (difficulty as PromptDifficulty) : undefined,
      useCase: useCase !== "all" ? useCase : undefined,
      tag: tag !== "all" ? tag : undefined,
      sort,
    });
    if (savedOnly) {
      results = results.filter((p) => savedIds.includes(p.id));
    }
    return results;
  }, [search, category, model, difficulty, useCase, tag, sort, savedOnly, savedIds]);

  // Track debounced search in explorer
  useEffect(() => {
    const trimmed = search.trim();
    if (!trimmed) return;
    const timer = setTimeout(() => {
      trackSearch(
        trimmed,
        filteredPrompts.length,
        "prompts_explorer",
        category !== "all" ? category : undefined
      );
    }, 600);
    return () => clearTimeout(timer);
  }, [search, filteredPrompts.length, category]);

  // Check if any filter is currently applied
  const hasActiveFilters =
    Boolean(search) ||
    category !== "all" ||
    model !== "all" ||
    difficulty !== "all" ||
    useCase !== "all" ||
    tag !== "all" ||
    savedOnly;

  return (
    <div className="space-y-8">
      {/* Search Input Bar */}
      <div className="relative">
        <div className="relative flex items-center w-full h-12 sm:h-14 rounded-[var(--radius-lg)] border border-[var(--border-strong)] bg-[var(--card)] px-4 shadow-sm transition-all focus-within:border-[var(--primary)]/60 focus-within:ring-2 focus-within:ring-[var(--primary)]/8">
          <Search className="h-4.5 w-4.5 text-[var(--muted-foreground)] mr-3 shrink-0" aria-hidden="true" />
          <input
            id="prompts-search-input"
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search prompts by title, description, or keyword…"
            aria-label="Search prompts by title, description, or keyword"
            className="w-full bg-transparent text-sm sm:text-base text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/60 focus:outline-hidden"
          />
          {search && (
            <button
              type="button"
              onClick={() => handleSearchChange("")}
              className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] p-1 cursor-pointer transition-colors rounded-[var(--radius-sm)] hover:bg-[var(--secondary)]"
              aria-label="Clear search query"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Primary Filters Toolbar */}
      <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)]/50 p-4 sm:p-5 backdrop-blur-sm space-y-4">
        <div className="flex items-center gap-2 pb-1 border-b border-[var(--border-subtle)] text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider">
          <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Refine Prompts</span>
        </div>

        {/* Dropdowns Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Category Dropdown */}
          <div>
            <label htmlFor="filter-category-select" className="block text-[11px] font-medium text-[var(--muted-foreground)] mb-1">
              Category
            </label>
            <Dropdown
              id="filter-category-select"
              ariaLabel="Filter prompts by category"
              options={categoryOptions}
              value={category}
              onChange={handleCategoryChange}
              placeholder="Select Category"
              className="w-full"
            />
          </div>

          {/* AI Model Dropdown */}
          <div>
            <label htmlFor="filter-model-select" className="block text-[11px] font-medium text-[var(--muted-foreground)] mb-1">
              AI Model
            </label>
            <Dropdown
              id="filter-model-select"
              ariaLabel="Filter prompts by AI model"
              options={modelOptions}
              value={model}
              onChange={handleModelChange}
              placeholder="Select AI Model"
              className="w-full"
            />
          </div>

          {/* Difficulty Dropdown */}
          <div>
            <label htmlFor="filter-difficulty-select" className="block text-[11px] font-medium text-[var(--muted-foreground)] mb-1">
              Difficulty
            </label>
            <Dropdown
              id="filter-difficulty-select"
              ariaLabel="Filter prompts by difficulty"
              options={difficultyOptions}
              value={difficulty}
              onChange={handleDifficultyChange}
              placeholder="Select Difficulty"
              className="w-full"
            />
          </div>

          {/* Use Case Dropdown */}
          <div>
            <label htmlFor="filter-usecase-select" className="block text-[11px] font-medium text-[var(--muted-foreground)] mb-1">
              Use Case
            </label>
            <Dropdown
              id="filter-usecase-select"
              ariaLabel="Filter prompts by use case"
              options={useCaseOptions}
              value={useCase}
              onChange={handleUseCaseChange}
              placeholder="Select Use Case"
              className="w-full"
            />
          </div>
        </div>

        {/* Popular Tags Quick Filters */}
        <div className="pt-2 flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            aria-pressed={savedOnly}
            aria-label="Filter to saved prompts"
            onClick={() => {
              const next = !savedOnly;
              updateUrlParams({ search, category, model, difficulty, useCase, tag, sort, saved: next });
            }}
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-all cursor-pointer mr-1 ${
              savedOnly
                ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-xs"
                : "border border-[var(--border-subtle)] bg-[var(--card)] text-[var(--muted-foreground)] hover:border-[var(--border)] hover:text-[var(--foreground)]"
            }`}
          >
            <Bookmark className={`h-2.5 w-2.5 ${savedOnly ? "fill-current" : ""}`} aria-hidden="true" />
            <span>Saved ({savedIds.length})</span>
          </button>
          <span className="text-[11px] font-medium text-[var(--muted-foreground)] mr-1 flex items-center gap-1">
            <TagIcon className="h-3 w-3" aria-hidden="true" />
            Tags:
          </span>
          {popularTags.slice(0, 10).map((t) => {
            const isSelected = tag.toLowerCase() === t.toLowerCase();
            return (
              <button
                key={t}
                type="button"
                aria-pressed={isSelected}
                aria-label={`Filter by tag ${t}`}
                onClick={() => handleTagToggle(t)}
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-xs"
                    : "border border-[var(--border-subtle)] bg-[var(--secondary)] text-[var(--muted-foreground)] hover:border-[var(--border)] hover:text-[var(--foreground)]"
                }`}
              >
                <span>#{t}</span>
                {isSelected && <Check className="h-2.5 w-2.5" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Filter Chips & Results Count Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-[var(--foreground)]">
            Showing {filteredPrompts.length} of {initialPrompts.length} prompts
          </span>

          {hasActiveFilters && (
            <>
              <span className="text-[var(--border-strong)]">•</span>

              {/* Active Category Chip */}
              {category !== "all" && (
                <Badge variant="secondary" size="sm" className="gap-1 text-[11px]">
                  <span>Category: {categories.find((c) => c.slug === category)?.name || category}</span>
                  <button
                    type="button"
                    onClick={() => handleCategoryChange("all")}
                    className="hover:text-[var(--foreground)] cursor-pointer"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </Badge>
              )}

              {/* Active Model Chip */}
              {model !== "all" && (
                <Badge variant="secondary" size="sm" className="gap-1 text-[11px]">
                  <span>Model: {models.find((m) => m.id === model)?.name || model}</span>
                  <button
                    type="button"
                    onClick={() => handleModelChange("all")}
                    className="hover:text-[var(--foreground)] cursor-pointer"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </Badge>
              )}

              {/* Active Difficulty Chip */}
              {difficulty !== "all" && (
                <Badge variant="secondary" size="sm" className="gap-1 text-[11px] capitalize">
                  <span>Difficulty: {difficulty}</span>
                  <button
                    type="button"
                    onClick={() => handleDifficultyChange("all")}
                    className="hover:text-[var(--foreground)] cursor-pointer"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </Badge>
              )}

              {/* Active Use Case Chip */}
              {useCase !== "all" && (
                <Badge variant="secondary" size="sm" className="gap-1 text-[11px]">
                  <span>Use Case: {useCase}</span>
                  <button
                    type="button"
                    onClick={() => handleUseCaseChange("all")}
                    className="hover:text-[var(--foreground)] cursor-pointer"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </Badge>
              )}

              {/* Active Tag Chip */}
              {tag !== "all" && (
                <Badge variant="primary" size="sm" className="gap-1 text-[11px]">
                  <span>Tag: #{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className="hover:text-[var(--foreground)] cursor-pointer"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </Badge>
              )}

              {/* Active Saved Chip */}
              {savedOnly && (
                <Badge variant="primary" size="sm" className="gap-1 text-[11px]">
                  <Bookmark className="h-2.5 w-2.5 fill-current" />
                  <span>Saved Only ({savedIds.length})</span>
                  <button
                    type="button"
                    onClick={() => {
                                        updateUrlParams({ search, category, model, difficulty, useCase, tag, sort, saved: false });
                    }}
                    className="hover:text-[var(--foreground)] cursor-pointer"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </Badge>
              )}

              {/* Reset All Filters Button */}
              <button
                type="button"
                onClick={handleClearFilters}
                className="text-xs text-[var(--primary)] hover:underline font-medium cursor-pointer ml-1"
              >
                Clear all
              </button>
            </>
          )}
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
          <span className="text-xs text-[var(--muted-foreground)] flex items-center gap-1 font-medium">
            <ArrowUpDown className="h-3 w-3" />
            Sort by:
          </span>
          <Dropdown<PromptSortOption>
            options={sortOptions}
            value={sort}
            onChange={handleSortChange}
            align="right"
            className="w-36"
          />
        </div>
      </div>

      {/* Prompts Responsive Grid or Empty State */}
      {filteredPrompts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      ) : (
        <EmptyState
          variant={savedOnly ? "favorites" : "search"}
          title={
            savedOnly
              ? savedIds.length === 0
                ? "No saved prompts yet"
                : "No saved prompts match current filters"
              : "No matching prompts found"
          }
          description={
            savedOnly
              ? savedIds.length === 0
                ? "You haven't saved any prompts to your personal collection. Click the bookmark icon on any prompt card or prompt page to save it for quick access."
                : "None of your saved prompts match the current search or category filters. Try clearing other filters."
              : "We couldn't find any prompts matching your active filters. Try searching for different terms or clearing your filters."
          }
          actionLabel={savedOnly && savedIds.length === 0 ? "Browse All Prompts" : "Reset all filters"}
          onAction={handleClearFilters}
          className="my-8"
        />
      )}
    </div>
  );
}
