export interface BlogTableOfContentsItem {
  id: string;
  title: string;
}

export interface BlogSection {
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
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  excerpt: string;
  readingTime: string;
  readingTimeMinutes: number;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  category: string;
  tags: string[];
  targetKeywords: string[];
  author: {
    name: string;
    role: string;
  };
  tableOfContents: BlogTableOfContentsItem[];
  sections: BlogSection[];
  relatedPromptSlugs?: string[];
  relatedGuideSlugs?: string[];
}
