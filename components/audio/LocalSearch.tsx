"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import { appUi } from "@/lib/app-ui";

interface LocalSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  sticky?: boolean;
}

export function LocalSearch({
  value,
  onChange,
  placeholder = "Search…",
  sticky,
}: LocalSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape" && document.activeElement === inputRef.current) {
        onChange("");
        inputRef.current?.blur();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onChange]);

  return (
    <div className={`relative ${sticky ? "w-full max-w-none" : "max-w-md"}`}>
      <Search
        className={`pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 transition-colors duration-150 ${
          focused ? "text-red-400/80" : "text-slate-500"
        }`}
      />
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        aria-label="Search"
        className={`${appUi.searchInput} pr-20 ${focused ? "border-red-500/30" : ""}`}
      />
      <div className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-1 sm:flex">
        {!value && (
          <kbd className="rounded-md bg-white/[0.05] px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-slate-500 ring-1 ring-white/[0.07]">
            ⌘K
          </kbd>
        )}
      </div>
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange("");
            inputRef.current?.focus();
          }}
          className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-slate-500 transition-[background-color,color,transform] duration-100 ease-out hover:bg-white/[0.06] hover:text-slate-300 active:scale-95"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}

export function useLocalSearch(initial = "") {
  const [query, setQuery] = useState(initial);

  const matches = useCallback(
    (...fields: string[]) => {
      if (!query.trim()) return true;
      const q = query.toLowerCase().trim();
      return fields.some((f) => f.toLowerCase().includes(q));
    },
    [query]
  );

  return { query, setQuery, matches };
}

export function useDebouncedMounted(delay = 80) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setReady(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return ready;
}
