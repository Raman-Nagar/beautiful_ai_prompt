
export type ValidationSeverity = "error" | "warning" | "suggestion";

export interface ValidationIssue {
  severity: ValidationSeverity;
  code: string;
  field?: string;
  message: string;
  suggestion?: string;
}

export interface PromptValidationResult {
  promptId: string;
  promptSlug: string;
  promptTitle: string;
  isValid: boolean;
  issues: ValidationIssue[];
}

export interface DuplicateSimilarityPair {
  sourceId: string;
  sourceSlug: string;
  sourceTitle: string;
  targetId: string;
  targetSlug: string;
  targetTitle: string;
  similarityScore: number;
  reason: string;
}

export interface DuplicateDetectionReport {
  duplicateIds: string[];
  duplicateSlugs: string[];
  duplicateTitles: string[];
  similarTitles: DuplicateSimilarityPair[];
  similarPrompts: DuplicateSimilarityPair[];
  totalDuplicatesFound: number;
}

export interface ContentCatalogAuditReport {
  timestamp: string;
  totalPrompts: number;
  totalCategories: number;
  totalCollections: number;
  totalGuides: number;
  validPromptsCount: number;
  invalidPromptsCount: number;
  errorCount: number;
  warningCount: number;
  suggestionCount: number;
  promptResults: PromptValidationResult[];
  duplicateReport: DuplicateDetectionReport;
  categoryIntegrityIssues: ValidationIssue[];
  collectionIntegrityIssues: ValidationIssue[];
  guideIntegrityIssues: ValidationIssue[];
  passed: boolean;
}

/**
 * 7-part structural blueprint for standardized prompt authoring
 */
export interface PromptStructure {
  role?: string;
  context?: string;
  task: string;
  constraints?: string[];
  inputFormat?: string;
  outputFormat?: string;
  qualityCriteria?: string[];
}
