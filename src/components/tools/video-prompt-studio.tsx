"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { copyToClipboard } from "@/lib/utils";
import {
  Video,
  Film,
  Camera,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Share2,
  Sliders,
  Clock,
} from "lucide-react";

export type VideoTargetModel = "runway" | "kling" | "luma" | "minimax";

interface MotionArchetype {
  id: string;
  name: string;
  tagline: string;
  iconName: string;
  runwaySyntax: string;
  klingSyntax: string;
  lumaSyntax: string;
  minimaxSyntax: string;
}

const MOTION_ARCHETYPES: MotionArchetype[] = [
  {
    id: "orbit-360",
    name: "360° Circular Orbit",
    tagline: "Smooth 360-degree radial camera rotation keeping central subject fixed",
    iconName: "Compass",
    runwaySyntax: "[Camera: Orbit Right 360°, Elevation: Eye-Level, Speed: Smooth]",
    klingSyntax: "The camera smoothly orbits 360 degrees around the central subject with fluid rotational momentum.",
    lumaSyntax: "Camera movement: Full 360-degree continuous circular orbit around focal point.",
    minimaxSyntax: "The scene unfolds as the viewpoint executes a continuous circular orbit around the central figure.",
  },
  {
    id: "fpv-drone-dive",
    name: "FPV Drone Dive",
    tagline: "High-velocity vertical dive from aerial altitude into low street-skimming flight",
    iconName: "Navigation",
    runwaySyntax: "[Camera: FPV Drone Dive, High Speed, Dynamic Roll 15°, Low Clearance]",
    klingSyntax: "Dynamic FPV drone footage executing a rapid vertical dive from the sky, leveling out inches above the ground with extreme kinetic speed.",
    lumaSyntax: "Camera movement: High-velocity acrobatic FPV drone dive into low-altitude skim.",
    minimaxSyntax: "A breathless FPV dive descends sharply from high above before carving forward at extreme velocity.",
  },
  {
    id: "dolly-zoom",
    name: "Dolly Zoom (Vertigo)",
    tagline: "Optical focal distortion: camera zooms in while dollying backward simultaneously",
    iconName: "Maximize2",
    runwaySyntax: "[Camera: Dolly Zoom Vertigo Effect, Reverse Zoom, Fixed Subject Scale]",
    klingSyntax: "A textbook cinematic dolly zoom (vertigo effect): the background warps and expands dramatically while the subject remains perfectly locked in scale.",
    lumaSyntax: "Camera movement: Vertigo dolly zoom, optical perspective compression.",
    minimaxSyntax: "A disorientation dolly zoom warps the spatial depth of the surrounding environment while holding the subject steady.",
  },
  {
    id: "crane-reveal",
    name: "Crane Elevation Reveal",
    tagline: "Sweeping vertical ascension over architectural obstacles revealing horizon",
    iconName: "ArrowUpRight",
    runwaySyntax: "[Camera: Jib / Crane Boom Up, Tilt Down 20°, Expansive Reveal]",
    klingSyntax: "The camera executes a smooth crane boom movement ascending vertically over the foreground to reveal the vast panoramic landscape.",
    lumaSyntax: "Camera movement: Smooth vertical crane pedestal rising upward to wide horizon reveal.",
    minimaxSyntax: "The point of view cranes steadily upward from ground level, unveiling the sprawling landscape bathed in atmosphere.",
  },
  {
    id: "rack-focus",
    name: "Macro Rack Focus",
    tagline: "Focal plane transition from extreme macro foreground subject to deep background",
    iconName: "Eye",
    runwaySyntax: "[Camera: Rack Focus, Shallow DOF f/1.4, Shift: Foreground to Background]",
    klingSyntax: "The shot begins in razor-sharp macro focus on the foreground element, then smoothly racks focus across the depth plane to the distant background.",
    lumaSyntax: "Camera movement: Dynamic rack focus transition across shallow depth of field.",
    minimaxSyntax: "Focus smoothly shifts from the crystalline details in the immediate foreground to the atmospheric scene beyond.",
  },
  {
    id: "lateral-tracking",
    name: "High-Speed Lateral Tracking",
    tagline: "Side-by-side velocity match tracking alongside moving vehicle or character",
    iconName: "Sliders",
    runwaySyntax: "[Camera: Lateral Tracking Left, Parallel Motion, Matching Velocity, Low Angle]",
    klingSyntax: "A low-angle parallel tracking shot moving synchronously alongside the subject, maintaining equal velocity with cinematic motion blur.",
    lumaSyntax: "Camera movement: Continuous side-by-side lateral tracking shot at matching velocity.",
    minimaxSyntax: "The camera races alongside the subject in a locked tracking shot with streaks of kinetic motion blur.",
  },
];

