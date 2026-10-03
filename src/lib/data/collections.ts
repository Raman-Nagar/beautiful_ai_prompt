import { COLLECTIONS } from "@/data/collections";
import { getPromptById } from "./prompts";
import { Collection } from "@/types/collection";
import { Prompt } from "@/types/prompt";

export { COLLECTIONS };

/**
 * Retrieves all curated collections
 */
export function getAllCollections(): Collection[] {
  return COLLECTIONS;
}

/**
 * Retrieves a single collection by slug
 */
export function getCollectionBySlug(slug: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.slug === slug);
}

/**
 * Retrieves a single collection by ID
 */
export function getCollectionById(id: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.id === id);
}

/**
 * Retrieves full prompt objects belonging to a collection
 */
export function getCollectionPrompts(collectionSlug: string): Prompt[] {
  const collection = getCollectionBySlug(collectionSlug);
  if (!collection) return [];

  return collection.promptIds
    .map((id) => getPromptById(id))
    .filter((p): p is Prompt => p !== undefined);
}

/**
 * Retrieves featured curated collections
 */
export function getFeaturedCollections(): Collection[] {
  return COLLECTIONS.filter((c) => c.featured);
}

/**
 * Retrieves related collections for a given collection slug
 */
export function getRelatedCollections(collectionSlug: string, limit: number = 3): Collection[] {
  const current = getCollectionBySlug(collectionSlug);
  if (!current) return [];

  const results: Collection[] = [];
  const addedSlugs = new Set<string>([current.slug]);

  // 1. Explicitly configured related collections
  if (current.relatedCollectionSlugs) {
    for (const slug of current.relatedCollectionSlugs) {
      const col = getCollectionBySlug(slug);
      if (col && !addedSlugs.has(col.slug)) {
        results.push(col);
        addedSlugs.add(col.slug);
      }
    }
  }

  // 2. Fall back to other collections
  if (results.length < limit) {
    for (const col of COLLECTIONS) {
      if (!addedSlugs.has(col.slug)) {
        results.push(col);
        addedSlugs.add(col.slug);
        if (results.length >= limit) break;
      }
    }
  }

  return results.slice(0, limit);
}

/**
 * Retrieves collections relevant to a specific category
 */
export function getCollectionsByCategory(categorySlug: string, limit: number = 2): Collection[] {
  const norm = categorySlug.toLowerCase();

  // Find collections whose category, tags, or prompts match
  const matching = COLLECTIONS.filter((col) => {
    if (col.category.toLowerCase() === norm) return true;
    const hasTag = col.tags?.some((t) => t.toLowerCase().includes(norm) || norm.includes(t.toLowerCase()));
    if (hasTag) return true;

    // Check if any prompt in collection belongs to this category
    const prompts = getCollectionPrompts(col.slug);
    return prompts.some((p) => p.category.toLowerCase() === norm);
  });

  if (matching.length >= limit) {
    return matching.slice(0, limit);
  }

  // Pad with other collections if needed
  const others = COLLECTIONS.filter((c) => !matching.some((m) => m.id === c.id));
  return [...matching, ...others].slice(0, limit);
}

/**
 * Retrieves collections that include a specific prompt ID
 */
export function getCollectionsForPrompt(promptId: string): Collection[] {
  return COLLECTIONS.filter((col) => col.promptIds.includes(promptId));
}

