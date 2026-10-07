import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PromptTranspilerStudio } from "@/components/tools/prompt-transpiler-studio";
import { constructMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/canonical";
import { SITE_NAME } from "@/lib/structured-data";
import {
  ArrowLeftRight,
  Sparkles,
  Layers,
  Cpu,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Universal AI Prompt Transpiler & Syntax Converter — Midjourney, FLUX, SDXL",
  description:
    "Free bidirectional AI prompt syntax transpiler. Automatically convert Midjourney v6.1 CLI flags into FLUX.1 natural language, SDXL positive/negative arrays, and DALL-E 3 narrative paragraphs.",
  path: "/tools/prompt-transpiler",
  keywords: [
    "prompt transpiler",
    "convert Midjourney to FLUX",
    "Midjourney to Stable Diffusion",
    "AI prompt syntax converter",
    "FLUX flow matching prompt converter",
    "prompt format converter",
  ],
});

export default function PromptTranspilerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Universal AI Prompt Transpiler & Syntax Converter",
    url: `${SITE_URL}/tools/prompt-transpiler`,
    description:
      "Interactive studio for transpiling prompt syntax between Midjourney v6.1, FLUX.1 Dev, Stable Diffusion XL, and DALL-E 3 with automatic flag and token restructuring.",
    applicationCategory: "DesignApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
                <Link href="/models" className="hover:text-[var(--foreground)] transition-colors">
                  Tools
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[var(--foreground)] font-medium" aria-current="page">
                Universal Prompt Transpiler
              </li>
            </ol>
          </nav>

          {/* Hero Header */}
          <div className="max-w-4xl mb-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="primary" size="sm" className="gap-1.5 py-1 px-3">
                <ArrowLeftRight className="w-3.5 h-3.5 text-[var(--primary)]" />
                Cross-Architecture Engine
              </Badge>
              <Badge
                variant="outline"
                size="sm"
                className="font-mono text-xs text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
              >
                100% Client-Side
              </Badge>
              <span className="text-xs text-[var(--muted-foreground)] font-medium">
                Zero Syntax Degradation
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
              Universal AI Prompt Transpiler &amp; Model Converter
            </h1>

            <p className="text-base sm:text-xl font-medium text-[var(--primary)] leading-snug">
              Convert Prompts Between Midjourney, FLUX.1, SDXL &amp; DALL-E in 1 Click
            </p>

            <p className="text-sm sm:text-base leading-relaxed text-[var(--muted-foreground)]">
              Never retype or manually reformat prompts when switching generative models.
              Our compiler parses optical parameters, aspect ratio flags, negative elements,
              and style tokens—rewriting them into the exact linguistic conditioning format
              optimized for each target architecture.
            </p>
          </div>

          {/* Main Studio Component */}
          <div className="mb-16">
            <React.Suspense
              fallback={
                <div className="h-96 rounded-xl border border-[var(--border)] bg-[var(--card)] animate-pulse flex items-center justify-center text-xs text-[var(--muted-foreground)]">
                  Loading prompt transpiler studio...
                </div>
              }
            >
              <PromptTranspilerStudio />
            </React.Suspense>
          </div>

          {/* Technical Guide: Why Transpilation Matters */}
          <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--secondary)]/40 via-[var(--background)] to-[var(--secondary)]/20 p-6 sm:p-10 mb-16">
            <div className="max-w-3xl space-y-4 mb-8">
              <Badge
                variant="outline"
                size="sm"
                className="text-xs font-mono border-[var(--primary)]/30 text-[var(--primary)]"
              >
                Architecture Guide
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
                Why Cross-Model Prompt Transpilation is Critical
              </h2>
              <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
                Generative models do not share a common prompt tokenizer. Pasting a Midjourney prompt
                into FLUX or Stable Diffusion degrades image quality due to fundamental architectural differences:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-5 space-y-3 bg-[var(--card)]/80">
                <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
                  <Sparkles className="w-4 h-4" />
                  <h3>Midjourney v6.1 (Tag Shorthand)</h3>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Trained on CLIP text encoders prioritizing concise, comma-separated keywords and
                  isolated trailing CLI flags (<code className="text-amber-300">--ar</code>,{" "}
                  <code className="text-amber-300">--stylize</code>). Conversational filler confuses its attention map.
                </p>
              </Card>

              <Card className="p-5 space-y-3 bg-[var(--card)]/80">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                  <Layers className="w-4 h-4" />
                  <h3>FLUX.1 (Flow Matching)</h3>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Uses a massive T5-XXL language encoder that interprets grammatical syntax and complete
                  sentences. It natively ignores negative prompts and prints raw CLI flags into the image
                  canvas if left unstripped.
                </p>
              </Card>

              <Card className="p-5 space-y-3 bg-[var(--card)]/80">
                <div className="flex items-center gap-2 text-sm font-bold text-blue-400">
                  <Cpu className="w-4 h-4" />
                  <h3>SDXL (Dual Conditioning)</h3>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Requires strict dual-text-encoder positive/negative conditioning arrays and resolution-bucketing
                  alignment (e.g. 1344x768) along with explicit inference steps and CFG guidance.
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
