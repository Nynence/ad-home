"use client";

import React, { useEffect, useRef, useState } from "react";
import { SearchIcon, XIcon } from "./icons";
import { STATES } from "@/data/states";

/**
 * SearchModal — two-phase morph animation
 *
 * Phase A (0 → 420 ms)
 *   clip-path: inset() shrinks the modal to match the trigger pill (search bar)
 *   then expands to reveal just the search-field row.
 *
 * Phase B (350 → 750 ms)
 *   clip-path opens to the full modal height while the body section below the
 *   search field expands via grid-template-rows (0fr → 1fr).
 *   Content fades in as the body opens.
 *
 * Both clip-path and grid-template-rows are GPU-composited — no layout shift.
 *
 * Layout
 *   Mobile  : inset-x-0, top ~5 dvh, bottom 0, rounded-t-2xl
 *   Desktop : centred, max-w-[898px], top-16, bottom-12, rounded-2xl
 */

export default function SearchModal({
  open,
  onClose,
  triggerRect,
  inputRef: externalInputRef,
}: {
  open: boolean;
  onClose: () => void;
  triggerRect: DOMRect | null;
  /** Lifted ref so the parent can focus() synchronously in the tap handler. */
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) {
  const modalRef     = useRef<HTMLDivElement>(null);
  const searchRowRef = useRef<HTMLDivElement>(null);
  const internalInputRef = useRef<HTMLInputElement | null>(null);
  const inputRef = externalInputRef ?? internalInputRef;

  const [selectedStateId, setSelectedStateId] = useState(STATES[0].id);
  const [query,           setQuery]           = useState("");

  // Search field row fades in during Phase A.
  const [searchRowVisible, setSearchRowVisible] = useState(false);
  // Body grid collapses to 0 and expands during Phase B.
  const [bodyExpanded,     setBodyExpanded]     = useState(false);
  // Body content fades in once the grid has started opening.
  const [bodyVisible,      setBodyVisible]      = useState(false);

  // ── Animation ───────────────────────────────────────────────────────────

  useEffect(() => {
    const modal     = modalRef.current;
    const searchRow = searchRowRef.current;
    if (!modal) return;

    // Branched per breakpoint — evaluated at run-time inside the effect so
    // it always reflects the current viewport at the moment open fires.
    const isMobile = window.innerWidth < 768;
    const ease     = "cubic-bezier(0.16,1,0.3,1)";

    // Collects cleanup handles so the effect always returns a single cleanup fn.
    const cleanups: (() => void)[] = [];

    // ────────────────────────────────────────────────────────────────────────
    if (open) {
      setSearchRowVisible(false);
      setBodyExpanded(false);
      setBodyVisible(false);

      modal.style.transition = "none";
      modal.style.opacity    = "1";

      if (isMobile) {
        // ── Mobile: standard bottom-sheet slide-up ──────────────────────
        // Reset any desktop clip-path state, then slide from off-screen.
        modal.style.clipPath  = "";
        modal.style.transform = "translateY(100%)";

        const id = requestAnimationFrame(() => {
          void modal.getBoundingClientRect(); // commit initial translateY(100%)
          modal.style.transition = `transform 480ms ${ease}`;
          modal.style.transform  = "translateY(0)";

          // Content visible during slide — no staged reveal needed.
          setSearchRowVisible(true);
          setBodyExpanded(true);

          const t1 = setTimeout(() => setBodyVisible(true), 60);
          const t2 = setTimeout(() => inputRef.current?.focus(), 300);
          cleanups.push(() => { clearTimeout(t1); clearTimeout(t2); });
        });
        cleanups.push(() => cancelAnimationFrame(id));

      } else if (triggerRect) {
        // ── Desktop / tablet: FLIP transform morph ──────────────────────
        //
        // clip-path was unreliable here because the modal fills the full
        // viewport height — the inset percentages ended up near 100% from
        // the top, producing an invisible starting state with nothing to
        // transition from.
        //
        // transform + scale is simpler and always visible: we compress the
        // modal (which is already at its final CSS position) to match the
        // search bar's size/position, then animate the transform back to
        // identity.  Content stays opacity-0 during the morph so only the
        // white background shape is visible — exactly the pill → card effect.

        const mr = modal.getBoundingClientRect();

        // Centre-to-centre translate + scale (transform-origin is center by default).
        const barCx = triggerRect.left + triggerRect.width  / 2;
        const barCy = triggerRect.top  + triggerRect.height / 2;
        const modCx = mr.left + mr.width  / 2;
        const modCy = mr.top  + mr.height / 2;

        const dx     = barCx - modCx;
        const dy     = barCy - modCy;
        const scaleX = triggerRect.width  / mr.width;
        const scaleY = triggerRect.height / mr.height;

        // Apply initial (trigger) state — no paint yet.
        modal.style.clipPath     = "";
        modal.style.transform    = `translate(${dx}px, ${dy}px) scale(${scaleX}, ${scaleY})`;
        modal.style.borderRadius = "9999px";

        let tA1: ReturnType<typeof setTimeout>;
        let tA2: ReturnType<typeof setTimeout>;
        let tA3: ReturnType<typeof setTimeout>;

        const id = requestAnimationFrame(() => {
          // Force layout commit so the browser treats this as a transition,
          // not a same-frame style update.
          void modal.getBoundingClientRect();

          // Phase A: pill → full-size card at its CSS position
          modal.style.transition   = `transform 460ms ${ease}, border-radius 400ms ${ease}`;
          modal.style.transform    = "none";
          modal.style.borderRadius = window.innerWidth >= 1024 ? "16px" : "16px 16px 0 0";

          // Search field fades in once the card shape is recognisable.
          tA1 = setTimeout(() => setSearchRowVisible(true), 200);

          // Body slides in below the search field.
          tA2 = setTimeout(() => setBodyExpanded(true), 360);

          tA3 = setTimeout(() => {
            setBodyVisible(true);
            inputRef.current?.focus();
            modal.style.borderRadius = ""; // hand back to Tailwind
          }, 500);
        });

        cleanups.push(() => {
          cancelAnimationFrame(id);
          clearTimeout(tA1);
          clearTimeout(tA2);
          clearTimeout(tA3);
        });
      }
    }

    // ────────────────────────────────────────────────────────────────────────
    if (!open) {
      setSearchRowVisible(false);
      setBodyExpanded(false);
      setBodyVisible(false);

      if (isMobile) {
        // Slide back down.
        modal.style.transition = `transform 300ms cubic-bezier(0.4,0,1,1)`;
        modal.style.transform  = "translateY(100%)";
      } else {
        // Scale down + fade out.
        const closeEase = "cubic-bezier(0.4,0,1,1)";
        modal.style.transition =
          `transform 220ms ${closeEase}, opacity 180ms ${closeEase}`;
        modal.style.transform = "translateY(12px) scale(0.96)";
        modal.style.opacity   = "0";
      }

      // Reset inline styles once the close animation finishes.
      const t = setTimeout(() => {
        if (!modalRef.current) return;
        modalRef.current.style.transition   = "none";
        modalRef.current.style.transform    = "";
        modalRef.current.style.borderRadius = "";
        modalRef.current.style.clipPath     = "";
        modalRef.current.style.opacity      = "0";
      }, 320);
      cleanups.push(() => clearTimeout(t));
    }

    return () => cleanups.forEach((fn) => fn());
  }, [open, triggerRect]);

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
      {/* Backdrop */}
      <div
        aria-hidden={!open}
        className={[
          "fixed inset-0 z-50 bg-[rgba(33,34,44,0.4)] transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
        onClick={onClose}
      />

      {/*
        Modal shell — always at final CSS position, never repositioned.
        clip-path does all positional work during the morph.

        Mobile  : full-width, top ~5 dvh, flush bottom, top-rounded
        Desktop : centred max-w-[898px], padded top + bottom, fully rounded
      */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal={open}
        aria-label="Search"
        className={[
          "fixed z-[51] flex flex-col overflow-hidden",
          "bg-[var(--background-primary)] shadow-[var(--shadow-xl)]",
          // Mobile: full height bottom-sheet
          "inset-x-0 bottom-0 top-[5dvh] rounded-t-2xl",
          // Tablet / desktop: height is driven by content so Phase A of the
          // morph only covers the search-field row (~72 px), not the full
          // viewport. Phase B then expands the body below it.
          // max-h caps the expanded modal so it never overflows the viewport.
          "md:bottom-auto md:left-8 md:right-8 md:top-16 md:rounded-2xl",
          "md:max-h-[calc(100dvh-128px)]",
          // Desktop: centre-clamp at 898 px
          "lg:inset-x-0 lg:mx-auto lg:max-w-[898px]",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        style={{ opacity: 0 }}
      >
        {/* ── Search field row ──────────────────────────────────────── */}
        <div
          ref={searchRowRef}
          className={[
            "shrink-0 transition-opacity duration-200",
            searchRowVisible ? "opacity-100" : "opacity-0",
          ].join(" ")}
        >
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

        {/* ── Body — grid-rows expand during Phase B ─────────────────── */}
        <div
          className="grid min-h-0 transition-[grid-template-rows] duration-[400ms] ease-[var(--ease-out)]"
          style={{ gridTemplateRows: bodyExpanded ? "1fr" : "0fr" }}
        >
          <div
            className={[
              "overflow-y-auto transition-opacity duration-200",
              bodyVisible ? "opacity-100" : "opacity-0",
            ].join(" ")}
            style={{ minHeight: 0 }}
          >
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
      </div>
    </>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────

/** Clamp a clip-path inset percentage so it never goes negative. */
function clamp(v: number) {
  return Math.max(0, v);
}
