import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getAllParameters } from "@/lib/data/parameters";
import { constructMetadata } from "@/lib/seo";
import { generateFaqJsonLd } from "@/lib/structured-data";
import {
  Sliders,
  ArrowRight,
  Terminal,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "AI Model Parameter & CLI Flag Calibration Hub — Midjourney, FLUX, SDXL",
  description:
    "Complete reference directory for AI image model parameters. Deep calibration guides for Midjourney --sref, --cref, --stylize, --chaos, --style raw, FLUX guidance scale, and SDXL CFG scale.",
  path: "/parameters",
  keywords: [
    "Midjourney parameters",
    "Midjourney flags cheat sheet",
    "FLUX guidance scale",
    "SDXL CFG scale guide",
    "midjourney sref guide",
    "midjourney cref guide",
    "AI image generator CLI flags",
  ],
});

export default function ParametersIndexPage() {
  const parameters = getAllParameters();

  const faqs = [
    {
      question: "What are AI model parameters and CLI flags?",
      answer:
        "Parameters (such as --stylize, --sref, or guidance_scale) are mathematical hyper-parameters passed to generative diffusion models that control aesthetic variance, prompt compliance, image aspect ratio, or reference image conditioning without changing the core text prompt.",
    },
    {
      question: "Which model parameters are most important for photographic realism?",
      answer:
        "For Midjourney v6.1, using --style raw combined with moderate stylization (--stylize 50 to 150) produces the most natural, unretouched results. For FLUX.1 Dev, keeping guidance_scale between 2.5 and 3.5 avoids plastic skin artifacts.",
    },
    {
      question: "Can Midjourney flags like --ar or --stylize be used in FLUX or DALL-E?",
      answer:
        "No. FLUX.1 and DALL-E 3 do not parse Midjourney CLI flags. Passing CLI flags into FLUX or DALL-E can result in the model printing the raw flag text onto the image. Use our Universal Prompt Transpiler to convert flags automatically.",
    },
  ];

  const faqSchema = generateFaqJsonLd(faqs);

  const modelBadgeConfig: Record<
    string,
    { label: string; color: string }
  > = {
    midjourney: {
      label: "Midjourney v6.1",
      color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    },
    flux: {
      label: "FLUX.1 Dev",
      color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    },
    "stable-diffusion": {
      label: "Stable Diffusion XL",
      color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    },
    "dall-e": {
      label: "DALL-E 3",
      color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    },
  };

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
              <li className="text-[var(--foreground)] font-medium" aria-current="page">
                Parameters &amp; CLI Flags
              </li>
            </ol>
          </nav>

          {/* Hero Header */}
          <div className="max-w-4xl mb-12 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="primary" size="sm" className="gap-1.5 py-1 px-3">
                <Sliders className="w-3.5 h-3.5 text-[var(--primary)]" />
                Technical Directory
              </Badge>
              <Badge
                variant="outline"
                size="sm"
                className="font-mono text-xs text-amber-400 border-amber-500/30 bg-amber-500/10"
              >
                Calibration Matrix
              </Badge>
              <span className="text-xs text-[var(--muted-foreground)] font-medium">
                Midjourney • FLUX • SDXL
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
              AI Model Parameter &amp; CLI Flag Calibration Hub
            </h1>

            <p className="text-base sm:text-xl font-medium text-[var(--primary)] leading-snug">
              Master Mathematical Weights, Reference Anchors &amp; Aesthetic Levers
            </p>

            <p className="text-sm sm:text-base leading-relaxed text-[var(--muted-foreground)]">
              Model parameters are the secret to moving beyond unpredictable AI roulette.
              Calibrate exact syntax, reference weights, guidance scales, and stylistic flags
              across Midjourney v6.1, FLUX.1 Dev, and Stable Diffusion XL with dedicated benchmarks
              and common mistake diagnoses.
            </p>
          </div>

          {/* Parameter Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {parameters.map((param) => {
              const cfg = modelBadgeConfig[param.model] || {
                label: param.modelName,
                color: "text-zinc-400 border-zinc-500/30 bg-zinc-500/10",
              };

              return (
                <Card
                  key={param.slug}
                  className="p-6 flex flex-col justify-between hover:border-[var(--primary)]/60 transition-all hover:shadow-md group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-black/80 text-amber-400 font-mono text-xs font-bold border border-white/10">
                        {param.flag}
                      </span>
                      <Badge variant="outline" size="sm" className={cfg.color}>
                        {cfg.label}
                      </Badge>
                    </div>

                    <div>
                      <h2 className="text-base font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                        <Link href={`/parameters/${param.slug}`}>
                          {param.name}
                        </Link>
                      </h2>
                      <p className="text-xs text-[var(--muted-foreground)] line-clamp-3 mt-1.5 leading-relaxed">
                        {param.shortDescription}
                      </p>
                    </div>

                    {/* Telemetry Chips */}
                    <div className="p-3 rounded-lg bg-[var(--secondary)]/30 border border-[var(--border-subtle)] space-y-1.5 text-[11px]">
                      <div className="flex items-center justify-between">
                        <span className="text-[var(--muted-foreground)]">Default:</span>
                        <span className="font-mono font-medium text-[var(--foreground)]">
                          {param.defaultValue}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[var(--muted-foreground)]">Range:</span>
                        <span className="font-mono text-[var(--foreground)] line-clamp-1">
                          {param.range}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-5 mt-2 border-t border-[var(--border-subtle)] flex items-center justify-between">
                    <span className="text-[11px] text-[var(--muted-foreground)]">
                      {param.recommendedValues.length} Presets Calibrated
                    </span>
                    <Link
                      href={`/parameters/${param.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--primary)] group-hover:translate-x-0.5 transition-transform"
                    >
                      <span>Deep Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Quick Calibration Summary Matrix Table */}
          <div className="mb-16 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 pb-3 border-b border-[var(--border)]">
              <Terminal className="w-5 h-5 text-[var(--primary)]" />
              <h2 className="text-lg sm:text-xl font-bold text-[var(--foreground)]">
                Parameter Quick Calibration Cheat Sheet
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] text-[var(--muted-foreground)] font-semibold">
                    <th className="pb-3 pr-4">Parameter Flag</th>
                    <th className="pb-3 pr-4">Model</th>
                    <th className="pb-3 pr-4">Default</th>
                    <th className="pb-3 pr-4">Recommended Sweet Spot</th>
                    <th className="pb-3">Primary Effect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--foreground)]">
                  {parameters.map((p) => (
                    <tr key={p.slug} className="hover:bg-[var(--secondary)]/20 transition-colors">
                      <td className="py-3 pr-4 font-mono font-bold text-amber-400">
                        <Link href={`/parameters/${p.slug}`} className="hover:underline">
                          {p.flag}
                        </Link>
                      </td>
                      <td className="py-3 pr-4 text-xs text-[var(--muted-foreground)]">
                        {p.modelName}
                      </td>
                      <td className="py-3 pr-4 font-mono text-xs">{p.defaultValue}</td>
                      <td className="py-3 pr-4 font-mono text-xs text-emerald-400">
                        {p.recommendedValues[0]?.value || p.range}
                      </td>
                      <td className="py-3 text-xs text-[var(--muted-foreground)] max-w-xs truncate">
                        {p.shortDescription}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-10 mb-16">
            <div className="flex items-center gap-2 mb-6 text-[var(--foreground)]">
              <HelpCircle className="w-5 h-5 text-[var(--primary)]" />
              <h2 className="text-xl sm:text-2xl font-bold">Frequently Asked Questions</h2>
            </div>

            <div className="space-y-6">
              {faqs.map((faq, idx) => (
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
