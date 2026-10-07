import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PromptGeneratorStudio } from "@/components/tools/prompt-generator-studio";
import { constructMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/canonical";
import { SITE_NAME } from "@/lib/structured-data";
import {
  Sliders,
  Camera,
  Sun,
  Layers,
  Compass,
  Cpu,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "AI Visual Prompt Generator & Parameter Compiler — Midjourney, FLUX, SDXL",
  description:
    "Free modular prompt generator for Midjourney v6.1, FLUX.1, and SDXL. Customize camera optics, lighting angles, film stock, aspect ratios, and parameter flags in real time.",
  path: "/tools/prompt-generator",
  keywords: [
    "AI prompt generator",
    "Midjourney prompt builder",
    "FLUX prompt customizer",
    "camera lens AI prompt",
    "photorealistic AI generator",
    "aspect ratio prompt compiler",
  ],
});

export default function PromptGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AI Visual Prompt Generator & Parameter Compiler",
    url: `${SITE_URL}/tools/prompt-generator`,
    description:
      "Interactive studio for compiling high-fidelity prompts for Midjourney v6.1, FLUX.1, SDXL, and DALL-E 3 with optical camera, lighting, and aspect ratio controls.",
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
                Visual Prompt Generator
              </li>
            </ol>
          </nav>

          {/* Hero Header */}
          <div className="max-w-4xl mb-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="primary" size="sm" className="gap-1.5 py-1 px-3">
                <Sliders className="w-3.5 h-3.5 text-[var(--primary)]" />
                Interactive Studio
              </Badge>
              <Badge variant="outline" size="sm" className="font-mono text-xs text-amber-400 border-amber-500/30 bg-amber-500/10">
                Dual-Engine Compiler
              </Badge>
              <span className="text-xs text-[var(--muted-foreground)] font-medium">
                Real-Time Syntax Formatting
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
              Visual Prompt Generator &amp; Parameter Compiler
            </h1>

            <p className="text-base sm:text-xl font-medium text-[var(--primary)] leading-snug">
              Build Production-Grade Photographic &amp; Generative Art Prompts in Seconds
            </p>

            <p className="text-sm sm:text-base leading-relaxed text-[var(--muted-foreground)]">
              Eliminate prompt guesswork and outdated keyword spam. Select real-world camera optics,
              lighting geometry, historical film stocks, and composition grids to instantly compile
              syntactically valid prompts formatted specifically for Midjourney v6.1, FLUX.1, SDXL, or DALL-E 3.
            </p>
          </div>

          {/* Main Studio Component */}
          <div className="mb-16">
            <React.Suspense
              fallback={
                <div className="h-96 rounded-xl border border-[var(--border)] bg-[var(--card)] animate-pulse flex items-center justify-center text-xs text-[var(--muted-foreground)]">
                  Loading prompt compiler studio...
                </div>
              }
            >
              <PromptGeneratorStudio />
            </React.Suspense>
          </div>

          {/* Educational Guide: Anatomy of a Photorealistic Prompt */}
          <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--secondary)]/40 via-[var(--background)] to-[var(--secondary)]/20 p-6 sm:p-10 mb-16">
            <div className="max-w-3xl space-y-4 mb-8">
              <Badge variant="outline" size="sm" className="text-xs font-mono border-[var(--primary)]/30 text-[var(--primary)]">
                Theory &amp; Workflow
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
                The 4 Pillars of Diffusion Prompt Engineering
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[var(--muted-foreground)]">
                Modern diffusion models (FLUX.1, Midjourney v6.1) were trained on extensive photographic catalogs
                and cinematic datasets. They don&apos;t require generic adjectives like &quot;hyperrealistic 8k&quot;—they
                require concrete physical optical specifications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-5 bg-[var(--card)] border-[var(--border)]">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
                  <Camera className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-[var(--foreground)] mb-1">1. Optical Hardware</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Specify exact focal lengths and lenses (e.g. <code>Sony 85mm f/1.4</code> for portraits, <code>Canon 24mm Tilt-Shift</code> for architecture) to control depth of field and barrel distortion.
                </p>
              </Card>

              <Card className="p-5 bg-[var(--card)] border-[var(--border)]">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 mb-3">
                  <Sun className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-[var(--foreground)] mb-1">2. Lighting Geometry</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Name the exact lighting setup (e.g. <code>Rembrandt 45° triangle</code>, <code>Clamshell beauty dish</code>, <code>Low golden hour rim-light</code>) to sculpt subject shadows accurately.
                </p>
              </Card>

              <Card className="p-5 bg-[var(--card)] border-[var(--border)]">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3">
                  <Layers className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-[var(--foreground)] mb-1">3. Analog Medium</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Chemical film stocks like <code>Kodak Portra 400</code> and <code>Ilford HP5</code> instruct the latent diffusion solver to produce organic grain and authentic tonal curves without plastic skin.
                </p>
              </Card>

              <Card className="p-5 bg-[var(--card)] border-[var(--border)]">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-3">
                  <Cpu className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-[var(--foreground)] mb-1">4. Engine Tokens</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Append precise flags (e.g. <code>--v 6.1 --ar 16:9 --stylize 200</code>) isolated at the end of the prompt to prevent CLI argument parse errors.
                </p>
              </Card>
            </div>
          </div>

          {/* Cross-Promotion Tool Banner */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-[var(--border)] bg-gradient-to-r from-amber-500/[0.04] to-transparent flex flex-col justify-between">
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                  <Compass className="w-4 h-4" />
                  Composition Ruler Tool
                </div>
                <h3 className="text-lg font-bold text-[var(--foreground)]">
                  Calibrate Output Framing with SVG Grids
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  After generating your image, test focal point placement against the Rule of Thirds and Fibonacci Golden Spiral.
                </p>
              </div>

              <Link
                href="/tools/composition-ruler"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300"
              >
                Launch Composition Ruler Studio →
              </Link>
            </div>

            <div className="p-6 rounded-2xl border border-[var(--border)] bg-gradient-to-r from-emerald-500/[0.04] to-transparent flex flex-col justify-between">
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                  <Sliders className="w-4 h-4" />
                  Model Guides &amp; Cheat Sheets
                </div>
                <h3 className="text-lg font-bold text-[var(--foreground)]">
                  Explore Model-Specific Parameter Silos
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Deep-dive into individual model parameter tables for Midjourney, FLUX.1, Claude 3.7, ChatGPT, and SDXL.
                </p>
              </div>

              <Link
                href="/models"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
              >
                Explore AI Models Hub →
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
