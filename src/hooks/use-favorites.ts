"use client";

import { useCallback } from "react";
import {
  toggleSavedPromptId,
  useSavedPromptIds,
} from "@/lib/storage";

const SAVED_PROMPTS_KEY = "bap_saved_prompts";

/**
 * Custom React hook for managing user favorites in local storage without authentication.
 * Backed by useSyncExternalStore for reactive synchronization across tabs and components.
 */
export function useFavorites() {
  const favorites = useSavedPromptIds();

  const isFavorite = useCallback(
    (id: string): boolean => {
      return favorites.includes(id);
    },
    [favorites]
  );

  const toggleFavorite = useCallback((id: string): boolean => {
    return toggleSavedPromptId(id);
  }, []);

  const clearFavorites = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(SAVED_PROMPTS_KEY, JSON.stringify([]));
      window.dispatchEvent(
        new StorageEvent("storage", { key: SAVED_PROMPTS_KEY })
      );
    } catch {
      // Gracefully handle storage quota or private browsing exceptions
    }
  }, []);

  return {
    favorites,
    count: favorites.length,
    isFavorite,
    toggleFavorite,
    clearFavorites,
  };
}
