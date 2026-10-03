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

export interface ConstructMetadataOptions {
  title: string;
  description?: string;
  path?: string;
  keywords?: string[];
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
 * Reusable metadata generator ensuring canonical URLs, OpenGraph,
 * and Twitter/X metadata are consistently configured without duplication.
 */
export function constructMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  keywords = [],
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
      ...twitter,
    },
  };
}
