"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import {
  groupSearchResults,
  globalSearchIndex,
  searchCategoryLabels,
  searchGlobalIndex,
} from "@/data/search-index";
import type { SearchResult } from "@/data/search-index";
import { useSearch } from "@/lib/search-context";
import { appUi } from "@/lib/app-ui";

export function GlobalSearchBar() {
  const { query, setQuery } = useSearch();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const results = query.trim() ? searchGlobalIndex(query, 16) : [];
  const grouped = groupSearchResults(results);
  const flatResults = results;

  useEffect(() => {
    setActiveIndex(0);
    setOpen(query.trim().length > 0);
  }, [query]);

  useEffect(() => {
    if (!open || !resultsRef.current) return;
    const active = resultsRef.current.querySelector("[data-active='true']");
    active?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const navigate = useCallback(
    (result: SearchResult) => {
      setQuery("");
      setOpen(false);
      router.push(result.href);
    },
    [router, setQuery]
  );

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!open || flatResults.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % flatResults.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + flatResults.length) % flatResults.length);
    } else if (e.key === "Enter" && flatResults[activeIndex]) {
      e.preventDefault();
      navigate(flatResults[activeIndex]);
    }
  }

  let flatOffset = 0;

  return (
    <div ref={containerRef} className="relative w-full">
      <Search
        className={`pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-150 ${
          focused ? "text-[#FF5A00]/85" : "text-white/45"
        }`}
        aria-hidden
      />
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => {
          setFocused(true);
          if (query.trim()) setOpen(true);
        }}
        onBlur={() => setFocused(false)}
        onKeyDown={handleKeyDown}
        placeholder="Search pages, equipment, channels…"
        className={`${appUi.searchInput} pr-16 ${focused ? "border-[#FF5A00]/30" : ""}`}
        aria-label="Search portal"
        aria-expanded={open}
        aria-controls="global-search-results"
        aria-activedescendant={
          open && flatResults[activeIndex]
            ? `search-result-${flatResults[activeIndex].id}`
            : undefined
        }
        autoComplete="off"
        role="combobox"
      />
      <div className="pointer-events-none absolute right-10 top-1/2 hidden -translate-y-1/2 sm:block">
        {!query && (
          <kbd className="rounded-md bg-white/[0.05] px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-slate-500 ring-1 ring-white/[0.07]">
            ⌘K
          </kbd>
        )}
      </div>
      {query && (
        <button
          type="button"
          onClick={() => {
            setQuery("");
            setOpen(false);
            inputRef.current?.focus();
          }}
          className="absolute right-0 top-1/2 flex min-h-[44px] min-w-[44px] -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition-[background-color,color,transform] duration-200 ease-out hover:bg-white/[0.06] hover:text-slate-300 active:scale-95"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      {open && query.trim() && (
        <div
          id="global-search-results"
          ref={resultsRef}
          className={appUi.searchDropdown}
          role="listbox"
        >
          {results.length === 0 ? (
            <p className="px-4 py-8 text-center text-[13px] text-slate-500">
              No results for &ldquo;{query}&rdquo;
            </p>
          ) : (
            <div className="p-1.5">
              {(Object.keys(grouped) as Array<keyof typeof grouped>).map((cat) => {
                const items = grouped[cat];
                if (!items?.length) return null;
                return (
                  <div key={cat} className="mb-1 last:mb-0">
                    <p className="px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-500">
                      {searchCategoryLabels[cat]}
                    </p>
                    {items.map((result) => {
                      const idx = flatOffset++;
                      const isActive = idx === activeIndex;
                      return (
                        <button
                          key={result.id}
                          id={`search-result-${result.id}`}
                          type="button"
                          role="option"
                          aria-selected={isActive}
                          data-active={isActive}
                          onClick={() => navigate(result)}
                          onMouseEnter={() => setActiveIndex(idx)}
                          className={`${appUi.searchResult} ${
                            isActive ? appUi.searchResultActive : appUi.searchResultIdle
                          }`}
                        >
                          <span className="text-[13px] font-medium text-slate-100">
                            {result.title}
                          </span>
                          {result.subtitle && (
                            <span className="mt-0.5 line-clamp-1 text-xs text-slate-500">
                              {result.subtitle}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
          <div className="border-t border-white/[0.05] px-3 py-2 text-[10px] tabular-nums text-slate-600">
            {globalSearchIndex.length} indexed · ↑↓ · Enter
          </div>
        </div>
      )}
    </div>
  );
}
