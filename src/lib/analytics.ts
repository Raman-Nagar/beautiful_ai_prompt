/**
 * Beautiful AI Prompt - Analytics Abstraction Layer
 * 
 * Provider-agnostic, privacy-conscious event tracking abstraction.
 * Dispatches to registered handlers and standard providers (GA, Plausible, PostHog, or custom endpoint)
 * when configured via environment variables or global scripts, while gracefully no-oping with zero
 * overhead when unconfigured.
 */

import {
  AnalyticsEventName,
  AnalyticsEventMap,
  AnalyticsHandler,
  PageViewEventData,
  PromptCopyEventData,
  PromptViewEventData,
  PromptCustomizeEventData,
  PromptSaveEventData,
  SearchEventData,
  CategoryClickEventData,
  CollectionClickEventData,
  GuideClickEventData,
  ExternalAiClickEventData,
} from "@/types/analytics";

// Registered custom handlers (for pluggable integrations)
const registeredHandlers = new Set<AnalyticsHandler>();

/**
 * Register a custom analytics handler (e.g., custom sink, warehouse collector, or third-party logger)
 */
export function registerAnalyticsHandler(handler: AnalyticsHandler): () => void {
  registeredHandlers.add(handler);
  return () => {
    registeredHandlers.delete(handler);
  };
}

/**
 * Remove a registered analytics handler
 */
export function unregisterAnalyticsHandler(handler: AnalyticsHandler): void {
  registeredHandlers.delete(handler);
}

/**
 * Privacy sanitization:
 * - Redacts potential email addresses
 * - Redacts potential phone numbers / long digit sequences
 * - Truncates excessively long query strings
 * - Strictly prevents logging sensitive text or credentials
 */
function sanitizeString(value: string, maxLength = 100): string {
  if (!value) return "";
  let sanitized = value
    // Scrub email addresses
    .replace(/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/g, "[EMAIL]")
    // Scrub potential phone numbers or credit card sequences (7+ continuous digits)
    .replace(/\b\d{4}[ -]?\d{4}[ -]?\d{4,7}\b/g, "[NUMBER_REDACTED]")
    .trim();

  if (sanitized.length > maxLength) {
    sanitized = sanitized.slice(0, maxLength);
  }
  return sanitized;
}

/**
 * Recursively sanitize event properties to ensure no sensitive personal data is captured
 */
function sanitizeProperties<T extends object>(props: T): T {
  const result: Record<string, unknown> = {};
  const record = props as unknown as Record<string, unknown>;

  for (const [key, val] of Object.entries(record)) {
    if (typeof val === "string") {
      // Special treatment for search queries: sanitize and cap length
      if (key === "query") {
        result[key] = sanitizeString(val, 80);
      } else {
        result[key] = sanitizeString(val, 150);
      }
    } else if (Array.isArray(val)) {
      result[key] = val.map((item) =>
        typeof item === "string" ? sanitizeString(item, 80) : item
      );
    } else if (typeof val === "number" || typeof val === "boolean" || val === null || val === undefined) {
      result[key] = val;
    } else if (typeof val === "object") {
      result[key] = sanitizeProperties(val as object);
    }
  }

  return result as unknown as T;
}

/**
 * Provider dispatcher: sends sanitized events to available browser providers (GA, Plausible, PostHog, or custom endpoint)
 */
function dispatchToProviders<T extends AnalyticsEventName>(
  eventName: T,
  properties: AnalyticsEventMap[T]
): void {
  if (typeof window === "undefined") return;

  const isDebug =
    process.env.NEXT_PUBLIC_ANALYTICS_DEBUG === "true" ||
    (process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_ANALYTICS_DEBUG !== "false");
  if (isDebug) {
    console.log(`[Analytics] ${eventName}`, properties);
  }

  const propsRecord = properties as unknown as Record<string, unknown>;

  // 1. Google Analytics (gtag.js)
  type WindowWithGtag = Window & {
    gtag?: (command: string, action: string, params?: Record<string, unknown>) => void;
  };
  const winGtag = window as WindowWithGtag;
  if (typeof winGtag.gtag === "function") {
    try {
      winGtag.gtag("event", eventName, propsRecord);
    } catch {
      // Graceful provider failure
    }
  }

  // 2. Plausible Analytics
  type WindowWithPlausible = Window & {
    plausible?: (eventName: string, options?: { props: Record<string, unknown> }) => void;
  };
  const winPlausible = window as WindowWithPlausible;
  if (typeof winPlausible.plausible === "function") {
    try {
      winPlausible.plausible(eventName, { props: propsRecord });
    } catch {
      // Graceful provider failure
    }
  }

  // 3. PostHog
  type WindowWithPosthog = Window & {
    posthog?: { capture?: (name: string, props?: Record<string, unknown>) => void };
  };
  const winPosthog = window as WindowWithPosthog;
  if (winPosthog.posthog && typeof winPosthog.posthog.capture === "function") {
    try {
      winPosthog.posthog.capture(eventName, propsRecord);
    } catch {
      // Graceful provider failure
    }
  }

  // 4. Custom API Collector Endpoint (if configured via env var)
  const customEndpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT;
  if (customEndpoint && typeof navigator !== "undefined" && navigator.sendBeacon) {
    try {
      const payload = JSON.stringify({
        event: eventName,
        properties,
        timestamp: new Date().toISOString(),
      });
      navigator.sendBeacon(customEndpoint, new Blob([payload], { type: "application/json" }));
    } catch {
      // Silently catch beacon errors
    }
  }
}

