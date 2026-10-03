import React from "react";
import Link from "next/link";
import { getPromptById } from "@/lib/data/prompts";
import { Badge } from "@/components/ui/badge";
import { Sparkles, ArrowRight, Terminal } from "lucide-react";

interface GuideInlinePromptProps {
  promptId: string;
}

export function GuideInlinePrompt({ promptId }: GuideInlinePromptProps) {
  const prompt = getPromptById(promptId);
  if (!prompt) return null;

  return (
    <div className="my-6 rounded-[var(--radius-lg)] border border-[var(--primary)]/30 bg-gradient-to-r from-[var(--primary)]/5 via-[var(--card)] to-[var(--card)] p-5 shadow-xs transition-all hover:border-[var(--primary)]/50">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          <Badge variant="primary" size="sm" className="gap-1">
            <Sparkles className="h-3 w-3" />
            Featured Prompt Template
          </Badge>
          <span className="text-xs text-[var(--muted-foreground)] font-mono">
            {prompt.difficulty}
          </span>
        </div>
        <Badge variant="secondary" size="sm">
          {prompt.category}
        </Badge>
      </div>

      <h4 className="text-base font-bold text-[var(--foreground)] tracking-tight mb-1">
        {prompt.title}
      </h4>

      <p className="text-xs text-[var(--subtle-foreground)] line-clamp-2 mb-4 leading-relaxed">
        {prompt.shortDescription}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-[var(--border-subtle)] text-xs">
        <div className="flex items-center gap-1.5 text-[var(--muted-foreground)] font-mono text-[11px]">
          <Terminal className="h-3.5 w-3.5 text-[var(--primary)]" />
          <span>Ready to copy & customize</span>
        </div>

        <Link
          href={`/prompts/${prompt.slug}`}
          className="inline-flex items-center gap-1.5 font-semibold text-[var(--primary)] hover:underline"
        >
          <span>View Prompt Playground</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}
