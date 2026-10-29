"use client";

import React, { useState, useMemo } from "react";
import {
  DiwaliPromptItem,
  DiwaliCategoryMeta,
  DIWALI_CATEGORIES,
  DIWALI_PROMPTS,
} from "@/data/diwali-prompts";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import { copyToClipboard, cn } from "@/lib/utils";
import {
  Sparkles,
  Copy,
  Check,
  Flame,
  Search,
  Lightbulb,
  SlidersHorizontal,
  ChevronDown,
  Layers,
  ArrowRight,
  User,
  Camera,
  Smartphone,
  ShoppingBag,
  Palette,
  Info,
} from "lucide-react";

interface DiwaliPromptWorkbenchProps {
  initialCount?: number;
}

export function DiwaliPromptWorkbench({
  initialCount = 12,
}: DiwaliPromptWorkbenchProps) {
  const allPrompts = DIWALI_PROMPTS;
  const { success } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Global live personalizer values
  const [userName, setUserName] = useState<string>("Aarav");
  const [brandName, setBrandName] = useState<string>("Aura Brands");
  const [showAllCards, setShowAllCards] = useState<boolean>(false);

  // Filtered prompt list based on category & search query
  const filteredPrompts = useMemo(() => {
    return allPrompts.filter((item) => {
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;
      const q = searchQuery.trim().toLowerCase();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.promptTemplate.toLowerCase().includes(q) ||
        item.bestTool.toLowerCase().includes(q) ||
        item.keywords.some((kw) => kw.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });
  }, [allPrompts, selectedCategory, searchQuery]);

  // Bingbot optimization: only show initialCount (12) cards unless user toggles "Load All" or filters
  const displayedPrompts = useMemo(() => {
    if (showAllCards || selectedCategory !== "all" || searchQuery.trim().length > 0) {
      return filteredPrompts;
    }
    return filteredPrompts.slice(0, initialCount);
  }, [filteredPrompts, showAllCards, selectedCategory, searchQuery, initialCount]);

  // Compute final prompt text with personalized replacement
  const getPersonalizedPrompt = (template: string) => {
    let result = template;
    if (userName.trim()) {
      result = result.replaceAll("[YOUR NAME]", userName.trim());
    }
    if (brandName.trim()) {
      result = result.replaceAll("[BRAND NAME]", brandName.trim());
    }
    return result;
  };

  const handleCopy = async (item: DiwaliPromptItem) => {
    const textToCopy = getPersonalizedPrompt(item.promptTemplate);
    const ok = await copyToClipboard(textToCopy);
    if (ok) {
      setCopiedId(item.id);
      success(`Copied "${item.title.slice(0, 35)}..." to clipboard!`);
      setTimeout(() => setCopiedId(null), 2200);
    }
  };

  const getToolBadgeColor = (tool: string) => {
    switch (tool) {
      case "Bing Image Creator":
        return "bg-cyan-500/10 text-cyan-400 border-cyan-500/25";
      case "Ideogram":
        return "bg-amber-500/10 text-amber-400 border-amber-500/25";
      case "Midjourney":
        return "bg-violet-500/10 text-violet-400 border-violet-500/25";
      case "ChatGPT (DALL-E 3)":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/25";
      default:
        return "bg-indigo-500/10 text-indigo-400 border-indigo-500/25";
    }
  };

  const renderCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "User":
        return <User className="h-3.5 w-3.5" />;
      case "Camera":
        return <Camera className="h-3.5 w-3.5" />;
      case "Smartphone":
        return <Smartphone className="h-3.5 w-3.5" />;
      case "ShoppingBag":
        return <ShoppingBag className="h-3.5 w-3.5" />;
      case "Palette":
        return <Palette className="h-3.5 w-3.5" />;
      default:
        return <Sparkles className="h-3.5 w-3.5" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* ── LIVE PLACEHOLDER PERSONALIZER DOCK ── */}
      <div className="rounded-2xl border border-amber-500/25 bg-gradient-to-r from-amber-500/[0.07] via-[var(--card)] to-amber-500/[0.04] p-5 sm:p-6 shadow-lg backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <Flame className="h-4 w-4 animate-bounce text-amber-400" />
              <span>Interactive Live Personalizer</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-[var(--foreground)] tracking-tight">
              Type your name or brand to customize all 20+ prompts instantly
            </h2>
            <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
              Updating the inputs below automatically swaps <code className="text-amber-300 font-mono text-[11px] bg-amber-400/10 px-1.5 py-0.5 rounded">[YOUR NAME]</code> and <code className="text-amber-300 font-mono text-[11px] bg-amber-400/10 px-1.5 py-0.5 rounded">[BRAND NAME]</code> across all prompt cards before copying.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative">
              <label htmlFor="user-name-input" className="block text-[11px] font-medium text-[var(--muted-foreground)] mb-1">
                Your Name ([YOUR NAME])
              </label>
              <input
                id="user-name-input"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="e.g. Aarav, Ananya, Kabir"
                className="w-full sm:w-44 rounded-[var(--radius-md)] border border-amber-500/30 bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--subtle-foreground)] focus:border-amber-400 focus:outline-hidden focus:ring-1 focus:ring-amber-400 shadow-xs"
              />
            </div>

            <div className="relative">
              <label htmlFor="brand-name-input" className="block text-[11px] font-medium text-[var(--muted-foreground)] mb-1">
                Brand / Business ([BRAND NAME])
              </label>
              <input
                id="brand-name-input"
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                placeholder="e.g. Aura Brands, Nexus Corp"
                className="w-full sm:w-48 rounded-[var(--radius-md)] border border-amber-500/30 bg-[var(--background)] px-3 py-2 text-sm text-[var(--foreground)] placeholder:text-[var(--subtle-foreground)] focus:border-amber-400 focus:outline-hidden focus:ring-1 focus:ring-amber-400 shadow-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── CONTROLS: CATEGORY TABS & SEARCH ── */}
      <div className="space-y-4">
        {/* Category Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {DIWALI_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-all duration-150 cursor-pointer border shrink-0",
                  isActive
                    ? "border-amber-400 bg-amber-400/15 text-amber-300 font-semibold shadow-xs"
                    : "border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:border-amber-500/30 hover:text-[var(--foreground)]"
                )}
              >
                {renderCategoryIcon(cat.iconName)}
                <span>{cat.label}</span>
                <span className="rounded-full bg-white/10 px-1.5 py-0.2 text-[10px]">
                  {cat.id === "all"
                    ? allPrompts.length
                    : allPrompts.filter((p) => p.category === cat.id).length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar & Active Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--muted-foreground)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search prompts (e.g. couple, 3d name, podium, story, pixar)..."
              className="w-full rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] pl-10 pr-4 py-2 text-xs text-[var(--foreground)] placeholder:text-[var(--subtle-foreground)] focus:border-amber-400 focus:outline-hidden focus:ring-1 focus:ring-amber-400"
            />
          </div>

          <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
            <span>
              Showing <strong className="text-[var(--foreground)]">{displayedPrompts.length}</strong> of{" "}
              {filteredPrompts.length} prompts
            </span>
            {filteredPrompts.length > displayedPrompts.length && (
              <button
                type="button"
                onClick={() => setShowAllCards(true)}
                className="text-amber-400 hover:underline font-medium text-xs cursor-pointer"
              >
                Load all {filteredPrompts.length} &rarr;
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── PROMPTS GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {displayedPrompts.map((item) => {
          const isCopied = copiedId === item.id;
          const livePrompt = getPersonalizedPrompt(item.promptTemplate);

          return (
            <article
              key={item.id}
              className="group relative flex flex-col justify-between rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 card-lift hover:border-amber-500/40 hover:bg-[var(--card-hover)] transition-all duration-200 shadow-sm"
            >
              <div className="space-y-4">
                {/* Header Row: Best Tool & Aspect Ratio */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border",
                        getToolBadgeColor(item.bestTool)
                      )}
                    >
                      <Sparkles className="h-3 w-3" />
                      Best AI Tool: {item.bestTool}
                    </span>
                    <span className="rounded-md border border-[var(--border)] bg-[var(--secondary)] px-2 py-0.5 text-[11px] font-mono text-[var(--muted-foreground)]">
                      {item.aspectRatio}
                    </span>
                  </div>

                  <span className="text-[11px] font-medium text-[var(--subtle-foreground)]">
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-[var(--foreground)] leading-snug group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>

                {/* Prompt Box with Highlighted Dynamic Placeholders */}
                <div className="relative rounded-lg border border-[var(--border)] bg-[var(--background)] p-3.5 sm:p-4 font-mono text-xs leading-relaxed text-[var(--muted-foreground)] select-all group-hover:border-amber-500/30 transition-colors">
                  <p className="line-clamp-6 text-[12.5px] leading-relaxed">
                    {livePrompt.split(/(\[.*?\])/g).map((part, idx) => {
                      if (part.startsWith("[") && part.endsWith("]")) {
                        return (
                          <span
                            key={idx}
                            className="inline-block px-1.5 py-0.5 mx-0.5 rounded bg-amber-400/20 text-amber-300 font-semibold border border-amber-400/30"
                          >
                            {part}
                          </span>
                        );
                      }
                      return part;
                    })}
                  </p>
                </div>

                {/* 2-Line "How to Customize" Guide & Pro-Tip (AdSense Anti-Thin-Content) */}
                <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--secondary)]/50 p-3 space-y-1.5">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <div className="text-[11.5px] leading-relaxed text-[var(--foreground)]">
                      <strong className="text-amber-300 font-semibold">How to customize: </strong>
                      <span className="text-[var(--muted-foreground)]">{item.customizationGuide}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 pt-1 border-t border-[var(--border-subtle)]">
                    <Info className="h-3.5 w-3.5 text-indigo-400 shrink-0 mt-0.5" />
                    <p className="text-[11px] text-[var(--subtle-foreground)] leading-relaxed">
                      <strong className="text-indigo-300 font-medium">{item.bestTool} Tip: </strong>
                      {item.modelTip}
                    </p>
                  </div>
                </div>

                {/* Technical Specs: Lighting & Optics */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[var(--subtle-foreground)]">
                  <span>
                    <strong className="text-[var(--muted-foreground)]">Lighting:</strong> {item.lighting}
                  </span>
                  <span>•</span>
                  <span>
                    <strong className="text-[var(--muted-foreground)]">Optics:</strong> {item.optics}
                  </span>
                </div>
              </div>

              {/* Bottom Action Footer */}
              <div className="mt-5 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-1.5">
                  {item.keywords.slice(0, 2).map((kw) => (
                    <span
                      key={kw}
                      className="rounded border border-[var(--border-subtle)] bg-[var(--background)] px-2 py-0.5 text-[10px] text-[var(--subtle-foreground)]"
                    >
                      #{kw}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => handleCopy(item)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-xs font-semibold shadow-xs transition-all duration-150 cursor-pointer shrink-0",
                    isCopied
                      ? "bg-emerald-500 text-white"
                      : "bg-amber-400 text-black hover:bg-amber-300 active:scale-95"
                  )}
                  aria-label={`Copy prompt for ${item.title}`}
                >
                  {isCopied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* ── LOAD MORE / EXPAND REMAINING PROMPTS BUTTON (Bingbot 125 KB optimization) ── */}
      {!showAllCards && selectedCategory === "all" && !searchQuery.trim() && (
        <div className="text-center pt-6 pb-2">
          <button
            type="button"
            onClick={() => setShowAllCards(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-amber-500/40 bg-[var(--card)] px-6 py-3 text-sm font-semibold text-amber-300 hover:bg-amber-400/10 hover:border-amber-400 transition-all duration-150 cursor-pointer shadow-md"
          >
            <span>Load More Diwali AI Prompts ({allPrompts.length - displayedPrompts.length} remaining)</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          <p className="text-[11px] text-[var(--subtle-foreground)] mt-2">
            Showing initial 12 ultra-fast server-rendered prompts for optimal performance.
          </p>
        </div>
      )}
    </div>
  );
}
