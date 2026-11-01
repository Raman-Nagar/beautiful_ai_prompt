import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { MatrixPromptCard } from "@/components/matrix/matrix-prompt-card";
import { getAllMatrixPages, getMatrixPageBySlug } from "@/lib/data/matrix";
import {
  constructMetadata,
  generateMatrixJsonLd,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
} from "@/lib/seo";
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  Sliders,
  HelpCircle,
  Compass,
  Cpu,
  Layers,
  Terminal,
  Bookmark,
} from "lucide-react";

interface MatrixPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const pages = getAllMatrixPages();
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: MatrixPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getMatrixPageBySlug(slug);

  if (!page) {
    return {
      title: "Matrix Page Not Found | Beautiful AI Prompt",
    };
  }

  return constructMetadata({
    title: page.seoTitle,
    description: page.seoDescription,
    path: `/matrix/${page.slug}`,
    keywords: page.targetKeywords,
  });
}

export default async function MatrixDetailPage({ params }: MatrixPageProps) {
  const { slug } = await params;
  const page = getMatrixPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const allPages = getAllMatrixPages();
  const relatedMatrixPages = allPages
    .filter((p) => p.slug !== page.slug && (p.modelId === page.modelId || p.categorySlug === page.categorySlug))
    .slice(0, 3);

  const matrixJsonLd = generateMatrixJsonLd(page);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Model × Persona Matrix", url: "/matrix" },
    { name: page.title, url: `/matrix/${page.slug}` },
  ]);
  const faqJsonLd = generateFaqJsonLd(page.faqs);

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 sm:py-16">
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(matrixJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Semantic Breadcrumbs */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Model × Persona Matrix", href: "/matrix" },
          { label: page.title },
        ]}
      />

      <Container className="pt-6 space-y-12">
        {/* Hero Section */}
        <div className="max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Link href={`/models/${page.modelId}`}>
              <Badge variant="primary" size="sm" className="hover:opacity-90">
                <Cpu className="h-3 w-3 mr-1" />
                Model: {page.modelId.toUpperCase()}
              </Badge>
            </Link>
            <Link href={`/categories/${page.categorySlug}`}>
              <Badge variant="outline" size="sm" className="hover:bg-[var(--muted)] capitalize">
                <Layers className="h-3 w-3 mr-1" />
                Category: {page.categorySlug}
              </Badge>
            </Link>
            <span className="text-xs text-[var(--muted-foreground)]">
              Updated {new Date(page.updatedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
            {page.title}
          </h1>

          <p className="text-xl font-medium text-primary">
            {page.heroTagline}
          </p>

          <p className="text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed">
            {page.summary}
          </p>

          <div className="pt-2 flex flex-wrap gap-2">
            {page.targetKeywords.map((kw) => (
              <span
                key={kw}
                className="text-xs bg-[var(--muted)] text-[var(--muted-foreground)] px-2.5 py-1 rounded-md"
              >
                #{kw}
              </span>
            ))}
          </div>
        </div>

        {/* Why this model for this persona */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-lg">
            <Sparkles className="h-5 w-5" />
            <h2>Why Use {page.modelId.toUpperCase()} for {page.categorySlug.toUpperCase()} Workflows</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {page.whyThisModelForThisPersona.map((point, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 shrink-0" />
                <p className="text-sm text-[var(--foreground)] leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Prompt Engineering Playbook: Dos and Don'ts */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-primary font-bold text-lg">
              <Compass className="h-5 w-5" />
              <h2>{page.promptEngineeringPlaybook.title}</h2>
            </div>
            <p className="text-sm text-[var(--muted-foreground)]">
              {page.promptEngineeringPlaybook.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* DO's */}
            <div className="rounded-xl border border-green-500/30 bg-green-500/5 p-5 space-y-3">
              <h3 className="text-sm font-bold text-green-600 dark:text-green-400 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Best Practices (DO)
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[var(--foreground)]">
                {page.promptEngineeringPlaybook.doList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-green-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* DON'T's */}
            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5 space-y-3">
              <h3 className="text-sm font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
                <XCircle className="h-4 w-4" />
                Common Pitfalls (DON&apos;T)
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-[var(--foreground)]">
                {page.promptEngineeringPlaybook.dontList.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-red-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Recommended Parameter Calibrations */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-lg">
            <Sliders className="h-5 w-5" />
            <h2>Recommended Parameter Settings & System Prompt</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-xl border border-[var(--border)] bg-[var(--muted)]/40 p-4 space-y-1">
              <span className="text-xs text-[var(--muted-foreground)] font-semibold uppercase">Temperature</span>
              <p className="text-sm font-mono font-bold text-[var(--foreground)]">{page.recommendedSettings.temperature}</p>
            </div>
            {page.recommendedSettings.topP && (
              <div className="rounded-xl border border-[var(--border)] bg-[var(--muted)]/40 p-4 space-y-1">
                <span className="text-xs text-[var(--muted-foreground)] font-semibold uppercase">Top-P</span>
                <p className="text-sm font-mono font-bold text-[var(--foreground)]">{page.recommendedSettings.topP}</p>
              </div>
            )}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--muted)]/40 p-4 space-y-1">
              <span className="text-xs text-[var(--muted-foreground)] font-semibold uppercase">Model Variant</span>
              <p className="text-sm font-mono font-bold text-[var(--foreground)]">{page.recommendedSettings.modelVariant}</p>
            </div>
            {page.recommendedSettings.cliFlags && (
              <div className="rounded-xl border border-[var(--border)] bg-[var(--muted)]/40 p-4 space-y-1">
                <span className="text-xs text-[var(--muted-foreground)] font-semibold uppercase">CLI / Flags</span>
                <p className="text-sm font-mono font-bold text-[var(--foreground)]">{page.recommendedSettings.cliFlags}</p>
              </div>
            )}
          </div>

          {page.recommendedSettings.systemPromptSnippet && (
            <div className="pt-2 space-y-2">
              <span className="text-xs font-semibold text-[var(--foreground)] flex items-center gap-1.5">
                <Terminal className="h-3.5 w-3.5 text-primary" />
                Recommended System Prompt Snippet:
              </span>
              <div className="rounded-xl bg-slate-950 p-4 font-mono text-xs text-slate-200">
                {page.recommendedSettings.systemPromptSnippet}
              </div>
            </div>
          )}
        </div>

        {/* Curated Production Prompts */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
            <div>
              <h2 className="text-2xl font-bold text-[var(--foreground)]">
                Production-Ready Prompts ({page.curatedPrompts.length})
              </h2>
              <p className="text-sm text-[var(--muted-foreground)]">
                Battle-tested prompt engineering templates with copy-to-clipboard functionality.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {page.curatedPrompts.map((item, idx) => (
              <MatrixPromptCard key={idx} prompt={item} index={idx} />
            ))}
          </div>
        </div>

        {/* FAQs */}
        {page.faqs && page.faqs.length > 0 && (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 text-primary font-bold text-xl">
              <HelpCircle className="h-5 w-5" />
              <h2>Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {page.faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-[var(--border)]/60 pb-4 last:border-b-0 space-y-1.5">
                  <h3 className="text-base font-bold text-[var(--foreground)]">{faq.question}</h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contextual Internal Links & Topic Graph */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--muted)]/20 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 text-primary font-bold text-lg">
            <Bookmark className="h-5 w-5" />
            <h2>Related Knowledge & Contextual Links</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            {/* Core Model & Category Links */}
            <div className="space-y-2">
              <h3 className="font-semibold text-[var(--foreground)]">Model & Category Hubs</h3>
              <ul className="space-y-1.5 text-[var(--muted-foreground)]">
                <li>
                  <Link href={`/models/${page.modelId}`} className="text-primary hover:underline">
                    → Explore all {page.modelId} prompt guides
                  </Link>
                </li>
                <li>
                  <Link href={`/categories/${page.categorySlug}`} className="text-primary hover:underline">
                    → Browse all {page.categorySlug} prompts
                  </Link>
                </li>
                <li>
                  <Link href="/prompts" className="text-primary hover:underline">
                    → Search complete 271+ prompt directory
                  </Link>
                </li>
              </ul>
            </div>

            {/* Guides & Tools */}
            <div className="space-y-2">
              <h3 className="font-semibold text-[var(--foreground)]">Interactive Tools & Guides</h3>
              <ul className="space-y-1.5 text-[var(--muted-foreground)]">
                <li>
                  <Link href="/tools/token-counter" className="text-primary hover:underline">
                    → Token Counter & Cost Estimator
                  </Link>
                </li>
                <li>
                  <Link href="/tools/prompt-builder" className="text-primary hover:underline">
                    → Interactive Prompt Builder
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="text-primary hover:underline">
                    → Engineering Guides & Masterclasses
                  </Link>
                </li>
              </ul>
            </div>

            {/* Related Matrix Combinations */}
            <div className="space-y-2">
              <h3 className="font-semibold text-[var(--foreground)]">Related Matrix Combinations</h3>
              <ul className="space-y-1.5 text-[var(--muted-foreground)]">
                {relatedMatrixPages.map((rm) => (
                  <li key={rm.id}>
                    <Link href={`/matrix/${rm.slug}`} className="text-primary hover:underline line-clamp-1">
                      → {rm.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
