/**
 * Beautiful AI Prompt - Universal Prompt Transpiler Engine
 *
 * Deterministically parses, normalizes, and translates prompt syntax between
 * Midjourney v6.1, FLUX.1 Dev/Schnell, Stable Diffusion XL (SDXL), and DALL-E 3.
 */

export type TranspilerModel = "midjourney" | "flux" | "stable-diffusion" | "dall-e";

export interface ParsedPrompt {
  rawSubject: string;
  negativeText: string;
  aspectRatio: string;
  stylize: number | null;
  chaos: number | null;
  weird: number | null;
  isRaw: boolean;
  version: string | null;
  sref: string | null;
  cref: string | null;
  extractedText: string | null;
  cfgScale: number | null;
  steps: number | null;
}

export interface TranspileResult {
  output: string;
  strippedTokens: string[];
  addedTokens: string[];
  architectureNotes: string[];
}

/**
 * Parses any incoming prompt string regardless of originating format.
 */
export function parseAnyPrompt(input: string): ParsedPrompt {
  let text = input.trim();

  let negativeText = "";
  let aspectRatio = "";
  let stylize: number | null = null;
  let chaos: number | null = null;
  let weird: number | null = null;
  let isRaw = false;
  let version: string | null = null;
  let sref: string | null = null;
  let cref: string | null = null;
  let extractedText: string | null = null;
  let cfgScale: number | null = null;
  let steps: number | null = null;

  // 1. Detect and extract SDXL-style Negative / Parameters sections
  if (text.includes("Negative:") || text.includes("negative prompt:")) {
    const negMatch = text.match(/(?:Negative|negative prompt):\s*([^]+?)(?=(?:Parameters:|\n\n|$))/i);
    if (negMatch) {
      negativeText = negMatch[1].trim();
      text = text.replace(negMatch[0], " ");
    }
  }

  if (text.includes("Positive:")) {
    text = text.replace(/Positive:\s*/i, "");
  }

  // 2. Detect SDXL Parameters line (e.g. CFG: 7, Steps: 30)
  const cfgMatch = text.match(/(?:CFG|guidance|scale)[:\s]+([0-9.]+)/i);
  if (cfgMatch) {
    cfgScale = parseFloat(cfgMatch[1]);
  }
  const stepsMatch = text.match(/Steps[:\s]+(\d+)/i);
  if (stepsMatch) {
    steps = parseInt(stepsMatch[1], 10);
  }
  text = text.replace(/Parameters:\s*[^]+$/i, " ");

  // 3. Extract Midjourney CLI flags
  // --ar / --aspect
  const arMatch = text.match(/--(?:ar|aspect)\s+([0-9]+:[0-9]+)/i);
  if (arMatch) {
    aspectRatio = arMatch[1];
    text = text.replace(arMatch[0], " ");
  }

  // --stylize / --s
  const sMatch = text.match(/--(?:stylize|s)\s+(\d+)/i);
  if (sMatch) {
    stylize = parseInt(sMatch[1], 10);
    text = text.replace(sMatch[0], " ");
  }

  // --chaos / --c
  const cMatch = text.match(/--(?:chaos|c)\s+(\d+)/i);
  if (cMatch) {
    chaos = parseInt(cMatch[1], 10);
    text = text.replace(cMatch[0], " ");
  }

  // --weird / --w
  const wMatch = text.match(/--(?:weird|w)\s+(\d+)/i);
  if (wMatch) {
    weird = parseInt(wMatch[1], 10);
    text = text.replace(wMatch[0], " ");
  }

  // --style raw
  if (/--style\s+raw/i.test(text)) {
    isRaw = true;
    text = text.replace(/--style\s+raw/i, " ");
  }

  // --v / --version
  const vMatch = text.match(/--(?:v|version)\s+([0-9.]+)/i);
  if (vMatch) {
    version = vMatch[1];
    text = text.replace(vMatch[0], " ");
  }

  // --sref
  const srefMatch = text.match(/--sref\s+([^\s]+)/i);
  if (srefMatch) {
    sref = srefMatch[1];
    text = text.replace(srefMatch[0], " ");
  }

  // --cref
  const crefMatch = text.match(/--cref\s+([^\s]+)/i);
  if (crefMatch) {
    cref = crefMatch[1];
    text = text.replace(crefMatch[0], " ");
  }

  // --no (Midjourney negative flag)
  const noMatch = text.match(/--no\s+([^--]+)/i);
  if (noMatch) {
    const rawNeg = noMatch[1].trim();
    negativeText = negativeText ? `${negativeText}, ${rawNeg}` : rawNeg;
    text = text.replace(noMatch[0], " ");
  }

  // 4. Extract quoted in-image typography text if any
  const quoteMatch = text.match(/"([^"]+)"/);
  if (quoteMatch) {
    extractedText = quoteMatch[1];
  }

  // Clean residual whitespace
  const rawSubject = text
    .replace(/\s+/g, " ")
    .replace(/^[,.\s]+|[,.\s]+$/g, "")
    .trim();

  return {
    rawSubject,
    negativeText,
    aspectRatio: aspectRatio || "16:9",
    stylize,
    chaos,
    weird,
    isRaw,
    version,
    sref,
    cref,
    extractedText,
    cfgScale,
    steps,
  };
}

