export interface RuleFormatFile {
  fileName: string;
  formatLabel: string;
  description: string;
  content: string;
}

export interface RuleExample {
  scenario: string;
  prompt: string;
  agentBehavior: string;
}

export interface RuleFaq {
  question: string;
  answer: string;
}

export interface DeveloperRule {
  id: string;
  slug: string;
  technology: string;
  techCategory: "frontend" | "backend" | "language" | "database" | "devops";
  versionTarget: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  heroTagline: string;
  targetKeywords: string[];
  summary: string;
  overview: string;
  keyPrinciples: string[];
  installationGuide: {
    pathRecommendation: string;
    steps: string[];
  };
  files: RuleFormatFile[];
  examples: RuleExample[];
  faqs: RuleFaq[];
  relatedRules: string[];
  relatedMatrixSlugs?: string[];
  wikidataEntityIds?: string[];
  updatedAt: string;
  publishedAt: string;
}
