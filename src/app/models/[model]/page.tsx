import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PromptCard } from "@/components/prompts/prompt-card";
import { getAllModels, getModelById, getFullModelDetail } from "@/lib/data/models";
import { getPromptsByModel } from "@/lib/data/prompts";
import { generateModelJsonLd, generateBreadcrumbJsonLd, generateFaqJsonLd } from "@/lib/structured-data";
import { constructMetadata } from "@/lib/seo";
import { AIModelId } from "@/types/model";
import {
  Sliders,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Camera,
  MessageSquare,
  Compass,
  Cpu,
  Layers,
  Terminal,
  HelpCircle,
} from "lucide-react";

interface ModelPageProps {
  params: Promise<{
    model: string;
  }>;
}

export async function generateStaticParams() {
  const models = getAllModels();
  return models.map((m) => ({
    model: m.id,
  }));
}

export async function generateMetadata({ params }: ModelPageProps): Promise<Metadata> {
  const { model: modelId } = await params;
  const model = getModelById(modelId as AIModelId);
  const detail = getFullModelDetail(modelId);

  if (!model) {
    return constructMetadata({
      title: "Model Not Found",
      description: "The requested AI model guide could not be found.",
      path: "/models",
    });
  }

  const title = `${model.name} Prompt Guide & Parameter Cheat Sheet (${model.badge})`;
  const description =
    detail?.description ||
    `Master ${model.name} prompt engineering with parameter syntax cheat sheets, architectural tips, and battle-tested prompt templates.`;

  return constructMetadata({
    title,
    description,
    path: `/models/${model.id}`,
    keywords: [
      `${model.name} prompts`,
      `${model.name} parameters`,
      `${model.name} cheat sheet`,
      `${model.name} ${model.badge} guide`,
      `${model.name} prompt engineering`,
      model.engine === "visual" ? "visual AI prompt" : "LLM prompt framework",
    ],
  });
}

