import React from "react";
import { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CategoryIcon } from "@/components/categories/category-icon";
import { getAllCategories } from "@/lib/data/categories";
import { ArrowRight, Sparkles, HelpCircle, Code2, Briefcase, TrendingUp } from "lucide-react";
import { TrackedCategoryLink } from "@/components/analytics/tracked-link";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { constructMetadata, generateFaqJsonLd } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "AI Prompt Categories — ChatGPT & Claude Prompts by Domain",
  description:
    "Browse 27 specialized AI prompt categories for software engineering, career growth, ATS resumes, marketing, business, and creative design. Tested on top models.",
  path: "/categories",
  keywords: [
    "AI prompt categories",
    "ChatGPT prompts by category",
    "Claude prompts directory",
    "coding prompts",
    "career prompts",
    "marketing prompts",
    "productivity prompts",
    "prompt engineering taxonomy",
  ],
});

const CATEGORIES_PAGE_FAQS = [
  {
    question: "How are the AI prompt categories organized?",
    answer:
      "Our prompt taxonomy is divided into core professional disciplines: Software Engineering & Development, Career & Job Search, Business & Strategy, Marketing & Content, and Visual & Creative Arts. Within each category, prompts are further classified by subtopics and model suitability.",
  },
  {
    question: "Can I request or suggest a new category?",
    answer:
      "Yes! If your industry or niche has specialized prompt engineering workflows (such as Legal, Healthcare, Bio-informatics, or DevOps), submit your suggestion via our Contact page. Our editorial team reviews community suggestions weekly.",
  },
  {
    question: "Are prompts in all categories tested across multiple AI models?",
    answer:
      "Yes. Every prompt is benchmarked against appropriate frontier models. Text prompts are tested on Claude 3.7 / 3.5 Sonnet, ChatGPT-4o, and Gemini 2.5 Pro; visual prompts are tested on Midjourney v6.1 and FLUX.1 Dev.",
  },
];

