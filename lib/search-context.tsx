"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface SearchContextValue {
  query: string;
  setQuery: (query: string) => void;
  matchesQuery: (text: string) => boolean;
}

const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = useState("");

  const matchesQuery = useCallback(
    (text: string) => {
      if (!query.trim()) return true;
      return text.toLowerCase().includes(query.toLowerCase().trim());
    },
    [query]
  );

  const value = useMemo(
    () => ({ query, setQuery, matchesQuery }),
    [query, matchesQuery]
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within SearchProvider");
  }
  return context;
}
