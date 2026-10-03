export interface TableOfContentsItem {
  id: string;
  title: string;
}

export interface GuideSection {
  id: string;
  title: string;
  content: string[];
  callout?: {
    type: "tip" | "warning" | "note";
    text: string;
  };
  codeSnippet?: {
    language: string;
    code: string;
    label?: string;
  };
  linkedPromptId?: string;
}

export interface Guide {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  readingTime: string;
  publishedAt: string;
  updatedAt?: string;
  featured?: boolean;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  tableOfContents: TableOfContentsItem[];
  sections: GuideSection[];
  relatedPromptIds: string[];
  relatedGuideSlugs: string[];
  tags?: string[];
  /** Alias for backward compatibility */
  summary?: string;
}
