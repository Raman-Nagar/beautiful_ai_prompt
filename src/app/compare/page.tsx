import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { constructMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/canonical";
import { SITE_NAME, generateFaqJsonLd } from "@/lib/structured-data";
import {
  Trophy,
  ArrowRight,
  CheckCircle2,
  SlidersHorizontal,
  Layers,
  HelpCircle,
  Scale,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "AI Image Model Comparisons & Technical Benchmark Hub (2026)",
  description:
    "Comprehensive head-to-head comparisons of Midjourney v6.1, FLUX.1 Dev, Stable Diffusion XL, and DALL-E 3. Evaluate photorealism, typography, architecture, and prompt adherence.",
  path: "/compare",
  keywords: [
    "AI image generator comparison",
    "Midjourney vs FLUX",
    "FLUX vs SDXL",
    "Midjourney vs DALL-E 3",
    "AI model benchmark 2026",
    "diffusion model comparison",
    "best AI image model",
  ],
});

const SHOWDOWN_CARDS = [
  {
    slug: "midjourney-vs-flux",
    title: "Midjourney v6.1 vs FLUX.1 Dev",
    subtitle: "Aesthetic Realism vs In-Image Typography",
    badge: "Flagship Showdown",
    badgeVariant: "primary" as const,
    description:
      "Direct head-to-head test comparing Midjourney's cinematic lighting and editorial skin textures against FLUX's flow-matching text rendering and natural anatomy.",
    leftModel: { name: "Midjourney v6.1", pros: "Superior lighting, Panavision optics, magazine aesthetics" },
    rightModel: { name: "FLUX.1 Dev", pros: "Unmatched typography, natural candid skin, open weights" },
    winner: "FLUX for typography & candid realism; Midjourney for cinematic styling",
  },
  {
    slug: "flux-vs-sdxl",
    title: "FLUX.1 Dev vs Stable Diffusion XL",
    subtitle: "Next-Gen Flow Matching vs The LoRA Ecosystem",
    badge: "Open-Weights Battle",
    badgeVariant: "outline" as const,
    description:
      "Comparing Black Forest Labs' 12B transformer against Stability AI's mature SDXL open ecosystem. We evaluate local VRAM requirements, fine-tuning, and prompt fidelity.",
    leftModel: { name: "FLUX.1 Dev", pros: "12B flow-matching transformer, flawless hands & signage" },
    rightModel: { name: "Stable Diffusion XL", pros: "Massive LoRA & ControlNet ecosystem, fast 8GB VRAM runs" },
    winner: "FLUX for baseline generation quality; SDXL for custom fine-tuned workflows",
  },
  {
    slug: "midjourney-vs-dalle-3",
    title: "Midjourney v6.1 vs DALL-E 3",
    subtitle: "Cinematic Photography vs Conversational Reasoning",
    badge: "Commercial Showdown",
    badgeVariant: "outline" as const,
    description:
      "Analyzing how Midjourney's parameter controls (--ar, --stylize, --sref) stack up against OpenAI's natural language comprehension and ChatGPT prompt expansion.",
    leftModel: { name: "Midjourney v6.1", pros: "Extreme camera control, physical film grains, custom aspect ratios" },
    rightModel: { name: "DALL-E 3", pros: "Conversational prompt refinement, zero keyword syntax barrier" },
    winner: "Midjourney for professional visual creators; DALL-E 3 for rapid concepting",
  },
];

