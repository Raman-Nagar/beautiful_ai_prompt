import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { PromptCard } from "@/components/prompts/prompt-card";
import { PromptDetailWorkbench } from "@/components/prompts/prompt-detail-workbench";
import {
  getAllPrompts,
  getPromptBySlug,
  getRelatedPrompts,
} from "@/lib/data/prompts";
import { getCollectionsForPrompt } from "@/lib/data/collections";
import { CollectionCard } from "@/components/collections/collection-card";
import { getCategoryById } from "@/lib/data/categories";
import { getModelById } from "@/lib/data/models";
import { GuideCard } from "@/components/guides/guide-card";
import { getGuidesForPrompt } from "@/lib/internal-links";
import {
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Cpu,
  CheckCircle2,
  Calendar,
  Lightbulb,
  AlertTriangle,
  SlidersHorizontal,
  Send,
  HelpCircle,
  Workflow,
  BookOpen,
} from "lucide-react";

import { constructMetadata, generatePromptJsonLd, getDynamicOgImageUrl } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/breadcrumb";

interface PromptPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const prompts = getAllPrompts();
  return prompts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PromptPageProps): Promise<Metadata> {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);

  if (!prompt) {
    return {
      title: "Prompt Not Found",
      description: "The requested AI prompt could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const category = getCategoryById(prompt.category);
  const categoryName = category?.name || prompt.categoryName || prompt.category;

  const ogImageUrl = getDynamicOgImageUrl({
    title: prompt.title,
    type: "AI Prompt",
    category: categoryName,
    meta: `${prompt.compatibleModels.slice(0, 3).join(" • ")} • ${prompt.difficulty}`,
  });

  return constructMetadata({
    title: prompt.title,
    description: prompt.shortDescription || prompt.description,
    path: `/prompts/${prompt.slug}`,
    image: {
      url: ogImageUrl,
      alt: `${prompt.title} - AI Prompt Template`,
    },
    keywords: [
      ...prompt.tags,
      prompt.category,
      "AI prompt",
      "prompt engineering",
      ...prompt.compatibleModels,
    ],
    type: "article",
    publishedTime: prompt.createdAt,
    modifiedTime: prompt.updatedAt || prompt.createdAt,
  });
}

export default async function PromptDetailPage({ params }: PromptPageProps) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);

  if (!prompt) {
    notFound();
  }

  const category = getCategoryById(prompt.category);
  const relatedPrompts = getRelatedPrompts(prompt.id, 3);
  const parentCollections = getCollectionsForPrompt(prompt.id);
  const relatedGuides = getGuidesForPrompt(prompt.id, prompt.category, 2);

  const difficultyVariant =
    prompt.difficulty === "beginner"
      ? "success"
      : prompt.difficulty === "intermediate"
      ? "primary"
      : "warning";

  // Truthful JSON-LD Schema (TechArticle) without any fake ratings, reviews, or social proof
  const jsonLd = generatePromptJsonLd(prompt);

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      {/* Truthful JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Semantic Breadcrumb Navigation with BreadcrumbList JSON-LD */}
      <Breadcrumb
        className="no-print"
        items={[
          { label: "Home", href: "/" },
          { label: "Prompts", href: "/prompts" },
          {
            label: category?.name || prompt.category,
            href: `/categories/${prompt.category}`,
          },
          { label: prompt.title },
        ]}
      />

      <Container className="pt-8">
        {/* Back Link */}
        <div className="mb-6 no-print">
          <Link
            href="/prompts"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Prompts Directory
          </Link>
        </div>

        {/* Prompt Header & Specification */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
          <div className="lg:col-span-8 flex flex-col gap-4">
            {/* Badges Bar: Category, Subcategory, Difficulty, Featured */}
            <div className="flex flex-wrap items-center gap-2">
              <Link href={`/categories/${prompt.category}`}>
                <Badge
                  variant="primary"
                  size="sm"
                  className="hover:opacity-80 transition-opacity cursor-pointer capitalize"
                >
                  {category?.name || prompt.category}
                </Badge>
              </Link>
              {prompt.subcategory && (
                <Badge variant="outline" size="sm">
                  {prompt.subcategory}
                </Badge>
              )}
              <Badge variant={difficultyVariant} size="sm" className="capitalize">
                {prompt.difficulty}
              </Badge>
              {prompt.featured && (
                <Badge variant="warning" size="sm" className="gap-1">
                  <Sparkles className="h-3 w-3" />
                  Featured
                </Badge>
              )}
            </div>

            {/* Prompt Main Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--foreground)] leading-tight">
              {prompt.title}
            </h1>

            {/* Short Description */}
            <p className="text-base text-[var(--subtle-foreground)] leading-relaxed">
              {prompt.shortDescription || prompt.description}
            </p>

            {/* Tags Bar */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 no-print">
              {prompt.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/prompts?tag=${encodeURIComponent(tag)}`}
                  className="rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--card)] px-2.5 py-1 text-[11px] text-[var(--muted-foreground)] hover:border-[var(--border)] hover:text-[var(--foreground)] transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Specifications Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 space-y-4 shadow-xs">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                Compatibility & Specs
              </h2>

              <div className="space-y-3 text-xs">
                {/* Compatible AI Models */}
                <div>
                  <div className="text-[var(--muted-foreground)] mb-1.5 flex items-center gap-1.5">
                    <Cpu className="h-3.5 w-3.5" />
                    Compatible AI Models
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {prompt.compatibleModels.map((mId) => {
                      const model = getModelById(mId);
                      return (
                        <span
                          key={mId}
                          className="inline-flex items-center gap-1 rounded-[var(--radius-sm)] bg-[var(--secondary)] px-2 py-0.5 font-mono text-[11px] text-[var(--foreground)] border border-[var(--border-subtle)]"
                        >
                          {model?.name || mId}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Last Updated */}
                <div className="border-t border-[var(--border-subtle)] pt-3 flex items-center justify-between">
                  <span className="text-[var(--muted-foreground)] flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    Last Updated
                  </span>
                  <span className="font-mono text-[var(--foreground)]">
                    {new Date(prompt.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>

                {/* Variable Count */}
                <div className="border-t border-[var(--border-subtle)] pt-3 flex items-center justify-between">
                  <span className="text-[var(--muted-foreground)] flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5" />
                    Customizable Variables
                  </span>
                  <span className="font-mono font-medium text-[var(--primary)]">
                    {prompt.variables.length} parameters
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ===================================================================== */}
        {/* Core Product Experience: Main Prompt Card & Browser Customizer        */}
        {/* ===================================================================== */}
        <PromptDetailWorkbench prompt={prompt} />

        {/* ===================================================================== */}
        {/* "How to Use This Prompt" Section                                      */}
        {/* ===================================================================== */}
        <section className="mt-14 mb-14">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-1">
              <HelpCircle className="h-4 w-4 text-[var(--primary)]" />
              <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                How to Use This Prompt
              </h2>
            </div>
            <p className="text-xs text-[var(--muted-foreground)]">
              Follow this 3-step workflow to extract high-signal responses from any compatible AI model.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Step 1 */}
            <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--primary-muted)] text-xs font-bold text-[var(--primary)] font-mono">
                  01
                </span>
                <SlidersHorizontal className="h-4 w-4 text-[var(--muted-foreground)]" />
              </div>
              <h3 className="text-sm font-semibold text-[var(--foreground)]">
                1. Tailor the Parameters
              </h3>
              <p className="text-xs text-[var(--subtle-foreground)] leading-relaxed">
                Use the interactive customizer above to substitute the bracketed placeholders with your exact context, requirements, and constraints.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--primary-muted)] text-xs font-bold text-[var(--primary)] font-mono">
                  02
                </span>
                <Send className="h-4 w-4 text-[var(--muted-foreground)]" />
              </div>
              <h3 className="text-sm font-semibold text-[var(--foreground)]">
                2. Send to AI Model
              </h3>
              <p className="text-xs text-[var(--subtle-foreground)] leading-relaxed">
                Copy the prompt and paste it into Claude, ChatGPT, Gemini, or Copilot. These models follow structured multi-step constraints reliably.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--primary-muted)] text-xs font-bold text-[var(--primary)] font-mono">
                  03
                </span>
                <Sparkles className="h-4 w-4 text-[var(--muted-foreground)]" />
              </div>
              <h3 className="text-sm font-semibold text-[var(--foreground)]">
                3. Review and Iterate
              </h3>
              <p className="text-xs text-[var(--subtle-foreground)] leading-relaxed">
                Review the output against the verified benchmark below. Follow up in the conversation to stress-test edge cases or refine tone.
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================================== */}
        {/* Variables Reference Guide                                             */}
        {/* ===================================================================== */}
        {prompt.variables.length > 0 && (
          <section className="mb-14">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-1">
                <Layers className="h-4 w-4 text-[var(--primary)]" />
                <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                  Prompt Variables & Parameters
                </h2>
              </div>
              <p className="text-xs text-[var(--muted-foreground)]">
                Reference breakdown of every dynamic variable embedded in this prompt template.
              </p>
            </div>

            <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[var(--border)] bg-[var(--secondary)]/50 text-[var(--muted-foreground)] font-semibold uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-4">Placeholder</th>
                      <th className="py-3 px-4">Parameter Name</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Description & Guidance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--foreground)]">
                    {prompt.variables.map((v) => {
                      const key = v.name || v.key || "";
                      return (
                        <tr key={key} className="hover:bg-[var(--secondary)]/30 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-medium text-[var(--primary)] whitespace-nowrap">
                            [{key}]
                          </td>
                          <td className="py-3.5 px-4 font-medium whitespace-nowrap">
                            {v.label}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[11px] text-[var(--muted-foreground)] uppercase whitespace-nowrap">
                            {v.type}
                          </td>
                          <td className="py-3.5 px-4 whitespace-nowrap">
                            {v.required ? (
                              <Badge variant="primary" size="sm" className="text-[10px]">
                                Required
                              </Badge>
                            ) : (
                              <Badge variant="outline" size="sm" className="text-[10px]">
                                Optional
                              </Badge>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-[var(--subtle-foreground)] leading-relaxed">
                            {v.description || `Input value for ${v.label}`}
                            {v.defaultValue && (
                              <span className="block mt-1 font-mono text-[10px] text-[var(--muted-foreground)]">
                                Default: {v.defaultValue}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ===================================================================== */}
        {/* Example Input / Output Benchmark                                      */}
        {/* ===================================================================== */}
        <section className="mb-14">
          <div className="mb-6">
            <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
              Example Execution & Benchmark Output
            </h2>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">
              Sample input arguments and the verified AI response demonstrating expected quality and formatting.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Example Input */}
            <div className="lg:col-span-5 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border-subtle)]">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                  Sample Variables
                </span>
                <Badge variant="outline" size="sm">
                  Inputs
                </Badge>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {Object.entries(prompt.exampleInput).map(([k, v]) => (
                  <div
                    key={k}
                    className="bg-[var(--secondary)]/60 rounded-[var(--radius-sm)] p-3 border border-[var(--border-subtle)]"
                  >
                    <div className="text-[10px] text-[var(--primary)] uppercase tracking-wider mb-1 font-sans font-semibold">
                      [{k}]
                    </div>
                    <div className="text-[var(--foreground)] whitespace-pre-wrap break-words leading-relaxed">
                      {v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Example Output */}
            <div className="lg:col-span-7 rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5">
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[var(--border-subtle)]">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                  Expected AI Response
                </span>
                <Badge variant="success" size="sm">
                  Verified Result
                </Badge>
              </div>

              <div className="font-mono text-xs sm:text-[13px] text-[var(--subtle-foreground)] whitespace-pre-wrap leading-relaxed max-h-[460px] overflow-y-auto bg-[var(--muted)]/50 p-4 rounded-[var(--radius-md)] border border-[var(--border-subtle)]">
                {prompt.exampleOutput}
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================== */}
        {/* Best Use Cases, Tips & Common Mistakes Grid                           */}
        {/* ===================================================================== */}
        <section className="mb-14 space-y-8">
          {/* Best Use Cases */}
          {prompt.useCases.length > 0 && (
            <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-6">
              <div className="mb-4">
                <h3 className="text-base font-bold tracking-tight text-[var(--foreground)]">
                  Best Use Cases
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                  Scenarios and roles where this prompt produces maximum leverage.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {prompt.useCases.map((useCase, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--secondary)]/30 p-3.5 text-xs text-[var(--foreground)]"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[var(--status-success)] shrink-0 mt-0.5" />
                    <span className="leading-snug">{useCase}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips & Common Mistakes: Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tips for Best Results */}
            <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--status-info-bg)] text-[var(--status-info)]">
                  <Lightbulb className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--foreground)]">
                    Tips for Best Results
                  </h3>
                  <p className="text-[11px] text-[var(--muted-foreground)]">
                    Techniques to elevate response fidelity
                  </p>
                </div>
              </div>

              <ul className="space-y-3 text-xs text-[var(--subtle-foreground)]">
                {(prompt.tips || []).map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[var(--primary)] font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Mistakes to Avoid */}
            <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-7 w-7 items-center justify-center rounded-[var(--radius-sm)] bg-[var(--status-warning-bg)] text-[var(--status-warning)]">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[var(--foreground)]">
                    Common Mistakes to Avoid
                  </h3>
                  <p className="text-[11px] text-[var(--muted-foreground)]">
                    Frequent failure modes and anti-patterns
                  </p>
                </div>
              </div>

              <ul className="space-y-3 text-xs text-[var(--subtle-foreground)]">
                {(prompt.commonMistakes || []).map((mistake, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[var(--status-warning)] font-bold mt-0.5">•</span>
                    <span className="leading-relaxed">{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ===================================================================== */}
        {/* Curated Collections Featuring this Prompt                             */}
        {/* ===================================================================== */}
        {parentCollections.length > 0 && (
          <section className="pt-10 mb-10 border-t border-[var(--border)] no-print">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <Workflow className="h-4 w-4 text-[var(--primary)]" />
                  <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                    Part of Curated Collections
                  </h2>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                  This prompt is sequenced as part of these goal-oriented workflows
                </p>
              </div>
              <Link
                href="/collections"
                className="text-xs font-semibold text-[var(--primary)] hover:underline inline-flex items-center gap-1"
              >
                <span>View all collections</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {parentCollections.map((col) => (
                <CollectionCard
                  key={col.id}
                  collection={col}
                  compact
                  sourcePage={`/prompts/${prompt.slug}`}
                />
              ))}
            </div>
          </section>
        )}

        {/* ===================================================================== */}
        {/* Related Prompts                                                       */}
        {/* ===================================================================== */}
        {relatedPrompts.length > 0 && (
          <section className="pt-10 border-t border-[var(--border)] no-print">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                  Related AI Prompts
                </h2>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                  Complementary workflows in {category?.name || "this category"}
                </p>
              </div>
              <Link
                href={`/categories/${prompt.category}`}
                className="text-xs font-semibold text-[var(--primary)] hover:underline inline-flex items-center gap-1"
              >
                <span>View all {category?.name || prompt.category} prompts</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPrompts.map((rp) => (
                <PromptCard key={rp.id} prompt={rp} />
              ))}
            </div>
          </section>
        )}

        {/* ===================================================================== */}
        {/* Related Engineering Guides & Playbooks                                */}
        {/* ===================================================================== */}
        {relatedGuides.length > 0 && (
          <section className="pt-10 border-t border-[var(--border)] no-print">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[var(--primary)]" />
                  <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                    Related Engineering Guides
                  </h2>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                  Deep-dive playbooks and system prompt methodologies for {category?.name || "this category"}
                </p>
              </div>
              <Link
                href="/guides"
                className="text-xs font-semibold text-[var(--primary)] hover:underline inline-flex items-center gap-1"
              >
                <span>View all guides</span>
                <ChevronRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedGuides.map((guide) => (
                <GuideCard
                  key={guide.id}
                  guide={guide}
                  sourcePage={`/prompts/${prompt.slug}`}
                />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