interface VideoPreset {
  id: string;
  name: string;
  model: VideoTargetModel;
  motionId: string;
  subject: string;
  environment: string;
  duration: "5s" | "10s";
  frameRate: "24fps" | "60fps" | "120fps";
  atmosphere: string;
}

const VIDEO_PRESETS: VideoPreset[] = [
  {
    id: "cyberpunk-pursuit",
    name: "Cyberpunk Alleyway Pursuit",
    model: "runway",
    motionId: "lateral-tracking",
    subject: "a customized vintage electric motorcycle with glowing exposed coils",
    environment: "rain-soaked alleyway with neon signs reflecting in deep asphalt puddles",
    duration: "5s",
    frameRate: "24fps",
    atmosphere: "billowing steam vents, splashing puddles, anamorphic lens flares",
  },
  {
    id: "alpine-fpv",
    name: "Alpine Glacial FPV Dive",
    model: "kling",
    motionId: "fpv-drone-dive",
    subject: "crevasse-strewn turquoise glacier edge",
    environment: "dramatic snow-capped peaks in the Swiss Alps at golden hour",
    duration: "10s",
    frameRate: "60fps",
    atmosphere: "swirling snow dust, blinding sun glare, crisp mountain wind",
  },
  {
    id: "tokyo-artisan-orbit",
    name: "Tokyo Tea Master Orbit",
    model: "luma",
    motionId: "orbit-360",
    subject: "an elderly master whisking emerald matcha in an ancient ceramic bowl",
    environment: "minimalist cedar tatami room with soft morning light filtered through shoji screens",
    duration: "5s",
    frameRate: "24fps",
    atmosphere: "rising steam, soft bokeh, gentle wood grain texture",
  },
  {
    id: "noir-vertigo",
    name: "Film Noir Vertigo Epiphany",
    model: "minimax",
    motionId: "dolly-zoom",
    subject: "a detective in a damp trench coat standing under a solitary streetlamp",
    environment: "fog-choked cobblestone crossroads in 1940s Chicago",
    duration: "5s",
    frameRate: "24fps",
    atmosphere: "drifting river mist, flickering amber incandescent glow, heavy shadow",
  },
];

const MODEL_INFO: Record<
  VideoTargetModel,
  { label: string; badge: string; color: string; strengths: string }
> = {
  runway: {
    label: "Runway Gen-3 Alpha",
    badge: "Director Mode",
    color: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    strengths: "Excels with bracketed camera commands ([Camera: ...]) and structural temporal control.",
  },
  kling: {
    label: "Kling AI 1.5",
    badge: "Fluid Physics",
    color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    strengths: "Market-leading real-world physics, fluid mechanics, and high-framerate motion.",
  },
  luma: {
    label: "Luma Dream Machine",
    badge: "Ray Engine",
    color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    strengths: "Fast cinematic generation with realistic optical motion blur and dynamic lighting.",
  },
  minimax: {
    label: "Minimax Hailuo",
    badge: "Atmospheric Narrative",
    color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    strengths: "Exceptional narrative coherence and cinematic atmospheric consistency across turns.",
  },
};

