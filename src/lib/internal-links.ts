import { Guide } from "@/types/guide";
import { Collection } from "@/types/collection";
import { Category } from "@/types/category";
import { GUIDES } from "@/data/guides";
import { COLLECTIONS } from "@/data/collections";
import { CATEGORIES } from "@/data/categories";
import { PROMPTS } from "@/data/prompts";

/**
 * Resolves the primary Category for a Guide using verified category IDs
 */
export function getCategoryForGuide(guide: Guide): Category | undefined {
  if (guide.categoryIds && guide.categoryIds.length > 0) {
    for (const catId of guide.categoryIds) {
      const found = CATEGORIES.find(
        (c) => c.slug.toLowerCase() === catId.toLowerCase() || c.id.toLowerCase() === catId.toLowerCase()
      );
      if (found) return found;
    }
  }

  // Fallback: match by name
  return CATEGORIES.find(
    (c) => c.name.toLowerCase() === guide.category.toLowerCase()
  );
}

/**
 * Retrieves guides relevant to a specific prompt
 * First checks explicit prompt ID mentions, then category alignment.
 */
export function getGuidesForPrompt(
  promptId: string,
  categorySlug?: string,
  limit: number = 2
): Guide[] {
  const results: Guide[] = [];
  const addedSlugs = new Set<string>();

  // 1. Guides that directly reference this prompt by ID
  for (const guide of GUIDES) {
    const hasPrompt =
      guide.relatedPromptIds?.includes(promptId) ||
      guide.promptIds?.includes(promptId) ||
      guide.sections?.some((s) => s.linkedPromptId === promptId);

    if (hasPrompt && !addedSlugs.has(guide.slug)) {
      results.push(guide);
      addedSlugs.add(guide.slug);
      if (results.length >= limit) return results;
    }
  }

  // 2. Guides matching the prompt's category
  if (categorySlug && results.length < limit) {
    const normCat = categorySlug.toLowerCase();
    for (const guide of GUIDES) {
      const matchesCat =
        guide.categoryIds?.some((c) => c.toLowerCase() === normCat) ||
        guide.category.toLowerCase() === normCat;

      if (matchesCat && !addedSlugs.has(guide.slug)) {
        results.push(guide);
        addedSlugs.add(guide.slug);
        if (results.length >= limit) return results;
      }
    }
  }

  return results.slice(0, limit);
}

/**
 * Retrieves guides relevant to a collection
 * Checks explicit collection mentions or shared category.
 */
export function getGuidesForCollection(
  collectionSlug: string,
  categorySlug?: string,
  limit: number = 2
): Guide[] {
  const results: Guide[] = [];
  const addedSlugs = new Set<string>();

  const normCol = collectionSlug.toLowerCase();

  // 1. Guides that explicitly link to this collection
  for (const guide of GUIDES) {
    const hasCollection =
      guide.relatedCollectionSlugs?.some((s) => s.toLowerCase() === normCol) ||
      guide.collectionIds?.some((s) => s.toLowerCase() === normCol);

    if (hasCollection && !addedSlugs.has(guide.slug)) {
      results.push(guide);
      addedSlugs.add(guide.slug);
      if (results.length >= limit) return results;
    }
  }

  // 2. Guides sharing the collection's category
  if (categorySlug && results.length < limit) {
    const normCat = categorySlug.toLowerCase();
    for (const guide of GUIDES) {
      const matchesCat =
        guide.categoryIds?.some((c) => c.toLowerCase() === normCat) ||
        guide.category.toLowerCase() === normCat;

      if (matchesCat && !addedSlugs.has(guide.slug)) {
        results.push(guide);
        addedSlugs.add(guide.slug);
        if (results.length >= limit) return results;
      }
    }
  }

  return results.slice(0, limit);
}

/**
 * Retrieves guides relevant to a category
 */
export function getGuidesForCategory(
  categorySlug: string,
  limit: number = 2
): Guide[] {
  const normCat = categorySlug.toLowerCase();
  const results: Guide[] = [];

  for (const guide of GUIDES) {
    const matchesCat =
      guide.categoryIds?.some((c) => c.toLowerCase() === normCat) ||
      guide.category.toLowerCase() === normCat;

    if (matchesCat && !results.some((g) => g.slug === guide.slug)) {
      results.push(guide);
      if (results.length >= limit) break;
    }
  }

  return results;
}

/**
 * Retrieves collections relevant to a category
 * Prioritizes direct category alignment, collection tags, or prompt overlap.
 */
