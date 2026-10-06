"use client";

import React, { useState, useEffect, useRef, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Prompt } from "@/types/prompt";
import { Badge } from "@/components/ui/badge";
import {
  defaultSearchEngine,
  useRecentSearches,
  HighlightMatches,
  SearchSuggestion,
  SearchResultItem,
} from "@/lib/search";
import {
  Search,
  X,
  Copy,
  Check,
  ArrowRight,
  CornerDownLeft,
  Clock,
  Sparkles,
  Layers,
  Tag as TagIcon,
  Trash2,
  FileText,
  Camera,
} from "lucide-react";
import { cn, copyToClipboard } from "@/lib/utils";
import { trackSearch, trackPromptCopy } from "@/lib/analytics";

interface SearchCommandDialogProps {
  isOpen: boolean;
  onClose: () => void;
  prompts: Prompt[];
  query: string;
  onQueryChange: (q: string) => void;
}

export function SearchCommandDialog({
  isOpen,
  onClose,
  prompts,
  query,
  onQueryChange,
}: SearchCommandDialogProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsContainerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  // Recent Searches stored via localStorage
  const { recentSearches, addSearch, removeSearch, clearSearches } = useRecentSearches();

  // Debounced search query for buttery smooth 60fps typing
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const handler = setTimeout(() => {
      startTransition(() => {
        setDebouncedQuery(query);
      });
    }, 50);

    return () => clearTimeout(handler);
  }, [query]);

  // Execute in-memory search through the SearchEngine architecture
  const searchResponse = React.useMemo(() => {
    return defaultSearchEngine.search({ term: debouncedQuery, limit: 30 }, prompts);
  }, [debouncedQuery, prompts]);

  const searchResults: SearchResultItem[] = searchResponse.results;

  // Search suggestions (curated & dynamic)
  const suggestions: SearchSuggestion[] = React.useMemo(() => {
    return defaultSearchEngine.getSuggestions(query, prompts, 8) as SearchSuggestion[];
  }, [query, prompts]);

  // Auto-focus input when modal opens
  useEffect(() => {
    if (debouncedQuery.trim() && isOpen) {
      trackSearch(debouncedQuery, searchResults.length, "command_dialog");
    }
  }, [debouncedQuery, searchResults.length, isOpen]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setSelectedIndex(0);
        if (inputRef.current) {
          inputRef.current.focus();
          inputRef.current.select();
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const activeIndex =
    searchResults.length === 0 ? 0 : Math.min(selectedIndex, searchResults.length - 1);

  // Close search and clear input
  const handleClose = React.useCallback(() => {
    onQueryChange("");
    onClose();
  }, [onClose, onQueryChange]);

  // Select a specific prompt and record recent search
  const handleSelectPrompt = React.useCallback(
    (prompt: Prompt) => {
      if (query.trim()) {
        addSearch(query.trim());
      } else {
        addSearch(prompt.title);
      }
      handleClose();
      router.push(`/prompts/${prompt.slug}`);
    },
    [addSearch, handleClose, query, router]
  );

  // Execute search query navigation (e.g. on Enter without selected item)
  const handleExecuteSearch = React.useCallback(
    (searchTerm: string) => {
      const term = searchTerm.trim();
      if (!term) return;

      addSearch(term);
      handleClose();
      router.push(`/prompts?search=${encodeURIComponent(term)}`);
    },
    [addSearch, handleClose, router]
  );

  // Keyboard navigation listener (ArrowUp, ArrowDown, Enter, Escape)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
        return;
      }

      if (searchResults.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % searchResults.length);
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length);
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (activeIndex >= 0 && activeIndex < searchResults.length) {
            handleSelectPrompt(searchResults[activeIndex].prompt);
          } else if (query.trim()) {
            handleExecuteSearch(query);
          }
        }
      } else if (e.key === "Enter" && query.trim()) {
        e.preventDefault();
        handleExecuteSearch(query);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, searchResults, activeIndex, query, handleClose, handleExecuteSearch, handleSelectPrompt]);

  // Ensure active result item is scrolled into view
  useEffect(() => {
    if (resultsContainerRef.current) {
      const activeEl = resultsContainerRef.current.querySelector(
        `[data-result-index="${activeIndex}"]`
      );
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [activeIndex]);

  // Quick copy prompt action with non-intrusive inline feedback
  const handleCopy = async (e: React.MouseEvent, p: Prompt) => {
    e.stopPropagation();
    const textToCopy = p.prompt || p.template || "";
    const ok = await copyToClipboard(textToCopy);
    if (ok) {
      setCopiedId(p.id);
      setTimeout(() => setCopiedId(null), 1800);
    }

    trackPromptCopy({
      promptId: p.id,
      category: p.categoryName || p.category,
      sourcePage: "command_dialog",
      isCustomized: false,
      modelCompatibility: p.compatibleModels,
      variableCount: p.variables?.length || 0,
    });
  };

  if (!isOpen) return null;

  const isQueryEmpty = !query.trim();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Global Prompt Search"
      className="fixed inset-0 z-50 flex items-start justify-center p-0 sm:pt-20 sm:p-4 bg-black/75 backdrop-blur-sm sm:backdrop-blur-md animate-in fade-in duration-150"
      onClick={handleClose}
    >
      <div
        className="w-full h-full sm:h-auto sm:max-h-[82vh] sm:max-w-2xl sm:rounded-[var(--radius-xl)] border-0 sm:border border-[var(--border-strong)] bg-[var(--card)] shadow-[var(--shadow-lg)] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ========================================================================= */}
        {/* 1. SEARCH INPUT BAR WITH CLEAR BUTTON & MOBILE CANCEL                     */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3 sm:py-3.5 bg-[var(--card)] shrink-0">
          <Search className="h-4.5 w-4.5 text-[var(--muted-foreground)] shrink-0" />

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setSelectedIndex(0);
              onQueryChange(e.target.value);
            }}
            placeholder="Search prompts by task, category, tag, or model..."
            className="flex-1 bg-transparent text-sm sm:text-base text-[var(--foreground)] placeholder:text-[var(--subtle-foreground)] focus:outline-none"
            aria-label="Search prompt query"
            role="combobox"
            aria-expanded={isOpen && searchResults.length > 0}
            aria-controls="search-results-listbox"
            aria-activedescendant={activeIndex >= 0 ? `search-result-${activeIndex}` : undefined}
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
          />

          {/* Clear Search Button */}
          {query && (
            <button
              type="button"
              onClick={() => {
                onQueryChange("");
                inputRef.current?.focus();
              }}
              aria-label="Clear search input"
              className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors cursor-pointer"
              title="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}

          {/* Desktop Esc Badge */}
          <kbd className="hidden sm:inline-flex text-[10px] uppercase font-mono">
            Esc
          </kbd>

          {/* Mobile Cancel Button */}
          <button
            type="button"
            onClick={handleClose}
            className="sm:hidden text-xs font-semibold text-[var(--primary)] px-1 cursor-pointer"
          >
            Cancel
          </button>
        </div>

        {/* ========================================================================= */}
        {/* 2. BODY CONTENT: RECENT SEARCHES & SUGGESTIONS (EMPTY STATE) OR RESULTS    */}
        {/* ========================================================================= */}
        <div
          ref={resultsContainerRef}
          className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-4 max-h-[calc(100vh-120px)] sm:max-h-[500px]"
        >
          {isQueryEmpty ? (
            <div className="space-y-6 py-2">
              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] flex items-center gap-1.5">
                      <Clock className="h-3 w-3" />
                      Recent Searches
                    </span>
                    <button
                      type="button"
                      onClick={clearSearches}
                      className="text-[11px] text-[var(--muted-foreground)] hover:text-[var(--status-error)] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="h-2.5 w-2.5" />
                      Clear all
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((term) => (
                      <div
                        key={term}
                        className="group flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--secondary)]/60 px-3 py-1 text-xs text-[var(--foreground)] hover:border-[var(--primary)]/40 hover:bg-[var(--secondary)] transition-all cursor-pointer"
                        onClick={() => onQueryChange(term)}
                      >
                        <Clock className="h-3 w-3 text-[var(--muted-foreground)]" />
                        <span>{term}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeSearch(term);
                          }}
                          aria-label={`Remove recent search ${term}`}
                          className="opacity-40 hover:opacity-100 p-0.5 rounded-full hover:text-[var(--status-error)] transition-opacity"
                        >
                          <X className="h-2.5 w-2.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Curated High-Intent Suggestions */}
              <div className="space-y-2.5">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] flex items-center gap-1.5 px-1">
                  <Sparkles className="h-3 w-3 text-[var(--primary)]" />
                  Popular Suggestions
                </span>

                <div className="flex flex-wrap gap-2">
                  {suggestions.map((sugg) => (
                    <button
                      key={sugg.text}
                      type="button"
                      onClick={() => onQueryChange(sugg.text)}
                      className="flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] bg-[var(--card)] px-3 py-1 text-xs font-medium text-[var(--subtle-foreground)] hover:border-[var(--primary)]/40 hover:text-[var(--foreground)] hover:bg-[var(--secondary)]/80 transition-all cursor-pointer"
                    >
                      {sugg.type === "category" ? (
                        <Layers className="h-3 w-3 text-[var(--primary)]" />
                      ) : sugg.type === "tag" ? (
                        <TagIcon className="h-3 w-3 text-[var(--muted-foreground)]" />
                      ) : (
                        <span className="text-[var(--primary)]">•</span>
                      )}
                      <span>{sugg.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation Hints */}
              <div className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--secondary)]/30 p-3.5 text-xs text-[var(--muted-foreground)] leading-relaxed">
                <p className="flex items-center gap-1.5 font-medium text-[var(--foreground)] mb-1">
                  <FileText className="h-3.5 w-3.5 text-[var(--primary)]" />
                  Instant Filter by Category or Model
                </p>
                <span>
                  Type terms like <strong className="text-[var(--foreground)] font-mono">resume</strong>,{" "}
                  <strong className="text-[var(--foreground)] font-mono">react</strong>,{" "}
                  <strong className="text-[var(--foreground)] font-mono">email</strong>, or{" "}
                  <strong className="text-[var(--foreground)] font-mono">system design</strong> to rank matching prompts.
                </span>
              </div>
            </div>
          ) : searchResults.length === 0 ? (
            /* No Results Found State */
            <div className="py-12 px-4 text-center space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--secondary)] text-[var(--muted-foreground)] mx-auto">
                <Search className="h-5 w-5" />
              </div>
              <h3 className="text-sm font-semibold text-[var(--foreground)]">
                No matching prompts found for &ldquo;{query}&rdquo;
              </h3>
              <p className="text-xs text-[var(--muted-foreground)] max-w-sm mx-auto">
                Try searching for broad concepts such as <button type="button" onClick={() => onQueryChange("resume")} className="text-[var(--primary)] underline cursor-pointer">resume</button>, <button type="button" onClick={() => onQueryChange("coding")} className="text-[var(--primary)] underline cursor-pointer">coding</button>, or <button type="button" onClick={() => onQueryChange("marketing")} className="text-[var(--primary)] underline cursor-pointer">marketing</button>.
              </p>
            </div>
          ) : (
            /* Active Search Results List */
            <div
              id="search-results-listbox"
              role="listbox"
              aria-label="Search suggestions and results"
              className="space-y-1.5"
            >
              <div className="flex items-center justify-between pb-1 px-1 text-[11px] text-[var(--muted-foreground)]">
                <span>
                  {searchResponse.total} {searchResponse.total === 1 ? "prompt" : "prompts"} found
                </span>
                <span className="font-mono text-[10px]">
                  {searchResponse.tookMs}ms
                </span>
              </div>

              {searchResults.map((item, index) => {
                const { prompt, matchedField } = item;
                const isSelected = index === selectedIndex;
                const isCopied = copiedId === prompt.id;

                return (
                  <div
                    key={prompt.id}
                    id={`search-result-${index}`}
                    role="option"
                    aria-selected={isSelected}
                    data-result-index={index}
                    onClick={() => handleSelectPrompt(prompt)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      "group relative flex items-center justify-between gap-3 rounded-[var(--radius-lg)] p-3.5 text-left transition-all cursor-pointer border",
                      isSelected
                        ? "bg-[var(--secondary)] border-[var(--primary)]/50 shadow-xs"
                        : "bg-[var(--card)] border-[var(--border-subtle)] hover:bg-[var(--secondary)]/60 hover:border-[var(--border)]"
                    )}
                  >
                    {prompt.visualMetadata?.previewImageUrl && (
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0 border border-white/10 hidden sm:block">
                        <Image
                          src={prompt.visualMetadata.previewImageUrl}
                          alt={prompt.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div className="flex-1 min-w-0 space-y-1.5">
                      {/* Category, Models & Matched Indicator */}
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="primary" size="sm" className="capitalize text-[10px]">
                          <HighlightMatches
                            text={prompt.categoryName || prompt.category}
                            query={debouncedQuery}
                          />
                        </Badge>

                        {prompt.visualMetadata && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                            <Camera className="w-2.5 h-2.5" />
                            Visual Art
                          </span>
                        )}

                        <span className="font-mono text-[10px] text-[var(--muted-foreground)]">
                          {prompt.compatibleModels.slice(0, 3).join(" • ")}
                        </span>

                        {matchedField === "tag" && (
                          <span className="rounded bg-[var(--primary-muted)] text-[var(--primary)] px-1.5 py-0.2 font-mono text-[9px]">
                            Tag match
                          </span>
                        )}
                        {matchedField === "useCase" && (
                          <span className="rounded bg-[var(--status-info-bg)] text-[var(--status-info)] px-1.5 py-0.2 font-mono text-[9px]">
                            Use case match
                          </span>
                        )}
                      </div>

                      {/* Title with matched highlighting */}
                      <div className="text-xs sm:text-sm font-semibold text-[var(--foreground)] truncate leading-snug">
                        <HighlightMatches text={prompt.title} query={debouncedQuery} />
                      </div>

                      {/* Description with matched highlighting */}
                      <div className="text-[11px] text-[var(--muted-foreground)] line-clamp-1 leading-relaxed">
                        <HighlightMatches
                          text={prompt.shortDescription || prompt.description}
                          query={debouncedQuery}
                        />
                      </div>
                    </div>

                    {/* Right Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0">
                      {/* One-Click Copy Prompt Button */}
                      <button
                        type="button"
                        onClick={(e) => handleCopy(e, prompt)}
                        aria-label={`Copy prompt template: ${prompt.title}`}
                        className={cn(
                          "flex h-8 items-center gap-1.5 rounded-[var(--radius-md)] border px-2.5 text-[11px] font-medium transition-colors cursor-pointer",
                          isCopied
                            ? "border-[var(--status-success)]/40 bg-[var(--status-success-bg)] text-[var(--status-success)]"
                            : "border-[var(--border)] bg-[var(--card)] text-[var(--foreground)] hover:border-[var(--border-strong)] hover:bg-[var(--secondary)]"
                        )}
                        title="Copy prompt text"
                      >
                        {isCopied ? (
                          <>
                            <Check className="h-3.5 w-3.5 text-[var(--status-success)]" />
                            <span className="hidden sm:inline">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span className="hidden sm:inline">Copy</span>
                          </>
                        )}
                      </button>

                      {/* Navigation Arrow */}
                      <div
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] transition-colors",
                          isSelected
                            ? "text-[var(--primary)]"
                            : "text-[var(--muted-foreground)] group-hover:text-[var(--foreground)]"
                        )}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ========================================================================= */}
        {/* 3. MODAL FOOTER BAR WITH KEYBOARD SHORTCUTS HINTS                         */}
        {/* ========================================================================= */}
        <div className="flex items-center justify-between border-t border-[var(--border-subtle)] bg-[var(--secondary)]/40 px-4 py-2.5 text-[11px] text-[var(--muted-foreground)] shrink-0">
          <div className="hidden sm:flex items-center gap-3">
            <span className="flex items-center gap-1">
              <kbd className="text-[9px]">↑</kbd> <kbd className="text-[9px]">↓</kbd> to navigate
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CornerDownLeft className="h-3 w-3" /> to select
            </span>
            <span>•</span>
            <span>Esc to close</span>
          </div>

          <div className="sm:hidden text-[10px]">
            Tap any result to view prompt details
          </div>

          <button
            type="button"
            onClick={() => handleExecuteSearch(query)}
            disabled={!query.trim()}
            className={cn(
              "font-semibold text-xs transition-colors",
              query.trim()
                ? "text-[var(--primary)] hover:underline cursor-pointer"
                : "text-[var(--muted-foreground)] opacity-50 cursor-default"
            )}
          >
            Search all prompts &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
