"use client";

import { useState } from "react";
import {
  MenuIcon,
  BinocularsIcon,
  SunIcon,
  MoonIcon,
  XIcon,
  GridFourIcon,
  SlideshowIcon,
  AccordionIcon,
  ProhibitIcon,
  PillIcon,
  ColumnsIcon,
  TabsIcon,
  CursorClickIcon,
  BannerIcon,
  ListIcon,
  CardsIcon,
} from "./icons";
import { useTheme } from "./ThemeProvider";
import {
  useLayout,
  type CardLayout,
  type RecentSearchStyle,
  type StateListStyle,
} from "./LayoutProvider";

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  const {
    cardLayout,
    setCardLayout,
    recentSearch,
    setRecentSearch,
    stateList,
    setStateList,
  } = useLayout();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--background-primary)] px-4 py-[var(--spacing-lg)] transition-colors duration-500 md:px-[var(--spacing-3xl)]">
        <div className="flex flex-1 items-center">
          <button
            onClick={() => setMenuOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-150 hover:bg-[var(--surface-secondary)] active:scale-95"
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <MenuIcon />
          </button>
        </div>

        <div className="flex shrink-0 flex-col items-center">
          <span className="text-[14px] font-semibold leading-[18px] underline underline-offset-2">
            Apartments &amp;
          </span>
          <span className="text-[14px] font-semibold leading-[18px] underline underline-offset-2">
            Developments
          </span>
        </div>

        <div className="flex flex-1 items-center justify-end gap-[var(--spacing-sm)]">
          <button
            type="button"
            className="group flex h-10 w-10 items-center justify-center rounded-full transition hover:bg-[var(--surface-secondary)] active:scale-95 md:h-auto md:w-auto md:gap-2 md:px-[var(--spacing-2xl)] md:py-[var(--spacing-md)]"
          >
            <BinocularsIcon className="h-5 w-5 shrink-0 transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-110" />
            <span className="hidden text-[16px] font-medium leading-6 md:inline">
              Recently viewed
            </span>
          </button>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggle}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            className="group flex h-10 w-10 items-center justify-center rounded-full transition-all duration-150 hover:bg-[var(--surface-secondary)] active:scale-95"
          >
            {isDark ? (
              <SunIcon className="h-5 w-5 transition-transform duration-500 ease-[var(--ease-out)] group-hover:rotate-90" />
            ) : (
              <MoonIcon className="h-5 w-5 transition-transform duration-500 ease-[var(--ease-out)] group-hover:-rotate-12" />
            )}
          </button>
        </div>
      </nav>

      {/* ── Menu drawer ── */}

      {/* Backdrop */}
      <div
        aria-hidden={!menuOpen}
        className={[
          "fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ease-[var(--ease-out)]",
          menuOpen ? "opacity-100" : "opacity-0 pointer-events-none",
        ].join(" ")}
        onClick={() => setMenuOpen(false)}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal={menuOpen}
        aria-label="Menu"
        className={[
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-[var(--background-primary)] shadow-xl transition-transform duration-300 ease-[var(--ease-out)]",
          menuOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-6 py-4">
          <span className="font-heading text-[18px] font-semibold tracking-[-0.3px] text-[var(--content-primary)]">
            Menu
          </span>
          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--content-secondary)] transition-all duration-150 hover:bg-[var(--surface-secondary)] active:scale-95"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Drawer content */}
        <div className="flex flex-col gap-6 overflow-y-auto p-6">
          {/* Card layout — vertical list */}
          <div className="flex flex-col gap-2">
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--content-tertiary)]">
              Card Layout
            </p>
            <div className="flex flex-col overflow-hidden rounded-xl border border-[var(--border-light)]">
              {(
                [
                  { key: "accordion", label: "Inline",  desc: "Card expands below each state (mobile only)", icon: <AccordionIcon className="h-4 w-4" /> },
                  { key: "slider",    label: "Slider",  desc: "One area at a time, auto-rotates",           icon: <SlideshowIcon className="h-4 w-4" /> },
                  { key: "grid",      label: "Grid",    desc: "Up to 3 areas shown simultaneously",         icon: <GridFourIcon  className="h-4 w-4" /> },
                ] as const
              ).map(({ key, label, desc, icon }, i) => {
                const active = cardLayout === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setCardLayout(key)}
                    className={[
                      "flex items-center gap-3 px-4 py-3 text-left transition-colors duration-150",
                      i > 0 ? "border-t border-[var(--border-light)]" : "",
                      active
                        ? "bg-[var(--content-primary)] text-[var(--content-inverse-primary)]"
                        : "bg-transparent text-[var(--content-secondary)] hover:bg-[var(--surface-secondary)]",
                    ].join(" ")}
                  >
                    <span className="shrink-0">{icon}</span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="font-body text-[14px] font-medium leading-5">{label}</span>
                      <span className={`font-body text-[11px] leading-4 ${active ? "opacity-70" : "text-[var(--content-tertiary)]"}`}>{desc}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Recent search — vertical list */}
          <div className="flex flex-col gap-2">
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--content-tertiary)]">
              Recent Search
            </p>
            <div className="flex flex-col overflow-hidden rounded-xl border border-[var(--border-light)]">
              {(
                [
                  { key: "none",         label: "None",         desc: "Hide the recent search",               icon: <ProhibitIcon     className="h-4 w-4" /> },
                  { key: "pill",         label: "Pill",         desc: "A pill below the search bar",          icon: <PillIcon         className="h-4 w-4" /> },
                  { key: "sidebyside",   label: "Side by side", desc: "Recent search beside the search bar",  icon: <ColumnsIcon      className="h-4 w-4" /> },
                  { key: "tab",          label: "Tab",          desc: "Toggle between Search and Recent",     icon: <TabsIcon         className="h-4 w-4" /> },
                  { key: "iconhover",    label: "Icon on hover", desc: "Icon expands on hover to reveal it",  icon: <CursorClickIcon  className="h-4 w-4" /> },
                  { key: "sectionabove", label: "Section above", desc: "A banner above the search bar",       icon: <BannerIcon       className="h-4 w-4" /> },
                ] as const
              ).map(({ key, label, desc, icon }, i) => {
                const active = recentSearch === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setRecentSearch(key as RecentSearchStyle)}
                    className={[
                      "flex items-center gap-3 px-4 py-3 text-left transition-colors duration-150",
                      i > 0 ? "border-t border-[var(--border-light)]" : "",
                      active
                        ? "bg-[var(--content-primary)] text-[var(--content-inverse-primary)]"
                        : "bg-transparent text-[var(--content-secondary)] hover:bg-[var(--surface-secondary)]",
                    ].join(" ")}
                  >
                    <span className="shrink-0">{icon}</span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="font-body text-[14px] font-medium leading-5">{label}</span>
                      <span className={`font-body text-[11px] leading-4 ${active ? "opacity-70" : "text-[var(--content-tertiary)]"}`}>{desc}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Styles — vertical list */}
          <div className="flex flex-col gap-2">
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--content-tertiary)]">
              Styles
            </p>
            <div className="flex flex-col overflow-hidden rounded-xl border border-[var(--border-light)]">
              {(
                [
                  { key: "mixed",     label: "Mixed",     desc: "Underline on desktop, cards on mobile", icon: <ColumnsIcon className="h-4 w-4" /> },
                  { key: "underline", label: "Underline", desc: "Rows divided by underlines",            icon: <ListIcon    className="h-4 w-4" /> },
                  { key: "card",      label: "Card",      desc: "Active state as a filled card",         icon: <CardsIcon   className="h-4 w-4" /> },
                ] as const
              ).map(({ key, label, desc, icon }, i) => {
                const active = stateList === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setStateList(key as StateListStyle)}
                    className={[
                      "flex items-center gap-3 px-4 py-3 text-left transition-colors duration-150",
                      i > 0 ? "border-t border-[var(--border-light)]" : "",
                      active
                        ? "bg-[var(--content-primary)] text-[var(--content-inverse-primary)]"
                        : "bg-transparent text-[var(--content-secondary)] hover:bg-[var(--surface-secondary)]",
                    ].join(" ")}
                  >
                    <span className="shrink-0">{icon}</span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="font-body text-[14px] font-medium leading-5">{label}</span>
                      <span className={`font-body text-[11px] leading-4 ${active ? "opacity-70" : "text-[var(--content-tertiary)]"}`}>{desc}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

