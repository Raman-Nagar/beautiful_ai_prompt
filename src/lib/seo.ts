import type { Metadata } from "next";
import {
  SITE_URL,
  CANONICAL_DOMAIN,
  absoluteUrl,
  normalizeCanonicalUrl,
  getPromptCanonicalUrl,
  getCategoryCanonicalUrl,
  getCollectionCanonicalUrl,
  getGuideCanonicalUrl,
  isCanonicalUrl,
} from "./canonical";
import {
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  generateWebSiteJsonLd,
  generateOrganizationJsonLd,
  generateBreadcrumbJsonLd,
  generatePromptJsonLd,
  generateGuideJsonLd,
  generateCategoryJsonLd,
  generateCollectionJsonLd,
} from "./structured-data";

export {
  SITE_URL,
  CANONICAL_DOMAIN,
  absoluteUrl,
  normalizeCanonicalUrl,
  getPromptCanonicalUrl,
  getCategoryCanonicalUrl,
  getCollectionCanonicalUrl,
  getGuideCanonicalUrl,
  isCanonicalUrl,
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  generateWebSiteJsonLd,
  generateOrganizationJsonLd,
  generateBreadcrumbJsonLd,
  generatePromptJsonLd,
  generateGuideJsonLd,
  generateCategoryJsonLd,
  generateCollectionJsonLd,
};

export const DEFAULT_TITLE = "Beautiful AI Prompt — Practical AI Prompts for Real-World Work";
export const TWITTER_HANDLE = "@beautifulaiprompt";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export interface OgImageDescriptor {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
  type?: string;
}

export interface ConstructMetadataOptions {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
  image?: string | OgImageDescriptor;
  openGraph?: Partial<NonNullable<Metadata["openGraph"]>>;
  twitter?: Partial<NonNullable<Metadata["twitter"]>>;
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  type?: "website" | "article";
  authors?: string[];
  exactTitle?: boolean;
}

/**
 * Builds an absolute dynamic Open Graph card URL for custom titles, categories, and tags.
 */
export function getDynamicOgImageUrl({
  title,
  type = "AI Prompt",
  category = "",
  meta = "",
}: {
  title: string;
  type?: string;
  category?: string;
  meta?: string;
}): string {
  const params = new URLSearchParams();
  params.set("title", title);
  if (type) params.set("type", type);
  if (category) params.set("category", category);
  if (meta) params.set("meta", meta);
  return `${SITE_URL}/api/og?${params.toString()}`;
}

/**
 * Reusable metadata generator ensuring canonical URLs, OpenGraph,
 * and Twitter/X metadata are consistently configured without duplication.
 */
export function constructMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  keywords = [],
  image,
  openGraph,
  twitter,
  noIndex = false,
  publishedTime,
  modifiedTime,
  type = "website",
  authors,
  exactTitle = false,
}: ConstructMetadataOptions): Metadata {
  const canonicalUrl = absoluteUrl(path);

  // Avoid duplicate brand suffixes if title already includes it
  const cleanTitle = title
    .replace(/\s*\|\s*Beautiful AI Prompt$/i, "")
    .replace(/\s*—\s*Beautiful AI Prompt$/i, "")
    .trim();

  const isHomePage = path === "/" || path === "";
  const shouldUseAbsoluteTitle =
    exactTitle || isHomePage || cleanTitle === DEFAULT_TITLE || cleanTitle === SITE_NAME;

  const baseKeywords = [
    "AI prompts",
    "ChatGPT prompts",
    "Claude prompts",
    "Gemini prompts",
    "prompt engineering",
    "developer prompts",
    "productivity",
  ];

  const mergedKeywords = Array.from(new Set([...keywords, ...baseKeywords]));

  // Title formatting for Social Sharing
  const socialTitle = isHomePage ? DEFAULT_TITLE : `${cleanTitle} | ${SITE_NAME}`;

  // Resolve OpenGraph image
  let resolvedImageUrl: string;
  let resolvedImageAlt: string = `${cleanTitle} | ${SITE_NAME}`;
  let resolvedImageWidth = 1200;
  let resolvedImageHeight = 630;

  if (typeof image === "string") {
    resolvedImageUrl = image.startsWith("http://") || image.startsWith("https://")
      ? image
      : absoluteUrl(image);
  } else if (image && typeof image === "object") {
    resolvedImageUrl = image.url.startsWith("http://") || image.url.startsWith("https://")
      ? image.url
      : absoluteUrl(image.url);
    if (image.alt) resolvedImageAlt = image.alt;
    if (image.width) resolvedImageWidth = image.width;
    if (image.height) resolvedImageHeight = image.height;
  } else {
    // Section-specific static fallback images
    if (path.startsWith("/prompts")) {
      resolvedImageUrl = `${SITE_URL}/og/prompts.png`;
      resolvedImageAlt = "Beautiful AI Prompt — Production AI Prompts Library";
    } else if (path.startsWith("/categories")) {
      resolvedImageUrl = `${SITE_URL}/og/categories.png`;
      resolvedImageAlt = "Beautiful AI Prompt — 26 Specialized Prompt Categories";
    } else if (path.startsWith("/collections")) {
      resolvedImageUrl = `${SITE_URL}/og/collections.png`;
      resolvedImageAlt = "Beautiful AI Prompt — Curated Prompt Collections & Playbooks";
    } else if (path.startsWith("/guides")) {
      resolvedImageUrl = `${SITE_URL}/og/guides.png`;
      resolvedImageAlt = "Beautiful AI Prompt — In-Depth Prompt Engineering Guides";
    } else {
      resolvedImageUrl = DEFAULT_OG_IMAGE;
    }
  }

  const ogImages = [
    {
      url: resolvedImageUrl,
      width: resolvedImageWidth,
      height: resolvedImageHeight,
      alt: resolvedImageAlt,
      type: "image/png",
    },
  ];

  return {
    title: shouldUseAbsoluteTitle
      ? { absolute: cleanTitle }
      : cleanTitle,
    description,
    keywords: mergedKeywords,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: socialTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale: "en_US",
      type,
      images: ogImages,
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
      ...(authors ? { authors } : {}),
      ...openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      creator: TWITTER_HANDLE,
      site: TWITTER_HANDLE,
      images: [resolvedImageUrl],
      ...twitter,
    },
  };
}
