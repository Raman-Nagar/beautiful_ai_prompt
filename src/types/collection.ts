export interface WorkflowStep {
  step: number;
  title: string;
  description: string;
  promptId?: string;
}

export interface Collection {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  editorialOverview?: string;
  category: string;
  categoryName?: string;
  categoryIds?: string[];
  promptIds: string[];
  tags: string[];
  featured: boolean;
  icon?: string;
  targetAudience?: string;
  curatorNotes?: string;
  keyTakeaways?: string[];
  workflowSteps?: WorkflowStep[];
  relatedCollectionSlugs?: string[];
  createdAt: string;
  updatedAt: string;
}

