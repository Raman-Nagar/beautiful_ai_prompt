import { Prompt } from "@/types/prompt";
import { interpolatePrompt, normalizePromptVariables } from "./prompt-engine";

/**
 * Resolves the final prompt text, applying variable substitutions if provided.
 */
function getResolvedPromptText(
  prompt: Prompt,
  customValues?: Record<string, string>
): string {
  const raw = prompt.prompt || prompt.template || "";
  if (!customValues || Object.keys(customValues).length === 0) {
    return raw;
  }
  const variables = normalizePromptVariables(prompt);
  return interpolatePrompt(raw, variables, customValues);
}

/**
 * Formats a prompt as a `.cursorrules` configuration file for Cursor IDE.
 */
export function exportToCursorRules(
  prompt: Prompt,
  customValues?: Record<string, string>
): string {
  const content = getResolvedPromptText(prompt, customValues);
  const category = prompt.categoryName || prompt.category;

  return `# ==============================================================================
# Cursor Rules: ${prompt.title}
# Category: ${category}
# Generated via Beautiful AI Prompt (https://www.beautifulaiprompt.com)
# ==============================================================================

You are an expert AI agent configured with the following specialized directives.
Adhere strictly to all role constraints and execution parameters below.

## ROLE & DIRECTIVE
${content}

## EXECUTION CONSTRAINTS
- Never output conversational pleasantries, greeting remarks, or concluding fluff.
- Deliver production-ready, technically rigorous, and directly actionable outputs.
- Preserve consistent formatting and syntax as defined in the directive above.
- If additional context is missing, proceed with the best deterministic standard.
`;
}

/**
 * Formats a prompt as `CLAUDE.md` project instructions for Claude Code and Anthropic Projects.
 */
export function exportToClaudeProject(
  prompt: Prompt,
  customValues?: Record<string, string>
): string {
  const content = getResolvedPromptText(prompt, customValues);
  const category = prompt.categoryName || prompt.category;

  return `# CLAUDE.md - ${prompt.title}

## Purpose & Scope
This project operates under the "${prompt.title}" directive within the ${category} domain.

## Primary Instructions
${content}

## Behavioral Standards
1. **Precision**: Follow technical specifications without hallucinating non-existent APIs or terms.
2. **Conciseness**: Prioritize code blocks and structured lists over narrative commentary.
3. **Safety & Robustness**: Validate all edge cases and adhere to modern best practices.
`;
}

/**
 * Formats a prompt as a standard OpenAI Chat Completions API JSON payload.
 */
export function exportToOpenAiPayload(
  prompt: Prompt,
  customValues?: Record<string, string>
): string {
  const content = getResolvedPromptText(prompt, customValues);
  const category = prompt.categoryName || prompt.category;

  const payload = {
    model: "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are an elite AI specialist in ${category}. Fulfill user directives with absolute accuracy, zero conversational filler, and professional-grade outputs.`,
      },
      {
        role: "user",
        content,
      },
    ],
    temperature: 0.7,
    max_tokens: 4096,
  };

  return JSON.stringify(payload, null, 2);
}

/**
 * Formats a prompt as an Anthropic Messages API JSON payload.
 */
export function exportToAnthropicPayload(
  prompt: Prompt,
  customValues?: Record<string, string>
): string {
  const content = getResolvedPromptText(prompt, customValues);
  const category = prompt.categoryName || prompt.category;

  const payload = {
    model: "claude-3-7-sonnet-20250219",
    max_tokens: 4096,
    system: `You are an elite AI specialist in ${category}. Fulfill directives with high precision, clear structure, and uncompromising quality.`,
    messages: [
      {
        role: "user",
        content,
      },
    ],
  };

  return JSON.stringify(payload, null, 2);
}

/**
 * Browser-safe file download trigger for exported developer artifacts.
 */
export function downloadExportFile(
  content: string,
  filename: string,
  mimeType: string = "text/plain"
): void {
  if (typeof window === "undefined") return;
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
