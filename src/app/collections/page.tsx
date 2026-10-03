import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getAllCollections } from "@/lib/data/collections";
import {
  ArrowRight,
  Sparkles,
  Layers,
  Cpu,
  Workflow,
  CheckCircle2,
} from "lucide-react";
import { TrackedCollectionLink } from "@/components/analytics/tracked-link";

import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Curated Prompt Collections",
  description:
    "Explore battle-tested AI prompt collections for developers, job seekers, content creators, business leaders, students, and productivity experts.",
  path: "/collections",
  keywords: [
    "AI prompt collections",
    "prompt packs",
    "developer prompts",
    "job seeker prompts",
    "business prompts",
    "productivity workflows",
  ],
});

export default function CollectionsPage() {
  const collections = getAllCollections();

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 sm:py-16">
      <Container>
        {/* Header Hero Section */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2">
            <Badge variant="primary" size="sm">
              <Sparkles className="h-3 w-3 mr-1" />
              Editorial Prompt Packs
            </Badge>
            <span className="text-xs text-[var(--muted-foreground)]">
              {collections.length} Specialized Collections
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--foreground)]">
            Curated AI Prompt Collections
          </h1>

          <p className="text-base text-[var(--subtle-foreground)] leading-relaxed">
            Multi-step prompt stacks designed to solve complex professional workflows from start to
            finish. Handpicked, sequence-tested, and verified for ChatGPT, Claude, and Gemini.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[var(--muted-foreground)]">
            <span className="flex items-center gap-1.5">
              <Workflow className="h-3.5 w-3.5 text-[var(--primary)]" />
              Multi-Step Workflows
            </span>
            <span className="flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5 text-[var(--primary)]" />
              Model-Agnostic
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-[var(--status-success)]" />
              100% Practical & Verified
            </span>
          </div>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((col) => (
            <TrackedCollectionLink
              key={col.id}
              collectionSlug={col.slug}
              collectionTitle={col.title}
              sourcePage="/collections"
              href={`/collections/${col.slug}`}
              className="group block focus:outline-none"
            >
              <Card
                className="h-full flex flex-col justify-between p-6 card-lift cursor-pointer hover:bg-[var(--card-hover)] relative overflow-hidden"
              >
                <div>
                  {/* Category & Prompt Count Header */}
                  <div className="flex items-center justify-between pb-3 mb-2 border-b border-[var(--border-subtle)]">
                    <div className="flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-[var(--primary)]" />
                      <span className="text-xs font-semibold text-[var(--foreground)] capitalize">
                        {col.categoryName || col.category}
                      </span>
                    </div>

                    <Badge variant="outline" size="sm" className="font-mono text-[11px]">
                      {col.promptIds.length} Prompts
                    </Badge>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors mt-2">
                    {col.title}
                  </h2>

                  {/* Description */}
                  <p className="text-xs leading-relaxed text-[var(--muted-foreground)] mt-2 line-clamp-3">
                    {col.description}
                  </p>

                  {/* Target Audience Pill */}
                  {col.targetAudience && (
                    <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] text-[11px] text-[var(--subtle-foreground)]">
                      <span className="font-medium text-[var(--muted-foreground)]">Audience: </span>
                      <span className="truncate">{col.targetAudience}</span>
                    </div>
                  )}

                  {/* Tags */}
                  {col.tags && col.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {col.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-[var(--radius-sm)] bg-[var(--secondary)] px-2 py-0.5 text-[10px] text-[var(--muted-foreground)] border border-[var(--border-subtle)]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action Footer */}
                <div className="mt-6 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4 text-xs font-semibold text-[var(--primary)]">
                  <span>Explore Workflow</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Card>
            </TrackedCollectionLink>
          ))}
        </div>

        {/* Why Collections Explainer Section */}
        <section className="mt-16 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-8 sm:p-10">
          <div className="max-w-2xl space-y-3 mb-8">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
              Why Prompt Collections?
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
              Single-shot prompts often generate disjointed outputs. Collections provide a systematic,
              turn-by-turn workflow that compounds in value as you progress through each stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[var(--subtle-foreground)]">
            <div className="space-y-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary-muted)] text-[var(--primary)] font-mono font-bold">
                01
              </span>
              <h3 className="font-semibold text-[var(--foreground)] text-sm">
                Interoperable Stacks
              </h3>
              <p className="leading-relaxed">
                Every prompt in a collection is designed so the output from Step 1 can serve as rich,
                grounding context for Step 2.
              </p>
            </div>

            <div className="space-y-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary-muted)] text-[var(--primary)] font-mono font-bold">
                02
              </span>
              <h3 className="font-semibold text-[var(--foreground)] text-sm">
                Curated by Experts
              </h3>
              <p className="leading-relaxed">
                No filler or redundant entries. Prompts are vetted for token efficiency, instruction
                adherence, and verifiable outcomes.
              </p>
            </div>

            <div className="space-y-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary-muted)] text-[var(--primary)] font-mono font-bold">
                03
              </span>
              <h3 className="font-semibold text-[var(--foreground)] text-sm">
                Model Independence
              </h3>
              <p className="leading-relaxed">
                Works reliably across modern LLM interfaces including Claude 3.7, ChatGPT-4o, Google
                Gemini, and Perplexity.
              </p>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
