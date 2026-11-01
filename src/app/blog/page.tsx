import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { getAllBlogPosts } from "@/lib/data/blog";
import { constructMetadata } from "@/lib/seo";
import {
  Sparkles,
  BookOpen,
  Clock,
  Calendar,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "AI Prompt Engineering & Productivity Blog | Beautiful AI Prompt",
  description:
    "Authoritative research, practical playbooks, and step-by-step guides for training AI models with prompts, Shopify Flow automations, professional headshots, and Gemini workflows.",
  path: "/blog",
  keywords: [
    "AI prompt blog",
    "prompt engineering blog",
    "what practices are beneficial for training ai models with prompts",
    "shopify flow ai assistant prompt guide",
    "chatgpt prompt for professional headshot",
    "gemini birthday prompts",
    "in-context learning tutorials",
  ],
});

export default function BlogIndexPage() {
  const posts = getAllBlogPosts();
  const featuredPosts = posts.filter((p) => p.featured);

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 sm:py-16">
      {/* Semantic Breadcrumbs with JSON-LD */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Blog" },
        ]}
      />

      <Container className="pt-6">
        {/* Header Hero Section */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2">
            <Badge variant="primary" size="sm">
              <Sparkles className="h-3 w-3 mr-1" />
              Engineering Insights & Playbooks
            </Badge>
            <span className="text-xs text-[var(--muted-foreground)]">
              {posts.length} Production Articles
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--foreground)]">
            AI Prompt Engineering & Automation Blog
          </h1>

          <p className="text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed">
            In-depth architectural breakdowns, step-by-step e-commerce workflows,
            photorealistic prompt recipes, and foundational research for modern AI models.
          </p>
        </div>

        {/* Featured Posts Grid */}
        <div className="mb-14 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)] flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[var(--primary)]" />
              Featured Research & Guides
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPosts.map((post) => (
              <Card
                key={post.id}
                className="group relative flex flex-col justify-between p-6 sm:p-8 border-[var(--border)] hover:border-[var(--primary)]/50 transition-all duration-200"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Badge variant="secondary" size="sm">
                      {post.category}
                    </Badge>
                    <div className="flex items-center gap-3 text-xs text-[var(--muted-foreground)]">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {post.readingTime}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(post.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-[var(--muted-foreground)] line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[var(--border)] flex items-center justify-between">
                  <div className="text-xs text-[var(--muted-foreground)]">
                    By <span className="font-medium text-[var(--foreground)]">{post.author.name}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--primary)] group-hover:translate-x-1 transition-transform">
                    Read Article <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* All Articles Section */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)] flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-[var(--primary)]" />
            All Publications
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="group relative p-6 border-[var(--border)] hover:border-[var(--border-strong)] transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" size="sm" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-[var(--muted-foreground)]">
                      {post.readingTime}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)] line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-[var(--primary)]">
                    View <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
