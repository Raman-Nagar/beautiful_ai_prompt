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
  Cpu,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "FLUX.1 Dev vs Stable Diffusion XL: Open-Weights Image Benchmark",
  description:
    "Comprehensive benchmark comparing FLUX.1 Dev and Stable Diffusion XL (SDXL). Evaluate flow-matching transformers vs U-Net latent diffusion, VRAM demands, text rendering, and anatomy.",
  path: "/compare/flux-vs-sdxl",
  keywords: [
    "FLUX vs SDXL",
    "FLUX.1 Dev vs Stable Diffusion XL",
    "FLUX ComfyUI benchmark",
    "SDXL vs FLUX image quality",
    "open weights AI image comparison",
    "flow matching vs diffusion",
  ],
});

const FLUX_SDXL_PRESETS: ComparisonPreset[] = [
  {
    id: "flux-sdxl-cyberpunk",
    title: "1. Neon Cyberpunk Street & Kanji Signage",
    category: "Typography & Complex Environment",
    aspectRatio: "16:9",
    prompt: "Cinematic night photography of a neon street corner in Neo-Tokyo, a ramen stand with legible glowing signage reading 'RAMEN NOODLES' in crisp typography, reflective wet pavement, sharp depth of field, atmospheric steam",
    leftImage: "/images/visual/compare-cyberpunk-flux.jpg",
    rightImage: "/images/visual/cyberpunk-tokyo-alleyway.jpg",
    leftNotes: "12B Flow matching renders crisp legible English and Japanese letters with flawless character anatomy.",
    rightNotes: "Rich atmospheric bloom and heavy contrast, but text hallucinates into stylized decorative glyphs.",
  },
  {
    id: "flux-sdxl-portrait",
    title: "2. Candid Editorial Skin & Freckle Realism",
    category: "Human Anatomy & Skin Texture",
    aspectRatio: "4:5",
    prompt: "Extreme high-fidelity natural sunlight portrait of a young woman with natural freckles, fine wispy hair, genuine skin pores, neutral expression, 85mm prime lens f/1.8, authentic camera color grading, unretouched raw documentary aesthetic",
    leftImage: "/images/visual/compare-portrait-flux.jpg",
    rightImage: "/images/visual/editorial-studio-fashion-portrait.jpg",
    leftNotes: "Groundbreaking human skin realism, organic pore distribution, and natural eye catchlights without artificial gloss.",
    rightNotes: "Great tonal contrast, but requires specific fine-tuned checkpoints to avoid the default smooth porcelain look.",
  },
  {
    id: "flux-sdxl-macro",
    title: "3. Precision Product Engineering & Hard Surfaces",
    category: "Macro Hard Surfaces",
    aspectRatio: "16:9",
    prompt: "Extreme macro studio photography of an open mechanical watch movement, intricate polished brass gears, titanium chassis, synthetic sapphire jewels catching directional light, razor-sharp focus on escapement wheel, clean studio lighting",
    leftImage: "/images/visual/luxury-swiss-chronograph-macro.jpg",
    rightImage: "/images/visual/botanical-skincare-serum-dropper.jpg",
    leftNotes: "Exceptional mechanical geometric coherence, clean circular gears, and realistic specular metallic highlights.",
    rightNotes: "Strong textural materials, but tiny intricate teeth and gear geometry can blur or merge under close inspection.",
  },
];

const FLUX_SDXL_FAQS = [
  {
    question: "What is the primary architectural difference between FLUX.1 and SDXL?",
    answer:
      "FLUX.1 is powered by a 12-billion-parameter rectified flow-matching transformer combined with a T5-XXL text encoder, allowing direct end-to-end token cross-attention. SDXL uses a traditional 2.6-billion-parameter latent diffusion U-Net with dual CLIP text encoders. This 4x increase in parameter scale gives FLUX.1 superior prompt comprehension and typographic precision.",
  },
  {
    question: "How much VRAM do I need to run FLUX.1 vs SDXL locally?",
    answer:
      "SDXL runs comfortably on GPUs with 8GB to 12GB of VRAM (such as an RTX 3060 or RTX 4070). Full FP16 FLUX.1 Dev requires 24GB of VRAM (RTX 3090/4090). However, quantized GGUF versions (Q4/Q8) and NF4 checkpoints allow FLUX.1 to run on 12GB to 16GB cards with minimal degradation in visual quality.",
  },
  {
    question: "Is SDXL still better than FLUX.1 for specialized workflows?",
    answer:
      "Yes, SDXL currently has an enormous advantage in ecosystem maturity. Over two years of community development have produced thousands of fine-tuned checkpoints, character LoRAs, and battle-tested ControlNet models (Depth, OpenPose, Canny, LineArt) on Civitai. While FLUX LoRAs are growing quickly, SDXL remains the king of customized commercial pipelines.",
  },
  {
    question: "Why does FLUX.1 handle human hands and text so much better than SDXL?",
    answer:
      "FLUX was trained with an advanced 12B multimodal transformer architecture that avoids the spatial bottlenecks common to U-Net downsampling. Combined with the T5-XXL language model's deep semantic token embeddings, FLUX understands finger geometry and character spelling natively rather than treating words as abstract visual textures.",
  },
];

