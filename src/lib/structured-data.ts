import { Prompt } from "@/types/prompt";
import { Category } from "@/types/category";
import { Collection } from "@/types/collection";
import { Guide } from "@/types/guide";
import { BlogPost } from "@/types/blog";
import { MatrixPage } from "@/types/matrix";
import { DeveloperRule } from "@/types/rule";
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
  getBlogCanonicalUrl,
  getMatrixCanonicalUrl,
  getRuleCanonicalUrl,
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
 * Generates truthful Schema.org Structured Data for a prompt item.
 * Incorporates SoftwareApplication, CreativeWork, and TechArticle (and VisualArtwork for image prompts).
 * Strictly without fake review ratings, stars, or artificial social proof.
 */
export function generatePromptJsonLd(prompt: Prompt) {
  const isVisual = Boolean(prompt.visualMetadata);
  const types = isVisual
    ? ["SoftwareApplication", "CreativeWork", "TechArticle", "VisualArtwork"]
    : ["SoftwareApplication", "CreativeWork", "TechArticle"];

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": types,
    name: `${prompt.title} — AI Prompt Template`,
    headline: prompt.title,
    description: prompt.shortDescription || prompt.description,
    url: getPromptCanonicalUrl(prompt.slug),
    inLanguage: "en-US",
    applicationCategory: isVisual ? "DesignApplication" : "DeveloperApplication",
    operatingSystem: "Cloud / Web AI (ChatGPT, Claude, Gemini, Midjourney)",
    softwareVersion: "2026.1",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
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
 * Generates contextual FAQ items for an individual prompt page to target
 * rich snippets and provide deep value to human users.
 */
export function getPromptFaqs(prompt: Prompt): Array<{ question: string; answer: string }> {
  const isVisual = Boolean(prompt.visualMetadata);
  const modelNames = prompt.compatibleModels
    .map((m) => m.charAt(0).toUpperCase() + m.slice(1))
    .join(", ");

  const faqs: Array<{ question: string; answer: string }> = [];

  if (isVisual && prompt.visualMetadata) {
    faqs.push({
      question: `Which AI image generator is recommended for the "${prompt.title}" prompt?`,
      answer: `This prompt is engineered and calibrated specifically for ${prompt.visualMetadata.model.toUpperCase()} ${prompt.visualMetadata.modelVersion || ""}. It has been tested for optimal photographic texture, lighting direction, and prompt weight adherence.`,
    });
    faqs.push({
      question: `What aspect ratio and render settings should I use?`,
      answer: `The benchmark composition was rendered with an aspect ratio of --ar ${prompt.visualMetadata.aspectRatio}. If using Midjourney, standard stylize values between 200 and 350 preserve photorealism without excessive fantasy distortion.`,
    });
  } else {
    faqs.push({
      question: `Which AI models work best with the "${prompt.title}" prompt?`,
      answer: `This prompt is thoroughly tested and compatible with ${modelNames}. For multi-step reasoning, architectural planning, and code refactoring, Claude 3.7/3.5 Sonnet and ChatGPT-4o provide the highest constraint adherence. For large-document synthesis, Google Gemini 2.5 Pro is also recommended.`,
    });
  }

  if (prompt.variables.length > 0) {
    const varList = prompt.variables.map((v) => `[${v.name || v.key}]`).join(", ");
    faqs.push({
      question: `How do I customize the parameters in this prompt template?`,
      answer: `This template features ${prompt.variables.length} customizable parameter(s): ${varList}. Replace each bracketed placeholder with your project's specific details, constraints, or code before submitting to your AI model. You can also use our interactive workbench on this page to populate and copy the completed prompt in one click.`,
    });
  }

  faqs.push({
    question: `Can I use this prompt and its outputs for commercial projects?`,
    answer: `Yes. All prompts published on Beautiful AI Prompt are 100% free for both personal and commercial use. You hold full ownership of all code, copy, strategies, or imagery generated by your selected AI model when running this prompt.`,
  });

  faqs.push({
    question: `How does this prompt prevent AI hallucinations and ensure output accuracy?`,
    answer: `This template enforces explicit negative constraints, few-shot parameter boundaries, and schema requirements (such as tabular comparisons or step-by-step logic). This suppresses speculative drift and forces the AI model to ground its response in your provided inputs.`,
  });

  return faqs;
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

/**
 * Generates contextual FAQ items for a curated prompt collection page
 */
export function getCollectionFaqs(
  collection: Collection,
  prompts: Prompt[]
): Array<{ question: string; answer: string }> {
  const count = prompts.length;
  const categoryLabel = collection.categoryName || collection.category;

  return [
    {
      question: `What is included in the ${collection.title} collection?`,
      answer: `This collection contains ${count} production-vetted prompt templates specifically sequenced for ${categoryLabel} tasks. Each prompt includes verified input constraints, interactive variables, and target model recommendations.`,
    },
    {
      question: `How should I run the prompts in this multi-step workflow?`,
      answer: `For best results, execute the prompts in sequential order. Use the output and synthesized insights from Step 1 as context for Step 2. This compounding sequence eliminates context drift and produces significantly more coherent outcomes than isolated single prompts.`,
    },
    {
      question: `Which AI models are compatible with this collection?`,
      answer: `All prompts in ${collection.title} are tested on leading frontier models including ChatGPT-4o, Claude 3.7 / 3.5 Sonnet, and Google Gemini 2.5 Pro. Specific model recommendations and parameter tips are detailed on each prompt card.`,
    },
    {
      question: `Can I customize the variables in these collection prompts?`,
      answer: `Yes. Every prompt has dynamic variable placeholders (e.g. [TECH_STACK], [ROLE], [AUDIENCE]). Click any prompt to use our in-browser workbench to customize these fields before copying.`,
    },
    {
      question: `Are the prompts and generated outputs free for commercial use?`,
      answer: `Yes, 100%. All prompts published in this collection are completely free and open for personal and commercial projects without attribution requirements.`,
    },
  ];
}

/**
 * Generates Schema.org WebApplication & SoftwareApplication structured data for Home page
 */
export function generateHomePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["WebApplication", "SoftwareApplication"],
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Cloud / All Web Browsers",
    browserRequirements: "Requires modern web browser with JavaScript enabled",
    softwareVersion: "2026.1",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}


/**
 * Generates Schema.org BlogPosting structured data for a blog article
 */
export function generateBlogPostingJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    url: getBlogCanonicalUrl(post.slug),
    inLanguage: "en-US",
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    keywords: (post.targetKeywords || []).join(", "),
    author: {
      "@type": "Organization",
      name: post.author?.name || `${SITE_NAME} Research Team`,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.ico`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getBlogCanonicalUrl(post.slug),
    },
  };
}


export const WIKIDATA_ENTITIES: Record<string, { name: string; url: string; description: string }> = {
  Q115564437: { name: "ChatGPT", url: "https://www.wikidata.org/wiki/Q115564437", description: "AI chatbot developed by OpenAI" },
  Q115664402: { name: "OpenAI", url: "https://www.wikidata.org/wiki/Q115664402", description: "Artificial intelligence research laboratory" },
  Q117188168: { name: "Anthropic", url: "https://www.wikidata.org/wiki/Q117188168", description: "AI safety and research company" },
  Q118235287: { name: "Claude", url: "https://www.wikidata.org/wiki/Q118235287", description: "Large language model family created by Anthropic" },
  Q123689408: { name: "Gemini", url: "https://www.wikidata.org/wiki/Q123689408", description: "Multimodal AI model family developed by Google DeepMind" },
  Q95: { name: "Google", url: "https://www.wikidata.org/wiki/Q95", description: "Technology company specializing in search and cloud computing" },
  Q113163354: { name: "Midjourney", url: "https://www.wikidata.org/wiki/Q113163354", description: "Generative artificial intelligence program and service" },
  Q110823377: { name: "Next.js", url: "https://www.wikidata.org/wiki/Q110823377", description: "Open-source React frontend development web framework created by Vercel" },
  Q19399674: { name: "React", url: "https://www.wikidata.org/wiki/Q19399674", description: "JavaScript library for building user interfaces" },
  Q9824: { name: "TypeScript", url: "https://www.wikidata.org/wiki/Q9824", description: "Strongly typed programming language that builds on JavaScript" },
  Q28865: { name: "Python", url: "https://www.wikidata.org/wiki/Q28865", description: "High-level general-purpose programming language" },
  Q105477461: { name: "FastAPI", url: "https://www.wikidata.org/wiki/Q105477461", description: "Modern, fast web framework for building APIs with Python" },
  Q756100: { name: "Node.js", url: "https://www.wikidata.org/wiki/Q756100", description: "Cross-platform JavaScript runtime environment" },
  Q192490: { name: "PostgreSQL", url: "https://www.wikidata.org/wiki/Q192490", description: "Open-source relational database management system" },
  Q15133800: { name: "Docker", url: "https://www.wikidata.org/wiki/Q15133800", description: "Platform as a service product using OS-level virtualization" },
  Q37227: { name: "Go", url: "https://www.wikidata.org/wiki/Q37227", description: "Statically typed, compiled programming language designed at Google" },
  Q24578999: { name: "Angular", url: "https://www.wikidata.org/wiki/Q24578999", description: "TypeScript-based open-source web application framework" },
  Q117075775: { name: "Prompt engineering", url: "https://www.wikidata.org/wiki/Q117075775", description: "Process of structuring text that can be interpreted and understood by a generative AI model" },
};

/**
 * Generates Schema.org TechArticle & CollectionPage for a Model x Persona Matrix page
 */
export function generateMatrixJsonLd(page: MatrixPage) {
  const entityAbouts = (page.wikidataEntityIds || [])
    .filter((id) => WIKIDATA_ENTITIES[id])
    .map((id) => ({
      "@type": "Thing",
      name: WIKIDATA_ENTITIES[id].name,
      sameAs: WIKIDATA_ENTITIES[id].url,
      description: WIKIDATA_ENTITIES[id].description,
    }));

  return {
    "@context": "https://schema.org",
    "@type": ["TechArticle", "CollectionPage"],
    headline: page.title,
    description: page.seoDescription || page.summary,
    url: getMatrixCanonicalUrl(page.slug),
    inLanguage: "en-US",
    datePublished: page.publishedAt,
    dateModified: page.updatedAt || page.publishedAt,
    keywords: page.targetKeywords.join(", "),
    author: {
      "@type": "Organization",
      name: `${SITE_NAME} AI Research`,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.ico`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getMatrixCanonicalUrl(page.slug),
    },
    ...(entityAbouts.length > 0 ? { about: entityAbouts } : {}),
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: page.curatedPrompts.length,
      itemListElement: page.curatedPrompts.map((item, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: item.title,
        description: item.description,
      })),
    },
  };
}

