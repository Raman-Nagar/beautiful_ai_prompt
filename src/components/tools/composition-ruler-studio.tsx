"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import {
  Grid3X3,
  Compass,
  Crosshair,
  Maximize2,
  Upload,
  Download,
  Copy,
  Check,
  Sliders,
  Eye,
  Camera,
  Layers,
} from "lucide-react";
import { useToast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════════════════
// Built-in Studio Presets (Curated High-Res Visual Artworks)
// ═══════════════════════════════════════════════════════════════════════════
interface PresetItem {
  id: string;
  name: string;
  category: string;
  aspectRatio: "16:9" | "4:5" | "1:1" | "21:9";
  url: string;
  suggestedGuide: GuideType;
  promptDescription: string;
}

const STUDIO_PRESETS: PresetItem[] = [
  {
    id: "preset-watch",
    name: "Swiss Chronograph Macro",
    category: "Product & Macro",
    aspectRatio: "1:1",
    url: "/images/visual/luxury-swiss-chronograph-macro.jpg",
    suggestedGuide: "center-crosshair",
    promptDescription: "Radial symmetry and central circular bezel framing with frozen water droplets.",
  },
  {
    id: "preset-skincare",
    name: "Botanical Serum Dropper",
    category: "Commercial Studio",
    aspectRatio: "4:5",
    url: "/images/visual/botanical-skincare-serum-dropper.jpg",
    suggestedGuide: "rule-of-thirds",
    promptDescription: "Upper right-to-left light diagonal with bottle anchored on the right third vertical.",
  },
  {
    id: "preset-cyberpunk",
    name: "Anamorphic Tokyo Street",
    category: "Cinematic Film",
    aspectRatio: "21:9",
    url: "/images/visual/cyberpunk-tokyo-alleyway.jpg",
    suggestedGuide: "golden-ratio",
    promptDescription: "Golden spiral curving from neon street signage into the hooded walking courier.",
  },
  {
    id: "preset-roadtrip",
    name: "1970s Mojave Road Trip",
    category: "Analog Film",
    aspectRatio: "16:9",
    url: "/images/visual/vintage-1970s-road-trip.jpg",
    suggestedGuide: "rule-of-thirds",
    promptDescription: "Subject leaning on red truck on left-center vertical third with diner sign on top-left third.",
  },
  {
    id: "preset-detective",
    name: "Film Noir Blind Silhouette",
    category: "Cinematic Film",
    aspectRatio: "16:9",
    url: "/images/visual/noir-detective-silhouette.jpg",
    suggestedGuide: "diagonal",
    promptDescription: "Dynamic diagonal shadows slicing at 45 degrees with detective framed right of center.",
  },
  {
    id: "preset-vogue",
    name: "Vogue Studio Portrait",
    category: "Fashion Portrait",
    aspectRatio: "4:5",
    url: "/images/visual/editorial-studio-fashion-portrait.jpg",
    suggestedGuide: "rule-of-thirds",
    promptDescription: "Eyes positioned strictly on upper horizontal third power line with vertical eye symmetry.",
  },
  {
    id: "preset-artisan",
    name: "Japanese Master Luthier",
    category: "Documentary",
    aspectRatio: "4:5",
    url: "/images/visual/rembrandt-lighting-elderly-artisan.jpg",
    suggestedGuide: "golden-ratio",
    promptDescription: "Spiral originating from the violin scroll leading up through the craftsman's focused eyes.",
  },
  {
    id: "preset-cathedral",
    name: "Brutalist Concrete Hall",
    category: "Architecture",
    aspectRatio: "16:9",
    url: "/images/visual/brutalist-concrete-cathedral.jpg",
    suggestedGuide: "center-crosshair",
    promptDescription: "Strict vertical perspective alignment with central architectural balance.",
  },
  {
    id: "preset-japandi",
    name: "Japandi Forest Living Room",
    category: "Interior Design",
    aspectRatio: "16:9",
    url: "/images/visual/scandinavian-minimalist-living-room.jpg",
    suggestedGuide: "rule-of-thirds",
    promptDescription: "Horizontal window sill on upper third, sofa on lower third, forest view in upper two thirds.",
  },
  {
    id: "preset-ramen",
    name: "3D Isometric Ramen Bar",
    category: "Digital 3D Art",
    aspectRatio: "1:1",
    url: "/images/visual/isometric-floating-cyberpunk-ramen-shop.jpg",
    suggestedGuide: "diagonal",
    promptDescription: "Isometric 30-degree diamond grid angles with centered diorama mass.",
  },
];

export type GuideType = "rule-of-thirds" | "golden-ratio" | "center-crosshair" | "diagonal" | "golden-triangles" | "none";
export type GuideColor = "amber" | "cyan" | "emerald" | "white" | "magenta";
export type AspectRatioOption = "original" | "1:1" | "4:5" | "16:9" | "21:9" | "9:16" | "3:2";

export function CompositionRulerStudio() {
  const { success, error: toastError } = useToast();

  // Active Media State
  const [selectedPreset, setSelectedPreset] = useState<PresetItem>(STUDIO_PRESETS[0]);
  const [customImageUrl, setCustomImageUrl] = useState<string | null>(null);
  const [customImageName, setCustomImageName] = useState<string>("");

  // Overlay Guide Controls
  const [activeGuide, setActiveGuide] = useState<GuideType>("rule-of-thirds");
  const [guideColor, setGuideColor] = useState<GuideColor>("amber");
  const [spiralFlip, setSpiralFlip] = useState<0 | 90 | 180 | 270>(0);
  const [overlayOpacity, setOverlayOpacity] = useState<number>(85);
  const [showRulerTicks, setShowRulerTicks] = useState<boolean>(true);
  const [showPowerPoints, setShowPowerPoints] = useState<boolean>(true);
  const [simulatedAspect, setSimulatedAspect] = useState<AspectRatioOption>("original");

  // Interactive Coordinates
  const [cursorCoords, setCursorCoords] = useState<{ xPct: number; yPct: number } | null>(null);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [copiedPrompt, setCopiedPrompt] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeImageUrl = customImageUrl || selectedPreset.url;
  const activeImageTitle = customImageUrl ? customImageName : selectedPreset.name;

  // Handle custom image upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toastError("Please upload a valid image file (JPG, PNG, WebP).");
      return;
    }

    try {
      const url = URL.createObjectURL(file);
      setCustomImageUrl(url);
      setCustomImageName(file.name);
      success(`Loaded custom image "${file.name}"`);
    } catch {
      toastError("Failed to load image. Please try another file.");
    }
  };

  // Track cursor position across image for ruler inspection
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setCursorCoords({ xPct: parseFloat(x.toFixed(1)), yPct: parseFloat(y.toFixed(1)) });
  };

  const handleMouseLeave = () => {
    setCursorCoords(null);
  };

  // Color Styles
  const colorConfig: Record<GuideColor, { stroke: string; fill: string; hex: string; name: string }> = {
    amber: { stroke: "#f59e0b", fill: "#f59e0b", hex: "#f59e0b", name: "Amber Gold" },
    cyan: { stroke: "#06b6d4", fill: "#06b6d4", hex: "#06b6d4", name: "Neon Cyan" },
    emerald: { stroke: "#10b981", fill: "#10b981", hex: "#10b981", name: "Emerald Lime" },
    white: { stroke: "#ffffff", fill: "#ffffff", hex: "#ffffff", name: "Clean White" },
    magenta: { stroke: "#ec4899", fill: "#ec4899", hex: "#ec4899", name: "Hot Magenta" },
  };

  const activeColor = colorConfig[guideColor];

  // Aspect ratio crop calculation
  const getAspectRatioPadding = () => {
    switch (simulatedAspect) {
      case "1:1":
        return "aspect-square max-w-[540px]";
      case "4:5":
        return "aspect-[4/5] max-w-[460px]";
      case "16:9":
        return "aspect-[16/9] max-w-[720px]";
      case "21:9":
        return "aspect-[21/9] max-w-[820px]";
      case "9:16":
        return "aspect-[9/16] max-w-[360px]";
      case "3:2":
        return "aspect-[3/2] max-w-[660px]";
      default:
        // Use preset's natural aspect
        if (selectedPreset.aspectRatio === "1:1") return "aspect-square max-w-[540px]";
        if (selectedPreset.aspectRatio === "4:5") return "aspect-[4/5] max-w-[460px]";
        if (selectedPreset.aspectRatio === "21:9") return "aspect-[21/9] max-w-[820px]";
        return "aspect-[16/9] max-w-[720px]";
    }
  };

  // Export Canvas Annotated Image
  const handleExportImage = async () => {
    setIsExporting(true);
    try {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = activeImageUrl;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth || 1200;
      canvas.height = img.naturalHeight || 800;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Draw base image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;
      ctx.save();
      ctx.strokeStyle = activeColor.hex;
      ctx.fillStyle = activeColor.hex;
      ctx.globalAlpha = overlayOpacity / 100;
      ctx.lineWidth = Math.max(2, w / 400);

      // Render Active Grid on Canvas
      if (activeGuide === "rule-of-thirds") {
        ctx.setLineDash([8, 8]);
        // Verticals
        ctx.beginPath();
        ctx.moveTo(w / 3, 0);
        ctx.lineTo(w / 3, h);
        ctx.moveTo((2 * w) / 3, 0);
        ctx.lineTo((2 * w) / 3, h);
        // Horizontals
        ctx.moveTo(0, h / 3);
        ctx.lineTo(w, h / 3);
        ctx.moveTo(0, (2 * h) / 3);
        ctx.lineTo(w, (2 * h) / 3);
        ctx.stroke();

        if (showPowerPoints) {
          ctx.setLineDash([]);
          const r = Math.max(6, w / 120);
          [[w / 3, h / 3], [(2 * w) / 3, h / 3], [w / 3, (2 * h) / 3], [(2 * w) / 3, (2 * h) / 3]].forEach(([cx, cy]) => {
            ctx.beginPath();
            ctx.arc(cx, cy, r, 0, Math.PI * 2);
            ctx.fill();
          });
        }
      } else if (activeGuide === "center-crosshair") {
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.moveTo(w / 2, 0);
        ctx.lineTo(w / 2, h);
        ctx.moveTo(0, h / 2);
        ctx.lineTo(w, h / 2);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(w / 2, h / 2, Math.max(20, w / 15), 0, Math.PI * 2);
        ctx.stroke();
      } else if (activeGuide === "diagonal") {
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(w, h);
        ctx.moveTo(w, 0);
        ctx.lineTo(0, h);
        ctx.stroke();
      }

      ctx.restore();

      // Trigger download
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = `composition-analyzed-${activeGuide}.png`;
      a.click();
      success("Exported annotated composition image!");
    } catch {
      toastError("Could not export image. Please ensure your browser allows downloads.");
    } finally {
      setIsExporting(false);
    }
  };

  // Copy Prompt Composition Keywords
  const handleCopyPromptModifier = async () => {
    let modifier = "";
    switch (activeGuide) {
      case "rule-of-thirds":
        modifier = "rule of thirds composition, off-center subject framing, dynamic visual balance --ar 16:9";
        break;
      case "golden-ratio":
        modifier = "fibonacci golden spiral framing, harmonious phi ratio composition, visual focal lead-in --ar 16:9";
        break;
      case "center-crosshair":
        modifier = "strictly centered symmetrical composition, Wes Anderson axial symmetry, centered crosshair framing --ar 1:1";
        break;
      case "diagonal":
        modifier = "dynamic diagonal tension, dutch angle baroque reciprocal line, cinematic kinetic movement --ar 21:9";
        break;
      default:
        modifier = "professional photographic composition, balanced negative space --v 6.1";
    }

    try {
      await navigator.clipboard.writeText(modifier);
      setCopiedPrompt(true);
      success("Copied composition prompt modifier to clipboard!");
      setTimeout(() => setCopiedPrompt(false), 2000);
    } catch {
      toastError("Unable to copy to clipboard automatically.");
    }
  };

  return (
    <div className="space-y-8">
      {/* ── Studio Header Bar ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl border border-[var(--border)] bg-[var(--card)]/80 backdrop-blur-md">
        <div>
          <div className="inline-flex items-center gap-2 mb-1.5">
            <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-400">
              Interactive Calibration Studio
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--foreground)]">
            AI Composition Ruler & Optical Caliper
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted-foreground)] mt-0.5">
            Calibrate Rule of Thirds, Golden Spiral, Symmetry, and test aspect ratios for Midjourney & FLUX.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-[var(--border-strong)] bg-[var(--secondary)] text-xs font-semibold text-[var(--foreground)] hover:bg-[var(--card-hover)] transition-all cursor-pointer shadow-xs"
          >
            <Upload className="h-3.5 w-3.5 text-[var(--primary)]" />
            <span>Upload Image</span>
          </button>

          <button
            type="button"
            onClick={handleExportImage}
            disabled={isExporting}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[var(--primary)] text-xs font-semibold text-[var(--primary-foreground)] hover:opacity-90 transition-all cursor-pointer shadow-xs disabled:opacity-50"
          >
            <Download className="h-3.5 w-3.5" />
            <span>{isExporting ? "Rendering..." : "Export Annotated PNG"}</span>
          </button>
        </div>
      </div>

      {/* ── Main Studio Workspace ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left / Center: Interactive Canvas (8 Cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="relative rounded-2xl border border-[var(--border)] bg-black/95 p-4 sm:p-6 flex flex-col items-center justify-center overflow-hidden shadow-2xl">
            {/* Top Coordinate & Measurement HUD */}
            <div className="w-full flex items-center justify-between text-[11px] font-mono text-white/70 pb-3 border-b border-white/10 mb-4 px-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-semibold text-white uppercase">{activeImageTitle}</span>
                <span className="text-white/40">•</span>
                <span className="text-white/60">
                  {simulatedAspect === "original" ? selectedPreset.aspectRatio : simulatedAspect}
                </span>
              </div>

              {cursorCoords ? (
                <div className="flex items-center gap-2 text-amber-300 font-bold bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/30">
                  <span>X: {cursorCoords.xPct}%</span>
                  <span>Y: {cursorCoords.yPct}%</span>
                </div>
              ) : (
                <span className="hidden sm:inline text-white/40">Hover over canvas for focal coordinates</span>
              )}
            </div>

            {/* Canvas Outer Wrapper with Pixel Ruler Ticks */}
            <div className="relative w-full flex items-center justify-center p-2">
              {/* Interactive Bounding Frame */}
              <div
                ref={containerRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className={cn(
                  "relative w-full overflow-hidden rounded-xl shadow-2xl select-none cursor-crosshair transition-all duration-300 border border-white/20",
                  getAspectRatioPadding()
                )}
              >
                {/* Base Image */}
                <Image
                  src={activeImageUrl}
                  alt={activeImageTitle}
                  fill
                  sizes="(max-width: 768px) 100vw, 850px"
                  className="object-cover object-center pointer-events-none"
                  priority
                />

                {/* SVG Calibration Grid Overlay */}
                {activeGuide !== "none" && (
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-200"
                    viewBox="0 0 300 200"
                    preserveAspectRatio="none"
                    style={{ opacity: overlayOpacity / 100 }}
                  >
                    {/* 1. Rule of Thirds */}
                    {activeGuide === "rule-of-thirds" && (
                      <g stroke={activeColor.stroke} fill={activeColor.fill}>
                        {/* Vertical Thirds */}
                        <line x1="100" y1="0" x2="100" y2="200" strokeWidth="1" strokeDasharray="3,3" />
                        <line x1="200" y1="0" x2="200" y2="200" strokeWidth="1" strokeDasharray="3,3" />
                        {/* Horizontal Thirds */}
                        <line x1="0" y1="66.6" x2="300" y2="66.6" strokeWidth="1" strokeDasharray="3,3" />
                        <line x1="0" y1="133.3" x2="300" y2="133.3" strokeWidth="1" strokeDasharray="3,3" />
                        {/* 4 Golden Focal Power Points */}
                        {showPowerPoints && (
                          <>
                            <circle cx="100" cy="66.6" r="4.5" className="animate-pulse" />
                            <circle cx="200" cy="66.6" r="4.5" className="animate-pulse" />
                            <circle cx="100" cy="133.3" r="4.5" className="animate-pulse" />
                            <circle cx="200" cy="133.3" r="4.5" className="animate-pulse" />
                            <circle cx="100" cy="66.6" r="9" fill="none" strokeWidth="0.75" opacity="0.6" />
                            <circle cx="200" cy="66.6" r="9" fill="none" strokeWidth="0.75" opacity="0.6" />
                            <circle cx="100" cy="133.3" r="9" fill="none" strokeWidth="0.75" opacity="0.6" />
                            <circle cx="200" cy="133.3" r="9" fill="none" strokeWidth="0.75" opacity="0.6" />
                          </>
                        )}
                      </g>
                    )}

                    {/* 2. Golden Ratio (Phi) & Fibonacci Spiral */}
                    {activeGuide === "golden-ratio" && (
                      <g
                        stroke={activeColor.stroke}
                        fill="none"
                        transform={`rotate(${spiralFlip} 150 100)`}
                      >
                        {/* Phi Lines (1:1.618) */}
                        <line x1="114.6" y1="0" x2="114.6" y2="200" strokeWidth="0.75" strokeDasharray="3,3" opacity="0.6" />
                        <line x1="185.4" y1="0" x2="185.4" y2="200" strokeWidth="0.75" strokeDasharray="3,3" opacity="0.6" />
                        <line x1="0" y1="76.4" x2="300" y2="76.4" strokeWidth="0.75" strokeDasharray="3,3" opacity="0.6" />
                        <line x1="0" y1="123.6" x2="300" y2="123.6" strokeWidth="0.75" strokeDasharray="3,3" opacity="0.6" />
                        {/* Parametric Fibonacci Spiral */}
                        <path
                          d="M 300 200 A 185.4 123.6 0 0 0 114.6 76.4 A 114.6 76.4 0 0 0 0 123.6 A 70.8 47.2 0 0 0 70.8 170.8 A 43.8 29.2 0 0 0 114.6 141.6 A 27 18 0 0 0 96.6 123.6 A 16.7 11.1 0 0 0 85.5 134.7"
                          strokeWidth="1.75"
                        />
                        <circle cx="85.5" cy="134.7" r="3" fill={activeColor.fill} />
                      </g>
                    )}

                    {/* 3. Center Crosshair & Symmetry */}
                    {activeGuide === "center-crosshair" && (
                      <g stroke={activeColor.stroke} fill={activeColor.fill}>
                        <line x1="150" y1="0" x2="150" y2="200" strokeWidth="1" />
                        <line x1="0" y1="100" x2="300" y2="100" strokeWidth="1" />
                        <circle cx="150" cy="100" r="18" fill="none" strokeWidth="1" strokeDasharray="3,3" />
                        <circle cx="150" cy="100" r="45" fill="none" strokeWidth="0.75" strokeDasharray="4,4" opacity="0.7" />
                        <circle cx="150" cy="100" r="3" />
                      </g>
                    )}

                    {/* 4. Dynamic Diagonals */}
                    {activeGuide === "diagonal" && (
                      <g stroke={activeColor.stroke} strokeWidth="1" strokeDasharray="4,4">
                        <line x1="0" y1="0" x2="300" y2="200" />
                        <line x1="300" y1="0" x2="0" y2="200" />
                        <line x1="0" y1="100" x2="150" y2="0" opacity="0.6" />
                        <line x1="150" y1="200" x2="300" y2="100" opacity="0.6" />
                        <line x1="0" y1="100" x2="150" y2="200" opacity="0.6" />
                        <line x1="150" y1="0" x2="300" y2="100" opacity="0.6" />
                      </g>
                    )}

                    {/* 5. Golden Triangles */}
                    {activeGuide === "golden-triangles" && (
                      <g stroke={activeColor.stroke} strokeWidth="1">
                        <line x1="0" y1="200" x2="300" y2="0" strokeWidth="1.25" />
                        {/* Reciprocal right-angle lines */}
                        <line x1="0" y1="0" x2="114.6" y2="123.6" strokeDasharray="3,3" />
                        <line x1="300" y1="200" x2="185.4" y2="76.4" strokeDasharray="3,3" />
                        <circle cx="114.6" cy="123.6" r="3.5" fill={activeColor.fill} />
                        <circle cx="185.4" cy="76.4" r="3.5" fill={activeColor.fill} />
                      </g>
                    )}
                  </svg>
                )}

                {/* Ruler Percentage Tick Marks */}
                {showRulerTicks && (
                  <div className="absolute inset-0 pointer-events-none text-[8px] font-mono text-white/50">
                    <span className="absolute top-1 left-[33.3%] -translate-x-1/2">33%</span>
                    <span className="absolute top-1 left-[50%] -translate-x-1/2 text-white/75 font-semibold">50%</span>
                    <span className="absolute top-1 left-[66.6%] -translate-x-1/2">66%</span>

                    <span className="absolute left-1 top-[33.3%] -translate-y-1/2">33%</span>
                    <span className="absolute left-1 top-[50%] -translate-y-1/2 text-white/75 font-semibold">50%</span>
                    <span className="absolute left-1 top-[66.6%] -translate-y-1/2">66%</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Quick-Action Prompt Generator */}
            <div className="w-full mt-4 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-white/70 text-center sm:text-left">
                {selectedPreset.promptDescription}
              </span>
              <button
                type="button"
                onClick={handleCopyPromptModifier}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white font-mono text-[11px] transition-colors cursor-pointer shrink-0"
              >
                {copiedPrompt ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                <span>Copy AI Parameter Modifier</span>
              </button>
            </div>
          </div>

          {/* Preset Selector Carousel / Grid */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--muted-foreground)] flex items-center gap-1.5">
                <Camera className="h-3.5 w-3.5 text-[var(--primary)]" />
                Select Curated Composition Preset ({STUDIO_PRESETS.length})
              </span>
              {customImageUrl && (
                <button
                  type="button"
                  onClick={() => setCustomImageUrl(null)}
                  className="text-[11px] font-medium text-amber-400 hover:underline cursor-pointer"
                >
                  Return to Presets
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              {STUDIO_PRESETS.map((preset) => {
                const isSelected = !customImageUrl && selectedPreset.id === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => {
                      setSelectedPreset(preset);
                      setCustomImageUrl(null);
                      setActiveGuide(preset.suggestedGuide);
                    }}
                    className={cn(
                      "group relative rounded-lg overflow-hidden border p-1 text-left transition-all cursor-pointer flex flex-col gap-1.5",
                      isSelected
                        ? "border-[var(--primary)] bg-[var(--primary)]/10 ring-2 ring-[var(--primary)]/20"
                        : "border-[var(--border-subtle)] hover:border-[var(--border-strong)] bg-[var(--secondary)]/40"
                    )}
                  >
                    <div className="relative w-full aspect-[16/10] rounded overflow-hidden bg-black/60">
                      <Image
                        src={preset.url}
                        alt={preset.name}
                        fill
                        sizes="160px"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="px-1 pb-1">
                      <p className="text-[11px] font-semibold text-[var(--foreground)] truncate">
                        {preset.name}
                      </p>
                      <p className="text-[9px] font-mono text-[var(--muted-foreground)] capitalize">
                        {preset.aspectRatio} • {preset.suggestedGuide.replace("-", " ")}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Optical Caliper Controls & Guide Settings (4 Cols) */}
        <div className="lg:col-span-4 space-y-5">
          {/* Guide Overlay Selector */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-subtle)]">
              <Layers className="h-4 w-4 text-[var(--primary)]" />
              <h3 className="text-sm font-bold tracking-tight text-[var(--foreground)]">
                Composition Guide System
              </h3>
            </div>

            <div className="space-y-1.5">
              {[
                { id: "rule-of-thirds", label: "Rule of Thirds", desc: "3×3 grid with 4 golden intersection focal anchors", icon: Grid3X3 },
                { id: "golden-ratio", label: "Golden Spiral (Phi 1.618)", desc: "Logarithmic spiral guiding optical eye trajectory", icon: Compass },
                { id: "center-crosshair", label: "Center Symmetry Crosshair", desc: "Dead-center radial focus for architecture & portraits", icon: Crosshair },
                { id: "diagonal", label: "Dynamic Diagonals", desc: "Corner-to-corner tension lines for action & cinematic stills", icon: Maximize2 },
                { id: "golden-triangles", label: "Golden Triangles", desc: "Right-angle reciprocal harmonic triangles", icon: Sliders },
                { id: "none", label: "Hide Overlays", desc: "View clean unannotated artwork", icon: Eye },
              ].map((g) => {
                const isActive = activeGuide === g.id;
                const Icon = g.icon;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setActiveGuide(g.id as GuideType)}
                    className={cn(
                      "w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all cursor-pointer",
                      isActive
                        ? "border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--foreground)] shadow-xs"
                        : "border-transparent hover:border-[var(--border-subtle)] hover:bg-[var(--secondary)]/60 text-[var(--muted-foreground)]"
                    )}
                  >
                    <Icon className={cn("h-4 w-4 mt-0.5 shrink-0", isActive ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]")} />
                    <div>
                      <p className="text-xs font-semibold text-[var(--foreground)] leading-tight">{g.label}</p>
                      <p className="text-[10px] text-[var(--muted-foreground)] leading-relaxed mt-0.5">{g.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Fibonacci Spiral Rotation Control */}
            {activeGuide === "golden-ratio" && (
              <div className="pt-2 border-t border-[var(--border-subtle)]">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-medium text-[var(--muted-foreground)]">Spiral Orientation</span>
                  <span className="font-mono text-[10px] text-amber-400 font-bold">{spiralFlip}°</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {([0, 90, 180, 270] as const).map((deg) => (
                    <button
                      key={deg}
                      type="button"
                      onClick={() => setSpiralFlip(deg)}
                      className={cn(
                        "py-1 rounded text-[10px] font-mono font-semibold border cursor-pointer transition-colors",
                        spiralFlip === deg
                          ? "border-amber-400 bg-amber-400/20 text-amber-300"
                          : "border-[var(--border-subtle)] bg-[var(--secondary)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                      )}
                    >
                      {deg}°
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Aspect Ratio Simulator */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-subtle)]">
              <div className="flex items-center gap-2">
                <Maximize2 className="h-4 w-4 text-[var(--primary)]" />
                <h3 className="text-sm font-bold tracking-tight text-[var(--foreground)]">
                  Aspect Ratio Caliper
                </h3>
              </div>
              <span className="text-[10px] font-mono text-[var(--muted-foreground)]">
                Crop Simulation
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "original", label: "Native", ratio: "Preset" },
                { id: "1:1", label: "1:1", ratio: "Square" },
                { id: "4:5", label: "4:5", ratio: "Portrait" },
                { id: "16:9", label: "16:9", ratio: "Cinematic" },
                { id: "21:9", label: "21:9", ratio: "Ultrawide" },
                { id: "9:16", label: "9:16", ratio: "Reels" },
              ].map((ar) => {
                const isActive = simulatedAspect === ar.id;
                return (
                  <button
                    key={ar.id}
                    type="button"
                    onClick={() => setSimulatedAspect(ar.id as AspectRatioOption)}
                    className={cn(
                      "flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all cursor-pointer",
                      isActive
                        ? "border-[var(--primary)] bg-[var(--primary)]/15 text-[var(--foreground)] font-semibold shadow-xs"
                        : "border-[var(--border-subtle)] bg-[var(--secondary)]/40 hover:border-[var(--border-strong)] text-[var(--muted-foreground)]"
                    )}
                  >
                    <span className="text-xs font-mono font-bold">{ar.label}</span>
                    <span className="text-[9px] text-[var(--muted-foreground)]">{ar.ratio}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Caliper Styling (Color & Opacity) */}
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[var(--border-subtle)]">
              <Sliders className="h-4 w-4 text-[var(--primary)]" />
              <h3 className="text-sm font-bold tracking-tight text-[var(--foreground)]">
                Caliper Customization
              </h3>
            </div>

            {/* Color Swatches */}
            <div>
              <span className="block text-xs font-medium text-[var(--muted-foreground)] mb-2">
                Grid Laser Color: <span className="font-semibold text-[var(--foreground)]">{activeColor.name}</span>
              </span>
              <div className="flex items-center gap-2">
                {(Object.keys(colorConfig) as GuideColor[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setGuideColor(c)}
                    aria-label={`Set grid color to ${colorConfig[c].name}`}
                    style={{ backgroundColor: colorConfig[c].hex }}
                    className={cn(
                      "w-7 h-7 rounded-full transition-transform cursor-pointer shadow-sm",
                      guideColor === c ? "ring-2 ring-[var(--foreground)] scale-110" : "opacity-70 hover:opacity-100"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Opacity Slider */}
            <div>
              <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)] mb-1.5">
                <span>Laser Grid Opacity</span>
                <span className="font-mono text-[11px] font-bold text-[var(--foreground)]">{overlayOpacity}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="100"
                value={overlayOpacity}
                onChange={(e) => setOverlayOpacity(parseInt(e.target.value))}
                className="w-full h-1.5 bg-[var(--border-subtle)] rounded-lg appearance-none cursor-pointer accent-[var(--primary)]"
              />
            </div>

            {/* Toggles */}
            <div className="pt-2 border-t border-[var(--border-subtle)] space-y-2">
              <label className="flex items-center justify-between text-xs text-[var(--foreground)] cursor-pointer">
                <span>Show Metric & Percent Ticks</span>
                <input
                  type="checkbox"
                  checked={showRulerTicks}
                  onChange={(e) => setShowRulerTicks(e.target.checked)}
                  className="rounded border-[var(--border-strong)] text-[var(--primary)] focus:ring-[var(--primary)]"
                />
              </label>

              <label className="flex items-center justify-between text-xs text-[var(--foreground)] cursor-pointer">
                <span>Highlight Golden Power Points</span>
                <input
                  type="checkbox"
                  checked={showPowerPoints}
                  onChange={(e) => setShowPowerPoints(e.target.checked)}
                  className="rounded border-[var(--border-strong)] text-[var(--primary)] focus:ring-[var(--primary)]"
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
