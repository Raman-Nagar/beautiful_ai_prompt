"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import { useToast } from "@/components/ui/toast";
import { copyToClipboard } from "@/lib/utils";
import { Copy, Check, SlidersHorizontal, Eye } from "lucide-react";

export interface ComparisonPreset {
  id: string;
  title: string;
  category: string;
  aspectRatio: "16:9" | "4:5";
  prompt: string;
  leftImage?: string;
  rightImage?: string;
  leftNotes?: string;
  rightNotes?: string;
  midjourneyImage?: string;
  fluxImage?: string;
  midjourneyNotes?: string;
  fluxNotes?: string;
}

export interface ComparisonSliderProps {
  presets?: ComparisonPreset[];
  labels?: {
    left: string;
    right: string;
  };
}

export const COMPARISON_PRESETS: ComparisonPreset[] = [
  {
    id: "street-cinematic",
    title: "1. Rainy Tokyo Street & Neon Lighting",
    category: "Cinematic Atmosphere",
    aspectRatio: "16:9",
    prompt: "35mm anamorphic photography of a courier in waterproof techwear walking down a rain-soaked narrow alleyway in Tokyo at night, glowing neon signs casting vibrant reflections on wet asphalt, volumetric mist, horizontal lens flares, Kodak Vision3 500T grain",
    midjourneyImage: "/images/visual/cyberpunk-tokyo-alleyway.jpg",
    fluxImage: "/images/visual/compare-cyberpunk-flux.jpg",
    midjourneyNotes: "Superior painterly atmosphere, stylized neon bloom, and Panavision anamorphic streak flares.",
    fluxNotes: "Exceptional text legibility on Japanese signage, authentic pedestrian background anatomy, and natural pavement wetness.",
  },
  {
    id: "editorial-portrait",
    title: "2. Editorial Fashion & Skin Micro-Texture",
    category: "Studio Photography",
    aspectRatio: "4:5",
    prompt: "Editorial beauty cover portrait of a French model with high cheekbones, intimate close-up on Sony A7R V with 85mm f/1.4 lens, natural skin micropores, subtle freckles, fine eyelashes, soft beauty dish lighting overhead, neutral warm studio backdrop",
    midjourneyImage: "/images/visual/editorial-studio-fashion-portrait.jpg",
    fluxImage: "/images/visual/compare-portrait-flux.jpg",
    midjourneyNotes: "Flawless high-fashion magazine aesthetic, glamorous tonal contrast, and artistic iris reflections.",
    fluxNotes: "Groundbreaking epidermal realism with zero plastic smoothing, visible fine pores, and natural sub-surface scattering.",
  },
  {
    id: "chiaroscuro-shadows",
    title: "3. Chiaroscuro Noir & Dramatic Lighting",
    category: "Hard Shadow Sculpting",
    aspectRatio: "16:9",
    prompt: "Dramatic chiaroscuro cinema still, intense black-and-white lighting, private investigator standing in a shadowy office at midnight, moonlight through wooden Venetian blinds casting sharp diagonal striped shadow bars across face, Ilford HP5 Plus film",
    midjourneyImage: "/images/visual/noir-detective-silhouette.jpg",
    fluxImage: "/images/visual/rembrandt-lighting-elderly-artisan.jpg",
    midjourneyNotes: "Masterful high-contrast silver-gelatin blacks and razor-sharp shadow geometry.",
    fluxNotes: "Profound documentary emotional character, tactile weathered skin textures, and authentic Rembrandt light triangles.",
  },
];

