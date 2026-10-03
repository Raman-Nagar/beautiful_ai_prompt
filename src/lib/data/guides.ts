import { GUIDES } from "@/data/guides";
import { getPromptById } from "./prompts";
import { Guide } from "@/types/guide";
import { Prompt } from "@/types/prompt";

/**
 * Retrieves all published guides
 */
export function getAllGuides(): Guide[] {
  return GUIDES;
}

/**
 * Retrieves a single guide by its slug
 */
export function getGuideBySlug(slug: string): Guide | undefined {
  return GUIDES.find((g) => g.slug === slug);
}

/**
 * Retrieves a single guide by its unique ID
 */
export function getGuideById(id: string): Guide | undefined {
  return GUIDES.find((g) => g.id === id);
}

/**
 * Retrieves featured guides
 */
export function getFeaturedGuides(): Guide[] {
  return GUIDES.filter((g) => g.featured);
}

/**
 * Retrieves latest guides sorted by publish date descending
 */
export function getLatestGuides(limit: number = 3): Guide[] {
  return [...GUIDES]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

/**
 * Retrieves related guides for a given guide
 */
export function getRelatedGuides(currentSlug: string, limit: number = 2): Guide[] {
  const current = getGuideBySlug(currentSlug);
  if (!current) return [];

  const results: Guide[] = [];
  const addedSlugs = new Set<string>([current.slug]);

  // 1. Explicitly configured related guides
  if (current.relatedGuideSlugs) {
    for (const slug of current.relatedGuideSlugs) {
      const g = getGuideBySlug(slug);
      if (g && !addedSlugs.has(g.slug)) {
        results.push(g);
        addedSlugs.add(g.slug);
      }
    }
  }

  // 2. Pad with other guides if needed
  if (results.length < limit) {
    for (const g of GUIDES) {
      if (!addedSlugs.has(g.slug)) {
        results.push(g);
        addedSlugs.add(g.slug);
        if (results.length >= limit) break;
      }
    }
  }

  return results.slice(0, limit);
}

/**
 * Resolves full Prompt objects mentioned in a guide
 */
export function getGuidePrompts(guide: Guide): Prompt[] {
  return guide.relatedPromptIds
    .map((id) => getPromptById(id))
    .filter((p): p is Prompt => p !== undefined);
}