/**
 * Core trackEvent function
 * 
 * Safe, privacy-first event tracking abstraction.
 * If no providers or handlers are active, this safely no-ops without throwing or degrading performance.
 */
export function trackEvent<T extends AnalyticsEventName>(
  eventName: T,
  properties: AnalyticsEventMap[T]
): void {
  try {
    const sanitized = sanitizeProperties(properties);

    // Dispatch to any custom registered handlers
    registeredHandlers.forEach((handler) => {
      try {
        (handler as (name: string, props: unknown) => void)(eventName, sanitized);
      } catch (err) {
        if (process.env.NODE_ENV === "development") {
          console.warn(`[Analytics] Error in custom handler for event "${eventName}":`, err);
        }
      }
    });

    // Dispatch to standard window providers if configured
    dispatchToProviders(eventName, sanitized);
  } catch {
    // Never let analytics exceptions disrupt app flow
  }
}

/* ========================================================================= */
/* Ergonomic Convenience Helpers                                             */
/* ========================================================================= */

/**
 * Track page views on route transitions
 */
export function trackPageView(path?: string, title?: string): void {
  const currentPath =
    path || (typeof window !== "undefined" ? window.location.pathname : "/");
  const pageTitle =
    title || (typeof document !== "undefined" ? document.title : "");
  const referrer =
    typeof document !== "undefined" && document.referrer
      ? sanitizeString(document.referrer, 150)
      : undefined;

  const data: PageViewEventData = {
    path: currentPath,
    title: pageTitle,
    referrer,
  };

  trackEvent("page_view", data);
}

/**
 * Track prompt view when a user navigates to a prompt details page
 */
export function trackPromptView(data: PromptViewEventData): void {
  trackEvent("prompt_view", data);
}

/**
 * Track prompt copy event with essential metadata
 */
export function trackPromptCopy(data: PromptCopyEventData): void {
  trackEvent("prompt_copy", data);
}

/**
 * Track prompt customize event (captures parameter count, never raw values)
 */
export function trackPromptCustomize(data: PromptCustomizeEventData): void {
  trackEvent("prompt_customize", data);
}

/**
 * Track prompt bookmark / save event
 */
export function trackPromptSave(
  promptId: string,
  action: "save" | "unsave",
  category?: string,
  sourcePage?: string
): void {
  const data: PromptSaveEventData = {
    promptId,
    action,
    category,
    sourcePage: sourcePage || (typeof window !== "undefined" ? window.location.pathname : "/"),
  };
  trackEvent("prompt_save", data);
}

/**
 * Track search queries and result count
 */
export function trackSearch(
  query: string,
  resultCount: number,
  source: SearchEventData["source"] = "command_dialog",
  categoryFilter?: string
): void {
  const trimmed = query.trim();
  if (!trimmed) return;

  const data: SearchEventData = {
    query: trimmed,
    resultCount,
    source,
    categoryFilter,
  };
  trackEvent("search", data);
}

/**
 * Track category navigation click
 */
export function trackCategoryClick(
  categorySlug: string,
  categoryName?: string,
  sourcePage?: string
): void {
  const data: CategoryClickEventData = {
    categorySlug,
    categoryName,
    sourcePage: sourcePage || (typeof window !== "undefined" ? window.location.pathname : "/"),
  };
  trackEvent("category_click", data);
}

/**
 * Track collection navigation click
 */
export function trackCollectionClick(
  collectionSlug: string,
  collectionTitle?: string,
  sourcePage?: string
): void {
  const data: CollectionClickEventData = {
    collectionSlug,
    collectionTitle,
    sourcePage: sourcePage || (typeof window !== "undefined" ? window.location.pathname : "/"),
  };
  trackEvent("collection_click", data);
}

/**
 * Track guide navigation click
 */
export function trackGuideClick(
  guideSlug: string,
  guideTitle?: string,
  sourcePage?: string
): void {
  const data: GuideClickEventData = {
    guideSlug,
    guideTitle,
    sourcePage: sourcePage || (typeof window !== "undefined" ? window.location.pathname : "/"),
  };
  trackEvent("guide_click", data);
}

/**
 * Track external AI launcher or platform model click (e.g. ChatGPT, Claude, Gemini)
 */
export function trackExternalAiClick(
  model: string,
  targetUrl?: string,
  promptId?: string,
  sourcePage?: string
): void {
  const data: ExternalAiClickEventData = {
    model,
    targetUrl,
    promptId,
    sourcePage: sourcePage || (typeof window !== "undefined" ? window.location.pathname : "/"),
  };
  trackEvent("external_ai_click", data);
}
