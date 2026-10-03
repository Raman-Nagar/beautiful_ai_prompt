export type AIModelId =
  | "chatgpt"
  | "claude"
  | "gemini"
  | "perplexity"
  | "copilot"
  | "other";

export interface AIModel {
  id: AIModelId;
  name: string;
  shortName: string;
  provider: string;
  badge: string;
  description: string;
  website?: string;
  isPopular?: boolean;
}
