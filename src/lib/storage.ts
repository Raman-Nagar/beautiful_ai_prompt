"use client";

import { useSyncExternalStore } from "react";

const SAVED_PROMPTS_KEY = "bap_saved_prompts";
const THEME_KEY = "bap_theme";

const EMPTY_SAVED_IDS: string[] = [];
let lastSavedRaw: string | null = null;
let savedCache: string[] = EMPTY_SAVED_IDS;
let themeCache: "dark" | "light" | "system" = "dark";

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  const handleStorage = (e: StorageEvent) => {
    if (e.key === SAVED_PROMPTS_KEY || e.key === THEME_KEY) {
      callback();
    }
  };
  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", handleStorage);
  };
}

export function getSavedPromptIds(): string[] {
  if (typeof window === "undefined") return EMPTY_SAVED_IDS;
  try {
    const raw = localStorage.getItem(SAVED_PROMPTS_KEY);
    if (raw !== lastSavedRaw) {
      lastSavedRaw = raw;
      if (!raw) {
        savedCache = EMPTY_SAVED_IDS;
      } else {
        const parsed = JSON.parse(raw);
        savedCache = Array.isArray(parsed)
          ? parsed.filter((item): item is string => typeof item === "string")
          : EMPTY_SAVED_IDS;
      }
    }
    return savedCache;
  } catch {
    savedCache = EMPTY_SAVED_IDS;
    return savedCache;
  }
}

export function toggleSavedPromptId(id: string): boolean {
  if (typeof window === "undefined") return false;
  const current = getSavedPromptIds();
  let updated: string[];
  let isNowSaved = false;

  if (current.includes(id)) {
    updated = current.filter((item) => item !== id);
    isNowSaved = false;
  } else {
    updated = [...current, id];
    isNowSaved = true;
  }

  try {
    const serialized = JSON.stringify(updated);
    localStorage.setItem(SAVED_PROMPTS_KEY, serialized);
    lastSavedRaw = serialized;
    savedCache = updated;
    notify();
  } catch {
    // Gracefully handle storage quota or private browsing exceptions
    savedCache = updated;
    notify();
  }
  return isNowSaved;
}

export function useSavedPromptIds(): string[] {
  return useSyncExternalStore(
    subscribe,
    getSavedPromptIds,
    () => EMPTY_SAVED_IDS
  );
}

export function getStoredTheme(): "dark" | "light" | "system" {
  if (typeof window === "undefined") return themeCache;
  try {
    const raw = localStorage.getItem(THEME_KEY);
    if (raw === "dark" || raw === "light" || raw === "system") {
      themeCache = raw;
      return themeCache;
    }
    return "dark";
  } catch {
    return "dark";
  }
}

export function setStoredTheme(theme: "dark" | "light" | "system") {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(THEME_KEY, theme);
    themeCache = theme;
    notify();
  } catch {
    themeCache = theme;
    notify();
  }
}

export function useStoredTheme(): "dark" | "light" | "system" {
  return useSyncExternalStore(
    subscribe,
    getStoredTheme,
    () => "dark"
  );
}
