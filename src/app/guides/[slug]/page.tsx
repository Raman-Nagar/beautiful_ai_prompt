import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PromptCard } from "@/components/prompts/prompt-card";
import { GuideTableOfContents } from "@/components/guides/guide-toc";
import { CodeBlock } from "@/components/guides/code-block";
import { GuideInlinePrompt } from "@/components/guides/guide-inline-prompt";
import { GuideShareButton } from "@/components/guides/guide-share-button";
import {
  getAllGuides,
  getGuideBySlug,
  getGuidePrompts,
  getRelatedGuides,
} from "@/lib/data/guides";
import {
  Clock,
  Calendar,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Info,
  Lightbulb,
  Layers,
  User,
  ShieldCheck,
} from "lucide-react";

import { constructMetadata, generateGuideJsonLd } from "@/lib/seo";
import { Breadcrumb } from "@/components/layout/breadcrumb";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((g) => ({
    slug: g.slug,
  }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return {
      title: "Guide Not Found",
      description: "The requested prompt engineering guide could not be found.",
    };
  }

  return constructMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guides/${guide.slug}`,
    keywords: [
      ...(guide.tags || []),
      guide.category,
      "prompt engineering guide",
      "AI prompts tutorial",
      "how to write prompts",
    ],
    type: "article",
    publishedTime: guide.publishedAt,
    modifiedTime: guide.updatedAt || guide.publishedAt,
    authors: [guide.author.name],
  });
}

export default async function GuideDetailPage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const relatedPrompts = getGuidePrompts(guide);
  const relatedGuides = getRelatedGuides(guide.slug, 2);

  // Truthful JSON-LD Schema (TechArticle) without any fake ratings or social proof
  const jsonLd = generateGuideJsonLd(guide);

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
          { label: "Guides", href: "/guides" },
          { label: guide.category },
          { label: guide.title },
        ]}
      />

      {/* Article Header Hero */}
      <div className="border-b border-[var(--border)] bg-gradient-to-b from-[var(--card)]/80 to-[var(--background)] py-10 sm:py-14">
        <Container>
          <div className="max-w-4xl space-y-6">
            {/* Meta badges and read time */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="primary" size="sm">
                {guide.category}
              </Badge>
              {guide.featured && (
                <Badge variant="warning" size="sm" className="gap-1">
                  <Sparkles className="h-3 w-3" />
                  Featured Playbook
                </Badge>
              )}
              <span className="flex items-center gap-1 text-xs text-[var(--muted-foreground)] font-mono ml-1">
                <Clock className="h-3 w-3" />
                {guide.readingTime}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
              {guide.title}
            </h1>

            {/* Subtitle / Lead Paragraph */}
            <p className="text-base sm:text-lg text-[var(--subtle-foreground)] leading-relaxed font-normal">
              {guide.description}
            </p>

            {/* Author and Publishing Details */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[var(--border-subtle)] text-xs">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-semibold shrink-0">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-semibold text-[var(--foreground)]">
                    {guide.author.name}
                  </div>
                  <div className="text-[var(--muted-foreground)] flex items-center gap-2 text-[11px]">
                    <span>{guide.author.role}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Published{" "}
                      {new Date(guide.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <GuideShareButton title={guide.title} />
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Content Area */}
      <Container className="py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Body (8 cols) */}
          <main className="lg:col-span-8 space-y-12">
            {/* Mobile Table of Contents */}
            <GuideTableOfContents
              items={guide.tableOfContents}
              isMobileDrawer
              className="mb-8"
            />

            {/* Sections Content Loop */}
            {guide.sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24 space-y-4 pt-2 first:pt-0"
              >
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)] border-b border-[var(--border-subtle)] pb-3 flex items-baseline gap-2">
                  <span>{section.title}</span>
                </h2>

                <div className="space-y-4 text-base text-[var(--foreground)]/90 leading-relaxed font-normal">
                  {section.content.map((paragraph, pIdx) => (
                    <p key={pIdx} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Callout Box if present */}
                {section.callout && (
                  <div
                    className={`rounded-[var(--radius-md)] border p-4 my-4 flex items-start gap-3 text-sm ${
                      section.callout.type === "tip"
                        ? "border-[var(--status-success)]/40 bg-[var(--status-success)]/5 text-[var(--foreground)]"
                        : section.callout.type === "warning"
                        ? "border-[var(--status-warning)]/40 bg-[var(--status-warning)]/5 text-[var(--foreground)]"
                        : "border-[var(--primary)]/40 bg-[var(--primary)]/5 text-[var(--foreground)]"
                    }`}
                  >
                    {section.callout.type === "tip" && (
                      <Lightbulb className="h-5 w-5 text-[var(--status-success)] shrink-0 mt-0.5" />
                    )}
                    {section.callout.type === "warning" && (
                      <AlertTriangle className="h-5 w-5 text-[var(--status-warning)] shrink-0 mt-0.5" />
                    )}
                    {section.callout.type === "note" && (
                      <Info className="h-5 w-5 text-[var(--primary)] shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-semibold text-xs uppercase tracking-wider mb-1 text-[var(--muted-foreground)]">
                        {section.callout.type === "tip"
                          ? "Pro Tip"
                          : section.callout.type === "warning"
                          ? "Caution"
                          : "Key Takeaway"}
                      </div>
                      <p className="leading-relaxed text-xs sm:text-sm">
                        {section.callout.text}
                      </p>
                    </div>
                  </div>
                )}

                {/* Code Snippet if present */}
                {section.codeSnippet && (
                  <CodeBlock
                    code={section.codeSnippet.code}
                    language={section.codeSnippet.language}
                    label={section.codeSnippet.label}
                  />
                )}

                {/* Linked Prompt Callout if present */}
                {section.linkedPromptId && (
                  <GuideInlinePrompt promptId={section.linkedPromptId} />
                )}
              </section>
            ))}

            {/* Guide Conclusion / Summary Box */}
            <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-6 my-10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
                <CheckCircle2 className="h-4 w-4" />
                <span>Playbook Summary</span>
              </div>
              <p className="text-sm text-[var(--subtle-foreground)] leading-relaxed">
                Applying these constraints systematically converts generative AI from an unpredictable conversationalist into a reliable, deterministic copilot. Combine these structural foundations with the ready-to-use production prompt templates below.
              </p>
            </div>
          </main>

          {/* Sticky Editorial Sidebar (4 cols) */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              {/* Desktop Table of Contents */}
              <GuideTableOfContents
                items={guide.tableOfContents}
                className="hidden lg:block"
              />

              {/* Editorial Integrity Card */}
              <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 shadow-xs space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] pb-2 border-b border-[var(--border-subtle)]">
                  <ShieldCheck className="h-4 w-4 text-[var(--status-success)]" />
                  <span>Engineering Standards</span>
                </div>
                <ul className="space-y-2 text-xs text-[var(--subtle-foreground)]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[var(--status-success)] shrink-0 mt-0.5" />
                    <span>Tested across GPT-4o, Claude 3.5 Sonnet & Gemini 1.5 Pro</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[var(--status-success)] shrink-0 mt-0.5" />
                    <span>Zero filler advice or keyword stuffing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[var(--status-success)] shrink-0 mt-0.5" />
                    <span>Production-proven parameter schemas</span>
                  </li>
                </ul>
              </div>

              {/* Quick links to related prompts in sidebar */}
              {relatedPrompts.length > 0 && (
                <div className="rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)] pb-2 border-b border-[var(--border-subtle)]">
                    <Layers className="h-4 w-4 text-[var(--primary)]" />
                    <span>Prompts In This Guide ({relatedPrompts.length})</span>
                  </div>
                  <div className="space-y-2">
                    {relatedPrompts.map((p) => (
                      <Link
                        key={p.id}
                        href={`/prompts/${p.slug}`}
                        className="group flex items-center justify-between text-xs py-1.5 px-2 rounded hover:bg-[var(--secondary)] transition-colors text-[var(--subtle-foreground)] hover:text-[var(--primary)]"
                      >
                        <span className="truncate max-w-[200px] font-medium">
                          {p.title}
                        </span>
                        <ArrowRight className="h-3 w-3 shrink-0 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>

        {/* Section: Prompts Mentioned in this Guide */}
        {relatedPrompts.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[var(--border)]">
            <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <Badge variant="primary" size="sm" className="mb-2 gap-1">
                  <Sparkles className="h-3 w-3" />
                  Interactive Prompts
                </Badge>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  Prompts Mentioned in this Guide
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-1">
                  Ready to copy, customize with variables, or inspect in our prompt playground.
                </p>
              </div>

              <Link
                href="/prompts"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] hover:underline shrink-0"
              >
                <span>Browse All 25+ Prompts</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPrompts.map((p) => (
                <PromptCard key={p.id} prompt={p} />
              ))}
            </div>
          </div>
        )}

        {/* Section: Related Guides */}
        {relatedGuides.length > 0 && (
          <div className="mt-16 pt-12 border-t border-[var(--border)]">
            <div className="mb-6">
              <Badge variant="secondary" size="sm" className="mb-2">
                Continue Learning
              </Badge>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                Related Engineering Guides
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedGuides.map((relGuide) => (
                <Link
                  key={relGuide.id}
                  href={`/guides/${relGuide.slug}`}
                  className="group block focus:outline-none"
                >
                  <Card
                    hoverable
                    className="p-6 h-full flex flex-col justify-between border-[var(--border)] hover:border-[var(--border-strong)] transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between pb-3 mb-2 border-b border-[var(--border-subtle)] text-xs">
                        <Badge variant="secondary" size="sm">
                          {relGuide.category}
                        </Badge>
                        <span className="flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] font-mono">
                          <Clock className="h-3 w-3" />
                          {relGuide.readingTime}
                        </span>
                      </div>

                      <h4 className="text-base font-bold tracking-tight text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors leading-snug">
                        {relGuide.title}
                      </h4>

                      <p className="text-xs text-[var(--muted-foreground)] mt-2 line-clamp-2 leading-relaxed">
                        {relGuide.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between text-xs font-semibold text-[var(--primary)]">
                      <span>Read Guide</span>
                      <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Back Button */}
        <div className="mt-12 text-center">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--secondary)] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to All Guides</span>
          </Link>
        </div>
      </Container>
    </div>
  );
}
