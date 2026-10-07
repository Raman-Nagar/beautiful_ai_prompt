import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { getAllParameters, getParameterBySlug } from "@/lib/data/parameters";
import { constructMetadata } from "@/lib/seo";
import { generateFaqJsonLd } from "@/lib/structured-data";
import {
  Sliders,
  Terminal,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface ParameterPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const parameters = getAllParameters();
  return parameters.map((param) => ({
    slug: param.slug,
  }));
}

export async function generateMetadata({
  params,
}: ParameterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const param = getParameterBySlug(slug);
  if (!param) return {};

  return constructMetadata({
    title: `${param.name} Guide & Calibration Values — ${param.modelName}`,
    description: param.shortDescription,
    path: `/parameters/${param.slug}`,
    keywords: [
      `${param.flag} guide`,
      `${param.modelName} ${param.flag}`,
      `${param.name} calibration`,
      "midjourney parameters",
      "AI prompt engineering flags",
    ],
  });
}

export default async function ParameterDetailPage({
  params,
}: ParameterPageProps) {
  const { slug } = await params;
  const param = getParameterBySlug(slug);

  if (!param) {
    notFound();
  }

  const faqSchema = generateFaqJsonLd(param.faq);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="py-10 sm:py-14 bg-[var(--background)] min-h-screen">
        <Container>
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
              <li>
                <Link href="/" className="hover:text-[var(--foreground)] transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/parameters" className="hover:text-[var(--foreground)] transition-colors">
                  Parameters
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[var(--foreground)] font-medium" aria-current="page">
                {param.name}
              </li>
            </ol>
          </nav>

          {/* Hero Header */}
          <div className="max-w-4xl mb-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="primary" size="sm" className="gap-1.5 py-1 px-3">
                <Sliders className="w-3.5 h-3.5 text-[var(--primary)]" />
                Parameter Reference
              </Badge>
              <span className="px-2.5 py-1 rounded-md bg-black/80 text-amber-400 font-mono text-xs font-bold border border-white/10">
                {param.flag}
              </span>
              <span className="text-xs text-[var(--muted-foreground)] font-medium">
                {param.modelName}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
              {param.name}
            </h1>

            <p className="text-base sm:text-xl font-medium text-[var(--primary)] leading-snug">
              Comprehensive Calibration Guide, Syntax &amp; Recommended Values
            </p>

            <p className="text-sm sm:text-base leading-relaxed text-[var(--muted-foreground)]">
              {param.shortDescription}
            </p>
          </div>

          {/* Telemetry HUD Box */}
          <div className="p-5 sm:p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] mb-12 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                Parameter Flag
              </span>
              <div className="font-mono text-sm font-bold text-amber-400">
                {param.flag}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                Default Setting
              </span>
              <div className="font-mono text-sm font-semibold text-[var(--foreground)]">
                {param.defaultValue}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                Allowed Range
              </span>
              <div className="font-mono text-sm font-semibold text-[var(--foreground)] truncate">
                {param.range}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                Target Architecture
              </span>
              <div className="font-semibold text-sm text-[var(--primary)]">
                {param.modelName}
              </div>
            </div>
          </div>

          {/* Syntax Code Box */}
          <div className="p-5 rounded-2xl border border-[var(--border)] bg-black/85 mb-12 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-[var(--primary)]" />
              Standard Command Syntax
            </span>
            <div className="font-mono text-xs sm:text-sm text-amber-300 select-all p-3 rounded-lg bg-white/5 border border-white/10">
              {param.syntax}
            </div>
          </div>

          {/* Detailed Explanation */}
          <div className="space-y-4 mb-14 max-w-4xl">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)]">
              How {param.name} Operates Internally
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[var(--muted-foreground)]">
              {param.detailedExplanation}
            </p>
          </div>

          {/* Recommended Values Calibration Table */}
          <div className="mb-14 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-[var(--border)]">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg sm:text-xl font-bold text-[var(--foreground)]">
                Recommended Value Calibration Matrix
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] text-[var(--muted-foreground)] font-semibold">
                    <th className="pb-3 pr-4">Setting / Syntax</th>
                    <th className="pb-3 pr-4">Target Scenario</th>
                    <th className="pb-3">Visual Result &amp; Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--foreground)]">
                  {param.recommendedValues.map((rec, idx) => (
                    <tr key={idx} className="hover:bg-[var(--secondary)]/20 transition-colors">
                      <td className="py-3 pr-4 font-mono font-bold text-amber-400">
                        {rec.value}
                      </td>
                      <td className="py-3 pr-4 font-semibold text-xs text-[var(--foreground)]">
                        {rec.scenario}
                      </td>
                      <td className="py-3 text-xs text-[var(--muted-foreground)] leading-relaxed">
                        {rec.visualImpact}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Common Mistakes & Pitfalls */}
          <div className="mb-14 rounded-2xl border border-red-500/20 bg-red-500/[0.03] p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 pb-2 text-red-400">
              <AlertTriangle className="w-5 h-5" />
              <h2 className="text-lg sm:text-xl font-bold">
                Common Mistakes &amp; Syntax Errors
              </h2>
            </div>
            <ul className="space-y-2.5">
              {param.commonMistakes.map((mistake, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--muted-foreground)]">
                  <span className="text-red-400 font-bold shrink-0 mt-0.5">•</span>
                  <span>{mistake}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sample Prompts */}
          <div className="mb-14 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)]">
              Production Prompt Examples
            </h2>
            <div className="space-y-3">
              {param.samplePrompts.map((sample, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] font-mono text-xs sm:text-sm text-zinc-200 select-all leading-relaxed"
                >
                  {sample}
                </div>
              ))}
            </div>
          </div>

          {/* Test in Studio CTA */}
          <div className="mb-16 p-6 sm:p-8 rounded-2xl border border-[var(--primary)]/30 bg-gradient-to-r from-[var(--primary)]/10 via-[var(--card)] to-[var(--secondary)]/40 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1.5 text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-bold text-[var(--foreground)]">
                Ready to experiment with {param.flag}?
              </h3>
              <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
                Launch the Visual Prompt Compiler to test real-world camera optics, lighting, and parameters in real time.
              </p>
            </div>
            <Link
              href={`/tools/prompt-generator?engine=${param.model}`}
              className="py-3 px-6 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-bold text-xs sm:text-sm hover:opacity-95 transition-all flex items-center gap-2 shadow-md shrink-0"
            >
              <span>Test in Compiler Studio</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* FAQs */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-10 mb-16">
            <div className="flex items-center gap-2 mb-6 text-[var(--foreground)]">
              <HelpCircle className="w-5 h-5 text-[var(--primary)]" />
              <h2 className="text-xl sm:text-2xl font-bold">
                {param.name} Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              {param.faq.map((faq, idx) => (
                <div key={idx} className="space-y-2 pb-5 border-b border-[var(--border-subtle)] last:border-0">
                  <h3 className="text-sm sm:text-base font-bold text-[var(--foreground)]">
                    {faq.question}
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
