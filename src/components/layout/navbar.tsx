"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Container } from "./container";
import { ThemeToggle } from "./theme-toggle";
import { useSearch } from "@/components/search/search-context";
import {
  Sparkles,
  Search,
  Menu,
  X,
  ArrowRight,
  Compass,
  Layers,
  BookmarkCheck,
  BookOpen,
  Bookmark,
  Grid3X3,
} from "lucide-react";
import { useSavedPromptIds } from "@/lib/storage";

export function Navbar() {
  const pathname = usePathname();
  const { openSearch } = useSearch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const savedIds = useSavedPromptIds();

  // Detect scroll to apply elevated styling
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Prompts", href: "/prompts", icon: <Compass className="h-4 w-4" /> },
    { label: "Categories", href: "/categories", icon: <Layers className="h-4 w-4" /> },
    { label: "Collections", href: "/collections", icon: <BookmarkCheck className="h-4 w-4" /> },
    { label: "Guides", href: "/guides", icon: <BookOpen className="h-4 w-4" /> },
    { label: "Composition Ruler", href: "/tools/composition-ruler", icon: <Grid3X3 className="h-4 w-4" /> },
  ];

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200",
        isScrolled
          ? "border-b border-[var(--border)] bg-[var(--background)]/92 shadow-[0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl"
          : "border-b border-transparent bg-[var(--background)]/70 backdrop-blur-md"
      )}
    >
      <Container>
        <div className="flex h-14 items-center justify-between gap-4">
          {/* ── Brand Logo ── */}
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="group flex items-center gap-2.5 shrink-0"
            aria-label="Beautiful AI Prompt Home"
          >
            {/* Logo mark */}
            <div className="relative flex h-7 w-7 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-gradient-to-br from-indigo-500/20 via-violet-500/10 to-[var(--card)] text-[var(--primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition-transform duration-200 group-hover:scale-105">
              <Sparkles className="h-3.5 w-3.5 text-[var(--primary)]" />
            </div>
            {/* Brand text */}
            <div className="flex flex-col leading-none">
              <span className="text-[13px] font-semibold tracking-tight text-[var(--foreground)]">
                Beautiful AI Prompt
              </span>
              <span className="hidden sm:inline text-[9px] font-medium tracking-widest uppercase text-[var(--muted-foreground)] mt-0.5 opacity-70">
                Productivity Platform
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(`${link.href}/`));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-1.5 rounded-[var(--radius-md)] px-3 py-1.5 text-[13px] font-medium transition-all duration-150",
                    isActive
                      ? "bg-[var(--secondary)] text-[var(--foreground)]"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]/50"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* ── Right Utilities (Desktop) ── */}
          <div className="hidden md:flex items-center gap-2">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search prompts (⌘K)"
              className="group flex h-8 items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] px-3 text-[13px] text-[var(--muted-foreground)] transition-all hover:border-[var(--border-strong)] hover:text-[var(--foreground)] cursor-pointer"
            >
              <Search className="h-3.5 w-3.5 shrink-0 group-hover:text-[var(--primary)] transition-colors" />
              <span className="text-[13px]">Search…</span>
              <span className="ml-0.5 inline-flex items-center gap-0.5 rounded-[4px] border border-[var(--border-strong)] bg-[var(--secondary)] px-1.5 py-0.5 text-[10px] font-mono text-[var(--subtle-foreground)] leading-none">
                <span className="text-[9px]">⌘</span>K
              </span>
            </button>

            {/* Saved Prompts Link */}
            <Link
              href="/prompts?saved=true"
              aria-label={`Saved prompts (${savedIds.length})`}
              title="View saved prompts"
              className="relative flex h-8 items-center gap-1.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] px-2.5 text-[12px] font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)] transition-all cursor-pointer"
            >
              <Bookmark className={`h-3.5 w-3.5 ${savedIds.length > 0 ? "text-[var(--primary)] fill-[var(--primary)]" : ""}`} />
              <span className="hidden lg:inline">Saved</span>
              {savedIds.length > 0 && (
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--primary)] px-1 text-[10px] font-bold text-[var(--primary-foreground)] leading-none">
                  {savedIds.length}
                </span>
              )}
            </Link>

            <ThemeToggle />

            {/* CTA */}
            <Link
              href="/prompts"
              className="inline-flex h-8 items-center justify-center gap-1.5 rounded-[var(--radius-md)] bg-[var(--primary)] px-3.5 text-[13px] font-medium text-[var(--primary-foreground)] shadow-sm transition-all duration-150 hover:bg-[var(--primary-hover)] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-[var(--primary)]"
            >
              <span>Explore Prompts</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* ── Mobile Right Bar ── */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Open search"
              className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)] transition-all cursor-pointer"
            >
              <Search className="h-4 w-4" />
            </button>

            <ThemeToggle className="h-9 w-9" />

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)] transition-all cursor-pointer"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </Container>

      {/* ── Mobile Navigation Drawer ── */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          className="md:hidden border-t border-[var(--border)] bg-[var(--background)]/96 backdrop-blur-xl shadow-2xl"
        >
          <Container>
            <div className="py-4 space-y-3">
              {/* Nav Links */}
              <nav className="flex flex-col gap-0.5">
                {navLinks.map((link) => {
                  const isActive =
                    pathname === link.href ||
                    (link.href !== "/" && pathname.startsWith(`${link.href}/`));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-[var(--radius-md)] px-3.5 py-2.5 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-[var(--secondary)] text-[var(--foreground)]"
                          : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]/50"
                      )}
                    >
                      <span className={isActive ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]"}>
                        {link.icon}
                      </span>
                      <span>{link.label}</span>
                    </Link>
                  );
                })}
                <Link
                  href="/prompts?saved=true"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between rounded-[var(--radius-md)] px-3.5 py-2.5 text-sm font-medium text-[var(--muted-foreground)] hover:bg-[var(--secondary)]/50 hover:text-[var(--foreground)] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <Bookmark className={`h-4 w-4 ${savedIds.length > 0 ? "text-[var(--primary)] fill-[var(--primary)]" : ""}`} />
                    <span>Saved Prompts</span>
                  </span>
                  {savedIds.length > 0 && (
                    <span className="rounded-full bg-[var(--primary)] px-2 py-0.5 text-[10px] font-bold text-[var(--primary-foreground)]">
                      {savedIds.length}
                    </span>
                  )}
                </Link>
              </nav>

              {/* Mobile CTA */}
              <div className="pt-1 border-t border-[var(--border-subtle)]">
                <Link
                  href="/prompts"
                  onClick={closeMobileMenu}
                  className="flex h-10 w-full items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--primary)] px-4 text-sm font-semibold text-[var(--primary-foreground)] shadow-sm transition-colors hover:bg-[var(--primary-hover)] mt-3"
                >
                  <span>Explore Prompts</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