export function getCollectionsForCategory(
  categorySlug: string,
  limit: number = 3
): Collection[] {
  const norm = categorySlug.toLowerCase();

  const matching = COLLECTIONS.filter((col) => {
    if (col.category.toLowerCase() === norm) return true;
    if (col.categoryIds?.some((c) => c.toLowerCase() === norm)) return true;
    if (col.tags?.some((t) => t.toLowerCase() === norm)) return true;
    // Check if any prompt in this collection belongs to category
    return col.promptIds.some((pid) => {
      const p = PROMPTS.find((item) => item.id === pid);
      return p?.category.toLowerCase() === norm;
    });
  });

  return matching.slice(0, limit);
}

export interface InternalLinkAuditReport {
  totalPages: {
    prompts: number;
    categories: number;
    collections: number;
    guides: number;
    staticPages: number;
    total: number;
  };
  orphans: {
    prompts: string[];
    categories: string[];
    collections: string[];
    guides: string[];
    total: number;
  };
  brokenReferences: {
    invalidPromptIdsInCollections: Array<{ collection: string; promptId: string }>;
    invalidPromptIdsInGuides: Array<{ guide: string; promptId: string }>;
    invalidCollectionSlugsInGuides: Array<{ guide: string; collectionSlug: string }>;
    invalidCategoryIdsInGuides: Array<{ guide: string; categoryId: string }>;
    invalidGuideSlugsInGuides: Array<{ guide: string; relatedSlug: string }>;
    total: number;
  };
  inboundLinkStats: {
    minPromptInbound: number;
    avgPromptInbound: number;
    minCategoryInbound: number;
    avgCategoryInbound: number;
    minCollectionInbound: number;
    avgCollectionInbound: number;
    minGuideInbound: number;
    avgGuideInbound: number;
  };
  passed: boolean;
}

/**
 * Performs a complete internal link graph audit across all content entities
 */
