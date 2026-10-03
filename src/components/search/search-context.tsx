"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { SearchCommandDialog } from "./search-command-dialog";
import { getAllPrompts } from "@/lib/data/prompts";
import { Prompt } from "@/types/prompt";

interface SearchContextType {
  isOpen: boolean;
  openSearch: (query?: string | unknown) => void;
  closeSearch: () => void;
  toggleSearch: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export function SearchProvider({
  children,
  prompts = getAllPrompts(),
}: {
  children: React.ReactNode;
  prompts?: Prompt[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const openSearch = useCallback((query?: string | unknown) => {
    if (typeof query === "string") {
      setSearchQuery(query);
    }
    setIsOpen(true);
  }, []);
  const closeSearch = useCallback(() => setIsOpen(false), []);
  const toggleSearch = useCallback(() => setIsOpen((prev) => !prev), []);

  // Global keyboard shortcut listener for Cmd+K and Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        isOpen,
        openSearch,
        closeSearch,
        toggleSearch,
      }}
    >
      {children}
      <SearchCommandDialog
        isOpen={isOpen}
        onClose={closeSearch}
        prompts={prompts}
        query={searchQuery}
        onQueryChange={setSearchQuery}
      />
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
}
