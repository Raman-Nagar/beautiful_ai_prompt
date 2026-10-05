"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Grid3X3, Compass, Crosshair, SlidersHorizontal, Eye, Maximize2 } from "lucide-react";
import { AspectRatio } from "@/types/prompt";

export type GuideType = "none" | "rule-of-thirds" | "golden-ratio" | "center-crosshair" | "diagonal";

interface CompositionOverlayProps {
  imageUrl: string;
  imageAlt: string;
  aspectRatio?: AspectRatio;
  cameraInfo?: string;
  defaultGuide?: GuideType;
  className?: string;
}

export function CompositionOverlay({
  imageUrl,
  imageAlt,
  aspectRatio = "16:9",
  cameraInfo,
  defaultGuide = "rule-of-thirds",
  className = "",
}: CompositionOverlayProps) {
  const [activeGuide, setActiveGuide] = useState<GuideType>(defaultGuide);
  const [guideColor, setGuideColor] = useState<"white" | "amber" | "cyan">("white");
  const [showRulerTicks, setShowRulerTicks] = useState(true);

  // Aspect ratio helper
  const getAspectRatioClass = (ar: AspectRatio) => {
    switch (ar) {
      case "16:9":
        return "aspect-[16/9]";
      case "9:16":
        return "aspect-[9/16]";
      case "1:1":
        return "aspect-square";
      case "4:5":
        return "aspect-[4/5]";
      case "3:2":
        return "aspect-[3/2]";
      case "2:3":
        return "aspect-[2/3]";
      case "21:9":
        return "aspect-[21/9]";
      default:
        return "aspect-[16/9]";
    }
  };

  const colorMap = {
    white: "stroke-white/80 text-white fill-white/80",
    amber: "stroke-amber-400/90 text-amber-400 fill-amber-400/90",
    cyan: "stroke-cyan-400/90 text-cyan-400 fill-cyan-400/90",
  };

  return (
    <div className={`relative rounded-2xl overflow-hidden border border-[var(--border-subtle)] bg-[var(--surface)] shadow-xl ${className}`}>
      {/* Visual Workspace Canvas */}
      <div className={`relative w-full ${getAspectRatioClass(aspectRatio)} overflow-hidden bg-black select-none`}>
        {/* Base Image */}
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 800px"
          className="object-cover transition-transform duration-300"
          priority
        />

        {/* Dynamic SVG Overlay */}
        {activeGuide !== "none" && (
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-200"
            viewBox="0 0 300 200"
            preserveAspectRatio="none"
          >
            {/* 1. Rule of Thirds */}
            {activeGuide === "rule-of-thirds" && (
              <g className={colorMap[guideColor]}>
                {/* Vertical Lines */}
                <line x1="100" y1="0" x2="100" y2="200" strokeWidth="0.75" strokeDasharray="2,2" />
                <line x1="200" y1="0" x2="200" y2="200" strokeWidth="0.75" strokeDasharray="2,2" />
                {/* Horizontal Lines */}
                <line x1="0" y1="66.6" x2="300" y2="66.6" strokeWidth="0.75" strokeDasharray="2,2" />
                <line x1="0" y1="133.3" x2="300" y2="133.3" strokeWidth="0.75" strokeDasharray="2,2" />
                {/* Focal Power Points */}
                <circle cx="100" cy="66.6" r="3.5" className="animate-pulse" />
                <circle cx="200" cy="66.6" r="3.5" className="animate-pulse" />
                <circle cx="100" cy="133.3" r="3.5" className="animate-pulse" />
                <circle cx="200" cy="133.3" r="3.5" className="animate-pulse" />
              </g>
            )}

            {/* 2. Golden Ratio / Fibonacci Spiral */}
            {activeGuide === "golden-ratio" && (
              <g className={colorMap[guideColor]}>
                {/* Phi Grid */}
                <line x1="114.6" y1="0" x2="114.6" y2="200" strokeWidth="0.75" strokeDasharray="3,3" opacity="0.6" />
                <line x1="185.4" y1="0" x2="185.4" y2="200" strokeWidth="0.75" strokeDasharray="3,3" opacity="0.6" />
                <line x1="0" y1="76.4" x2="300" y2="76.4" strokeWidth="0.75" strokeDasharray="3,3" opacity="0.6" />
                <line x1="0" y1="123.6" x2="300" y2="123.6" strokeWidth="0.75" strokeDasharray="3,3" opacity="0.6" />
                {/* Golden Spiral Path */}
                <path
                  d="M 300 200 A 185.4 123.6 0 0 0 114.6 76.4 A 114.6 76.4 0 0 0 0 123.6 A 70.8 47.2 0 0 0 70.8 170.8 A 43.8 29.2 0 0 0 114.6 141.6 A 27 18 0 0 0 96.6 123.6 A 16.7 11.1 0 0 0 85.5 134.7"
                  fill="none"
                  strokeWidth="1.25"
                />
              </g>
            )}

            {/* 3. Center Crosshair Symmetry */}
            {activeGuide === "center-crosshair" && (
              <g className={colorMap[guideColor]}>
                <line x1="150" y1="0" x2="150" y2="200" strokeWidth="0.75" />
                <line x1="0" y1="100" x2="300" y2="100" strokeWidth="0.75" />
                <circle cx="150" cy="100" r="15" fill="none" strokeWidth="0.75" strokeDasharray="2,2" />
                <circle cx="150" cy="100" r="35" fill="none" strokeWidth="0.5" strokeDasharray="3,3" opacity="0.7" />
              </g>
            )}

            {/* 4. Dynamic Diagonal Harmony */}
            {activeGuide === "diagonal" && (
              <g className={colorMap[guideColor]}>
                <line x1="0" y1="0" x2="300" y2="200" strokeWidth="0.75" />
                <line x1="0" y1="200" x2="300" y2="0" strokeWidth="0.75" />
                <line x1="0" y1="0" x2="150" y2="200" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.5" />
                <line x1="300" y1="0" x2="150" y2="200" strokeWidth="0.5" strokeDasharray="2,2" opacity="0.5" />
              </g>
            )}
          </svg>
        )}

        {/* Framing & Calibration Ruler Ticks */}
        {showRulerTicks && (
          <div className="absolute top-2 left-2 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-white/90 shadow-md">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>AR: {aspectRatio}</span>
            {cameraInfo && (
              <>
                <span className="text-white/30">•</span>
                <span>{cameraInfo}</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Control Bar: Ruler Calibration Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[var(--surface-subtle)] border-t border-[var(--border-subtle)] text-xs text-[var(--muted-foreground)]">
        {/* Guide Modes */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-[11px] font-medium text-[var(--foreground)] mr-1 flex items-center gap-1">
            <SlidersHorizontal className="h-3.5 w-3.5 text-[var(--primary)]" />
            Overlay:
          </span>
          <button
            type="button"
            onClick={() => setActiveGuide("rule-of-thirds")}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 font-medium ${
              activeGuide === "rule-of-thirds"
                ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm"
                : "hover:bg-[var(--surface-hover)] text-[var(--foreground)]"
            }`}
          >
            <Grid3X3 className="h-3.5 w-3.5" />
            Thirds
          </button>

          <button
            type="button"
            onClick={() => setActiveGuide("golden-ratio")}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 font-medium ${
              activeGuide === "golden-ratio"
                ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm"
                : "hover:bg-[var(--surface-hover)] text-[var(--foreground)]"
            }`}
          >
            <Compass className="h-3.5 w-3.5" />
            Golden Spiral
          </button>

          <button
            type="button"
            onClick={() => setActiveGuide("center-crosshair")}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 font-medium ${
              activeGuide === "center-crosshair"
                ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-sm"
                : "hover:bg-[var(--surface-hover)] text-[var(--foreground)]"
            }`}
          >
            <Crosshair className="h-3.5 w-3.5" />
            Center
          </button>

          <button
            type="button"
            onClick={() => setActiveGuide("none")}
            className={`px-2 py-1 rounded-md transition-all flex items-center gap-1 ${
              activeGuide === "none"
                ? "bg-[var(--muted)] text-[var(--foreground)]"
                : "hover:bg-[var(--surface-hover)]"
            }`}
          >
            <Eye className="h-3.5 w-3.5" />
            Clean
          </button>
        </div>

        {/* Color & Visibility Options */}
        <div className="flex items-center gap-2">
          {activeGuide !== "none" && (
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-[var(--surface)] border border-[var(--border-subtle)]">
              <button
                type="button"
                onClick={() => setGuideColor("white")}
                className={`w-3.5 h-3.5 rounded-full bg-white border ${
                  guideColor === "white" ? "ring-2 ring-[var(--primary)] ring-offset-1" : "opacity-60"
                }`}
                title="White guidelines"
              />
              <button
                type="button"
                onClick={() => setGuideColor("amber")}
                className={`w-3.5 h-3.5 rounded-full bg-amber-400 border ${
                  guideColor === "amber" ? "ring-2 ring-[var(--primary)] ring-offset-1" : "opacity-60"
                }`}
                title="Amber guidelines"
              />
              <button
                type="button"
                onClick={() => setGuideColor("cyan")}
                className={`w-3.5 h-3.5 rounded-full bg-cyan-400 border ${
                  guideColor === "cyan" ? "ring-2 ring-[var(--primary)] ring-offset-1" : "opacity-60"
                }`}
                title="Cyan guidelines"
              />
            </div>
          )}

          <button
            type="button"
            onClick={() => setShowRulerTicks(!showRulerTicks)}
            className="p-1 rounded-md hover:bg-[var(--surface-hover)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            title="Toggle aspect ratio specs"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
