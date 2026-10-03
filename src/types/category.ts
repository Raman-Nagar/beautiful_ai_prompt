export interface Category {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  featured?: boolean;
  subcategories?: string[];
  introductoryContent?: string;
  bestModels?: string[];
  createdAt?: string;
  count?: number;
}
