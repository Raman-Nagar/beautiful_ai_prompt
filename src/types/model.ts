export type AIModelId =
  | "chatgpt"
  | "claude"
  | "gemini"
  | "perplexity"
  | "copilot"
  | "midjourney"
  | "flux"
  | "stable-diffusion"
  | "dall-e"
  | "other";

export type ModelEngine = "visual" | "llm";

export interface ModelParameter {
  token: string;
  name: string;
  acceptedValues: string;
  defaultValue?: string;
  description: string;
  example: string;
}

export interface ModelDetail {
  id: AIModelId;
  name: string;
  shortName: string;
  provider: string;
  badge: string;
  engine: ModelEngine;
  tagline: string;
  description: string;
  longDescription: string;
  website: string;
  docsUrl?: string;
  isPopular: boolean;
  accentColor: string;
  architecture: string;
  contextOrResolution: string;
  pricingOrAccess: string;
  strengths: string[];
  parameters: ModelParameter[];
  bestPractices: string[];
  antiPatterns: string[];
  samplePrompt: {
    title: string;
    description: string;
    rawPrompt: string;
    explanation: string;
  };
}

export interface AIModel {
  id: AIModelId;
  name: string;
  shortName: string;
  provider: string;
  badge: string;
  description: string;
  website?: string;
  isPopular?: boolean;
  engine?: ModelEngine;
}