export default function CategoriesPage() {
  const categories = getAllCategories();
  const faqJsonLd = generateFaqJsonLd(CATEGORIES_PAGE_FAQS);

  return (
    <div className="py-12 sm:py-16 bg-[var(--background)] min-h-screen">
      {/* FAQPage Schema for Categories Hub */}
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
          { label: "Categories" },
        ]}
      />

      <Container className="pt-6">
        {/* Header Section */}
        <header className="max-w-2xl mb-12 space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">
              Taxonomy
            </Badge>
            <span className="text-xs text-[var(--muted-foreground)]">
              {categories.length} Specialized Categories
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--foreground)]">
            Explore All Categories
          </h1>

          <p className="text-sm sm:text-base leading-relaxed text-[var(--muted-foreground)]">
            Discover practical AI prompts engineered for your specific professional workflow, role,
            and industry. Filter by category to find vetted templates with interactive parameters.
          </p>
        </header>

        {/* Categories Directory Section */}
        <section aria-label="Prompt Categories Grid" className="mb-20">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
              Browse Prompts by Professional Discipline
            </h2>
            <p className="text-xs text-[var(--muted-foreground)] mt-1">
              Select a category to view specialized prompt suites, subtopics, and model cheat sheets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const hasPrompts = (cat.count ?? 0) > 0;
              return (
                <TrackedCategoryLink
                  key={cat.slug}
                  categorySlug={cat.slug}
                  categoryName={cat.name}
                  sourcePage="/categories"
                  href={`/categories/${cat.slug}`}
                  className="group block h-full"
                >
                  <Card
                    interactive
                    className="h-full flex flex-col justify-between p-6"
                  >
                    <div>
                      {/* Top Row: Icon, Count & Featured Indicator */}
                      <div className="flex items-center justify-between pb-3 mb-2 border-b border-[var(--border-subtle)]">
                        <div className="flex items-center gap-2.5">
                          <div className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--secondary)] text-[var(--foreground)] group-hover:border-[var(--primary)]/40 group-hover:text-[var(--primary)] transition-colors">
                            <CategoryIcon name={cat.icon} className="h-5 w-5" />
                          </div>
                          {cat.featured && (
                            <Badge variant="warning" size="sm" className="gap-1">
                              <Sparkles className="h-3 w-3" />
                              Popular
                            </Badge>
                          )}
                        </div>

                        <Badge variant={hasPrompts ? "secondary" : "outline"} size="sm">
                          {cat.count ?? 0} {cat.count === 1 ? "prompt" : "prompts"}
                        </Badge>
                      </div>

                      <h3 className="text-lg font-semibold tracking-tight text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                        {cat.name}
                      </h3>

                      <p className="text-xs leading-relaxed text-[var(--muted-foreground)] mt-2 line-clamp-2">
                        {cat.description}
                      </p>

                      {/* Subcategories Chips */}
                      {cat.subcategories && cat.subcategories.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {cat.subcategories.slice(0, 3).map((sub) => (
                            <span
                              key={sub}
                              className="rounded-[var(--radius-sm)] bg-[var(--secondary)] px-2 py-0.5 text-[10px] text-[var(--subtle-foreground)] border border-[var(--border-subtle)]"
                            >
                              {sub}
                            </span>
                          ))}
                          {cat.subcategories.length > 3 && (
                            <span className="text-[10px] text-[var(--muted-foreground)] self-center">
                              +{cat.subcategories.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-[var(--border-subtle)] pt-4 text-xs font-semibold text-[var(--primary)]">
                      <span>Browse {cat.name} Prompts</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Card>
                </TrackedCategoryLink>
              );
            })}
          </div>
        </section>

        {/* How to Navigate AI Prompt Categories Section */}
        <section className="mb-20 pt-12 border-t border-[var(--border)]">
          <div className="max-w-2xl mb-10">
            <Badge variant="primary" size="sm" className="mb-2">
              Domain Architecture
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
              How Our AI Prompt Taxonomy Is Structured
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-2 leading-relaxed">
              We group prompts by functional capability rather than superficial keywords.
              Explore our three core domain pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-6 space-y-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary-muted)] text-[var(--primary)]">
                <Code2 className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">
                1. Software & Technical Engineering
              </h3>
              <p className="text-xs text-[var(--subtle-foreground)] leading-relaxed">
                Categories like Coding, React, Next.js, and JavaScript provide hardened prompts for
                system design mock interviews, legacy code refactoring, TypeScript type definitions,
                and performance profiling.
              </p>
            </div>

            <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-6 space-y-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary-muted)] text-[var(--primary)]">
                <Briefcase className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">
                2. Career Acceleration & ATS Resumes
              </h3>
              <p className="text-xs text-[var(--subtle-foreground)] leading-relaxed">
                Categories like Career, Resume, and Job Interview contain battle-tested frameworks to
                transform responsibilities into quantified STAR bullet points, simulate behavioral
                interviews, and negotiate executive compensation packages.
              </p>
            </div>

            <div className="rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-6 space-y-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--primary-muted)] text-[var(--primary)]">
                <TrendingUp className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-bold text-[var(--foreground)]">
                3. Business, Marketing & Content
              </h3>
              <p className="text-xs text-[var(--subtle-foreground)] leading-relaxed">
                Categories like Marketing, Business, Social Media, and YouTube help operators draft
                investor memos, build high-converting landing page hooks, script high-retention video narratives,
                and handle sales objections.
              </p>
            </div>
          </div>
        </section>

        {/* Categories FAQ Section */}
        <section className="pt-12 border-t border-[var(--border)]">
          <div className="max-w-2xl mb-8">
            <div className="flex items-center gap-2 mb-1.5">
              <HelpCircle className="h-4 w-4 text-[var(--primary)]" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                Frequently Asked Questions About Prompt Categories
              </h2>
            </div>
            <p className="text-xs text-[var(--muted-foreground)]">
              Taxonomy guidelines, domain coverage, and community suggestion procedures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CATEGORIES_PAGE_FAQS.map((faq, idx) => (
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
