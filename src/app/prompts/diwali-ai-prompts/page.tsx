import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb } from "@/components/layout/breadcrumb";
import {
  DIWALI_PROMPTS,
  DIWALI_CATEGORIES,
  DIWALI_FAQS,
} from "@/data/diwali-prompts";
import { DiwaliPromptWorkbench } from "@/components/prompts/diwali-prompt-workbench";
import {
  constructMetadata,
  generateFaqJsonLd,
  absoluteUrl,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";
import {
  Flame,
  Sparkles,
  Layers,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  Zap,
  SlidersHorizontal,
  ChevronDown,
  Cpu,
  Clock,
  CheckCircle2,
  Share2,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Diwali AI Photo Editing Prompts (2026) – 3D Name Art & Social Media Templates",
  description:
    "Copy 20+ tested Diwali AI photo editing prompts for Bing Image Creator, Midjourney & ChatGPT. Create Happy Diwali 3D AI images with your name, 9:16 story backgrounds & sale banners.",
  path: "/prompts/diwali-ai-prompts",
  keywords: [
    "Diwali AI photo editing prompt",
    "Happy Diwali 3D AI image prompt with name",
    "Diwali Instagram post AI prompt",
    "9:16 Diwali story background prompt",
    "3D product podium Diwali sale prompt",
    "corporate Diwali LinkedIn post prompt",
    "Diwali AI prompts 2026",
    "Bing Image Creator Diwali prompt with name",
    "Ideogram 3D name art Diwali",
    "Midjourney Diwali festival prompt",
  ],
  type: "website",
});

