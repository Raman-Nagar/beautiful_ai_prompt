"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/toast";
import { copyToClipboard } from "@/lib/utils";
import {
  Sparkles,
  Copy,
  Check,
  RotateCcw,
  Sliders,
  Camera,
  Sun,
  Compass,
  Terminal,
  Settings2,
} from "lucide-react";

export type TargetEngine = "midjourney" | "flux" | "stable-diffusion" | "dall-e";

interface PresetStyle {
  id: string;
  name: string;
  tagline: string;
  engine: TargetEngine;
  subject: string;
  environment: string;
  shotType: string;
  lens: string;
  aperture: string;
  filmStock: string;
  lightingType: string;
  lightingDirection: string;
  colorTemp: string;
  aspectRatio: string;
  compositionGuide: string;
  stylize: number;
  chaos: number;
  isRaw: boolean;
  guidanceScale: number;
  steps: number;
  inImageText: string;
  negativePrompt: string;
}

const PRESET_STYLES: PresetStyle[] = [
  {
    id: "cinematic-35mm",
    name: "Cinematic 35mm Anamorphic",
    tagline: "Widescreen Panavision optics with rain reflections & horizontal streak flares",
    engine: "midjourney",
    subject: "a solitary courier wearing an oversized waterproof techwear parka",
    environment: "rain-soaked narrow alleyway in Neo-Tokyo with towering holographic billboards",
    shotType: "Cinematic wide establishing shot",
    lens: "Panavision C-Series Anamorphic 35mm",
    aperture: "f/2.0 with horizontal streak flares",
    filmStock: "Kodak Vision3 500T 5219 (Tungsten color film)",
    lightingType: "Atmospheric neon glow with wet asphalt reflections",
    lightingDirection: "Low raking side lighting with street steam",
    colorTemp: "Dual tone: Cool 450nm cyan key with warm 3200K tungsten amber rim",
    aspectRatio: "21:9",
    compositionGuide: "Rule of Thirds intersection",
    stylize: 250,
    chaos: 10,
    isRaw: false,
    guidanceScale: 3.5,
    steps: 30,
    inImageText: "",
    negativePrompt: "cartoon, flat 2d, illustration, oversaturated, deformed hands, blurry",
  },
  {
    id: "vogue-portrait",
    name: "Vogue Studio Fashion Portrait",
    tagline: "Clean 85mm f/1.4 beauty dish lighting with authentic epidermal skin micropores",
    engine: "midjourney",
    subject: "striking 28-year-old French model with high cheekbones and wavy brunette bob",
    environment: "neutral warm taupe minimalist studio backdrop",
    shotType: "Intimate close-up beauty portrait",
    lens: "Sony FE 85mm f/1.4 GM",
    aperture: "f/1.8 with shallow depth of field and hexagonal catchlights",
    filmStock: "High-resolution digital sensor (Sony A7R V)",
    lightingType: "Clamshell beauty lighting setup (22-inch white beauty dish overhead, silver bounce below)",
    lightingDirection: "Frontal 30-degree overhead key",
    colorTemp: "5400K clean daylight balanced",
    aspectRatio: "4:5",
    compositionGuide: "Center symmetry eye-level framing",
    stylize: 180,
    chaos: 0,
    isRaw: true,
    guidanceScale: 3.2,
    steps: 35,
    inImageText: "",
    negativePrompt: "plastic skin, airbrushed, doll, cartoon, extra fingers, smooth texture, symmetrical fake eyes",
  },
  {
    id: "flux-street-typography",
    name: "FLUX.1 Photorealistic Street & Signage",
    tagline: "Natural flow-matching diffusion with legible English typography on packaging",
    engine: "flux",
    subject: "matte terracotta ceramic cold brew coffee bottle on natural white oak surface",
    environment: "sunlit artisanal cafe window counter with soft monstera leaf shadows",
    shotType: "Commercial product hero close-up",
    lens: "Hasselblad XCD 90mm f/2.5 V Medium Format",
    aperture: "f/2.8 shallow depth of field",
    filmStock: "Medium format 100MP digital capture",
    lightingType: "Natural morning sunlight streaming through window glass",
    lightingDirection: "45-degree right side raking light",
    colorTemp: "3400K warm morning amber",
    aspectRatio: "16:9",
    compositionGuide: "Golden Ratio spiral framing",
    stylize: 150,
    chaos: 0,
    isRaw: false,
    guidanceScale: 3.5,
    steps: 28,
    inImageText: "SOLARIS BREW",
    negativePrompt: "crooked label, typo, blurry text, cartoon, 3d render, plastic",
  },
  {
    id: "brutalist-architecture",
    name: "Monolithic Brutalist Architecture",
    tagline: "Tadao Ando raw board-formed concrete with tilt-shift 90° vertical perspective",
    engine: "midjourney",
    subject: "minimalist brutalist meditation sanctuary and reflection hall",
    environment: "soaring raw board-formed concrete walls with narrow clerestory slit windows and terrazzo floor",
    shotType: "Architectural wide interior perspective",
    lens: "Canon TS-E 24mm f/3.5L II Tilt-Shift (perspective-corrected)",
    aperture: "f/8.0 deep focus from foreground to background",
    filmStock: "Fujifilm GFX 100S Medium Format",
    lightingType: "Crisp morning sunbeams slicing through ambient dust motes",
    lightingDirection: "High diagonal clerestory window illumination",
    colorTemp: "3800K warm morning sunlight",
    aspectRatio: "16:9",
    compositionGuide: "Strict vertical perspective lines",
    stylize: 220,
    chaos: 5,
    isRaw: false,
    guidanceScale: 3.5,
    steps: 30,
    inImageText: "",
    negativePrompt: "tilted vertical lines, barrel distortion, people, clutter, furniture, cartoon",
  },
  {
    id: "vintage-1970s",
    name: "1970s Kodachrome Road Trip",
    tagline: "Authentic vintage analog snapshot with warm Kodak color science and natural flare",
    engine: "midjourney",
    subject: "young traveler in vintage denim overalls and aviator sunglasses leaning against vehicle",
    environment: "dusty two-lane desert highway in Arizona at sunset with distant red rock mesas",
    shotType: "Medium full shot environmental portrait",
    lens: "Leica Summicron-M 50mm f/2 Rigid",
    aperture: "f/2.8 with natural lens flare spilling across frame",
    filmStock: "Kodak Portra 400 (C-41 chemical process)",
    lightingType: "Low-angle golden hour direct sunlight",
    lightingDirection: "Direct side-backlighting with warm halation",
    colorTemp: "2800K deep sunset gold",
    aspectRatio: "16:9",
    compositionGuide: "Rule of Thirds horizon placement",
    stylize: 160,
    chaos: 0,
    isRaw: true,
    guidanceScale: 3.0,
    steps: 30,
    inImageText: "",
    negativePrompt: "digital, modern cars, high contrast, HDR, glossy, airbrushed, cartoon",
  },
  {
    id: "swiss-watch-macro",
    name: "Swiss Luxury Chronograph Macro",
    tagline: "Precision 100mm 1:1 macro photography with raking cross-lighting and water droplets",
    engine: "midjourney",
    subject: "luxury mechanical chronograph with sunburst blue dial and skeleton sapphire caseback",
    environment: "resting on brushed dark titanium plate with microscopic suspended water droplets",
    shotType: "Extreme 1:1 optical macro close-up",
    lens: "Canon RF 100mm f/2.8L Macro IS USM",
    aperture: "f/8.0 deep depth of field across watch dial",
    filmStock: "Ultra-clean digital sensor at ISO 100",
    lightingType: "Dual vertical soft stripboxes with black foamcore negative fill",
    lightingDirection: "Raking cross-lighting at 90-degree angles",
    colorTemp: "5600K clean daylight balanced",
    aspectRatio: "1:1",
    compositionGuide: "Center symmetry dial alignment",
    stylize: 240,
    chaos: 0,
    isRaw: false,
    guidanceScale: 3.5,
    steps: 32,
    inImageText: "",
    negativePrompt: "scratches, dust, blurry dial, deformed numerals, fake CGI, cartoon, cheap metal",
  },
];

