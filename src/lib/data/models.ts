import { AI_MODELS } from "@/data/models";
import { AIModel, AIModelId } from "@/types/model";

/**
 * Retrieves all supported AI models
 */
export function getAllModels(): AIModel[] {
  return AI_MODELS;
}

/**
 * Retrieves a model by its identifier
 */
export function getModelById(id: AIModelId | string): AIModel | undefined {
  return AI_MODELS.find((m) => m.id === id);
}

/**
 * Retrieves popular models
 */
export function getPopularModels(): AIModel[] {
  return AI_MODELS.filter((m) => m.isPopular);
}