export function VideoPromptStudio() {
  const { success } = useToast();

  const [model, setModel] = useState<VideoTargetModel>("runway");
  const [motionId, setMotionId] = useState<string>("orbit-360");
  const [subject, setSubject] = useState(
    "a customized vintage electric motorcycle with glowing exposed coils"
  );
  const [environment, setEnvironment] = useState(
    "rain-soaked alleyway with neon signs reflecting in deep asphalt puddles"
  );
  const [duration, setDuration] = useState<"5s" | "10s">("5s");
  const [frameRate, setFrameRate] = useState<"24fps" | "60fps" | "120fps">("24fps");
  const [atmosphere, setAtmosphere] = useState(
    "billowing steam vents, splashing puddles, anamorphic lens flares"
  );
  const [isCopied, setIsCopied] = useState(false);
  const [isShareCopied, setIsShareCopied] = useState(false);

  // Read URL query parameters on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const applyUrlParams = () => {
      const params = new URLSearchParams(window.location.search);
      const m = params.get("model");
      if (m && ["runway", "kling", "luma", "minimax"].includes(m)) {
        setModel(m as VideoTargetModel);
      }
      const mot = params.get("motion");
      if (mot && MOTION_ARCHETYPES.some((a) => a.id === mot)) {
        setMotionId(mot);
      }
      const s = params.get("subject");
      if (s) setSubject(s);
      const env = params.get("environment");
      if (env) setEnvironment(env);
    };

    const timer = setTimeout(applyUrlParams, 0);
    window.addEventListener("popstate", applyUrlParams);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("popstate", applyUrlParams);
    };
  }, []);

  const activeMotion = useMemo(() => {
    return MOTION_ARCHETYPES.find((a) => a.id === motionId) || MOTION_ARCHETYPES[0];
  }, [motionId]);

  // Compile video prompt based on target model syntax conventions
  const compiledVideoPrompt = useMemo(() => {
    const cleanSub = subject.trim();
    const cleanEnv = environment.trim();
    const cleanAtmo = atmosphere.trim();

    if (model === "runway") {
      const parts: string[] = [];
      parts.push(activeMotion.runwaySyntax);
      parts.push(`[Duration: ${duration}, Frame Rate: ${frameRate}]`);
      parts.push(`Cinematic motion capture of ${cleanSub}`);
      if (cleanEnv) parts.push(`located within ${cleanEnv}`);
      if (cleanAtmo) parts.push(`Atmospheric dynamics: ${cleanAtmo}`);
      parts.push("Continuous temporal consistency, natural physical weight, no jitter.");
      return parts.join(" ");
    }

    if (model === "kling") {
      const parts: string[] = [];
      parts.push(
        `High-fidelity ${duration} cinematic shot at ${frameRate}. ${activeMotion.klingSyntax}`
      );
      parts.push(`The scene features ${cleanSub} set against ${cleanEnv}.`);
      if (cleanAtmo) {
        parts.push(`The atmosphere is characterized by ${cleanAtmo}.`);
      }
      parts.push(
        "Photorealistic fluid dynamics, accurate temporal physics, authentic motion blur."
      );
      return parts.join(" ");
    }

    if (model === "luma") {
      const parts: string[] = [];
      parts.push(`${activeMotion.lumaSyntax}`);
      parts.push(`Subject: ${cleanSub}.`);
      if (cleanEnv) parts.push(`Environment: ${cleanEnv}.`);
      parts.push(`Cinematic ${frameRate} capture, duration ${duration}.`);
      if (cleanAtmo) parts.push(`Atmospheric effects: ${cleanAtmo}.`);
      return parts.join(" ");
    }

    if (model === "minimax") {
      const parts: string[] = [];
      parts.push(
        `A breathtaking ${duration} continuous sequence. ${activeMotion.minimaxSyntax}`
      );
      parts.push(
        `In focus is ${cleanSub}, surrounded by ${cleanEnv}. Captured with cinematic depth at ${frameRate}.`
      );
      if (cleanAtmo) parts.push(`Subtle atmospheric motion: ${cleanAtmo}.`);
      return parts.join(" ");
    }

    return "";
  }, [model, activeMotion, subject, environment, duration, frameRate, atmosphere]);

  const handleApplyPreset = (preset: VideoPreset) => {
    setModel(preset.model);
    setMotionId(preset.motionId);
    setSubject(preset.subject);
    setEnvironment(preset.environment);
    setDuration(preset.duration);
    setFrameRate(preset.frameRate);
    setAtmosphere(preset.atmosphere);
    success(`Applied preset: ${preset.name}`);
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(compiledVideoPrompt);
    if (ok) {
      setIsCopied(true);
      success("Video prompt copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleShareSetup = async () => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams();
    params.set("model", model);
    params.set("motion", motionId);
    if (subject) params.set("subject", subject);
    if (environment) params.set("environment", environment);

    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    const ok = await copyToClipboard(shareUrl);
    if (ok) {
      setIsShareCopied(true);
      success("Video studio configuration copied to clipboard!");
      setTimeout(() => setIsShareCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setMotionId("orbit-360");
    setSubject("a solitary wanderer holding a lantern");
    setEnvironment("windswept coastal sand dunes at twilight");
    setAtmosphere("billowing fog, rolling ocean spray, cinematic amber glow");
    setDuration("5s");
    setFrameRate("24fps");
    success("Reset to defaults");
  };

  return (
    <div className="space-y-8">
      {/* Model Selector Bar */}
      <div className="p-1.5 rounded-xl border border-[var(--border)] bg-[var(--card)] flex flex-wrap gap-1 shadow-sm">
        {(
          [
            { id: "runway", label: "Runway Gen-3", badge: "Director Brackets", color: "text-amber-400" },
            { id: "kling", label: "Kling AI 1.5", badge: "Fluid Physics", color: "text-emerald-400" },
            { id: "luma", label: "Luma Dream Machine", badge: "Ray Engine", color: "text-blue-400" },
            { id: "minimax", label: "Minimax Hailuo", badge: "Narrative", color: "text-purple-400" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setModel(tab.id)}
            className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
              model === tab.id
                ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]/50"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                model === tab.id ? "bg-black/30 text-white" : "bg-[var(--secondary)] text-[var(--muted-foreground)]"
              }`}
            >
              {tab.badge}
            </span>
          </button>
        ))}
      </div>

      {/* Preset Quick Loader */}
      <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)] space-y-3">
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            1-Click Cinematic Video Presets
          </span>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Defaults
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {VIDEO_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleApplyPreset(preset)}
              className="p-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)]/60 text-left transition-all hover:shadow-xs group"
            >
              <span className="text-xs font-bold text-[var(--foreground)] block line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
                {preset.name}
              </span>
              <span className="text-[10px] text-[var(--muted-foreground)] line-clamp-1 mt-0.5">
                {preset.duration} • {preset.frameRate} • {preset.model}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Controls Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Camera Motion Vector Direction */}
          <Card className="p-5 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
              <div className="flex items-center gap-2 text-sm font-bold text-[var(--foreground)]">
                <Video className="w-4 h-4 text-[var(--primary)]" />
                <h3>1. Camera Motion Vector Archetype</h3>
              </div>
              <Badge variant="outline" size="sm" className="font-mono text-[10px]">
                {MOTION_ARCHETYPES.length} Vectors
              </Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {MOTION_ARCHETYPES.map((arch) => {
                const isSelected = arch.id === motionId;
                return (
                  <button
                    key={arch.id}
                    type="button"
                    onClick={() => setMotionId(arch.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      isSelected
                        ? "border-[var(--primary)] bg-[var(--primary)]/10 shadow-sm"
                        : "border-[var(--border)] bg-[var(--background)] hover:border-[var(--border-strong)]"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-[var(--foreground)]">
                        {arch.name}
                      </span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[var(--primary)]" />}
                    </div>
                    <p className="text-[11px] text-[var(--muted-foreground)] line-clamp-2 leading-tight">
                      {arch.tagline}
                    </p>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Section 2: Subject & Environment */}
          <Card className="p-5 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[var(--border)] text-sm font-bold text-[var(--foreground)]">
              <Film className="w-4 h-4 text-[var(--primary)]" />
              <h3>2. Subject &amp; Environmental Dynamics</h3>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                Primary Subject &amp; Motion Action
              </label>
              <textarea
                rows={2}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. an athletic courier sprinting across wet rooftops, leaping over an HVAC vent"
                className="w-full px-3 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] text-xs sm:text-sm text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                Environment / Background Setting
              </label>
              <textarea
                rows={2}
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
                placeholder="e.g. neon-drenched metropolis with towering skyscrapers and continuous rain sheets"
                className="w-full px-3 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] text-xs sm:text-sm text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                Atmospheric Dynamics &amp; Physics
              </label>
              <input
                type="text"
                value={atmosphere}
                onChange={(e) => setAtmosphere(e.target.value)}
                placeholder="e.g. heavy rain droplets, wind gusts whipping fabric, volumetric neon haze"
                className="w-full px-3 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] text-xs text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
              />
            </div>
          </Card>

          {/* Section 3: Temporal Pacing & Frame Rate */}
          <Card className="p-5 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[var(--border)] text-sm font-bold text-[var(--foreground)]">
              <Clock className="w-4 h-4 text-[var(--primary)]" />
              <h3>3. Temporal Timing &amp; Motion Cadence</h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--foreground)] mb-1.5">
                  Target Duration
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["5s", "10s"] as const).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDuration(d)}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                        duration === d
                          ? "bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)] shadow-sm"
                          : "border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--foreground)] mb-1.5">
                  Cinematic Frame Rate
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["24fps", "60fps", "120fps"] as const).map((fps) => (
                    <button
                      key={fps}
                      type="button"
                      onClick={() => setFrameRate(fps)}
                      className={`py-2 px-2 rounded-lg text-xs font-semibold border transition-all ${
                        frameRate === fps
                          ? "bg-[var(--primary)] text-[var(--primary-foreground)] border-[var(--primary)] shadow-sm"
                          : "border-[var(--border)] bg-[var(--background)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                      }`}
                    >
                      {fps}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Live Output & Action Panel (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-20 space-y-6">
            {/* Live Video Output Terminal Card */}
            <Card className="p-5 border-[var(--primary)]/40 bg-[var(--card)] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-emerald-500 to-purple-500" />

              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Film className="w-4 h-4 text-[var(--primary)]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
                    Live Compiled Video Prompt
                  </span>
                </div>
                <Badge variant="outline" size="sm" className="font-mono text-[10px] uppercase">
                  {model}
                </Badge>
              </div>

              {/* Terminal Code Box */}
              <div className="p-4 rounded-xl bg-black/85 font-mono text-xs text-zinc-100 border border-white/10 leading-relaxed max-h-[340px] overflow-y-auto whitespace-pre-wrap select-all">
                {compiledVideoPrompt}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col gap-2.5">
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex-1 py-3 px-4 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-bold text-xs sm:text-sm hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[var(--primary)]/10 cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-300" />
                        <span>Copied Video Prompt!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Video Prompt</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={handleShareSetup}
                    title="Share current video prompt setup URL"
                    className="py-3 px-3.5 rounded-xl border border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)] text-[var(--foreground)] font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {isShareCopied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="hidden sm:inline">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-4 h-4 text-[var(--primary)]" />
                        <span className="hidden sm:inline">Share Setup</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <Link
                    href="/tools/prompt-generator"
                    className="py-2.5 px-3 rounded-lg border border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)] text-[var(--foreground)] font-medium text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Camera className="w-3.5 h-3.5 text-amber-400" />
                    <span>Image Studio</span>
                  </Link>

                  <Link
                    href="/tools/prompt-transpiler"
                    className="py-2.5 px-3 rounded-lg border border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)] text-[var(--foreground)] font-medium text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Sliders className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Transpiler</span>
                  </Link>
                </div>
              </div>
            </Card>

            {/* Model Directing Guidance Tip */}
            <div className="p-4 rounded-xl border border-[var(--border)] bg-gradient-to-br from-[var(--secondary)]/40 to-transparent space-y-2 text-xs">
              <span className="font-bold text-[var(--foreground)] block">
                {MODEL_INFO[model].label} Directing Tip:
              </span>
              <p className="text-[var(--muted-foreground)] leading-relaxed">
                {MODEL_INFO[model].strengths}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
