import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import { getAllDeveloperRules } from "@/lib/data/rules";
import { constructMetadata } from "@/lib/seo";
import {
  Code2,
  Terminal,
  FileCode,
  Download,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Developer AI Agent Rules & Cursorrules Directory | Beautiful AI Prompt",
  description:
    "Production-tested .cursorrules, CLAUDE.md, and AGENTS.md configurations for Next.js 15, React 19, TypeScript, Python FastAPI, Tailwind v4, Node.js, and PostgreSQL.",
  path: "/rules",
  keywords: [
    "cursorrules",
    "developer agent rules",
    "claude md",
    "agents md",
    "cursor rules directory",
    "nextjs cursorrules",
    "react cursor rules",
    "typescript system prompt",
    "fastapi cursor rules",
  ],
});

export default function RulesIndexPage() {
  const rules = getAllDeveloperRules();

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 sm:py-16">
      {/* Semantic Breadcrumbs with JSON-LD */}
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Developer Agent Rules" },
        ]}
      />

      <Container className="pt-6">
        {/* Header Hero Section */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2">
            <Badge variant="primary" size="sm">
              <Terminal className="h-3 w-3 mr-1" />
              AI Agent Infrastructure
            </Badge>
            <span className="text-xs text-[var(--muted-foreground)]">
              {rules.length} Tech Stacks Supported
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--foreground)]">
            Developer AI Agent Rules &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 dark:from-emerald-400 dark:via-teal-400 dark:to-cyan-400">
              Cursorrules
            </span>
          </h1>

          <p className="text-lg text-[var(--muted-foreground)] leading-relaxed">
            Stop AI coding agents from generating deprecated APIs, introducing security vulnerabilities, or violating your architecture. Download production-ready <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">.cursorrules</code>, <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">CLAUDE.md</code>, and <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">AGENTS.md</code> files.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[var(--border)]">
            <div className="flex items-center gap-2 text-sm text-[var(--foreground)]">
              <FileCode className="h-4 w-4 text-emerald-500 shrink-0" />
              <span>Multi-Format Support</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--foreground)]">
              <Download className="h-4 w-4 text-teal-500 shrink-0" />
              <span>1-Click Direct Download</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[var(--foreground)]">
              <ShieldCheck className="h-4 w-4 text-cyan-500 shrink-0" />
              <span>Architectural Invariants</span>
            </div>
          </div>
        </div>

        {/* Directory Grid */}
        <div className="space-y-8">
          <div className="flex items-center justify-between border-b border-[var(--border)] pb-4">
            <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
              <Code2 className="h-5 w-5 text-primary" />
              All Framework & Language Rules
            </h2>
            <span className="text-xs font-medium text-[var(--muted-foreground)]">
              Showing {rules.length} Rule Configurations
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rules.map((rule) => (
              <Link
                key={rule.id}
                href={`/rules/${rule.slug}`}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl"
              >
                <Card className="h-full flex flex-col justify-between p-6 transition-all duration-200 border border-[var(--border)] bg-[var(--card)] hover:border-primary/50 hover:shadow-lg">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        {rule.techCategory}
                      </span>
                      <span className="text-xs text-[var(--muted-foreground)]">
                        {rule.versionTarget}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-primary transition-colors line-clamp-2">
                      {rule.title}
                    </h3>

                    <p className="text-sm text-[var(--muted-foreground)] line-clamp-3 leading-relaxed">
                      {rule.summary}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {rule.files.map((f) => (
                        <span
                          key={f.fileName}
                          className="text-[11px] font-mono bg-[var(--muted)] text-[var(--muted-foreground)] px-2 py-0.5 rounded"
                        >
                          {f.fileName}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[var(--border)] flex items-center justify-between text-xs font-semibold text-primary">
                    <span>{rule.keyPrinciples.length} Enforced Rules</span>
                    <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      View Rule Config <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Educational Explainer */}
        <div className="mt-16 rounded-2xl border border-[var(--border)] bg-gradient-to-br from-emerald-50/50 via-teal-50/30 to-cyan-50/50 dark:from-emerald-950/20 dark:via-teal-950/10 dark:to-cyan-950/20 p-8 sm:p-10 space-y-4">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
            <ShieldCheck className="h-4 w-4" />
            <span>Why Agent Rules Matter</span>
          </div>
          <h2 className="text-2xl font-bold text-[var(--foreground)]">
            Taming LLM Hallucinations in Software Engineering
          </h2>
          <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed max-w-4xl">
            When AI coding assistants write code, they extrapolate from their training corpora, which often contain deprecated conventions from earlier major versions. Placing targeted rules files like <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">.cursorrules</code>, <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">CLAUDE.md</code>, or <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded">AGENTS.md</code> in your repository root injects authoritative system instructions directly into the agent&apos;s prompt context. This guarantees that every snippet generated adheres to your current framework versions, type safety constraints, and security standards.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <Link
              href="/matrix"
              className="inline-flex items-center text-xs font-medium text-primary hover:underline gap-1"
            >
              Explore Model × Persona Matrix <ArrowRight className="h-3 w-3" />
            </Link>
            <Link
              href="/prompts"
              className="inline-flex items-center text-xs font-medium text-primary hover:underline gap-1"
            >
              Browse All Prompts <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
