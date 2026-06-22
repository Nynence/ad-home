"use client";

import React, { useEffect, useRef, useState } from "react";
import { SearchIcon, XIcon } from "./icons";
import { STATES } from "@/data/states";

/**
 * SearchModal — the whole panel fades in/out as one unit over a blurred
 * backdrop. No morph from the trigger, no staged reveal.
 *
 * Layout
 *   Mobile  : inset-x-0, top ~5 dvh, bottom 0, rounded-t-2xl
 *   Desktop : centred, max-w-[898px], top-16, bottom-12, rounded-2xl
 */

export default function SearchModal({
  open,
  onClose,
  inputRef: externalInputRef,
}: {
  open: boolean;
  onClose: () => void;
  /** Unused now (kept for the caller); the panel no longer morphs from it. */
  triggerRect: DOMRect | null;
  /** Lifted ref so the parent can focus() synchronously in the tap handler. */
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) {
  const internalInputRef = useRef<HTMLInputElement | null>(null);
  const inputRef = externalInputRef ?? internalInputRef;

  const [selectedStateId, setSelectedStateId] = useState(STATES[0].id);
  const [query,           setQuery]           = useState("");

  // ── Focus the field shortly after opening (parent also focuses on tap) ─────

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, [open]);

  // ── Keyboard + scroll lock ───────────────────────────────────────────────

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  // ── Data ────────────────────────────────────────────────────────────────

  const selectedState =
    STATES.find((s) => s.id === selectedStateId) ?? STATES[0];

  const searchResults = query
    ? STATES.flatMap((state) =>
        state.areas
          .filter((a) => a.name.toLowerCase().includes(query.toLowerCase()))
          .map((a) => ({ ...a, stateId: state.id, stateAbbr: state.abbr })),
      )
    : [];

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <>
      {/* Backdrop — dark tint + blur, fades with the modal */}
      <div
        aria-hidden={!open}
        className={[
          "fixed inset-0 z-50 bg-[rgba(33,34,44,0.4)] backdrop-blur-md transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={onClose}
      />

      {/*
        Modal shell — fades in/out as one unit.

        Mobile  : full-width, top ~5 dvh, flush bottom, top-rounded
        Desktop : centred max-w-[898px], padded top + bottom, fully rounded
      */}
      <div
        role="dialog"
        aria-modal={open}
        aria-label="Search"
        className={[
          "fixed z-[51] flex flex-col overflow-hidden",
          "bg-[var(--background-primary)] shadow-[var(--shadow-xl)]",
          "transition-opacity duration-300 ease-[var(--ease-out)]",
          // Mobile: bottom-sheet
          "inset-x-0 bottom-0 top-[5dvh] rounded-t-2xl",
          // Tablet / desktop: padded card capped to the viewport height
          "md:bottom-auto md:left-8 md:right-8 md:top-16 md:rounded-2xl",
          "md:max-h-[calc(100dvh-128px)]",
          // Desktop: centre-clamp at 898 px
          "lg:inset-x-0 lg:mx-auto lg:max-w-[898px]",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        {/* ── Search field row ──────────────────────────────────────── */}
        <div className="shrink-0">
          <div className="flex items-center gap-4 border-b border-[var(--border-light)] bg-[var(--surface-primary)] px-6 py-4">
            <SearchIcon className="size-5 shrink-0 text-[var(--content-tertiary)]" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by suburb, area or development name"
              aria-label="Search"
              className="min-w-0 flex-1 bg-transparent font-body text-[18px] leading-6 text-[var(--content-primary)] placeholder:text-[var(--content-tertiary)] focus:outline-none"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close search"
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-light)] bg-[var(--surface-primary)] text-[var(--content-secondary)] transition-colors hover:bg-[var(--surface-secondary)] active:scale-95"
            >
              <XIcon className="size-5" />
            </button>
          </div>
        </div>

        {/* ── Body ──────────────────────────────────────────────────── */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="flex flex-col gap-4 p-6">
            <p className="font-heading text-[20px] font-semibold leading-7 tracking-[-0.25px] text-[var(--content-primary)]">
              Start your search by area
            </p>

            {/* ── Search results ──────────────────────────────── */}
            {query && (
              <div className="overflow-hidden rounded-xl border border-[var(--border-light)] bg-[var(--surface-primary)]">
                {searchResults.length === 0 ? (
                  <p className="px-6 py-8 text-center font-body text-[16px] text-[var(--content-tertiary)]">
                    No areas found for &ldquo;{query}&rdquo;
                  </p>
                ) : (
                  searchResults.map((area, i) => (
                    <a
                      key={`${area.stateId}-${area.id}`}
                      href={`/search?state=${area.stateId}&area=${area.id}`}
                      onClick={onClose}
                      className={[
                        "flex items-center justify-between px-6 py-3 transition-colors hover:bg-[var(--surface-secondary)]",
                        i > 0 ? "border-t border-[var(--border-subtle)]" : "",
                      ].join(" ")}
                    >
                      <span className="flex flex-col">
                        <span className="font-body text-[16px] font-medium leading-6 text-[var(--content-primary)]">
                          {area.name}
                        </span>
                        <span className="font-body text-[12px] leading-4 text-[var(--content-tertiary)]">
                          {area.stateAbbr}
                        </span>
                      </span>
                      <span className="font-body text-[12px] leading-4 text-[var(--content-tertiary)]">
                        {area.count} developments
                      </span>
                    </a>
                  ))
                )}
              </div>
            )}

            {/* ── Browse by state ─────────────────────────────── */}
            {!query && (
              <div className="overflow-hidden rounded-xl border border-[var(--border-light)] bg-[var(--surface-primary)]">
                {/* Scrollable state tab strip */}
                <div className="relative border-b border-[var(--border-light)] p-4">
                  <div className="scrollbar-hide flex gap-3 overflow-x-auto">
                    {STATES.map((state) => {
                      const isActive = state.id === selectedStateId;
                      return (
                        <button
                          key={state.id}
                          type="button"
                          onClick={() => setSelectedStateId(state.id)}
                          className={[
                            "flex shrink-0 flex-col items-start rounded-xl px-4 py-3 text-left transition-colors",
                            isActive
                              ? "border-2 border-[var(--content-brand)] bg-[var(--surface-subtle-brand)]"
                              : "border border-[var(--border-light)] hover:bg-[var(--surface-secondary)]",
                          ].join(" ")}
                        >
                          <span className="font-body text-[16px] font-medium leading-6 text-[var(--content-primary)]">
                            {state.abbr}
                          </span>
                          <span className="font-body text-[14px] leading-5 text-[var(--content-tertiary)]">
                            {state.count} developments
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {/* Right-edge fade */}
                  <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[var(--surface-primary)] to-transparent" />
                </div>

                {/* "All of [State]" */}
                <a
                  href={`/search?state=${selectedState.id}`}
                  onClick={onClose}
                  className="flex items-center justify-between px-6 py-3 transition-colors hover:bg-[var(--surface-secondary)]"
                >
                  <span className="font-body text-[16px] font-medium leading-6 text-[var(--content-primary)]">
                    All of {selectedState.name}
                  </span>
                  <span className="font-body text-[12px] leading-4 text-[var(--content-tertiary)]">
                    {selectedState.count} developments
                  </span>
                </a>

                {/* Individual areas */}
                {selectedState.areas.map((area) => (
                  <a
                    key={area.id}
                    href={`/search?state=${selectedState.id}&area=${area.id}`}
                    onClick={onClose}
                    className="flex items-center justify-between border-t border-[var(--border-subtle)] py-3 pl-12 pr-6 transition-colors hover:bg-[var(--surface-secondary)]"
                  >
                    <span className="font-body text-[16px] font-medium leading-6 text-[var(--content-primary)]">
                      {area.name}
                    </span>
                    <span className="font-body text-[12px] leading-4 text-[var(--content-tertiary)]">
                      {area.count} developments
                    </span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
