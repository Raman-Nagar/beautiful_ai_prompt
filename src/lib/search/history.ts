"use client";

import { useSyncExternalStore } from "react";

const RECENT_SEARCHES_KEY = "bap_recent_searches";
const MAX_RECENT_SEARCHES = 8;

const EMPTY_RECENT_SEARCHES: string[] = [];
let lastRecentRaw: string | null = null;
let recentCache: string[] = EMPTY_RECENT_SEARCHES;
const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((listener) => listener());
}

function subscribe(callback: () => void) {
  listeners.add(callback);
  const handleStorage = (e: StorageEvent) => {
    if (e.key === RECENT_SEARCHES_KEY) {
      callback();
    }
  };
  window.addEventListener("storage", handleStorage);
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", handleStorage);
  };
}

export function getRecentSearches(): string[] {
  if (typeof window === "undefined") return EMPTY_RECENT_SEARCHES;
  try {
    const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
    if (raw !== lastRecentRaw) {
      lastRecentRaw = raw;
      recentCache = raw ? JSON.parse(raw) : EMPTY_RECENT_SEARCHES;
    }
    return recentCache;
  } catch {
    return recentCache;
  }
}

export function addRecentSearch(query: string): void {
  if (typeof window === "undefined") return;
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) return;

  const current = getRecentSearches();
  // Filter out existing and prepend new query to top
  const updated = [trimmed, ...current.filter((item) => item.toLowerCase() !== trimmed.toLowerCase())].slice(
    0,
    MAX_RECENT_SEARCHES
  );

  try {
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    recentCache = updated;
    notify();
  } catch {
    // Ignore storage quota errors
  }
}

export function removeRecentSearch(query: string): void {
  if (typeof window === "undefined") return;
  const current = getRecentSearches();
  const updated = current.filter((item) => item.toLowerCase() !== query.toLowerCase());

  try {
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    recentCache = updated;
    notify();
  } catch {
    // Ignore
  }
}

export function clearRecentSearches(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
    recentCache = [];
    notify();
  } catch {
    // Ignore
  }
}

export function useRecentSearches(): {
  recentSearches: string[];
  addSearch: (query: string) => void;
  removeSearch: (query: string) => void;
  clearSearches: () => void;
} {
  const recentSearches = useSyncExternalStore(
    subscribe,
    getRecentSearches,
    () => EMPTY_RECENT_SEARCHES
  );

  return {
    recentSearches,
    addSearch: addRecentSearch,
    removeSearch: removeRecentSearch,
    clearSearches: clearRecentSearches,
  };
}