const BENCHMARK_MATRIX = [
  {
    dimension: "Core Architecture",
    midjourney: "Latent Diffusion + Proprietary Aesthetic Tuner",
    flux: "12B Rectified Flow Transformer + T5-XXL",
    sdxl: "2.6B Parameter Latent Diffusion U-Net",
    dalle3: "Multimodal Diffusion + GPT-4o Prompt Expander",
  },
  {
    dimension: "Photorealism & Skin Pores",
    midjourney: "Editorial magazine gloss, rich bokeh, high dynamic range",
    flux: "Uncurated authentic pores, fine blemishes, natural tones",
    sdxl: "Good with specialized checkpoints; plastic defaults",
    dalle3: "Smooth digital illustration feel; prone to plastic skin",
  },
  {
    dimension: "Text & In-Image Typography",
    midjourney: "Moderate (accurate on short quoted text)",
    flux: "Exceptional (complex storefront signs, labels, quotes)",
    sdxl: "Poor out-of-the-box (requires ControlNet text modules)",
    dalle3: "Very Strong (reliable short text phrases)",
  },
  {
    dimension: "Prompt Semantic Adherence",
    midjourney: "Strong on visual descriptors; ignores complex logic",
    flux: "Exceptional multi-subject positional adherence",
    sdxl: "Requires heavy weighting (word:1.3) & negative prompts",
    dalle3: "World-class conceptual understanding via ChatGPT",
  },
  {
    dimension: "Aspect Ratio Freedom",
    midjourney: "Universal via --ar (any ratio from 1:4 to 4:1)",
    flux: "Flexible (16:9, 1:1, 4:5, 21:9 supported natively)",
    sdxl: "Flexible native bucket resolutions (1024×1024 base)",
    dalle3: "Strictly limited to 1:1, 16:9, and 9:16",
  },
  {
    dimension: "Local Deployment & Open Weights",
    midjourney: "Cloud only (Discord & Web GUI subscription)",
    flux: "Open weights (FLUX Dev/Schnell runnable on 12-24GB VRAM)",
    sdxl: "Fully open source (runs on consumer 8GB GPUs)",
    dalle3: "Closed cloud API & ChatGPT subscription",
  },
  {
    dimension: "Ecosystem & LoRA Support",
    midjourney: "Proprietary features (--sref, --cref, Pan, Zoom)",
    flux: "Rapidly growing LoRA ecosystem in ComfyUI",
    sdxl: "Vast Civitai library with thousands of LoRAs & ControlNets",
    dalle3: "No custom weights or third-party adapters",
  },
  {
    dimension: "Best For",
    midjourney: "Commercial visual branding, cinema stills, fashion covers",
    flux: "Photorealistic portraits, products with labels, candid street",
    sdxl: "Custom character pipelines, game asset workflows, local work",
    dalle3: "Storyboarding, quick marketing mockups, conversational ideation",
  },
];

const HUB_FAQS = [
  {
    question: "Which AI image generator is the overall best in 2026?",
    answer:
      "There is no single winner for every use case. FLUX.1 Dev is the top choice for candid human photorealism and legible text rendering. Midjourney v6.1 remains the visual leader for dramatic cinematic lighting, historical film stocks, and editorial art direction. Stable Diffusion XL is the standard for custom local pipelines with ControlNet, and DALL-E 3 is the most accessible for non-technical users via ChatGPT.",
  },
  {
    question: "Can I run FLUX.1 or Stable Diffusion XL on my personal computer?",
    answer:
      "Yes. Both FLUX.1 (Dev/Schnell) and SDXL offer open weights. SDXL runs comfortably on GPUs with 8GB to 12GB of VRAM using ComfyUI or Automatic1111. FLUX.1 requires higher specs (12GB to 24GB of VRAM), though quantized 4-bit and 8-bit GGUF checkpoints enable FLUX on modern consumer hardware like RTX 3060/4070 cards and Apple Silicon Macs.",
  },
  {
    question: "Why does Midjourney v6.1 produce better lighting than other generators?",
    answer:
      "Midjourney's proprietary aesthetic tuning is specifically trained on professional cinematography, medium-format cameras (Hasselblad, Phase One), and historical film stocks. It emulates optical lens properties like anamorphic bokeh flares, spherical aberration, and natural shadow rolloff better than generalist diffusion models.",
  },
  {
    question: "How do prompt styles differ between Midjourney, FLUX, and SDXL?",
    answer:
      "Midjourney thrives on optical terminology (e.g., lens focal lengths, f-stops, lighting angles) paired with CLI flags (--ar 16:9, --stylize 250). FLUX performs best with descriptive natural language sentences without negative prompts. SDXL relies heavily on comma-separated keyword tokens and negative prompts to steer clear of unwanted artifacts.",
  },
];

