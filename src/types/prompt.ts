import { AIModelId } from "./model";

export type { AIModelId } from "./model";

export type PromptDifficulty = "beginner" | "intermediate" | "advanced";

export type VariableType = "text" | "textarea" | "select";

export interface PromptVariable {
  name: string;
  label: string;
  description?: string;
  placeholder?: string;
  required: boolean;
  type: VariableType;
  defaultValue?: string;
  options?: string[];
  /** Alias for `name` for component flexibility */
  key?: string;
}

export type AspectRatio = "1:1" | "16:9" | "9:16" | "4:5" | "3:2" | "2:3" | "21:9";

export interface CameraSettings {
  focalLength?: string;
  lens?: string;
  aperture?: string;
  shutterSpeed?: string;
  filmStock?: string;
}

export interface LightingSettings {
  type?: string;
  direction?: string;
  colorTemperature?: string;
}

export interface VisualMetadata {
  previewImageUrl: string;
  previewImageAlt: string;
  model: "midjourney" | "flux" | "stable-diffusion" | "dall-e";
  modelVersion?: string;
  aspectRatio: AspectRatio;
  camera?: CameraSettings;
  lighting?: LightingSettings;
  styleCategory: "cinematic" | "photography" | "architecture" | "digital-art" | "fashion" | "product";
  negativePrompt?: string;
  rawParameters?: string;
  seed?: string | number;
  compositionGuides?: ("rule-of-thirds" | "golden-ratio" | "center-crosshair")[];
}

export interface Prompt {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: string;
  subcategory?: string;
  tags: string[];
  prompt: string;
  variables: PromptVariable[];
  exampleInput: Record<string, string>;
  exampleOutput: string;
  useCases: string[];
  difficulty: PromptDifficulty;
  compatibleModels: AIModelId[];
  featured: boolean;
  trending: boolean;
  relatedPromptIds: string[];
  tips?: string[];
  commonMistakes?: string[];
  createdAt: string;
  updatedAt: string;

  /** Optional presentation helpers */
  categoryName?: string;
  /** Alias for prompt body for backwards compatibility with earlier components */
  template?: string;
  /** Visual metadata for generative image prompts (Midjourney, FLUX, etc.) */
  visualMetadata?: VisualMetadata;
}

export type PromptSortOption = "popular" | "trending" | "newest" | "title" | "most-copied";

export interface PromptFilterOptions {
  category?: string;
  difficulty?: PromptDifficulty | "all";
  model?: AIModelId | "all";
  tag?: string;
  useCase?: string;
  search?: string;
  featured?: boolean;
  trending?: boolean;
  sort?: PromptSortOption;
}
