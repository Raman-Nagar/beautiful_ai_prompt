import { VISUAL_STYLES } from "@/data/visual-styles";
import { VisualStyle, VisualStyleSlug } from "@/types/style";
import { getAllPrompts } from "./prompts";
import { Prompt } from "@/types/prompt";

export { VISUAL_STYLES };

/**
 * Retrieves all registered visual aesthetic styles
 */
export function getAllVisualStyles(): VisualStyle[] {
  return VISUAL_STYLES;
}

/**
 * Retrieves a visual style by its unique slug
 */
export function getVisualStyleBySlug(slug: string): VisualStyle | undefined {
  return VISUAL_STYLES.find((s) => s.slug.toLowerCase() === slug.toLowerCase());
}

/**
 * Style keyword mapping for accurate prompt matching
 */
const STYLE_KEYWORDS_MAP: Record<string, string[]> = {
  cinematic: [
    "cinematic",
    "anamorphic",
    "film-noir",
    "kodachrome",
    "vintage",
    "night-photography",
    "tokyo",
    "neon",
    "rain",
    "detective",
  ],
  photography: [
    "portrait",
    "photography",
    "macro",
    "human-emotion",
    "rembrandt-lighting",
    "candid",
    "documentary",
    "editorial",
    "vintage",
  ],
  architecture: [
    "architecture",
    "interior-design",
    "brutalism",
    "minimalism",
    "scandinavian",
    "monumental",
    "concrete",
    "structural",
  ],
  fashion: [
    "fashion",
    "editorial",
    "studio-lighting",
    "high-fashion",
    "portrait",
    "couture",
    "model",
  ],
  product: [
    "product-photography",
    "macro",
    "luxury",
    "cosmetics",
    "commercial",
    "watch",
    "packaging",
    "skincare",
  ],
  "digital-art": [
    "isometric",
    "3d-render",
    "digital-art",
    "cyberpunk",
    "concept-art",
    "octane",
    "stylized",
  ],
};

/**
 * Retrieves all prompts matching a visual style aesthetic, prioritizing visual-native prompts
 */
export function getPromptsByVisualStyle(slug: VisualStyleSlug | string): Prompt[] {
  const allPrompts = getAllPrompts();
  const lowerSlug = slug.toLowerCase();
  const relevantKeywords = STYLE_KEYWORDS_MAP[lowerSlug] || [lowerSlug];

  return allPrompts
    .filter((p) => {
      const subcat = p.subcategory?.toLowerCase() || "";
      const tags = p.tags.map((t) => t.toLowerCase());
      const title = p.title.toLowerCase();
      const desc = p.description.toLowerCase();

      return relevantKeywords.some(
        (kw) =>
          tags.includes(kw) ||
          subcat.includes(kw) ||
          title.includes(kw) ||
          desc.includes(kw)
      );
    })
    .sort((a, b) => {
      // Prioritize visual metadata cards first
      const aVisual = Boolean(a.visualMetadata);
      const bVisual = Boolean(b.visualMetadata);
      if (aVisual && !bVisual) return -1;
      if (!aVisual && bVisual) return 1;
      return 0;
    });
}
