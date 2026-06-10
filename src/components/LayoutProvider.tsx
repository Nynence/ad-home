"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type RecentSearchStyle = "none" | "sidebyside";

const DEFAULT_RECENT_SEARCH: RecentSearchStyle = "none";

const LayoutContext = createContext<{
  recentSearch: RecentSearchStyle;
  setRecentSearch: (s: RecentSearchStyle) => void;
}>({
  recentSearch: DEFAULT_RECENT_SEARCH,
  setRecentSearch: () => {},
});

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [recentSearch, _setRecentSearch] = useState<RecentSearchStyle>(DEFAULT_RECENT_SEARCH);

  useEffect(() => {
    _setRecentSearch(read("ad-recent-search", DEFAULT_RECENT_SEARCH));
  }, []);

  const setRecentSearch = (v: RecentSearchStyle) => {
    _setRecentSearch(v);
    write("ad-recent-search", v);
  };

  return (
    <LayoutContext.Provider value={{ recentSearch, setRecentSearch }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  return useContext(LayoutContext);
}

/**
 * Returns the className for the inner container of each below-fold section.
 * Responsive padding: 16px mobile → 32px tablet → 48px desktop.
 */
export function useSectionContainerClass() {
  return "mx-auto w-full max-w-[1440px] px-4 md:px-8 lg:px-12";
}
