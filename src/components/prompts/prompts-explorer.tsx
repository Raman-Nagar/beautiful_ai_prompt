"use client";

import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Search, X, SlidersHorizontal, ArrowUpDown, Tag as TagIcon, Check, Bookmark, Sparkles, Camera, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSavedPromptIds } from "@/lib/storage";
import { PromptCard } from "@/components/prompts/prompt-card";
import { Dropdown, DropdownOption } from "@/components/ui/dropdown";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { Prompt, PromptDifficulty, PromptSortOption, AIModelId } from "@/types/prompt";
import { Category } from "@/types/category";
import { AIModel } from "@/types/model";
import { trackSearch, trackCategoryClick } from "@/lib/analytics";

interface PromptsExplorerProps {
  initialPrompts: Prompt[];
  totalCounts?: { total: number; visual: number; text: number };
  categories: Category[];
  models: AIModel[];
  popularTags: string[];
  useCases: string[];
}

interface SearchParamsState {
  search: string;
  category: string;
  model: string;
  difficulty: string;
  useCase: string;
  tag: string;
  sort: PromptSortOption;
  engine: "all" | "visual" | "text";
  aspect: string;
  complexity: string;
  saved: boolean;
}

function SearchParamsWatcher({
  onParamsSync,
}: {
  onParamsSync: (params: SearchParamsState) => void;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    onParamsSync({
      search: searchParams.get("search") || "",
      category: searchParams.get("category") || "all",
      model: searchParams.get("model") || "all",
      difficulty: searchParams.get("difficulty") || "all",
      useCase: searchParams.get("useCase") || "all",
      tag: searchParams.get("tag") || "all",
      sort: (searchParams.get("sort") as PromptSortOption) || "popular",
      engine: (searchParams.get("engine") as "all" | "visual" | "text") || "all",
      aspect: searchParams.get("aspect") || "all",
      complexity: searchParams.get("complexity") || "all",
      saved: searchParams.get("saved") === "true",
    });
  }, [searchParams, onParamsSync]);

  return null;
}

