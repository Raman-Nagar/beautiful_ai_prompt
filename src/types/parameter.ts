export interface RecommendedSetting {
  value: string;
  scenario: string;
  visualImpact: string;
}

export interface ParameterFaq {
  question: string;
  answer: string;
}

export interface ModelParameter {
  slug: string;
  name: string;
  flag: string;
  model: "midjourney" | "flux" | "stable-diffusion" | "dall-e";
  modelName: string;
  syntax: string;
  defaultValue: string;
  range: string;
  shortDescription: string;
  detailedExplanation: string;
  recommendedValues: RecommendedSetting[];
  commonMistakes: string[];
  samplePrompts: string[];
  faq: ParameterFaq[];
}
