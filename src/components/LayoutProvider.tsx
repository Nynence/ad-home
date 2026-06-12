"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type RecentSearchStyle = "none" | "sidebyside";

const DEFAULT_RECENT_SEARCH: RecentSearchStyle = "none";
const DEFAULT_GRID_BACKDROP = true;
// Opacity of the resting black-and-white mosaic layer (0–1). The mouse-trail
// colour layer is unaffected; this only controls how visible the idle grid is.
const DEFAULT_MOSAIC_BRIGHTNESS = 0.2;

const LayoutContext = createContext<{
  recentSearch: RecentSearchStyle;
  setRecentSearch: (s: RecentSearchStyle) => void;
  gridBackdrop: boolean;
  setGridBackdrop: (v: boolean) => void;
  mosaicBrightness: number;
  setMosaicBrightness: (v: number) => void;
}>({
  recentSearch: DEFAULT_RECENT_SEARCH,
  setRecentSearch: () => {},
  gridBackdrop: DEFAULT_GRID_BACKDROP,
  setGridBackdrop: () => {},
  mosaicBrightness: DEFAULT_MOSAIC_BRIGHTNESS,
  setMosaicBrightness: () => {},
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
  const [gridBackdrop, _setGridBackdrop] = useState<boolean>(DEFAULT_GRID_BACKDROP);
  const [mosaicBrightness, _setMosaicBrightness] = useState<number>(DEFAULT_MOSAIC_BRIGHTNESS);

  useEffect(() => {
    _setRecentSearch(read("ad-recent-search", DEFAULT_RECENT_SEARCH));
    _setGridBackdrop(read("ad-grid-backdrop", DEFAULT_GRID_BACKDROP));
    _setMosaicBrightness(read("ad-mosaic-brightness", DEFAULT_MOSAIC_BRIGHTNESS));
  }, []);

  const setRecentSearch = (v: RecentSearchStyle) => {
    _setRecentSearch(v);
    write("ad-recent-search", v);
  };

  const setGridBackdrop = (v: boolean) => {
    _setGridBackdrop(v);
    write("ad-grid-backdrop", v);
  };

  const setMosaicBrightness = (v: number) => {
    const clamped = Math.min(1, Math.max(0, v));
    _setMosaicBrightness(clamped);
    write("ad-mosaic-brightness", clamped);
  };

  return (
    <LayoutContext.Provider
      value={{
        recentSearch,
        setRecentSearch,
        gridBackdrop,
        setGridBackdrop,
        mosaicBrightness,
        setMosaicBrightness,
      }}
    >
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
