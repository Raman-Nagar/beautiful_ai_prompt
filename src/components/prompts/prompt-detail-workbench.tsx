"use client";

import React, { useState, useMemo, useRef } from "react";
import { Prompt, PromptVariable } from "@/types/prompt";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input, Textarea } from "@/components/ui/input";
import {
  tokenizePrompt,
  interpolatePrompt,
  normalizePromptVariables,
} from "@/lib/prompt-engine";
import { useSavedPromptIds, toggleSavedPromptId } from "@/lib/storage";
import {
  trackPromptView,
  trackPromptCopy,
  trackPromptCustomize,
  trackPromptSave,
  trackExternalAiClick,
} from "@/lib/analytics";
import {
  Copy,
  Check,
  Share2,
  Bookmark,
  Printer,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Code2,
  FileText,
  ExternalLink,
} from "lucide-react";
import { cn, copyToClipboard } from "@/lib/utils";

interface PromptDetailWorkbenchProps {
  prompt: Prompt;
}

export function PromptDetailWorkbench({ prompt }: PromptDetailWorkbenchProps) {
  const customizerRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  // Track prompt_view when page is mounted
  React.useEffect(() => {
    trackPromptView({
      promptId: prompt.id,
      slug: prompt.slug,
      category: prompt.categoryName || prompt.category,
      title: prompt.title,
      difficulty: prompt.difficulty,
    });
  }, [prompt.id, prompt.slug, prompt.categoryName, prompt.category, prompt.title, prompt.difficulty]);

  // Normalize variables so bracketed tokens like [ROLE], [CONTEXT], [CONTENT] are supported
  const variables: PromptVariable[] = useMemo(() => {
    return normalizePromptVariables(prompt);
  }, [prompt]);

  // Initial variable form values
  const initialValues = useMemo(() => {
    const vals: Record<string, string> = {};
    variables.forEach((v) => {
      const key = v.name || v.key || "";
      vals[key] = v.defaultValue || "";
    });
    return vals;
  }, [variables]);

  const [formValues, setFormValues] = useState<Record<string, string>>(initialValues);
  const [viewMode, setViewMode] = useState<"highlighted" | "raw">("highlighted");

  // Non-intrusive inline feedback states (NO intrusive toasts)
  const [feedback, setFeedback] = useState<{
    id: string;
    message: string;
    type: "success" | "info";
  } | null>(null);

  const feedbackTimerRef = useRef<NodeJS.Timeout | null>(null);

  const showInlineFeedback = (id: string, message: string, type: "success" | "info" = "success") => {
    if (feedbackTimerRef.current) {
      clearTimeout(feedbackTimerRef.current);
    }
    setFeedback({ id, message, type });
    feedbackTimerRef.current = setTimeout(() => {
      setFeedback(null);
    }, 2500);
  };

  // Saved prompt state via localStorage
  const savedIds = useSavedPromptIds();
  const isSaved = savedIds.includes(prompt.id);

  // Raw prompt text and tokenization
  const rawTemplate = prompt.prompt || prompt.template || "";
  const tokens = useMemo(() => tokenizePrompt(rawTemplate), [rawTemplate]);

  // Live customized prompt output
  const customizedOutput = useMemo(() => {
    return interpolatePrompt(rawTemplate, variables, formValues);
  }, [rawTemplate, variables, formValues]);

  // Handle variable input change
  const handleVariableChange = (key: string, value: string) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  // Reset variable values
  const handleResetFields = () => {
    setFormValues(initialValues);
    showInlineFeedback("customizer-reset", "Reset all parameters to default values.", "info");
  };

  // Apply quick preset theme values to variables
  const handleApplyPresetTheme = (
    themeName: string,
    updater: (curr: Record<string, string>) => Record<string, string>
  ) => {
    setFormValues((prev) => updater(prev));
    showInlineFeedback("quick-preset", `Applied "${themeName}" preset values!`, "success");
    trackPromptCustomize({
      promptId: prompt.id,
      variableCount: variables.length,
      customizedFields: Object.keys(formValues),
      sourcePage: typeof window !== "undefined" ? window.location.pathname : `/prompts/${prompt.slug}`,
    });
  };

  // Copy raw prompt template
  const handleCopyRaw = async () => {
    const ok = await copyToClipboard(rawTemplate);
    if (ok) {
      showInlineFeedback("raw-copy", "Raw prompt copied to clipboard!");

      trackPromptCopy({
        promptId: prompt.id,
        category: prompt.categoryName || prompt.category,
        sourcePage: typeof window !== "undefined" ? window.location.pathname : `/prompts/${prompt.slug}`,
        isCustomized: false,
        modelCompatibility: prompt.compatibleModels,
        variableCount: variables.length,
      });
    } else {
      showInlineFeedback("raw-copy", "Failed to copy prompt.", "info");
    }
  };

  // Copy customized prompt
  const handleCopyCustomized = async () => {
    const ok = await copyToClipboard(customizedOutput);
    if (ok) {
      showInlineFeedback("custom-copy", "Customized prompt copied to clipboard!");

      const source = typeof window !== "undefined" ? window.location.pathname : `/prompts/${prompt.slug}`;

      trackPromptCopy({
        promptId: prompt.id,
        category: prompt.categoryName || prompt.category,
        sourcePage: source,
        isCustomized: true,
        modelCompatibility: prompt.compatibleModels,
        variableCount: variables.length,
      });

      trackPromptCustomize({
        promptId: prompt.id,
        variableCount: variables.length,
        customizedFields: Object.keys(formValues),
        sourcePage: source,
      });
    } else {
      showInlineFeedback("custom-copy", "Failed to copy prompt.", "info");
    }
  };

  // Save for later (localStorage only)
  const handleToggleSave = () => {
    const newlySaved = toggleSavedPromptId(prompt.id);
    if (newlySaved) {
      showInlineFeedback("save", "Saved prompt to your local library.");
    } else {
      showInlineFeedback("save", "Removed prompt from your saved library.", "info");
    }

    trackPromptSave(
      prompt.id,
      newlySaved ? "save" : "unsave",
      prompt.categoryName || prompt.category,
      typeof window !== "undefined" ? window.location.pathname : `/prompts/${prompt.slug}`
    );
  };

  // Share action
  const handleShare = async () => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: prompt.title,
          text: prompt.shortDescription,
          url: shareUrl,
        });
        showInlineFeedback("share", "Shared successfully!");
        return;
      } catch (err: unknown) {
        // User cancelled or share failed, fallback to copy URL
        if ((err as Error)?.name === "AbortError") return;
      }
    }

    const ok = await copyToClipboard(shareUrl);
    if (ok) {
      showInlineFeedback("share", "Page link copied to clipboard!");
    } else {
      showInlineFeedback("share", "Could not copy link.", "info");
    }
  };

  // Print prompt action
  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  // Smooth scroll to customizer
  const handleScrollToCustomizer = () => {
    if (customizerRef.current) {
      customizerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => {
        if (firstInputRef.current) {
          firstInputRef.current.focus();
        }
      }, 400);
    }
  };

  // Prompt stats
  const wordCount = useMemo(() => {
    return rawTemplate.trim().split(/\s+/).filter(Boolean).length;
  }, [rawTemplate]);

  const customWordCount = useMemo(() => {
    return customizedOutput.trim().split(/\s+/).filter(Boolean).length;
  }, [customizedOutput]);

  return (
    <div className="space-y-10">
      {/* ========================================================================= */}
      {/* 1. MAIN PROMPT CARD / EDITOR (CORE EXPERIENCE)                            */}
      {/* ========================================================================= */}
      <section
        id="prompt-editor"
        className="print-card rounded-[var(--radius-xl)] border border-[var(--border-strong)] bg-[var(--card)] p-5 sm:p-7 shadow-lg relative overflow-hidden"
      >
        {/* Card Header & Toolbar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[var(--border)]">
          {/* Left Title & Status */}
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border border-[var(--primary)]/30 bg-[var(--primary-muted)] text-[var(--primary)] shrink-0">
              <Sparkles className="h-4.5 w-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold tracking-tight text-[var(--foreground)]">
                  Main Prompt Template
                </span>
                <Badge variant="outline" size="sm" className="hidden sm:inline-flex text-[11px] font-mono">
                  {variables.length} {variables.length === 1 ? "Variable" : "Variables"}
                </Badge>
              </div>
              <p className="text-xs text-[var(--muted-foreground)]">
                {wordCount} words • {rawTemplate.length} characters
              </p>
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex flex-wrap items-center gap-2 no-print">
            {/* View mode toggle */}
            <div className="hidden sm:flex items-center rounded-[var(--radius-md)] border border-[var(--border-subtle)] bg-[var(--secondary)]/60 p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setViewMode("highlighted")}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-1 rounded-[var(--radius-sm)] text-[11px] font-medium transition-colors cursor-pointer",
                  viewMode === "highlighted"
                    ? "bg-[var(--card)] text-[var(--foreground)] shadow-xs"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                )}
                title="View with highlighted variable tokens"
              >
                <Code2 className="h-3 w-3" />
                <span>Tokens</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("raw")}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-1 rounded-[var(--radius-sm)] text-[11px] font-medium transition-colors cursor-pointer",
                  viewMode === "raw"
                    ? "bg-[var(--card)] text-[var(--foreground)] shadow-xs"
                    : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                )}
                title="View plain monospace text"
              >
                <FileText className="h-3 w-3" />
                <span>Plain</span>
              </button>
            </div>

            {/* Print button (hidden on mobile) */}
            <Button
              size="sm"
              variant="outline"
              onClick={handlePrint}
              leftIcon={<Printer className="h-3.5 w-3.5" />}
              className="text-xs hidden sm:inline-flex"
              title="Print or export clean prompt sheet to PDF"
            >
              Print
            </Button>

            {/* Share button */}
            <Button
              size="sm"
              variant="outline"
              onClick={handleShare}
              leftIcon={<Share2 className="h-3.5 w-3.5" />}
              className="text-xs"
              title="Share or copy prompt URL"
            >
              Share
            </Button>

            {/* Save for later button (localStorage only) */}
            <Button
              size="sm"
              variant={isSaved ? "secondary" : "outline"}
              onClick={handleToggleSave}
              leftIcon={
                <Bookmark
                  className={cn("h-3.5 w-3.5", isSaved && "fill-[var(--primary)] text-[var(--primary)]")}
                />
              }
              className={cn(
                "text-xs transition-colors",
                isSaved && "border-[var(--primary)]/40 text-[var(--primary)]"
              )}
              title={isSaved ? "Saved to your local library" : "Save prompt to local library"}
            >
              {isSaved ? "Saved" : "Save"}
            </Button>

            {/* Secondary CTA: Customize Prompt */}
            {variables.length > 0 && (
              <Button
                size="sm"
                variant="secondary"
                onClick={handleScrollToCustomizer}
                leftIcon={<SlidersHorizontal className="h-3.5 w-3.5 text-[var(--primary)]" />}
                className="text-xs border border-[var(--border)] hover:border-[var(--primary)]/40"
              >
                Customize Prompt
              </Button>
            )}

            {/* Primary CTA: Copy Prompt */}
            <Button
              size="sm"
              variant="primary"
              onClick={handleCopyRaw}
              leftIcon={
                feedback?.id === "raw-copy" ? (
                  <Check className="h-3.5 w-3.5 text-white" />
                ) : (
                  <Copy className="h-3.5 w-3.5 text-white" />
                )
              }
              className="text-xs shadow-xs"
            >
              {feedback?.id === "raw-copy" ? "Copied!" : "Copy Prompt"}
            </Button>
          </div>
        </div>

        {/* Small non-intrusive feedback indicator right below header */}
        {feedback && (
          <div
            role="status"
            aria-live="polite"
            className="no-print mt-3 flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--status-success-bg)] border border-[var(--status-success)]/20 px-3 py-1.5 text-xs text-[var(--status-success)] animate-in fade-in slide-in-from-top-1 duration-200"
          >
            <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="font-medium">{feedback.message}</span>
          </div>
        )}

        {/* Prompt Body / Editor Viewport */}
        <div className="mt-5 relative">
          <div className="print-text rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--muted)]/50 p-4 sm:p-6 font-mono text-xs sm:text-[13px] leading-relaxed text-[var(--foreground)] whitespace-pre-wrap select-text overflow-x-auto max-h-[540px] overflow-y-auto">
            {viewMode === "raw" ? (
              rawTemplate
            ) : (
              tokens.map((token, idx) => {
                if (token.type === "variable") {
                  return (
                    <span
                      key={idx}
                      className="inline-flex items-center rounded-[var(--radius-sm)] border border-[var(--primary)]/30 bg-[var(--primary-muted)] px-1.5 py-0.5 text-[11px] font-semibold text-[var(--primary)] mx-0.5 select-all"
                      title={`Variable placeholder: [${token.variableName}]`}
                    >
                      {token.content}
                    </span>
                  );
                }
                return <span key={idx}>{token.content}</span>;
              })
            )}
          </div>
        </div>

        {/* Card Footer Bar: Mobile Primary Actions & Shortcut note */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs text-[var(--muted-foreground)]">
          <div className="flex items-center gap-1.5 text-[11px]">
            <span>Tip:</span>
            <span>Variables marked in purple brackets can be tailored below.</span>
          </div>

          <div className="sm:hidden flex items-center gap-2 w-full pt-1">
            <Button
              size="sm"
              variant="primary"
              onClick={handleCopyRaw}
              leftIcon={<Copy className="h-3.5 w-3.5" />}
              className="flex-1 text-xs"
            >
              {feedback?.id === "raw-copy" ? "Copied!" : "Copy Prompt"}
            </Button>
            {variables.length > 0 && (
              <Button
                size="sm"
                variant="secondary"
                onClick={handleScrollToCustomizer}
                leftIcon={<SlidersHorizontal className="h-3.5 w-3.5" />}
                className="flex-1 text-xs"
              >
                Customize
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. INTERACTIVE CUSTOMIZATION EXPERIENCE (NO AI API, CLIENT-SIDE)          */}
      {/* ========================================================================= */}
      {variables.length > 0 && (
        <section
          ref={customizerRef}
          id="customizer"
          className="print-card rounded-[var(--radius-xl)] border border-[var(--border)] bg-[var(--card)] p-5 sm:p-7 shadow-sm scroll-mt-20"
        >
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[var(--border-subtle)]">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-[var(--secondary)] text-[var(--primary)] shrink-0">
                <SlidersHorizontal className="h-4.5 w-4.5" />
              </div>
              <div>
                <h2 className="text-base font-bold tracking-tight text-[var(--foreground)]">
                  Customize Prompt
                </h2>
                <p className="text-xs text-[var(--muted-foreground)]">
                  Fill in the variables below. Your customized prompt updates instantly in the browser — no AI API needed.
                </p>
              </div>
            </div>

            {/* Customizer Toolbar */}
            <div className="flex items-center gap-2 no-print">
              <Button
                size="xs"
                variant="ghost"
                onClick={handleResetFields}
                leftIcon={<RotateCcw className="h-3 w-3" />}
                className="text-xs"
              >
                Reset Fields
              </Button>
              <Button
                size="sm"
                variant="primary"
                onClick={handleCopyCustomized}
                leftIcon={
                  feedback?.id === "custom-copy" ? (
                    <Check className="h-3.5 w-3.5 text-white" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-white" />
                  )
                }
                className="text-xs shadow-xs"
              >
                {feedback?.id === "custom-copy" ? "Copied!" : "Copy Customized Prompt"}
              </Button>
            </div>
          </div>

          {/* Small non-intrusive feedback indicator for customizer */}
          {feedback && (
            <div
              role="status"
              aria-live="polite"
              className="no-print mt-3 flex items-center gap-2 rounded-[var(--radius-md)] bg-[var(--status-success-bg)] border border-[var(--status-success)]/20 px-3 py-1.5 text-xs text-[var(--status-success)] animate-in fade-in slide-in-from-top-1 duration-200"
            >
              <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              <span className="font-medium">{feedback.message}</span>
            </div>
          )}

          {/* Customizer Layout: Two columns on desktop, stacked on mobile */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Input Variables Form */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="flex items-center justify-between pb-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                  Parameters ({variables.length})
                </span>
                <span className="text-[11px] text-[var(--muted-foreground)]">
                  * Indicates required field
                </span>
              </div>

              {/* Quick-Fill Presets Bar */}
              <div className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--secondary)]/20 space-y-2">
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
                  <Sparkles className="h-3 w-3 text-amber-400" />
                  <span>1-Click Quick Presets</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={handleResetFields}
                    className="px-2.5 py-1 rounded-md text-[11px] font-medium border border-[var(--border)] bg-[var(--card)] hover:border-[var(--primary)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                  >
                    Defaults
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleApplyPresetTheme("Cinematic 35mm", (prev) => {
                        const updated = { ...prev };
                        for (const v of variables) {
                          const k = v.name || v.key || "";
                          const kl = k.toLowerCase();
                          if (kl.includes("lens") || kl.includes("camera") || kl.includes("optic")) updated[k] = "Panavision C-Series Anamorphic 35mm";
                          else if (kl.includes("light")) updated[k] = "Golden hour warm raking rim light with soft bokeh";
                          else if (kl.includes("style")) updated[k] = "Cinematic 35mm film photograph";
                          else if (kl.includes("aspect") || kl.includes("ar")) updated[k] = "16:9";
                          else if (kl.includes("subject") || kl.includes("character")) updated[k] = "a contemplative solitary figure in a classic trench coat";
                          else if (kl.includes("tone") || kl.includes("mood")) updated[k] = "Atmospheric, moody, rich depth of field";
                          else if (kl.includes("setting") || kl.includes("environment")) updated[k] = "rain-slicked metropolitan street at twilight";
                          else if (kl.includes("film") || kl.includes("stock")) updated[k] = "Kodak Vision3 500T 5219 tungsten";
                        }
                        return updated;
                      })
                    }
                    className="px-2.5 py-1 rounded-md text-[11px] font-medium border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 transition-colors"
                  >
                    🎬 Cinematic 35mm
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleApplyPresetTheme("Cyberpunk Tech", (prev) => {
                        const updated = { ...prev };
                        for (const v of variables) {
                          const k = v.name || v.key || "";
                          const kl = k.toLowerCase();
                          if (kl.includes("lens") || kl.includes("camera") || kl.includes("optic")) updated[k] = "Sony FE 24mm f/1.4 GM wide angle";
                          else if (kl.includes("light")) updated[k] = "Volumetric cyan and magenta neon backlighting";
                          else if (kl.includes("style")) updated[k] = "Cyberpunk photorealistic speculative sci-fi";
                          else if (kl.includes("aspect") || kl.includes("ar")) updated[k] = "21:9";
                          else if (kl.includes("subject") || kl.includes("character")) updated[k] = "cybernetic courier with glowing optic augmentations";
                          else if (kl.includes("tone") || kl.includes("mood")) updated[k] = "Futuristic, high-contrast, electric";
                          else if (kl.includes("setting") || kl.includes("environment")) updated[k] = "dense subterranean Neo-Tokyo market with holographic displays";
                          else if (kl.includes("film") || kl.includes("stock")) updated[k] = "High-ISO digital sensor with subtle sensor grain";
                        }
                        return updated;
                      })
                    }
                    className="px-2.5 py-1 rounded-md text-[11px] font-medium border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 transition-colors"
                  >
                    ⚡ Cyberpunk Tech
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleApplyPresetTheme("Editorial Luxe", (prev) => {
                        const updated = { ...prev };
                        for (const v of variables) {
                          const k = v.name || v.key || "";
                          const kl = k.toLowerCase();
                          if (kl.includes("lens") || kl.includes("camera") || kl.includes("optic")) updated[k] = "Hasselblad 80mm f/2.8 medium format prime";
                          else if (kl.includes("light")) updated[k] = "Clean 5400K daylight beauty dish with subtle bounce fill";
                          else if (kl.includes("style")) updated[k] = "High-fashion Vogue studio portraiture";
                          else if (kl.includes("aspect") || kl.includes("ar")) updated[k] = "4:5";
                          else if (kl.includes("subject") || kl.includes("character")) updated[k] = "haute couture high-fashion model with striking symmetry";
                          else if (kl.includes("tone") || kl.includes("mood")) updated[k] = "Minimalist, refined, immaculate skin microtexture";
                          else if (kl.includes("setting") || kl.includes("environment")) updated[k] = "warm neutral limestone architectural studio";
                          else if (kl.includes("film") || kl.includes("stock")) updated[k] = "Fujifilm Pro 400H medium format color film";
                        }
                        return updated;
                      })
                    }
                    className="px-2.5 py-1 rounded-md text-[11px] font-medium border border-purple-500/30 bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 transition-colors"
                  >
                    ✨ Editorial Luxe
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {variables.map((variable: PromptVariable, idx: number) => {
                  const key = variable.name || variable.key || "";
                  const isFirst = idx === 0;

                  return (
                    <div
                      key={key}
                      className="rounded-[var(--radius-lg)] border border-[var(--border-subtle)] bg-[var(--secondary)]/30 p-3.5 space-y-2 transition-colors focus-within:border-[var(--primary)]/40 focus-within:bg-[var(--secondary)]/50"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <label
                          htmlFor={`var-${key}`}
                          className="text-xs font-medium text-[var(--foreground)] flex items-center gap-1"
                        >
                          <span>{variable.label}</span>
                          {variable.required && (
                            <span className="text-[var(--primary)] font-bold">*</span>
                          )}
                        </label>
                        <span className="font-mono text-[10px] text-[var(--primary)] bg-[var(--primary-muted)] px-1.5 py-0.5 rounded">
                          [{key}]
                        </span>
                      </div>

                      {variable.description && (
                        <p className="text-[11px] text-[var(--muted-foreground)] leading-tight">
                          {variable.description}
                        </p>
                      )}

                      {variable.type === "textarea" ? (
                        <Textarea
                          id={`var-${key}`}
                          ref={isFirst ? (firstInputRef as React.RefObject<HTMLTextAreaElement>) : undefined}
                          placeholder={variable.placeholder || `Enter ${variable.label.toLowerCase()}...`}
                          value={formValues[key] || ""}
                          onChange={(e) => handleVariableChange(key, e.target.value)}
                          className="font-mono text-xs bg-[var(--card)]"
                          rows={3}
                        />
                      ) : variable.type === "select" && variable.options ? (
                        <div className="relative">
                          <select
                            id={`var-${key}`}
                            value={formValues[key] || variable.defaultValue || ""}
                            onChange={(e) => handleVariableChange(key, e.target.value)}
                            className={cn(
                              "flex h-9 w-full appearance-none rounded-[var(--radius-md)] border border-[var(--input)] bg-[var(--card)] px-3 pr-8 text-xs font-medium text-[var(--foreground)] transition-colors cursor-pointer",
                              "focus-visible:border-[var(--primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--primary)]"
                            )}
                          >
                            {variable.options.map((opt) => (
                              <option
                                key={opt}
                                value={opt}
                                className="bg-[var(--card)] text-[var(--foreground)]"
                              >
                                {opt}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[var(--muted-foreground)]" />
                        </div>
                      ) : (
                        <Input
                          id={`var-${key}`}
                          ref={isFirst ? (firstInputRef as React.RefObject<HTMLInputElement>) : undefined}
                          placeholder={variable.placeholder || `Enter ${variable.label.toLowerCase()}...`}
                          value={formValues[key] || ""}
                          onChange={(e) => handleVariableChange(key, e.target.value)}
                          className="font-mono text-xs bg-[var(--card)]"
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom reset link */}
              <div className="pt-2 flex items-center justify-between text-xs text-[var(--muted-foreground)]">
                <button
                  type="button"
                  onClick={handleResetFields}
                  className="hover:text-[var(--foreground)] inline-flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset all parameters</span>
                </button>
                <span>{variables.length} parameters active</span>
              </div>
            </div>

            {/* Right: Live Prompt Output Preview */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)]">
                    Live Customized Output
                  </span>
                  <Badge variant="success" size="sm" className="text-[10px]">
                    Live Preview
                  </Badge>
                </div>
                <span className="text-[11px] font-mono text-[var(--muted-foreground)]">
                  {customWordCount} words
                </span>
              </div>

              {/* Generated Text Container */}
              <div className="relative flex-1 min-h-[340px] rounded-[var(--radius-lg)] border border-[var(--border-strong)] bg-[var(--muted)]/60 p-5 font-mono text-xs sm:text-[13px] leading-relaxed text-[var(--foreground)] whitespace-pre-wrap select-text overflow-y-auto max-h-[580px]">
                {customizedOutput}
              </div>

              {/* Bottom Copy Customized CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 no-print">
                <div className="flex items-center gap-2 flex-wrap text-xs text-[var(--muted-foreground)]">
                  <span>Launch in:</span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <a
                      href="https://chatgpt.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackExternalAiClick(
                          "ChatGPT",
                          "https://chatgpt.com",
                          prompt.id,
                          typeof window !== "undefined" ? window.location.pathname : `/prompts/${prompt.slug}`
                        )
                      }
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--foreground)] hover:text-[var(--primary)] bg-[var(--card)] px-2 py-0.5 rounded border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
                    >
                      <span>ChatGPT</span>
                      <ExternalLink className="h-2.5 w-2.5 text-[var(--muted-foreground)]" aria-hidden="true" />
                    </a>
                    <a
                      href="https://claude.ai"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackExternalAiClick(
                          "Claude",
                          "https://claude.ai",
                          prompt.id,
                          typeof window !== "undefined" ? window.location.pathname : `/prompts/${prompt.slug}`
                        )
                      }
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--foreground)] hover:text-[var(--primary)] bg-[var(--card)] px-2 py-0.5 rounded border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
                    >
                      <span>Claude</span>
                      <ExternalLink className="h-2.5 w-2.5 text-[var(--muted-foreground)]" aria-hidden="true" />
                    </a>
                    <a
                      href="https://gemini.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackExternalAiClick(
                          "Gemini",
                          "https://gemini.google.com",
                          prompt.id,
                          typeof window !== "undefined" ? window.location.pathname : `/prompts/${prompt.slug}`
                        )
                      }
                      className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--foreground)] hover:text-[var(--primary)] bg-[var(--card)] px-2 py-0.5 rounded border border-[var(--border)] hover:border-[var(--border-strong)] transition-colors cursor-pointer"
                    >
                      <span>Gemini</span>
                      <ExternalLink className="h-2.5 w-2.5 text-[var(--muted-foreground)]" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={handleCopyCustomized}
                    leftIcon={
                      feedback?.id === "custom-copy" ? (
                        <Check className="h-3.5 w-3.5 text-white" />
                      ) : (
                        <Copy className="h-3.5 w-3.5 text-white" />
                      )
                    }
                    className="w-full sm:w-auto text-xs shadow-xs"
                  >
                    {feedback?.id === "custom-copy"
                      ? "Copied to Clipboard!"
                      : "Copy Customized Prompt"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