export function PromptsExplorer({
  initialPrompts,
  totalCounts,
  categories,
  models,
  popularTags,
  useCases,
}: PromptsExplorerProps) {
  const router = useRouter();
  const pathname = usePathname();

  // Local state initialized with clean defaults so server static generation produces all initial DOM & cards
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("all");
  const [model, setModel] = useState<string>("all");
  const [difficulty, setDifficulty] = useState<string>("all");
  const [useCase, setUseCase] = useState<string>("all");
  const [tag, setTag] = useState<string>("all");
  const [sort, setSort] = useState<PromptSortOption>("popular");
  const [engine, setEngine] = useState<"all" | "visual" | "text">("all");
  const [aspectRatio, setAspectRatio] = useState<string>("all");
  const [complexity, setComplexity] = useState<string>("all");
  const [savedOnly, setSavedOnly] = useState<boolean>(false);
  const savedIds = useSavedPromptIds();
  const PAGE_SIZE = 16;

  const [promptsList, setPromptsList] = useState<Prompt[]>(initialPrompts);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(
    totalCounts ? totalCounts.total > initialPrompts.length : true
  );
  const [totalCount, setTotalCount] = useState<number>(
    totalCounts?.total ?? initialPrompts.length
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const isInitialMount = React.useRef(true);

  // Sync state if non-default URL parameters are detected after hydration
  const handleParamsSync = useCallback((p: SearchParamsState) => {
    if (p.search) setSearch(p.search);
    if (p.category !== "all") setCategory(p.category);
    if (p.model !== "all") setModel(p.model);
    if (p.difficulty !== "all") setDifficulty(p.difficulty);
    if (p.useCase !== "all") setUseCase(p.useCase);
    if (p.tag !== "all") setTag(p.tag);
    if (p.sort !== "popular") setSort(p.sort);
    if (p.engine !== "all") setEngine(p.engine);
    if (p.aspect !== "all") setAspectRatio(p.aspect);
    if (p.complexity !== "all") setComplexity(p.complexity);
    if (p.saved) setSavedOnly(true);
  }, []);

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
      engine?: string;
      aspect?: string;
      complexity?: string;
    }) => {
      const currentQuery = typeof window !== "undefined" ? window.location.search : "";
      const params = new URLSearchParams(currentQuery);

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
    [pathname, router]
  );

  // Handlers for state updates
  const handleEngineChange = (val: "all" | "visual" | "text") => {
    setEngine(val);
    updateUrlParams({ search, category, model, difficulty, useCase, tag, sort, engine: val });
  };

  const handleSearchChange = (val: string) => {
    setSearch(val);
    updateUrlParams({ search: val, category, model, difficulty, useCase, tag, sort, engine });
  };

  const handleCategoryChange = (val: string) => {
    setCategory(val);
    updateUrlParams({ search, category: val, model, difficulty, useCase, tag, sort, engine });
    if (val !== "all") {
      const cat = categories.find((c) => c.slug === val);
      trackCategoryClick(val, cat?.name, "/prompts");
    }
  };

  const handleModelChange = (val: string) => {
    setModel(val);
    updateUrlParams({ search, category, model: val, difficulty, useCase, tag, sort, engine });
  };

  const handleDifficultyChange = (val: string) => {
    setDifficulty(val);
    updateUrlParams({ search, category, model, difficulty: val, useCase, tag, sort, engine });
  };

  const handleUseCaseChange = (val: string) => {
    setUseCase(val);
    updateUrlParams({ search, category, model, difficulty, useCase: val, tag, sort, engine });
  };

  const handleTagToggle = (selectedTag: string) => {
    const nextTag = tag === selectedTag ? "all" : selectedTag;
    setTag(nextTag);
    updateUrlParams({ search, category, model, difficulty, useCase, tag: nextTag, sort, engine });
  };

  const handleSortChange = (val: PromptSortOption) => {
    setSort(val);
    updateUrlParams({ search, category, model, difficulty, useCase, tag, sort: val, engine });
  };

  const handleClearFilters = () => {
    setSearch("");
    setCategory("all");
    setModel("all");
    setDifficulty("all");
    setUseCase("all");
    setTag("all");
    setSort("popular");
    setEngine("all");
    setAspectRatio("all");
    setComplexity("all");
    setSavedOnly(false);
    setPromptsList(initialPrompts);
    setCurrentPage(1);
    setHasMore(totalCounts ? totalCounts.total > initialPrompts.length : true);
    setTotalCount(totalCounts?.total ?? initialPrompts.length);
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

  const visualCount = totalCounts?.visual ?? initialPrompts.filter((p) => Boolean(p.visualMetadata)).length;
  const textCount = totalCounts?.text ?? (initialPrompts.length - visualCount);
  const totalAvailableCount = totalCounts?.total ?? initialPrompts.length;

  const fetchPrompts = useCallback(
    async (targetPage: number = 1, append: boolean = false) => {
      if (append) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
      }

      try {
        const queryParams = new URLSearchParams();
        queryParams.set("page", String(targetPage));
        queryParams.set("limit", String(PAGE_SIZE));
        if (search.trim()) queryParams.set("search", search.trim());
        if (category !== "all") queryParams.set("category", category);
        if (model !== "all") queryParams.set("model", model);
        if (difficulty !== "all") queryParams.set("difficulty", difficulty);
        if (useCase !== "all") queryParams.set("useCase", useCase);
        if (tag !== "all") queryParams.set("tag", tag);
        if (sort !== "popular") queryParams.set("sort", sort);
        if (engine !== "all") queryParams.set("engine", engine);
        if (aspectRatio !== "all") queryParams.set("aspect", aspectRatio);
        if (complexity !== "all") queryParams.set("complexity", complexity);

        const res = await fetch(`/api/prompts?${queryParams.toString()}`);
        if (!res.ok) throw new Error("Failed to fetch prompts");
        const data = await res.json();

        if (append) {
          setPromptsList((prev) => [...prev, ...data.prompts]);
        } else {
          setPromptsList(data.prompts);
        }

        setCurrentPage(data.page);
        setHasMore(data.hasMore);
        setTotalCount(data.total);
      } catch (err) {
        console.error("Error loading prompts:", err);
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [search, category, model, difficulty, useCase, tag, sort, engine, aspectRatio, complexity]
  );

  // Trigger fetch when any filter changes, with debounce for search
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const timer = setTimeout(() => {
      fetchPrompts(1, false);
    }, search ? 350 : 0);

    return () => clearTimeout(timer);
  }, [search, category, model, difficulty, useCase, tag, sort, engine, aspectRatio, complexity, fetchPrompts]);

  const displayedPrompts = useMemo(() => {
    if (savedOnly) {
      return promptsList.filter((p) => savedIds.includes(p.id));
    }
    return promptsList;
  }, [promptsList, savedOnly, savedIds]);

  // Track debounced search in explorer
  useEffect(() => {
    const trimmed = search.trim();
    if (!trimmed) return;
    const timer = setTimeout(() => {
      trackSearch(
        trimmed,
        totalCount,
        "prompts_explorer",
        category !== "all" ? category : undefined
      );
    }, 600);
    return () => clearTimeout(timer);
  }, [search, totalCount, category]);

  // Check if any filter is currently applied
  const hasActiveFilters =
    Boolean(search) ||
    category !== "all" ||
    model !== "all" ||
    difficulty !== "all" ||
    useCase !== "all" ||
    tag !== "all" ||
    engine !== "all" ||
    aspectRatio !== "all" ||
    complexity !== "all" ||
    savedOnly;

  return (
    <div className="space-y-8">
      {/* Client-side URL search params synchronizer wrapped in zero-cost Suspense */}
      <React.Suspense fallback={null}>
        <SearchParamsWatcher onParamsSync={handleParamsSync} />
      </React.Suspense>

      {/* ── Engine Switcher (Visual vs Text Prompts) ── */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[var(--secondary)]/60 border border-[var(--border-subtle)] w-fit">
        <button
          type="button"
          onClick={() => handleEngineChange("all")}
          className={cn(
            "px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5",
            engine === "all"
              ? "bg-[var(--card)] text-[var(--foreground)] shadow-xs border border-[var(--border)] font-semibold"
              : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] border border-transparent"
          )}
        >
          <Sparkles className="h-3.5 w-3.5 text-[var(--primary)]" />
          <span>All Prompts</span>
          <span className="text-[10px] opacity-60 font-mono">({totalAvailableCount})</span>
        </button>
        <button
          type="button"
          onClick={() => handleEngineChange("visual")}
          className={cn(
            "px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5",
            engine === "visual"
              ? "bg-[var(--card)] text-[var(--foreground)] shadow-xs border border-amber-400/40 text-amber-300 font-semibold"
              : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] border border-transparent"
          )}
        >
          <Camera className="h-3.5 w-3.5 text-amber-400" />
          <span>Visual & Generative Art</span>
          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-amber-400/15 text-amber-300 font-medium">
            {visualCount}
          </span>
        </button>
        <button
          type="button"
          onClick={() => handleEngineChange("text")}
          className={cn(
            "px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5",
            engine === "text"
              ? "bg-[var(--card)] text-[var(--foreground)] shadow-xs border border-emerald-400/40 text-emerald-400 font-semibold"
              : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] border border-transparent"
          )}
        >
          <FileText className="h-3.5 w-3.5 text-emerald-400" />
          <span>Text & Productivity</span>
          <span className="text-[10px] opacity-60 font-mono">({textCount})</span>
        </button>
      </div>

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
              setSavedOnly(next);
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

        {/* Secondary Facets: Aspect Ratio & Parametric Complexity */}
        <div className="pt-2 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Aspect Ratio Facet */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-semibold text-[var(--muted-foreground)] mr-1">
              Aspect Ratio:
            </span>
            {(["all", "16:9", "4:5", "1:1", "21:9"] as const).map((ar) => {
              const isSelected = aspectRatio === ar;
              return (
                <button
                  key={ar}
                  type="button"
                  onClick={() => {
                    const next = isSelected ? "all" : ar;
                    setAspectRatio(next);
                    updateUrlParams({
                      search,
                      category,
                      model,
                      difficulty,
                      useCase,
                      tag,
                      sort,
                      engine,
                      aspect: next,
                      complexity,
                    });
                  }}
                  className={`px-2 py-0.5 rounded-md font-mono text-[11px] transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)] font-bold shadow-xs"
                      : "bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {ar === "all" ? "All Ratios" : ar}
                </button>
              );
            })}
          </div>

          {/* Complexity Facet */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-semibold text-[var(--muted-foreground)] mr-1">
              Structure:
            </span>
            {(
              [
                { id: "all", label: "All" },
                { id: "ready", label: "Ready-to-Run (0 Vars)" },
                { id: "parametric", label: "Parametric (1+ Vars)" },
              ] as const
            ).map((comp) => {
              const isSelected = complexity === comp.id;
              return (
                <button
                  key={comp.id}
                  type="button"
                  onClick={() => {
                    const next = isSelected ? "all" : comp.id;
                    setComplexity(next);
                    updateUrlParams({
                      search,
                      category,
                      model,
                      difficulty,
                      useCase,
                      tag,
                      sort,
                      engine,
                      aspect: aspectRatio,
                      complexity: next,
                    });
                  }}
                  className={`px-2 py-0.5 rounded-md text-[11px] transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)] font-bold shadow-xs"
                      : "bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {comp.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Active Filter Chips & Results Count Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-[var(--foreground)]">
            Showing {displayedPrompts.length} of {totalCount} prompts
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
                      updateUrlParams({ search, category, model, difficulty, useCase, tag, sort, saved: false, engine });
                    }}
                    className="hover:text-[var(--foreground)] cursor-pointer"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </Badge>
              )}

              {/* Active Engine Chip */}
              {engine !== "all" && (
                <Badge variant="secondary" size="sm" className="gap-1 text-[11px]">
                  <span>Format: {engine === "visual" ? "Visual & Art" : "Text & LLM"}</span>
                  <button
                    type="button"
                    onClick={() => handleEngineChange("all")}
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

      {/* Prompts Responsive Grid, Loading State, or Empty State */}
      {displayedPrompts.length > 0 ? (
        <>
          <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 transition-opacity duration-200", isLoading && "opacity-50 pointer-events-none")}>
            {displayedPrompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>

          {/* Incremental Load More Pagination */}
          {hasMore && !savedOnly && (
            <div className="mt-12 flex flex-col items-center justify-center gap-3 pt-6 border-t border-[var(--border-subtle)]">
              <p className="text-xs text-[var(--muted-foreground)]">
                Showing <span className="font-semibold text-[var(--foreground)]">{displayedPrompts.length}</span> of{" "}
                <span className="font-semibold text-[var(--foreground)]">{totalCount}</span> prompts
              </p>
              <button
                type="button"
                disabled={isLoadingMore}
                onClick={() => fetchPrompts(currentPage + 1, true)}
                className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] px-6 py-2.5 text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--secondary)] hover:border-[var(--border-strong)] transition-all cursor-pointer shadow-xs active:scale-[0.98] disabled:opacity-60"
              >
                {isLoadingMore ? (
                  <>
                    <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span>Loading Prompts...</span>
                  </>
                ) : (
                  <>
                    <span>Load More Prompts</span>
                    <span className="font-mono text-[10px] text-[var(--muted-foreground)]">
                      (+{Math.min(PAGE_SIZE, totalCount - displayedPrompts.length)})
                    </span>
                  </>
                )}
              </button>
            </div>
          )}
        </>
      ) : isLoading ? (
        <div className="flex flex-col items-center justify-center py-16 gap-3">
          <span className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-[var(--primary)] border-t-transparent" />
          <p className="text-xs text-[var(--muted-foreground)]">Filtering verified prompt library...</p>
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
