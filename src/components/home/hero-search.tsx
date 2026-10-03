"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search, Sparkles, ArrowRight, CornerDownLeft } from "lucide-react";
import { useSearch } from "@/components/search/search-context";
import { trackSearch } from "@/lib/analytics";

const SEARCH_SUGGESTIONS = [
  "Improve my resume",
  "Review my React code",
  "Write a professional email",
  "Create a YouTube script",
  "Plan a marketing strategy",
];

export function HeroSearch() {
  const { openSearch } = useSearch();
  const [inputValue, setInputValue] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const term = inputValue.trim();
    if (term) {
      trackSearch(term, 0, "hero");
    }
    openSearch(term || undefined);
  };

  const handleSuggestionClick = (suggestion: string) => {
    trackSearch(suggestion, 0, "hero_suggestion");
    openSearch(suggestion);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center gap-4">
      {/* ── Search input ── */}
      <div className="relative w-full group">
        {/* Ambient radial glow behind the input */}
        <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-blue-500/10 blur-2xl opacity-60 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

        <form
          onSubmit={handleSearchSubmit}
          onClick={() => openSearch(inputValue || undefined)}
          className="relative flex items-center w-full h-14 sm:h-[60px] rounded-2xl border border-[var(--border-strong)] bg-[var(--card)]/95 px-4 sm:px-5 shadow-[var(--shadow-md)] group-hover:shadow-[var(--shadow-lg)] backdrop-blur-md transition-all duration-200 group-hover:border-[var(--primary)]/50 cursor-pointer"
        >
          <Search className="h-4.5 w-4.5 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] transition-colors shrink-0 mr-3.5" />

          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => openSearch(inputValue || undefined)}
            placeholder="What do you want AI to help you with?"
            className="w-full bg-transparent text-sm sm:text-[0.95rem] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]/70 focus:outline-hidden cursor-pointer"
            aria-label="Search AI prompts"
            readOnly
          />

          <div className="flex items-center gap-2 shrink-0 ml-2">
            <span className="hidden sm:inline-flex items-center gap-0.5 rounded-[5px] border border-[var(--border-strong)] bg-[var(--secondary)] px-1.5 py-1 text-[10px] font-mono text-[var(--subtle-foreground)] shadow-[0_1px_0_rgba(0,0,0,0.2)] leading-none">
              <span className="text-[9px]">⌘</span>K
            </span>
            <button
              type="submit"
              aria-label="Search prompts"
              className="inline-flex h-9 items-center gap-1.5 rounded-[10px] bg-[var(--primary)] px-4 text-xs font-semibold text-[var(--primary-foreground)] shadow-sm transition-all hover:bg-[var(--primary-hover)] active:scale-[0.97] cursor-pointer"
            >
              <span className="hidden sm:inline">Search</span>
              <CornerDownLeft className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>

      {/* ── Quick suggestion chips ── */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-center gap-2 text-[11px]">
        <span className="text-[var(--muted-foreground)] flex items-center gap-1.5 shrink-0 font-medium">
          <Sparkles className="h-3 w-3 text-[var(--primary)]" />
          Try:
        </span>
        <div className="flex flex-wrap items-center gap-1.5">
          {SEARCH_SUGGESTIONS.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => handleSuggestionClick(suggestion)}
              className="rounded-full border border-[var(--border)] bg-[var(--card)]/70 px-2.5 py-1 text-[11px] text-[var(--muted-foreground)] backdrop-blur-sm transition-all hover:border-[var(--border-strong)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)] active:scale-95 cursor-pointer"
            >
              &ldquo;{suggestion}&rdquo;
            </button>
          ))}
        </div>
      </div>

      {/* ── Primary CTAs ── */}
      <div className="mt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5 w-full sm:w-auto">
        <Link
          href="/prompts"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--primary)] px-6 h-11 text-sm font-semibold text-[var(--primary-foreground)] shadow-sm transition-all hover:bg-[var(--primary-hover)] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-[var(--primary)]"
        >
          <span>Explore Prompts</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href="/categories"
          className="w-full sm:w-auto inline-flex items-center justify-center rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--card)] px-6 h-11 text-sm font-semibold text-[var(--foreground)] shadow-sm transition-all hover:border-[var(--border-strong)] hover:bg-[var(--secondary)] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-[var(--primary)]"
        >
          Browse Categories
        </Link>
      </div>
    </div>
  );
}
