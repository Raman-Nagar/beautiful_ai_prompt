import { Prompt } from "@/types/prompt";
import { SearchMatch, SearchResultItem, MatchField } from "./types";

/**
 * Calculates a relevance score for a prompt against a search query.
 * Ranking Priority:
 * 1. Title matches (highest weight)
 * 2. Category matches
 * 3. Tag matches
 * 4. Description matches
 * 5. Use case matches
 */
export function scorePrompt(prompt: Prompt, query: string): SearchResultItem | null {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return null;

  const queryTokens = normalizedQuery.split(/\s+/).filter((t) => t.length > 0);
  if (queryTokens.length === 0) return null;

  const matches: SearchMatch[] = [];
  let totalScore = 0;

  // 1. Title Evaluation
  const title = prompt.title.toLowerCase();
  let titleScore = 0;

  if (title === normalizedQuery) {
    titleScore += 120; // Exact full match
  } else if (title.startsWith(normalizedQuery)) {
    titleScore += 90; // Prefix match
  } else if (title.includes(normalizedQuery)) {
    titleScore += 65; // Substring match
  } else {
    // Check individual word tokens in title
    let matchedTitleTokens = 0;
    queryTokens.forEach((token) => {
      if (title.includes(token)) {
        matchedTitleTokens++;
      }
    });

    if (matchedTitleTokens === queryTokens.length) {
      titleScore += 50; // All tokens present
    } else if (matchedTitleTokens > 0) {
      titleScore += matchedTitleTokens * 15;
    }
  }

  if (titleScore > 0) {
    matches.push({
      field: "title",
      score: titleScore,
      snippet: prompt.title,
    });
    totalScore += titleScore;
  }

  // 2. Category Evaluation
  const categorySlug = prompt.category.toLowerCase();
  const categoryName = (prompt.categoryName || "").toLowerCase();
  let categoryScore = 0;

  if (categorySlug === normalizedQuery || categoryName === normalizedQuery) {
    categoryScore += 45;
  } else if (categorySlug.startsWith(normalizedQuery) || categoryName.startsWith(normalizedQuery)) {
    categoryScore += 35;
  } else if (categorySlug.includes(normalizedQuery) || categoryName.includes(normalizedQuery)) {
    categoryScore += 25;
  }

  if (categoryScore > 0) {
    matches.push({
      field: "category",
      score: categoryScore,
      snippet: prompt.categoryName || prompt.category,
    });
    totalScore += categoryScore;
  }

  // 3. Tag Evaluation
  let tagScore = 0;
  let bestMatchedTag = "";

  prompt.tags.forEach((tag) => {
    const t = tag.toLowerCase();
    if (t === normalizedQuery) {
      tagScore = Math.max(tagScore, 35);
      bestMatchedTag = tag;
    } else if (t.startsWith(normalizedQuery)) {
      tagScore = Math.max(tagScore, 25);
      if (!bestMatchedTag) bestMatchedTag = tag;
    } else if (t.includes(normalizedQuery)) {
      tagScore = Math.max(tagScore, 18);
      if (!bestMatchedTag) bestMatchedTag = tag;
    }
  });

  if (tagScore > 0) {
    matches.push({
      field: "tag",
      score: tagScore,
      snippet: bestMatchedTag,
    });
    totalScore += tagScore;
  }

  // 4. Description Evaluation (shortDescription and full description)
  const shortDesc = (prompt.shortDescription || "").toLowerCase();
  const fullDesc = (prompt.description || "").toLowerCase();
  let descScore = 0;

  if (shortDesc.includes(normalizedQuery)) {
    descScore += 16;
  } else {
    let matchedDescTokens = 0;
    queryTokens.forEach((token) => {
      if (shortDesc.includes(token) || fullDesc.includes(token)) {
        matchedDescTokens++;
      }
    });
    if (matchedDescTokens === queryTokens.length) {
      descScore += 12;
    } else if (matchedDescTokens > 0) {
      descScore += matchedDescTokens * 4;
    }
  }

  if (descScore > 0) {
    matches.push({
      field: "description",
      score: descScore,
      snippet: prompt.shortDescription || prompt.description,
    });
    totalScore += descScore;
  }

  // 5. Use Case Evaluation
  let useCaseScore = 0;
  let bestUseCase = "";

  prompt.useCases.forEach((uc) => {
    const u = uc.toLowerCase();
    if (u.includes(normalizedQuery)) {
      useCaseScore = Math.max(useCaseScore, 14);
      bestUseCase = uc;
    } else {
      const allTokensInUC = queryTokens.every((t) => u.includes(t));
      if (allTokensInUC) {
        useCaseScore = Math.max(useCaseScore, 10);
        if (!bestUseCase) bestUseCase = uc;
      }
    }
  });

  if (useCaseScore > 0) {
    matches.push({
      field: "useCase",
      score: useCaseScore,
      snippet: bestUseCase,
    });
    totalScore += useCaseScore;
  }

  // If no fields matched at all, return null
  if (totalScore === 0) {
    return null;
  }

  // Tie-breakers: slight boost for featured/trending prompts
  if (prompt.featured) totalScore += 2;
  if (prompt.trending) totalScore += 1;

  // Primary matched field based on hierarchy
  let matchedField: MatchField = "description";
  if (titleScore > 0) matchedField = "title";
  else if (categoryScore > 0) matchedField = "category";
  else if (tagScore > 0) matchedField = "tag";
  else if (useCaseScore > 0) matchedField = "useCase";

  return {
    prompt,
    score: totalScore,
    matches,
    matchedField,
  };
}
