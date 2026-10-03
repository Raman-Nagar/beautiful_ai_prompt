import { PromptDifficulty, AIModelId, VariableType } from "@/types";

export const CONTENT_STANDARDS = {
  TITLE_MIN_LENGTH: 10,
  TITLE_MAX_LENGTH: 120,
  SHORT_DESC_MIN_LENGTH: 20,
  SHORT_DESC_MAX_LENGTH: 200,
  DESC_MIN_LENGTH: 40,
  DESC_MAX_LENGTH: 500,
  PROMPT_MIN_LENGTH: 80,
  TAGS_MIN_COUNT: 2,
  TAGS_MAX_COUNT: 10,
  USE_CASES_MIN_COUNT: 1,
  COMPATIBLE_MODELS_MIN_COUNT: 1,
  TITLE_SIMILARITY_THRESHOLD: 0.75,
  PROMPT_SIMILARITY_THRESHOLD: 0.85,
} as const;

export const VALID_DIFFICULTIES: PromptDifficulty[] = [
  "beginner",
  "intermediate",
  "advanced",
];

export const VALID_MODEL_IDS: AIModelId[] = [
  "claude",
  "chatgpt",
  "gemini",
  "perplexity",
  "copilot",
  "other",
];

export const VALID_VARIABLE_TYPES: VariableType[] = [
  "text",
  "textarea",
  "select",
];

/**
 * Patterns that indicate fake social proof, clickbait, unsubstantiated guarantees,
 * or placeholder content that violates quality standards.
 */
export const RESTRICTED_PATTERNS: { pattern: RegExp; reason: string }[] = [
  {
    pattern: /\b(?:lorem\s+ipsum|dolor\s+sit|dummy\s+text)\b/i,
    reason: "Contains placeholder lorem ipsum text",
  },
  {
    pattern: /\b(?:guaranteed|100%)\s+(?:results|approval|success|interviews?|hire)\b/i,
    reason: "Unsubstantiated guarantee or exaggerated outcome",
  },
  {
    pattern: /\b(?:increases?|boosts?|amplifies?)\s+(?:productivity|sales|revenue|efficiency)\s+by\s+\d{2,3}%\b/i,
    reason: "Fabricated percentage improvement claim",
  },
  {
    pattern: /\b(?:5-star\s+rated|rated\s+4\.\d\/5|\b\d+\s+reviews?\b)/i,
    reason: "Synthetic rating or fake review metric",
  },
  {
    pattern: /\b(?:copied\s+\d+k?\s+times|used\s+by\s+\d+k?\s+users)\b/i,
    reason: "Fabricated usage or copy statistics",
  },
  {
    pattern: /\b(?:revolutionary|magic\s+prompt|secret\s+formula|hack\s+the\s+system)\b/i,
    reason: "Hyperbolic marketing fluff",
  },
];

/**
 * Standard recommended prompt sections
 */
export const PROMPT_STRUCTURE_TAGS = [
  "ROLE",
  "CONTEXT",
  "TASK",
  "CONSTRAINTS",
  "INPUT",
  "OUTPUT FORMAT",
  "QUALITY CRITERIA",
] as const;
