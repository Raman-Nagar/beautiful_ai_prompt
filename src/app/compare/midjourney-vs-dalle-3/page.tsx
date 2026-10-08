import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ComparisonSlider, ComparisonPreset } from "@/components/compare/comparison-slider";
import { constructMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/canonical";
import { SITE_NAME, generateFaqJsonLd } from "@/lib/structured-data";
import {
  Trophy,
  CheckCircle2,
  Layers,
  HelpCircle,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Midjourney vs DALL-E 3 Benchmark",
  description:
    "Direct benchmark comparing Midjourney v6.1 and DALL-E 3 across photographic optics, prompt expansion in ChatGPT, aspect ratios, and textures.",
  path: "/compare/midjourney-vs-dalle-3",
  keywords: [
    "Midjourney vs DALL-E 3",
    "DALL-E 3 vs Midjourney v6.1",
    "ChatGPT image generator vs Midjourney",
    "Midjourney photorealism benchmark",
    "DALL-E 3 prompt adherence",
    "AI image generator comparison",
  ],
});

const MJ_DALLE_PRESETS: ComparisonPreset[] = [
  {
    id: "mj-dalle-vintage",
    title: "1. 1970s Vintage Road Trip (Kodak Film Emulsion)",
    category: "Historical Analog Film",
    aspectRatio: "16:9",
    prompt: "Authentic 35mm color photograph taken in 1974, candid medium shot of a woman leaning against a weathered cherry-red pickup truck outside a Mojave desert diner, low golden hour sun creating gentle lens flare and soft warm orange halation, faded pastel hues, subtle film grain, Kodak Portra 400 stock, Leica M3 rangefinder with Summicron 50mm f/2 lens",
    leftImage: "/images/visual/vintage-1970s-road-trip.jpg",
    rightImage: "/images/visual/scandinavian-minimalist-living-room.jpg",
    leftNotes: "Authentic optical lens flare, organic Kodak grain texture, and period-accurate color halation around sun highlights.",
    rightNotes: "Follows all narrative prompt elements accurately, but renders smooth vector-like digital lighting without genuine analog grain.",
  },
  {
    id: "mj-dalle-architecture",
    title: "2. Brutalist Concrete Cathedral & Morning Rays",
    category: "Architectural Form & Light",
    aspectRatio: "16:9",
    prompt: "Monolithic brutalist concrete cathedral interior, towering board-formed raw concrete columns with tactile formwork seams, narrow skylight slicing through the dark nave casting dramatic volumetric sunbeam shafts across a polished stone floor, architectural photography with tilt-shift lens",
    leftImage: "/images/visual/brutalist-concrete-cathedral.jpg",
    rightImage: "/images/visual/scandinavian-minimalist-living-room.jpg",
    leftNotes: "Breathtaking tactile concrete textures, subtle dust motes in sunbeams, and professional tilt-shift perspective lines.",
    rightNotes: "Clean structural layout, but surfaces look slightly sanitized and lack micro-scale formwork imperfections.",
  },
  {
    id: "mj-dalle-noir",
    title: "3. Chiaroscuro Detective Silhouette & Venetian Blinds",
    category: "Hard Shadow Dynamics",
    aspectRatio: "16:9",
    prompt: "Cinematic film noir still, private investigator silhouetted in a moody dark office at 2 AM, moonlight through open wooden Venetian blinds casting sharp black and white striped diagonal shadows across trench coat, smoky room, high contrast 35mm grain",
    leftImage: "/images/visual/noir-detective-silhouette.jpg",
    rightImage: "/images/visual/compare-cyberpunk-flux.jpg",
    leftNotes: "Razor-sharp shadow lines, rich deep black levels, and authentic silver-gelatin photographic contrast.",
    rightNotes: "Understands the narrative scene well, but tends to add unnecessary digital lighting that softens deep shadow values.",
  },
];

