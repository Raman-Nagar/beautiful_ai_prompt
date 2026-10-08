import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { VideoPromptStudio } from "@/components/tools/video-prompt-studio";
import { constructMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/canonical";
import { SITE_NAME } from "@/lib/structured-data";
import {
  Video,
  Film,
  Compass,
  Wind,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "AI Video Prompt Generator & Studio",
  description:
    "Generate AI video prompts with camera motion vectors, lens controls, and physics for Runway Gen-3, Kling AI 1.5, and Luma.",
  path: "/tools/video-prompt-generator",
  keywords: [
    "AI video prompt generator",
    "Runway Gen-3 prompt builder",
    "Kling AI camera motion",
    "Luma Dream Machine prompts",
    "camera motion vector AI",
    "drone shot AI prompt",
    "generative video prompting",
  ],
});

export default function VideoPromptGeneratorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AI Video Prompt Generator & Camera Motion Director",
    url: `${SITE_URL}/tools/video-prompt-generator`,
    description:
      "Interactive studio for compiling camera motion vectors, temporal pacing, and atmospheric physics into syntactically valid prompts for Runway Gen-3 Alpha, Kling AI 1.5, and Luma Dream Machine.",
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
                AI Video Prompt Generator
              </li>
            </ol>
          </nav>

          {/* Hero Header */}
          <div className="max-w-4xl mb-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="primary" size="sm" className="gap-1.5 py-1 px-3">
                <Video className="w-3.5 h-3.5 text-[var(--primary)]" />
                Motion Director Studio
              </Badge>
              <Badge
                variant="outline"
                size="sm"
                className="font-mono text-xs text-purple-400 border-purple-500/30 bg-purple-500/10"
              >
                Gen-3 &amp; Kling 1.5 Ready
              </Badge>
              <span className="text-xs text-[var(--muted-foreground)] font-medium">
                Temporal Physics &amp; Vector Control
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
              AI Video Prompt Generator &amp; Camera Motion Director
            </h1>

            <p className="text-base sm:text-xl font-medium text-[var(--primary)] leading-snug">
              Direct Complex Camera Trajectories &amp; Fluid Physics for Generative Video
            </p>

            <p className="text-sm sm:text-base leading-relaxed text-[var(--muted-foreground)]">
              Generative video engines require fundamentally different prompting rules than static image generators.
              Select directional motion vectors, orbital radii, FPV drone velocities, vertigo dolly zooms, and
              atmospheric particle physics to compile director-grade prompts formatted specifically for Runway Gen-3 Alpha,
              Kling AI 1.5, Luma Dream Machine, or Minimax Hailuo.
            </p>
          </div>

          {/* Main Studio Component */}
          <div className="mb-16">
            <React.Suspense
              fallback={
                <div className="h-96 rounded-xl border border-[var(--border)] bg-[var(--card)] animate-pulse flex items-center justify-center text-xs text-[var(--muted-foreground)]">
                  Loading video motion studio...
                </div>
              }
            >
              <VideoPromptStudio />
            </React.Suspense>
          </div>

          {/* Educational Guide: The 3 Rules of Video Prompting */}
          <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--secondary)]/40 via-[var(--background)] to-[var(--secondary)]/20 p-6 sm:p-10 mb-16">
            <div className="max-w-3xl space-y-4 mb-8">
              <Badge
                variant="outline"
                size="sm"
                className="text-xs font-mono border-[var(--primary)]/30 text-[var(--primary)]"
              >
                Directing Masterclass
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
                The 3 Laws of Generative Video Prompting
              </h2>
              <p className="text-sm sm:text-base text-[var(--muted-foreground)] leading-relaxed">
                Static image descriptions cause generative video models to freeze or drift randomly.
                To produce high-motion cinematic sequences, your prompt must direct motion across three distinct dimensions:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-5 space-y-3 bg-[var(--card)]/80">
                <div className="flex items-center gap-2 text-sm font-bold text-amber-400">
                  <Compass className="w-4 h-4" />
                  <h3>1. Explicit Camera Movement Vector</h3>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Never leave camera behavior to chance. Always specify directional movement (e.g.{" "}
                  <code className="text-amber-300">Orbit Right 360°</code>,{" "}
                  <code className="text-amber-300">Dolly Zoom Vertigo</code>,{" "}
                  <code className="text-amber-300">FPV Drone Dive</code>) to prevent static camera lock.
                </p>
              </Card>

              <Card className="p-5 space-y-3 bg-[var(--card)]/80">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                  <Wind className="w-4 h-4" />
                  <h3>2. Environmental Particle Dynamics</h3>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Video models anchor temporal motion using fluid physics. Prompts featuring rain droplets,
                  billowing steam vents, blowing hair, or drifting embers consistently render higher motion
                  velocity without warping artifacts.
                </p>
              </Card>

              <Card className="p-5 space-y-3 bg-[var(--card)]/80">
                <div className="flex items-center gap-2 text-sm font-bold text-purple-400">
                  <Film className="w-4 h-4" />
                  <h3>3. Temporal Pacing &amp; Frame Rate</h3>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Match duration and cadence. A 5-second burst requires higher kinetic urgency than a 10-second
                  slow-burn establishing shot. Direct the model with frame rate targets (24fps film vs 60fps fluidity).
                </p>
              </Card>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
