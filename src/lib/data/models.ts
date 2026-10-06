import { AI_MODELS } from "@/data/models";
import { MODEL_DETAILS, getModelDetail, getAllModelDetails } from "@/data/model-details";
import { AIModel, AIModelId, ModelDetail } from "@/types/model";

export { MODEL_DETAILS, getModelDetail, getAllModelDetails };

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

/**
 * Retrieves visual generative AI models (Midjourney, FLUX, SDXL, DALL-E)
 */
export function getVisualModels(): AIModel[] {
  return AI_MODELS.filter((m) => m.engine === "visual");
}

/**
 * Retrieves LLM & text reasoning models (Claude, ChatGPT, Gemini, etc.)
 */
export function getLlmModels(): AIModel[] {
  return AI_MODELS.filter((m) => m.engine === "llm" || !m.engine);
}

/**
 * Retrieves full technical details for a model ID
 */
export function getFullModelDetail(id: string): ModelDetail | undefined {
  return getModelDetail(id);
}

