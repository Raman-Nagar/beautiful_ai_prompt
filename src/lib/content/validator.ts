import { Prompt } from "@/types/prompt";
import { Category } from "@/types/category";
import { Collection } from "@/types/collection";
import { Guide } from "@/types/guide";
import {
  ValidationIssue,
  PromptValidationResult,
  ContentCatalogAuditReport,
} from "@/types/content-quality";
import {
  CONTENT_STANDARDS,
  VALID_DIFFICULTIES,
  VALID_MODEL_IDS,
  VALID_VARIABLE_TYPES,
  RESTRICTED_PATTERNS,
} from "./quality-standards";
import { detectDuplicates } from "./duplicate-detector";

/**
 * Extracts bracketed variables from a prompt string (e.g. [ROLE], [current_role])
 * Note: Requires at least 2 alphanumeric characters to prevent false positives on single-letter
 * notations like [x], [y], or citation indices [1], [2].
 */
export function extractBracketVariables(promptText: string): string[] {
  const matches = promptText.match(/\[([a-zA-Z0-9_-]{2,})\]/g);
  if (!matches) return [];
  return Array.from(new Set(matches.map((m) => m.slice(1, -1))));
}

/**
 * Validates a single prompt against content standards and quality rules
 */
export function validatePrompt(
  prompt: Prompt,
  catalogPrompts: Prompt[],
  validCategories: Category[]
): PromptValidationResult {
  const issues: ValidationIssue[] = [];
  const validCategorySlugs = new Set(validCategories.map((c) => c.slug.toLowerCase()));
  const allPromptIds = new Set(catalogPrompts.map((p) => p.id));

  // 1. Identity & Slug Validation
  if (!prompt.id || !prompt.id.trim()) {
    issues.push({
      severity: "error",
      code: "MISSING_ID",
      field: "id",
      message: "Prompt ID is required",
    });
  } else if (!/^prompt-\d{3,}$/.test(prompt.id)) {
    issues.push({
      severity: "warning",
      code: "NON_STANDARD_ID",
      field: "id",
      message: `Prompt ID '${prompt.id}' should follow the convention 'prompt-XXX' (e.g. prompt-001)`,
    });
  }

  if (!prompt.slug || !prompt.slug.trim()) {
    issues.push({
      severity: "error",
      code: "MISSING_SLUG",
      field: "slug",
      message: "Prompt URL slug is required",
    });
  } else if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(prompt.slug)) {
    issues.push({
      severity: "error",
      code: "INVALID_SLUG_FORMAT",
      field: "slug",
      message: `Slug '${prompt.slug}' must be lowercase kebab-case without special characters`,
    });
  }

  // 2. Titles & Descriptions
  if (!prompt.title || !prompt.title.trim()) {
    issues.push({
      severity: "error",
      code: "MISSING_TITLE",
      field: "title",
      message: "Prompt title is required",
    });
  } else {
    if (prompt.title.length < CONTENT_STANDARDS.TITLE_MIN_LENGTH) {
      issues.push({
        severity: "warning",
        code: "TITLE_TOO_SHORT",
        field: "title",
        message: `Title is too brief (${prompt.title.length} chars). Aim for at least ${CONTENT_STANDARDS.TITLE_MIN_LENGTH} characters.`,
      });
    }
    if (prompt.title.length > CONTENT_STANDARDS.TITLE_MAX_LENGTH) {
      issues.push({
        severity: "warning",
        code: "TITLE_TOO_LONG",
        field: "title",
        message: `Title is excessively long (${prompt.title.length} chars). Keep under ${CONTENT_STANDARDS.TITLE_MAX_LENGTH} characters.`,
      });
    }
  }

  if (!prompt.shortDescription || !prompt.shortDescription.trim()) {
    issues.push({
      severity: "error",
      code: "MISSING_SHORT_DESC",
      field: "shortDescription",
      message: "Short description is required for card previews and SEO meta snippets",
    });
  } else if (prompt.shortDescription.length < CONTENT_STANDARDS.SHORT_DESC_MIN_LENGTH) {
    issues.push({
      severity: "warning",
      code: "SHORT_DESC_TOO_BRIEF",
      field: "shortDescription",
      message: `Short description should be at least ${CONTENT_STANDARDS.SHORT_DESC_MIN_LENGTH} characters`,
    });
  }

  if (!prompt.description || !prompt.description.trim()) {
    issues.push({
      severity: "error",
      code: "MISSING_DESCRIPTION",
      field: "description",
      message: "Detailed description is required",
    });
  }

  // 3. Category & Taxonomy
  if (!prompt.category || !prompt.category.trim()) {
    issues.push({
      severity: "error",
      code: "MISSING_CATEGORY",
      field: "category",
      message: "Prompt category is required",
    });
  } else if (!validCategorySlugs.has(prompt.category.toLowerCase())) {
    issues.push({
      severity: "error",
      code: "INVALID_CATEGORY",
      field: "category",
      message: `Category '${prompt.category}' does not exist in categories taxonomy`,
      suggestion: `Valid categories: ${Array.from(validCategorySlugs).join(", ")}`,
    });
  }

  // 4. Tags
  if (!Array.isArray(prompt.tags) || prompt.tags.length < CONTENT_STANDARDS.TAGS_MIN_COUNT) {
    issues.push({
      severity: "warning",
      code: "INSUFFICIENT_TAGS",
      field: "tags",
      message: `Prompt should have at least ${CONTENT_STANDARDS.TAGS_MIN_COUNT} tags (currently has ${prompt.tags?.length || 0})`,
    });
  } else {
    const seenTags = new Set<string>();
    prompt.tags.forEach((tag) => {
      const lower = tag.toLowerCase().trim();
      if (!lower) {
        issues.push({
          severity: "error",
          code: "EMPTY_TAG",
          field: "tags",
          message: "Empty tag detected in tags array",
        });
      } else if (seenTags.has(lower)) {
        issues.push({
          severity: "warning",
          code: "DUPLICATE_TAG",
          field: "tags",
          message: `Duplicate tag '#${tag}' in prompt tags array`,
        });
      }
      seenTags.add(lower);
    });
  }

  // 5. Prompt Text Body
  if (!prompt.prompt || !prompt.prompt.trim()) {
    issues.push({
      severity: "error",
      code: "MISSING_PROMPT_BODY",
      field: "prompt",
      message: "Prompt instruction body is required",
    });
  } else {
    if (prompt.prompt.length < CONTENT_STANDARDS.PROMPT_MIN_LENGTH) {
      issues.push({
        severity: "warning",
        code: "PROMPT_BODY_TOO_SHORT",
        field: "prompt",
        message: `Prompt body is only ${prompt.prompt.length} characters. Detailed framing produces significantly higher-signal AI responses.`,
      });
    }

    // Check for generic "Act as an expert" without structured context
    if (
      /^act\s+as\s+an?\s+[^.]+\.\s*$/i.test(prompt.prompt.trim()) ||
      /^you\s+are\s+an?\s+[^.]+\.\s*$/i.test(prompt.prompt.trim())
    ) {
      issues.push({
        severity: "error",
        code: "LOW_VALUE_ONE_LINER",
        field: "prompt",
        message: "Prompt is an empty one-liner without context, tasks, constraints, or output formatting",
      });
    }
  }

  // 6. Variables & Template Synchronization
  const declaredVariables = prompt.variables || [];
  const declaredVarNames = new Set(
    declaredVariables.map((v) => (v.name || v.key || "").toLowerCase()).filter(Boolean)
  );

  // Validate declared variable definitions
  declaredVariables.forEach((variable, idx) => {
    const varName = variable.name || variable.key;
    if (!varName) {
      issues.push({
        severity: "error",
        code: "VARIABLE_MISSING_NAME",
        field: `variables[${idx}]`,
        message: `Variable at index ${idx} is missing a 'name'`,
      });
      return;
    }

    if (!variable.label) {
      issues.push({
        severity: "warning",
        code: "VARIABLE_MISSING_LABEL",
        field: `variables[${idx}]`,
        message: `Variable '${varName}' is missing a human-readable 'label'`,
      });
    }

    if (!VALID_VARIABLE_TYPES.includes(variable.type)) {
      issues.push({
        severity: "error",
        code: "INVALID_VARIABLE_TYPE",
        field: `variables[${idx}].type`,
        message: `Variable '${varName}' has invalid type '${variable.type}'. Must be text, textarea, or select.`,
      });
    }

    if (variable.type === "select") {
      if (!Array.isArray(variable.options) || variable.options.length === 0) {
        issues.push({
          severity: "error",
          code: "SELECT_VARIABLE_EMPTY_OPTIONS",
          field: `variables[${idx}].options`,
          message: `Select variable '${varName}' must have a non-empty 'options' array`,
        });
      }
    }
  });

  // Cross-reference bracketed tokens in prompt body
  if (prompt.prompt) {
    const tokensInBody = extractBracketVariables(prompt.prompt);
    const tokensLower = tokensInBody.map((t) => t.toLowerCase());

    // Undeclared variables in prompt body
    tokensLower.forEach((tok) => {
      if (!declaredVarNames.has(tok)) {
        issues.push({
          severity: "warning",
          code: "UNDECLARED_TEMPLATE_TOKEN",
          field: "prompt",
          message: `Prompt body references '[${tok}]', but it is not declared in the 'variables' array`,
          suggestion: `Add { name: "${tok}", label: "${tok.replace(/_/g, " ")}", type: "text", required: true } to variables`,
        });
      }
    });

    // Declared variables never used in prompt body
    declaredVarNames.forEach((varName) => {
      if (!tokensLower.includes(varName)) {
        issues.push({
          severity: "warning",
          code: "UNUSED_DECLARED_VARIABLE",
          field: "variables",
          message: `Variable '${varName}' is declared in variables array, but never referenced as '[${varName}]' in prompt text`,
        });
      }
    });
  }

  // 7. Examples & Output
  if (!prompt.exampleInput || Object.keys(prompt.exampleInput).length === 0) {
    if (declaredVariables.length > 0) {
      issues.push({
        severity: "warning",
        code: "MISSING_EXAMPLE_INPUT",
        field: "exampleInput",
        message: "Prompt has variables but lacks an exampleInput demonstrating sample values",
      });
    }
  }

  if (!prompt.exampleOutput || !prompt.exampleOutput.trim()) {
    issues.push({
      severity: "warning",
      code: "MISSING_EXAMPLE_OUTPUT",
      field: "exampleOutput",
      message: "Prompt is missing verified exampleOutput showing what AI outputs should look like",
    });
  }

  // 8. Use Cases & Difficulty
  if (!Array.isArray(prompt.useCases) || prompt.useCases.length < CONTENT_STANDARDS.USE_CASES_MIN_COUNT) {
    issues.push({
      severity: "warning",
      code: "MISSING_USE_CASES",
      field: "useCases",
      message: "Prompt should include at least 1 real-world useCase",
    });
  }

  if (!prompt.difficulty || !VALID_DIFFICULTIES.includes(prompt.difficulty)) {
    issues.push({
      severity: "error",
      code: "INVALID_DIFFICULTY",
      field: "difficulty",
      message: `Invalid difficulty '${prompt.difficulty}'. Must be: ${VALID_DIFFICULTIES.join(", ")}`,
    });
  }

  // 9. Compatible Models
  if (!Array.isArray(prompt.compatibleModels) || prompt.compatibleModels.length < CONTENT_STANDARDS.COMPATIBLE_MODELS_MIN_COUNT) {
    issues.push({
      severity: "error",
      code: "MISSING_COMPATIBLE_MODELS",
      field: "compatibleModels",
      message: "Prompt must specify at least one compatible AI model",
    });
  } else {
    prompt.compatibleModels.forEach((mod) => {
      if (!VALID_MODEL_IDS.includes(mod)) {
        issues.push({
          severity: "error",
          code: "INVALID_MODEL_ID",
          field: "compatibleModels",
          message: `Model '${mod}' is not recognized. Valid models: ${VALID_MODEL_IDS.join(", ")}`,
        });
      }
    });
  }

  // 10. Related Prompt Integrity
  if (Array.isArray(prompt.relatedPromptIds)) {
    prompt.relatedPromptIds.forEach((relId) => {
      if (relId === prompt.id) {
        issues.push({
          severity: "warning",
          code: "SELF_REFERENCING_RELATED_PROMPT",
          field: "relatedPromptIds",
          message: `Prompt cannot reference itself in relatedPromptIds: '${relId}'`,
        });
      } else if (!allPromptIds.has(relId)) {
        issues.push({
          severity: "error",
          code: "BROKEN_RELATED_PROMPT_REFERENCE",
          field: "relatedPromptIds",
          message: `Related prompt ID '${relId}' does not exist in the prompt catalog`,
        });
      }
    });
  }

  // 11. Timestamps (ISO Format)
  if (!prompt.createdAt || isNaN(Date.parse(prompt.createdAt))) {
    issues.push({
      severity: "error",
      code: "INVALID_CREATED_AT",
      field: "createdAt",
      message: `createdAt must be a valid ISO date string (got '${prompt.createdAt}')`,
    });
  }

  if (!prompt.updatedAt || isNaN(Date.parse(prompt.updatedAt))) {
    issues.push({
      severity: "error",
      code: "INVALID_UPDATED_AT",
      field: "updatedAt",
      message: `updatedAt must be a valid ISO date string (got '${prompt.updatedAt}')`,
    });
  }

  // 12. Anti-Spam & Restricted Pattern Scans
  const fullTextToScan = `${prompt.title} ${prompt.shortDescription} ${prompt.description} ${prompt.prompt}`;
  for (const { pattern, reason } of RESTRICTED_PATTERNS) {
    if (pattern.test(fullTextToScan)) {
      issues.push({
        severity: "error",
        code: "RESTRICTED_CONTENT_PATTERN",
        message: `Content fails quality standard: ${reason}`,
      });
    }
  }

  const hasErrors = issues.some((i) => i.severity === "error");

  return {
    promptId: prompt.id,
    promptSlug: prompt.slug,
    promptTitle: prompt.title,
    isValid: !hasErrors,
    issues,
  };
}

