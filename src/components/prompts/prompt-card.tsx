"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Prompt } from "@/types/prompt";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/toast";
import { cn, copyToClipboard } from "@/lib/utils";
import { useSavedPromptIds, toggleSavedPromptId } from "@/lib/storage";
import { trackPromptCopy, trackPromptSave } from "@/lib/analytics";
import {
  Bookmark,
  Copy,
  Check,
  ArrowRight,
} from "lucide-react";

interface PromptCardProps {
  prompt: Prompt;
  className?: string;
}

export function PromptCard({ prompt, className }: PromptCardProps) {
  const { success } = useToast();
  const [isCopied, setIsCopied] = useState(false);
  const savedIds = useSavedPromptIds();
  const isSaved = savedIds.includes(prompt.id);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const textToCopy = prompt.prompt || prompt.template || "";
    const ok = await copyToClipboard(textToCopy);
    if (ok) {
      setIsCopied(true);
      success(`Copied "${prompt.title}" to clipboard!`);
    } else {
      success(`Unable to copy automatically.`);
    }

    trackPromptCopy({
      promptId: prompt.id,
      category: prompt.categoryName || prompt.category,
      sourcePage: typeof window !== "undefined" ? window.location.pathname : "/prompts",
      isCustomized: false,
      modelCompatibility: prompt.compatibleModels,
      variableCount: prompt.variables?.length || 0,
    });

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const handleToggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const nowSaved = toggleSavedPromptId(prompt.id);
    if (nowSaved) {
      success("Saved to your personal collection");
    } else {
      success("Removed from saved prompts");
    }

    trackPromptSave(
      prompt.id,
      nowSaved ? "save" : "unsave",
      prompt.categoryName || prompt.category,
      typeof window !== "undefined" ? window.location.pathname : "/prompts"
    );
  };

  const difficultyConfig = {
    beginner: {
      className: "text-[var(--status-success)] bg-[var(--status-success-bg)] border-[var(--status-success)]/20",
    },
    intermediate: {
      className: "text-[var(--status-info)] bg-[var(--status-info-bg)] border-[var(--status-info)]/20",
    },
    advanced: {
      className: "text-[var(--status-warning)] bg-[var(--status-warning-bg)] border-[var(--status-warning)]/20",
    },
  };

  const difficulty = difficultyConfig[prompt.difficulty] ?? difficultyConfig.beginner;

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5.5 card-lift hover:bg-[var(--card-hover)]",
        className
      )}
    >
      <div>
        {/* ── Top Meta Bar ── */}
        <div className="flex items-start justify-between gap-2 pb-3.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge variant="primary" size="sm" className="capitalize">
              {prompt.categoryName || prompt.category}
            </Badge>
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-medium capitalize tracking-wide",
                difficulty.className
              )}
            >
              {prompt.difficulty}
            </span>
          </div>

          <button
            type="button"
            onClick={handleToggleSave}
            aria-label={isSaved ? `Remove "${prompt.title}" from saved` : `Save "${prompt.title}"`}
            className={cn(
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-[var(--radius-sm)] border transition-all duration-150 cursor-pointer",
              isSaved
                ? "border-[var(--primary)]/60 bg-[var(--primary-muted)] text-[var(--primary)]"
                : "border-transparent text-[var(--muted-foreground)] hover:border-[var(--border-strong)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)]"
            )}
          >
            <Bookmark
              className={cn("h-3.5 w-3.5", isSaved && "fill-[var(--primary)]")}
            />
          </button>
        </div>

        {/* ── Title & Description ── */}
        <div className="space-y-2">
          <Link
            href={`/prompts/${prompt.slug}`}
            className="block text-sm font-semibold tracking-tight text-[var(--foreground)] hover:text-[var(--primary)] transition-colors leading-snug"
          >
            <h3 className="line-clamp-2">{prompt.title}</h3>
          </Link>
          <p className="line-clamp-2 text-xs leading-relaxed text-[var(--muted-foreground)]">
            {prompt.shortDescription || prompt.description}
          </p>
        </div>

        {/* ── Models & Tags ── */}
        <div className="mt-4 space-y-2.5">
          {/* Compatible AI Models */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {prompt.compatibleModels.map((m) => (
              <span
                key={m}
                className="inline-flex items-center rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--secondary)]/70 px-2 py-0.5 font-mono text-[10px] text-[var(--muted-foreground)] tracking-wide leading-tight"
              >
                {m}
              </span>
            ))}
          </div>

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            {prompt.tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[10px] text-[var(--subtle-foreground)] hover:text-[var(--muted-foreground)] transition-colors cursor-default"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Card Footer ── */}
      <div className="mt-4 flex items-center justify-between gap-2 border-t border-[var(--border-subtle)] pt-3.5">
        <Link
          href={`/prompts/${prompt.slug}`}
          aria-label={`View prompt: ${prompt.title}`}
          className="group/link inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] hover:opacity-80 transition-opacity"
        >
          <span>View Prompt</span>
          <ArrowRight
            className="h-3 w-3 transition-transform group-hover/link:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>

        <button
          type="button"
          onClick={handleCopy}
          aria-label={isCopied ? `Copied to clipboard` : `Copy prompt: ${prompt.title}`}
          className={cn(
            "inline-flex h-7 items-center gap-1.5 rounded-[var(--radius-sm)] border px-2.5 text-[11px] font-medium transition-all duration-150 cursor-pointer",
            isCopied
              ? "border-[var(--status-success)]/30 bg-[var(--status-success-bg)] text-[var(--status-success)]"
              : "border-[var(--border-strong)] bg-[var(--secondary)] text-[var(--muted-foreground)] hover:border-[var(--border-strong)] hover:bg-[var(--accent)] hover:text-[var(--foreground)]"
          )}
        >
          {isCopied ? (
            <Check className="h-3 w-3" aria-hidden="true" />
          ) : (
            <Copy className="h-3 w-3" aria-hidden="true" />
          )}
          <span>{isCopied ? "Copied" : "Copy"}</span>
        </button>
      </div>
    </div>
  );
}
