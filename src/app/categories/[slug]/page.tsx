import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CategoryIcon } from "@/components/categories/category-icon";
import { CategoryPromptsView } from "@/components/categories/category-prompts-view";
import {
  getAllCategories,
  getCategoryBySlug,
  getRelatedCategories,
} from "@/lib/data/categories";
import { getPromptsByCategory } from "@/lib/data/prompts";
import {
  TrackedCategoryLink,
  TrackedCollectionLink,
} from "@/components/analytics/tracked-link";
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Layers,
  Cpu,
  Target,
  Compass,
  BookOpen,
  ChevronRight,
} from "lucide-react";
import { GuideCard } from "@/components/guides/guide-card";
import { getGuidesForCategory, getCollectionsForCategory } from "@/lib/internal-links";

import { constructMetadata, generateCategoryJsonLd, getDynamicOgImageUrl } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/breadcrumb";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((c) => ({
    slug: c.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The requested prompt category could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const ogImageUrl = getDynamicOgImageUrl({
    title: `${category.name} AI Prompts`,
    type: "Prompt Category",
    category: `${category.name} Taxonomy`,
    meta: "Verified Prompts • Production Ready",
  });

  return constructMetadata({
    title: `${category.name} AI Prompts`,
    description: `Discover practical, verified AI prompts for ${category.name}. ${category.description}`,
    path: `/categories/${category.slug}`,
    image: {
      url: ogImageUrl,
      alt: `${category.name} AI Prompts Directory`,
    },
    keywords: [
      `${category.name} prompts`,
      `${category.slug} AI`,
      "prompt library",
      ...(category.subcategories || []),
    ],
  });
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const prompts = getPromptsByCategory(category.slug);
  const relatedCategories = getRelatedCategories(category.slug, 4);
  const relatedCollections = getCollectionsForCategory(category.slug, 2);
  const relatedGuides = getGuidesForCategory(category.slug, 2);

  // Truthful JSON-LD Schema (CollectionPage) without any fake ratings
  const jsonLd = generateCategoryJsonLd(category, prompts);

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
          { label: "Categories", href: "/categories" },
          { label: category.name },
        ]}
      />

      <Container className="pt-8 sm:pt-12">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            All Categories
          </Link>
        </div>

        {/* Category Hero Banner */}
        <div className="relative rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-10 mb-12 shadow-xs overflow-hidden">
          <div className="pointer-events-none absolute top-0 right-0 h-64 w-64 rounded-full bg-indigo-500/5 blur-3xl" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-2.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--secondary)] text-[var(--primary)] shadow-xs">
                  <CategoryIcon name={category.icon} className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="primary" size="sm">
                      {category.name} Library
                    </Badge>
                    {category.featured && (
                      <Badge variant="warning" size="sm" className="gap-1">
                        <Sparkles className="h-3 w-3" />
                        Popular Domain
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-[var(--muted-foreground)]">
                    {prompts.length} Verified {prompts.length === 1 ? "Prompt" : "Prompts"}
                  </span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--foreground)]">
                {category.name} AI Prompts
              </h1>

              <p className="text-sm sm:text-base leading-relaxed text-[var(--muted-foreground)]">
                {category.description}
              </p>
            </div>

            {/* Quick Stats / Meta Sidebar */}
            <div className="flex flex-col gap-2 rounded-xl border border-[var(--border-subtle)] bg-[var(--secondary)]/40 p-4 shrink-0 text-xs min-w-[200px]">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
                <span className="text-[var(--muted-foreground)]">Available Prompts</span>
                <span className="font-mono font-semibold text-[var(--foreground)]">
                  {prompts.length}
                </span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
                <span className="text-[var(--muted-foreground)]">Subtopics</span>
                <span className="font-mono font-semibold text-[var(--foreground)]">
                  {category.subcategories?.length ?? 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[var(--muted-foreground)]">Access</span>
                <span className="font-mono font-semibold text-[var(--status-success)]">
                  100% Free
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SEO-Oriented Practical Guide */}
        <section className="mb-14 rounded-xl border border-[var(--border-subtle)] bg-[var(--card)]/40 p-6 sm:p-8">
          <h2 className="text-base sm:text-lg font-bold tracking-tight text-[var(--foreground)] mb-3 flex items-center gap-2">
            <Compass className="h-4 w-4 text-[var(--primary)]" />
            <span>Getting Better Results with {category.name} Prompts</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-xs leading-relaxed text-[var(--muted-foreground)]">
            <div className="space-y-1.5">
              <h3 className="font-semibold text-[var(--foreground)] text-xs flex items-center gap-1.5">
                <Target className="h-3.5 w-3.5 text-[var(--status-success)]" />
                Provide Specific Context
              </h3>
              <p>
                When using prompts in this category, fill in every interactive variable with real
                constraints, specific tech stacks, or targeted audiences to eliminate generic AI
                verbosity.
              </p>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-semibold text-[var(--foreground)] text-xs flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5 text-[var(--primary)]" />
                Select the Optimal Model
              </h3>
              <p>
                Every prompt includes model compatibility tags. Use Claude 3.5 Sonnet for code and
                complex structural reasoning, GPT-4o for versatile copywriting, and Gemini for
                extensive document synthesis.
              </p>
            </div>

            <div className="space-y-1.5">
              <h3 className="font-semibold text-[var(--foreground)] text-xs flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-[var(--status-info)]" />
                Iterative Refinement
              </h3>
              <p>
                Each prompt outputs structured sections. You can easily follow up with prompts like
                &ldquo;refactor step 2 with higher conciseness&rdquo; or &ldquo;expand the edge cases&rdquo;
                to lock in ideal results.
              </p>
            </div>
          </div>
        </section>

        {/* Prompts Section with In-Category Search */}
        <section className="mb-16">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
              Prompts in {category.name}
            </h2>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">
              Filter by subtopic or search keywords to find the exact prompt for your workflow.
            </p>
          </div>

          <CategoryPromptsView
            initialPrompts={prompts}
            categoryName={category.name}
            subcategories={category.subcategories}
          />
        </section>

        {/* Related Collections Section */}
        {relatedCollections.length > 0 && (
          <section className="mb-16 pt-12 border-t border-[var(--border)]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <Badge variant="primary" size="sm" className="mb-2">
                  Curated Workflows
                </Badge>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  Collections Featuring {category.name}
                </h2>
                <p className="text-xs text-[var(--muted-foreground)] mt-1">
                  Multi-stage prompt suites designed to solve end-to-end projects.
                </p>
              </div>

              <Link
                href="/collections"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--primary)] hover:underline"
              >
                <span>All collections</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedCollections.map((col) => (
                <TrackedCollectionLink
                  key={col.id}
                  collectionSlug={col.slug}
                  collectionTitle={col.title}
                  sourcePage={`/categories/${category.slug}`}
                  href={`/collections/${col.slug}`}
                  className="block group"
                >
                  <Card
                    interactive
                    className="p-6 h-full flex flex-col justify-between card-lift cursor-pointer hover:bg-[var(--card-hover)]"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[11px] font-medium text-[var(--primary)] flex items-center gap-1.5">
                          <Layers className="h-3.5 w-3.5" />
                          {col.targetAudience}
                        </span>
                        <Badge variant="outline" size="sm">
                          {col.promptIds.length} Prompts
                        </Badge>
                      </div>

                      <h3 className="text-base font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                        {col.title}
                      </h3>

                      <p className="text-xs text-[var(--muted-foreground)] mt-2 leading-relaxed line-clamp-2">
                        {col.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-semibold text-[var(--foreground)]">
                      <span>Explore Collection</span>
                      <ArrowRight className="h-3.5 w-3.5 text-[var(--muted-foreground)] group-hover:text-[var(--foreground)] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </Card>
                </TrackedCollectionLink>
              ))}
            </div>
          </section>
        )}

        {/* Related Categories Section */}
        {relatedCategories.length > 0 && (
          <section className="pt-12 border-t border-[var(--border)]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  Related Categories
                </h2>
                <p className="text-xs text-[var(--muted-foreground)] mt-1">
                  Explore adjacent categories that complement {category.name}.
                </p>
              </div>

              <Link
                href="/categories"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--primary)] hover:underline"
              >
                <span>View all categories</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedCategories.map((rel) => (
                <TrackedCategoryLink
                  key={rel.slug}
                  categorySlug={rel.slug}
                  categoryName={rel.name}
                  sourcePage={`/categories/${category.slug}`}
                  href={`/categories/${rel.slug}`}
                  className="group block"
                >
                  <Card
                    interactive
                    className="p-5 h-full flex flex-col justify-between card-lift cursor-pointer hover:bg-[var(--card-hover)]"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--secondary)] text-[var(--foreground)] group-hover:text-[var(--primary)] group-hover:border-[var(--primary)]/40 transition-colors">
                          <CategoryIcon name={rel.icon} className="h-4 w-4" />
                        </div>
                        <span className="text-[11px] font-mono text-[var(--muted-foreground)]">
                          {rel.count ?? 0} prompts
                        </span>
                      </div>

                      <h3 className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                        {rel.name}
                      </h3>

                      <p className="text-xs text-[var(--muted-foreground)] mt-1 line-clamp-2 leading-relaxed">
                        {rel.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-[11px] text-[var(--primary)] font-medium">
                      <span>Browse category</span>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </Card>
                </TrackedCategoryLink>
              ))}
            </div>
          </section>
        )}

        {/* Related Guides & Playbooks Section */}
        {relatedGuides.length > 0 && (
          <section className="pt-12 border-t border-[var(--border)]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[var(--primary)]" />
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                    Related Engineering Guides
                  </h2>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] mt-1">
                  System prompt architectures, playbooks, and best practices for {category.name}.
                </p>
              </div>

              <Link
                href="/guides"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--primary)] hover:underline"
              >
                <span>View all guides</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedGuides.map((guide) => (
                <GuideCard
                  key={guide.id}
                  guide={guide}
                  sourcePage={`/categories/${category.slug}`}
                />
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
