import { PromptVariable } from "@/types/prompt";

/**
 * Converts a raw variable key (e.g. "target_industry", "ROLE", "code-snippet")
 * into a clean human-readable title (e.g. "Target Industry", "Role", "Code Snippet").
 */
export function formatVariableLabel(key: string): string {
  return key
    .replace(/[_\-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Extracts all variable names enclosed in [var_name] or {{var_name}}
 */
export function extractVariableNames(template: string): string[] {
  if (!template) return [];
  const bracketMatches = template.match(/\[([a-zA-Z0-9_\-\s]+)\]/g) || [];
  const mustacheMatches = template.match(/\{\{([a-zA-Z0-9_\-\s]+)\}\}/g) || [];

  const rawNames = [
    ...bracketMatches.map((m) => m.slice(1, -1).trim()),
    ...mustacheMatches.map((m) => m.slice(2, -2).trim()),
  ];

  return Array.from(new Set(rawNames));
}

/**
 * Normalizes prompt variables by combining explicitly defined variables
 * with any bracketed variables discovered in the prompt text (e.g. [ROLE], [CONTEXT], [CONTENT]).
 */
export function normalizePromptVariables(prompt: {
  prompt?: string;
  template?: string;
  variables?: PromptVariable[];
}): PromptVariable[] {
  const existingVars = prompt.variables || [];
  const existingKeys = new Set(
    existingVars.map((v) => (v.name || v.key || "").toLowerCase().trim())
  );

  const rawTemplate = prompt.prompt || prompt.template || "";
  const extractedKeys = extractVariableNames(rawTemplate);

  const synthesizedVars: PromptVariable[] = [];

  extractedKeys.forEach((extractedKey) => {
    const normalizedKey = extractedKey.toLowerCase().trim();
    if (!existingKeys.has(normalizedKey)) {
      // Determine probable input type based on variable name
      const isLongForm =
        normalizedKey.includes("context") ||
        normalizedKey.includes("content") ||
        normalizedKey.includes("code") ||
        normalizedKey.includes("description") ||
        normalizedKey.includes("text") ||
        normalizedKey.includes("draft") ||
        normalizedKey.includes("bullets") ||
        normalizedKey.includes("skills");

      synthesizedVars.push({
        name: extractedKey,
        label: formatVariableLabel(extractedKey),
        description: `Custom input value for [${extractedKey}]`,
        placeholder: `Enter ${formatVariableLabel(extractedKey).toLowerCase()}...`,
        required: true,
        type: isLongForm ? "textarea" : "text",
        defaultValue: "",
      });
      existingKeys.add(normalizedKey);
    }
  });

  return [...existingVars, ...synthesizedVars];
}

/**
 * Interpolates a prompt template with user-provided variable values.
 * Falls back to [variable_name] placeholder if empty.
 */
export function interpolatePrompt(
  template: string,
  variables: PromptVariable[],
  values: Record<string, string>
): string {
  if (!template) return "";
  let result = template;

  // 1. First replace with provided variables
  variables.forEach((v) => {
    const key = v.name || v.key || "";
    if (!key) return;

    const userValue = values[key]?.trim();
    const fallback = v.defaultValue || `[${key}]`;
    const replacement = userValue && userValue.length > 0 ? userValue : fallback;

    // Replace [name] and {{name}}
    result = result.split(`[${key}]`).join(replacement);
    result = result.split(`{{${key}}}`).join(replacement);
  });

  // 2. Also replace any remaining uppercase or direct bracket matches in values
  Object.entries(values).forEach(([k, val]) => {
    const trimmedVal = val?.trim();
    if (trimmedVal) {
      result = result.split(`[${k}]`).join(trimmedVal);
      result = result.split(`{{${k}}}`).join(trimmedVal);
    }
  });

  return result;
}

/**
 * Validates whether all required prompt variables have non-empty values
 */
export function validatePromptInputs(
  variables: PromptVariable[],
  values: Record<string, string>
): { isValid: boolean; missingVariables: string[] } {
  const missing: string[] = [];

  variables.forEach((v) => {
    if (v.required) {
      const key = v.name || v.key || "";
      const val = values[key]?.trim();
      if (!val) {
        missing.push(v.label || key);
      }
    }
  });

  return {
    isValid: missing.length === 0,
    missingVariables: missing,
  };
}

/**
 * Tokenizes a template string into plain text chunks and variable tokens
 * for syntax highlighting in the prompt editor card.
 */
export interface PromptToken {
  type: "text" | "variable";
  content: string;
  variableName?: string;
}

export function tokenizePrompt(template: string): PromptToken[] {
  if (!template) return [];

  const regex = /(\[[a-zA-Z0-9_\-\s]+\]|\{\{[a-zA-Z0-9_\-\s]+\}\})/g;
  const tokens: PromptToken[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(template)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({
        type: "text",
        content: template.substring(lastIndex, match.index),
      });
    }

    const rawMatch = match[0];
    const isMustache = rawMatch.startsWith("{{");
    const variableName = isMustache
      ? rawMatch.slice(2, -2).trim()
      : rawMatch.slice(1, -1).trim();

    tokens.push({
      type: "variable",
      content: rawMatch,
      variableName,
    });

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < template.length) {
    tokens.push({
      type: "text",
      content: template.substring(lastIndex),
    });
  }

  return tokens;
}
