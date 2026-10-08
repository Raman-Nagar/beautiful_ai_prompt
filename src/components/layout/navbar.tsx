"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Sliders,
  Palette,
  Scale,
  ChevronDown,
  Video,
  ArrowLeftRight,
} from "lucide-react";
import { useSavedPromptIds } from "@/lib/storage";

interface ToolItem {
  label: string;
  href: string;
  description: string;
  icon: React.ReactNode;
  badge?: string;
}

export function Navbar() {
  const pathname = usePathname();
  const { openSearch } = useSearch();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const toolsMenuRef = useRef<HTMLDivElement>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const savedIds = useSavedPromptIds();

  // Detect scroll to apply elevated styling
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer and tools dropdown on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setToolsDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (toolsMenuRef.current && !toolsMenuRef.current.contains(event.target as Node)) {
        setToolsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset menus if route changes
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Prompts", href: "/prompts", icon: <Compass className="h-4 w-4" /> },
    { label: "Compare", href: "/compare", icon: <Scale className="h-4 w-4" /> },
    { label: "Models", href: "/models", icon: <Sliders className="h-4 w-4" /> },
    { label: "Styles", href: "/styles", icon: <Palette className="h-4 w-4" /> },
    { label: "Categories", href: "/categories", icon: <Layers className="h-4 w-4" /> },
    { label: "Collections", href: "/collections", icon: <BookmarkCheck className="h-4 w-4" /> },
    { label: "Guides", href: "/guides", icon: <BookOpen className="h-4 w-4" /> },
  ];

  const toolsList: ToolItem[] = [
    {
      label: "Prompt Generator",
      href: "/tools/prompt-generator",
      description: "Modular visual camera & lighting compiler",
      icon: <Sparkles className="h-3.5 w-3.5 text-amber-500" />,
    },
    {
      label: "Video Prompt Studio",
      href: "/tools/video-prompt-generator",
      description: "Camera motion vectors & director",
      icon: <Video className="h-3.5 w-3.5 text-cyan-500" />,
      badge: "New",
    },
    {
      label: "Prompt Transpiler",
      href: "/tools/prompt-transpiler",
      description: "Midjourney, FLUX & SDXL converter",
      icon: <ArrowLeftRight className="h-3.5 w-3.5 text-purple-500" />,
      badge: "New",
    },
    {
      label: "Composition Ruler",
      href: "/tools/composition-ruler",
      description: "Rule of thirds & Fibonacci grid overlay",
      icon: <Grid3X3 className="h-3.5 w-3.5 text-emerald-500" />,
    },
    {
      label: "Parameter Matrix",
      href: "/parameters",
      description: "CLI flags reference & calibration",
      icon: <Sliders className="h-3.5 w-3.5 text-indigo-500" />,
      badge: "New",
    },
  ];

  const isToolsActive =
    pathname.startsWith("/tools/") ||
    pathname === "/parameters" ||
    pathname.startsWith("/parameters/");

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setToolsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setToolsDropdownOpen(false);
    }, 150);
  };

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
        <div className="flex h-14 items-center justify-between gap-3 lg:gap-4">
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
              <span className="text-[13px] font-semibold tracking-tight text-[var(--foreground)] whitespace-nowrap">
                Beautiful AI Prompt
              </span>
              <span className="hidden sm:inline text-[9px] font-medium tracking-widest uppercase text-[var(--muted-foreground)] mt-0.5 opacity-70 whitespace-nowrap">
                Productivity Platform
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav Links ── */}
          <nav aria-label="Main Navigation" className="hidden lg:flex items-center gap-0.5">
            {/* Prompts Link */}
            <Link
              href="/prompts"
              aria-current={pathname.startsWith("/prompts") && !pathname.includes("saved=true") ? "page" : undefined}
              className={cn(
                "flex items-center gap-1.5 rounded-[var(--radius-md)] px-2.5 xl:px-3 py-1.5 text-[13px] font-medium transition-all duration-150 whitespace-nowrap",
                pathname.startsWith("/prompts") && !pathname.includes("saved=true")
                  ? "bg-[var(--secondary)] text-[var(--foreground)]"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]/50"
              )}
            >
              Prompts
            </Link>

            {/* Tools Dropdown Menu */}
            <div
              ref={toolsMenuRef}
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setToolsDropdownOpen((prev) => !prev)}
                aria-expanded={toolsDropdownOpen}
                aria-haspopup="true"
                className={cn(
                  "flex items-center gap-1 rounded-[var(--radius-md)] px-2.5 xl:px-3 py-1.5 text-[13px] font-medium transition-all duration-150 whitespace-nowrap cursor-pointer",
                  isToolsActive || toolsDropdownOpen
                    ? "bg-[var(--secondary)] text-[var(--foreground)]"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]/50"
                )}
              >
                <span>Tools</span>
                <ChevronDown
                  className={cn(
                    "h-3.5 w-3.5 transition-transform duration-200 text-[var(--muted-foreground)]",
                    toolsDropdownOpen && "rotate-180 text-[var(--foreground)]"
                  )}
                />
              </button>

              {/* Tools Flyout Popover */}
              {toolsDropdownOpen && (
                <div className="absolute left-0 top-full pt-1.5 z-50 w-72 origin-top-left animate-in fade-in-0 zoom-in-95 duration-150">
                  <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)]/98 p-1.5 shadow-2xl backdrop-blur-xl">
                    <div className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] opacity-70">
                      Creative Studios &amp; Tooling
                    </div>
                    <div className="flex flex-col gap-0.5 mt-0.5">
                      {toolsList.map((tool) => {
                        const isCurrent = pathname === tool.href;
                        return (
                          <Link
                            key={tool.href}
                            href={tool.href}
                            onClick={() => setToolsDropdownOpen(false)}
                            className={cn(
                              "group flex items-start gap-2.5 rounded-[var(--radius-md)] px-2.5 py-2 transition-colors",
                              isCurrent
                                ? "bg-[var(--secondary)] text-[var(--foreground)]"
                                : "text-[var(--foreground)] hover:bg-[var(--secondary)]/60"
                            )}
                          >
                            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border border-[var(--border)] bg-[var(--background)] shadow-2xs group-hover:border-[var(--border-strong)] transition-colors">
                              {tool.icon}
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1.5">
                                <span className="text-[12px] font-medium leading-tight truncate">
                                  {tool.label}
                                </span>
                                {tool.badge && (
                                  <span className="shrink-0 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-1.5 py-0.2 text-[9px] font-semibold leading-tight">
                                    {tool.badge}
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-[var(--muted-foreground)] leading-tight truncate mt-0.5">
                                {tool.description}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Remaining Primary Links */}
            {navLinks.slice(1).map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/" && pathname.startsWith(`${link.href}/`));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-1.5 rounded-[var(--radius-md)] px-2.5 xl:px-3 py-1.5 text-[13px] font-medium transition-all duration-150 whitespace-nowrap",
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
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            {/* Search Trigger */}
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search prompts (⌘K)"
              className="group flex h-8 items-center gap-2 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] px-2.5 xl:px-3 text-[13px] text-[var(--muted-foreground)] transition-all hover:border-[var(--border-strong)] hover:text-[var(--foreground)] cursor-pointer whitespace-nowrap"
            >
              <Search className="h-3.5 w-3.5 shrink-0 group-hover:text-[var(--primary)] transition-colors" />
              <span className="text-[12px] xl:text-[13px]">Search…</span>
              <span className="hidden xl:inline-flex items-center gap-0.5 rounded-[4px] border border-[var(--border-strong)] bg-[var(--secondary)] px-1.5 py-0.5 text-[10px] font-mono text-[var(--subtle-foreground)] leading-none ml-0.5">
                <span className="text-[9px]">⌘</span>K
              </span>
            </button>

            {/* Saved Prompts Link */}
            <Link
              href="/prompts?saved=true"
              aria-label={`Saved prompts (${savedIds.length})`}
              title="View saved prompts"
              className="relative flex h-8 items-center gap-1.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] px-2.5 text-[12px] font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--border-strong)] transition-all cursor-pointer whitespace-nowrap"
            >
              <Bookmark className={`h-3.5 w-3.5 ${savedIds.length > 0 ? "text-[var(--primary)] fill-[var(--primary)]" : ""}`} />
              <span className="hidden xl:inline">Saved</span>
              {savedIds.length > 0 && (
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--primary)] px-1 text-[10px] font-bold text-[var(--primary-foreground)] leading-none">
                  {savedIds.length}
                </span>
              )}
            </Link>

            <ThemeToggle />

            {/* Explore Prompts CTA (compact on large, full on xl+) */}
            <Link
              href="/prompts"
              className="hidden xl:inline-flex h-8 items-center justify-center gap-1.5 rounded-[var(--radius-md)] bg-[var(--primary)] px-3 text-[12px] font-semibold text-[var(--primary-foreground)] shadow-xs transition-all duration-150 hover:bg-[var(--primary-hover)] active:scale-[0.97] whitespace-nowrap"
            >
              <span>Explore Prompts</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {/* ── Mobile/Tablet Right Bar (< lg) ── */}
          <div className="flex lg:hidden items-center gap-1.5">
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
          className="lg:hidden border-t border-[var(--border)] bg-[var(--background)]/98 backdrop-blur-xl shadow-2xl max-h-[calc(100vh-3.5rem)] overflow-y-auto"
        >
          <Container>
            <div className="py-4 space-y-4">
              {/* Primary Nav Links */}
              <div>
                <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] opacity-70">
                  Navigation
                </p>
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
                          "flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium transition-colors",
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
                </nav>
              </div>

              {/* Creative Tools Section */}
              <div className="border-t border-[var(--border-subtle)] pt-3">
                <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)] opacity-70">
                  Creative Studios &amp; Tools
                </p>
                <div className="flex flex-col gap-0.5">
                  {toolsList.map((tool) => {
                    const isCurrent = pathname === tool.href;
                    return (
                      <Link
                        key={tool.href}
                        href={tool.href}
                        onClick={closeMobileMenu}
                        className={cn(
                          "flex items-center justify-between rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium transition-colors",
                          isCurrent
                            ? "bg-[var(--secondary)] text-[var(--foreground)]"
                            : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]/50"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-5 w-5 items-center justify-center">
                            {tool.icon}
                          </span>
                          <span>{tool.label}</span>
                        </div>
                        {tool.badge && (
                          <span className="rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-1.5 py-0.2 text-[9px] font-semibold leading-tight">
                            {tool.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Saved Prompts */}
              <div className="border-t border-[var(--border-subtle)] pt-3">
                <Link
                  href="/prompts?saved=true"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-between rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium text-[var(--muted-foreground)] hover:bg-[var(--secondary)]/50 hover:text-[var(--foreground)] transition-colors"
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
              </div>

              {/* Mobile CTA */}
              <div className="pt-2 border-t border-[var(--border-subtle)]">
                <Link
                  href="/prompts"
                  onClick={closeMobileMenu}
                  className="flex h-10 w-full items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--primary)] px-4 text-sm font-semibold text-[var(--primary-foreground)] shadow-xs transition-colors hover:bg-[var(--primary-hover)]"
                >
                  <span>Explore All Prompts</span>
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
