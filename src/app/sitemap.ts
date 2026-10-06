import type { MetadataRoute } from "next";
import { getAllPrompts } from "@/lib/data/prompts";
import { getAllCategories } from "@/lib/data/categories";
import { getAllCollections } from "@/lib/data/collections";
import { getAllGuides } from "@/lib/data/guides";
import { getAllModels } from "@/lib/data/models";
import { getAllVisualStyles } from "@/lib/data/visual-styles";
import {
  absoluteUrl,
  getPromptCanonicalUrl,
  getCategoryCanonicalUrl,
  getCollectionCanonicalUrl,
  getGuideCanonicalUrl,
  getModelCanonicalUrl,
  getStyleCanonicalUrl,
} from "@/lib/canonical";

export default function sitemap(): MetadataRoute.Sitemap {
  const prompts = getAllPrompts();
  const categories = getAllCategories();
  const collections = getAllCollections();
  const guides = getAllGuides();
  const models = getAllModels();
  const styles = getAllVisualStyles();

  // Determine latest real update date across the active content catalog
  let maxTimestamp = 0;
  for (const p of prompts) {
    const t = new Date(p.updatedAt || p.createdAt).getTime();
    if (t > maxTimestamp) maxTimestamp = t;
  }
  for (const g of guides) {
    const t = new Date(g.updatedAt || g.publishedAt).getTime();
    if (t > maxTimestamp) maxTimestamp = t;
  }
  for (const col of collections) {
    const t = new Date(col.updatedAt || col.createdAt).getTime();
    if (t > maxTimestamp) maxTimestamp = t;
  }

  const latestCatalogDate = maxTimestamp > 0 ? new Date(maxTimestamp) : new Date("2026-03-25T00:00:00Z");
  const legalPolicyDate = new Date("2026-03-01T00:00:00Z");

  // 1. Core Public Static Informational Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: latestCatalogDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: absoluteUrl("/prompts"),
      lastModified: latestCatalogDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/categories"),
      lastModified: latestCatalogDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/collections"),
      lastModified: latestCatalogDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/guides"),
      lastModified: latestCatalogDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/tools/composition-ruler"),
      lastModified: latestCatalogDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/tools/prompt-generator"),
      lastModified: latestCatalogDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/models"),
      lastModified: latestCatalogDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/styles"),
      lastModified: latestCatalogDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/compare/midjourney-vs-flux"),
      lastModified: latestCatalogDate,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: latestCatalogDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: latestCatalogDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/privacy-policy"),
      lastModified: legalPolicyDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/terms"),
      lastModified: legalPolicyDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/disclaimer"),
      lastModified: legalPolicyDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // 2. Dynamic Prompts (225 items)
  const promptRoutes: MetadataRoute.Sitemap = prompts.map((prompt) => ({
    url: getPromptCanonicalUrl(prompt.slug),
    lastModified: new Date(prompt.updatedAt || prompt.createdAt),
    changeFrequency: "weekly",
    priority: prompt.featured ? 0.9 : 0.8,
  }));

  // 3. Dynamic Categories (26 items)
  // Last modified is computed from the most recently updated prompt in each category
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => {
    const catPrompts = prompts.filter(
      (p) => p.category.toLowerCase() === category.slug.toLowerCase()
    );

    let catMaxTimestamp = 0;
    for (const p of catPrompts) {
      const t = new Date(p.updatedAt || p.createdAt).getTime();
      if (t > catMaxTimestamp) catMaxTimestamp = t;
    }

    const lastMod = catMaxTimestamp > 0 ? new Date(catMaxTimestamp) : latestCatalogDate;

    return {
      url: getCategoryCanonicalUrl(category.slug),
      lastModified: lastMod,
      changeFrequency: "weekly",
      priority: category.featured ? 0.8 : 0.7,
    };
  });

  // 4. Dynamic Collections (22 items)
  const collectionRoutes: MetadataRoute.Sitemap = collections.map((col) => ({
    url: getCollectionCanonicalUrl(col.slug),
    lastModified: new Date(col.updatedAt || col.createdAt),
    changeFrequency: "weekly",
    priority: col.featured ? 0.85 : 0.75,
  }));

  // 5. Dynamic Guides (12 items)
  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: getGuideCanonicalUrl(guide.slug),
    lastModified: new Date(guide.updatedAt || guide.publishedAt),
    changeFrequency: "weekly",
    priority: guide.featured ? 0.9 : 0.8,
  }));

  // 6. Dynamic AI Model Silos (10 items)
  const modelRoutes: MetadataRoute.Sitemap = models.map((model) => ({
    url: getModelCanonicalUrl(model.id),
    lastModified: latestCatalogDate,
    changeFrequency: "weekly",
    priority: model.isPopular ? 0.85 : 0.75,
  }));

  // 7. Dynamic Visual Style Silos (6 items)
  const styleRoutes: MetadataRoute.Sitemap = styles.map((style) => ({
    url: getStyleCanonicalUrl(style.slug),
    lastModified: latestCatalogDate,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [
    ...staticRoutes,
    ...promptRoutes,
    ...categoryRoutes,
    ...collectionRoutes,
    ...guideRoutes,
    ...modelRoutes,
    ...styleRoutes,
  ];
}