/**
 * Transpiles parsed prompt elements into the target architecture's ideal syntax.
 */
export function transpilePrompt(
  input: string,
  sourceModel: TranspilerModel,
  targetModel: TranspilerModel
): TranspileResult {
  const parsed = parseAnyPrompt(input);
  const strippedTokens: string[] = [];
  const addedTokens: string[] = [];
  const architectureNotes: string[] = [];

  // When source and target are identical
  if (sourceModel === targetModel) {
    return {
      output: input.trim(),
      strippedTokens: [],
      addedTokens: [],
      architectureNotes: ["Source and target models are identical. Output preserved verbatim."],
    };
  }

  // ---------------------------------------------------------------------------
  // TARGET: FLUX.1 (Flow-matching transformer, natural descriptive sentences)
  // ---------------------------------------------------------------------------
  if (targetModel === "flux") {
    if (parsed.stylize !== null) strippedTokens.push(`--stylize ${parsed.stylize}`);
    if (parsed.chaos !== null) strippedTokens.push(`--chaos ${parsed.chaos}`);
    if (parsed.weird !== null) strippedTokens.push(`--weird ${parsed.weird}`);
    if (parsed.version !== null) strippedTokens.push(`--v ${parsed.version}`);
    if (parsed.sref) strippedTokens.push(`--sref ${parsed.sref}`);
    if (parsed.cref) strippedTokens.push(`--cref ${parsed.cref}`);

    let flowPrompt = parsed.rawSubject;

    // Convert comma-separated fragments into natural description
    if (flowPrompt.includes(",")) {
      const parts = flowPrompt.split(",").map((s) => s.trim()).filter(Boolean);
      flowPrompt = parts.join(", ");
    }

    // Capitalize and ensure sentence closure
    if (!/[.!?]$/.test(flowPrompt)) {
      flowPrompt += ".";
    }

    if (parsed.isRaw) {
      flowPrompt += " Authentic documentary photography with unretouched skin microtexture and natural optical falloff.";
      addedTokens.push("Natural optical descriptors (replaces --style raw)");
      strippedTokens.push("--style raw");
    }

    if (parsed.extractedText) {
      flowPrompt += ` The scene clearly displays the visible text "${parsed.extractedText}" in crisp typography.`;
      addedTokens.push(`Typography conditioning: "${parsed.extractedText}"`);
    }

    if (parsed.negativeText) {
      flowPrompt += ` Clean pristine composition free from artificial distortion or low-fidelity artifacts.`;
      strippedTokens.push(`Negative prompt: ${parsed.negativeText} (FLUX ignores negative conditioning)`);
      architectureNotes.push("FLUX natively ignores negative prompt weights. Negative constraints were rewritten into natural descriptive targets.");
    }

    architectureNotes.push("FLUX.1 utilizes flow-matching architecture and excels when prompts are formatted as grammatical, narrative sentences rather than tag soup.");

    return {
      output: flowPrompt,
      strippedTokens,
      addedTokens,
      architectureNotes,
    };
  }

  // ---------------------------------------------------------------------------
  // TARGET: Midjourney v6.1 (Concise visual nouns + trailing CLI parameter flags)
  // ---------------------------------------------------------------------------
  if (targetModel === "midjourney") {
    const mjPrompt = parsed.rawSubject;

    // Midjourney prefers concise phrases
    const flags: string[] = ["--v 6.1"];
    addedTokens.push("--v 6.1");

    if (parsed.aspectRatio) {
      flags.push(`--ar ${parsed.aspectRatio}`);
      addedTokens.push(`--ar ${parsed.aspectRatio}`);
    }

    if (parsed.stylize !== null && parsed.stylize !== 100) {
      flags.push(`--stylize ${parsed.stylize}`);
    } else if (sourceModel === "flux") {
      // Natural baseline for Midjourney when coming from realistic models
      flags.push("--stylize 150");
      addedTokens.push("--stylize 150 (editorial realism default)");
    }

    if (parsed.chaos) {
      flags.push(`--chaos ${parsed.chaos}`);
    }

    if (parsed.weird) {
      flags.push(`--weird ${parsed.weird}`);
    }

    if (parsed.isRaw) {
      flags.push("--style raw");
      addedTokens.push("--style raw");
    }

    if (parsed.sref) {
      flags.push(`--sref ${parsed.sref}`);
    }

    if (parsed.cref) {
      flags.push(`--cref ${parsed.cref}`);
    }

    if (parsed.negativeText) {
      flags.push(`--no ${parsed.negativeText}`);
      addedTokens.push(`--no ${parsed.negativeText}`);
    }

    if (parsed.cfgScale !== null) {
      strippedTokens.push(`CFG Scale: ${parsed.cfgScale} (Not used in Midjourney)`);
    }
    if (parsed.steps !== null) {
      strippedTokens.push(`Steps: ${parsed.steps} (Handled internally by Midjourney)`);
    }

    architectureNotes.push("Midjourney requires parameters at the very end separated by single spaces. Shorthand tags are prioritized over long grammatical sentences.");

    return {
      output: `${mjPrompt} ${flags.join(" ")}`,
      strippedTokens,
      addedTokens,
      architectureNotes,
    };
  }

  // ---------------------------------------------------------------------------
  // TARGET: Stable Diffusion XL (Explicit Positive/Negative arrays + Sampler/CFG)
  // ---------------------------------------------------------------------------
  if (targetModel === "stable-diffusion") {
    if (parsed.stylize !== null) strippedTokens.push(`--stylize ${parsed.stylize}`);
    if (parsed.chaos !== null) strippedTokens.push(`--chaos ${parsed.chaos}`);
    if (parsed.version !== null) strippedTokens.push(`--v ${parsed.version}`);

    const positiveTags = [
      "RAW photograph",
      "ultra-detailed",
      parsed.rawSubject,
      parsed.isRaw ? "analog film grain, 8k resolution, authentic skin micro-texture" : "sharp focus, high dynamic range",
      "masterpiece",
    ].filter(Boolean);

    addedTokens.push("RAW photograph", "ultra-detailed", "8k resolution");

    const negative = parsed.negativeText
      ? parsed.negativeText
      : "cartoon, illustration, 3d render, plastic smooth skin, oversaturated, deformed eyes, extra limbs, bad anatomy, blurry, low resolution, watermark";

    const cfg = parsed.cfgScale || 6.5;
    const stepCount = parsed.steps || 30;
    const res =
      parsed.aspectRatio === "16:9"
        ? "1344x768"
        : parsed.aspectRatio === "4:5"
        ? "896x1152"
        : parsed.aspectRatio === "21:9"
        ? "1536x640"
        : "1024x1024";

    const output = `Positive: ${positiveTags.join(", ")}\n\nNegative: ${negative}\n\nParameters: CFG: ${cfg}, Steps: ${stepCount}, Sampler: DPM++ 2M Karras, Resolution: ${res}`;

    architectureNotes.push("SDXL requires strict positive/negative token segregation and relies on latent resolution alignment (e.g. 1344x768 for 16:9).");

    return {
      output,
      strippedTokens,
      addedTokens,
      architectureNotes,
    };
  }

  // ---------------------------------------------------------------------------
  // TARGET: DALL-E 3 (Narrative spatial paragraph, zero CLI commands)
  // ---------------------------------------------------------------------------
  if (targetModel === "dall-e") {
    if (parsed.stylize !== null) strippedTokens.push(`--stylize ${parsed.stylize}`);
    if (parsed.chaos !== null) strippedTokens.push(`--chaos ${parsed.chaos}`);
    if (parsed.weird !== null) strippedTokens.push(`--weird ${parsed.weird}`);
    if (parsed.version !== null) strippedTokens.push(`--v ${parsed.version}`);
    if (parsed.sref) strippedTokens.push(`--sref ${parsed.sref}`);
    if (parsed.cref) strippedTokens.push(`--cref ${parsed.cref}`);

    let narrative = `A photorealistic, detailed scene showing ${parsed.rawSubject}.`;
    if (parsed.extractedText) {
      narrative += ` The visible sign prominently reads "${parsed.extractedText}" in clean clear lettering.`;
      addedTokens.push(`Explicit typography: "${parsed.extractedText}"`);
    }
    if (parsed.isRaw) {
      narrative += " Captured as an authentic natural documentary photograph with natural lighting and no digital smoothing or HDR glow.";
      addedTokens.push("Natural photographic constraints");
    }

    if (parsed.negativeText) {
      strippedTokens.push(`Negative prompt: ${parsed.negativeText}`);
      architectureNotes.push("DALL-E 3 does not parse negative prompt flags. Negative elements must be avoided through positive spatial description.");
    }

    architectureNotes.push("DALL-E 3 is conditioned via ChatGPT internal prompt expansion. Detailed spatial and material descriptions perform best.");

    return {
      output: narrative,
      strippedTokens,
      addedTokens,
      architectureNotes,
    };
  }

  return {
    output: input,
    strippedTokens: [],
    addedTokens: [],
    architectureNotes: [],
  };
}
