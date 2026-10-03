import { Prompt } from "@/types/prompt";

export type MatchField = "title" | "category" | "tag" | "description" | "useCase";

export interface SearchMatch {
  field: MatchField;
  score: number;
  snippet?: string;
  matchedText?: string;
}

export interface SearchResultItem {
  prompt: Prompt;
  score: number;
  matches: SearchMatch[];
  matchedField: MatchField;
}

export interface SearchQuery {
  term: string;
  category?: string;
  limit?: number;
  offset?: number;
}

export interface SearchResponse {
  results: SearchResultItem[];
  total: number;
  query: string;
  tookMs: number;
}

export interface SearchSuggestion {
  text: string;
  type: "curated" | "category" | "tag" | "recent" | "prompt";
  count?: number;
  categorySlug?: string;
}

/**
 * Pluggable SearchEngine interface.
 * Defines the contract for search implementations, allowing in-memory search
 * to be swapped with external services (Algolia, MeiliSearch, Elasticsearch) in the future.
 */
export interface SearchEngine<TResponse = SearchResponse | Promise<SearchResponse>> {
  search(query: SearchQuery, prompts: Prompt[]): TResponse;
  getSuggestions(query: string, prompts: Prompt[], limit?: number): string[] | SearchSuggestion[];
}

export type SyncSearchEngine = SearchEngine<SearchResponse>;
export type AsyncSearchEngine = SearchEngine<Promise<SearchResponse>>;