/**
 * Validates category, collection, and guide cross-references
 */
export function validateCrossReferences(
  prompts: Prompt[],
  categories: Category[],
  collections: Collection[],
  guides: Guide[]
): {
  categoryIssues: ValidationIssue[];
  collectionIssues: ValidationIssue[];
  guideIssues: ValidationIssue[];
} {
  const promptIdSet = new Set(prompts.map((p) => p.id));
  const categorySlugSet = new Set(categories.map((c) => c.slug.toLowerCase()));

  const categoryIssues: ValidationIssue[] = [];
  const collectionIssues: ValidationIssue[] = [];
  const guideIssues: ValidationIssue[] = [];

  // Check collections
  const seenCollectionIds = new Set<string>();
  const seenCollectionSlugs = new Set<string>();
  const allCollectionSlugs = new Set(collections.map((c) => c.slug));

  for (const col of collections) {
    // 1. Uniqueness of ID & Slug
    if (seenCollectionIds.has(col.id)) {
      collectionIssues.push({
        severity: "error",
        code: "COLLECTION_DUPLICATE_ID",
        field: "id",
        message: `Duplicate collection ID detected: '${col.id}'`,
      });
    }
    seenCollectionIds.add(col.id);

    if (seenCollectionSlugs.has(col.slug)) {
      collectionIssues.push({
        severity: "error",
        code: "COLLECTION_DUPLICATE_SLUG",
        field: "slug",
        message: `Duplicate collection slug detected: '${col.slug}'`,
      });
    }
    seenCollectionSlugs.add(col.slug);

    // 2. Required fields
    if (!col.id || !col.slug || !col.title || !col.description || !col.shortDescription) {
      collectionIssues.push({
        severity: "error",
        code: "COLLECTION_MISSING_REQUIRED_FIELD",
        field: "general",
        message: `Collection '${col.title || col.id}' is missing required fields (id, slug, title, shortDescription, description)`,
      });
    }

    // 3. Category validation
    if (!categorySlugSet.has(col.category.toLowerCase())) {
      collectionIssues.push({
        severity: "error",
        code: "COLLECTION_INVALID_CATEGORY",
        field: "category",
        message: `Collection '${col.title}' references non-existent category '${col.category}'`,
      });
    }

    // 4. Prompt IDs validation & no duplicates within collection
    const seenPromptsInCol = new Set<string>();
    col.promptIds.forEach((pId) => {
      if (seenPromptsInCol.has(pId)) {
        collectionIssues.push({
          severity: "error",
          code: "COLLECTION_DUPLICATE_PROMPT_ID",
          field: "promptIds",
          message: `Collection '${col.title}' contains duplicate prompt ID '${pId}'`,
        });
      }
      seenPromptsInCol.add(pId);

      if (!promptIdSet.has(pId)) {
        collectionIssues.push({
          severity: "error",
          code: "COLLECTION_BROKEN_PROMPT_LINK",
          field: "promptIds",
          message: `Collection '${col.title}' references prompt ID '${pId}' which does not exist in the prompt catalog`,
        });
      }
    });

    // 5. Timestamps
    if (!col.createdAt || isNaN(Date.parse(col.createdAt))) {
      collectionIssues.push({
        severity: "error",
        code: "COLLECTION_INVALID_CREATED_AT",
        field: "createdAt",
        message: `Collection '${col.title}' has invalid createdAt date string: '${col.createdAt}'`,
      });
    }
    if (!col.updatedAt || isNaN(Date.parse(col.updatedAt))) {
      collectionIssues.push({
        severity: "error",
        code: "COLLECTION_INVALID_UPDATED_AT",
        field: "updatedAt",
        message: `Collection '${col.title}' has invalid updatedAt date string: '${col.updatedAt}'`,
      });
    }

    // 6. Related collection references
    if (col.relatedCollectionSlugs) {
      col.relatedCollectionSlugs.forEach((relSlug) => {
        if (relSlug === col.slug) {
          collectionIssues.push({
            severity: "error",
            code: "COLLECTION_SELF_REFERENCING_RELATED",
            field: "relatedCollectionSlugs",
            message: `Collection '${col.title}' cannot reference itself in relatedCollectionSlugs`,
          });
        } else if (!allCollectionSlugs.has(relSlug)) {
          collectionIssues.push({
            severity: "error",
            code: "COLLECTION_BROKEN_RELATED_SLUG",
            field: "relatedCollectionSlugs",
            message: `Collection '${col.title}' references non-existent related collection slug '${relSlug}'`,
          });
        }
      });
    }
  }


  // Check guides
  const seenGuideIds = new Set<string>();
  const seenGuideSlugs = new Set<string>();
  const allGuideSlugs = new Set(guides.map((g) => g.slug));

  for (const guide of guides) {
    // 1. Uniqueness of Guide ID & Slug
    if (seenGuideIds.has(guide.id)) {
      guideIssues.push({
        severity: "error",
        code: "GUIDE_DUPLICATE_ID",
        field: "id",
        message: `Duplicate guide ID detected: '${guide.id}'`,
      });
    }
    seenGuideIds.add(guide.id);

    if (seenGuideSlugs.has(guide.slug)) {
      guideIssues.push({
        severity: "error",
        code: "GUIDE_DUPLICATE_SLUG",
        field: "slug",
        message: `Duplicate guide slug detected: '${guide.slug}'`,
      });
    }
    seenGuideSlugs.add(guide.slug);

    // 2. Required fields
    if (
      !guide.id ||
      !guide.slug ||
      !guide.title ||
      !guide.excerpt ||
      !guide.description ||
      !guide.category ||
      !guide.readingTime ||
      !guide.publishedAt ||
      !Array.isArray(guide.sections) ||
      guide.sections.length === 0 ||
      !Array.isArray(guide.tableOfContents) ||
      guide.tableOfContents.length === 0
    ) {
      guideIssues.push({
        severity: "error",
        code: "GUIDE_MISSING_REQUIRED_FIELDS",
        field: "general",
        message: `Guide '${guide.title || guide.id}' is missing required fields (id, slug, title, excerpt, description, category, readingTime, publishedAt, sections, or tableOfContents)`,
      });
    }

    // 3. Timestamps
    if (!guide.publishedAt || isNaN(Date.parse(guide.publishedAt))) {
      guideIssues.push({
        severity: "error",
        code: "GUIDE_INVALID_PUBLISHED_AT",
        field: "publishedAt",
        message: `Guide '${guide.title}' has invalid publishedAt date string: '${guide.publishedAt}'`,
      });
    }
    if (guide.updatedAt && isNaN(Date.parse(guide.updatedAt))) {
      guideIssues.push({
        severity: "error",
        code: "GUIDE_INVALID_UPDATED_AT",
        field: "updatedAt",
        message: `Guide '${guide.title}' has invalid updatedAt date string: '${guide.updatedAt}'`,
      });
    }

    // 4. Reading time validation
    if (guide.readingTimeMinutes !== undefined && guide.readingTimeMinutes <= 0) {
      guideIssues.push({
        severity: "error",
        code: "GUIDE_INVALID_READING_TIME",
        field: "readingTimeMinutes",
        message: `Guide '${guide.title}' must have a positive reading time (got ${guide.readingTimeMinutes})`,
      });
    }

    // 5. Tags validation (no duplicates within guide)
    if (Array.isArray(guide.tags)) {
      const seenGuideTags = new Set<string>();
      guide.tags.forEach((tag) => {
        const lower = tag.toLowerCase().trim();
        if (seenGuideTags.has(lower)) {
          guideIssues.push({
            severity: "warning",
            code: "GUIDE_DUPLICATE_TAG",
            field: "tags",
            message: `Guide '${guide.title}' has duplicate tag: '${tag}'`,
          });
        }
        seenGuideTags.add(lower);
      });
    }

    // 6. Section linked prompts & related prompts
    guide.sections.forEach((sec) => {
      if (sec.linkedPromptId && !promptIdSet.has(sec.linkedPromptId)) {
        guideIssues.push({
          severity: "error",
          code: "GUIDE_BROKEN_PROMPT_LINK",
          field: "sections.linkedPromptId",
          message: `Guide '${guide.title}' section '${sec.title}' references prompt ID '${sec.linkedPromptId}' which does not exist`,
        });
      }
    });

    const promptIdsToCheck = [
      ...(guide.relatedPromptIds || []),
      ...(guide.promptIds || []),
    ];
    const seenPromptsInGuide = new Set<string>();
    promptIdsToCheck.forEach((pId) => {
      if (!promptIdSet.has(pId)) {
        guideIssues.push({
          severity: "error",
          code: "GUIDE_BROKEN_RELATED_PROMPT",
          field: "relatedPromptIds",
          message: `Guide '${guide.title}' references prompt ID '${pId}' which does not exist in the prompt catalog`,
        });
      }
      seenPromptsInGuide.add(pId);
    });

    // 7. Related collection references
    if (guide.relatedCollectionSlugs) {
      guide.relatedCollectionSlugs.forEach((colSlug) => {
        if (!allCollectionSlugs.has(colSlug)) {
          guideIssues.push({
            severity: "error",
            code: "GUIDE_BROKEN_COLLECTION_SLUG",
            field: "relatedCollectionSlugs",
            message: `Guide '${guide.title}' references non-existent collection slug '${colSlug}'`,
          });
        }
      });
    }

    // 8. Related guide references
    if (guide.relatedGuideSlugs) {
      guide.relatedGuideSlugs.forEach((relGuideSlug) => {
        if (relGuideSlug === guide.slug) {
          guideIssues.push({
            severity: "error",
            code: "GUIDE_SELF_REFERENCING_RELATED",
            field: "relatedGuideSlugs",
            message: `Guide '${guide.title}' cannot reference itself in relatedGuideSlugs`,
          });
        } else if (!allGuideSlugs.has(relGuideSlug)) {
          guideIssues.push({
            severity: "error",
            code: "GUIDE_BROKEN_RELATED_GUIDE_SLUG",
            field: "relatedGuideSlugs",
            message: `Guide '${guide.title}' references non-existent related guide slug '${relGuideSlug}'`,
          });
        }
      });
    }
  }

  return {
    categoryIssues,
    collectionIssues,
    guideIssues,
  };
}

