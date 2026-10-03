import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { PromptsExplorer } from "@/components/prompts/prompts-explorer";
import { PromptsExplorerSkeleton } from "@/components/prompts/prompts-explorer-skeleton";
import {
  getAllPrompts,
  getAllTags,
  getAllUseCases,
} from "@/lib/data/prompts";
import { getAllCategories } from "@/lib/data/categories";
import { getAllModels } from "@/lib/data/models";

import { constructMetadata } from "@/lib/seo";

export const metadata: Metadata = constructMetadata({
  title: "Explore AI Prompts",
  description:
    "Find practical prompts for work, creativity, learning, coding, and more. Tested and verified for ChatGPT, Claude, Gemini, and Microsoft Copilot.",
  path: "/prompts",
  keywords: [
    "AI prompts",
    "prompt library",
    "ChatGPT prompts",
    "Claude prompts",
    "coding prompts",
    "resume prompts",
    "productivity prompts",
  ],
});

export default function PromptsPage() {
  const allPrompts = getAllPrompts();
  const allCategories = getAllCategories();
  const allModels = getAllModels();
  const popularTags = getAllTags();
  const allUseCases = getAllUseCases();

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 sm:py-16">
      <Container>
        {/* Page Header */}
        <div className="max-w-3xl mb-10 space-y-3">
          <div className="inline-flex items-center gap-2">
            <Badge variant="primary" size="sm">
              Verified Prompt Library
            </Badge>
            <span className="text-xs text-[var(--muted-foreground)]">
              {allPrompts.length} Production Prompts Available
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--foreground)]">
            Explore AI Prompts
          </h1>

          <p className="text-sm sm:text-base leading-relaxed text-[var(--muted-foreground)]">
            Find practical prompts for work, creativity, learning, coding, and more.
          </p>
        </div>

        {/* Interactive Discovery & Filtering Suite */}
        <Suspense fallback={<PromptsExplorerSkeleton />}>
          <PromptsExplorer
            initialPrompts={allPrompts}
            categories={allCategories}
            models={allModels}
            popularTags={popularTags}
            useCases={allUseCases}
          />
        </Suspense>
      </Container>
    </div>
  );
}
