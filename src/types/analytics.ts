/**
 * Beautiful AI Prompt - Analytics Types
 * Strongly typed events and schemas for privacy-conscious product analytics.
 */

export type AnalyticsEventName =
  | "page_view"
  | "prompt_view"
  | "prompt_copy"
  | "prompt_customize"
  | "prompt_save"
  | "search"
  | "category_click"
  | "collection_click"
  | "guide_click"
  | "external_ai_click";

export interface PageViewEventData {
  path: string;
  title?: string;
  referrer?: string;
}

export interface PromptViewEventData {
  promptId: string;
  slug: string;
  category: string;
  title?: string;
  difficulty?: string;
}

export interface PromptCopyEventData {
  promptId: string;
  category: string;
  sourcePage: string;
  isCustomized?: boolean;
  modelCompatibility?: string[];
  variableCount?: number;
}

export interface PromptCustomizeEventData {
  promptId: string;
  variableCount: number;
  customizedFields?: string[];
  sourcePage?: string;
}

export interface PromptSaveEventData {
  promptId: string;
  action: "save" | "unsave";
  category?: string;
  sourcePage?: string;
}

export interface SearchEventData {
  query: string;
  resultCount: number;
  source?: "hero" | "command_dialog" | "prompts_explorer" | "category_page" | string;
  categoryFilter?: string;
}

export interface CategoryClickEventData {
  categorySlug: string;
  categoryName?: string;
  sourcePage: string;
}

export interface CollectionClickEventData {
  collectionSlug: string;
  collectionTitle?: string;
  sourcePage: string;
}

export interface GuideClickEventData {
  guideSlug: string;
  guideTitle?: string;
  sourcePage: string;
}

export interface ExternalAiClickEventData {
  model: string;
  promptId?: string;
  targetUrl?: string;
  sourcePage?: string;
}

export interface AnalyticsEventMap {
  page_view: PageViewEventData;
  prompt_view: PromptViewEventData;
  prompt_copy: PromptCopyEventData;
  prompt_customize: PromptCustomizeEventData;
  prompt_save: PromptSaveEventData;
  search: SearchEventData;
  category_click: CategoryClickEventData;
  collection_click: CollectionClickEventData;
  guide_click: GuideClickEventData;
  external_ai_click: ExternalAiClickEventData;
}

export type AnalyticsHandler = <T extends AnalyticsEventName>(
  eventName: T,
  properties: AnalyticsEventMap[T]
) => void;
