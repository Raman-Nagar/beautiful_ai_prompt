import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PromptCard } from "@/components/prompts/prompt-card";
import { StylePromptSnippet } from "@/components/styles/style-prompt-snippet";
import {
  getAllVisualStyles,
  getVisualStyleBySlug,
  getPromptsByVisualStyle,
} from "@/lib/data/visual-styles";
import { generateStyleJsonLd, generateBreadcrumbJsonLd } from "@/lib/structured-data";
import { constructMetadata } from "@/lib/seo";
import {
  Camera,
  Film,
  Sun,
  Layers,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Aperture,
  Compass,
  Sliders,
  ChevronRight,
} from "lucide-react";

interface StylePageProps {
  params: Promise<{
    style: string;
  }>;
}

export async function generateStaticParams() {
  const styles = getAllVisualStyles();
  return styles.map((s) => ({
    style: s.slug,
  }));
}

export async function generateMetadata({ params }: StylePageProps): Promise<Metadata> {
  const { style: styleSlug } = await params;
  const style = getVisualStyleBySlug(styleSlug);

  if (!style) {
    return constructMetadata({
      title: "Visual Style Not Found",
      description: "The requested visual AI style guide could not be found.",
      path: "/styles",
    });
  }

  const title = `${style.name} Prompt Guide & Optics Blueprint (${style.badge})`;
  const description =
    style.longDescription ||
    `Master ${style.name} prompt engineering with optical camera settings, lighting blueprints, and battle-tested prompts.`;

  return constructMetadata({
    title,
    description,
    path: `/styles/${style.slug}`,
    keywords: [
      `${style.name} AI prompts`,
      `${style.shortName} prompt engineering`,
      `${style.optics.lens} prompts`,
      `${style.optics.sensorOrFilm} Midjourney`,
      "FLUX prompt guide",
      ...style.keyTokens,
    ],
  });
}

