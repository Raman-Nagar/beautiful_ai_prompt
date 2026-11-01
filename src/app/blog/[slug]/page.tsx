import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { CodeBlock } from "@/components/guides/code-block";
import { getAllBlogPosts, getBlogPostBySlug, getRelatedBlogPosts } from "@/lib/data/blog";
import { constructMetadata, generateBlogPostingJsonLd, generateBreadcrumbJsonLd, getDynamicOgImageUrl } from "@/lib/seo";
import {
  Clock,
  Calendar,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  Info,
  Lightbulb,
  BookOpen,
  Tag,
} from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
      description: "The requested blog article could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const ogImageUrl = getDynamicOgImageUrl({
    title: post.title,
    type: "Blog Article",
    category: post.category,
    meta: `${post.readingTime} • ${post.author.name}`,
  });

  return constructMetadata({
    title: post.seoTitle || `${post.title} | Beautiful AI Prompt`,
    description: post.seoDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    image: {
      url: ogImageUrl,
      alt: post.title,
    },
    keywords: [
      ...(post.targetKeywords || []),
      ...(post.tags || []),
      "AI prompts",
      "prompt engineering",
      post.category,
    ],
    exactTitle: true,
  });
}

function renderFormattedParagraph(text: string) {
  if (!text.includes("[") && !text.includes("**")) return text;
  const regex = /(\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)]+)\))/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    if (match[2]) {
      parts.push(
        <strong key={match.index} className="font-semibold text-[var(--foreground)]">
          {match[2]}
        </strong>
      );
    } else if (match[3] && match[4]) {
      const linkText = match[3];
      const href = match[4];
      const isExternal = href.startsWith("http://") || href.startsWith("https://");

      if (isExternal) {
        parts.push(
          <a
            key={match.index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[var(--primary)] underline decoration-[var(--primary)]/40 underline-offset-4 hover:decoration-[var(--primary)] hover:text-[var(--primary)] transition-colors"
          >
            {linkText}
          </a>
        );
      } else {
        parts.push(
          <Link
            key={match.index}
            href={href}
            className="font-medium text-[var(--primary)] underline decoration-[var(--primary)]/40 underline-offset-4 hover:decoration-[var(--primary)] hover:text-[var(--primary)] transition-colors"
          >
            {linkText}
          </Link>
        );
      }
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts;
}

export default async function BlogPostDetailPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(post.slug, 2);

  const jsonLd = generateBlogPostingJsonLd(post);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

  return (
    <article className="min-h-screen bg-[var(--background)] py-10 sm:py-14">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Semantic Breadcrumbs */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      <Container className="pt-6">
        {/* Back Link */}
        <div className="mb-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to All Articles
          </Link>
        </div>

        {/* Article Header */}
        <header className="max-w-4xl space-y-4 mb-10 pb-8 border-b border-[var(--border)]">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="primary" size="sm">
              <Sparkles className="h-3 w-3 mr-1" />
              {post.category}
            </Badge>
            <span className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {post.readingTime}
            </span>
            <span className="text-xs text-[var(--muted-foreground)]">•</span>
            <span className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(post.publishedAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed">
            {post.excerpt}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <div className="h-9 w-9 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center font-bold text-xs border border-[var(--border)]">
              AI
            </div>
            <div>
              <div className="text-xs font-semibold text-[var(--foreground)]">
                {post.author.name}
              </div>
              <div className="text-[11px] text-[var(--muted-foreground)]">
                {post.author.role}
              </div>
            </div>
          </div>
        </header>

        {/* Article Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Content Body */}
          <div className="lg:col-span-8 space-y-10">
            {post.sections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24 space-y-4">
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  {section.title}
                </h2>

                <div className="space-y-4 text-sm sm:text-base leading-relaxed text-[var(--foreground)]/90">
                  {section.content.map((paragraph, pIdx) => (
                    <p key={pIdx}>{renderFormattedParagraph(paragraph)}</p>
                  ))}
                </div>

                {/* Callout box */}
                {section.callout && (
                  <div
                    className={`rounded-[var(--radius-md)] p-4 border text-sm flex items-start gap-3 my-4 ${
                      section.callout.type === "tip"
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-950 dark:text-emerald-200"
                        : section.callout.type === "warning"
                        ? "bg-amber-500/10 border-amber-500/20 text-amber-950 dark:text-amber-200"
                        : "bg-blue-500/10 border-blue-500/20 text-blue-950 dark:text-blue-200"
                    }`}
                  >
                    {section.callout.type === "tip" && (
                      <Lightbulb className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
                    )}
                    {section.callout.type === "warning" && (
                      <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500 mt-0.5" />
                    )}
                    {section.callout.type === "note" && (
                      <Info className="h-4 w-4 shrink-0 text-blue-500 mt-0.5" />
                    )}
                    <span className="leading-relaxed">{renderFormattedParagraph(section.callout.text)}</span>
                  </div>
                )}

                {/* Code / Prompt Snippet */}
                {section.codeSnippet && (
                  <CodeBlock
                    code={section.codeSnippet.code}
                    language={section.codeSnippet.language}
                    label={section.codeSnippet.label}
                  />
                )}
              </section>
            ))}

            {/* Tags footer */}
            {post.tags && post.tags.length > 0 && (
              <div className="pt-8 border-t border-[var(--border)] flex flex-wrap items-center gap-2">
                <Tag className="h-3.5 w-3.5 text-[var(--muted-foreground)] mr-1" />
                {post.tags.map((t) => (
                  <Badge key={t} variant="outline" size="sm" className="text-xs">
                    #{t}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* Sticky Table of Contents */}
            <div className="sticky top-20 rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] p-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
                <BookOpen className="h-4 w-4 text-[var(--primary)]" />
                Table of Contents
              </div>

              <nav className="space-y-1.5 text-xs">
                {post.tableOfContents.map((toc) => (
                  <a
                    key={toc.id}
                    href={`#${toc.id}`}
                    className="block py-1 text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors line-clamp-1"
                  >
                    {toc.title}
                  </a>
                ))}
              </nav>

              <div className="pt-4 border-t border-[var(--border)] space-y-3">
                <div className="text-[11px] font-semibold text-[var(--foreground)]">
                  Explore Related Prompts
                </div>
                <Link
                  href="/prompts"
                  className="inline-flex items-center gap-1 text-xs text-[var(--primary)] hover:underline font-medium"
                >
                  Browse Prompt Directory <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            {/* Related Articles */}
            {relatedPosts.length > 0 && (
              <div className="rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--card)] p-5 space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
                  Related Publications
                </div>
                <div className="space-y-3">
                  {relatedPosts.map((r) => (
                    <Link
                      key={r.id}
                      href={`/blog/${r.slug}`}
                      className="group block space-y-1 text-xs"
                    >
                      <div className="font-medium text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                        {r.title}
                      </div>
                      <div className="text-[11px] text-[var(--muted-foreground)]">
                        {r.readingTime}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </Container>
    </article>
  );
}