const MJ_DALLE_FAQS = [
  {
    question: "Why does Midjourney look significantly more photographic than DALL-E 3?",
    answer:
      "Midjourney's training data and latent diffusion priors prioritize photographic camera optics, film grain, and realistic surface materials. DALL-E 3 is conditioned via ChatGPT, which frequently rewrites prompts into descriptive vignettes that default to vibrant, semi-illustrative digital artwork unless rigorously constrained with photographic tokens.",
  },
  {
    question: "What is DALL-E 3's biggest advantage over Midjourney?",
    answer:
      "DALL-E 3's greatest strength is conversational comprehension and zero prompt barrier. Through ChatGPT, users can request complex multi-subject interactions (e.g. 'a blue cat on top of a red ladder handing a green apple to a robot') and DALL-E 3 understands positional semantics effortlessly. Midjourney often scrambles multi-object color bindings.",
  },
  {
    question: "How do aspect ratio controls compare between Midjourney and DALL-E 3?",
    answer:
      "Midjourney offers complete aspect ratio freedom via the --ar parameter, supporting cinematic widescreen (21:9, 16:9, 2.39:1), vertical mobile (9:16, 4:5), and custom ratios like 3:1. DALL-E 3 is strictly restricted to three fixed presets: square (1024x1024), wide landscape (1792x1024), and tall portrait (1024x1792).",
  },
  {
    question: "Does DALL-E 3 support character consistency or style references like Midjourney?",
    answer:
      "No. Midjourney provides specialized production parameters like --cref (Character Reference) and --sref (Style Reference), enabling creators to lock character faces and art styles across entire series. DALL-E 3 does not offer reference image conditioning, making consistent visual serials difficult.",
  },
];

