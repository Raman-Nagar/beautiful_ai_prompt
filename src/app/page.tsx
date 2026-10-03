import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PromptCard } from "@/components/prompts/prompt-card";
import { HeroSearch } from "@/components/home/hero-search";
import { CategoryIcon } from "@/components/categories/category-icon";
import { getAllPrompts, getFeaturedPrompts } from "@/lib/data/prompts";
import { getAllCategories } from "@/lib/data/categories";
import { getFeaturedCollections } from "@/lib/data/collections";
import { getLatestGuides } from "@/lib/data/guides";
import {
  TrackedCategoryLink,
  TrackedCollectionLink,
  TrackedGuideLink,
} from "@/components/analytics/tracked-link";
import {
  ArrowRight,
  Layers,
  Sparkles,
  SlidersHorizontal,
  Cpu,
  FolderKanban,
  Unlock,
  CheckCircle2,
  Clock,
  BookOpen,
  ShieldCheck,
  Zap,
} from "lucide-react";
import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Beautiful AI Prompt — Practical AI Prompts for Real-World Work",
  description:
    "Discover practical AI prompts designed for work, creativity, learning, coding, and everyday productivity. Tested on Claude, ChatGPT, and Gemini.",
  path: "/",
});

export default function Home() {
  const allPrompts = getAllPrompts();
  const featuredPrompts = getFeaturedPrompts().slice(0, 6);
  const allCategories = getAllCategories();
  // Select top 8 popular categories to highlight
  const popularCategories = allCategories
    .filter((c) =>
      [
        "coding",
        "career",
        "resume",
        "job-interview",
        "react",
        "nextjs",
        "marketing",
        "productivity",
      ].includes(c.slug)
    )
    .slice(0, 8);
  const featuredCollections = getFeaturedCollections().slice(0, 4);
  const latestGuides = getLatestGuides(3);

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)]">
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
            <section className="relative overflow-hidden border-b border-[var(--border)] pt-20 sm:pt-28 pb-24 bg-grid-mesh">
        {/* Dual ambient glow layers */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[520px] w-[900px] rounded-full bg-indigo-500/[0.07] blur-[140px]" />
        <div className="pointer-events-none absolute top-1/3 left-1/2 -translate-x-1/2 h-48 w-[500px] rounded-full bg-violet-500/[0.055] blur-[100px]" />

        <Container size="default">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-7">
            {/* Status pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-strong)] bg-[var(--card)]/80 px-4 py-1.5 shadow-sm backdrop-blur-md">
              <span className="flex h-1.5 w-1.5 rounded-full bg-[var(--status-success)] shadow-[0_0_6px_var(--status-success)] animate-pulse" />
              <span className="text-[11px] font-medium tracking-wide text-[var(--muted-foreground)]">
                Practical AI Prompts &nbsp;&middot;&nbsp; 100% Free &amp; Open
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-[2.1rem] sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight text-[var(--foreground)] leading-[1.1]">
              Find the right prompt{" "}
              <br className="hidden sm:inline" />
              <span className="gradient-text">
                for whatever you&apos;re building.
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="max-w-xl text-base sm:text-[1.05rem] leading-relaxed text-[var(--muted-foreground)]">
              Curated, tested prompts for engineering, marketing, career growth, and everyday
              productivity — designed to work on ChatGPT, Claude, and Gemini.
            </p>

            {/* Search widget */}
            <div className="w-full pt-3">
              <HeroSearch />
            </div>

            {/* Trust signals */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-[11px] text-[var(--muted-foreground)]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[var(--status-success)]" />
                <span>Grounded Output Framing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <SlidersHorizontal className="h-3.5 w-3.5 text-[var(--primary)]" />
                <span>Live Variable Customizer</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-[var(--status-info)]" />
                <span>ChatGPT &middot; Claude &middot; Gemini</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          1. POPULAR CATEGORIES SECTION
          ========================================================================= */}
      <section className="py-20 border-b border-[var(--border)] bg-[var(--card)]/20">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="primary" size="sm">
                  Taxonomy
                </Badge>
                <span className="text-xs text-[var(--muted-foreground)]">
                  Organized by Domain
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
                Popular Categories
              </h2>
              <p className="text-sm text-[var(--muted-foreground)] mt-1.5 max-w-xl">
                Browse tested prompts categorized by specialized job functions and daily
                workflows.
              </p>
            </div>

            <Link
              href="/categories"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] hover:underline shrink-0"
            >
              <span>View all {allCategories.length} categories</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {popularCategories.map((category) => (
              <TrackedCategoryLink
                key={category.id}
                categorySlug={category.slug}
                categoryName={category.name}
                sourcePage="/"
                href={`/prompts?category=${category.slug}`}
                className="group flex flex-col justify-between rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5.5 card-lift hover:bg-[var(--card-hover)] cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--secondary)] text-[var(--foreground)] group-hover:border-[var(--primary)]/40 group-hover:text-[var(--primary)] transition-colors">
                      <CategoryIcon name={category.icon} className="h-5 w-5" />
                    </div>
                    <Badge variant="secondary" size="sm">
                      {category.count} {category.count === 1 ? "prompt" : "prompts"}
                    </Badge>
                  </div>

                  <h3 className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                    {category.name}
                  </h3>

                  <p className="text-xs text-[var(--muted-foreground)] mt-1.5 line-clamp-2 leading-relaxed">
                    {category.description}
                  </p>
                </div>

                <div className="mt-4 pt-3.5 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--subtle-foreground)] group-hover:text-[var(--foreground)] transition-colors">
                  <span>Explore prompts</span>
                  <ArrowRight className="h-3 w-3 -translate-x-1 group-hover:translate-x-0 transition-transform" />
                </div>
              </TrackedCategoryLink>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          2. FEATURED PROMPTS SECTION
          ========================================================================= */}
      <section className="py-20 border-b border-[var(--border)]">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="warning" size="sm" className="gap-1">
                  <Sparkles className="h-3 w-3" />
                  Hand-Picked
                </Badge>
                <span className="text-xs text-[var(--muted-foreground)]">
                  Quality Verified
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
                Featured Prompts
              </h2>
              <p className="text-sm text-[var(--muted-foreground)] mt-1.5 max-w-xl">
                Ready-to-use prompts with verified inputs, structured reasoning steps, and model
                recommendations.
              </p>
            </div>

            <Link
              href="/prompts"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] hover:underline shrink-0"
            >
              <span>Explore all {allPrompts.length} prompts</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPrompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/prompts"
              className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--border-strong)] bg-[var(--secondary)] px-5 h-10 text-sm font-semibold text-[var(--foreground)] shadow-xs transition-all hover:bg-[var(--secondary-hover)] hover:border-[var(--border-strong)] active:scale-[0.98]"
            >
              <span>View Full Prompt Directory</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          3. POPULAR COLLECTIONS SECTION
          ========================================================================= */}
      <section className="py-20 border-b border-[var(--border)] bg-[var(--card)]/20">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="primary" size="sm">
                  Workflow Suites
                </Badge>
                <span className="text-xs text-[var(--muted-foreground)]">
                  Curated Packs
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
                Popular Collections
              </h2>
              <p className="text-sm text-[var(--muted-foreground)] mt-1.5 max-w-xl">
                Multi-stage prompt stacks bundled together to guide you through complete
                end-to-end projects.
              </p>
            </div>

            <Link
              href="/collections"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] hover:underline shrink-0"
            >
              <span>View all collections</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredCollections.map((col) => (
              <TrackedCollectionLink
                key={col.id}
                collectionSlug={col.slug}
                collectionTitle={col.title}
                sourcePage="/"
                href={`/collections/${col.slug}`}
                className="block group"
              >
                <Card
                  interactive
                  className="flex flex-col justify-between p-6 sm:p-7 h-full card-lift cursor-pointer hover:bg-[var(--card-hover)]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[var(--primary)]">
                        <Layers className="h-3.5 w-3.5" />
                        {col.targetAudience}
                      </span>
                      <Badge variant="outline" size="sm">
                        {col.promptIds.length} Prompts
                      </Badge>
                    </div>

                    <h3 className="text-lg font-bold text-[var(--foreground)] tracking-tight group-hover:text-[var(--primary)] transition-colors">
                      {col.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-2 leading-relaxed">
                      {col.description}
                    </p>

                    {col.tags && col.tags.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 mt-4">
                        {col.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--secondary)]/60 px-2 py-0.5 text-[10px] text-[var(--subtle-foreground)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-semibold text-[var(--foreground)]">
                    <span>Explore Workflow Stack</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Card>
              </TrackedCollectionLink>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          4. WHY BEAUTIFUL AI PROMPT? SECTION
          ========================================================================= */}
      <section className="py-20 border-b border-[var(--border)]">
        <Container>
          <div className="max-w-2xl mx-auto text-center mb-16 space-y-3">
            <div className="inline-flex items-center gap-2">
              <Badge variant="primary" size="sm">
                Core Philosophy
              </Badge>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
              Why Beautiful AI Prompt?
            </h2>
            <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
              Most prompts online are vague, one-line templates that lead to hallucinated or generic
              AI outputs. We build verified, structured prompts designed for real-world execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* 1. Practical Prompts */}
            <div className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--secondary)] text-[var(--primary)]">
                <Zap className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-[var(--foreground)]">
                Practical Prompts
              </h3>
              <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                Engineered for high-stakes professional work—from architecting distributed systems
                to crafting enterprise sales sequences. No generic novelty prompts.
              </p>
            </div>

            {/* 2. Ready to Customize */}
            <div className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--secondary)] text-[var(--primary)]">
                <SlidersHorizontal className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-[var(--foreground)]">
                Ready to Customize
              </h3>
              <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                Interactive live variables let you inject your exact context, audience, and tech
                stack before copying. Never manually edit messy bracket tokens.
              </p>
            </div>

            {/* 3. Works Across Major AI Models */}
            <div className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--secondary)] text-[var(--primary)]">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-[var(--foreground)]">
                Works Across Major Models
              </h3>
              <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                Tested and calibrated across ChatGPT, Claude 3.5, Gemini, Perplexity, and Microsoft
                Copilot, with specific model strengths labeled for every task.
              </p>
            </div>

            {/* 4. Organized by Real-World Use Cases */}
            <div className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--secondary)] text-[var(--primary)]">
                <FolderKanban className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-[var(--foreground)]">
                Real-World Use Cases
              </h3>
              <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                Organized into 20 focused domains: career transition, ATS resumes, React
                architecture, SQL optimization, cold outreach, and deep work planning.
              </p>
            </div>

            {/* 5. Free to Explore */}
            <div className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--secondary)] text-[var(--primary)]">
                <Unlock className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-[var(--foreground)]">
                Free to Explore
              </h3>
              <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                100% open access. No account registration, no paywalls, and no hidden subscriptions.
                Browse, customize, and copy high-fidelity prompts instantly.
              </p>
            </div>

            {/* 6. Zero Hallucination Constraints */}
            <div className="flex flex-col rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-6 space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--secondary)] text-[var(--primary)]">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-[var(--foreground)]">
                Grounded Output Framing
              </h3>
              <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                Prompts include explicit negative constraints, step-by-step reasoning triggers, and
                output schemas to keep model responses deterministic and reliable.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          5. LATEST GUIDES SECTION
          ========================================================================= */}
      <section className="py-20 border-b border-[var(--border)] bg-[var(--card)]/20">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="primary" size="sm">
                  Methodology
                </Badge>
                <span className="text-xs text-[var(--muted-foreground)]">
                  Prompt Engineering Playbook
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
                Latest Guides
              </h2>
              <p className="text-sm text-[var(--muted-foreground)] mt-1.5 max-w-xl">
                Frameworks, benchmark breakdowns, and structural guides for writing more effective
                prompts.
              </p>
            </div>

            <Link
              href="/guides"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] hover:underline shrink-0"
            >
              <span>View all guides</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestGuides.map((guide) => (
              <TrackedGuideLink
                key={guide.slug}
                guideSlug={guide.slug}
                guideTitle={guide.title}
                sourcePage="/"
                href={`/guides/${guide.slug}`}
                className="group flex flex-col justify-between rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-6 card-lift hover:bg-[var(--card-hover)] cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <Badge variant="secondary" size="sm">
                      {guide.category}
                    </Badge>
                    <span className="flex items-center gap-1 text-[11px] text-[var(--muted-foreground)]">
                      <Clock className="h-3 w-3" />
                      {guide.readingTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors leading-snug">
                    {guide.title}
                  </h3>

                  <p className="text-xs text-[var(--muted-foreground)] mt-2.5 leading-relaxed line-clamp-3">
                    {guide.summary}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs text-[var(--subtle-foreground)] group-hover:text-[var(--foreground)] transition-colors">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
                    Read Guide
                  </span>
                  <ArrowRight className="h-3.5 w-3.5 -translate-x-1 group-hover:translate-x-0 transition-transform" />
                </div>
              </TrackedGuideLink>
            ))}
          </div>
        </Container>
      </section>

      {/* =========================================================================
          6. FINAL CTA SECTION
          ========================================================================= */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-[var(--background)] to-[var(--card)]/40">
        <Container>
          <div className="relative rounded-2xl border border-[var(--border-strong)] bg-[var(--card)] p-8 sm:p-14 text-center max-w-4xl mx-auto shadow-xl overflow-hidden">
            {/* Subtle glow */}
            <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-44 w-96 rounded-full bg-indigo-500/10 blur-[80px]" />

            <div className="relative z-10 flex flex-col items-center space-y-6">
              <Badge variant="primary" size="sm">
                Get Started in Seconds
              </Badge>

              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)] leading-tight max-w-xl">
                Find the right prompt for whatever you&apos;re trying to do.
              </h2>

              <p className="text-sm sm:text-base text-[var(--muted-foreground)] max-w-lg leading-relaxed">
                Explore our verified library of practical AI prompts, tune interactive parameters
                live, and copy ready-to-run instructions directly to your favorite AI model.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 w-full sm:w-auto">
                <Link href="/prompts" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2 px-7">
                    <span>Explore Prompts</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/categories" className="w-full sm:w-auto">
                  <Button variant="secondary" size="lg" className="w-full sm:w-auto px-7">
                    Browse Categories
                  </Button>
                </Link>
              </div>

              {/* Truthful Trust Checkmarks */}
              <div className="pt-6 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs text-[var(--muted-foreground)] border-t border-[var(--border-subtle)] w-full">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[var(--status-success)]" />
                  <span>100% Free & Open Access</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[var(--status-success)]" />
                  <span>Tested on Major AI Models</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[var(--status-success)]" />
                  <span>Zero Sign-up Required</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
