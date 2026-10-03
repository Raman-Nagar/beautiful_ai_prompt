import { CATEGORIES } from "@/data/categories";
import { PROMPTS } from "@/data/prompts";
import { Category } from "@/types/category";

/**
 * Returns all categories with live prompt count computed from dataset
 */
export function getAllCategories(): Category[] {
  return CATEGORIES.map((cat) => ({
    ...cat,
    count: getCategoryPromptCount(cat.slug),
  }));
}

const CATEGORY_ALIASES: Record<string, string> = {
  development: "coding",
  dev: "coding",
  programming: "coding",
  software: "coding",
  jobs: "career",
  interview: "job-interview",
  interviews: "job-interview",
  resumes: "resume",
};

/**
 * Retrieves a single category by its slug (supports common aliases like development)
 */
export function getCategoryBySlug(slug: string): Category | undefined {
  const normalized = slug.toLowerCase().trim();
  const targetSlug = CATEGORY_ALIASES[normalized] || normalized;
  const found = CATEGORIES.find((c) => c.slug.toLowerCase() === targetSlug);
  if (!found) return undefined;

  return {
    ...found,
    count: getCategoryPromptCount(found.slug),
  };
}

/**
 * Retrieves a single category by its unique ID
 */
export function getCategoryById(id: string): Category | undefined {
  const found = CATEGORIES.find((c) => c.id === id || c.slug === id);
  if (!found) return undefined;

  return {
    ...found,
    count: getCategoryPromptCount(found.slug),
  };
}

/**
 * Retrieves featured categories
 */
export function getFeaturedCategories(): Category[] {
  return getAllCategories().filter((c) => c.featured);
}

/**
 * Computes total prompts assigned to a category
 */
export function getCategoryPromptCount(categorySlug: string): number {
  return PROMPTS.filter((p) => p.category.toLowerCase() === categorySlug.toLowerCase()).length;
}

const DOMAIN_CLUSTERS: Record<string, string[]> = {
  career: ["resume", "job-interview", "freelancing", "business"],
  resume: ["career", "job-interview", "email", "freelancing"],
  "job-interview": ["career", "resume", "coding", "business"],
  coding: ["javascript", "react", "nextjs", "freelancing"],
  javascript: ["coding", "react", "nextjs", "education"],
  react: ["nextjs", "coding", "javascript", "productivity"],
  nextjs: ["react", "coding", "javascript", "business"],
  business: ["marketing", "sales", "productivity", "career"],
  marketing: ["sales", "social-media", "content-creation", "youtube"],
  sales: ["marketing", "business", "email", "customer-support"],
  "social-media": ["youtube", "content-creation", "marketing", "freelancing"],
  youtube: ["content-creation", "social-media", "marketing", "education"],
  "content-creation": ["social-media", "youtube", "marketing", "freelancing"],
  productivity: ["email", "business", "research", "students"],
  email: ["customer-support", "sales", "career", "productivity"],
  education: ["students", "research", "productivity", "coding"],
  students: ["education", "research", "productivity", "career"],
  research: ["education", "students", "coding", "business"],
  freelancing: ["business", "sales", "coding", "career"],
  "customer-support": ["email", "sales", "productivity", "business"],
};

/**
 * Retrieves related categories based on domain clusters
 */
export function getRelatedCategories(currentSlug: string, limit: number = 4): Category[] {
  const norm = currentSlug.toLowerCase();
  const clusterSlugs = DOMAIN_CLUSTERS[norm] || [];
  
  const related: Category[] = [];
  for (const s of clusterSlugs) {
    const cat = getCategoryBySlug(s);
    if (cat && cat.slug !== norm && !related.some((r) => r.slug === cat.slug)) {
      related.push(cat);
    }
  }

  // If fewer than limit, pad with other categories
  if (related.length < limit) {
    const all = getAllCategories();
    for (const c of all) {
      if (c.slug !== norm && !related.some((r) => r.slug === c.slug)) {
        related.push(c);
        if (related.length >= limit) break;
      }
    }
  }

  return related.slice(0, limit);
}

