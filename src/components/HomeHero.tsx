"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import Image from "next/image";
import {
  ArrowRightIcon,
  SearchIcon,
  ClockIcon,
  CaretUpIcon,
  CaretDownIcon,
} from "./icons";
import { STATES, RECENT_SEARCH, type State } from "@/data/states";
import { useLayout, HERO_MAX_WIDTH_PX } from "./LayoutProvider";
import SearchModal from "./SearchModal";

const AREA_ROTATE_MS = 3000;

function useMediaQuery(query: string, serverDefault: boolean) {
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    () => window.matchMedia(query).matches,
    () => serverDefault,
  );
}

function useScrolledPast(threshold: number) {
  return useSyncExternalStore(
    (notify) => {
      window.addEventListener("scroll", notify, { passive: true });
      return () => window.removeEventListener("scroll", notify);
    },
    () => window.scrollY > threshold,
    () => false,
  );
}

function searchHref(stateId: string, areaId?: string) {
  const params = new URLSearchParams({ state: stateId });
  if (areaId) params.set("area", areaId);
  return `/search?${params.toString()}`;
}

export default function HomeHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [areaIndex, setAreaIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [prevActiveIndex, setPrevActiveIndex] = useState(activeIndex);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTriggerRect, setSearchTriggerRect] = useState<DOMRect | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isDesktop = useMediaQuery("(min-width: 1024px)", true);
  const docked = useScrolledPast(120);
  const { heroMaxWidth } = useLayout();

  // Reset area to 0 whenever the active state changes (render-phase adjustment).
  if (prevActiveIndex !== activeIndex) {
    setPrevActiveIndex(activeIndex);
    setAreaIndex(0);
  }

  // activeIndex may be -1 on mobile/tablet when the open card is collapsed.
  // The desktop right-column card always needs a state to show, so fall back to 0.
  const safeIndex = activeIndex < 0 ? 0 : activeIndex;
  const activeState = STATES[safeIndex];
  const areas = activeState.areas;
  const areasLength = areas.length;

  // Rotate areas every 3 s; restarts on manual change, halts while paused.
  useEffect(() => {
    if (paused || areasLength <= 1) return;
    const t = setTimeout(
      () => setAreaIndex((i) => (i + 1) % areasLength),
      AREA_ROTATE_MS,
    );
    return () => clearTimeout(t);
  }, [areaIndex, paused, areasLength, activeIndex]);

  const goPrevArea = useCallback(
    () => setAreaIndex((i) => (i - 1 + areasLength) % areasLength),
    [areasLength],
  );
  const goNextArea = useCallback(
    () => setAreaIndex((i) => (i + 1) % areasLength),
    [areasLength],
  );

  return (
    <section
      aria-label="Find a development by state"
      className="relative flex w-full flex-col bg-[var(--background-secondary)]"
      style={{ minHeight: "calc(100dvh - var(--navbar-h, 81px))" }}
    >
      <div
        className="mx-auto flex w-full flex-1 flex-col px-4 py-6 md:px-6 md:py-8 lg:px-12 lg:py-12"
        style={{ maxWidth: HERO_MAX_WIDTH_PX[heroMaxWidth] }}
      >
        {/* FIX: left column capped at 524 px on desktop. */}
        <div
          className="flex w-full flex-1 flex-col gap-6 lg:grid lg:gap-x-12 lg:gap-y-6 lg:[grid-template-rows:auto_1fr]"
          style={{
            gridTemplateColumns: "min(40%, 524px) 1fr",
          } as React.CSSProperties}
        >
          {/* Header */}
          <header
            data-left-col
            className="flex flex-col gap-3 lg:gap-2 lg:[grid-column:1] lg:[grid-row:1]"
          >
            <h1
              className="hero-rise text-balance font-heading text-[40px] font-semibold leading-[1.1] tracking-[-0.5px] md:text-[48px] lg:text-[56px]"
              style={{ animationDelay: "60ms" }}
            >
              {/* Force the two clauses onto separate lines at every breakpoint so
                  the "before it's built" tail always sits underneath. */}
              <span className="block text-[var(--content-primary)]">
                Find your next home
              </span>
              <span className="block text-[var(--content-tertiary)]">
                before it&apos;s built
              </span>
            </h1>
            <p
              className="hero-rise font-body text-[18px] leading-6 text-[var(--content-secondary)]"
              style={{ animationDelay: "140ms" }}
            >
              Search every off-the-plan apartment and development across
              Australia.
            </p>
          </header>

          {/* Area card — desktop right column only */}
          <div className="area-reveal hidden [animation-delay:560ms] lg:block lg:[grid-column:2] lg:[grid-row:1/span_2]">
            <AreaCard
              state={activeState}
              areaIndex={areaIndex}
              paused={paused}
              onPauseChange={setPaused}
              onSelectArea={setAreaIndex}
              onPrev={goPrevArea}
              onNext={goNextArea}
              variant="v2"
            />
          </div>

          {/* State list */}
          <nav
            aria-label="Browse developments by state"
            className="flex flex-col lg:[grid-column:1] lg:[grid-row:2]"
          >
            {STATES.map((state, i) => (
              <MixedStateRow
                key={state.id}
                state={state}
                active={i === activeIndex}
                delay={220 + i * 50}
                areaIndex={areaIndex}
                paused={paused}
                onActivate={() => setActiveIndex(i)}
                onCollapse={() => setActiveIndex(-1)}
                onHover={() => { if (isDesktop) setActiveIndex(i); }}
                onPauseChange={setPaused}
                onSelectArea={setAreaIndex}
                onPrev={goPrevArea}
                onNext={goNextArea}
                noBottomBorder={i + 1 === activeIndex}
              />
            ))}
          </nav>
        </div>
      </div>

      <StickySearchBar
        isDesktop={isDesktop}
        docked={docked}
        onOpen={(rect) => {
          // Focus synchronously within the tap handler so iOS Safari
          // opens the keyboard immediately, before any animation delay.
          searchInputRef.current?.focus();
          setSearchTriggerRect(rect);
          setSearchOpen(true);
        }}
      />

      <SearchModal
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        triggerRect={searchTriggerRect}
        inputRef={searchInputRef}
      />
    </section>
  );
}

