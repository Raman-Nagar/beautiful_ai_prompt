import { AIModelId } from "./model";

export interface MatrixPromptExample {
  title: string;
  description: string;
  prompt: string;
  parametersOrFlags?: string;
  recommendedVariables: Record<string, string>;
  expectedOutputPreview: string;
}

export interface MatrixFaq {
  question: string;
  answer: string;
}

export interface MatrixPage {
  id: string;
  slug: string;
  modelId: AIModelId;
  categorySlug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  heroTagline: string;
  targetKeywords: string[];
  summary: string;
  whyThisModelForThisPersona: string[];
  promptEngineeringPlaybook: {
    title: string;
    description: string;
    doList: string[];
    dontList: string[];
  };
  recommendedSettings: {
    temperature: string;
    topP?: string;
    maxTokens?: string;
    modelVariant: string;
    systemPromptSnippet?: string;
    cliFlags?: string;
  };
  curatedPrompts: MatrixPromptExample[];
  faqs: MatrixFaq[];
  relatedGuideSlugs?: string[];
  relatedCollectionSlugs?: string[];
  relatedToolPaths?: string[];
  wikidataEntityIds?: string[];
  updatedAt: string;
  publishedAt: string;
}
