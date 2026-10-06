export type VisualStyleSlug =
  | "cinematic"
  | "photography"
  | "architecture"
  | "fashion"
  | "product"
  | "digital-art";

export interface OpticalRecommendation {
  focalLength: string;
  lens: string;
  aperture: string;
  sensorOrFilm: string;
}

export interface LightingRecommendation {
  setup: string;
  direction: string;
  colorTemperature: string;
  mood: string;
}

export interface VisualStyle {
  slug: VisualStyleSlug;
  name: string;
  shortName: string;
  badge: string;
  tagline: string;
  description: string;
  longDescription: string;
  heroImage: string;
  accentColor: string;
  optics: OpticalRecommendation;
  lighting: LightingRecommendation;
  keyTokens: string[];
  recommendedAspectRatios: string[];
  bestPractices: string[];
  commonMistakes: string[];
  samplePromptSnippet: {
    title: string;
    prompt: string;
    breakdown: string;
  };
}
