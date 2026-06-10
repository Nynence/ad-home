"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type CardLayout = "slider" | "grid" | "accordion";
export type RecentSearchStyle =
  | "none"
  | "pill"
  | "sidebyside"
  | "tab"
  | "iconhover"
  | "sectionabove";
export type StateListStyle = "underline" | "card" | "mixed";

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_CARD_LAYOUT: CardLayout       = "accordion";
const DEFAULT_RECENT_SEARCH: RecentSearchStyle = "none";
const DEFAULT_STATE_LIST: StateListStyle    = "mixed";

// ── Context ───────────────────────────────────────────────────────────────────
const LayoutContext = createContext<{
  cardLayout: CardLayout;
  setCardLayout: (l: CardLayout) => void;
  recentSearch: RecentSearchStyle;
  setRecentSearch: (s: RecentSearchStyle) => void;
  stateList: StateListStyle;
  setStateList: (s: StateListStyle) => void;
}>({
  cardLayout: DEFAULT_CARD_LAYOUT,
  setCardLayout: () => {},
  recentSearch: DEFAULT_RECENT_SEARCH,
  setRecentSearch: () => {},
  stateList: DEFAULT_STATE_LIST,
  setStateList: () => {},
});

// ── Helpers ───────────────────────────────────────────────────────────────────
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

// ── Provider ──────────────────────────────────────────────────────────────────
export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [cardLayout, _setCardLayout] = useState<CardLayout>(DEFAULT_CARD_LAYOUT);
  const [recentSearch, _setRecentSearch] = useState<RecentSearchStyle>(DEFAULT_RECENT_SEARCH);
  const [stateList, _setStateList] = useState<StateListStyle>(DEFAULT_STATE_LIST);

  // Hydrate from localStorage after mount so SSR and client match on first render.
  useEffect(() => {
    _setCardLayout(read("ad-card-layout", DEFAULT_CARD_LAYOUT));
    _setRecentSearch(read("ad-recent-search", DEFAULT_RECENT_SEARCH));
    _setStateList(read("ad-state-list", DEFAULT_STATE_LIST));
  }, []);

  const setCardLayout = (v: CardLayout) => {
    _setCardLayout(v);
    write("ad-card-layout", v);
  };
  const setRecentSearch = (v: RecentSearchStyle) => {
    _setRecentSearch(v);
    write("ad-recent-search", v);
  };
  const setStateList = (v: StateListStyle) => {
    _setStateList(v);
    write("ad-state-list", v);
  };

  return (
    <LayoutContext.Provider
      value={{ cardLayout, setCardLayout, recentSearch, setRecentSearch, stateList, setStateList }}
    >
      {children}
    </LayoutContext.Provider>
  );
}

export function useLayout() {
  return useContext(LayoutContext);
}