export function auditInternalLinkGraph(): InternalLinkAuditReport {
  const promptInbound = new Map<string, number>();
  const categoryInbound = new Map<string, number>();
  const collectionInbound = new Map<string, number>();
  const guideInbound = new Map<string, number>();

  for (const p of PROMPTS) promptInbound.set(p.id, 0);
  for (const c of CATEGORIES) categoryInbound.set(c.slug, 0);
  for (const col of COLLECTIONS) collectionInbound.set(col.slug, 0);
  for (const g of GUIDES) guideInbound.set(g.slug, 0);

  const broken = {
    invalidPromptIdsInCollections: [] as Array<{ collection: string; promptId: string }>,
    invalidPromptIdsInGuides: [] as Array<{ guide: string; promptId: string }>,
    invalidCollectionSlugsInGuides: [] as Array<{ guide: string; collectionSlug: string }>,
    invalidCategoryIdsInGuides: [] as Array<{ guide: string; categoryId: string }>,
    invalidGuideSlugsInGuides: [] as Array<{ guide: string; relatedSlug: string }>,
    total: 0,
  };

  // 1. Prompts links:
  for (const p of PROMPTS) {
    // Links to its category
    if (categoryInbound.has(p.category)) {
      categoryInbound.set(p.category, (categoryInbound.get(p.category) || 0) + 1);
    }
  }

  // 2. Categories links:
  for (const c of CATEGORIES) {
    // Links to its prompts
    const catPrompts = PROMPTS.filter((p) => p.category === c.slug);
    for (const p of catPrompts) {
      promptInbound.set(p.id, (promptInbound.get(p.id) || 0) + 1);
    }

    // Links to relevant collections
    const catCols = getCollectionsForCategory(c.slug, 2);
    for (const col of catCols) {
      collectionInbound.set(col.slug, (collectionInbound.get(col.slug) || 0) + 1);
    }

    // Links to relevant guides
    const catGuides = getGuidesForCategory(c.slug, 2);
    for (const g of catGuides) {
      guideInbound.set(g.slug, (guideInbound.get(g.slug) || 0) + 1);
    }
  }

  // 3. Collections links:
  for (const col of COLLECTIONS) {
    // Links to its prompts
    for (const pid of col.promptIds) {
      if (promptInbound.has(pid)) {
        promptInbound.set(pid, (promptInbound.get(pid) || 0) + 1);
      } else {
        broken.invalidPromptIdsInCollections.push({ collection: col.slug, promptId: pid });
      }
    }

    // Links to its category
    if (col.category && categoryInbound.has(col.category)) {
      categoryInbound.set(col.category, (categoryInbound.get(col.category) || 0) + 1);
    }

    // Links to related collections
    for (const relSlug of col.relatedCollectionSlugs || []) {
      if (collectionInbound.has(relSlug)) {
        collectionInbound.set(relSlug, (collectionInbound.get(relSlug) || 0) + 1);
      }
    }

    // Links to relevant guides
    const colGuides = getGuidesForCollection(col.slug, col.category, 2);
    for (const g of colGuides) {
      guideInbound.set(g.slug, (guideInbound.get(g.slug) || 0) + 1);
    }
  }

  // 4. Guides links:
  for (const g of GUIDES) {
    // Links to related prompts
    const pIds = g.relatedPromptIds || g.promptIds || [];
    for (const pid of pIds) {
      if (promptInbound.has(pid)) {
        promptInbound.set(pid, (promptInbound.get(pid) || 0) + 1);
      } else {
        broken.invalidPromptIdsInGuides.push({ guide: g.slug, promptId: pid });
      }
    }

    // Links to collections
    for (const colSlug of g.relatedCollectionSlugs || []) {
      if (collectionInbound.has(colSlug)) {
        collectionInbound.set(colSlug, (collectionInbound.get(colSlug) || 0) + 1);
      } else {
        broken.invalidCollectionSlugsInGuides.push({ guide: g.slug, collectionSlug: colSlug });
      }
    }

    // Links to category
    for (const catId of g.categoryIds || []) {
      if (categoryInbound.has(catId)) {
        categoryInbound.set(catId, (categoryInbound.get(catId) || 0) + 1);
      } else {
        broken.invalidCategoryIdsInGuides.push({ guide: g.slug, categoryId: catId });
      }
    }

    // Links to related guides
    for (const relSlug of g.relatedGuideSlugs || []) {
      if (guideInbound.has(relSlug)) {
        guideInbound.set(relSlug, (guideInbound.get(relSlug) || 0) + 1);
      } else {
        broken.invalidGuideSlugsInGuides.push({ guide: g.slug, relatedSlug: relSlug });
      }
    }
  }

  // Calculate orphans (0 inbound links from within the internal link graph)
  const orphanPrompts = Array.from(promptInbound.entries())
    .filter((entry) => entry[1] === 0)
    .map(([id]) => id);

  const orphanCategories = Array.from(categoryInbound.entries())
    .filter((entry) => entry[1] === 0)
    .map(([slug]) => slug);

  const orphanCollections = Array.from(collectionInbound.entries())
    .filter((entry) => entry[1] === 0)
    .map(([slug]) => slug);

  const orphanGuides = Array.from(guideInbound.entries())
    .filter((entry) => entry[1] === 0)
    .map(([slug]) => slug);

  broken.total =
    broken.invalidPromptIdsInCollections.length +
    broken.invalidPromptIdsInGuides.length +
    broken.invalidCollectionSlugsInGuides.length +
    broken.invalidCategoryIdsInGuides.length +
    broken.invalidGuideSlugsInGuides.length;

  const promptCounts = Array.from(promptInbound.values());
  const categoryCounts = Array.from(categoryInbound.values());
  const collectionCounts = Array.from(collectionInbound.values());
  const guideCounts = Array.from(guideInbound.values());

  const avg = (arr: number[]) => (arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : 0);
  const min = (arr: number[]) => (arr.length ? Math.min(...arr) : 0);

  const totalOrphans =
    orphanPrompts.length + orphanCategories.length + orphanCollections.length + orphanGuides.length;

  return {
    totalPages: {
      prompts: PROMPTS.length,
      categories: CATEGORIES.length,
      collections: COLLECTIONS.length,
      guides: GUIDES.length,
      staticPages: 10,
      total: PROMPTS.length + CATEGORIES.length + COLLECTIONS.length + GUIDES.length + 10,
    },
    orphans: {
      prompts: orphanPrompts,
      categories: orphanCategories,
      collections: orphanCollections,
      guides: orphanGuides,
      total: totalOrphans,
    },
    brokenReferences: broken,
    inboundLinkStats: {
      minPromptInbound: min(promptCounts),
      avgPromptInbound: Number(avg(promptCounts).toFixed(2)),
      minCategoryInbound: min(categoryCounts),
      avgCategoryInbound: Number(avg(categoryCounts).toFixed(2)),
      minCollectionInbound: min(collectionCounts),
      avgCollectionInbound: Number(avg(collectionCounts).toFixed(2)),
      minGuideInbound: min(guideCounts),
      avgGuideInbound: Number(avg(guideCounts).toFixed(2)),
    },
    passed: totalOrphans === 0 && broken.total === 0,
  };
}
