import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getAllModels } from "@/lib/data/models";
import { getAllModelDetails } from "@/data/model-details";
import { getPromptsByModel } from "@/lib/data/prompts";
import { generateModelsHubJsonLd } from "@/lib/structured-data";
import { constructMetadata } from "@/lib/seo";
import {
  ArrowRight,
  Sliders,
  Layers,
  Camera,
  MessageSquare,
  Compass,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "AI Models & Prompting Guides",
  description:
    "Explore parameter cheat sheets and prompt templates for Midjourney v6.1, FLUX.1, Claude 3.7, ChatGPT-4o, SDXL, and Gemini.",
  path: "/models",
  keywords: [
    "AI models directory",
    "Midjourney prompt parameters",
    "FLUX prompt guide",
    "Claude prompt engineering",
    "ChatGPT prompts",
    "Stable Diffusion SDXL parameters",
    "generative AI models",
  ],
});

export default function ModelsDirectoryPage() {
  const models = getAllModels();
  const modelDetails = getAllModelDetails();
  const modelsJsonLd = generateModelsHubJsonLd(models);

  // Group models by engine
  const visualModels = models.filter((m) => m.engine === "visual");
  const llmModels = models.filter((m) => m.engine === "llm" || !m.engine);

  // Build a lookup map of model details
  const detailsMap = new Map(modelDetails.map((d) => [d.id, d]));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(modelsJsonLd) }}
      />

      <div className="py-12 sm:py-16 bg-[var(--background)] min-h-screen">
        <Container>
          {/* Hero Section */}
          <div className="max-w-3xl mb-14 space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="primary" size="sm" className="gap-1.5 py-1 px-3">
                <Sliders className="w-3.5 h-3.5 text-[var(--primary)]" />
                Dual-Engine Platform
              </Badge>
              <span className="text-xs font-medium text-[var(--muted-foreground)]">
                {models.length} Supported AI Engines & Models
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--foreground)] leading-tight">
              AI Models & Prompt Engineering Hub
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-[var(--muted-foreground)]">
              Every foundation model interprets language through distinct architecture tokens. Master
              parameter flags for diffusion engines like Midjourney and FLUX, and structured prompt
              frameworks for frontier LLMs like Claude, ChatGPT, and Gemini.
            </p>
          </div>

          {/* Section 1: Visual & Generative AI Models */}
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-[var(--border)]">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500">
                    <Camera className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)]">
                    Visual & Diffusion Engines
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-1">
                  Photorealistic lighting, optical camera parameters, aspect ratio tokens, and composition grids.
                </p>
              </div>

              <Link
                href="/tools/composition-ruler"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-500 hover:text-amber-400 transition-colors self-start sm:self-auto"
              >
                <Compass className="w-3.5 h-3.5" />
                Launch Composition Ruler Tool →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {visualModels.map((model) => {
                const detail = detailsMap.get(model.id);
                const count = getPromptsByModel(model.id).length;

                return (
                  <Link
                    key={model.id}
                    href={`/models/${model.id}`}
                    className="group block"
                  >
                    <Card className="h-full p-6 transition-all duration-300 hover:border-[var(--primary)]/50 hover:shadow-xl hover:shadow-[var(--primary)]/5 relative overflow-hidden flex flex-col justify-between">
                      {/* Gradient glow top accent */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500/60 via-orange-500/60 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                      <div>
                        {/* Top Meta row */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
                              {model.provider}
                            </span>
                            <Badge variant="outline" size="sm" className="font-mono text-[11px] text-amber-400 border-amber-500/30 bg-amber-500/10">
                              {model.badge}
                            </Badge>
                          </div>
                          <Badge variant="secondary" size="sm" className="text-xs">
                            {count} {count === 1 ? "Prompt" : "Prompts"}
                          </Badge>
                        </div>

                        {/* Title & Tagline */}
                        <h3 className="text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors mb-1.5">
                          {model.name}
                        </h3>
                        <p className="text-xs font-medium text-amber-400/90 mb-3">
                          {detail?.tagline || model.description}
                        </p>
                        <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed mb-4 line-clamp-2">
                          {model.description}
                        </p>

                        {/* Strengths Pills */}
                        {detail?.strengths && (
                          <div className="space-y-1.5 mb-5">
                            {detail.strengths.slice(0, 2).map((strength, sIdx) => (
                              <div key={sIdx} className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                <span className="line-clamp-1">{strength}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Footer CTA & Parameter teaser */}
                      <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs">
                        <span className="font-mono text-[11px] text-[var(--muted-foreground)]">
                          {detail?.parameters?.[0]?.token ? `Flag: ${detail.parameters[0].token}` : "Param Guidance"}
                        </span>
                        <span className="inline-flex items-center gap-1 font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                          Parameter Guide & Prompts
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Section 2: Reasoning & Knowledge Work LLMs */}
          <div className="mb-16">
            <div className="mb-6 pb-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--foreground)]">
                  Reasoning & Knowledge Work LLMs
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-1">
                Structured frameworks, XML tag syntax, multi-shot exemplars, and code engineering prompt patterns.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {llmModels.map((model) => {
                const detail = detailsMap.get(model.id);
                const count = getPromptsByModel(model.id).length;

                return (
                  <Link
                    key={model.id}
                    href={`/models/${model.id}`}
                    className="group block"
                  >
                    <Card className="h-full p-6 transition-all duration-300 hover:border-[var(--primary)]/50 hover:shadow-xl hover:shadow-[var(--primary)]/5 relative overflow-hidden flex flex-col justify-between">
                      {/* Gradient glow top accent */}
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500/60 via-indigo-500/60 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                      <div>
                        {/* Top Meta row */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
                            {model.provider}
                          </span>
                          <Badge variant="outline" size="sm" className="font-mono text-[11px] text-blue-400 border-blue-500/30 bg-blue-500/10">
                            {model.badge}
                          </Badge>
                        </div>

                        {/* Title & Tagline */}
                        <h3 className="text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors mb-1">
                          {model.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-[var(--muted-foreground)] leading-relaxed mb-4 line-clamp-3">
                          {model.description}
                        </p>

                        {/* Key Spec */}
                        {detail?.contextOrResolution && (
                          <div className="bg-[var(--secondary)]/40 rounded-md p-2 mb-4 border border-[var(--border)]">
                            <span className="text-[11px] text-[var(--muted-foreground)] block">Context / Window:</span>
                            <span className="text-xs font-mono text-[var(--foreground)] font-medium line-clamp-1">
                              {detail.contextOrResolution}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Footer CTA */}
                      <div className="pt-4 border-t border-[var(--border)] flex items-center justify-between text-xs">
                        <span className="text-xs font-medium text-[var(--muted-foreground)]">
                          {count} {count === 1 ? "Prompt" : "Prompts"}
                        </span>
                        <span className="inline-flex items-center gap-1 font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                          View Hub
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Educational Callout: The Dual-Engine Paradigm */}
          <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--secondary)]/40 via-[var(--background)] to-[var(--secondary)]/20 p-6 sm:p-10 mb-12">
            <div className="max-w-3xl space-y-4">
              <Badge variant="outline" size="sm" className="text-xs font-mono border-[var(--primary)]/30 text-[var(--primary)]">
                Engineering Architecture
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
                Why Model Architecture Dictates Prompt Syntax
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-[var(--muted-foreground)]">
                Diffusion models (Midjourney, FLUX) and Autoregressive Transformers (Claude, ChatGPT) operate on fundamentally
                different token-attention dynamics. While Claude thrives on hierarchical XML tags (<code>&lt;rules&gt;</code>) and
                negative examples, diffusion networks rely on physical optical parameters, natural language scene lighting, and
                exact aspect ratio bounding boxes.
              </p>
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="/tools/composition-ruler"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] font-semibold text-xs sm:text-sm hover:opacity-90 transition-opacity"
                >
                  <Compass className="w-4 h-4" />
                  Try Composition Ruler Studio
                </Link>
                <Link
                  href="/guides"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] font-semibold text-xs sm:text-sm hover:bg-[var(--secondary)] transition-colors"
                >
                  <Layers className="w-4 h-4" />
                  Explore Masterclass Guides
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}
