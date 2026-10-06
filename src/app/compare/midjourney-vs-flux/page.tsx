import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ComparisonSlider } from "@/components/compare/comparison-slider";
import { constructMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/canonical";
import { SITE_NAME } from "@/lib/structured-data";
import {
  Trophy,
  CheckCircle2,
  Camera,
  Layers,
  Zap,
  Compass,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Midjourney v6.1 vs FLUX.1 Dev: Head-to-Head Photorealism Benchmark",
  description:
    "Interactive side-by-side benchmark comparing Midjourney v6.1 and FLUX.1 Dev across prompt adherence, skin micro-texture, lighting, anatomy, and in-image typography.",
  path: "/compare/midjourney-vs-flux",
  keywords: [
    "Midjourney vs FLUX",
    "FLUX vs Midjourney photorealism",
    "Midjourney v6.1 comparison",
    "FLUX.1 Dev benchmark",
    "AI image generator comparison",
    "diffusion model prompt fidelity",
  ],
});

export default function MidjourneyVsFluxPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Midjourney v6.1 vs FLUX.1 Dev: The Head-to-Head Generative Benchmark",
    description:
      "A comprehensive technical comparison of Midjourney v6.1 and FLUX.1 Dev evaluating prompt adherence, skin micro-textures, in-image typography, and parameter ergonomics.",
    url: `${SITE_URL}/compare/midjourney-vs-flux`,
    inLanguage: "en-US",
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: [
      {
        "@type": "SoftwareApplication",
        name: "Midjourney",
        applicationCategory: "MultimediaApplication",
      },
      {
        "@type": "SoftwareApplication",
        name: "FLUX.1",
        applicationCategory: "MultimediaApplication",
      },
    ],
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
                  Models
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[var(--foreground)] font-medium" aria-current="page">
                Midjourney vs FLUX.1
              </li>
            </ol>
          </nav>

          {/* Hero Header */}
          <div className="max-w-4xl mb-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="primary" size="sm" className="gap-1.5 py-1 px-3">
                <Trophy className="w-3.5 h-3.5 text-[var(--primary)]" />
                Benchmark Study
              </Badge>
              <Badge variant="outline" size="sm" className="font-mono text-xs">
                Updated March 2026
              </Badge>
              <span className="text-xs text-[var(--muted-foreground)] font-medium">
                100+ Test Prompts Evaluated
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
              Midjourney v6.1 vs. FLUX.1 Dev
            </h1>

            <p className="text-base sm:text-xl font-medium text-[var(--primary)] leading-snug">
              The Definitive Head-to-Head Photorealism, Texture &amp; Prompt Fidelity Benchmark
            </p>

            <p className="text-sm sm:text-base leading-relaxed text-[var(--muted-foreground)]">
              The battle for state-of-the-art visual generation has centered on two contrasting philosophies:
              Midjourney&apos;s aesthetic-first latent diffusion engine vs. Black Forest Labs&apos; 12B rectified flow
              transformer (FLUX.1). Below is our interactive side-by-side analysis inspecting identical prompt
              conditioning across photographic lighting, human skin micro-texture, and typography.
            </p>
          </div>

          {/* Interactive Comparison Slider */}
          <div className="mb-16">
            <ComparisonSlider />
          </div>

          {/* Executive Scorecard */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-6 flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              Executive Benchmark Scorecard
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Category 1 */}
              <Card className="p-5 border-emerald-500/20 bg-emerald-500/[0.02]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                    Prompt Adherence &amp; Logic
                  </span>
                  <Badge variant="outline" size="sm" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-mono text-[11px]">
                    Winner: FLUX.1
                  </Badge>
                </div>
                <h3 className="font-bold text-sm text-[var(--foreground)] mb-1.5">Spatial Prepositions &amp; Complex Layouts</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  FLUX.1 correctly arranges 3+ distinct subjects in relative space (&quot;behind&quot;, &quot;to the left of&quot;) where
                  Midjourney frequently merges or hallucinates attributes.
                </p>
              </Card>

              {/* Category 2 */}
              <Card className="p-5 border-amber-500/20 bg-amber-500/[0.02]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                    Atmospheric Lighting &amp; Flare
                  </span>
                  <Badge variant="outline" size="sm" className="bg-amber-500/10 text-amber-400 border-amber-500/30 font-mono text-[11px]">
                    Winner: Midjourney
                  </Badge>
                </div>
                <h3 className="font-bold text-sm text-[var(--foreground)] mb-1.5">Cinematic Glare &amp; Volumetric Mood</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Midjourney v6.1 remains unchallenged in Panavision streak flares, moody atmospheric rain mist, and
                  dramatic film grain tonal rolloff.
                </p>
              </Card>

              {/* Category 3 */}
              <Card className="p-5 border-emerald-500/20 bg-emerald-500/[0.02]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                    In-Image Typography
                  </span>
                  <Badge variant="outline" size="sm" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-mono text-[11px]">
                    Winner: FLUX.1
                  </Badge>
                </div>
                <h3 className="font-bold text-sm text-[var(--foreground)] mb-1.5">English Text &amp; Signage Spelling</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  FLUX.1 renders crisp, correctly spelled words inside double quotes across storefronts and labels. Midjourney v6.1
                  still suffers occasional typographic errors.
                </p>
              </Card>
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[var(--primary)]" />
              Technical Specification Matrix
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mb-6">
              Architectural differences between Midjourney v6.1 and FLUX.1 Dev.
            </p>

            <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-[var(--secondary)]/60 text-[var(--foreground)] border-b border-[var(--border)] uppercase text-xs tracking-wider font-semibold">
                  <tr>
                    <th className="py-3 px-4">Evaluation Dimension</th>
                    <th className="py-3 px-4 text-amber-400">Midjourney v6.1</th>
                    <th className="py-3 px-4 text-emerald-400">FLUX.1 Dev</th>
                    <th className="py-3 px-4">Architectural Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)] text-[var(--muted-foreground)]">
                  <tr className="hover:bg-[var(--secondary)]/20 transition-colors">
                    <td className="py-3 px-4 font-semibold text-[var(--foreground)]">Core Architecture</td>
                    <td className="py-3 px-4">Proprietary Latent Diffusion</td>
                    <td className="py-3 px-4 font-medium text-[var(--foreground)]">12B Rectified Flow (MMDiT)</td>
                    <td className="py-3 px-4 text-xs">FLUX uses unified text &amp; vision transformer blocks.</td>
                  </tr>
                  <tr className="hover:bg-[var(--secondary)]/20 transition-colors">
                    <td className="py-3 px-4 font-semibold text-[var(--foreground)]">Open Weights &amp; Local GPU</td>
                    <td className="py-3 px-4 text-rose-400 font-medium">Closed SaaS Only (Discord / Web)</td>
                    <td className="py-3 px-4 text-emerald-400 font-medium">100% Open Weights (Dev/Schnell)</td>
                    <td className="py-3 px-4 text-xs">FLUX runs locally via ComfyUI with complete privacy.</td>
                  </tr>
                  <tr className="hover:bg-[var(--secondary)]/20 transition-colors">
                    <td className="py-3 px-4 font-semibold text-[var(--foreground)]">Parameter Flags</td>
                    <td className="py-3 px-4 font-mono text-xs">--ar, --sref, --cref, --stylize, --chaos</td>
                    <td className="py-3 px-4 text-xs">Guidance scale, step count, resolution</td>
                    <td className="py-3 px-4 text-xs">Midjourney has superior pipeline token modifiers.</td>
                  </tr>
                  <tr className="hover:bg-[var(--secondary)]/20 transition-colors">
                    <td className="py-3 px-4 font-semibold text-[var(--foreground)]">Skin &amp; Hand Anatomy</td>
                    <td className="py-3 px-4">High realism (requires prompt care)</td>
                    <td className="py-3 px-4 font-medium text-emerald-400">Superior native hand &amp; joint fidelity</td>
                    <td className="py-3 px-4 text-xs">FLUX produces fewer mutant fingers and plastic doll artifacts.</td>
                  </tr>
                  <tr className="hover:bg-[var(--secondary)]/20 transition-colors">
                    <td className="py-3 px-4 font-semibold text-[var(--foreground)]">Style Transfer Pipeline</td>
                    <td className="py-3 px-4 font-medium text-amber-400">--sref &amp; --cref character lock</td>
                    <td className="py-3 px-4">Community LoRA adapter fine-tuning</td>
                    <td className="py-3 px-4 text-xs">Midjourney is faster for instant visual moodboard matching.</td>
                  </tr>
                  <tr className="hover:bg-[var(--secondary)]/20 transition-colors">
                    <td className="py-3 px-4 font-semibold text-[var(--foreground)]">Monthly Pricing</td>
                    <td className="py-3 px-4 font-mono">$10 to $120 / month</td>
                    <td className="py-3 px-4 font-mono">Free local execution; API per image</td>
                    <td className="py-3 px-4 text-xs">FLUX eliminates recurring subscriptions for GPU owners.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Decision Guide: When to Pick Which Model */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <Card className="p-6 border-amber-500/20 bg-amber-500/[0.02] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3 text-amber-400 font-bold">
                  <Camera className="w-5 h-5" />
                  <h3>Choose Midjourney v6.1 When:</h3>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--muted-foreground)]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>You need instant cinematic moodboards with rich Panavision or Leica photographic flare.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>You need consistent character generation across multiple shots via the <code>--cref</code> parameter.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>You prefer rapid prompt exploration without tuning guidance scales or local GPU setups.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border)]">
                <Link
                  href="/models/midjourney"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                >
                  Explore Midjourney Parameter Guide &amp; Prompts →
                </Link>
              </div>
            </Card>

            <Card className="p-6 border-emerald-500/20 bg-emerald-500/[0.02] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3 text-emerald-400 font-bold">
                  <Zap className="w-5 h-5" />
                  <h3>Choose FLUX.1 Dev When:</h3>
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--muted-foreground)]">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Your scene requires readable signage, branded product packaging, or legible typography.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>You need exact spatial preposition logic (multiple characters interacting in specific positions).</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>You require commercial data privacy with 100% offline local GPU execution via ComfyUI.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border)]">
                <Link
                  href="/models/flux"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
                >
                  Explore FLUX.1 Prompt Guide &amp; Prompts →
                </Link>
              </div>
            </Card>
          </div>

          {/* Composition Ruler Cross-Promotion */}
          <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-r from-[var(--secondary)]/40 via-[var(--background)] to-[var(--secondary)]/20 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400">
                <Compass className="w-4 h-4" />
                Interactive Calibration Studio
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-[var(--foreground)]">
                Calibrate Your Generations with Composition Ruler
              </h3>
              <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                Test both Midjourney and FLUX outputs against the Rule of Thirds, Golden Spiral, and Center Symmetry
                grids with our zero-install client tool.
              </p>
            </div>

            <Link
              href="/tools/composition-ruler"
              className="px-5 py-2.5 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] text-xs sm:text-sm font-semibold hover:opacity-90 transition-opacity shrink-0"
            >
              Launch Composition Ruler →
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
}
