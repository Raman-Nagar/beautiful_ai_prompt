import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { getAllCollections, getFeaturedCollections } from "@/lib/data/collections";
import { CollectionsExplorer } from "@/components/collections/collections-explorer";
import {
  Sparkles,
  Cpu,
  Workflow,
  CheckCircle2,
} from "lucide-react";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Curated AI Prompt Collections",
  description:
    "Explore 22 editorial AI prompt collections for software developers, job seekers, content creators, business founders, and productivity experts.",
  path: "/collections",
  keywords: [
    "AI prompt collections",
    "prompt packs",
    "developer prompt workflow",
    "job seeker prompts",
    "marketing strategy AI",
    "productivity workflows",
    "software engineering prompts",
  ],
});

export default function CollectionsPage() {
  const collections = getAllCollections();
  const featuredCollections = getFeaturedCollections();

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
              {collections.length} Curated Collections
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--foreground)]">
            Curated AI Prompt Collections
          </h1>

          <p className="text-base sm:text-lg text-[var(--subtle-foreground)] leading-relaxed">
            Multi-step prompt stacks designed to solve complex real-world goals from start to
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
              100% Practical &amp; Verified
            </span>
          </div>
        </div>

        {/* Search, Filter, and Collection Grid System */}
        <CollectionsExplorer
          collections={collections}
          featuredCollections={featuredCollections}
        />

        {/* Why Collections Explainer Section */}
        <section className="mt-20 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-8 sm:p-10 shadow-xs">
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
