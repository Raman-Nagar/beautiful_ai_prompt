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