/**
 * Runs a complete catalog audit across all prompts, categories, collections, and guides
 */
export interface CatalogAuditOptions {
  categories?: Category[];
  collections?: Collection[];
  guides?: Guide[];
  similarityThreshold?: number;
}

/**
 * Runs a complete catalog audit across all prompts, categories, collections, and guides
 */
export function auditContentCatalog(
  prompts: Prompt[],
  categoriesOrOptions?: Category[] | CatalogAuditOptions,
  maybeCollections?: Collection[],
  maybeGuides?: Guide[]
): ContentCatalogAuditReport {
  let categories: Category[] = [];
  let collections: Collection[] = [];
  let guides: Guide[] = [];
  let similarityThreshold = 0.75;

  if (Array.isArray(categoriesOrOptions)) {
    categories = categoriesOrOptions;
    collections = maybeCollections || [];
    guides = maybeGuides || [];
  } else if (categoriesOrOptions && typeof categoriesOrOptions === "object") {
    categories = categoriesOrOptions.categories || [];
    collections = categoriesOrOptions.collections || [];
    guides = categoriesOrOptions.guides || [];
    if (categoriesOrOptions.similarityThreshold) {
      similarityThreshold = categoriesOrOptions.similarityThreshold;
    }
  }

  const promptResults: PromptValidationResult[] = [];
  let errorCount = 0;
  let warningCount = 0;
  let suggestionCount = 0;

  for (const prompt of prompts) {
    const result = validatePrompt(prompt, prompts, categories);
    promptResults.push(result);

    result.issues.forEach((issue) => {
      if (issue.severity === "error") errorCount++;
      else if (issue.severity === "warning") warningCount++;
      else suggestionCount++;
    });
  }

  // Cross-reference checks
  const { categoryIssues, collectionIssues, guideIssues } = validateCrossReferences(
    prompts,
    categories,
    collections,
    guides
  );

  [...categoryIssues, ...collectionIssues, ...guideIssues].forEach((issue) => {
    if (issue.severity === "error") errorCount++;
    else if (issue.severity === "warning") warningCount++;
    else suggestionCount++;
  });

  // Duplicate detection
  const duplicateReport = detectDuplicates(prompts, {
    titleSimilarityThreshold: similarityThreshold,
  });
  errorCount +=
    duplicateReport.duplicateIds.length +
    duplicateReport.duplicateSlugs.length +
    duplicateReport.duplicateTitles.length;
  warningCount +=
    duplicateReport.similarTitles.length + duplicateReport.similarPrompts.length;

  const validPromptsCount = promptResults.filter((r) => r.isValid).length;
  const invalidPromptsCount = promptResults.length - validPromptsCount;

  return {
    timestamp: new Date().toISOString(),
    totalPrompts: prompts.length,
    totalCategories: categories.length,
    totalCollections: collections.length,
    totalGuides: guides.length,
    validPromptsCount,
    invalidPromptsCount,
    errorCount,
    warningCount,
    suggestionCount,
    promptResults,
    duplicateReport,
    categoryIntegrityIssues: categoryIssues,
    collectionIntegrityIssues: collectionIssues,
    guideIntegrityIssues: guideIssues,
    passed: errorCount === 0,
  };
}
