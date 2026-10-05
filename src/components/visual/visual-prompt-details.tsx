"use client";

import React, { useState } from "react";
import { Camera, Sun, Copy, Check, ShieldAlert, Sliders } from "lucide-react";
import { VisualMetadata } from "@/types/prompt";

interface VisualPromptDetailsProps {
  metadata: VisualMetadata;
  promptTitle: string;
}

export function VisualPromptDetails({ metadata }: VisualPromptDetailsProps) {
  const [copiedNegative, setCopiedNegative] = useState(false);
  const [copiedParams, setCopiedParams] = useState(false);

  const handleCopyNegative = async () => {
    if (!metadata.negativePrompt) return;
    try {
      await navigator.clipboard.writeText(metadata.negativePrompt);
      setCopiedNegative(true);
      setTimeout(() => setCopiedNegative(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleCopyParams = async () => {
    if (!metadata.rawParameters) return;
    try {
      await navigator.clipboard.writeText(metadata.rawParameters);
      setCopiedParams(true);
      setTimeout(() => setCopiedParams(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="space-y-5 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface)] p-6 shadow-sm">
      {/* Header: Visual Engine & Specs */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--primary-muted)] text-[var(--primary)] flex items-center justify-center font-bold text-xs uppercase">
            {metadata.model === "midjourney" ? "MJ" : metadata.model === "flux" ? "FLUX" : "SD"}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[var(--foreground)] capitalize flex items-center gap-1.5">
              <span>{metadata.model}</span>
              {metadata.modelVersion && (
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[var(--surface-subtle)] text-[var(--muted-foreground)] border border-[var(--border-subtle)]">
                  {metadata.modelVersion}
                </span>
              )}
            </h3>
            <p className="text-xs text-[var(--muted-foreground)] capitalize">
              Style: {metadata.styleCategory} • Aspect Ratio: {metadata.aspectRatio}
            </p>
          </div>
        </div>

        {metadata.rawParameters && (
          <button
            type="button"
            onClick={handleCopyParams}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--border-subtle)] hover:bg-[var(--surface-hover)] text-xs font-mono text-[var(--foreground)] transition-colors"
          >
            {copiedParams ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-emerald-500 font-sans">Copied Flags</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
                <span>Copy Parameters</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Grid: Camera Settings & Lighting Direction */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Camera Spec Card */}
        {metadata.camera && (
          <div className="p-4 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-subtle)] space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--foreground)]">
              <Camera className="h-4 w-4 text-[var(--primary)]" />
              <span>Camera & Optics Specs</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {metadata.camera.focalLength && (
                <div>
                  <span className="text-[10px] text-[var(--muted-foreground)] block">Focal Length</span>
                  <span className="font-mono font-medium text-[var(--foreground)]">{metadata.camera.focalLength}</span>
                </div>
              )}
              {metadata.camera.aperture && (
                <div>
                  <span className="text-[10px] text-[var(--muted-foreground)] block">Aperture</span>
                  <span className="font-mono font-medium text-[var(--foreground)]">{metadata.camera.aperture}</span>
                </div>
              )}
              {metadata.camera.lens && (
                <div className="col-span-2">
                  <span className="text-[10px] text-[var(--muted-foreground)] block">Optics / Lens</span>
                  <span className="font-medium text-[var(--foreground)]">{metadata.camera.lens}</span>
                </div>
              )}
              {metadata.camera.filmStock && (
                <div className="col-span-2">
                  <span className="text-[10px] text-[var(--muted-foreground)] block">Film Stock Emulation</span>
                  <span className="font-mono text-xs font-medium text-amber-600 dark:text-amber-400">{metadata.camera.filmStock}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Lighting Spec Card */}
        {metadata.lighting && (
          <div className="p-4 rounded-xl bg-[var(--surface-subtle)] border border-[var(--border-subtle)] space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--foreground)]">
              <Sun className="h-4 w-4 text-amber-500" />
              <span>Lighting & Atmosphere</span>
            </div>
            <div className="grid grid-cols-1 gap-2 text-xs">
              {metadata.lighting.type && (
                <div>
                  <span className="text-[10px] text-[var(--muted-foreground)] block">Lighting Setup</span>
                  <span className="font-medium text-[var(--foreground)]">{metadata.lighting.type}</span>
                </div>
              )}
              {metadata.lighting.direction && (
                <div>
                  <span className="text-[10px] text-[var(--muted-foreground)] block">Direction & Falloff</span>
                  <span className="font-medium text-[var(--foreground)]">{metadata.lighting.direction}</span>
                </div>
              )}
              {metadata.lighting.colorTemperature && (
                <div>
                  <span className="text-[10px] text-[var(--muted-foreground)] block">Color Temperature</span>
                  <span className="font-mono font-medium text-[var(--foreground)]">{metadata.lighting.colorTemperature}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Raw Parameter Chips */}
      {metadata.rawParameters && (
        <div className="p-3.5 rounded-xl bg-[var(--background)] border border-[var(--border-subtle)]">
          <div className="flex items-center gap-2 mb-2 text-xs font-medium text-[var(--muted-foreground)]">
            <Sliders className="h-3.5 w-3.5 text-[var(--primary)]" />
            <span>Generation Parameters & Flags</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {metadata.rawParameters.split(" ").filter(Boolean).map((flag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-md bg-[var(--surface)] border border-[var(--border-subtle)] font-mono text-xs text-[var(--foreground)] font-medium shadow-xs"
              >
                {flag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Negative Prompt Section */}
      {metadata.negativePrompt && (
        <div className="p-4 rounded-xl bg-rose-500/5 dark:bg-rose-950/20 border border-rose-500/20 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-700 dark:text-rose-400">
              <ShieldAlert className="h-4 w-4" />
              <span>Recommended Negative Prompt</span>
            </div>
            <button
              type="button"
              onClick={handleCopyNegative}
              className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-[var(--surface)] hover:bg-[var(--surface-hover)] border border-rose-500/20 text-xs font-medium text-[var(--foreground)] transition-colors"
            >
              {copiedNegative ? (
                <>
                  <Check className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-emerald-500">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 text-[var(--muted-foreground)]" />
                  <span>Copy Negative</span>
                </>
              )}
            </button>
          </div>
          <p className="font-mono text-xs text-[var(--foreground)] bg-[var(--surface)] p-2.5 rounded-lg border border-rose-500/10 leading-relaxed break-all">
            {metadata.negativePrompt}
          </p>
        </div>
      )}
    </div>
  );
}
