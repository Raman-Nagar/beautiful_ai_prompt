import { MatrixPage } from "@/types/matrix";
import { MATRIX_PAGES } from "@/data/matrix-pages";

export function getAllMatrixPages(): MatrixPage[] {
  return MATRIX_PAGES;
}

export function getMatrixPageBySlug(slug: string): MatrixPage | undefined {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase();
  return MATRIX_PAGES.find((p) => p.slug.toLowerCase() === normalized);
}

export function getMatrixPagesByModel(modelId: string): MatrixPage[] {
  if (!modelId) return [];
  const normalized = modelId.trim().toLowerCase();
  return MATRIX_PAGES.filter((p) => p.modelId.toLowerCase() === normalized);
}

export function getMatrixPagesByCategory(categorySlug: string): MatrixPage[] {
  if (!categorySlug) return [];
  const normalized = categorySlug.trim().toLowerCase();
  return MATRIX_PAGES.filter((p) => p.categorySlug.toLowerCase() === normalized);
}

export function getAllMatrixSlugs(): string[] {
  return MATRIX_PAGES.map((p) => p.slug);
}
