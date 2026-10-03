import { Prompt } from "@/types/prompt";
import {
  DuplicateDetectionReport,
  DuplicateSimilarityPair,
} from "@/types/content-quality";
import { CONTENT_STANDARDS } from "./quality-standards";

const STOP_WORDS = new Set([
  "a", "an", "the", "and", "or", "in", "on", "at", "to", "for", "with",
  "by", "from", "of", "as", "is", "are", "was", "were", "be", "your",
  "my", "our", "their", "this", "that", "how", "what", "which", "into",
]);

/**
 * Tokenizes and normalizes text into a set of informative words
 */
function tokenizeWords(text: string): Set<string> {
  const normalized = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = normalized
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));

  return new Set(words);
}

/**
 * Calculates Jaccard token similarity between two texts: |A ∩ B| / |A ∪ B|
 */
export function computeJaccardSimilarity(textA: string, textB: string): number {
  const tokensA = tokenizeWords(textA);
  const tokensB = tokenizeWords(textB);

  if (tokensA.size === 0 || tokensB.size === 0) return 0;

  let intersectionCount = 0;
  for (const token of tokensA) {
    if (tokensB.has(token)) {
      intersectionCount++;
    }
  }

  const unionSize = tokensA.size + tokensB.size - intersectionCount;
  return unionSize > 0 ? intersectionCount / unionSize : 0;
}

/**
 * Computes normalized Levenshtein string similarity (0.0 to 1.0)
 */
export function computeStringSimilarity(str1: string, str2: string): number {
  const s1 = str1.toLowerCase().trim();
  const s2 = str2.toLowerCase().trim();

  if (s1 === s2) return 1;
  if (!s1 || !s2) return 0;

  const len1 = s1.length;
  const len2 = s2.length;
  const maxLen = Math.max(len1, len2);

  if (maxLen === 0) return 1;

  // Single-row DP optimization
  let prevRow = Array.from({ length: len2 + 1 }, (_, i) => i);
  let currRow = new Array(len2 + 1);

  for (let i = 1; i <= len1; i++) {
    currRow[0] = i;
    const char1 = s1[i - 1];

    for (let j = 1; j <= len2; j++) {
      const cost = char1 === s2[j - 1] ? 0 : 1;
      currRow[j] = Math.min(
        prevRow[j] + 1,       // deletion
        currRow[j - 1] + 1,   // insertion
        prevRow[j - 1] + cost // substitution
      );
    }

    const temp = prevRow;
    prevRow = currRow;
    currRow = temp;
  }

  const distance = prevRow[len2];
  return Math.max(0, 1 - distance / maxLen);
}

/**
 * Detects exact duplicates and fuzzy near-duplicate prompts in a dataset
 */
export function detectDuplicates(
  prompts: Prompt[],
  options?: {
    titleSimilarityThreshold?: number;
    promptSimilarityThreshold?: number;
  }
): DuplicateDetectionReport {
  const titleThreshold =
    options?.titleSimilarityThreshold ?? CONTENT_STANDARDS.TITLE_SIMILARITY_THRESHOLD;
  const promptThreshold =
    options?.promptSimilarityThreshold ?? CONTENT_STANDARDS.PROMPT_SIMILARITY_THRESHOLD;

  const idMap = new Map<string, string[]>();
  const slugMap = new Map<string, string[]>();
  const titleMap = new Map<string, string[]>();

  const similarTitles: DuplicateSimilarityPair[] = [];
  const similarPrompts: DuplicateSimilarityPair[] = [];

  // 1. Exact Map Aggregations
  for (const p of prompts) {
    // ID check
    const idKey = p.id.trim();
    idMap.set(idKey, [...(idMap.get(idKey) || []), p.title]);

    // Slug check (case-insensitive)
    const slugKey = p.slug.trim().toLowerCase();
    slugMap.set(slugKey, [...(slugMap.get(slugKey) || []), p.id]);

    // Title check (normalized)
    const titleKey = p.title.trim().toLowerCase();
    titleMap.set(titleKey, [...(titleMap.get(titleKey) || []), p.id]);
  }

  const duplicateIds: string[] = [];
  idMap.forEach((titles, id) => {
    if (titles.length > 1) {
      duplicateIds.push(`ID '${id}' is shared by: ${titles.join(", ")}`);
    }
  });

  const duplicateSlugs: string[] = [];
  slugMap.forEach((ids, slug) => {
    if (ids.length > 1) {
      duplicateSlugs.push(`Slug '${slug}' is shared by IDs: ${ids.join(", ")}`);
    }
  });

  const duplicateTitles: string[] = [];
  titleMap.forEach((ids, title) => {
    if (ids.length > 1) {
      duplicateTitles.push(`Title '${title}' is duplicated across IDs: ${ids.join(", ")}`);
    }
  });

  // 2. Pairwise Fuzzy Similarity Analysis
  for (let i = 0; i < prompts.length; i++) {
    for (let j = i + 1; j < prompts.length; j++) {
      const p1 = prompts[i];
      const p2 = prompts[j];

      // Title Similarity
      const jaccardScore = computeJaccardSimilarity(p1.title, p2.title);
      const levenshteinScore = computeStringSimilarity(p1.title, p2.title);
      const titleScore = Math.max(jaccardScore, levenshteinScore);

      if (titleScore >= titleThreshold) {
        similarTitles.push({
          sourceId: p1.id,
          sourceSlug: p1.slug,
          sourceTitle: p1.title,
          targetId: p2.id,
          targetSlug: p2.slug,
          targetTitle: p2.title,
          similarityScore: Math.round(titleScore * 100) / 100,
          reason: `Titles are ${Math.round(titleScore * 100)}% similar (Jaccard: ${Math.round(jaccardScore * 100)}%, Levenshtein: ${Math.round(levenshteinScore * 100)}%)`,
        });
      }

      // Prompt Body Similarity (detect reskinned duplicate instructions)
      const promptBodyScore = computeJaccardSimilarity(p1.prompt, p2.prompt);
      if (promptBodyScore >= promptThreshold) {
        similarPrompts.push({
          sourceId: p1.id,
          sourceSlug: p1.slug,
          sourceTitle: p1.title,
          targetId: p2.id,
          targetSlug: p2.slug,
          targetTitle: p2.title,
          similarityScore: Math.round(promptBodyScore * 100) / 100,
          reason: `Prompt instruction bodies share ${Math.round(promptBodyScore * 100)}% of content tokens`,
        });
      }
    }
  }

  const totalDuplicatesFound =
    duplicateIds.length +
    duplicateSlugs.length +
    duplicateTitles.length +
    similarTitles.length +
    similarPrompts.length;

  return {
    duplicateIds,
    duplicateSlugs,
    duplicateTitles,
    similarTitles,
    similarPrompts,
    totalDuplicatesFound,
  };
}
