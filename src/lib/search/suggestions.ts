import { Prompt } from "@/types/prompt";
import { SearchSuggestion } from "./types";

export const CURATED_SEARCH_SUGGESTIONS: string[] = [
  "midjourney",
  "flux",
  "cinematic",
  "portrait",
  "architecture",
  "resume",
  "react",
  "system design",
  "marketing",
  "email",
  "code review",
  "product photography",
];

/**
 * Returns suggestions based on the user's current query or popular default suggestions.
 */
export function getSearchSuggestions(
  query: string,
  prompts: Prompt[],
  limit: number = 8
): SearchSuggestion[] {
  const normalizedQuery = query.toLowerCase().trim();

  // 1. If query is empty, return top curated suggestions and top categories
  if (!normalizedQuery) {
    const suggestions: SearchSuggestion[] = CURATED_SEARCH_SUGGESTIONS.slice(0, limit).map(
      (text) => ({
        text,
        type: "curated",
      })
    );
    return suggestions;
  }

  const results: SearchSuggestion[] = [];
  const seenTexts = new Set<string>();

  const addSuggestion = (text: string, type: SearchSuggestion["type"], categorySlug?: string) => {
    const lower = text.toLowerCase();
    if (!seenTexts.has(lower) && results.length < limit) {
      seenTexts.add(lower);
      results.push({ text, type, categorySlug });
    }
  };

  // 2. Curated suggestions matching query prefix
  CURATED_SEARCH_SUGGESTIONS.forEach((item) => {
    if (item.toLowerCase().includes(normalizedQuery)) {
      addSuggestion(item, "curated");
    }
  });

  // 3. Category matches
  prompts.forEach((p) => {
    const cat = p.categoryName || p.category;
    if (cat.toLowerCase().includes(normalizedQuery)) {
      addSuggestion(cat, "category", p.category);
    }
  });

  // 4. Tag matches
  prompts.forEach((p) => {
    p.tags.forEach((tag) => {
      if (tag.toLowerCase().includes(normalizedQuery)) {
        addSuggestion(tag, "tag");
      }
    });
  });

  // 5. Prompt Title matches
  prompts.forEach((p) => {
    if (p.title.toLowerCase().includes(normalizedQuery)) {
      addSuggestion(p.title, "prompt");
    }
  });

  return results.slice(0, limit);
}
