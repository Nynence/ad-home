"use client";

import { useState, useEffect, useRef } from "react";
import {
  MenuIcon,
  BinocularsIcon,
  SunIcon,
  MoonIcon,
  XIcon,
} from "./icons";
import { useTheme } from "./ThemeProvider";
import { useLayout } from "./LayoutProvider";

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  const { recentSearch, setRecentSearch } = useLayout();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;
      if (window.innerWidth >= 768) {
        if (delta > 4 && currentY > 60) {
          setHidden(true);
        } else if (delta < -4) {
          setHidden(false);
        }
      }
      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const recentSearchOn = recentSearch === "sidebyside";

  return (
    <>
      <nav className={[
        "flex h-16 items-center justify-between border-b border-[var(--border-subtle)] bg-[var(--background-primary)] px-4 transition-colors duration-500 md:h-[72px] md:px-[var(--spacing-3xl)]",
        "md:fixed md:top-0 md:left-0 md:right-0 md:z-30 md:transition-transform md:duration-300 md:ease-[var(--ease-out)]",
        hidden ? "md:-translate-y-full" : "md:translate-y-0",
      ].join(" ")}>
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
          {/* Recent search toggle */}
          <div className="flex flex-col gap-2">
            <p className="font-body text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--content-tertiary)]">
              Recent Search
            </p>
            <button
              type="button"
              role="switch"
              aria-checked={recentSearchOn}
              onClick={() => setRecentSearch(recentSearchOn ? "none" : "sidebyside")}
              className="flex items-center justify-between rounded-xl border border-[var(--border-light)] px-4 py-3 transition-colors duration-150 hover:bg-[var(--surface-secondary)]"
            >
              <span className="font-body text-[14px] font-medium leading-5 text-[var(--content-primary)]">
                Show recent search
              </span>
              {/* Toggle pill */}
              <span
                className={[
                  "relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors duration-200",
                  recentSearchOn ? "bg-[var(--content-primary)]" : "bg-[var(--surface-secondary)]",
                ].join(" ")}
              >
                <span
                  className={[
                    "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200",
                    recentSearchOn ? "translate-x-[22px]" : "translate-x-0.5",
                  ].join(" ")}
                />
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