export function ComparisonSlider({ presets, labels }: ComparisonSliderProps = {}) {
  const activePresets = presets && presets.length > 0 ? presets : COMPARISON_PRESETS;
  const leftLabel = labels?.left || "Midjourney v6.1";
  const rightLabel = labels?.right || "FLUX.1 Dev";

  const [activePresetIndex, setActivePresetIndex] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { success } = useToast();

  const currentPreset = activePresets[activePresetIndex] || activePresets[0];
  const leftImg = currentPreset.leftImage || currentPreset.midjourneyImage || "";
  const rightImg = currentPreset.rightImage || currentPreset.fluxImage || "";
  const leftNote = currentPreset.leftNotes || currentPreset.midjourneyNotes || "";
  const rightNote = currentPreset.rightNotes || currentPreset.fluxNotes || "";

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  }, [handleMove]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    handleMove(e.clientX);
  }, [handleMove]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove);
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  const handleCopyPrompt = async () => {
    const ok = await copyToClipboard(currentPreset.prompt);
    if (ok) {
      setIsCopied(true);
      success("Test prompt copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Preset Selector Buttons */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[var(--border)] pb-4">
        <span className="text-xs font-semibold text-[var(--muted-foreground)] uppercase tracking-wider mr-1 flex items-center gap-1.5">
          <Eye className="w-3.5 h-3.5 text-[var(--primary)]" />
          Test Scenario:
        </span>
        {activePresets.map((preset, idx) => (
          <button
            key={preset.id}
            onClick={() => {
              setActivePresetIndex(idx);
              setSliderPosition(50);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activePresetIndex === idx
                ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm font-semibold"
                : "bg-[var(--secondary)]/60 text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]"
            }`}
          >
            {preset.title}
          </button>
        ))}
      </div>

      {/* Main Interactive Slider Canvas */}
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
        className={`relative w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-black shadow-2xl select-none cursor-ew-resize group ${
          currentPreset.aspectRatio === "16:9" ? "aspect-[16/9]" : "aspect-[4/5] max-w-xl mx-auto"
        }`}
      >
        {/* Right Base Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={rightImg}
            alt={`${rightLabel} output`}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
            className="object-cover"
          />
          {/* Label Badge Right */}
          <div className="absolute top-4 right-4 z-10 pointer-events-none">
            <span className="px-3 py-1.5 rounded-md bg-black/75 backdrop-blur-md text-emerald-400 font-mono text-xs font-bold border border-emerald-500/30 shadow-lg">
              {rightLabel}
            </span>
          </div>
        </div>

        {/* Left Clipped Image */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
          }}
        >
          <Image
            src={leftImg}
            alt={`${leftLabel} output`}
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
            className="object-cover"
          />
          {/* Label Badge Left */}
          <div className="absolute top-4 left-4 z-10 pointer-events-none">
            <span className="px-3 py-1.5 rounded-md bg-black/75 backdrop-blur-md text-amber-400 font-mono text-xs font-bold border border-amber-500/30 shadow-lg">
              {leftLabel}
            </span>
          </div>
        </div>

        {/* Vertical Divider Line & Interactive Handle */}
        <div
          className="absolute top-0 bottom-0 z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Vertical Laser Line */}
          <div className="absolute inset-y-0 -left-[1.5px] w-[3px] bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)]" />

          {/* Centered Circular Grabber Handle */}
          <div className="absolute top-1/2 -left-5 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-zinc-900 shadow-2xl flex items-center justify-center pointer-events-auto border-2 border-zinc-900 group-hover:scale-110 transition-transform">
            <SlidersHorizontal className="w-4 h-4 text-zinc-900 rotate-90" />
          </div>
        </div>

        {/* Drag Helper Tooltip */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 pointer-events-none bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[11px] text-zinc-300">
          Drag slider to compare side-by-side
        </div>
      </div>

      {/* Rationale & Observation Notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-xl border border-amber-500/20 bg-amber-500/[0.03]">
          <span className="font-bold text-amber-400 block mb-1">{leftLabel} Architecture Profile</span>
          <p className="text-[var(--muted-foreground)] leading-relaxed">{leftNote}</p>
        </div>
        <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03]">
          <span className="font-bold text-emerald-400 block mb-1">{rightLabel} Architecture Profile</span>
          <p className="text-[var(--muted-foreground)] leading-relaxed">{rightNote}</p>
        </div>
      </div>

      {/* Active Benchmark Prompt Card */}
      <div className="p-4 sm:p-5 rounded-xl border border-[var(--border)] bg-[var(--card)]">
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wider">
            Benchmark Prompt Test Input
          </span>
          <button
            onClick={handleCopyPrompt}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium bg-[var(--secondary)] hover:bg-[var(--secondary)]/80 text-[var(--foreground)] transition-colors border border-[var(--border)]"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                Copied
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                Copy Prompt
              </>
            )}
          </button>
        </div>
        <p className="font-mono text-xs text-[var(--foreground)] bg-[var(--background)] p-3 rounded-lg border border-[var(--border)] leading-relaxed select-all">
          {currentPreset.prompt}
        </p>
      </div>
    </div>
  );
}
