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
  excerpt: string;
  description: string;
  /** Full text content or markdown representation */
  content?: string;
  /** Backward compatibility alias for excerpt */
  summary?: string;
  category: string;
  categoryIds?: string[];
  readingTime: string;
  readingTimeMinutes?: number;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  author?: {
    name: string;
    role: string;
    avatar?: string;
  };
  tableOfContents: TableOfContentsItem[];
  sections: GuideSection[];
  relatedPromptIds: string[];
  promptIds?: string[];
  relatedCollectionSlugs?: string[];
  collectionIds?: string[];
  relatedGuideSlugs: string[];
  relatedGuideIds?: string[];
  tags: string[];
}
