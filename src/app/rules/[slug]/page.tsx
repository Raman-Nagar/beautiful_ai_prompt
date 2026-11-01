import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { RuleFileViewer } from "@/components/rules/rule-file-viewer";
import { getAllDeveloperRules, getDeveloperRuleBySlug } from "@/lib/data/rules";
import {
  constructMetadata,
  generateRuleJsonLd,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
} from "@/lib/seo";
import {
  Terminal,
  Code2,
  CheckCircle2,
  FolderGit2,
  FileCode,
  HelpCircle,
  Bookmark,
  ShieldCheck,
} from "lucide-react";

interface RulePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const rules = getAllDeveloperRules();
  return rules.map((r) => ({
    slug: r.slug,
  }));
}

export async function generateMetadata({ params }: RulePageProps): Promise<Metadata> {
  const { slug } = await params;
  const rule = getDeveloperRuleBySlug(slug);

  if (!rule) {
    return {
      title: "Rule Configuration Not Found | Beautiful AI Prompt",
    };
  }

  return constructMetadata({
    title: rule.seoTitle,
    description: rule.seoDescription,
    path: `/rules/${rule.slug}`,
    keywords: rule.targetKeywords,
  });
}

export default async function RuleDetailPage({ params }: RulePageProps) {
  const { slug } = await params;
  const rule = getDeveloperRuleBySlug(slug);

  if (!rule) {
    notFound();
  }

  const allRules = getAllDeveloperRules();
  const relatedRules = allRules
    .filter((r) => r.slug !== rule.slug && (r.techCategory === rule.techCategory || rule.relatedRules.includes(r.slug)))
    .slice(0, 3);

  const ruleJsonLd = generateRuleJsonLd(rule);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Developer Agent Rules", url: "/rules" },
    { name: rule.title, url: `/rules/${rule.slug}` },
  ]);
  const faqJsonLd = generateFaqJsonLd(rule.faqs);

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 sm:py-16">
      {/* Structured Data Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ruleJsonLd) }}
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
          { label: "Developer Agent Rules", href: "/rules" },
          { label: rule.technology },
        ]}
      />

      <Container className="pt-6 space-y-12">
        {/* Header Hero Section */}
        <div className="max-w-4xl space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="primary" size="sm">
              <Terminal className="h-3 w-3 mr-1" />
              {rule.technology}
            </Badge>
            <Badge variant="outline" size="sm" className="capitalize">
              {rule.techCategory}
            </Badge>
            <span className="text-xs text-[var(--muted-foreground)]">
              Target: {rule.versionTarget}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
            {rule.title}
          </h1>

          <p className="text-xl font-medium text-emerald-600 dark:text-emerald-400">
            {rule.heroTagline}
          </p>

          <p className="text-base sm:text-lg text-[var(--muted-foreground)] leading-relaxed">
            {rule.summary}
          </p>

          <div className="pt-2 flex flex-wrap gap-2">
            {rule.targetKeywords.map((kw) => (
              <span
                key={kw}
                className="text-xs bg-[var(--muted)] text-[var(--muted-foreground)] px-2.5 py-1 rounded-md font-mono"
              >
                #{kw}
              </span>
            ))}
          </div>
        </div>

        {/* Interactive Rule Workbench */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-3">
            <div>
              <h2 className="text-2xl font-bold text-[var(--foreground)] flex items-center gap-2">
                <Code2 className="h-6 w-6 text-primary" />
                Configuration Workbench
              </h2>
              <p className="text-sm text-[var(--muted-foreground)]">
                Select your agent format below to preview, copy, or download the configuration file.
              </p>
            </div>
          </div>

          <RuleFileViewer files={rule.files} technologyName={rule.technology} />
        </div>

        {/* Key Principles Enforced */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-primary font-bold text-lg">
            <ShieldCheck className="h-5 w-5" />
            <h2>Architectural Principles Enforced</h2>
          </div>
          <p className="text-sm text-[var(--muted-foreground)]">
            When this configuration file is loaded into Cursor or Claude Code, the agent strictly enforces the following design invariants:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {rule.keyPrinciples.map((principle, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-1 shrink-0" />
                <p className="text-sm text-[var(--foreground)] leading-relaxed">{principle}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Installation & Setup Guide */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-primary font-bold text-lg">
              <FolderGit2 className="h-5 w-5" />
              <h2>Installation & Repository Setup</h2>
            </div>
            <p className="text-sm text-[var(--muted-foreground)]">
              {rule.installationGuide.pathRecommendation}
            </p>
          </div>

          <div className="space-y-3">
            {rule.installationGuide.steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 text-sm">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary shrink-0">
                  {idx + 1}
                </span>
                <span className="text-[var(--foreground)]">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Real-World Agent Scenarios */}
        {rule.examples && rule.examples.length > 0 && (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-primary font-bold text-lg">
                <FileCode className="h-5 w-5" />
                <h2>Verified Agent Behavior Examples</h2>
              </div>
              <p className="text-sm text-[var(--muted-foreground)]">
                Observe how the AI agent responds when prompted under these active rules.
              </p>
            </div>

            <div className="space-y-4">
              {rule.examples.map((ex, idx) => (
                <div key={idx} className="rounded-xl border border-[var(--border)] bg-[var(--muted)]/30 p-5 space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Scenario: {ex.scenario}
                  </div>
                  <div className="rounded-lg bg-background p-3 text-xs sm:text-sm font-mono border border-[var(--border)]">
                    <span className="text-muted-foreground">User prompt: </span>
                    <span className="text-[var(--foreground)]">&ldquo;{ex.prompt}&rdquo;</span>
                  </div>
                  <div className="text-xs sm:text-sm text-[var(--muted-foreground)] flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-[var(--foreground)]">Agent Behavior:</strong> {ex.agentBehavior}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQs */}
        {rule.faqs && rule.faqs.length > 0 && (
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 text-primary font-bold text-xl">
              <HelpCircle className="h-5 w-5" />
              <h2>Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {rule.faqs.map((faq, idx) => (
                <div key={idx} className="border-b border-[var(--border)]/60 pb-4 last:border-b-0 space-y-1.5">
                  <h3 className="text-base font-bold text-[var(--foreground)]">{faq.question}</h3>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contextual Internal Links */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--muted)]/20 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 text-primary font-bold text-lg">
            <Bookmark className="h-5 w-5" />
            <h2>Related Configurations & Resources</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div className="space-y-2">
              <h3 className="font-semibold text-[var(--foreground)]">Related Tech Stacks</h3>
              <ul className="space-y-1.5 text-[var(--muted-foreground)]">
                {relatedRules.map((rel) => (
                  <li key={rel.id}>
                    <Link href={`/rules/${rel.slug}`} className="text-primary hover:underline line-clamp-1">
                      → {rel.technology} Rules
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-[var(--foreground)]">Prompt Matrix Cross-Cuts</h3>
              <ul className="space-y-1.5 text-[var(--muted-foreground)]">
                {rule.relatedMatrixSlugs && rule.relatedMatrixSlugs.length > 0 ? (
                  rule.relatedMatrixSlugs.map((slug) => (
                    <li key={slug}>
                      <Link href={`/matrix/${slug}`} className="text-primary hover:underline line-clamp-1">
                        → {slug.replace(/-/g, " ")}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li>
                    <Link href="/matrix" className="text-primary hover:underline">
                      → Browse Model × Persona Matrix
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-[var(--foreground)]">Interactive Tools</h3>
              <ul className="space-y-1.5 text-[var(--muted-foreground)]">
                <li>
                  <Link href="/tools/token-counter" className="text-primary hover:underline">
                    → Token Counter & Cost Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/tools/prompt-builder" className="text-primary hover:underline">
                    → Prompt Architecture Builder
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
