import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { PromptCard } from "@/components/prompts/prompt-card";
import { CollectionCard } from "@/components/collections/collection-card";
import {
  getAllCollections,
  getCollectionBySlug,
  getCollectionPrompts,
  getRelatedCollections,
} from "@/lib/data/collections";
import { getCategoryById } from "@/lib/data/categories";
import {
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Layers,
  BookOpen,
  Workflow,
  CheckCircle2,
  Calendar,
  Users,
  Compass,
  ArrowRight,
} from "lucide-react";
import { GuideCard } from "@/components/guides/guide-card";
import { getGuidesForCollection } from "@/lib/internal-links";

import { constructMetadata, generateCollectionJsonLd, getDynamicOgImageUrl } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/breadcrumb";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const collections = getAllCollections();
  return collections.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    return {
      title: "Collection Not Found",
      description: "The requested prompt collection could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const ogImageUrl = getDynamicOgImageUrl({
    title: collection.title,
    type: "Prompt Collection",
    category: collection.category,
    meta: `${collection.promptIds.length} Verified Prompts • Workflow Suite`,
  });

  return constructMetadata({
    title: collection.title,
    description: collection.shortDescription || collection.description,
    path: `/collections/${collection.slug}`,
    image: {
      url: ogImageUrl,
      alt: `${collection.title} - Curated Prompt Suite`,
    },
    keywords: [
      ...(collection.tags || []),
      collection.category,
      "AI prompts collection",
      "curated prompt pack",
      "prompt engineering workflow",
      "productivity templates",
    ],
    publishedTime: collection.createdAt,
    modifiedTime: collection.updatedAt || collection.createdAt,
  });
}

