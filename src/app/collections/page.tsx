import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { getAllCollections, getFeaturedCollections } from "@/lib/data/collections";
import { CollectionsExplorer } from "@/components/collections/collections-explorer";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import {
  Sparkles,
  Cpu,
  Workflow,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { constructMetadata, generateFaqJsonLd } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "AI Prompt Collections — Multi-Step Workflows for ChatGPT & Claude",
  description:
    "Explore 22 curated AI prompt collections and multi-step playbooks for developers, job seekers, and marketers. Verified templates with interactive variables.",
  path: "/collections",
  keywords: [
    "AI prompt collections",
    "ChatGPT prompt packs",
    "Claude workflow playbooks",
    "developer prompt workflow",
    "job seeker prompts",
    "marketing strategy AI",
    "productivity workflows",
    "software engineering prompts",
  ],
});

const COLLECTIONS_PAGE_FAQS = [
  {
    question: "How are prompt collections different from individual prompt templates?",
    answer:
      "Individual prompts solve a single task (such as writing a resume summary or refactoring a component). Collections bundle 3 to 10 sequenced prompts into an end-to-end multi-step workflow where each prompt builds directly upon the output of the preceding prompt.",
  },
  {
    question: "Can I use prompt collections across different AI models in the same workflow?",
    answer:
      "Yes. Many practitioners use reasoning models like Claude 3.7 Sonnet or ChatGPT-4o for the strategic planning phases (Steps 1–2), and transition to specialized or multimodal models for asset generation and coding execution.",
  },
  {
    question: "Do I need to sign up or create an account to use these collections?",
    answer:
      "No. All prompt collections on Beautiful AI Prompt are completely open access, 100% free, and require zero registration. You can explore, customize variables, and copy prompts immediately.",
  },
];

export default function CollectionsPage() {
  const collections = getAllCollections();
  const featuredCollections = getFeaturedCollections();
  const faqJsonLd = generateFaqJsonLd(COLLECTIONS_PAGE_FAQS);

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 sm:py-16">
      {/* FAQPage Schema for Collections Hub */}
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
          { label: "Collections" },
        ]}
      />

      <Container className="pt-6">
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

        {/* Collections FAQ Section */}
        <section className="mt-16 pt-12 border-t border-[var(--border)]">
          <div className="max-w-2xl mb-8">
            <div className="flex items-center gap-2 mb-1.5">
              <HelpCircle className="h-4 w-4 text-[var(--primary)]" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                Frequently Asked Questions About Prompt Collections
              </h2>
            </div>
            <p className="text-xs text-[var(--muted-foreground)]">
              Workflow architecture, multi-model compatibility, and commercial usage rights.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COLLECTIONS_PAGE_FAQS.map((faq, idx) => (
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