export default async function VisualStylePage({ params }: StylePageProps) {
  const { style: styleSlug } = await params;
  const style = getVisualStyleBySlug(styleSlug);

  if (!style) {
    notFound();
  }

  const matchingPrompts = getPromptsByVisualStyle(style.slug);
  const allStyles = getAllVisualStyles();
  const otherStyles = allStyles.filter((s) => s.slug !== style.slug);

  const styleJsonLd = generateStyleJsonLd(style, matchingPrompts);
  const breadcrumbsJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "Visual Styles", url: "/styles" },
    { name: style.shortName, url: `/styles/${style.slug}` },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(styleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />

      <div className="py-10 sm:py-14 bg-[var(--background)] min-h-screen">
        <Container>
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-xs text-[var(--muted-foreground)]">
              <li>
                <Link href="/" className="hover:text-[var(--foreground)] transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-3.5 h-3.5" />
              </li>
              <li>
                <Link href="/styles" className="hover:text-[var(--foreground)] transition-colors">
                  Visual Styles
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="w-3.5 h-3.5" />
              </li>
              <li className="text-[var(--foreground)] font-medium" aria-current="page">
                {style.name}
              </li>
            </ol>
          </nav>

          {/* Hero Header Section */}
          <div className="rounded-3xl border border-[var(--border)] bg-gradient-to-b from-[var(--secondary)]/30 to-[var(--background)] p-6 sm:p-10 mb-12 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
              {/* Text Left Column */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <Badge variant="primary" size="sm" className="gap-1.5 py-1 px-3">
                    <Camera className="w-3.5 h-3.5 text-[var(--primary)]" />
                    {style.badge}
                  </Badge>
                  <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    {matchingPrompts.length} Curated Prompts
                  </span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
                  {style.name}
                </h1>

                <p className="text-base sm:text-xl font-medium text-[var(--primary)] leading-snug">
                  {style.tagline}
                </p>

                <p className="text-sm sm:text-base leading-relaxed text-[var(--muted-foreground)]">
                  {style.longDescription}
                </p>

                {/* Quick Link to Studio Tools */}
                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    href="/tools/composition-ruler"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[var(--card)] hover:bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)] transition-colors shadow-xs"
                  >
                    <Compass className="w-3.5 h-3.5 text-[var(--primary)]" />
                    Calibrate in Ruler Studio
                  </Link>
                  <Link
                    href={`/tools/prompt-generator?style=${encodeURIComponent(style.slug)}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90 transition-opacity shadow-xs"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    Open Visual Prompt Compiler
                  </Link>
                </div>
              </div>

              {/* Visual Right Column (Hero Card with Optical HUD) */}
              <div className="lg:col-span-5">
                <div className="relative aspect-16/11 w-full rounded-2xl overflow-hidden border border-white/20 shadow-xl bg-black/60 group">
                  <Image
                    src={style.heroImage}
                    alt={style.name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />

                  {/* Optical HUD Overlay */}
                  <div className="absolute top-3 inset-x-3 flex items-center justify-between text-[11px] font-mono text-white/95">
                    <div className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/20 flex items-center gap-1.5 shadow-sm">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{style.optics.focalLength}</span>
                    </div>
                    <div className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md border border-white/20 text-white/90 shadow-sm">
                      {style.optics.aperture}
                    </div>
                  </div>

                  {/* Bottom Camera Spec Bar */}
                  <div className="absolute bottom-3 inset-x-3 p-2.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/15 text-white/90 text-xs space-y-1">
                    <div className="flex items-center justify-between font-mono text-[10px] text-white/60 uppercase">
                      <span>Optical Calibration</span>
                      <span>{style.shortName}</span>
                    </div>
                    <div className="font-medium text-[11px] truncate text-white">
                      {style.optics.lens}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Optical & Lighting Blueprint Specification (4-Card Grid) */}
          <div className="mb-14 space-y-4">
            <div className="flex items-center gap-2">
              <Aperture className="w-5 h-5 text-[var(--primary)]" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                Optical & Lighting Blueprint
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Lens & Optics */}
              <Card className="p-5 space-y-2 border-[var(--border)] bg-[var(--card)]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[var(--primary)] uppercase tracking-wider">
                  <Camera className="w-4 h-4" />
                  Camera & Optics
                </div>
                <div className="text-sm font-bold text-[var(--foreground)]">
                  {style.optics.focalLength}
                </div>
                <div className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  <span className="font-medium text-[var(--foreground)]">Lens: </span>
                  {style.optics.lens}
                </div>
                <div className="text-xs font-mono text-[var(--muted-foreground)]">
                  Aperture: {style.optics.aperture}
                </div>
              </Card>

              {/* Card 2: Medium / Film Stock */}
              <Card className="p-5 space-y-2 border-[var(--border)] bg-[var(--card)]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[var(--primary)] uppercase tracking-wider">
                  <Film className="w-4 h-4" />
                  Sensor & Film Stock
                </div>
                <div className="text-sm font-bold text-[var(--foreground)]">
                  {style.optics.sensorOrFilm.split(",")[0]}
                </div>
                <div className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Emulsion / sensor texture simulating organic silver halide grain and micro-contrast.
                </div>
              </Card>

              {/* Card 3: Lighting Scheme */}
              <Card className="p-5 space-y-2 border-[var(--border)] bg-[var(--card)]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[var(--primary)] uppercase tracking-wider">
                  <Sun className="w-4 h-4" />
                  Lighting Scheme
                </div>
                <div className="text-sm font-bold text-[var(--foreground)]">
                  {style.lighting.setup}
                </div>
                <div className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  <span className="font-medium text-[var(--foreground)]">Angle: </span>
                  {style.lighting.direction}
                </div>
                <div className="text-xs font-mono text-cyan-400">
                  {style.lighting.colorTemperature}
                </div>
              </Card>

              {/* Card 4: Framing & Aspect Ratio */}
              <Card className="p-5 space-y-2 border-[var(--border)] bg-[var(--card)]">
                <div className="flex items-center gap-2 text-xs font-semibold text-[var(--primary)] uppercase tracking-wider">
                  <Layers className="w-4 h-4" />
                  Framing & Geometry
                </div>
                <div className="text-sm font-bold text-[var(--foreground)]">
                  {style.lighting.mood}
                </div>
                <div className="text-xs text-[var(--muted-foreground)]">
                  Recommended ratios:
                </div>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {style.recommendedAspectRatios.map((ratio) => (
                    <span
                      key={ratio}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--muted)] text-[var(--foreground)] border border-[var(--border)]"
                    >
                      --ar {ratio}
                    </span>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* Master Prompt Architecture Section */}
          <div className="mb-14 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  Master Prompt Architecture
                </h2>
                <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
                  Battle-tested baseline prompt incorporating all optical, lighting, and rendering tokens.
                </p>
              </div>
            </div>

            <StylePromptSnippet
              title={style.samplePromptSnippet.title}
              prompt={style.samplePromptSnippet.prompt}
              breakdown={style.samplePromptSnippet.breakdown}
            />
          </div>

          {/* Key Parameter Tokens & Vocabulary */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 sm:p-8 mb-14 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-[var(--foreground)]">
              Signature Vocabulary & Token Modifiers
            </h3>
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
              Inject these precision terms into your Midjourney v6.1, FLUX.1, or SDXL prompts to trigger
              authentic {style.shortName.toLowerCase()} aesthetic conditioning:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {style.keyTokens.map((token) => (
                <span
                  key={token}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono bg-[var(--background)] text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--primary)] transition-colors"
                >
                  {token}
                </span>
              ))}
            </div>
          </div>

          {/* Best Practices vs Anti-Patterns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <Card className="p-6 border-emerald-500/20 bg-emerald-500/[0.02] space-y-4">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <h3>Pro Engineering Techniques</h3>
              </div>
              <ul className="space-y-3">
                {style.bestPractices.map((practice, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed text-[var(--muted-foreground)]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                    <span>{practice}</span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-6 border-amber-500/20 bg-amber-500/[0.02] space-y-4">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-base">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <h3>Common Pitfalls to Avoid</h3>
              </div>
              <ul className="space-y-3">
                {style.commonMistakes.map((mistake, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed text-[var(--muted-foreground)]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Prompts Showcase Grid */}
          <div className="mb-16 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[var(--border)] pb-4">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  {style.name} Prompts Showcase
                </h2>
                <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
                  Showing {matchingPrompts.length} battle-tested prompts tuned for this aesthetic.
                </p>
              </div>

              <Link
                href="/prompts?engine=visual"
                className="text-xs font-semibold text-[var(--primary)] hover:underline inline-flex items-center gap-1 self-start sm:self-auto"
              >
                Explore All Visual Prompts <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {matchingPrompts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchingPrompts.map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} />
                ))}
              </div>
            ) : (
              <div className="p-12 text-center rounded-2xl border border-[var(--border)] bg-[var(--card)] space-y-3">
                <p className="text-sm text-[var(--muted-foreground)]">
                  No prompts currently tagged directly for this visual category.
                </p>
                <Link
                  href="/prompts?engine=visual"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--primary)]"
                >
                  Browse all visual prompts
                </Link>
              </div>
            )}
          </div>

          {/* Explore Other Styles Cross-Navigation */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 sm:p-10 mb-12 shadow-xs space-y-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[var(--foreground)]">
                Explore More Visual Styles & Genres
              </h2>
              <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-1">
                Expand your creative toolkit with other optical categories and lighting blueprints.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {otherStyles.map((other) => (
                <Link
                  key={other.slug}
                  href={`/styles/${other.slug}`}
                  className="group p-4 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)] transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-[var(--primary)] uppercase tracking-wider">
                      {other.badge}
                    </span>
                    <h3 className="text-sm font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                      {other.shortName}
                    </h3>
                    <p className="text-[11px] text-[var(--muted-foreground)] line-clamp-2 leading-relaxed">
                      {other.tagline}
                    </p>
                  </div>
                  <span className="text-xs font-medium text-[var(--primary)] inline-flex items-center gap-1">
                    View Guide <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
