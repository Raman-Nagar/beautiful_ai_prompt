"use client";

import { useSyncExternalStore } from "react";

const SAVED_PROMPTS_KEY = "bap_saved_prompts";
const THEME_KEY = "bap_theme";

// In-memory cache for SSR hydration safety
let savedCache: string[] = [];
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
  if (typeof window === "undefined") return savedCache;
  try {
    const raw = localStorage.getItem(SAVED_PROMPTS_KEY);
    savedCache = raw ? JSON.parse(raw) : [];
    return savedCache;
  } catch {
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

  localStorage.setItem(SAVED_PROMPTS_KEY, JSON.stringify(updated));
  savedCache = updated;
  notify();
  return isNowSaved;
}

export function useSavedPromptIds(): string[] {
  return useSyncExternalStore(
    subscribe,
    getSavedPromptIds,
    () => []
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
  localStorage.setItem(THEME_KEY, theme);
  themeCache = theme;
  notify();
}

export function useStoredTheme(): "dark" | "light" | "system" {
  return useSyncExternalStore(
    subscribe,
    getStoredTheme,
    () => "dark"
  );
}
