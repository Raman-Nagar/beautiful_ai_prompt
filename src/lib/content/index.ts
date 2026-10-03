/**
 * Beautiful AI Prompt - Content Engine & Quality System
 * 
 * Central API for prompt validation, duplicate detection, content queries,
 * and quality assurance.
 */

export * from "./quality-standards";
export * from "./duplicate-detector";
export * from "./validator";

// Re-export core data query helpers for unified content access
export {
  getAllPrompts,
  getPromptById,
  getPromptBySlug,
  getPromptsByCategory,
  getPromptsBySubcategory,
  getPromptsByModel,
  getPromptsByTag,
  getPromptsByDifficulty,
  getFeaturedPrompts,
  getTrendingPrompts,
  getLatestPrompts,
  getRelatedPrompts,
  getRandomPrompts,
  getPromptCount,
  filterPrompts,
  searchPrompts,
  getAllTags,
  getAllUseCases,
  getPromptStats,
} from "@/lib/data/prompts";

export {
  getAllCategories,
  getCategoryBySlug,
  getCategoryById,
  getFeaturedCategories,
  getCategoryPromptCount,
  getRelatedCategories,
} from "@/lib/data/categories";

export {
  getAllCollections,
  getCollectionBySlug,
  getCollectionById,
  getCollectionPrompts,
  getFeaturedCollections,
  getRelatedCollections,
  getCollectionsByCategory,
} from "@/lib/data/collections";

export {
  getAllGuides,
  getGuideBySlug,
  getGuideById,
  getFeaturedGuides,
  getLatestGuides,
  getRelatedGuides,
  getGuidePrompts,
} from "@/lib/data/guides";