export default function CompareHubPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Image Model Comparisons & Benchmark Matrix (2026)",
    description:
      "Interactive comparisons and technical evaluation matrix comparing Midjourney v6.1, FLUX.1 Dev, Stable Diffusion XL, and DALL-E 3.",
    url: `${SITE_URL}/compare`,
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };

  const faqJsonLd = generateFaqJsonLd(HUB_FAQS);

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
              <li className="text-[var(--foreground)] font-medium" aria-current="page">
                Model Comparisons
              </li>
            </ol>
          </nav>

          {/* Hero Header */}
          <div className="max-w-4xl mb-12 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="primary" size="sm" className="gap-1.5 py-1 px-3">
                <Scale className="w-3.5 h-3.5 text-[var(--primary)]" />
                Benchmark Laboratory
              </Badge>
              <Badge variant="outline" size="sm" className="font-mono text-xs text-emerald-400 border-emerald-500/30 bg-emerald-500/10">
                Updated for 2026
              </Badge>
              <span className="text-xs text-[var(--muted-foreground)] font-medium">
                4 Flagship Generative Models Tested
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-[var(--foreground)] leading-[1.15]">
              AI Image Generator Comparisons &amp; Technical Benchmarks
            </h1>

            <p className="text-base sm:text-lg text-[var(--subtle-foreground)] leading-relaxed">
              Choosing the right generative diffusion engine dictates your visual fidelity, typography accuracy, and hardware costs. Explore our side-by-side interactive split-screen showdowns and technical architectural breakdown below.
            </p>
          </div>

          {/* ── Featured Showdown Cards ── */}
          <div className="mb-16 space-y-6">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                Head-to-Head Visual Showdowns
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {SHOWDOWN_CARDS.map((card) => (
                <Card
                  key={card.slug}
                  className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/40 hover:bg-[var(--card-hover)] transition-all flex flex-col justify-between group shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant={card.badgeVariant} size="sm">
                        {card.badge}
                      </Badge>
                      <SlidersHorizontal className="w-4 h-4 text-[var(--muted-foreground)] group-hover:text-[var(--primary)] transition-colors" />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-xs font-semibold text-amber-400 mt-0.5">
                        {card.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                      {card.description}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)] text-[11px]">
                      <div>
                        <span className="font-semibold text-[var(--foreground)]">{card.leftModel.name}: </span>
                        <span className="text-[var(--muted-foreground)]">{card.leftModel.pros}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-[var(--foreground)]">{card.rightModel.name}: </span>
                        <span className="text-[var(--muted-foreground)]">{card.rightModel.pros}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-[var(--border-subtle)]">
                    <Link
                      href={`/compare/${card.slug}`}
                      className="inline-flex items-center justify-between w-full text-xs font-bold text-[var(--primary)] group-hover:underline"
                    >
                      <span>Launch Interactive Slider</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* ── 4-Way Comprehensive Matrix Table ── */}
          <div className="mb-16 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center gap-2">
                <Layers className="w-5 h-5 text-[var(--primary)]" />
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  Architectural &amp; Performance Matrix
                </h2>
              </div>
              <span className="text-xs text-[var(--muted-foreground)] font-mono">
                Evaluated across 8 core engineering criteria
              </span>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--card)] shadow-xs">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[var(--border)] bg-[var(--secondary)]/50">
                    <th className="p-4 font-bold text-[var(--foreground)] w-1/5">Criterion</th>
                    <th className="p-4 font-bold text-amber-400 w-1/5">Midjourney v6.1</th>
                    <th className="p-4 font-bold text-emerald-400 w-1/5">FLUX.1 Dev</th>
                    <th className="p-4 font-bold text-blue-400 w-1/5">Stable Diffusion XL</th>
                    <th className="p-4 font-bold text-purple-400 w-1/5">DALL-E 3</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  {BENCHMARK_MATRIX.map((row, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-transparent" : "bg-[var(--secondary)]/20"}
                    >
                      <td className="p-4 font-bold text-[var(--foreground)] align-top">
                        {row.dimension}
                      </td>
                      <td className="p-4 text-[var(--muted-foreground)] leading-relaxed align-top">
                        {row.midjourney}
                      </td>
                      <td className="p-4 text-[var(--muted-foreground)] leading-relaxed align-top">
                        {row.flux}
                      </td>
                      <td className="p-4 text-[var(--muted-foreground)] leading-relaxed align-top">
                        {row.sdxl}
                      </td>
                      <td className="p-4 text-[var(--muted-foreground)] leading-relaxed align-top">
                        {row.dalle3}
                      </td>
                    </tr>
                  ))}
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
              {HUB_FAQS.map((faq, idx) => (
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
