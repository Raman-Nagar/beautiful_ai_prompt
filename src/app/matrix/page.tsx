import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { getAllMatrixPages } from "@/lib/data/matrix";
import { constructMetadata } from "@/lib/seo";
import {
  Sparkles,
  ArrowRight,
  Cpu,
  Layers,
  CheckCircle2,
  Sliders,
  Compass,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Model × Persona Prompt Matrix | Beautiful AI Prompt",
  description:
    "Explore 25 specialized Model × Persona prompt engineering landing pages. Calibrated prompts, system instructions, and parameter tuning for ChatGPT, Claude, Gemini, Midjourney, and FLUX.",
  path: "/matrix",
  keywords: [
    "ai prompt matrix",
    "chatgpt prompts for coding",
    "claude prompts for software architecture",
    "gemini prompts for academic research",
    "midjourney architectural rendering prompts",
    "flux portrait prompts",
    "model persona prompt engineering",
  ],
});

export default function MatrixIndexPage() {
  const pages = getAllMatrixPages();

  // Model groupings
  const models = [
    { id: "all", name: "All Models" },
    { id: "chatgpt", name: "ChatGPT (GPT-4o)" },
    { id: "claude", name: "Claude (3.7 Sonnet)" },
    { id: "gemini", name: "Google Gemini (2.5)" },
    { id: "midjourney", name: "Midjourney (v6.1)" },
    { id: "flux", name: "FLUX.1" },
    { id: "perplexity", name: "Perplexity AI" },
    { id: "copilot", name: "Microsoft Copilot" },
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 sm:py-16">
      {/* Semantic Breadcrumbs with JSON-LD */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Model × Persona Matrix" },
        ]}
      />

      <Container className="pt-6">
        {/* Hero Header Section */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2">
            <Badge variant="primary" size="sm">
              <Sparkles className="h-3 w-3 mr-1" />
              Specialized Cross-Cut Engineering
            </Badge>
            <span className="text-xs text-[var(--muted-foreground)]">
              {pages.length} Calibrated Landing Pages
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--foreground)]">
            The Model × Persona{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
              Prompt Matrix
            </span>
          </h1>

          <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
            One size does not fit all. Different frontier models possess vastly different cognitive architectures, parameter sensitivities, and context windows. Browse purpose-built prompt playbooks calibrated specifically for your model and professional workflow.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--border)]">
            <div className="flex items-center gap-2 text-sm text-[var(--foreground)]">
              <Cpu className="h-4 w-4 text-blue-500 shrink-0" />
              <span>Model-Specific Calibrations</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--foreground)]">
              <Sliders className="h-4 w-4 text-indigo-500 shrink-0" />
              <span>Temperature & Top-P Tuned</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--foreground)]">
              <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
              <span>Copy-Ready Production Prompts</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-4">
            <span className="text-xs font-semibold text-[var(--muted-foreground)]">Browse by Frontier Model:</span>
            {models.filter(m => m.id !== "all").map(m => (
              <Link
                key={m.id}
                href={`/models/${m.id}`}
                className="text-xs bg-[var(--card)] hover:bg-[var(--muted)] border border-[var(--border)] px-2.5 py-1 rounded-md text-[var(--foreground)] transition-colors"
              >
                {m.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Directory Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
            <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              All Model × Persona Combinations
            </h2>
            <span className="text-xs font-medium text-[var(--muted-foreground)]">
              Showing {pages.length} Pages
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page) => (
              <Link
                key={page.id}
                href={`/matrix/${page.slug}`}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
              >
                <Card className="h-full flex flex-col justify-between p-6 transition-all duration-200 border border-[var(--border)] bg-[var(--card)] hover:border-primary/50 hover:shadow-lg">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-primary/10 text-primary">
                        {page.modelId}
                      </span>
                      <span className="text-xs text-[var(--muted-foreground)] capitalize">
                        {page.categorySlug}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-primary transition-colors line-clamp-2">
                      {page.title}
                    </h3>

                    <p className="text-sm text-[var(--muted-foreground)] line-clamp-3 leading-relaxed">
                      {page.summary}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {page.targetKeywords.slice(0, 2).map((kw) => (
                        <span
                          key={kw}
                          className="text-[11px] bg-[var(--muted)] text-[var(--muted-foreground)] px-2 py-0.5 rounded"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[var(--border)] flex items-center justify-between text-xs font-semibold text-primary">
                    <span>{page.curatedPrompts.length} Production Prompts</span>
                    <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Explore Matrix <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Semantic Educational Hub Callout */}
        <div className="mt-16 rounded-2xl border border-[var(--border)] bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50 dark:from-blue-950/20 dark:via-indigo-950/10 dark:to-purple-950/20 p-8 sm:p-10 space-y-4">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <Compass className="h-4 w-4" />
            <span>Topical Authority & Systematic Reasoning</span>
          </div>
          <h2 className="text-2xl font-bold text-[var(--foreground)]">
            Why Model × Persona Alignment Unlocks 10x Output Quality
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed max-w-4xl">
            Frontier AI models are trained on distinct architectures and reinforcement learning protocols. While Claude 3.7 Sonnet excels at architectural trade-offs, XML tagging, and 200k-token codebase adherence, GPT-4o delivers rapid multimodal prototyping and Code Interpreter sandbox execution, Gemini 2.5 Pro digests 2M-token research libraries, and Midjourney/FLUX simulate physical optics and macro lens photography. Our Model × Persona matrix gives you the exact settings, do’s and don’ts, and copy-ready prompts calibrated for each model’s strengths.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              href="/models"
              className="inline-flex items-center text-xs font-medium text-primary hover:underline gap-1"
            >
              Explore AI Models Directory <ArrowRight className="h-3 w-3" />
            </Link>
            <Link
              href="/categories"
              className="inline-flex items-center text-xs font-medium text-primary hover:underline gap-1"
            >
              Browse Categories <ArrowRight className="h-3 w-3" />
            </Link>
            <Link
              href="/rules"
              className="inline-flex items-center text-xs font-medium text-primary hover:underline gap-1"
            >
              Developer Agent Rules <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
