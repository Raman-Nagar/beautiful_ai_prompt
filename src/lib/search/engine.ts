import { Prompt } from "@/types/prompt";
import {
  SyncSearchEngine,
  SearchQuery,
  SearchResponse,
  SearchResultItem,
  SearchSuggestion,
} from "./types";
import { scorePrompt } from "./scoring";
import { getSearchSuggestions } from "./suggestions";

/**
 * High-performance, in-memory search engine.
 * Provides instant weighted scoring across title, category, tags, description, and use cases.
 * Implements the SearchEngine interface so it can be swapped with Algolia or Elasticsearch later.
 */
export class LocalSearchEngine implements SyncSearchEngine {
  search(query: SearchQuery, prompts: Prompt[]): SearchResponse {
    const startTime = performance.now();
    const rawTerm = query.term?.trim() || "";

    // If query is empty, return empty results (or all if specified)
    if (!rawTerm) {
      return {
        results: [],
        total: 0,
        query: rawTerm,
        tookMs: 0,
      };
    }

    const scoredItems: SearchResultItem[] = [];

    for (let i = 0; i < prompts.length; i++) {
      const prompt = prompts[i];

      // If category filter is passed, verify prompt matches
      if (
        query.category &&
        query.category !== "all" &&
        prompt.category.toLowerCase() !== query.category.toLowerCase()
      ) {
        continue;
      }

      const match = scorePrompt(prompt, rawTerm);
      if (match) {
        scoredItems.push(match);
      }
    }

    // Sort by score descending (highest relevance first)
    scoredItems.sort((a, b) => b.score - a.score);

    const total = scoredItems.length;
    const offset = query.offset || 0;
    const limit = query.limit || 20;
    const pagedResults = scoredItems.slice(offset, offset + limit);

    const endTime = performance.now();
    const tookMs = Math.round((endTime - startTime) * 100) / 100;

    return {
      results: pagedResults,
      total,
      query: rawTerm,
      tookMs,
    };
  }

  getSuggestions(query: string, prompts: Prompt[], limit: number = 8): SearchSuggestion[] {
    return getSearchSuggestions(query, prompts, limit);
  }
}

/**
 * Singleton instance of the default local search engine.
 */
export const defaultSearchEngine: LocalSearchEngine = new LocalSearchEngine();
