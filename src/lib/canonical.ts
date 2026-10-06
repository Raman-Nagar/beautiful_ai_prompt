/**
 * Canonical URL and Path Normalization Engine
 *
 * Provides a single source of truth for canonical URL generation across
 * Beautiful AI Prompt. Guarantees:
 * - Deterministic domain resolution (falling back to production domain)
 * - Trailing slash removal for all non-root paths
 * - Query parameter and fragment stripping (no ?page=, ?search=, ?filter= in canonicals)
 * - Safe lowercase path normalization
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://www.beautifulaiprompt.com";

export const CANONICAL_DOMAIN = "www.beautifulaiprompt.com";

/**
 * Normalizes a route path or URL into a strict canonical absolute URL.
 * Strips query strings, hashes, and trailing slashes.
 */
export function absoluteUrl(path: string = "/"): string {
  // If an absolute URL is passed, extract the pathname
  if (path.startsWith("http://") || path.startsWith("https://")) {
    try {
      const parsed = new URL(path);
      return normalizeCanonicalUrl(parsed.pathname);
    } catch {
      return SITE_URL;
    }
  }

  return normalizeCanonicalUrl(path);
}

/**
 * Normalizes a pathname to a clean absolute canonical URL.
 */
export function normalizeCanonicalUrl(pathname: string): string {
  if (!pathname || pathname === "/") {
    return SITE_URL;
  }

  // Strip query strings and hash anchors if present in raw path string
  const cleanPath = pathname.split("?")[0].split("#")[0].trim();

  // Ensure leading slash
  const leadingPath = cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`;

  // Remove trailing slashes (e.g. /prompts/ -> /prompts)
  const normalizedPath = leadingPath.replace(/\/+$/, "");

  if (normalizedPath === "" || normalizedPath === "/") {
    return SITE_URL;
  }

  return `${SITE_URL}${normalizedPath.toLowerCase()}`;
}

/**
 * Canonical URL helper for individual prompts
 */
export function getPromptCanonicalUrl(slug: string): string {
  return absoluteUrl(`/prompts/${encodeURIComponent(slug.trim())}`);
}

/**
 * Canonical URL helper for categories
 */
export function getCategoryCanonicalUrl(slug: string): string {
  return absoluteUrl(`/categories/${encodeURIComponent(slug.trim())}`);
}

/**
 * Canonical URL helper for collections
 */
export function getCollectionCanonicalUrl(slug: string): string {
  return absoluteUrl(`/collections/${encodeURIComponent(slug.trim())}`);
}

/**
 * Canonical URL helper for guides
 */
export function getGuideCanonicalUrl(slug: string): string {
  return absoluteUrl(`/guides/${encodeURIComponent(slug.trim())}`);
}

/**
 * Canonical URL helper for AI models
 */
export function getModelCanonicalUrl(id: string): string {
  return absoluteUrl(`/models/${encodeURIComponent(id.trim())}`);
}

/**
 * Validates whether a given URL is a valid canonical content URL
 */
export function isCanonicalUrl(url: string): boolean {
  if (!url) return false;
  if (!url.startsWith(SITE_URL)) return false;
  if (url.includes("?") || url.includes("#")) return false;
  if (url !== SITE_URL && url.endsWith("/")) return false;
  return true;
}
