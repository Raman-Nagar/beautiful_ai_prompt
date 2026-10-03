import type { MetadataRoute } from "next";
import { getAllPrompts } from "@/lib/data/prompts";
import { getAllCategories } from "@/lib/data/categories";
import { getAllCollections } from "@/lib/data/collections";
import { getAllGuides } from "@/lib/data/guides";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // 1. Core Public Static Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: absoluteUrl("/prompts"),
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/categories"),
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/collections"),
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/guides"),
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/contact"),
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: absoluteUrl("/privacy-policy"),
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/terms"),
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/disclaimer"),
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // 2. Dynamic Prompts
  const prompts = getAllPrompts();
  const promptRoutes: MetadataRoute.Sitemap = prompts.map((prompt) => ({
    url: absoluteUrl(`/prompts/${prompt.slug}`),
    lastModified: new Date(prompt.updatedAt || prompt.createdAt),
    changeFrequency: "weekly",
    priority: prompt.featured ? 0.9 : 0.8,
  }));

  // 3. Dynamic Categories
  const categories = getAllCategories();
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: absoluteUrl(`/categories/${category.slug}`),
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  // 4. Dynamic Collections
  const collections = getAllCollections();
  const collectionRoutes: MetadataRoute.Sitemap = collections.map((col) => ({
    url: absoluteUrl(`/collections/${col.slug}`),
    lastModified: new Date(col.updatedAt || col.createdAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // 5. Dynamic Guides
  const guides = getAllGuides();
  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: absoluteUrl(`/guides/${guide.slug}`),
    lastModified: new Date(guide.updatedAt || guide.publishedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    ...staticRoutes,
    ...promptRoutes,
    ...categoryRoutes,
    ...collectionRoutes,
    ...guideRoutes,
  ];
}