export default function FluxVsSdxlPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: "FLUX.1 Dev vs Stable Diffusion XL: Open-Weights Image Benchmark",
    description:
      "A technical comparison of FLUX.1 Dev and Stable Diffusion XL evaluating flow-matching transformer architectures, VRAM hardware demands, text rendering, and ControlNet ecosystems.",
    url: `${SITE_URL}/compare/flux-vs-sdxl`,
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
        name: "FLUX.1",
        applicationCategory: "MultimediaApplication",
      },
      {
        "@type": "SoftwareApplication",
        name: "Stable Diffusion XL",
        applicationCategory: "MultimediaApplication",
      },
    ],
  };

  const faqJsonLd = generateFaqJsonLd(FLUX_SDXL_FAQS);

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
                FLUX.1 vs SDXL
              </li>
            </ol>
          </nav>

          {/* Hero Header */}
          <div className="max-w-4xl mb-10 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="primary" size="sm" className="gap-1.5 py-1 px-3">
                <Cpu className="w-3.5 h-3.5 text-[var(--primary)]" />
                Open-Weights Benchmark
              </Badge>
              <Badge variant="outline" size="sm" className="font-mono text-xs text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
                12B Flow Matching vs 2.6B U-Net
              </Badge>
              <span className="text-xs text-[var(--muted-foreground)] font-medium">
                Hardware &amp; Quality Showdown
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[var(--foreground)] leading-[1.15]">
              FLUX.1 Dev vs Stable Diffusion XL (SDXL)
            </h1>

            <p className="text-base sm:text-lg text-[var(--subtle-foreground)] leading-relaxed">
              Black Forest Labs disrupted the open-weights community with FLUX.1. How does its 12B rectified flow transformer compare against Stability AI&apos;s battle-tested SDXL ecosystem? Drag the interactive slider below to inspect side-by-side prompt executions.
            </p>
          </div>

          {/* ── Interactive Comparison Slider ── */}
          <div className="mb-14">
            <ComparisonSlider
              presets={FLUX_SDXL_PRESETS}
              labels={{ left: "FLUX.1 Dev", right: "Stable Diffusion XL" }}
            />
          </div>

          {/* ── Key Dimension Cards Grid ── */}
          <div className="mb-14 space-y-4">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-[var(--primary)]" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                Key Architectural Benchmarks
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <Card className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">1. Text Rendering</span>
                  <Trophy className="w-4 h-4 text-emerald-400" />
                </div>
                <h3 className="font-bold text-sm text-[var(--foreground)]">FLUX.1 Wins by a Landslide</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  Thanks to T5-XXL text embeddings, FLUX renders storefronts, street names, and apparel typography with high legibility. Base SDXL requires external ControlNet text passes to spell words correctly.
                </p>
              </Card>

              <Card className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">2. Hardware Demands</span>
                  <Trophy className="w-4 h-4 text-blue-400" />
                </div>
                <h3 className="font-bold text-sm text-[var(--foreground)]">SDXL Wins on Accessibility</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  SDXL generates images in 3-5 seconds on consumer 8GB-12GB GPUs. FLUX.1 Dev requires 16GB-24GB VRAM for unquantized weights, making local inference slower on mid-range hardware.
                </p>
              </Card>

              <Card className="p-5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">3. LoRA &amp; ControlNet</span>
                  <Trophy className="w-4 h-4 text-blue-400" />
                </div>
                <h3 className="font-bold text-sm text-[var(--foreground)]">SDXL Wins in Ecosystem Maturity</h3>
                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  With over 100,000 community checkpoints and rock-solid ControlNet pose rigs on Civitai, SDXL remains unbeatable for commercial production pipelines requiring precise art style locks.
                </p>
              </Card>
            </div>
          </div>

          {/* ── Architectural Summary Table ── */}
          <div className="mb-14 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
              Direct Technical Comparison
            </h2>

            <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--card)]">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--secondary)]/50">
                    <th className="p-3.5 font-bold text-[var(--foreground)]">Metric</th>
                    <th className="p-3.5 font-bold text-emerald-400">FLUX.1 Dev</th>
                    <th className="p-3.5 font-bold text-blue-400">Stable Diffusion XL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  <tr>
                    <td className="p-3.5 font-semibold text-[var(--foreground)]">Parameter Count</td>
                    <td className="p-3.5 text-[var(--muted-foreground)]">12 Billion Parameters</td>
                    <td className="p-3.5 text-[var(--muted-foreground)]">2.6 Billion Parameters</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-[var(--foreground)]">Text Conditioning</td>
                    <td className="p-3.5 text-[var(--muted-foreground)]">T5-XXL + CLIP-L</td>
                    <td className="p-3.5 text-[var(--muted-foreground)]">OpenCLIP ViT-bigG + CLIP-L</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-[var(--foreground)]">Recommended VRAM</td>
                    <td className="p-3.5 text-[var(--muted-foreground)]">16GB - 24GB VRAM (or GGUF 12GB)</td>
                    <td className="p-3.5 text-[var(--muted-foreground)]">8GB - 12GB VRAM</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-[var(--foreground)]">Prompt Paradigm</td>
                    <td className="p-3.5 text-[var(--muted-foreground)]">Natural language descriptive paragraphs</td>
                    <td className="p-3.5 text-[var(--muted-foreground)]">Comma-separated keyword tags + negative prompt</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-[var(--foreground)]">Hand Anatomy</td>
                    <td className="p-3.5 text-[var(--muted-foreground)]">Natural fingers, fingernails, joints</td>
                    <td className="p-3.5 text-[var(--muted-foreground)]">Prone to extra digits without ControlNet</td>
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
                Frequently Asked Technical Questions
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {FLUX_SDXL_FAQS.map((faq, idx) => (
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
