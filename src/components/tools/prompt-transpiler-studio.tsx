"use client";

import React, { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { copyToClipboard } from "@/lib/utils";
import {
  transpilePrompt,
  TranspilerModel,
} from "@/lib/transpiler";
import {
  ArrowLeftRight,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Layers,
  CheckCircle2,
  AlertCircle,
  FileCode,
} from "lucide-react";

interface SamplePreset {
  id: string;
  name: string;
  source: TranspilerModel;
  target: TranspilerModel;
  input: string;
}

const SAMPLE_PRESETS: SamplePreset[] = [
  {
    id: "mj-to-flux-cinematic",
    name: "Midjourney ➔ FLUX.1 (Cinematic Street)",
    source: "midjourney",
    target: "flux",
    input:
      "rain-soaked alleyway in Neo-Tokyo with glowing neon signs, puddles reflecting cyan billboards, cinematic 35mm film still, shot on Panavision C-Series --ar 16:9 --stylize 250 --style raw --v 6.1 --no cartoon, 3d render, blurry",
  },
  {
    id: "flux-to-mj-portrait",
    name: "FLUX.1 ➔ Midjourney (Studio Portrait)",
    source: "flux",
    target: "midjourney",
    input:
      'A medium close-up portrait of a 30-year-old Scandinavian architect in a black minimalist turtleneck. Natural soft daylight from a large studio window. Authentic unretouched skin texture with natural epidermal pores. The background features a subtle poster with the visible text "STUDIO OSLO".',
  },
  {
    id: "mj-to-sdxl",
    name: "Midjourney ➔ SDXL (Positive/Negative Segregation)",
    source: "midjourney",
    target: "stable-diffusion",
    input:
      "editorial fashion photography of an Italian model on a Venetian balcony at sunset, dramatic backlighting, gold jewelry glinting, Kodak Portra 400 --ar 4:5 --stylize 180 --no oversaturated, airbrushed, plastic",
  },
  {
    id: "mj-to-dalle",
    name: "Midjourney ➔ DALL-E 3 (Narrative Translation)",
    source: "midjourney",
    target: "dall-e",
    input:
      'cozy artisan bakery at dawn, baker dusting flour onto sourdough loaves, warm morning sunbeams cutting through dusty air, vintage copper scales on counter --ar 16:9 --stylize 100 --v 6.1',
  },
];

const MODEL_CONFIGS: Record<
  TranspilerModel,
  { label: string; badge: string; color: string; description: string }
> = {
  midjourney: {
    label: "Midjourney v6.1",
    badge: "CLI Flags",
    color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    description: "Short descriptive phrases with trailing CLI flags (--ar, --v, --stylize, --no)",
  },
  flux: {
    label: "FLUX.1 Dev",
    badge: "Flow Matching",
    color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    description: "Grammatical descriptive sentences; ignores negative prompts natively",
  },
  "stable-diffusion": {
    label: "SDXL / SD3.5",
    badge: "Pos / Neg",
    color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    description: "Strict positive/negative array segregation + sampler and CFG parameters",
  },
  "dall-e": {
    label: "DALL-E 3",
    badge: "Narrative",
    color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    description: "Spatial narrative storytelling; rewritten internally by ChatGPT",
  },
};

export function PromptTranspilerStudio() {
  const { success } = useToast();

  const [sourceModel, setSourceModel] = useState<TranspilerModel>("midjourney");
  const [targetModel, setTargetModel] = useState<TranspilerModel>("flux");
  const [inputPrompt, setInputPrompt] = useState<string>(SAMPLE_PRESETS[0].input);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  // Compute transpilation
  const transpileResult = useMemo(() => {
    return transpilePrompt(inputPrompt, sourceModel, targetModel);
  }, [inputPrompt, sourceModel, targetModel]);

  const handleSwap = () => {
    const prevSource = sourceModel;
    const prevTarget = targetModel;
    setSourceModel(prevTarget);
    setTargetModel(prevSource);
    setInputPrompt(transpileResult.output);
    success(`Swapped: Now converting ${MODEL_CONFIGS[prevTarget].label} ➔ ${MODEL_CONFIGS[prevSource].label}`);
  };

  const handleApplyPreset = (preset: SamplePreset) => {
    setSourceModel(preset.source);
    setTargetModel(preset.target);
    setInputPrompt(preset.input);
    success(`Loaded preset: ${preset.name}`);
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(transpileResult.output);
    if (ok) {
      setIsCopied(true);
      success("Transpiled prompt copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Preset Quick Loaders */}
      <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            1-Click Transpiler Presets
          </span>
          <button
            onClick={() => setInputPrompt("")}
            className="inline-flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Clear
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {SAMPLE_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleApplyPreset(preset)}
              className="p-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)]/60 text-left transition-all hover:shadow-xs group"
            >
              <span className="text-xs font-bold text-[var(--foreground)] block line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
                {preset.name}
              </span>
              <span className="text-[10px] text-[var(--muted-foreground)] line-clamp-1 mt-0.5">
                {preset.input}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Model Selection Pipeline Bar */}
      <div className="grid grid-cols-1 md:grid-cols-11 gap-3 items-center">
        {/* Source Model Selector (5 Cols) */}
        <div className="md:col-span-5 p-3.5 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--muted-foreground)]">
              Source Architecture
            </label>
            <Badge variant="outline" size="sm" className={MODEL_CONFIGS[sourceModel].color}>
              {MODEL_CONFIGS[sourceModel].badge}
            </Badge>
          </div>
          <select
            value={sourceModel}
            onChange={(e) => setSourceModel(e.target.value as TranspilerModel)}
            className="w-full px-3 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] text-xs sm:text-sm font-semibold text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] cursor-pointer"
          >
            <option value="midjourney">Midjourney v6.1 (CLI Flags)</option>
            <option value="flux">FLUX.1 Dev (Natural Language)</option>
            <option value="stable-diffusion">Stable Diffusion XL (Positive / Negative)</option>
            <option value="dall-e">DALL-E 3 (Narrative Storytelling)</option>
          </select>
          <p className="text-[11px] text-[var(--muted-foreground)] line-clamp-1">
            {MODEL_CONFIGS[sourceModel].description}
          </p>
        </div>

        {/* Swap Button (1 Col) */}
        <div className="md:col-span-1 flex items-center justify-center">
          <button
            type="button"
            onClick={handleSwap}
            title="Swap source and target models"
            className="h-10 w-10 rounded-full border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] text-[var(--foreground)] transition-all flex items-center justify-center shadow-sm cursor-pointer active:scale-95"
          >
            <ArrowLeftRight className="h-4 w-4" />
          </button>
        </div>

        {/* Target Model Selector (5 Cols) */}
        <div className="md:col-span-5 p-3.5 rounded-xl border border-[var(--primary)]/30 bg-[var(--card)] space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-[var(--primary)]">
              Target Architecture
            </label>
            <Badge variant="outline" size="sm" className={MODEL_CONFIGS[targetModel].color}>
              {MODEL_CONFIGS[targetModel].badge}
            </Badge>
          </div>
          <select
            value={targetModel}
            onChange={(e) => setTargetModel(e.target.value as TranspilerModel)}
            className="w-full px-3 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] text-xs sm:text-sm font-semibold text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] cursor-pointer"
          >
            <option value="flux">FLUX.1 Dev (Natural Language)</option>
            <option value="midjourney">Midjourney v6.1 (CLI Flags)</option>
            <option value="stable-diffusion">Stable Diffusion XL (Positive / Negative)</option>
            <option value="dall-e">DALL-E 3 (Narrative Storytelling)</option>
          </select>
          <p className="text-[11px] text-[var(--muted-foreground)] line-clamp-1">
            {MODEL_CONFIGS[targetModel].description}
          </p>
        </div>
      </div>

      {/* Main Dual-Pane Converter Workbench */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Column */}
        <Card className="p-5 space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-amber-400" />
                Raw Input Prompt ({MODEL_CONFIGS[sourceModel].label})
              </span>
              <span className="text-[11px] text-[var(--muted-foreground)] font-mono">
                {inputPrompt.length} chars
              </span>
            </div>

            <textarea
              rows={8}
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              placeholder="Paste any prompt string here. The transpiler will automatically extract subjects, cameras, flags, and negative tokens..."
              className="w-full p-3 rounded-xl bg-[var(--background)] border border-[var(--border)] font-mono text-xs sm:text-sm text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] leading-relaxed resize-y"
            />
          </div>

          <div className="pt-2 text-[11px] text-[var(--muted-foreground)] flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Parses flags (--ar, --stylize, --no), quotes, and negative tokens automatically.</span>
          </div>
        </Card>

        {/* Output Column */}
        <Card className="p-5 space-y-4 border-[var(--primary)]/40 bg-[var(--card)] relative flex flex-col justify-between shadow-xl">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-emerald-500 to-blue-500" />

          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
              <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[var(--primary)]" />
                Transpiled Output ({MODEL_CONFIGS[targetModel].label})
              </span>
              <Badge variant="outline" size="sm" className="font-mono text-[10px] uppercase">
                {targetModel}
              </Badge>
            </div>

            {/* Code Output Box */}
            <div className="p-4 rounded-xl bg-black/90 font-mono text-xs text-zinc-100 border border-white/10 leading-relaxed max-h-[220px] overflow-y-auto whitespace-pre-wrap select-all">
              {transpileResult.output}
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={handleCopy}
            className="w-full py-3 px-4 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-bold text-xs sm:text-sm hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-md shadow-[var(--primary)]/10 cursor-pointer"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Copied Transpiled Prompt!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Transpiled Prompt</span>
              </>
            )}
          </button>
        </Card>
      </div>

      {/* Syntax Diff & Architecture Telemetry */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Added Tokens */}
        <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Added Tokens ({transpileResult.addedTokens.length})</span>
          </div>
          {transpileResult.addedTokens.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {transpileResult.addedTokens.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                >
                  +{t}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-[var(--muted-foreground)]">No synthetic tokens required.</p>
          )}
        </div>

        {/* Stripped Tokens */}
        <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/[0.03] space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-red-400">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Stripped Tokens ({transpileResult.strippedTokens.length})</span>
          </div>
          {transpileResult.strippedTokens.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {transpileResult.strippedTokens.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-red-500/10 text-red-300 border border-red-500/20"
                >
                  -{t}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-[11px] text-[var(--muted-foreground)]">No incompatible tokens removed.</p>
          )}
        </div>

        {/* Architecture Notes */}
        <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[var(--foreground)]">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>Engineering Notes</span>
          </div>
          <div className="space-y-1 text-[11px] text-[var(--muted-foreground)] leading-relaxed">
            {transpileResult.architectureNotes.map((note, idx) => (
              <p key={idx}>• {note}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