export function PromptGeneratorStudio() {
  const { success } = useToast();

  // Engine selection
  const [engine, setEngine] = useState<TargetEngine>("midjourney");

  // Core scene parameters
  const [subject, setSubject] = useState(
    "a solitary courier wearing an oversized waterproof techwear parka"
  );
  const [environment, setEnvironment] = useState(
    "rain-soaked narrow alleyway in Neo-Tokyo with towering holographic billboards"
  );
  const [shotType, setShotType] = useState("Cinematic wide establishing shot");

  // Optics & Hardware
  const [lens, setLens] = useState("Panavision C-Series Anamorphic 35mm");
  const [aperture, setAperture] = useState("f/2.0 with horizontal streak flares");
  const [filmStock, setFilmStock] = useState("Kodak Vision3 500T 5219 (Tungsten color film)");

  // Lighting & Atmosphere
  const [lightingType, setLightingType] = useState(
    "Atmospheric neon glow with wet asphalt reflections"
  );
  const [lightingDirection, setLightingDirection] = useState(
    "Low raking side lighting with street steam"
  );
  const [colorTemp, setColorTemp] = useState(
    "Dual tone: Cool 450nm cyan key with warm 3200K tungsten amber rim"
  );

  // Composition & Format
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [compositionGuide, setCompositionGuide] = useState("Rule of Thirds intersection");

  // Model-specific parameter flags
  const [stylize, setStylize] = useState(200);
  const [chaos, setChaos] = useState(0);
  const [weird, setWeird] = useState(0);
  const [isRaw, setIsRaw] = useState(false);
  const [guidanceScale, setGuidanceScale] = useState(3.5);
  const [steps, setSteps] = useState(30);
  const [inImageText, setInImageText] = useState("");
  const [srefUrl, setSrefUrl] = useState("");
  const [negativePrompt, setNegativePrompt] = useState(
    "cartoon, 3d render, plastic skin, airbrushed, deformed hands, blurry"
  );

  const [isCopied, setIsCopied] = useState(false);

  // Apply a preset
  const handleApplyPreset = (preset: PresetStyle) => {
    setEngine(preset.engine);
    setSubject(preset.subject);
    setEnvironment(preset.environment);
    setShotType(preset.shotType);
    setLens(preset.lens);
    setAperture(preset.aperture);
    setFilmStock(preset.filmStock);
    setLightingType(preset.lightingType);
    setLightingDirection(preset.lightingDirection);
    setColorTemp(preset.colorTemp);
    setAspectRatio(preset.aspectRatio);
    setCompositionGuide(preset.compositionGuide);
    setStylize(preset.stylize);
    setChaos(preset.chaos);
    setIsRaw(preset.isRaw);
    setGuidanceScale(preset.guidanceScale);
    setSteps(preset.steps);
    setInImageText(preset.inImageText);
    setNegativePrompt(preset.negativePrompt);
    success(`Applied preset: ${preset.name}`);
  };

  // Compile prompt in real-time according to target model syntax
  const compiledPrompt = useMemo(() => {
    const cleanSub = subject.trim();
    const cleanEnv = environment.trim();

    if (engine === "midjourney") {
      const parts: string[] = [];
      if (shotType) parts.push(shotType);
      if (cleanSub) parts.push(`of ${cleanSub}`);
      if (cleanEnv) parts.push(`in ${cleanEnv}`);
      if (lightingType) parts.push(lightingType);
      if (lightingDirection) parts.push(lightingDirection);
      if (colorTemp) parts.push(`color grading: ${colorTemp}`);
      if (compositionGuide) parts.push(`composition: ${compositionGuide}`);
      if (lens) parts.push(`shot on ${lens}`);
      if (aperture) parts.push(`at ${aperture}`);
      if (filmStock) parts.push(`texture: ${filmStock}`);

      // Assemble parameters
      const flags: string[] = ["--v 6.1"];
      if (aspectRatio) flags.push(`--ar ${aspectRatio}`);
      if (stylize !== 100) flags.push(`--stylize ${stylize}`);
      if (chaos > 0) flags.push(`--chaos ${chaos}`);
      if (weird > 0) flags.push(`--weird ${weird}`);
      if (isRaw) flags.push("--style raw");
      if (srefUrl.trim()) flags.push(`--sref ${srefUrl.trim()}`);
      if (negativePrompt.trim()) flags.push(`--no ${negativePrompt.trim()}`);

      return `${parts.join(", ")} ${flags.join(" ")}`;
    }

    if (engine === "flux") {
      const sentences: string[] = [];
      sentences.push(
        `${shotType} capturing ${cleanSub}${cleanEnv ? ` set within ${cleanEnv}` : ""}.`
      );
      if (inImageText.trim()) {
        sentences.push(`The scene features clear typography with the text "${inImageText.trim()}".`);
      }
      sentences.push(
        `The atmosphere is illuminated by ${lightingType}, with ${lightingDirection} and ${colorTemp}.`
      );
      sentences.push(
        `Composition strictly follows ${compositionGuide}. Captured using ${lens} at ${aperture}, displaying authentic tactile character resembling ${filmStock}.`
      );

      return sentences.join(" ");
    }

    if (engine === "stable-diffusion") {
      const positive: string[] = [
        "RAW photograph",
        "ultra-detailed",
        shotType,
        cleanSub,
        cleanEnv,
        lightingType,
        lightingDirection,
        colorTemp,
        compositionGuide,
        lens,
        aperture,
        filmStock,
        "8k resolution",
        "masterpiece",
      ].filter(Boolean);

      return `Positive: ${positive.join(", ")}\n\nNegative: ${negativePrompt.trim() || "bad anatomy, blurry, cartoon, extra limbs, low quality"}\n\nParameters: CFG: ${guidanceScale}, Steps: ${steps}, Sampler: DPM++ 2M Karras, Resolution: ${
        aspectRatio === "16:9" ? "1344x768" : aspectRatio === "4:5" ? "896x1152" : "1024x1024"
      }`;
    }

    if (engine === "dall-e") {
      const narrative: string[] = [];
      narrative.push(
        `A high-resolution photograph of ${cleanSub}${cleanEnv ? ` in ${cleanEnv}` : ""}.`
      );
      if (inImageText.trim()) {
        narrative.push(`Featuring the visible text "${inImageText.trim()}" in clear, crisp lettering.`);
      }
      narrative.push(
        `Shot from a ${shotType.toLowerCase()} perspective with ${compositionGuide.toLowerCase()}.`
      );
      narrative.push(
        `The lighting is ${lightingType.toLowerCase()} from ${lightingDirection.toLowerCase()}, creating ${colorTemp.toLowerCase()}.`
      );
      narrative.push(
        `The image has the optical character of a ${lens} at ${aperture} on ${filmStock}. Natural documentary photograph, no digital smoothing.`
      );

      return narrative.join(" ");
    }

    return "";
  }, [
    engine,
    subject,
    environment,
    shotType,
    lens,
    aperture,
    filmStock,
    lightingType,
    lightingDirection,
    colorTemp,
    aspectRatio,
    compositionGuide,
    stylize,
    chaos,
    weird,
    isRaw,
    srefUrl,
    negativePrompt,
    inImageText,
    guidanceScale,
    steps,
  ]);

  const handleCopy = async () => {
    const ok = await copyToClipboard(compiledPrompt);
    if (ok) {
      setIsCopied(true);
      success("Compiled prompt copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleReset = () => {
    setSubject("a solitary figure walking through the scene");
    setEnvironment("minimalist urban architectural environment");
    setInImageText("");
    setStylize(150);
    setChaos(0);
    setWeird(0);
    setIsRaw(false);
    success("Reset to defaults");
  };

  return (
    <div className="space-y-8">
      {/* Target Engine Segmented Controller */}
      <div className="p-1.5 rounded-xl border border-[var(--border)] bg-[var(--card)] flex flex-wrap gap-1 shadow-sm">
        {(
          [
            { id: "midjourney", label: "Midjourney v6.1", badge: "CLI Flags", color: "text-amber-400" },
            { id: "flux", label: "FLUX.1 Dev", badge: "Flow Matching", color: "text-emerald-400" },
            { id: "stable-diffusion", label: "SDXL / SD3.5", badge: "Pos / Neg", color: "text-blue-400" },
            { id: "dall-e", label: "DALL-E 3", badge: "Narrative", color: "text-purple-400" },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setEngine(tab.id)}
            className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
              engine === tab.id
                ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md"
                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--secondary)]/50"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                engine === tab.id ? "bg-black/30 text-white" : "bg-[var(--secondary)] text-[var(--muted-foreground)]"
              }`}
            >
              {tab.badge}
            </span>
          </button>
        ))}
      </div>

      {/* Preset Quick Loader */}
      <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--card)]">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            1-Click Production Presets
          </span>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1 text-[11px] text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset Defaults
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {PRESET_STYLES.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handleApplyPreset(preset)}
              className="p-2.5 rounded-lg border border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)]/60 text-left transition-all hover:shadow-sm group"
            >
              <span className="text-xs font-bold text-[var(--foreground)] block line-clamp-1 group-hover:text-[var(--primary)] transition-colors">
                {preset.name}
              </span>
              <span className="text-[10px] text-[var(--muted-foreground)] line-clamp-1">
                {preset.lens.split(" ")[0]} • {preset.aspectRatio}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Controls Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Slots (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Subject & Environment */}
          <Card className="p-5 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[var(--border)] text-sm font-bold text-[var(--foreground)]">
              <Camera className="w-4 h-4 text-[var(--primary)]" />
              <h3>1. Subject &amp; Environmental Framing</h3>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                Primary Subject
              </label>
              <textarea
                rows={2}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. an elderly Japanese violin artisan with deeply etched laugh lines"
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
                placeholder="e.g. cozy sunlit cedar workshop with scattered wood shavings and chisels in soft bokeh"
                className="w-full px-3 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] text-xs sm:text-sm text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)] leading-relaxed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                Shot Scale &amp; Distance
              </label>
              <select
                value={shotType}
                onChange={(e) => setShotType(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] text-xs text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
              >
                <option value="Intimate close-up beauty portrait">Intimate Close-up Beauty Portrait (Head &amp; Eyes)</option>
                <option value="Medium close-up portrait">Medium Close-up Portrait (Chest &amp; Hands)</option>
                <option value="Medium environmental shot">Medium Environmental Shot (Waist-up with Scene)</option>
                <option value="Cinematic wide establishing shot">Cinematic Wide Establishing Shot (Full Figure / Environment)</option>
                <option value="Extreme 1:1 optical macro close-up">Extreme 1:1 Optical Macro (Watch Dials / Droplets / Jewelry)</option>
                <option value="Architectural wide interior perspective">Architectural Wide Interior (Perspective-Corrected)</option>
                <option value="Intricate 3D isometric diorama">Intricate 3D Isometric Diorama (Miniature Octane Render)</option>
              </select>
            </div>
          </Card>

          {/* Section 2: Camera Optics & Film Stock */}
          <Card className="p-5 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[var(--border)] text-sm font-bold text-[var(--foreground)]">
              <Sliders className="w-4 h-4 text-amber-400" />
              <h3>2. Camera Optics &amp; Analog Medium</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                  Camera Lens / Focal Length
                </label>
                <select
                  value={lens}
                  onChange={(e) => setLens(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] text-xs text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                >
                  <option value="Sony FE 85mm f/1.4 GM">Sony FE 85mm f/1.4 GM (Portrait Flattery)</option>
                  <option value="Panavision C-Series Anamorphic 35mm">Panavision C-Series 35mm (Cinematic Flares)</option>
                  <option value="Leica Summicron-M 50mm f/2 Rigid">Leica Summicron 50mm f/2 (Human Eye Normal)</option>
                  <option value="Hasselblad XCD 90mm f/2.5 V Medium Format">Hasselblad XCD 90mm f/2.5 (Medium Format Micro-Contrast)</option>
                  <option value="Canon RF 100mm f/2.8L Macro IS USM">Canon RF 100mm Macro (1:1 Micro Detail)</option>
                  <option value="Canon TS-E 24mm f/3.5L II Tilt-Shift">Canon TS-E 24mm Tilt-Shift (Architecture 90° Verticals)</option>
                  <option value="Carl Zeiss Planar 80mm f/2.8 T*">Zeiss Planar 80mm (Vintage Hasselblad 500C)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                  Aperture &amp; Depth of Field
                </label>
                <select
                  value={aperture}
                  onChange={(e) => setAperture(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] text-xs text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                >
                  <option value="f/1.4 with extreme shallow depth of field and creamy circular bokeh">
                    f/1.4 — Ultra Shallow Bokeh (Subject Isolation)
                  </option>
                  <option value="f/1.8 with shallow depth of field and hexagonal catchlights">
                    f/1.8 — Portrait Sweet Spot (Iris Sharp, Soft Ears)
                  </option>
                  <option value="f/2.8 with moderate environmental separation">
                    f/2.8 — Documentary Depth (Crisp Subject, Soft Context)
                  </option>
                  <option value="f/5.6 commercial studio sharpness">
                    f/5.6 — Commercial Product Sharpness
                  </option>
                  <option value="f/8.0 deep focus from foreground to background">
                    f/8.0 — Full Field Sharpness (Architecture / Landscapes)
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                Sensor Medium &amp; Film Stock Texture
              </label>
              <select
                value={filmStock}
                onChange={(e) => setFilmStock(e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] text-xs text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
              >
                <option value="Kodak Portra 400 (C-41 chemical process)">Kodak Portra 400 (Warm Natural Skin Tones)</option>
                <option value="Kodak Vision3 500T 5219 (Tungsten color film)">Kodak Vision3 500T (Hollywood Motion Picture Night)</option>
                <option value="Ilford HP5 Plus 400 (Black and white silver-gelatin film)">Ilford HP5 Plus 400 (Rich Monochrome Chiaroscuro)</option>
                <option value="Fujifilm Superia 400 (Cool emerald shadows)">Fujifilm Superia 400 (Vibrant Green &amp; Cyan Tones)</option>
                <option value="High-resolution digital sensor (Sony A7R V)">Clean 61MP Digital CMOS Sensor (Zero Noise)</option>
                <option value="Hasselblad X2D 100C Medium Format Sensor">Hasselblad 100MP 16-Bit Color Depth</option>
              </select>
            </div>
          </Card>

          {/* Section 3: Lighting & Color Grading */}
          <Card className="p-5 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[var(--border)] text-sm font-bold text-[var(--foreground)]">
              <Sun className="w-4 h-4 text-yellow-400" />
              <h3>3. Lighting Direction &amp; Color Temperature</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                  Lighting Style
                </label>
                <select
                  value={lightingType}
                  onChange={(e) => setLightingType(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] text-xs text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                >
                  <option value="Clamshell beauty lighting (Overhead beauty dish, bottom silver bounce)">Clamshell Beauty Dish</option>
                  <option value="Rembrandt lighting with distinct cheek triangle">Rembrandt 45° Triangle</option>
                  <option value="Low-angle golden hour direct sunlight">Golden Hour Sunlight</option>
                  <option value="Chiaroscuro lighting with cutting Venetian blind shadows">Noir Chiaroscuro Blinds</option>
                  <option value="Atmospheric neon glow with wet reflections">Cyberpunk Neon Rain</option>
                  <option value="Crisp morning sunbeams slicing through ambient dust motes">Volumetric Dust Sunbeams</option>
                  <option value="Dual vertical soft stripboxes with negative fill">Commercial Stripboxes</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                  Lighting Direction
                </label>
                <select
                  value={lightingDirection}
                  onChange={(e) => setLightingDirection(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] text-xs text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                >
                  <option value="Frontal 30-degree overhead key">Frontal 30° Overhead</option>
                  <option value="Upper-left 45-degree key light">Upper-Left 45° Key</option>
                  <option value="Low raking side-backlighting with lens flare">Side-Backlit Rim Light</option>
                  <option value="Dual 90-degree cross-strip lighting">Dual 90° Cross Light</option>
                  <option value="Omnidirectional soft ambient bounce">Omnidirectional Soft Ambient</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                  Color Temperature
                </label>
                <select
                  value={colorTemp}
                  onChange={(e) => setColorTemp(e.target.value)}
                  className="w-full px-2.5 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] text-xs text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                >
                  <option value="5400K clean daylight balanced">5400K Daylight</option>
                  <option value="2800K warm golden sunset amber">2800K Sunset Amber</option>
                  <option value="3400K warm tungsten workshop glow">3400K Tungsten Warm</option>
                  <option value="Dual tone: Cool 450nm cyan key with warm 3200K tungsten amber rim">Dual Cyan / Amber</option>
                  <option value="Monochrome silver gradient">Monochrome Gelatin</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Section 4: Composition & Model Flags */}
          <Card className="p-5 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-[var(--border)] text-sm font-bold text-[var(--foreground)]">
              <Compass className="w-4 h-4 text-emerald-400" />
              <h3>4. Composition Geometry &amp; Engine Parameters</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                  Aspect Ratio
                </label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] text-xs text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                >
                  <option value="16:9">16:9 — Cinematic Landscape (Widescreen / Wallpaper)</option>
                  <option value="4:5">4:5 — Editorial Portrait (Instagram / Cover)</option>
                  <option value="9:16">9:16 — Vertical Story (Mobile / Reels)</option>
                  <option value="1:1">1:1 — Square Format (Product Showcase / Avatar)</option>
                  <option value="21:9">21:9 — Ultrawide Anamorphic Cinema</option>
                  <option value="3:2">3:2 — Classical 35mm Still Frame</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                  Composition Rule
                </label>
                <select
                  value={compositionGuide}
                  onChange={(e) => setCompositionGuide(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] text-xs text-[var(--foreground)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                >
                  <option value="Rule of Thirds intersection">Rule of Thirds (Focal Anchor on Grid)</option>
                  <option value="Fibonacci Golden Spiral flow">Golden Ratio (Fibonacci Flow)</option>
                  <option value="Center crosshair symmetry">Center Symmetry (Architectural / Head-on)</option>
                  <option value="Strict vertical perspective lines">Strict 90° Vertical Perspective</option>
                </select>
              </div>
            </div>

            {/* Model-specific controls */}
            {engine === "midjourney" && (
              <div className="p-3.5 rounded-lg border border-amber-500/20 bg-amber-500/[0.02] space-y-3">
                <span className="text-xs font-bold text-amber-400 block">Midjourney Parameter Flags</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-medium text-[var(--muted-foreground)] mb-1">
                      --stylize ({stylize})
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={1000}
                      step={25}
                      value={stylize}
                      onChange={(e) => setStylize(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[var(--muted-foreground)] mb-1">
                      --chaos ({chaos})
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={chaos}
                      onChange={(e) => setChaos(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-[var(--muted-foreground)] mb-1">
                      --style raw
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsRaw(!isRaw)}
                      className={`w-full py-1 px-2.5 rounded text-xs font-mono transition-colors border ${
                        isRaw
                          ? "bg-amber-500 text-black font-bold border-amber-500"
                          : "bg-[var(--background)] text-[var(--muted-foreground)] border-[var(--border)]"
                      }`}
                    >
                      {isRaw ? "Enabled (--style raw)" : "Standard Mode"}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-medium text-[var(--muted-foreground)] mb-1">
                    Style Reference URL (--sref)
                  </label>
                  <input
                    type="url"
                    value={srefUrl}
                    onChange={(e) => setSrefUrl(e.target.value)}
                    placeholder="https://example.com/palette.jpg (Optional)"
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[var(--background)] border border-[var(--border)] text-xs text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]"
                  />
                </div>
              </div>
            )}

            {engine === "flux" && (
              <div className="p-3.5 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.02] space-y-3">
                <span className="text-xs font-bold text-emerald-400 block">FLUX.1 In-Image Typography</span>
                <div>
                  <label className="block text-[11px] font-medium text-[var(--muted-foreground)] mb-1">
                    Text to Render in Image (enclosed in double quotes)
                  </label>
                  <input
                    type="text"
                    value={inImageText}
                    onChange={(e) => setInImageText(e.target.value)}
                    placeholder="e.g. SOLARIS BREW, TOKYO RAMEN"
                    className="w-full px-3 py-1.5 rounded-lg bg-[var(--background)] border border-[var(--border)] text-xs text-[var(--foreground)]"
                  />
                </div>
              </div>
            )}

            {/* Negative Prompt Field */}
            <div>
              <label className="block text-xs font-semibold text-[var(--foreground)] mb-1">
                Negative Elements to Exclude
              </label>
              <input
                type="text"
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                placeholder="e.g. cartoon, illustration, oversaturated, blurry, bad hands"
                className="w-full px-3 py-2 rounded-lg bg-[var(--background)] border border-[var(--border)] text-xs text-[var(--foreground)]"
              />
            </div>
          </Card>
        </div>

        {/* Right Column: Live Output Terminal & Action Panel (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-20 space-y-6">
            {/* Live Compiled Prompt Card */}
            <Card className="p-5 border-[var(--primary)]/40 bg-[var(--card)] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 via-emerald-500 to-blue-500" />

              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[var(--primary)]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[var(--foreground)]">
                    Live Compiled Output
                  </span>
                </div>
                <Badge variant="outline" size="sm" className="font-mono text-[10px] uppercase">
                  {engine}
                </Badge>
              </div>

              {/* Terminal Code Block */}
              <div className="p-4 rounded-xl bg-black/80 font-mono text-xs text-zinc-100 border border-white/10 leading-relaxed max-h-[360px] overflow-y-auto whitespace-pre-wrap select-all">
                {compiledPrompt}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col gap-2.5">
                <button
                  onClick={handleCopy}
                  className="w-full py-3 px-4 rounded-xl bg-[var(--primary)] text-[var(--primary-foreground)] font-bold text-xs sm:text-sm hover:opacity-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-[var(--primary)]/10"
                >
                  {isCopied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-300" />
                      <span>Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Compiled Prompt</span>
                    </>
                  )}
                </button>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <Link
                    href="/tools/composition-ruler"
                    className="py-2.5 px-3 rounded-lg border border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)] text-[var(--foreground)] font-medium text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Compass className="w-3.5 h-3.5 text-amber-400" />
                    <span>Test on Ruler</span>
                  </Link>

                  <Link
                    href={`/models/${engine === "midjourney" ? "midjourney" : engine === "flux" ? "flux" : engine === "stable-diffusion" ? "stable-diffusion" : "dall-e"}`}
                    className="py-2.5 px-3 rounded-lg border border-[var(--border)] bg-[var(--background)] hover:border-[var(--primary)] text-[var(--foreground)] font-medium text-center transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Settings2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>Model Guide</span>
                  </Link>
                </div>
              </div>
            </Card>

            {/* Architecture Tip Card */}
            <div className="p-4 rounded-xl border border-[var(--border)] bg-gradient-to-br from-[var(--secondary)]/40 to-transparent space-y-2 text-xs">
              <span className="font-bold text-[var(--foreground)] block">
                {engine === "midjourney"
                  ? "Midjourney Prompting Rule:"
                  : engine === "flux"
                  ? "FLUX.1 Flow Rule:"
                  : engine === "stable-diffusion"
                  ? "SDXL Conditioning Rule:"
                  : "DALL-E 3 Narrative Rule:"}
              </span>
              <p className="text-[var(--muted-foreground)] leading-relaxed">
                {engine === "midjourney"
                  ? "Midjourney structures prompts best when parameters (--ar, --v, --stylize) are strictly isolated with single spaces at the very end of the string."
                  : engine === "flux"
                  ? "FLUX adheres to complete grammatical sentences rather than comma-separated tag soup. Put target text inside double quotes."
                  : engine === "stable-diffusion"
                  ? "SDXL needs positive and negative prompts strictly segregated. Keep CFG scale between 5.5 and 7.0 for natural skin tones."
                  : "DALL-E 3 responds best to spatial narrative storytelling ('in the foreground on the left')."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