export default async function CollectionDetailPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) {
    notFound();
  }

  const category = getCategoryById(collection.category);
  const prompts = getCollectionPrompts(collection.slug);
  const relatedCollections = getRelatedCollections(collection.slug, 3);
  const relatedGuides = getGuidesForCollection(collection.slug, collection.category, 2);

  // Truthful JSON-LD Schema (CollectionPage) without any fake ratings or social proof
  const jsonLd = generateCollectionJsonLd(collection, prompts);

  return (
    <div className="min-h-screen bg-[var(--background)] pb-24">
      {/* Truthful JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Semantic Breadcrumb Navigation with BreadcrumbList JSON-LD */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Collections", href: "/collections" },
          {
            label: category?.name || collection.categoryName || collection.category,
            href: `/categories/${collection.category}`,
          },
          { label: collection.title },
        ]}
      />

      <Container className="pt-8">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/collections"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to All Collections
          </Link>
        </div>

        {/* ========================================================================= */}
        {/* 1. EDITORIAL HERO SECTION                                                 */}
        {/* ========================================================================= */}
        <header className="max-w-4xl space-y-5 mb-12">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <Link href={`/categories/${collection.category}`}>
              <Badge
                variant="primary"
                size="sm"
                className="hover:opacity-80 transition-opacity cursor-pointer capitalize"
              >
                <Layers className="h-3 w-3 mr-1" />
                {category?.name || collection.categoryName || collection.category}
              </Badge>
            </Link>

            <Badge variant="outline" size="sm" className="font-mono text-[11px]">
              <Workflow className="h-3 w-3 mr-1 text-[var(--primary)]" />
              {prompts.length} Verified Prompts
            </Badge>

            {collection.featured && (
              <Badge variant="warning" size="sm" className="gap-1">
                <Sparkles className="h-3 w-3" />
                Curator Pick
              </Badge>
            )}
          </div>

          {/* Large Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
            {collection.title}
          </h1>

          {/* Subtitle / Description */}
          <p className="text-base sm:text-lg text-[var(--subtle-foreground)] leading-relaxed">
            {collection.description}
          </p>

          {/* Target Audience & Last Updated Row */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-[var(--muted-foreground)] border-t border-[var(--border-subtle)]">
            {collection.targetAudience && (
              <span className="flex items-center gap-1.5 font-medium text-[var(--foreground)]">
                <Users className="h-3.5 w-3.5 text-[var(--primary)]" />
                <span className="text-[var(--muted-foreground)] font-normal">Audience:</span>
                {collection.targetAudience}
              </span>
            )}

            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
              Updated{" "}
              {new Date(collection.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })}
            </span>

            {collection.tags && collection.tags.length > 0 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                {collection.tags.map((tag) => (
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
        </header>

        {/* ========================================================================= */}
        {/* 2. CURATOR'S EDITORIAL OVERVIEW                                           */}
        {/* ========================================================================= */}
        <section className="mb-14">
          <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center gap-2.5 pb-4 border-b border-[var(--border-subtle)]">
              <div className="flex h-8 w-8 items-center justify-center rounded-[var(--radius-md)] bg-[var(--primary-muted)] text-[var(--primary)] shrink-0">
                <BookOpen className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold tracking-tight text-[var(--foreground)] uppercase">
                  Workflow Architecture &amp; Curator Perspective
                </h2>
                <p className="text-[11px] text-[var(--muted-foreground)]">
                  Why this collection was curated and how the prompts sequence together.
                </p>
              </div>
            </div>

            {/* Editorial Overview Body */}
            <div className="prose prose-invert max-w-none text-xs sm:text-sm text-[var(--foreground)] leading-relaxed space-y-4">
              <p className="leading-relaxed">
                {collection.editorialOverview || collection.description}
              </p>
            </div>

            {/* Curator Tactical Advice */}
            {collection.curatorNotes && (
              <div className="rounded-[var(--radius-lg)] border border-[var(--primary)]/20 bg-[var(--primary-muted)]/30 p-4 text-xs text-[var(--subtle-foreground)] flex items-start gap-3">
                <Sparkles className="h-4 w-4 text-[var(--primary)] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-semibold text-[var(--primary)] block">
                    Curator&apos;s Pro Tip:
                  </span>
                  <span className="leading-relaxed text-[var(--foreground)]">
                    {collection.curatorNotes}
                  </span>
                </div>
              </div>
            )}

            {/* Key Takeaways Grid */}
            {collection.keyTakeaways && collection.keyTakeaways.length > 0 && (
              <div className="pt-2 space-y-3">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                  Strategic Advantages of this Workflow
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {collection.keyTakeaways.map((takeaway, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--secondary)]/30 p-3 text-xs text-[var(--foreground)]"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[var(--status-success)] shrink-0 mt-0.5" />
                      <span className="leading-snug">{takeaway}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. RECOMMENDED WORKFLOW EXECUTION GUIDE                                   */}
        {/* ========================================================================= */}
        {collection.workflowSteps && collection.workflowSteps.length > 0 ? (
          <section className="mb-16 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 shadow-xs">
            <div className="max-w-2xl mb-6">
              <div className="flex items-center gap-2">
                <Workflow className="h-4 w-4 text-[var(--primary)]" />
                <h2 className="text-lg font-bold tracking-tight text-[var(--foreground)]">
                  Recommended Workflow Sequence
                </h2>
              </div>
              <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                Execute these steps in sequence for compound results, or jump straight to any individual step.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {collection.workflowSteps.map((step) => {
                const linkedPrompt = step.promptId
                  ? prompts.find((p) => p.id === step.promptId)
                  : undefined;

                return (
                  <div
                    key={step.step}
                    className="flex flex-col justify-between rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--secondary)]/20 p-4 space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--border-subtle)]">
                        <span className="text-[11px] font-mono font-bold text-[var(--primary)] uppercase tracking-wider">
                          Phase 0{step.step}
                        </span>
                        {linkedPrompt && (
                          <Badge variant="outline" size="sm" className="text-[10px]">
                            {linkedPrompt.category}
                          </Badge>
                        )}
                      </div>

                      <h3 className="font-semibold text-[var(--foreground)] text-sm">
                        {step.title}
                      </h3>

                      <p className="text-xs text-[var(--muted-foreground)] mt-1.5 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {linkedPrompt && (
                      <Link
                        href={`/prompts/${linkedPrompt.slug}`}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--primary)] hover:underline pt-2 border-t border-[var(--border-subtle)]"
                      >
                        <span>Open {linkedPrompt.title}</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ) : (
          <section className="mb-16 rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8">
            <div className="max-w-2xl mb-6">
              <h2 className="text-lg font-bold tracking-tight text-[var(--foreground)]">
                How to Execute This Collection
              </h2>
              <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                Three simple steps to maximize total leverage when chaining these prompts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-[var(--subtle-foreground)]">
              <div className="space-y-2 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--secondary)]/20 p-4">
                <span className="text-xs font-bold text-[var(--primary)] font-mono">01. Baseline Input</span>
                <h3 className="font-semibold text-[var(--foreground)] text-sm">Fill Variables First</h3>
                <p className="leading-relaxed">
                  Use the interactive customizer on Step 1 to input your specific codebase, resume, or business details.
                </p>
              </div>

              <div className="space-y-2 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--secondary)]/20 p-4">
                <span className="text-xs font-bold text-[var(--primary)] font-mono">02. Chain Outputs</span>
                <h3 className="font-semibold text-[var(--foreground)] text-sm">Pass Output as Context</h3>
                <p className="leading-relaxed">
                  Copy the benchmark output of Step 1 into Step 2 as foundational context to create deeply coherent results.
                </p>
              </div>

              <div className="space-y-2 rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--secondary)]/20 p-4">
                <span className="text-xs font-bold text-[var(--primary)] font-mono">03. Review &amp; Ship</span>
                <h3 className="font-semibold text-[var(--foreground)] text-sm">Iterate with Domain Nuance</h3>
                <p className="leading-relaxed">
                  Ask the model to stress-test corner cases or tone discrepancies before finalizing production deliverables.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 4. COLLECTION PROMPT CARDS (SEQUENTIAL WORKFLOW VIEW)                     */}
        {/* ========================================================================= */}
        <section className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Workflow className="h-4 w-4 text-[var(--primary)]" />
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  Included Prompts in this Collection
                </h2>
              </div>
              <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                Execute these {prompts.length} prompts sequentially or standalone to achieve your objective.
              </p>
            </div>

            <span className="text-xs font-mono text-[var(--muted-foreground)]">
              {prompts.length} Verified Prompts
            </span>
          </div>

          {prompts.length === 0 ? (
            <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-12 text-center space-y-3">
              <p className="text-sm text-[var(--muted-foreground)]">
                No active prompts currently assigned to this collection. Check back shortly.
              </p>
              <Link
                href="/collections"
                className="inline-flex items-center text-xs font-semibold text-[var(--primary)] hover:underline gap-1"
              >
                <span>Browse all collections</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {prompts.map((prompt, index) => (
                <div key={prompt.id} className="relative flex flex-col">
                  {/* Step Pill */}
                  <div className="mb-2 flex items-center justify-between px-1">
                    <span className="font-mono text-[10px] font-bold text-[var(--primary)] uppercase tracking-wider flex items-center gap-1">
                      <span>{`Step ${String(index + 1).padStart(2, "0")}`}</span>
                      <span className="text-[var(--muted-foreground)]">•</span>
                      <span className="text-[var(--muted-foreground)] font-normal">Workflow Phase</span>
                    </span>

                  </div>

                  <PromptCard prompt={prompt} className="flex-1" />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ========================================================================= */}
        {/* 5. RELATED COLLECTIONS SECTION                                            */}
        {/* ========================================================================= */}
        {relatedCollections.length > 0 && (
          <section className="pt-10 border-t border-[var(--border)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <Compass className="h-4 w-4 text-[var(--primary)]" />
                  <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                    Related Curated Collections
                  </h2>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                  Complementary prompt packs to expand your productivity stack.
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

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedCollections.map((rel) => (
                <CollectionCard
                  key={rel.id}
                  collection={rel}
                  compact
                  sourcePage={`/collections/${collection.slug}`}
                />
              ))}
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* 6. RELATED ENGINEERING GUIDES SECTION                                     */}
        {/* ========================================================================= */}
        {relatedGuides.length > 0 && (
          <section className="pt-10 border-t border-[var(--border)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
              <div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[var(--primary)]" />
                  <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                    Related Engineering Guides
                  </h2>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] mt-0.5">
                  Playbooks and tactical prompt engineering frameworks relevant to this collection.
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
                  sourcePage={`/collections/${collection.slug}`}
                />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