/**
 * Generates Schema.org TechArticle & SoftwareSourceCode for Developer Agent Rules
 */
export function generateRuleJsonLd(rule: DeveloperRule) {
  const entityAbouts = (rule.wikidataEntityIds || [])
    .filter((id) => WIKIDATA_ENTITIES[id])
    .map((id) => ({
      "@type": "Thing",
      name: WIKIDATA_ENTITIES[id].name,
      sameAs: WIKIDATA_ENTITIES[id].url,
      description: WIKIDATA_ENTITIES[id].description,
    }));

  const primaryFile = rule.files[0];

  return {
    "@context": "https://schema.org",
    "@type": ["TechArticle", "SoftwareSourceCode"],
    headline: rule.title,
    description: rule.seoDescription || rule.summary,
    url: getRuleCanonicalUrl(rule.slug),
    inLanguage: "en-US",
    datePublished: rule.publishedAt,
    dateModified: rule.updatedAt || rule.publishedAt,
    keywords: rule.targetKeywords.join(", "),
    programmingLanguage: rule.technology,
    codeSampleType: "full",
    text: primaryFile?.content || "",
    author: {
      "@type": "Organization",
      name: `${SITE_NAME} Developer Experience`,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.ico`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": getRuleCanonicalUrl(rule.slug),
    },
    ...(entityAbouts.length > 0 ? { about: entityAbouts } : {}),
  };
}
