import { DeveloperRule } from "@/types/rule";
import { DEVELOPER_RULES } from "@/data/rules-pages";

export function getAllDeveloperRules(): DeveloperRule[] {
  return DEVELOPER_RULES;
}

export function getDeveloperRuleBySlug(slug: string): DeveloperRule | undefined {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase();
  return DEVELOPER_RULES.find((r) => r.slug.toLowerCase() === normalized);
}

export function getAllRuleSlugs(): string[] {
  return DEVELOPER_RULES.map((r) => r.slug);
}

export function getDeveloperRulesByCategory(category: string): DeveloperRule[] {
  if (!category) return [];
  const normalized = category.trim().toLowerCase();
  return DEVELOPER_RULES.filter((r) => r.techCategory.toLowerCase() === normalized);
}
