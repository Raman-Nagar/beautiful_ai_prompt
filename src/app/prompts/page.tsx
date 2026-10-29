import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { PromptsExplorer } from "@/components/prompts/prompts-explorer";
import {
  getInitialPromptsSummary,
  getPromptCounts,
  getTopTags,
  getCuratedUseCases,
} from "@/lib/data/prompts";
import { getAllCategories } from "@/lib/data/categories";
import { getAllModels } from "@/lib/data/models";
import { constructMetadata, generateFaqJsonLd } from "@/lib/seo";
import {
  HelpCircle,
  Sparkles,
  SlidersHorizontal,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Workflow,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "260+ Best AI Prompts for ChatGPT, Claude & Midjourney",
  exactTitle: true,
  description:
    "Explore 260+ production-tested AI prompts for ChatGPT, Claude, Gemini, and Midjourney. Filter by model, difficulty, and task with live variable customizers.",
  path: "/prompts",
  keywords: [
    "AI prompts",
    "ChatGPT prompts",
    "Claude prompts",
    "Midjourney prompts",
    "prompt library",
    "best AI prompts 2026",
    "coding prompts",
    "resume prompts",
    "system prompt templates",
    "free AI prompts",
  ],
});

const PROMPTS_PAGE_FAQS = [
  {
    question: "What makes these AI prompts different from generic online prompt lists?",
    answer:
      "Every prompt in the Beautiful AI Prompt directory is engineered with structured constraints, explicit variables ([VARIABLE_NAME]), and verified output benchmarks. They are stress-tested against frontier models (Claude 3.7 Sonnet, ChatGPT-4o, Google Gemini 2.5, and Midjourney v6.1) to ensure repeatable, high-signal results without generic fluff or hallucinations.",
  },
  {
    question: "How do the interactive prompt variables work?",
    answer:
      "When viewing any prompt, you can use our in-browser workbench to fill in your specific domain variables (such as tech stack, role title, or business context). The prompt customizer dynamically substitutes these values in real time so you can copy a finalized, customized prompt with one click.",
  },
  {
    question: "Can I use these prompts and their outputs commercially?",
    answer:
      "Yes, 100%. All prompts published in our library are free for both personal and commercial projects. You own whatever code, written copy, business strategies, or images your chosen AI model produces when running these templates.",
  },
  {
    question: "Which AI model should I use for coding versus creative writing?",
    answer:
      "For software engineering, architectural design, and complex debugging, we recommend Claude 3.7 / 3.5 Sonnet or ChatGPT-4o. For marketing copy, brainstorming, and customer support, ChatGPT-4o excels. For photorealistic image generation and commercial design, we recommend Midjourney v6.1 or FLUX.1 Dev.",
  },
];

export default function PromptsPage() {
  const initialPrompts = getInitialPromptsSummary(2);
  const promptCounts = getPromptCounts();
  const allCategories = getAllCategories().map((c) => ({
    id: c.id,
    name: c.name,
    slug: c.slug,
    count: c.count,
  })) as any;
  const allModels = getAllModels().map((m) => ({
    id: m.id,
    name: m.name,
    engine: m.engine,
  })) as any;
  const popularTags = getTopTags(8);
  const allUseCases = getCuratedUseCases(10);

  const faqJsonLd = generateFaqJsonLd(PROMPTS_PAGE_FAQS);

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 sm:py-16">
      {/* FAQPage Schema for Prompts Hub */}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Semantic Breadcrumb Navigation with BreadcrumbList JSON-LD */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Prompts" },
        ]}
      />

      <Container className="pt-6">
        {/* Page Header */}
        <header className="max-w-3xl mb-10 space-y-3">
          <div className="inline-flex items-center gap-2">
            <Badge variant="primary" size="sm">
              Verified Prompt Library
            </Badge>
            <span className="text-xs text-[var(--muted-foreground)]">
              {promptCounts.total} Production Prompts Available
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--foreground)]">
            Explore AI Prompts
          </h1>

          <p className="text-sm sm:text-base leading-relaxed text-[var(--muted-foreground)]">
            Discover production-tested prompt templates engineered for Claude, ChatGPT, Gemini, and
            Midjourney. Filter by capability, customize variables interactively, and run battle-tested workflows.
          </p>
        </header>

        {/* Interactive Discovery & Filtering Suite */}
        <section aria-label="Interactive AI Prompts Explorer">
          <h2 className="sr-only">Browse Prompts by Category, Model, and Parameters</h2>
          <PromptsExplorer
            initialPrompts={initialPrompts}
            totalCounts={promptCounts}
            categories={allCategories}
            models={allModels}
            popularTags={popularTags}
            useCases={allUseCases}
          />
        </section>

        {/* Editorial Guidance & Prompt Engineering Methodology */}
        <section className="mt-20 pt-12 border-t border-[var(--border)]">
          <div className="max-w-3xl mb-10">
            <Badge variant="primary" size="sm" className="mb-2">
              Engineering Standards
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
              How to Get Maximum Fidelity from Production AI Prompts
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-2 leading-relaxed">
              Modern Large Language Models and diffusion models require precision conditioning.
              Follow these three architectural pillars to maximize prompt performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-6 space-y-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary-muted)] text-[var(--primary)]">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">
                1. Explicit Constraints & Output Schemas
              </h3>
              <p className="text-xs text-[var(--subtle-foreground)] leading-relaxed">
                Vague prompts invite generic filler. Our templates specify exact output structures,
                markdown tables, bullet conventions, and negative instructions (what the model must NOT do)
                to keep responses concise and factual.
              </p>
            </div>

            <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-6 space-y-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary-muted)] text-[var(--primary)]">
                <SlidersHorizontal className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">
                2. Dynamic Variable Injection
              </h3>
              <p className="text-xs text-[var(--subtle-foreground)] leading-relaxed">
                Instead of hardcoding details, every template isolates dynamic variables in bracketed placeholders
                like <code className="font-mono text-[11px] bg-[var(--secondary)] px-1 py-0.5 rounded">[ROLE]</code> or <code className="font-mono text-[11px] bg-[var(--secondary)] px-1 py-0.5 rounded">[TECH_STACK]</code>.
                This enables seamless reusability across projects.
              </p>
            </div>

            <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-6 space-y-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary-muted)] text-[var(--primary)]">
                <Cpu className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">
                3. Model-Specific Calibration
              </h3>
              <p className="text-xs text-[var(--subtle-foreground)] leading-relaxed">
                Different models exhibit unique training biases. Claude excels at structured XML reasoning
                and refactoring; ChatGPT-4o delivers high conversational versatility; Midjourney v6.1 requires
                photographic lens terminology. Check our model badges on each card.
              </p>
            </div>
          </div>
        </section>

        {/* Frequently Asked Questions Section */}
        <section className="mt-16 pt-12 border-t border-[var(--border)]">
          <div className="max-w-2xl mb-8">
            <div className="flex items-center gap-2 mb-1.5">
              <HelpCircle className="h-4 w-4 text-[var(--primary)]" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                Frequently Asked Questions About AI Prompts
              </h2>
            </div>
            <p className="text-xs text-[var(--muted-foreground)]">
              Common questions on prompt customization, model benchmarking, and commercial licensing.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROMPTS_PAGE_FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-6 space-y-2.5"
              >
                <h3 className="text-sm font-bold text-[var(--foreground)] flex items-start gap-2">
                  <span className="text-[var(--primary)] font-mono font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}.
                  </span>
                  <span>{faq.question}</span>
                </h3>
                <p className="text-xs text-[var(--subtle-foreground)] leading-relaxed pl-5">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </Container>
    </div>
  );
}
