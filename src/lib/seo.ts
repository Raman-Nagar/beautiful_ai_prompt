import type { Metadata } from "next";
import { Prompt } from "@/types/prompt";
import { Category } from "@/types/category";
import { Collection } from "@/types/collection";
import { Guide } from "@/types/guide";

export const SITE_URL = "https://beautifulaiprompt.com";
export const SITE_NAME = "Beautiful AI Prompt";
export const DEFAULT_TITLE = "Beautiful AI Prompt — Practical AI Prompts for Real-World Work";
export const DEFAULT_DESCRIPTION =
  "The premium AI prompt discovery and productivity platform. Discover, customize, and copy battle-tested prompts for engineering, product, marketing, and design.";
export const TWITTER_HANDLE = "@beautifulaiprompt";

/**
 * Normalizes a relative path or absolute path into a clean absolute URL
 */
export function absoluteUrl(path: string = "/"): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  if (cleanPath === "/") {
    return SITE_URL;
  }
  // Remove trailing slashes for canonical consistency
  return `${SITE_URL}${cleanPath.replace(/\/+$/, "")}`;
}

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
}: ConstructMetadataOptions): Metadata {
  const canonicalUrl = absoluteUrl(path);

  // Avoid duplicate brand suffixes if title already includes it
  const cleanTitle = title.replace(/\s*\|\s*Beautiful AI Prompt$/, "");

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

  return {
    title: cleanTitle,
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
      title: cleanTitle,
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
      title: cleanTitle,
      description,
      creator: TWITTER_HANDLE,
      site: TWITTER_HANDLE,
      ...twitter,
    },
  };
}

/**
 * Generates truthful Schema.org BreadcrumbList structured data
 * Following Google Search documentation: item is optional on the last leaf item
 */
export function generateBreadcrumbJsonLd(
  items: Array<{ name: string; url?: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const entry: {
        "@type": string;
        position: number;
        name: string;
        item?: string;
      } = {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
      };
      if (item.url && item.url.trim() !== "") {
        entry.item = absoluteUrl(item.url);
      }
      return entry;
    }),
  };
}

/**
 * Generates truthful Schema.org WebSite structured data with SearchAction
 */
export function generateWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/prompts?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    inLanguage: "en-US",
  };
}

/**
 * Generates truthful Schema.org Organization structured data
 */
export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    description:
      "A platform providing curated, battle-tested prompt engineering patterns and productivity templates for modern AI models.",
  };
}

/**
 * Generates truthful Schema.org TechArticle for a prompt
 * strictly without fake review ratings, stars, or artificial social proof.
 */
export function generatePromptJsonLd(prompt: Prompt) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: prompt.title,
    description: prompt.shortDescription,
    url: absoluteUrl(`/prompts/${prompt.slug}`),
    inLanguage: "en-US",
    datePublished: prompt.createdAt,
    dateModified: prompt.updatedAt || prompt.createdAt,
    keywords: prompt.tags.join(", "),
    proficiencyLevel: prompt.difficulty,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      "@type": "Thing",
      name: prompt.category,
    },
  };
}

/**
 * Generates truthful Schema.org TechArticle for a guide
 */
export function generateGuideJsonLd(guide: Guide) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: guide.title,
    description: guide.description,
    url: absoluteUrl(`/guides/${guide.slug}`),
    inLanguage: "en-US",
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt || guide.publishedAt,
    author: {
      "@type": "Organization",
      name: guide.author.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      "@type": "Thing",
      name: guide.category,
    },
  };
}

/**
 * Generates truthful Schema.org CollectionPage for a category
 */
export function generateCategoryJsonLd(category: Category, prompts: Prompt[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} AI Prompts`,
    description: category.description,
    url: absoluteUrl(`/categories/${category.slug}`),
    inLanguage: "en-US",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: prompts.map((p, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: absoluteUrl(`/prompts/${p.slug}`),
        name: p.title,
      })),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

/**
 * Generates truthful Schema.org CollectionPage for a curated collection
 */
export function generateCollectionJsonLd(collection: Collection, prompts: Prompt[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.title,
    description: collection.description,
    url: absoluteUrl(`/collections/${collection.slug}`),
    inLanguage: "en-US",
    datePublished: collection.createdAt,
    dateModified: collection.updatedAt || collection.createdAt,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    hasPart: prompts.map((p) => ({
      "@type": "CreativeWork",
      name: p.title,
      url: absoluteUrl(`/prompts/${p.slug}`),
    })),
  };
}
