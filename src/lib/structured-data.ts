import { Prompt } from "@/types/prompt";
import { Category } from "@/types/category";
import { Collection } from "@/types/collection";
import { Guide } from "@/types/guide";
import { AIModel, ModelDetail } from "@/types/model";
import { VisualStyle } from "@/types/style";
import {
  SITE_URL,
  absoluteUrl,
  getPromptCanonicalUrl,
  getCategoryCanonicalUrl,
  getCollectionCanonicalUrl,
  getGuideCanonicalUrl,
  getModelCanonicalUrl,
  getStyleCanonicalUrl,
} from "./canonical";

export const SITE_NAME = "Beautiful AI Prompt";
export const DEFAULT_DESCRIPTION =
  "Curated directory of production-tested AI prompts. Discover, customize, and run battle-tested prompts for engineering, marketing, and design.";

/**
 * Generates Schema.org WebSite structured data with SearchAction
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
 * Contains only actual project information without fabricated addresses or stats.
 */
export function generateOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.ico`,
    description:
      "A platform providing curated, battle-tested prompt engineering patterns and productivity templates for modern AI models.",
  };
}

/**
 * Generates truthful Schema.org BreadcrumbList structured data
 * Following Google Search documentation: every ListItem includes a canonical URL.
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
 * Generates truthful Schema.org TechArticle for a prompt
 * Strictly without fake review ratings, stars, or artificial social proof.
 */
export function generatePromptJsonLd(prompt: Prompt) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": prompt.visualMetadata ? ["TechArticle", "VisualArtwork"] : "TechArticle",
    headline: prompt.title,
    description: prompt.shortDescription || prompt.description,
    url: getPromptCanonicalUrl(prompt.slug),
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

  if (prompt.visualMetadata) {
    schema.image = prompt.visualMetadata.previewImageUrl;
    schema.artform = "Generative AI Photography";
    schema.artMedium = `${prompt.visualMetadata.model} ${prompt.visualMetadata.modelVersion || ""}`.trim();
  }

  return schema;
}

/**
 * Generates truthful Schema.org TechArticle for a guide
 * Strictly using authentic editorial metadata.
 */
export function generateGuideJsonLd(guide: Guide) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: guide.title,
    description: guide.description || guide.excerpt,
    url: getGuideCanonicalUrl(guide.slug),
    inLanguage: "en-US",
    datePublished: guide.publishedAt,
    dateModified: guide.updatedAt || guide.publishedAt,
    keywords: (guide.tags || []).join(", "),
    author: {
      "@type": "Organization",
      name: guide.author?.name || `${SITE_NAME} Editorial Team`,
      url: SITE_URL,
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
    url: getCategoryCanonicalUrl(category.slug),
    inLanguage: "en-US",
    mainEntity: {
      "@type": "ItemList",
      itemListElement: prompts.map((p, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: getPromptCanonicalUrl(p.slug),
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
    description: collection.shortDescription || collection.description,
    url: getCollectionCanonicalUrl(collection.slug),
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
      url: getPromptCanonicalUrl(p.slug),
    })),
  };
}

/**
 * Generates Schema.org CollectionPage for the /models hub directory
 */
export function generateModelsHubJsonLd(models: AIModel[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AI Models & Prompt Engineering Hub — Beautiful AI Prompt",
    description:
      "Directory of supported AI models including Midjourney, FLUX.1, Claude 3.7, ChatGPT-4o, SDXL, and Gemini. Parameter cheat sheets and compatible prompt templates.",
    url: absoluteUrl("/models"),
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: models.map((m, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: getModelCanonicalUrl(m.id),
        name: m.name,
      })),
    },
  };
}

/**
 * Generates Schema.org TechArticle & SoftwareApplication for a specific model hub
 */
export function generateModelJsonLd(model: AIModel, detail?: ModelDetail, prompts: Prompt[] = []) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${model.name} Prompt Engineering Guide & Parameter Cheat Sheet`,
    description: detail?.description || model.description,
    url: getModelCanonicalUrl(model.id),
    inLanguage: "en-US",
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
      "@type": "SoftwareApplication",
      name: model.name,
      applicationCategory: model.engine === "visual" ? "MultimediaApplication" : "DeveloperApplication",
      operatingSystem: "Cloud / All",
      author: {
        "@type": "Organization",
        name: model.provider,
      },
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: prompts.length,
      itemListElement: prompts.slice(0, 25).map((p, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: getPromptCanonicalUrl(p.slug),
        name: p.title,
      })),
    },
  };
}

/**
 * Generates Schema.org CollectionPage for the visual styles directory
 */
export function generateStylesHubJsonLd(styles: VisualStyle[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Visual AI Prompt Styles Directory & Aesthetics Hub",
    description:
      "Explore curated visual prompt engineering styles: Cinematic Film, Documentary Photography, Architecture, High Fashion, Commercial Product, and 3D Digital Art.",
    url: absoluteUrl("/styles"),
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: styles.map((s, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: getStyleCanonicalUrl(s.slug),
        name: s.name,
      })),
    },
  };
}

/**
 * Generates Schema.org TechArticle & CreativeWork for a specific visual style hub
 */
export function generateStyleJsonLd(style: VisualStyle, prompts: Prompt[] = []) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${style.name} Prompt Engineering Guide, Optics & Lighting Rules`,
    description: style.longDescription || style.description,
    url: getStyleCanonicalUrl(style.slug),
    inLanguage: "en-US",
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
    image: absoluteUrl(style.heroImage),
    about: {
      "@type": "CreativeWork",
      name: style.name,
      genre: style.shortName,
      keywords: style.keyTokens.join(", "),
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: prompts.length,
      itemListElement: prompts.slice(0, 25).map((p, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        url: getPromptCanonicalUrl(p.slug),
        name: p.title,
      })),
    },
  };
}

/**
 * Generates Schema.org FAQPage structured data
 * Following Google Search documentation: each Question includes an Answer.
 */
export function generateFaqJsonLd(faqs: Array<{ question: string; answer: string }>) {
  if (!faqs || faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generates Schema.org HowTo structured data for procedural prompt engineering guides
 */
export function generateGuideHowToJsonLd(guide: Guide) {
  if (!guide.sections || guide.sections.length === 0) return null;

  const readingMinutes = guide.readingTimeMinutes || parseInt(guide.readingTime, 10) || 5;

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: guide.title,
    description: guide.description || guide.excerpt,
    url: getGuideCanonicalUrl(guide.slug),
    inLanguage: "en-US",
    totalTime: `PT${readingMinutes}M`,
    step: guide.sections.map((section, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: section.title,
      text: Array.isArray(section.content) ? section.content.join(" ") : String(section.content),
      url: `${getGuideCanonicalUrl(guide.slug)}#${section.id}`,
    })),
  };
}

