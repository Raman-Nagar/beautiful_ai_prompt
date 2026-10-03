import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getAllGuides, getFeaturedGuides } from "@/lib/data/guides";
import {
  BookOpen,
  ArrowRight,
  Sparkles,
  Clock,
  Calendar,
  Layers,
  CheckCircle2,
} from "lucide-react";
import { TrackedGuideLink } from "@/components/analytics/tracked-link";

import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Prompt Engineering & AI Guides",
  description:
    "Empirical prompt engineering frameworks, technical playbooks, and tactical guides to help you get 10x higher-signal results from ChatGPT, Claude, and Gemini.",
  path: "/guides",
  keywords: [
    "prompt engineering guides",
    "how to write prompts",
    "ChatGPT prompting tips",
    "developer AI prompts",
    "resume AI prompts",
    "interview AI prompts",
    "YouTube AI prompts",
  ],
});

export default function GuidesPage() {
  const allGuides = getAllGuides();
  const featuredGuides = getFeaturedGuides();
  const primaryFeatured = featuredGuides[0] || allGuides[0];
  const remainingGuides = allGuides.filter((g) => g.id !== primaryFeatured?.id);

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 sm:py-16">
      <Container>
        {/* Header Hero Section */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2">
            <Badge variant="primary" size="sm">
              <Sparkles className="h-3 w-3 mr-1" />
              Prompt Engineering Playbook
            </Badge>
            <span className="text-xs text-[var(--muted-foreground)]">
              {allGuides.length} In-Depth Engineering Guides
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--foreground)]">
            Prompt Engineering & AI Guides
          </h1>

          <p className="text-base text-[var(--subtle-foreground)] leading-relaxed">
            Practical frameworks, system prompt architectures, and empirical guides to help you
            extract high-fidelity reasoning, clean code, and structured outputs from modern generative
            AI models.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[var(--muted-foreground)]">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[var(--status-success)]" />
              Empirically Tested
            </span>
            <span className="flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-[var(--primary)]" />
              Linked to Production Prompts
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-[var(--primary)]" />
              Zero Fluff or Generic Advice
            </span>
          </div>
        </div>

        {/* Primary Featured Guide Hero Card */}
        {primaryFeatured && (
          <div className="mb-12">
            <TrackedGuideLink
              guideSlug={primaryFeatured.slug}
              guideTitle={primaryFeatured.title}
              sourcePage="/guides"
              href={`/guides/${primaryFeatured.slug}`}
              className="group block focus:outline-none"
            >
              <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-gradient-to-br from-[var(--card)] via-[var(--card)] to-[var(--secondary)]/40 p-6 sm:p-10 shadow-md card-lift relative overflow-hidden">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <Badge variant="warning" size="sm" className="gap-1">
                    <Sparkles className="h-3 w-3" />
                    Featured Guide
                  </Badge>
                  <Badge variant="primary" size="sm">
                    {primaryFeatured.category}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-[var(--muted-foreground)] font-mono ml-auto">
                    <Clock className="h-3 w-3" />
                    {primaryFeatured.readingTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors leading-tight mb-3">
                  {primaryFeatured.title}
                </h2>

                <p className="text-sm sm:text-base text-[var(--subtle-foreground)] leading-relaxed max-w-3xl mb-6">
                  {primaryFeatured.description}
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[var(--border-subtle)] text-xs">
                  <div className="flex items-center gap-2 text-[var(--muted-foreground)]">
                    <span className="font-medium text-[var(--foreground)]">
                      {primaryFeatured.author.name}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(primaryFeatured.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--primary)] group-hover:underline">
                    <span>Read Complete Guide</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </TrackedGuideLink>
          </div>
        )}

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {remainingGuides.map((guide) => (
            <TrackedGuideLink
              key={guide.id}
              guideSlug={guide.slug}
              guideTitle={guide.title}
              sourcePage="/guides"
              href={`/guides/${guide.slug}`}
              className="group block focus:outline-none"
            >
              <Card
                className="h-full flex flex-col justify-between p-6 card-lift cursor-pointer hover:bg-[var(--card-hover)]"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 mb-2 border-b border-[var(--border-subtle)]">
                    <Badge variant="secondary" size="sm">
                      {guide.category}
                    </Badge>
                    <span className="flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] font-mono">
                      <Clock className="h-3 w-3" />
                      {guide.readingTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors mt-2 leading-snug">
                    {guide.title}
                  </h3>

                  <p className="text-xs leading-relaxed text-[var(--muted-foreground)] mt-2 line-clamp-3">
                    {guide.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4 text-xs font-semibold text-[var(--primary)]">
                  <span className="text-[11px] text-[var(--muted-foreground)] font-normal">
                    {new Date(guide.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span>Read Guide</span>
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Card>
            </TrackedGuideLink>
          ))}
        </div>
      </Container>
    </div>
  );
}
