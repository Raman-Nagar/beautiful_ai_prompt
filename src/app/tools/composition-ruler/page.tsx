import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { CompositionRulerStudio } from "@/components/tools/composition-ruler-studio";
import { constructMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/canonical";
import {
  Grid3X3,
  Compass,
  Crosshair,
  Sparkles,
  ArrowRight,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "AI Image Composition Ruler Tool",
  description:
    "Free online composition ruler and grid overlay for AI art. Test Rule of Thirds, Golden Spiral, and aspect ratios for Midjourney and FLUX.",
  path: "/tools/composition-ruler",
  keywords: [
    "online composition ruler",
    "rule of thirds overlay",
    "golden ratio calculator",
    "fibonacci spiral overlay",
    "aspect ratio cropper",
    "midjourney aspect ratio test",
    "flux composition calibration",
    "ai image measurement tool",
    "photography composition grid",
  ],
});

export default function CompositionRulerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["WebApplication", "SoftwareApplication"],
    name: "AI Composition Ruler & Optical Caliper Studio",
    url: `${SITE_URL}/tools/composition-ruler`,
    description:
      "Free interactive online visual composition ruler and optical caliper tool for calibrating Rule of Thirds, Golden Spiral, and aspect ratios in generative AI art and photography.",
    applicationCategory: "DesignApplication",
    operatingSystem: "WebBrowser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Rule of Thirds 3×3 Grid with 4 Golden Power Intersections",
      "Fibonacci Golden Spiral (Phi 1:1.618) with 4 Orientation Flips",
      "Center Symmetry Crosshair & Concentric Calipers",
      "Dynamic Diagonals and Golden Triangles",
      "Aspect Ratio Crop Simulators (1:1, 4:5, 16:9, 21:9, 9:16)",
      "Zero-Upload Client-Side Custom Image Support",
      "Annotated High-Resolution Canvas PNG Export",
      "AI Prompt Parameter Modifier Generator",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-[var(--background)] py-10 sm:py-14">
        <Container>
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
            <Link href="/" className="hover:text-[var(--foreground)] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/prompts?engine=visual" className="hover:text-[var(--foreground)] transition-colors">
              Visual Art
            </Link>
            <span>/</span>
            <span className="text-[var(--foreground)] font-medium">Composition Ruler</span>
          </nav>

          {/* Hero Header */}
          <div className="max-w-3xl mb-10 space-y-3.5">
            <div className="inline-flex items-center gap-2">
              <Badge variant="primary" size="sm" className="gap-1.5">
                <Sparkles className="h-3 w-3" />
                <span>Zero-Latency Web Utility</span>
              </Badge>
              <span className="text-xs text-[var(--muted-foreground)]">
                100% Client-Side • Privacy-Safe
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[var(--foreground)]">
              AI Composition Ruler &amp; Optical Caliper
            </h1>

            <p className="text-sm sm:text-base leading-relaxed text-[var(--muted-foreground)]">
              Calibrate and measure visual weight, power points, and framing geometry across any image or AI prompt output. Test Rule of Thirds, Fibonacci logarithmic spirals, and aspect ratio crops for Midjourney v6.1, FLUX.1, and SDXL.
            </p>
          </div>

          {/* Interactive Studio Component */}
          <CompositionRulerStudio />

          {/* Educational Guide Section */}
          <div className="mt-16 sm:mt-20 pt-12 border-t border-[var(--border-subtle)] space-y-12">
            <div className="max-w-3xl space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--primary)]">
                <BookOpen className="h-3.5 w-3.5" />
                <span>Composition Engineering Theory</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
                How Visual Geometry Governs AI Diffusion Models
              </h2>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                Modern diffusion architectures (FLUX.1 Dev, Midjourney v6.1, SDXL) have a strong mathematical bias toward centering the primary subject. Understanding classical optical geometry allows prompt engineers to break static framing and engineer dynamic cinematic tension.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-3">
                <div className="w-9 h-9 rounded-lg bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <Grid3X3 className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-[var(--foreground)]">
                  The Rule of Thirds
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Dividing the frame into a 3×3 grid yields four intersection &quot;power points&quot;. Placing a subject&apos;s eyes or horizon along these coordinates creates balanced visual tension that feels organic rather than robotic.
                </p>
                <div className="pt-2 text-[11px] font-mono text-amber-400/90">
                  Keyword: <code>off-center rule-of-thirds framing</code>
                </div>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-3">
                <div className="w-9 h-9 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                  <Compass className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-[var(--foreground)]">
                  The Fibonacci Golden Spiral
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Derived from the Divine Proportion (Phi 1:1.618), the logarithmic spiral naturally draws human saccadic eye movement through secondary visual details into the dense focal anchor.
                </p>
                <div className="pt-2 text-[11px] font-mono text-cyan-400/90">
                  Keyword: <code>fibonacci golden spiral composition</code>
                </div>
              </div>

              <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                  <Crosshair className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-[var(--foreground)]">
                  Axial Symmetry &amp; Crosshairs
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Popularized by Wes Anderson and Stanley Kubrick. Radical bilateral symmetry creates authoritarian authority, solemn reverence in architectural photography, and iconic timepiece macro shots.
                </p>
                <div className="pt-2 text-[11px] font-mono text-emerald-400/90">
                  Keyword: <code>strictly centered bilateral symmetry</code>
                </div>
              </div>
            </div>

            {/* Aspect Ratio Cheat Sheet Table */}
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
              <div className="p-6 border-b border-[var(--border-subtle)]">
                <h3 className="text-lg font-bold text-[var(--foreground)]">
                  Standard AI Prompt Aspect Ratio Reference
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] mt-1">
                  Optimal aspect ratios for Midjourney, FLUX, and DALL-E by production use-case.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[var(--secondary)]/60 text-[var(--muted-foreground)] font-mono uppercase text-[10px] border-b border-[var(--border-subtle)]">
                    <tr>
                      <th className="py-3 px-5">Parameter</th>
                      <th className="py-3 px-5">Ratio Name</th>
                      <th className="py-3 px-5">Exact Decimal</th>
                      <th className="py-3 px-5">Best For</th>
                      <th className="py-3 px-5">Composition Rule</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-subtle)] font-mono text-[11px]">
                    <tr className="hover:bg-[var(--secondary)]/20 transition-colors">
                      <td className="py-3 px-5 text-amber-400 font-bold">--ar 16:9</td>
                      <td className="py-3 px-5 font-sans font-medium text-[var(--foreground)]">Cinematic Widescreen</td>
                      <td className="py-3 px-5 text-[var(--muted-foreground)]">1.78:1</td>
                      <td className="py-3 px-5 font-sans text-[var(--muted-foreground)]">YouTube, Desktop wallpapers, concept art</td>
                      <td className="py-3 px-5 font-sans text-emerald-400">Rule of Thirds</td>
                    </tr>
                    <tr className="hover:bg-[var(--secondary)]/20 transition-colors">
                      <td className="py-3 px-5 text-amber-400 font-bold">--ar 21:9</td>
                      <td className="py-3 px-5 font-sans font-medium text-[var(--foreground)]">Anamorphic Ultrawide</td>
                      <td className="py-3 px-5 text-[var(--muted-foreground)]">2.39:1</td>
                      <td className="py-3 px-5 font-sans text-[var(--muted-foreground)]">Hollywood cinema stills, Panavision flares</td>
                      <td className="py-3 px-5 font-sans text-cyan-400">Dynamic Diagonals</td>
                    </tr>
                    <tr className="hover:bg-[var(--secondary)]/20 transition-colors">
                      <td className="py-3 px-5 text-amber-400 font-bold">--ar 4:5</td>
                      <td className="py-3 px-5 font-sans font-medium text-[var(--foreground)]">Vertical Editorial</td>
                      <td className="py-3 px-5 text-[var(--muted-foreground)]">0.80:1</td>
                      <td className="py-3 px-5 font-sans text-[var(--muted-foreground)]">Instagram feed, high fashion portraits, beauty dishes</td>
                      <td className="py-3 px-5 font-sans text-amber-400">Golden Spiral</td>
                    </tr>
                    <tr className="hover:bg-[var(--secondary)]/20 transition-colors">
                      <td className="py-3 px-5 text-amber-400 font-bold">--ar 1:1</td>
                      <td className="py-3 px-5 font-sans font-medium text-[var(--foreground)]">Square Medium Format</td>
                      <td className="py-3 px-5 text-[var(--muted-foreground)]">1.00:1</td>
                      <td className="py-3 px-5 font-sans text-[var(--muted-foreground)]">Hasselblad 6×6, product macros, 3D icons</td>
                      <td className="py-3 px-5 font-sans text-emerald-400">Center Symmetry</td>
                    </tr>
                    <tr className="hover:bg-[var(--secondary)]/20 transition-colors">
                      <td className="py-3 px-5 text-amber-400 font-bold">--ar 9:16</td>
                      <td className="py-3 px-5 font-sans font-medium text-[var(--foreground)]">Mobile Vertical Video</td>
                      <td className="py-3 px-5 text-[var(--muted-foreground)]">0.56:1</td>
                      <td className="py-3 px-5 font-sans text-[var(--muted-foreground)]">TikTok, Reels, smartphone lockscreens</td>
                      <td className="py-3 px-5 font-sans text-amber-400">Vertical Thirds</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* CTA to Explore Visual Prompt Gallery */}
            <div className="rounded-2xl border border-[var(--primary)]/30 bg-gradient-to-r from-[var(--primary)]/10 via-[var(--primary)]/5 to-transparent p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1.5">
                <span className="text-xs font-mono font-semibold uppercase tracking-wider text-[var(--primary)]">
                  Explore Curated Visual Prompts
                </span>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  Ready to generate photographic visual art?
                </h3>
                <p className="text-xs sm:text-sm text-[var(--muted-foreground)] max-w-xl leading-relaxed">
                  Browse our production-tested visual prompt library with calibrated 35mm optics, lighting geometry, and negative prompt strings for Midjourney and FLUX.
                </p>
              </div>

              <Link
                href="/prompts?engine=visual"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary)] text-xs font-semibold text-[var(--primary-foreground)] hover:opacity-90 transition-opacity shrink-0 shadow-md"
              >
                <span>Browse Visual Art Gallery</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