export default async function ModelHubPage({ params }: ModelPageProps) {
  const { model: modelId } = await params;
  const model = getModelById(modelId as AIModelId);
  const detail = getFullModelDetail(modelId);

  if (!model) {
    notFound();
  }

  const prompts = getPromptsByModel(model.id as AIModelId);
  const allModels = getAllModels();
  const siblingModels = allModels.filter((m) => m.id !== model.id && m.engine === model.engine);

  const modelJsonLd = generateModelJsonLd(model, detail, prompts);
  const faqJsonLd = detail?.faqs && detail.faqs.length > 0 ? generateFaqJsonLd(detail.faqs) : null;
  const breadcrumbsJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "AI Models", url: "/models" },
    { name: model.name, url: `/models/${model.id}` },
  ]);

  const isVisual = model.engine === "visual";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(modelJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
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
                {model.name}
              </li>
            </ol>
          </nav>

          {/* Hero Header */}
          <div className="rounded-2xl border border-[var(--border)] bg-gradient-to-b from-[var(--secondary)]/30 to-[var(--background)] p-6 sm:p-10 mb-12 relative overflow-hidden">
            <div className="max-w-4xl space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge
                  variant="primary"
                  size="sm"
                  className={isVisual ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : "bg-blue-500/10 text-blue-400 border-blue-500/20"}
                >
                  {isVisual ? (
                    <span className="inline-flex items-center gap-1">
                      <Camera className="w-3 h-3" /> Visual Diffusion Engine
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" /> LLM Reasoning Engine
                    </span>
                  )}
                </Badge>
                <Badge variant="outline" size="sm" className="font-mono text-xs">
                  {model.badge}
                </Badge>
                <span className="text-xs text-[var(--muted-foreground)] uppercase tracking-wider font-medium">
                  {model.provider}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--foreground)]">
                {model.name} Prompt Engineering Guide
              </h1>

              <p className="text-base sm:text-xl font-medium text-[var(--primary)] leading-snug">
                {detail?.tagline || model.description}
              </p>

              <p className="text-sm sm:text-base leading-relaxed text-[var(--muted-foreground)] max-w-3xl">
                {detail?.longDescription || model.description}
              </p>

              {/* Key Specs Pills */}
              <div className="pt-2 flex flex-wrap gap-3 text-xs">
                {detail?.architecture && (
                  <div className="px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] flex items-center gap-1.5 text-[var(--muted-foreground)]">
                    <Cpu className="w-3.5 h-3.5 text-[var(--primary)]" />
                    <span className="font-medium text-[var(--foreground)]">Architecture:</span>
                    <span>{detail.architecture}</span>
                  </div>
                )}
                {detail?.contextOrResolution && (
                  <div className="px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] flex items-center gap-1.5 text-[var(--muted-foreground)]">
                    <Layers className="w-3.5 h-3.5 text-[var(--primary)]" />
                    <span className="font-medium text-[var(--foreground)]">Context / Res:</span>
                    <span className="font-mono">{detail.contextOrResolution}</span>
                  </div>
                )}
                {model.website && (
                  <a
                    href={model.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)]/50 transition-colors flex items-center gap-1.5 text-[var(--foreground)] font-medium"
                  >
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3 text-[var(--muted-foreground)]" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Section: Parameter Cheat Sheet */}
          {detail?.parameters && detail.parameters.length > 0 && (
            <div className="mb-14">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-[var(--border)]">
                <div>
                  <h2 className="text-2xl font-bold text-[var(--foreground)] flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-[var(--primary)]" />
                    Parameter & Token Syntax Cheat Sheet
                  </h2>
                  <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-1">
                    Official parameter flags, modifiers, and delimiters recognized by the {model.name} engine.
                  </p>
                </div>

                {isVisual && (
                  <Link
                    href="/tools/composition-ruler"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-500 hover:text-amber-400 self-start sm:self-auto"
                  >
                    <Compass className="w-3.5 h-3.5" />
                    Open Ruler Studio
                  </Link>
                )}
              </div>

              <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-[var(--secondary)]/60 text-[var(--foreground)] border-b border-[var(--border)] text-xs uppercase tracking-wider font-semibold">
                    <tr>
                      <th className="py-3 px-4">Parameter / Flag</th>
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Accepted Values</th>
                      <th className="py-3 px-4">Default</th>
                      <th className="py-3 px-4">Description & Example</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)] text-[var(--muted-foreground)]">
                    {detail.parameters.map((param, pIdx) => (
                      <tr key={pIdx} className="hover:bg-[var(--secondary)]/20 transition-colors">
                        <td className="py-3 px-4 font-mono font-bold text-[var(--primary)] whitespace-nowrap">
                          {param.token}
                        </td>
                        <td className="py-3 px-4 font-medium text-[var(--foreground)] whitespace-nowrap">
                          {param.name}
                        </td>
                        <td className="py-3 px-4 font-mono text-xs">
                          {param.acceptedValues}
                        </td>
                        <td className="py-3 px-4 font-mono text-xs text-[var(--muted-foreground)]">
                          {param.defaultValue || "—"}
                        </td>
                        <td className="py-3 px-4 space-y-1">
                          <p className="leading-snug text-xs sm:text-sm">{param.description}</p>
                          <div className="bg-[var(--background)] px-2 py-1 rounded font-mono text-[11px] text-[var(--foreground)] border border-[var(--border)] inline-block">
                            {param.example}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Section: Best Practices vs Anti-Patterns */}
          {detail && (detail.bestPractices.length > 0 || detail.antiPatterns.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
              {/* Best Practices */}
              <Card className="p-6 border-emerald-500/20 bg-emerald-500/[0.02]">
                <div className="flex items-center gap-2 mb-4 text-emerald-400 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <h3>Engineering Best Practices</h3>
                </div>
                <ul className="space-y-3">
                  {detail.bestPractices.map((practice, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed text-[var(--muted-foreground)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                      <span>{practice}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Anti-Patterns */}
              <Card className="p-6 border-amber-500/20 bg-amber-500/[0.02]">
                <div className="flex items-center gap-2 mb-4 text-amber-400 font-bold text-base">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <h3>Common Anti-Patterns to Avoid</h3>
                </div>
                <ul className="space-y-3">
                  {detail.antiPatterns.map((anti, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed text-[var(--muted-foreground)]">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                      <span>{anti}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          )}

          {/* Section: Exemplar Gold-Standard Prompt */}
          {detail?.samplePrompt && (
            <div className="mb-14">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-[var(--foreground)] flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-[var(--primary)]" />
                  Gold-Standard Template Breakdown
                </h2>
                <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-1">
                  How an optimized {model.name} prompt looks in production with all parameters aligned.
                </p>
              </div>

              <Card className="p-6 bg-[var(--card)] border-[var(--border)] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-[var(--foreground)]">
                    {detail.samplePrompt.title}
                  </span>
                  <Badge variant="outline" size="sm" className="font-mono text-xs">
                    Production Exemplar
                  </Badge>
                </div>

                <div className="bg-[var(--secondary)]/60 rounded-xl p-4 font-mono text-xs sm:text-sm text-[var(--foreground)] border border-[var(--border)] leading-relaxed whitespace-pre-wrap select-all">
                  {detail.samplePrompt.rawPrompt}
                </div>

                <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                  <strong className="text-[var(--foreground)]">Architectural Rationale:</strong>{" "}
                  {detail.samplePrompt.explanation}
                </p>
              </Card>
            </div>
          )}

          {/* Section: Prompt Gallery */}
          <div className="mb-16">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b border-[var(--border)]">
              <div>
                <h2 className="text-2xl font-bold text-[var(--foreground)]">
                  Compatible Prompts ({prompts.length})
                </h2>
                <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-1">
                  Curated and battle-tested prompts verified for the {model.name} engine.
                </p>
              </div>

              <Link
                href="/prompts"
                className="text-xs font-semibold text-[var(--primary)] hover:underline self-start sm:self-auto"
              >
                Browse All 235+ Prompts →
              </Link>
            </div>

            {prompts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {prompts.map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 rounded-xl border border-[var(--border)] bg-[var(--secondary)]/20 p-6">
                <p className="text-sm text-[var(--muted-foreground)] mb-3">
                  No specific prompts cataloged exclusively for this model yet.
                </p>
                <Link
                  href="/prompts"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-semibold hover:opacity-90"
                >
                  Explore General Catalog
                </Link>
              </div>
            )}
          </div>

          {/* Section: Frequently Asked Technical Questions */}
          {detail?.faqs && detail.faqs.length > 0 && (
            <div className="mb-16 space-y-4">
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-[var(--primary)]" />
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
                  Frequently Asked Technical Questions
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {detail.faqs.map((faq, idx) => (
                  <Card key={idx} className="p-6 space-y-2.5 border-[var(--border)] bg-[var(--card)]">
                    <h3 className="text-sm font-bold text-[var(--foreground)] leading-snug">
                      {faq.question}
                    </h3>
                    <p className="text-xs text-[var(--muted-foreground)] leading-relaxed">
                      {faq.answer}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Related Sibling Models */}
          {siblingModels.length > 0 && (
            <div className="pt-8 border-t border-[var(--border)]">
              <h3 className="text-base font-bold text-[var(--foreground)] mb-4">
                Other {isVisual ? "Visual Diffusion" : "LLM Reasoning"} Engines
              </h3>
              <div className="flex flex-wrap gap-3">
                {siblingModels.map((s) => (
                  <Link
                    key={s.id}
                    href={`/models/${s.id}`}
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)]/50 transition-colors text-xs font-medium text-[var(--foreground)]"
                  >
                    <span>{s.name}</span>
                    <Badge variant="outline" size="sm" className="font-mono text-[10px]">
                      {s.badge}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </Container>
      </div>
    </>
  );
}
