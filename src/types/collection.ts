export interface Collection {
  id: string;
  slug: string;
  title: string;
  description: string;
  editorialOverview?: string;
  category: string;
  categoryName?: string;
  promptIds: string[];
  featured?: boolean;
  icon?: string;
  targetAudience?: string;
  tags?: string[];
  curatorNotes?: string;
  keyTakeaways?: string[];
  relatedCollectionSlugs?: string[];
  createdAt: string;
  updatedAt: string;
}
