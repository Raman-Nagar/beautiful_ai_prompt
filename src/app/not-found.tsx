"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSearch } from "@/components/search/search-context";
import {
  Compass,
  Search,
  ArrowRight,
  Home,
  BookOpen,
  Layers,
  Sparkles,
} from "lucide-react";

export default function NotFound() {
  const { openSearch } = useSearch();

  return (
    <>
      <title>404 - Page Not Found | Beautiful AI Prompt</title>
      <meta name="robots" content="noindex, follow" />
      <main className="min-h-[75vh] flex items-center justify-center py-16 bg-[var(--background)]">
      <Container size="narrow">
        <div className="text-center space-y-6">
          {/* Subtle error code badge */}
          <div className="inline-flex items-center gap-2">
            <Badge variant="warning" size="sm" className="font-mono">
              Error 404
            </Badge>
            <span className="text-xs text-[var(--muted-foreground)]">
              Page Not Found
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--foreground)]">
            Looking for a prompt or playbook?
          </h1>

          <p className="text-sm sm:text-base text-[var(--subtle-foreground)] max-w-md mx-auto leading-relaxed">
            The page, prompt, or guide you requested doesn’t exist or has moved. Use the options below or trigger global search.
          </p>

          {/* Search Trigger Button */}
          <div className="pt-2 pb-4">
            <button
              type="button"
              onClick={() => openSearch()}
              className="inline-flex items-center justify-between gap-3 w-full max-w-sm px-4 py-2.5 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] hover:border-[var(--border-strong)] text-xs text-[var(--muted-foreground)] shadow-xs transition-all mx-auto"
            >
              <span className="flex items-center gap-2">
                <Search className="h-4 w-4 text-[var(--primary)]" />
                <span>Search 25+ production prompts...</span>
              </span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-[var(--secondary)] border border-[var(--border)] text-[10px] font-mono">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Quick Navigation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left max-w-md mx-auto pt-2">
            <Link
              href="/prompts"
              className="group p-3.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/50 transition-all"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)]">
                <span className="flex items-center gap-2">
                  <Compass className="h-3.5 w-3.5 text-[var(--primary)]" />
                  Explore Prompts
                </span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="text-[11px] text-[var(--muted-foreground)] mt-1">
                Browse our verified prompt repository.
              </p>
            </Link>

            <Link
              href="/categories"
              className="group p-3.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/50 transition-all"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)]">
                <span className="flex items-center gap-2">
                  <Layers className="h-3.5 w-3.5 text-[var(--primary)]" />
                  Browse Categories
                </span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="text-[11px] text-[var(--muted-foreground)] mt-1">
                Explore 20+ specialized domains.
              </p>
            </Link>

            <Link
              href="/collections"
              className="group p-3.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/50 transition-all"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)]">
                <span className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-[var(--primary)]" />
                  Curated Collections
                </span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="text-[11px] text-[var(--muted-foreground)] mt-1">
                Role-specific prompt packs.
              </p>
            </Link>

            <Link
              href="/guides"
              className="group p-3.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/50 transition-all"
            >
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)]">
                <span className="flex items-center gap-2">
                  <BookOpen className="h-3.5 w-3.5 text-[var(--primary)]" />
                  Read Guides
                </span>
                <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="text-[11px] text-[var(--muted-foreground)] mt-1">
                Prompt engineering playbooks.
              </p>
            </Link>
          </div>

          {/* Back to Home CTA */}
          <div className="pt-4">
            <Link href="/">
              <Button variant="secondary" size="sm" className="gap-2">
                <Home className="h-4 w-4" />
                <span>Return to Homepage</span>
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </main>
    </>
  );
}