export default function MidjourneyVsDalle3Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "Midjourney v6.1 vs DALL-E 3: Aesthetic Realism vs Conversational AI",
    description:
      "A technical comparison of Midjourney v6.1 and OpenAI's DALL-E 3 examining camera optics emulation, ChatGPT prompt rewrites, aspect ratio flexibility, and style reference controls.",
    url: `${SITE_URL}/compare/midjourney-vs-dalle-3`,
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
        name: "DALL-E 3",
        applicationCategory: "MultimediaApplication",
      },
    ],
  };

  const faqJsonLd = generateFaqJsonLd(MJ_DALLE_FAQS);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

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
                <Link href="/compare" className="hover:text-[var(--foreground)] transition-colors">
                  Model Comparisons
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-[var(--foreground)] font-medium" aria-current="page">
                Midjourney vs DALL-E 3
              </li>
            </ol>
          </nav>

          {/* Hero Header */}
          <div className="max-w-4xl mb-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="primary" size="sm" className="gap-1.5 py-1 px-3">
                <Sparkles className="w-3.5 h-3.5 text-[var(--primary)]" />
                Commercial Benchmark
              </Badge>
              <Badge variant="outline" size="sm" className="font-mono text-xs text-amber-400 border-amber-500/30 bg-amber-500/10">
                Aesthetic Mastery vs Semantic Logic
              </Badge>
              <span className="text-xs text-[var(--muted-foreground)] font-medium">
                Photorealism &amp; Prompt Control Analysis
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[var(--foreground)] leading-[1.15]">
              Midjourney v6.1 vs DALL-E 3
            </h1>

            <p className="text-base sm:text-lg text-[var(--subtle-foreground)] leading-relaxed">
              Midjourney rules creative industries with breathtaking cinematic photography and parameter flags. DALL-E 3 powers conversational image creation inside ChatGPT. Discover how their prompt paradigms, textures, and capabilities diverge below.
            </p>
          </div>

          {/* ── Interactive Comparison Slider ── */}
          <div className="mb-14">
            <ComparisonSlider
              presets={MJ_DALLE_PRESETS}
              labels={{ left: "Midjourney v6.1", right: "DALL-E 3" }}
            />
          </div>

          {/* ── Key Dimension Cards Grid ── */}
          <div className="mb-14 space-y-4">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-[var(--primary)]" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                Key Comparison Dimensions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Card className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">1. Cinematic Photography</span>
                  <Trophy className="w-4 h-4 text-amber-400" />
                </div>
                <h3 className="font-bold text-sm text-[var(--foreground)]">Midjourney Dominates Aesthetics</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Midjourney excels at film stocks (Kodak, Ilford), subtle lighting falloff, and realistic skin texture. DALL-E 3 leans toward polished, smooth digital illustrations with airbrushed lighting.
                </p>
              </Card>

              <Card className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">2. Conversational Logic</span>
                  <Trophy className="w-4 h-4 text-purple-400" />
                </div>
                <h3 className="font-bold text-sm text-[var(--foreground)]">DALL-E 3 Wins in Semantics</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Integrated with ChatGPT, DALL-E 3 handles complicated multi-object compositions, spatial arrangements, and logical story scenes that cause Midjourney to mix up colors and subjects.
                </p>
              </Card>

              <Card className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">3. Creative Control &amp; Parameters</span>
                  <Trophy className="w-4 h-4 text-amber-400" />
                </div>
                <h3 className="font-bold text-sm text-[var(--foreground)]">Midjourney Wins for Power Users</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  With granular flags like --ar, --stylize, --sref (style references), and --cref (character consistency), Midjourney provides professional repeatability that DALL-E 3 lacks.
                </p>
              </Card>
            </div>
          </div>

          {/* ── Technical Parameter Breakdown ── */}
          <div className="mb-14 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
              Direct Feature Comparison
            </h2>

            <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--card)]">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--secondary)]/50">
                    <th className="p-3.5 font-bold text-[var(--foreground)]">Feature</th>
                    <th className="p-3.5 font-bold text-amber-400">Midjourney v6.1</th>
                    <th className="p-3.5 font-bold text-purple-400">DALL-E 3</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  <tr>
                    <td className="p-3.5 font-semibold text-[var(--foreground)]">Primary Interface</td>
                    <td className="p-3.5 text-[var(--muted-foreground)]">Web Studio &amp; Discord Bot</td>
                    <td className="p-3.5 text-[var(--muted-foreground)]">ChatGPT (Web &amp; Mobile) + OpenAI API</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-[var(--foreground)]">Aspect Ratio Options</td>
                    <td className="p-3.5 text-[var(--muted-foreground)]">Universal via --ar (1:1, 16:9, 4:5, 21:9, 9:16, etc.)</td>
                    <td className="p-3.5 text-[var(--muted-foreground)]">3 Fixed Presets: 1:1, 16:9, 9:16</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-[var(--foreground)]">Prompt Rewriting</td>
                    <td className="p-3.5 text-[var(--muted-foreground)]">Direct prompt processing without AI changes</td>
                    <td className="p-3.5 text-[var(--muted-foreground)]">Automated expansion into detailed ChatGPT paragraph</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-[var(--foreground)]">Style Reference (--sref)</td>
                    <td className="p-3.5 text-[var(--muted-foreground)]">Supported with URL or image upload</td>
                    <td className="p-3.5 text-[var(--muted-foreground)]">Not supported</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-[var(--foreground)]">Pricing</td>
                    <td className="p-3.5 text-[var(--muted-foreground)]">$10 - $120/month subscription</td>
                    <td className="p-3.5 text-[var(--muted-foreground)]">Included with ChatGPT Plus ($20/mo) or pay-per-image API</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── FAQ Section ── */}
          <div className="max-w-4xl space-y-6">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[var(--primary)]" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                Frequently Asked Comparison Questions
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {MJ_DALLE_FAQS.map((faq, idx) => (
                <Card key={idx} className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2">
                  <h3 className="text-sm font-bold text-[var(--foreground)] flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{faq.question}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed pl-6">
                    {faq.answer}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
