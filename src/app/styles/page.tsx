import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { getAllVisualStyles, getPromptsByVisualStyle } from "@/lib/data/visual-styles";
import { generateStylesHubJsonLd, generateBreadcrumbJsonLd } from "@/lib/structured-data";
import { constructMetadata } from "@/lib/seo";
import {
  Camera,
  Sliders,
  Palette,
  ArrowRight,
  Aperture,
  Sparkles,
  Layers,
  Film,
  Compass,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Visual AI Prompt Styles Directory & Optics Hub — Cinematic, Architecture, Fashion",
  description:
    "Explore 6 curated visual generative AI styles: Cinematic Film, Documentary Photography, Architecture, High Fashion, Commercial Product, and 3D Digital Art. Complete with optical camera presets and lighting guidelines.",
  path: "/styles",
  keywords: [
    "visual AI prompt styles",
    "cinematic Midjourney prompts",
    "architectural AI photography",
    "FLUX portrait photography prompts",
    "fashion editorial AI prompts",
    "commercial product photography prompts",
    "isometric 3D render prompts",
    "camera lens prompt parameters",
  ],
});

export default function VisualStylesDirectoryPage() {
  const styles = getAllVisualStyles();
  const stylesJsonLd = generateStylesHubJsonLd(styles);
  const breadcrumbsJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Visual Styles", url: "/styles" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(stylesJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <div className="py-12 sm:py-16 bg-[var(--background)] min-h-screen">
        <Container>
          {/* Hero Section */}
          <div className="max-w-3xl mb-14 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="primary" size="sm" className="gap-1.5 py-1 px-3">
                <Palette className="w-3.5 h-3.5 text-[var(--primary)]" />
                Aesthetic Silos & Optics
              </Badge>
              <span className="text-xs font-medium text-[var(--muted-foreground)]">
                {styles.length} Curated Visual Genres
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
              Visual AI Styles & Optics Directory
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-[var(--muted-foreground)]">
              From 35mm anamorphic widescreen frames to architectural tilt-shift elevations and
              macro commercial packshots. Discover the optical rules, lighting geometries, and
              parameter tokens defining premier visual generative art.
            </p>
          </div>

          {/* Quick Navigation Filter Bar */}
          <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[var(--border)] text-sm">
            <span className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mr-2">
              Browse Styles:
            </span>
            {styles.map((style) => (
              <a
                key={style.slug}
                href={`#${style.slug}`}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--muted)]/50 hover:bg-[var(--muted)] text-[var(--foreground)] transition-colors border border-[var(--border)]"
              >
                {style.shortName}
              </a>
            ))}
          </div>

          {/* Visual Styles Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
            {styles.map((style) => {
              const matchingPrompts = getPromptsByVisualStyle(style.slug);

              return (
                <div
                  key={style.slug}
                  id={style.slug}
                  className="group relative flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 hover:border-[var(--primary)]/40"
                >
                  {/* Hero Visual Cover */}
                  <Link
                    href={`/styles/${style.slug}`}
                    className="relative aspect-16/10 w-full overflow-hidden bg-black/40 block"
                  >
                    <Image
                      src={style.heroImage}
                      alt={style.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      priority={style.slug === "cinematic" || style.slug === "photography"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/15" />

                    {/* Top Badges */}
                    <div className="absolute top-3 inset-x-3 flex items-center justify-between">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/60 backdrop-blur-md text-white border border-white/15">
                        {style.badge}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-mono text-emerald-300 bg-black/60 backdrop-blur-md border border-white/15">
                        {matchingPrompts.length} Prompts
                      </span>
                    </div>

                    {/* Bottom HUD Bar */}
                    <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-[11px] font-mono text-white/95">
                      <div className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-xs border border-white/15 flex items-center gap-1.5">
                        <Aperture className="w-3 h-3 text-cyan-400" />
                        <span>{style.optics.focalLength}</span>
                      </div>
                      <div className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-xs border border-white/15 text-white/80">
                        {style.optics.aperture}
                      </div>
                    </div>
                  </Link>

                  {/* Card Body */}
                  <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
                    <div className="space-y-3">
                      <div>
                        <Link
                          href={`/styles/${style.slug}`}
                          className="group-hover:text-[var(--primary)] transition-colors"
                        >
                          <h2 className="text-xl font-bold text-[var(--foreground)] tracking-tight">
                            {style.name}
                          </h2>
                        </Link>
                        <p className="text-xs text-[var(--primary)] font-medium mt-1">
                          {style.tagline}
                        </p>
                      </div>

                      <p className="text-xs text-[var(--muted-foreground)] leading-relaxed line-clamp-3">
                        {style.description}
                      </p>

                      {/* Optical Setup Pill Preview */}
                      <div className="pt-2 border-t border-[var(--border)]/60 space-y-1.5 text-xs">
                        <div className="flex items-center justify-between text-[var(--muted-foreground)]">
                          <span className="flex items-center gap-1.5 font-medium">
                            <Camera className="w-3 h-3 text-[var(--primary)]" />
                            Lens & System
                          </span>
                          <span className="font-mono text-[var(--foreground)] truncate max-w-[170px]">
                            {style.optics.lens}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-[var(--muted-foreground)]">
                          <span className="flex items-center gap-1.5 font-medium">
                            <Film className="w-3 h-3 text-[var(--primary)]" />
                            Film / Sensor
                          </span>
                          <span className="font-mono text-[var(--foreground)] truncate max-w-[170px]">
                            {style.optics.sensorOrFilm.split(",")[0]}
                          </span>
                        </div>
                      </div>

                      {/* Key Parameter Tokens */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {style.keyTokens.slice(0, 3).map((token) => (
                          <span
                            key={token}
                            className="inline-block px-2 py-0.5 rounded-md text-[10px] font-mono bg-[var(--muted)]/60 text-[var(--muted-foreground)] border border-[var(--border)]"
                          >
                            {token}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Link Button */}
                    <div className="pt-3">
                      <Link
                        href={`/styles/${style.slug}`}
                        className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-xs font-semibold bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-opacity shadow-xs"
                      >
                        <span>Explore {style.shortName} Guide & Prompts</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Tools & Ecosystem Cross-Links */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 sm:p-10 mb-16 shadow-xs">
            <div className="max-w-2xl mb-8 space-y-2">
              <Badge variant="outline" size="sm" className="gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[var(--primary)]" />
                Creative Workstations
              </Badge>
              <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
                Calibrate & Compile Your Visual Prompts
              </h2>
              <p className="text-sm text-[var(--muted-foreground)]">
                Pair stylistic theory with interactive optical workstations. Test composition rules,
                compile multi-parameter flags, and benchmark image synthesis engines.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link
                href="/tools/composition-ruler"
                className="group p-5 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)] transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
                    <Compass className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                    Composition Ruler Studio
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                    Interactive Golden Ratio, Rule of Thirds, and optical caliper overlays.
                  </p>
                </div>
                <span className="text-xs font-medium text-[var(--primary)] inline-flex items-center gap-1">
                  Launch Studio <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>

              <Link
                href="/tools/prompt-generator"
                className="group p-5 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)] transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                    Visual Prompt Compiler
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                    Engine-specific parameter generator for Midjourney, FLUX, SDXL & DALL-E.
                  </p>
                </div>
                <span className="text-xs font-medium text-[var(--primary)] inline-flex items-center gap-1">
                  Launch Compiler <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>

              <Link
                href="/compare/midjourney-vs-flux"
                className="group p-5 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)] transition-all flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1.5">
                  <div className="w-8 h-8 rounded-lg bg-[var(--primary)]/10 text-[var(--primary)] flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                    Midjourney vs FLUX.1 Study
                  </h3>
                  <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                    Side-by-side interactive split-screen benchmark across identical prompt tokens.
                  </p>
                </div>
                <span className="text-xs font-medium text-[var(--primary)] inline-flex items-center gap-1">
                  View Benchmark <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
