import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { getAllGuides, getFeaturedGuides } from "@/lib/data/guides";
import { GuidesExplorer } from "@/components/guides/guides-explorer";
import {
  Sparkles,
  Layers,
  CheckCircle2,
  Workflow,
  Cpu,
} from "lucide-react";
import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "AI Prompt Engineering & Practitioner Guides",
  description:
    "Comprehensive, practical guides for AI prompt engineering, software development, resume writing, interview preparation, marketing, productivity, and research.",
  path: "/guides",
  keywords: [
    "prompt engineering guides",
    "how to write AI prompts",
    "ChatGPT prompting tutorial",
    "software developer AI prompts",
    "resume writing AI",
    "job interview preparation AI",
    "productivity AI prompts",
    "research with AI",
  ],
});

export default function GuidesPage() {
  const allGuides = getAllGuides();
  const featuredGuides = getFeaturedGuides();

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 sm:py-16">
      <Container>
        {/* Header Hero Section */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2">
            <Badge variant="primary" size="sm">
              <Sparkles className="h-3 w-3 mr-1" />
              Educational Knowledge Base
            </Badge>
            <span className="text-xs text-[var(--muted-foreground)]">
              {allGuides.length} In-Depth Engineering Guides
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--foreground)]">
            AI Prompting &amp; Practitioner Guides
          </h1>

          <p className="text-base sm:text-lg text-[var(--subtle-foreground)] leading-relaxed">
            Practical playbooks, system prompt architectures, and tactical guides to help you
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
              Linked to Verified Prompts
            </span>
            <span className="flex items-center gap-1.5">
              <Workflow className="h-3.5 w-3.5 text-[var(--primary)]" />
              Step-by-Step Workflows
            </span>
            <span className="flex items-center gap-1.5">
              <Cpu className="h-3.5 w-3.5 text-[var(--primary)]" />
              Zero Fluff or Generic Filler
            </span>
          </div>
        </div>

        {/* Guides Explorer with Featured Section, Search, and Topic Filters */}
        <GuidesExplorer
          guides={allGuides}
          featuredGuides={featuredGuides}
        />

        {/* Educational Standards Methodology Section */}
        <section className="mt-20 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-8 sm:p-10 shadow-xs">
          <div className="max-w-2xl space-y-3 mb-8">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
              The Beautiful AI Prompt Educational Standard
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
              We reject generic SEO blog content, ungrounded advice, and hallucinated case studies.
              Every guide on our platform adheres to strict editorial principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[var(--subtle-foreground)]">
            <div className="space-y-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary-muted)] text-[var(--primary)] font-mono font-bold">
                01
              </span>
              <h3 className="font-semibold text-[var(--foreground)] text-sm">
                Empirical Rigor
              </h3>
              <p className="leading-relaxed">
                Tested against GPT-4o, Claude 3.7 Sonnet, and Gemini 1.5 Pro to ensure consistent behavior across reasoning models.
              </p>
            </div>

            <div className="space-y-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary-muted)] text-[var(--primary)] font-mono font-bold">
                02
              </span>
              <h3 className="font-semibold text-[var(--foreground)] text-sm">
                Production-Linked
              </h3>
              <p className="leading-relaxed">
                Every guide connects directly to ready-to-use production prompt templates and curated workflow collections in our library.
              </p>
            </div>

            <div className="space-y-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary-muted)] text-[var(--primary)] font-mono font-bold">
                03
              </span>
              <h3 className="font-semibold text-[var(--foreground)] text-sm">
                No Fake Credentials
              </h3>
              <p className="leading-relaxed">
                Authored and reviewed by our internal editorial team without fabricated author personas, artificial ratings, or spammy keyword stuffing.
              </p>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