// ── MixedStateRow ─────────────────────────────────────────────────────────────
// The finalised "Mixed" state list item.
//   • Desktop (lg+): an underline row with the search icon on the LEFT of the
//     active state name; the area card lives in the right column. Hover reveals
//     a "View N developments" pill.
//   • Mobile / tablet (<lg): a combined state + area card. The ACTIVE state
//     becomes a card — state header overlaid on the image (search icon + name +
//     count + caret-up to collapse), the rotating area beneath it, and a
//     full-width "View all developments in [state]" CTA at the bottom. INACTIVE
//     states collapse to a simple row (name + count + caret-down).

function MixedStateRow({
  state,
  active,
  delay,
  areaIndex,
  paused,
  onActivate,
  onCollapse,
  onHover,
  onPauseChange,
  onSelectArea,
  onPrev,
  onNext,
  noBottomBorder = false,
}: {
  state: State;
  active: boolean;
  delay: number;
  areaIndex: number;
  paused: boolean;
  onActivate: () => void;
  /** Collapse the open card back to an inactive row (mobile/tablet). */
  onCollapse: () => void;
  onHover: () => void;
  onPauseChange: (p: boolean) => void;
  onSelectArea: (i: number) => void;
  /** Suppress the bottom divider — used when the row directly precedes the active card. */
  noBottomBorder?: boolean;
  onPrev: () => void;
  onNext: () => void;
}) {
  const areas = state.areas;
  const area = areas[areaIndex] ?? areas[0];

  // Swipe tracking — ref so gesture detection never causes a re-render.
  const swipeRef = useRef<{ x: number; y: number; time: number }>({ x: 0, y: 0, time: 0 });


  // Desktop: collapsing search icon — animates in when the row becomes active.
  const leadingIcon = (
    <span
      className={`flex items-center overflow-hidden transition-all duration-300 ease-[var(--ease-out)] ${active ? "w-8 opacity-100" : "w-0 opacity-0"}`}
    >
      <SearchIcon className="mr-2 size-6 shrink-0 text-[var(--content-primary)]" />
    </span>
  );

  const stateName = (
    <span
      className="min-w-0 flex-1 truncate font-heading text-[24px] font-semibold leading-8 tracking-[-0.5px] transition-colors duration-300"
      style={{
        color: active ? "var(--content-primary)" : "var(--content-tertiary)",
      }}
    >
      {state.name}
    </span>
  );

  return (
    <div>
      {/* ===== Desktop (lg+): underline row — area card lives in right column ===== */}
      <a
        href={searchHref(state.id)}
        onMouseEnter={onHover}
        onFocus={onHover}
        className="hero-rise group hidden min-h-[72px] items-center border-solid outline-none transition-all duration-300 ease-[var(--ease-out)] lg:flex"
        style={{
          animationDelay: `${delay}ms`,
          borderBottomColor: active
            ? "var(--border-strong)"
            : "var(--border-light)",
          borderBottomWidth: active ? 4 : 1,
        }}
      >
        {leadingIcon}
        {stateName}
        {active ? (
          // Active: count adopts the heading colour; arrow slides in on hover
          // (matches the Underline style).
          <span className="flex shrink-0 items-center whitespace-nowrap pl-4 font-body text-[12px] leading-4 text-[var(--content-primary)]">
            {state.count} developments
            <span className="w-0 overflow-hidden transition-[width] duration-200 ease-[var(--ease-out)] group-hover:w-5">
              <ArrowRightIcon className="ml-1 size-4 shrink-0" />
            </span>
          </span>
        ) : (
          <span className="shrink-0 whitespace-nowrap pl-4 font-body text-[12px] leading-4 text-[var(--content-tertiary)]">
            {state.count} developments
          </span>
        )}
      </a>

      {/*
        ===== Mobile / tablet (<lg) =====
        Both the inactive row and the active card are always mounted.
        We animate grid-template-rows (0fr ↔ 1fr) so height transitions
        smoothly in BOTH directions simultaneously — the row collapses as
        the card expands, and vice versa, with no DOM mount/unmount jank.
        The grid containers use -mx-4 / md:-mx-8 (block divs auto-expand
        to viewport width with negative margins) so no width hack is needed.
      */}
      <div className="lg:hidden">
        {/* Inactive row — collapses when this state becomes active */}
        <div
          className="-mx-4 grid md:-mx-6"
          style={{
            gridTemplateRows: active ? "0fr" : "1fr",
            transition: `grid-template-rows ${active ? "450ms" : "380ms"} var(--ease-out)`,
          }}
        >
          <div style={{ minHeight: 0 }} className="overflow-hidden">
            <button
              type="button"
              onClick={onActivate}
              onMouseEnter={onHover}
              className="hero-rise flex w-full items-center justify-between border-b border-[var(--border-light)] px-4 py-4 text-left outline-none md:px-6"
              style={{ animationDelay: `${delay}ms` }}
            >
              <span className="min-w-0 flex-1 truncate font-heading text-[20px] font-semibold leading-7 tracking-[-0.5px] text-[var(--content-tertiary)] md:text-[24px] md:leading-8">
                {state.name}
              </span>
              <span className="flex shrink-0 items-center gap-3 pl-4">
                <span className="whitespace-nowrap font-body text-[12px] leading-4 text-[var(--content-tertiary)]">
                  {state.count} developments
                </span>
                <CaretDownIcon className="size-4 text-[var(--content-tertiary)]" />
              </span>
            </button>
          </div>
        </div>

        {/* Active card — expands when this state becomes active */}
        <div
          className="-mx-4 grid md:-mx-6"
          style={{
            gridTemplateRows: active ? "1fr" : "0fr",
            transition: `grid-template-rows ${active ? "450ms" : "380ms"} var(--ease-out)`,
          }}
        >
          <div style={{ minHeight: 0 }} className="overflow-hidden">
            <div className="hero-fade bg-[var(--surface-primary)]" style={{ animationDelay: `${delay}ms` }}>
              {/* Image region — swipe left/right to change area, tap to navigate */}
              <div
                className="group relative aspect-square w-full select-none overflow-hidden md:aspect-[16/9]"
                style={{ touchAction: "pan-y" }}
                onPointerEnter={() => onPauseChange(true)}
                onPointerLeave={() => onPauseChange(false)}
                onPointerDown={(e) => {
                  swipeRef.current = { x: e.clientX, y: e.clientY, time: Date.now() };
                }}
                onPointerUp={(e) => {
                  const dx = e.clientX - swipeRef.current.x;
                  const dy = e.clientY - swipeRef.current.y;
                  const absDx = Math.abs(dx);
                  const absDy = Math.abs(dy);
                  const elapsed = Math.max(1, Date.now() - swipeRef.current.time);

                  // Horizontal swipe: movement is dominant + far enough OR fast enough.
                  if (absDx > absDy * 1.2 && (absDx > 40 || absDx / elapsed > 0.3)) {
                    dx < 0 ? onNext() : onPrev();
                    return;
                  }

                  // Tap: minimal movement AND not landing on an interactive element.
                  if (absDx < 8 && absDy < 8) {
                    const target = e.target as HTMLElement;
                    if (!target.closest("button") && !target.closest("a")) {
                      window.location.href = searchHref(state.id, area.id);
                    }
                  }
                }}
              >
                {/* Crossfading area images */}
                <div className="absolute inset-0" aria-hidden>
                  {areas.map((a, i) => (
                    <Image
                      key={a.id}
                      src={a.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 720px, 100vw"
                      className="object-cover transition-opacity duration-700 ease-[var(--ease-out)]"
                      style={{ opacity: i === areaIndex ? 1 : 0 }}
                    />
                  ))}
                </div>

                {/* Top state header — tap to collapse back to a row */}
                <button
                  type="button"
                  onClick={onCollapse}
                  aria-label={`Collapse ${state.name}`}
                  className="absolute inset-x-0 top-0 z-30 flex items-center gap-2 px-4 py-3 text-left md:px-6 md:py-4"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(33,34,44,0.56) 0%, rgba(33,34,44,0) 100%)",
                    }}
                  />
                  <SearchIcon className="relative size-6 shrink-0 text-white" />
                  <span className="relative min-w-0 flex-1 truncate font-heading text-[20px] font-semibold leading-7 tracking-[-0.5px] text-white md:text-[24px] md:leading-8">
                    {state.name}
                  </span>
                  <span className="relative whitespace-nowrap font-body text-[12px] leading-4 text-white/[0.72]">
                    {state.count} developments
                  </span>
                  <CaretUpIcon className="relative size-4 shrink-0 text-white" />
                </button>

                {/* Prev / next area — accessible buttons, visually hidden (swipe handles the gesture) */}
                {areas.length > 1 && (
                  <>
                    <button
                      type="button"
                      aria-label="Previous area"
                      onClick={onPrev}
                      className="sr-only"
                    />
                    <button
                      type="button"
                      aria-label="Next area"
                      onClick={onNext}
                      className="sr-only"
                    />
                  </>
                )}

                {/* Bottom overlay — gradient + content (progressive blur disabled:
                    backdrop-filter doesn't compose correctly inside overflow:hidden) */}
                <div className="absolute inset-x-0 bottom-0 z-20">
                  <div
                    className="relative"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(33,34,44,0.00) 0%, rgba(33,34,44,0.92) 55%)",
                    }}
                  >
                    <a
                      href={searchHref(state.id, area.id)}
                      className="flex flex-col gap-1 px-4 pb-11 pt-16 md:px-6"
                    >
                      <span className="font-body text-[12px] font-medium uppercase leading-4 tracking-[0.04em] text-white/[0.72]">
                        Area {areaIndex + 1} / {areas.length}
                      </span>
                      <span className="font-heading text-[24px] font-semibold leading-8 tracking-[-0.5px] text-white md:text-[28px] md:leading-9">
                        {area.name}, {state.abbr}
                      </span>
                      <span className="group/link inline-flex items-center gap-1 font-body text-[14px] leading-5 text-white">
                        <span className="underline underline-offset-2">
                          View {area.count} developments
                        </span>
                        <ArrowRightIcon className="size-4 shrink-0" />
                      </span>
                    </a>

                    {/* Story-page progress indicators */}
                    <div className="absolute inset-x-4 bottom-4 z-30 flex items-center gap-2 md:inset-x-6">
                      {areas.map((a, i) => (
                        <button
                          type="button"
                          key={a.id}
                          aria-label={`Show ${a.name}`}
                          onClick={() => onSelectArea(i)}
                          className="group/bar flex h-4 flex-1 cursor-pointer items-center"
                        >
                          <span
                            className="block h-1 w-full overflow-hidden rounded-[2px] transition-all duration-300 ease-[var(--ease-out)] group-hover/bar:h-[6px]"
                            style={{ background: "var(--overlay-light)" }}
                          >
                            <span
                              key={`${areaIndex}-${i}`}
                              className="block h-full rounded-[2px] bg-white"
                              style={{
                                width:
                                  i < areaIndex
                                    ? "100%"
                                    : i > areaIndex
                                      ? "0%"
                                      : undefined,
                                animation:
                                  i === areaIndex && areas.length > 1
                                    ? `bar-fill ${AREA_ROTATE_MS}ms linear both`
                                    : undefined,
                                animationPlayState: paused ? "paused" : "running",
                              }}
                            />
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Full-width CTA */}
              <div className="px-4 py-3 md:px-6 md:py-4">
                <a
                  href={searchHref(state.id)}
                  className="group/cta flex w-full items-center justify-center gap-2 rounded-full bg-[var(--surface-inverse-primary)] px-6 py-3 text-[var(--content-inverse-primary)] transition-transform duration-200 active:scale-[0.99]"
                >
                  <span className="font-body text-[16px] font-medium leading-6">
                    <span className="md:hidden">View all developments in {state.abbr}</span>
                    <span className="hidden md:inline">View all developments in {state.name}</span>
                  </span>
                  <ArrowRightIcon className="size-5 shrink-0 transition-transform duration-300 ease-[var(--ease-out)] group-hover/cta:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Divider separating card from the next state row */}
            <div className="border-b border-[var(--border-light)]" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── AreaCard ──────────────────────────────────────────────────────────────────

function AreaCard({
  state,
  areaIndex,
  paused,
  onPauseChange,
  onSelectArea,
  onPrev,
  onNext,
  variant = "default",
}: {
  state: State;
  areaIndex: number;
  paused: boolean;
  onPauseChange: (p: boolean) => void;
  onSelectArea: (i: number) => void;
  onPrev: () => void;
  onNext: () => void;
  /** "v2" = new hover treatment: count → "View" button, clearer progress bars. */
  variant?: "default" | "v2";
}) {
  const areas = state.areas;
  const area = areas[areaIndex];
  const isV2 = variant === "v2";

  return (
    <div
      className="group relative aspect-video w-full overflow-hidden rounded-2xl will-change-transform md:aspect-[2/1] lg:aspect-auto lg:h-full lg:min-h-[560px]"
      onPointerEnter={() => onPauseChange(true)}
      onPointerLeave={() => onPauseChange(false)}
    >
      {/*
        FIX: image scale lives on a single inner wrapper so all crossfading
        images move together — one transform on one element is smoother than
        individual transforms on multiple opacity-animated images.
      */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-[1.04]"
        aria-hidden
      >
        {areas.map((a, i) => (
          <Image
            key={a.id}
            src={a.image}
            alt=""
            fill
            priority={i === 0}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover transition-opacity duration-700 ease-[var(--ease-out)]"
            style={{ opacity: i === areaIndex ? 1 : 0 }}
          />
        ))}
      </div>

      {/* V2: full-card cover link — sits at z-10, below progress bars (z-20).
          Clicking anywhere on the image navigates to the area SRP.
          The overlay content uses pointer-events-none so clicks fall through. */}
      {isV2 && (
        <a
          href={searchHref(state.id, area.id)}
          className="absolute inset-0 z-10"
          aria-label={`Explore ${area.name}, ${state.abbr} — ${area.count} developments`}
        />
      )}

      {/* Edge zones — prev/next (default variant only; v2 uses the full-card link) */}
      {areas.length > 1 && !isV2 && (
        <>
          <button
            type="button"
            aria-label="Previous area"
            onClick={onPrev}
            className="absolute inset-y-0 left-0 z-10 w-[18%] cursor-pointer focus:outline-none"
          />
          <button
            type="button"
            aria-label="Next area"
            onClick={onNext}
            className="absolute inset-y-0 right-0 z-10 w-[18%] cursor-pointer focus:outline-none"
          />
        </>
      )}

      {/* Progress indicator — sits at z-20 (above cover link).
          stopPropagation on v2 prevents the cover link from also firing. */}
      <div className="absolute inset-x-4 top-4 z-20 flex items-center gap-2 md:inset-x-6 md:top-6">
        {areas.map((a, i) => (
          <button
            type="button"
            key={a.id}
            aria-label={`Show ${a.name}`}
            onClick={(e) => { if (isV2) e.stopPropagation(); onSelectArea(i); }}
            className="group/bar h-4 flex-1 cursor-pointer flex items-center"
          >
            {/* Track — the element that visually grows; safe inside fixed-height button */}
            <span
              className="block h-1 w-full overflow-hidden rounded-[2px] transition-all duration-300 ease-[var(--ease-out)] group-hover/bar:h-[6px] group-hover/bar:shadow-[0_0_8px_rgba(255,255,255,0.6)]"
              style={{ background: "var(--overlay-light)" }}
            >
              {/* Fill — animates width to show progress */}
              <span
                key={`${areaIndex}-${i}`}
                className="block h-full rounded-[2px] bg-white"
                style={{
                  width:
                    i < areaIndex ? "100%" : i > areaIndex ? "0%" : undefined,
                  animation:
                    i === areaIndex && areas.length > 1
                      ? `bar-fill ${AREA_ROTATE_MS}ms linear both`
                      : undefined,
                  animationPlayState: paused ? "paused" : "running",
                }}
              />
            </span>
          </button>
        ))}
      </div>

      {/* Overview overlay — gradient + content.
          Progressive blur disabled: backdrop-filter doesn't composite
          correctly inside overflow:hidden, so we lean on the gradient.
          V2: pointer-events-none so clicks fall through to the cover link. */}
      <div className={`absolute inset-x-0 bottom-0 z-20 ${isV2 ? "pointer-events-none" : ""}`}>
        {isV2 ? (
          // V2: display-only overlay — the cover <a> above handles navigation.
          <div
            className="relative flex items-center gap-3 px-4 pb-4 pt-16 md:gap-6 md:px-6 md:pb-6"
            style={{
              background:
                "linear-gradient(180deg, rgba(33,34,44,0.00) 0%, rgba(33,34,44,0.92) 55%)",
            }}
          >
            <span className="flex min-w-0 flex-1 flex-col gap-1">
              {/* Heading/md — 32px / 40px lh / 600 / -0.5px */}
              <span className="font-heading text-[32px] font-semibold leading-[40px] tracking-[-0.5px] text-white">
                {area.name}, {state.abbr}
              </span>
              <span className="inline-flex items-center gap-1 font-body text-[14px] leading-5 text-white">
                <span className="underline underline-offset-2">
                  View {area.count} developments
                </span>
                <ArrowRightIcon className="size-4 shrink-0 transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1" />
              </span>
            </span>
          </div>
        ) : (
          // Default variant: the overlay itself is the link.
          <a
            href={searchHref(state.id, area.id)}
            className="relative flex items-center gap-3 px-4 pb-4 pt-16 md:gap-6 md:px-6 md:pb-6"
            style={{
              background:
                "linear-gradient(180deg, rgba(33,34,44,0.00) 0%, rgba(33,34,44,0.92) 55%)",
            }}
          >
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="font-heading text-[24px] font-semibold leading-8 tracking-[-0.5px] text-white">
                {area.name}, {state.abbr}
              </span>
              <span className="font-body text-[12px] leading-4 text-white/[0.72]">
                {area.count} Developments
              </span>
            </span>
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-black/[0.16] bg-white text-[#101017] transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-105">
              <SearchIcon className="size-5" />
            </span>
          </a>
        )}
      </div>
    </div>
  );
}

// ── StickySearchBar ──────────────────────────────────────────────────────────

function StickySearchBar({
  isDesktop,
  docked,
  onOpen,
}: {
  isDesktop: boolean;
  docked: boolean;
  onOpen: (rect: DOMRect) => void;
}) {
  const { recentSearch, heroMaxWidth } = useLayout();
  const [anchor, setAnchor] = useState<{ left: number; width: number } | null>(null);

  // Measure the left column so the undocked bar aligns with it on desktop.
  // Re-runs when the hero width cap changes, since that shifts the column.
  useEffect(() => {
    if (!isDesktop) return;
    const measure = () => {
      const col = document.querySelector<HTMLElement>("[data-left-col]");
      if (!col) return;
      const r = col.getBoundingClientRect();
      setAnchor({ left: r.left, width: r.width });
    };
    const raf = requestAnimationFrame(measure);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", measure);
    };
  }, [isDesktop, heroMaxWidth]);

  const isSideBySide = recentSearch === "sidebyside";
  const dockedWidth = isSideBySide ? 820 : 720;

  const desktopStyle = isDesktop
    ? docked
      ? { left: "50%", width: dockedWidth, transform: "translateX(-50%)" }
      : anchor
        ? { left: anchor.left, width: anchor.width, transform: "translateX(0)" }
        : { left: "50%", width: 520, transform: "translateX(-50%)" }
    : undefined;

  return (
    <div
      className={
        "fixed z-40 flex flex-col items-center gap-2 will-change-transform " +
        (isDesktop
          ? "bottom-6 md:bottom-8 lg:bottom-12 transition-[left,width,transform] duration-700 ease-[var(--ease-out)]"
          : isSideBySide
            ? "bottom-0 left-0 w-full md:bottom-8 md:px-6"
            : "bottom-6 md:bottom-8 left-1/2 w-[calc(100%-32px)] -translate-x-1/2 md:w-[588px]")
      }
      style={desktopStyle}
    >
      {isSideBySide ? (
        <RecentLastSearchBar elevated={docked} onOpen={onOpen} />
      ) : (
        <SearchBar elevated={docked} onOpen={onOpen} />
      )}
    </div>
  );
}

function SearchBar({
  elevated,
  onOpen,
  compact = false,
}: {
  elevated?: boolean;
  onOpen: (rect: DOMRect) => void;
  /** Icon-only button (used in the side-by-side recent search variant). */
  compact?: boolean;
}) {
  // Always light regardless of theme — acts as a floating surface.
  return (
    <button
      type="button"
      onClick={(e) =>
        onOpen((e.currentTarget as HTMLButtonElement).getBoundingClientRect())
      }
      aria-label="Open search"
      className="group relative flex w-full cursor-pointer items-center gap-6 rounded-full border border-black/[0.16] bg-white py-3 pl-6 pr-3 text-left transition-[box-shadow,transform] duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99]"
      style={{ boxShadow: elevated ? "var(--shadow-xl)" : "var(--shadow-lg)" }}
    >
      {/* Hover overlay — composites over bg-white so the tint reads correctly. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full bg-[rgba(33,34,44,0.08)] opacity-0 transition-opacity duration-150 group-hover:opacity-100"
      />

      <span className="relative min-w-0 flex-1 truncate font-body text-[18px] leading-6 text-[#595c69]">
        Search by location or development
      </span>

      {compact ? (
        // Icon-only circle (matches mobile button size from the design).
        <span className="relative flex size-12 shrink-0 items-center justify-center rounded-full bg-[#101017] text-white">
          <SearchIcon className="size-5" />
        </span>
      ) : (
        <>
          {/* Desktop / tablet: label + icon pill */}
          <span className="relative hidden shrink-0 items-center gap-2 rounded-full bg-[#101017] px-6 py-3 text-white transition-transform duration-300 ease-[var(--ease-out)] group-hover:scale-[1.03] md:flex">
            <span className="font-body text-[18px] font-medium leading-6">
              Search
            </span>
            <SearchIcon className="size-5 transition-transform duration-300 ease-[var(--ease-out)] group-hover:rotate-[-12deg]" />
          </span>
          {/* Mobile: icon-only circle */}
          <span className="relative flex size-10 shrink-0 items-center justify-center rounded-full bg-[#101017] text-white md:hidden">
            <SearchIcon className="size-5" />
          </span>
        </>
      )}
    </button>
  );
}


/**
 * Concept 2 (final) — "Last search" beside "New search".
 *   • Last search (left): clock icon + label + area name, links to the SRP.
 *       – Desktop reveals the arrow on hover; tablet/mobile show it by default.
 *   • New search (right): opens the search modal.
 *   • Mobile wraps both in a single fixed-bottom surface container; the New
 *     search button collapses to an icon-only circle.
 */
function RecentLastSearchBar({
  elevated,
  onOpen,
}: {
  elevated?: boolean;
  onOpen: (rect: DOMRect) => void;
}) {
  const shadow = {
    boxShadow: elevated ? "var(--shadow-xl)" : "var(--shadow-lg)",
  } as React.CSSProperties;

  const lastSearchInner = (
    <>
      <ClockIcon className="size-5 shrink-0 text-[#101017]" />
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="font-body text-[11px] font-medium uppercase leading-4 tracking-[0.04em] text-[#595c69]">
          Last search
        </span>
        <span className="truncate font-body text-[16px] font-medium leading-6 text-[#101017]">
          {RECENT_SEARCH.areaName}, {RECENT_SEARCH.stateAbbr}
        </span>
      </span>
    </>
  );

  return (
    <>
      {/* Mobile (<md): bottom-sheet container — bordered last-search pill +
          divider + icon button (Figma: "Search bar with Last search"). */}
      <div
        className="flex w-full items-center gap-3 border-t border-black/[0.16] bg-white p-4 md:hidden"
        style={shadow}
      >
        <a
          href={RECENT_SEARCH.href}
          className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden rounded-full border border-black/[0.16] bg-white px-6 py-3"
        >
          {lastSearchInner}
          <ArrowRightIcon className="size-5 shrink-0 text-[#101017]" />
        </a>
        <span className="h-8 w-px shrink-0 bg-black/[0.12]" />
        <button
          type="button"
          aria-label="New search"
          onClick={(e) =>
            onOpen(
              (e.currentTarget as HTMLButtonElement).getBoundingClientRect(),
            )
          }
          className="flex size-16 shrink-0 items-center justify-center rounded-full bg-[#101017] text-white transition-transform active:scale-95"
        >
          <SearchIcon className="size-5" />
        </button>
      </div>

      {/* Tablet / desktop (md+): two pills separated by a divider */}
      <div className="hidden w-full items-stretch gap-3 md:flex">
        <a
          href={RECENT_SEARCH.href}
          className="group flex min-w-0 flex-1 items-center gap-3 rounded-full border border-black/[0.16] bg-white py-3 pl-6 pr-5 transition-colors duration-300 hover:bg-[#f4f4f6]"
          style={shadow}
        >
          {lastSearchInner}
          {/* Arrow: shown by default on tablet, revealed on hover on desktop */}
          <span className="w-5 shrink-0 overflow-hidden transition-[width] duration-200 ease-[var(--ease-out)] lg:w-0 lg:group-hover:w-5">
            <ArrowRightIcon className="size-5 text-[#101017]" />
          </span>
        </a>

        <span className="h-8 w-px shrink-0 self-center bg-black/[0.12]" />

        <button
          type="button"
          onClick={(e) =>
            onOpen(
              (e.currentTarget as HTMLButtonElement).getBoundingClientRect(),
            )
          }
          className="group/new flex shrink-0 items-center gap-2 rounded-full bg-[#101017] px-6 text-white transition-transform duration-200 hover:scale-[1.03] active:scale-95"
          style={shadow}
        >
          <span className="font-body text-[18px] font-medium leading-6">
            New search
          </span>
          <SearchIcon className="size-5 transition-transform duration-300 ease-[var(--ease-out)] group-hover/new:rotate-[-12deg]" />
        </button>
      </div>
    </>
  );
}