export default function DiwaliPromptsPage() {
  // FAQ Schema
  const faqJsonLd = generateFaqJsonLd(DIWALI_FAQS);

  // Collection Schema
  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Diwali AI Photo Editing Prompts & 3D Name Art Collection",
    description:
      "Curated, tested AI image generation prompts for Diwali social media graphics across Instagram, WhatsApp, LinkedIn, and e-commerce banners.",
    url: absoluteUrl("/prompts/diwali-ai-prompts"),
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    hasPart: DIWALI_PROMPTS.map((p) => ({
      "@type": "CreativeWork",
      name: p.title,
      url: absoluteUrl(`/prompts/diwali-ai-prompts#${p.id}`),
    })),
  };

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: "Prompts", href: "/prompts" },
    { label: "Diwali AI Prompts" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[var(--background)]">
      {/* ── JSON-LD Structured Data ── */}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      {/* ── Breadcrumb Bar ── */}
      <div className="border-b border-[var(--border)] bg-[var(--card)]/40 backdrop-blur-xs">
        <Container>
          <Breadcrumb items={breadcrumbs} withContainer={false} />
        </Container>
      </div>

      {/* =========================================================================
          HERO SECTION: Festive Glow & Search-Optimized Headings
          ========================================================================= */}
      <header className="relative overflow-hidden border-b border-[var(--border)] pt-14 pb-16 bg-grid-mesh">
        {/* Festive Ambient Glow Layers (Warm Saffron Gold & Deep Ember) */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-[450px] w-[800px] rounded-full bg-amber-500/[0.09] blur-[130px]" />
        <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-36 w-[400px] rounded-full bg-orange-600/[0.07] blur-[90px]" />

        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            {/* Festive Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 shadow-sm backdrop-blur-md">
              <Flame className="h-4 w-4 text-amber-400 animate-pulse" />
              <span className="text-xs font-semibold tracking-wide text-amber-300">
                Festival of Lights 2026 Collection &nbsp;&middot;&nbsp; 20+ Free Prompts
              </span>
            </div>

            {/* Keyword-Rich H1 */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-[var(--foreground)] leading-[1.15]">
              Diwali AI Photo Editing Prompts:{" "}
              <span className="bg-gradient-to-r from-amber-300 via-amber-400 to-orange-400 bg-clip-text text-transparent">
                Happy Diwali 3D AI Images With Name
              </span>{" "}
              &amp; Social Media Art
            </h1>

            {/* Subheading & Editorial Context */}
            <p className="max-w-2xl mx-auto text-sm sm:text-base leading-relaxed text-[var(--muted-foreground)]">
              Transform your social media this festive season with our hand-curated library of 
              tested <strong className="text-[var(--foreground)]">Diwali AI photo editing prompts</strong>. 
              Generate viral 3D name art profile pictures, aesthetic Instagram feed portraits, 
              9:16 WhatsApp status backgrounds, 3D product podium sale banners, and charming Pixar-style 3D illustrations.
            </p>

            {/* Platform & Quality Signals */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[var(--muted-foreground)]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Bing Image Creator (100% Free)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Ideogram 2.0 Typography</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Midjourney v6.1 &amp; FLUX.1</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>ChatGPT (DALL-E 3)</span>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* =========================================================================
          MAIN WORKBENCH SECTION (Bingbot 125 KB Optimized)
          ========================================================================= */}
      <main className="py-12 border-b border-[var(--border)]">
        <Container>
          {/* Quick Category Intro Pills */}
          <div className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)] tracking-tight mb-2">
              Explore Diwali AI Image Generation Prompts by Social Format
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted-foreground)] max-w-3xl leading-relaxed">
              Every prompt below is tested for color balance, realistic fabric weaves, and glowing diya illumination. 
              Customize placeholders like <span className="text-amber-300 font-mono">[YOUR NAME]</span> and <span className="text-amber-300 font-mono">[BRAND NAME]</span> live, then click copy to paste directly into your preferred AI generator.
            </p>
          </div>

          {/* Interactive Workbench Client Component */}
          <DiwaliPromptWorkbench initialCount={12} />
        </Container>
      </main>

      {/* =========================================================================
          EDITORIAL GUIDE & CATEGORY BREAKDOWN (AdSense Rich Content)
          ========================================================================= */}
      <section className="py-16 border-b border-[var(--border)] bg-[var(--card)]/30">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-3">
              <Badge variant="primary" size="sm" className="bg-amber-400/10 text-amber-300 border-amber-400/20">
                Masterclass Guide
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
                How to Get the Best Results with Diwali AI Image Prompts
              </h2>
              <p className="text-xs sm:text-sm text-[var(--muted-foreground)] max-w-2xl mx-auto leading-relaxed">
                Step-by-step guidance on aspect ratios, negative prompts, and prompt calibration for photorealistic festive celebrations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category 1 Card */}
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
                  <Sparkles className="h-4 w-4" />
                  <h3>1. Happy Diwali 3D AI Image Prompt With Name (1:1)</h3>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  For profile avatars on WhatsApp and Instagram, use a <strong>1:1 square ratio</strong>. 
                  Place your name inside double quotes (e.g. <em>&quot;Aarav&quot;</em>) so the AI treats it as explicit text. 
                  Ideogram 2.0 and Bing Image Creator render bold 3D acrylic or neon lettering with 99% spelling accuracy.
                </p>
              </div>

              {/* Category 2 Card */}
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-3">
                <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
                  <Sparkles className="h-4 w-4" />
                  <h3>2. Diwali Instagram Post AI Prompt (4:5 Ratio)</h3>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Instagram feed posts perform best in <strong>4:5 portrait orientation</strong> (1080x1350px) because they occupy 
                  maximum screen real estate. Use Midjourney v6.1 or FLUX.1 with <code>--style raw</code> for authentic Indian ethnic clothing 
                  textures, natural skin tones, and cinematic diya candlelight illumination without plastic oversaturation.
                </p>
              </div>

              {/* Category 3 Card */}
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-3">
                <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
                  <Sparkles className="h-4 w-4" />
                  <h3>3. 9:16 Diwali Story Background Prompt with Empty Space</h3>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  When creating backgrounds for Instagram Stories, Reels covers, and WhatsApp Status updates, 
                  always leave <strong>clean negative space in the upper 60%</strong>. Add negative parameters 
                  like <code>--no text, letters, watermarks</code> to ensure you can easily drop your own Hindi/English typography or poll stickers.
                </p>
              </div>

              {/* Category 4 & 5 Card */}
              <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <Sparkles className="h-4 w-4" />
                  <h3>4. 3D Product Podium Diwali Sale Prompt &amp; Corporate LinkedIn Wishes</h3>
                </div>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  For e-commerce brands, a <strong>3D product podium Diwali sale prompt</strong> provides a luxury marble pedestal with hanging brass lamps 
                  and marigold accents for showcasing cosmetics, electronics, or jewelry. For B2B LinkedIn posts, corporate prompts provide elegant, 
                  clutter-free executive office spaces with subtle festival warmth.
                </p>
              </div>
            </div>

            {/* Quick Calibration Table */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] overflow-hidden shadow-xs">
              <div className="px-6 py-4 border-b border-[var(--border)] bg-[var(--secondary)]/40 flex items-center justify-between">
                <h3 className="text-sm font-bold text-[var(--foreground)]">
                  Quick AI Model Selection Matrix for Diwali Prompts
                </h3>
                <span className="text-xs text-[var(--muted-foreground)]">Updated for 2026</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[var(--secondary)]/20 text-[var(--muted-foreground)] border-b border-[var(--border-subtle)]">
                    <tr>
                      <th className="px-4 py-3 font-semibold">AI Tool</th>
                      <th className="px-4 py-3 font-semibold">Best For</th>
                      <th className="px-4 py-3 font-semibold">Aspect Ratio Command</th>
                      <th className="px-4 py-3 font-semibold">Pricing</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--foreground)]">
                    <tr>
                      <td className="px-4 py-3 font-medium text-amber-300">Bing Image Creator</td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">3D Name Art DPs &amp; Pixar Character Art</td>
                      <td className="px-4 py-3 font-mono text-[11px] text-[var(--subtle-foreground)]">Square 1:1 default</td>
                      <td className="px-4 py-3 text-emerald-400 font-medium">Free (with Microsoft Account)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-amber-300">Ideogram 2.0</td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">Flawless 3D Typography &amp; Sale Discount Banners</td>
                      <td className="px-4 py-3 font-mono text-[11px] text-[var(--subtle-foreground)]">1:1, 4:5, 9:16, 16:9 UI selector</td>
                      <td className="px-4 py-3 text-emerald-400 font-medium">Free tier available</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-amber-300">Midjourney v6.1</td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">Photorealistic Couple Portraits &amp; Product Podiums</td>
                      <td className="px-4 py-3 font-mono text-[11px] text-[var(--subtle-foreground)]">--ar 4:5, --ar 9:16, --ar 16:9</td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">Paid subscription</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-amber-300">ChatGPT (DALL-E 3)</td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">Festive Family Candid Moments &amp; Deities</td>
                      <td className="px-4 py-3 font-mono text-[11px] text-[var(--subtle-foreground)]">1024x1024, 1024x1792</td>
                      <td className="px-4 py-3 text-[var(--muted-foreground)]">ChatGPT Plus / Free credits</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          FAQ SECTION (Structured Data + Keyword Integration)
          ========================================================================= */}
      <section className="py-16 border-b border-[var(--border)]">
        <Container>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 uppercase tracking-wider">
                <HelpCircle className="h-4 w-4" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--foreground)]">
                Diwali AI Photo Editing Prompts FAQ
              </h2>
              <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
                Common questions regarding image generation, 3D name art, commercial licenses, and aspect ratios.
              </p>
            </div>

            <div className="space-y-4">
              {DIWALI_FAQS.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 sm:p-6 space-y-2.5 shadow-xs"
                >
                  <h3 className="text-base font-bold text-[var(--foreground)] flex items-start gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-400/10 text-[11px] font-bold text-amber-400 mt-0.5">
                      Q
                    </span>
                    <span>{faq.question}</span>
                  </h3>
                  <div className="pl-7 text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          INTERNAL LINKING & RELATED GENERATOR TOOLS
          ========================================================================= */}
      <section className="py-16 bg-gradient-to-b from-[var(--background)] to-[var(--card)]/40">
        <Container>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)]">
                Explore More AI Generation &amp; Prompt Engineering Tools
              </h2>
              <p className="text-xs sm:text-sm text-[var(--muted-foreground)]">
                Take your visual creativity further with our free specialized AI workbench tools.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <Link
                href="/tools/prompt-generator"
                className="group rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 card-lift hover:border-amber-500/40 hover:bg-[var(--card-hover)] transition-all"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--secondary)] text-amber-400 mb-3 group-hover:scale-105 transition-transform">
                  <Sparkles className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold text-[var(--foreground)] group-hover:text-amber-300 transition-colors">
                  Visual Prompt Generator
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] mt-1.5 leading-relaxed">
                  Compile camera lenses, lighting rigs, and film stocks for photorealistic images.
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-amber-400">
                  <span>Open Tool</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/tools/prompt-transpiler"
                className="group rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 card-lift hover:border-indigo-500/40 hover:bg-[var(--card-hover)] transition-all"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--secondary)] text-indigo-400 mb-3 group-hover:scale-105 transition-transform">
                  <SlidersHorizontal className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold text-[var(--foreground)] group-hover:text-indigo-300 transition-colors">
                  AI Prompt Transpiler
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] mt-1.5 leading-relaxed">
                  Instantly convert prompts between Midjourney v6.1, FLUX.1, and SDXL syntax.
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-indigo-400">
                  <span>Open Tool</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/tools/composition-ruler"
                className="group rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 card-lift hover:border-emerald-500/40 hover:bg-[var(--card-hover)] transition-all"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--secondary)] text-emerald-400 mb-3 group-hover:scale-105 transition-transform">
                  <Layers className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold text-[var(--foreground)] group-hover:text-emerald-300 transition-colors">
                  Composition Ruler
                </h3>
                <p className="text-xs text-[var(--muted-foreground)] mt-1.5 leading-relaxed">
                  Verify rule of thirds and golden ratio balance on your generated images.
                </p>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-400">
                  <span>Open Tool</span>
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
