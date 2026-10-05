"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
  Camera,
  Terminal,
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
  const isVisual = Boolean(prompt.visualMetadata);

  // ═══════════════════════════════════════════════════════════════════════════
  // VARIANT A: Visual AI Prompt Card (Hero Image Cover + Optical HUD)
  // ═══════════════════════════════════════════════════════════════════════════
  if (isVisual && prompt.visualMetadata) {
    const meta = prompt.visualMetadata;
    return (
      <div
        className={cn(
          "group relative flex flex-col justify-between rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] overflow-hidden card-lift hover:bg-[var(--card-hover)] hover:border-[var(--primary)]/40 transition-all duration-200",
          className
        )}
      >
        <div>
          {/* ── Top Hero Image ── */}
          <Link
            href={`/prompts/${prompt.slug}`}
            className="block relative w-full aspect-[16/10] overflow-hidden bg-black/60"
            aria-label={`View visual prompt: ${prompt.title}`}
          >
            <Image
              src={meta.previewImageUrl}
              alt={meta.previewImageAlt || prompt.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            />

            {/* Gradient Overlays for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/40 pointer-events-none" />

            {/* Top Bar Floating Badges */}
            <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-wide bg-black/60 backdrop-blur-md text-white border border-white/15 shadow-sm capitalize pointer-events-auto">
                <Camera className="h-3 w-3 text-amber-400" />
                {prompt.categoryName || prompt.category}
              </span>

              <button
                type="button"
                onClick={handleToggleSave}
                aria-label={isSaved ? `Remove "${prompt.title}" from saved` : `Save "${prompt.title}"`}
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-md border backdrop-blur-md transition-all duration-150 cursor-pointer pointer-events-auto shadow-sm",
                  isSaved
                    ? "border-amber-400/60 bg-amber-400/20 text-amber-300"
                    : "border-white/15 bg-black/60 text-white/80 hover:text-white hover:bg-black/80"
                )}
              >
                <Bookmark className={cn("h-3.5 w-3.5", isSaved && "fill-current")} />
              </button>
            </div>

            {/* Bottom Bar Floating HUD Pill */}
            <div className="absolute bottom-2.5 inset-x-3 flex items-center justify-between text-[10px] font-mono text-white/95 pointer-events-none">
              <div className="px-2 py-0.5 rounded bg-black/75 backdrop-blur-xs border border-white/15 flex items-center gap-1.5 shadow-sm">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>{meta.aspectRatio}</span>
                <span className="text-white/40">•</span>
                <span className="uppercase font-semibold tracking-wider">{meta.model}</span>
                {meta.modelVersion && (
                  <>
                    <span className="text-white/40">•</span>
                    <span className="text-white/70">{meta.modelVersion}</span>
                  </>
                )}
              </div>

              {meta.camera?.focalLength && (
                <div className="hidden sm:inline-flex px-2 py-0.5 rounded bg-black/75 backdrop-blur-xs border border-white/15 text-white/80 shadow-sm truncate max-w-[130px]">
                  {meta.camera.focalLength}
                </div>
              )}
            </div>
          </Link>

          {/* ── Card Content Body ── */}
          <div className="p-5 space-y-3">
            <div className="space-y-1.5">
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

            {/* Camera / Optics Snippet */}
            {meta.camera && (
              <div className="rounded-md border border-[var(--border-subtle)] bg-[var(--secondary)]/40 px-2.5 py-1.5 text-[11px] font-mono text-[var(--muted-foreground)] flex items-center gap-2 truncate">
                <span className="text-amber-400/90 font-semibold text-[10px] uppercase tracking-wider">OPTICS</span>
                <span className="text-[var(--border-strong)]">•</span>
                <span className="truncate">
                  {meta.camera.lens || meta.camera.filmStock || meta.camera.aperture || "Calibrated Lens"}
                </span>
              </div>
            )}

            {/* Tags */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              {prompt.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="text-[10px] text-[var(--subtle-foreground)] hover:text-[var(--muted-foreground)] transition-colors"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div className="flex items-center justify-between gap-2 border-t border-[var(--border-subtle)] px-5 py-3.5 bg-[var(--card)]">
          <Link
            href={`/prompts/${prompt.slug}`}
            aria-label={`View prompt: ${prompt.title}`}
            className="group/link inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--primary)] hover:opacity-80 transition-opacity"
          >
            <span>View Prompt & Calibration</span>
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

  // ═══════════════════════════════════════════════════════════════════════════
  // VARIANT B: Text & LLM Prompt Card (Live Template Snippet + Balanced Height)
  // ═══════════════════════════════════════════════════════════════════════════
  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between rounded-[var(--radius-lg)] border border-[var(--border)] bg-[var(--card)] p-5 card-lift hover:bg-[var(--card-hover)] hover:border-[var(--primary)]/30 transition-all duration-200",
        className
      )}
    >
      <div>
        {/* ── Top Meta Bar ── */}
        <div className="flex items-start justify-between gap-2 pb-3">
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
        <div className="space-y-1.5">
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

        {/* ── Prompt Template Snippet Box (Balances Height with Visual Cards) ── */}
        <div className="my-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--secondary)]/40 p-3 font-mono text-[11px] leading-relaxed text-[var(--muted-foreground)] select-none">
          <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[var(--border-subtle)] text-[10px] font-sans font-medium text-[var(--muted-foreground)]/80 uppercase tracking-wider">
            <span className="flex items-center gap-1.5 text-[var(--primary)]">
              <Terminal className="h-3 w-3" />
              <span>Prompt Template</span>
            </span>
            <span className="text-[10px] text-[var(--muted-foreground)]/70 font-mono lowercase">
              {prompt.variables && prompt.variables.length > 0 ? `${prompt.variables.length} vars` : "verified"}
            </span>
          </div>
          <p className="line-clamp-2 text-[var(--foreground)]/85">
            <span className="text-[var(--primary)] font-bold select-none mr-1.5">›</span>
            {prompt.prompt || prompt.template}
          </p>
        </div>

        {/* ── Models & Tags ── */}
        <div className="space-y-2.5">
          {/* Compatible AI Models */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {prompt.compatibleModels.map((m) => (
              <span
                key={m}
                className="inline-flex items-center rounded-[var(--radius-sm)] border border-[var(--border-subtle)] bg-[var(--secondary)]/70 px-2 py-0.5 font-mono text-[10px] text-[var(--muted-foreground)] tracking-wide leading-tight capitalize"
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
