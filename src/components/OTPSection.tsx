"use client";

import { useRef, useEffect, useLayoutEffect, useState } from "react";
import { LockSimpleIcon, ClockFaceIcon, SparkleIcon } from "./icons";
import { useLayout } from "./LayoutProvider";

// ── Static card data ──────────────────────────────────────────────────────────

const CARDS = [
  {
    Icon: LockSimpleIcon,
    title: "Lock in Today's Price",
    body: "Secure your new home before completion, with potential upside if the market rises.",
  },
  {
    Icon: ClockFaceIcon,
    title: "Time on your side",
    body: "Pay a deposit upfront, keep saving, and access grants or stamp duty savings.",
  },
  {
    Icon: SparkleIcon,
    title: "Brand New, Made Yours",
    body: "Move into a new home with modern finishes and customisation options.",
  },
];

// ── Grid animation constants ──────────────────────────────────────────────────

// Target column count for the settled card width (1344px).
// On wider screens the effect scales up the column count so every column
// stays the same physical size and the viewport is always fully covered.
const BASE_COLS       = 9;
const SETTLED_WIDTH   = 1344; // px — 1440 max-width minus 96px outer padding
const CARDS_PER_COL   = 16;
const SCROLL_SPEED    = 0.28;
const TRAIL_MS        = 750;
const EASE_IN_MS      = 280;
const MAX_OPACITY     = 0.4;
const HIT_RADIUS_PX   = 180;
const RESPONSIVE_GAP  = "clamp(2px, 0.5vw, 7px)";

const GRID_SRCS = Array.from({ length: 48 }, (_, i) =>
  `/grid/loop-${String(i + 1).padStart(2, "0")}.webp`
);

// ── Component ─────────────────────────────────────────────────────────────────

export default function OTPSection() {
  const { gridBackdrop } = useLayout();
  const [fadeVisible, setFadeVisible]         = useState(false);
  const [visible, setVisible]                 = useState(false);
  const [skipReframe, setSkipReframe]         = useState(false);
  const [reframeDuration, setReframeDuration] = useState(1400);

  const sectionRef       = useRef<HTMLElement>(null);
  const darkCardRef      = useRef<HTMLDivElement>(null);
  const bwInnerRef       = useRef<HTMLDivElement>(null);
  const colorInnerRef    = useRef<HTMLDivElement>(null);
  const isOverBenefitRef = useRef(false);

  // ── Skip reframe if section is already in view or above on load ──────────
  // Only animate the width reframe when scrolling down from the hero for the
  // first time. Refreshing mid-page or scrolling up from below → settled state.

  useLayoutEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    // Section is above the viewport (already scrolled past) → settle immediately
    if (rect.top < 0) {
      setSkipReframe(true);
      setVisible(true);
    }
  }, []);

  // ── Fade grid in on page load (not scroll-triggered) ─────────────────────

  useEffect(() => { setFadeVisible(true); }, []);

  // ── Viewport-scaled reframe duration ──────────────────────────────────────

  useEffect(() => {
    const vw = window.innerWidth;
    setReframeDuration(Math.min(3000, Math.round(1400 * Math.max(1, vw / 1440))));
  }, []);

  // ── Intersection observers (fade-in + reframe) ────────────────────────────

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const reframeObs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); reframeObs.disconnect(); } },
      { threshold: 0, rootMargin: "0px 0px -40% 0px" }
    );

    reframeObs.observe(el);
    return () => { reframeObs.disconnect(); };
  }, []);

  // ── Background grid animation ─────────────────────────────────────────────

  useEffect(() => {
    const bwInner    = bwInnerRef.current;
    const colorInner = colorInnerRef.current;
    const darkCard   = darkCardRef.current;
    if (!darkCard || !bwInner || !colorInner) return;

    // Scale column count so each column is the same physical width on any
    // viewport — enough columns to fill 100vw at BASE_COLS density for SETTLED_WIDTH.
    const vw      = window.innerWidth;
    const dynCols = Math.min(40, Math.max(BASE_COLS, Math.ceil(vw * BASE_COLS / SETTLED_WIDTH)));

    // Create column divs imperatively so count can vary per viewport
    const cols: HTMLDivElement[]      = [];
    const colorCols: HTMLDivElement[] = [];

    const colBaseStyle = {
      flex: "1 0 0", display: "flex", flexDirection: "column",
      gap: RESPONSIVE_GAP, willChange: "transform",
    };

    for (let i = 0; i < dynCols; i++) {
      const col = document.createElement("div");
      Object.assign(col.style, colBaseStyle);
      bwInner.appendChild(col);
      cols.push(col);

      const colorCol = document.createElement("div");
      Object.assign(colorCol.style, colBaseStyle);
      colorInner.appendChild(colorCol);
      colorCols.push(colorCol);
    }

    // Build one pass of cards into a column
    function buildPass(col: HTMLDivElement, startIdx: number, isColor: boolean) {
      for (let i = 0; i < CARDS_PER_COL; i++) {
        const card = document.createElement("div");
        Object.assign(card.style, {
          flexShrink: "0",
          borderRadius: "clamp(2px, 0.56vw, 8px)",
          overflow: "hidden",
          background: "#1a1c24",
          aspectRatio: "7/8",
          boxShadow: "0 3px 10px rgba(0,0,0,0.45)",
          border: "2px solid #1e2030",
          position: "relative",
        });
        const img = document.createElement("img");
        img.src = GRID_SRCS[(startIdx + i) % GRID_SRCS.length];
        img.alt = "";
        img.loading = "lazy";
        img.decoding = "async";
        Object.assign(img.style, {
          width: "100%", height: "100%",
          objectFit: "cover", display: "block",
          ...(isColor ? { filter: "brightness(0.82) contrast(0.92)", opacity: "0.85" } : {}),
        });
        card.appendChild(img);
        col.appendChild(card);
      }
    }

    let imgIdx = 0;
    for (let i = 0; i < dynCols; i++) {
      buildPass(cols[i],      imgIdx % GRID_SRCS.length, false);
      buildPass(colorCols[i], imgIdx % GRID_SRCS.length, true);
      imgIdx += CARDS_PER_COL;
    }

    // Trail state
    const trail = new Map<HTMLElement, { litTime: number; enteredTime: number }>();
    let allColorCards: HTMLElement[] = [];

    // Mouse tracking
    let mouseX = -9999, mouseY = -9999;
    let isInside = false;

    const onEnter = () => { isInside = true; };
    const onLeave = () => { isInside = false; mouseX = -9999; mouseY = -9999; };
    const onMove  = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };

    darkCard.addEventListener("mouseenter", onEnter);
    darkCard.addEventListener("mouseleave", onLeave);
    darkCard.addEventListener("mousemove",  onMove);

    // Layout metrics
    let halfH = 1, staggerPx = 0, baseOffset = 0;

    function calcLayout() {
      const firstCard = cols[0].querySelector("div") as HTMLElement | null;
      const cardH     = firstCard ? firstCard.offsetHeight : 80;
      const gapPx     = parseFloat(window.getComputedStyle(cols[0]).gap) || 7;
      const newHalfH  = cols[0].scrollHeight / 2 || 1;
      if (halfH > 0 && newHalfH > 0) baseOffset = (baseOffset / halfH) * newHalfH;
      halfH     = newHalfH;
      staggerPx = (cardH + gapPx) / 2;
    }

    const ro = new ResizeObserver(calcLayout);
    ro.observe(darkCard);

    let frameId = 0;
    let last: number | null = null;
    let prevBest: HTMLElement | null = null;

    requestAnimationFrame(() => {
      // Duplicate each column so the loop is seamless
      for (let i = 0; i < dynCols; i++) {
        cols[i].innerHTML      = cols[i].innerHTML      + cols[i].innerHTML;
        colorCols[i].innerHTML = colorCols[i].innerHTML + colorCols[i].innerHTML;
      }

      calcLayout();

      allColorCards = colorCols.flatMap(col =>
        Array.from(col.querySelectorAll<HTMLElement>("div"))
      );
      allColorCards.forEach(c => { c.style.opacity = "0"; });

      function tick(ts: number) {
        if (!last) last = ts;
        const dt = Math.min((ts - last) / 16.67, 3);
        last = ts;

        baseOffset += SCROLL_SPEED * dt;
        if (baseOffset >= halfH) baseOffset -= halfH;

        // Trail reveal
        let bestCard: HTMLElement | null = null;
        if (isInside && !isOverBenefitRef.current) {
          let bestDist = Infinity;
          for (const card of allColorCards) {
            const r  = card.getBoundingClientRect();
            const cx = r.left + r.width  * 0.5;
            const cy = r.top  + r.height * 0.5;
            const d  = (mouseX - cx) ** 2 + (mouseY - cy) ** 2;
            if (d < bestDist) { bestDist = d; bestCard = card; }
          }
          if (bestCard && bestDist < HIT_RADIUS_PX ** 2) {
            if (trail.has(bestCard)) {
              const e = trail.get(bestCard)!;
              if (bestCard !== prevBest) e.enteredTime = ts;
              e.litTime = ts;
            } else {
              trail.set(bestCard, { litTime: ts, enteredTime: ts });
            }
          } else {
            bestCard = null;
          }
        }
        prevBest = bestCard;

        trail.forEach((entry, card) => {
          const age = ts - entry.litTime;
          if (age >= TRAIL_MS) {
            card.style.opacity = "0";
            trail.delete(card);
          } else {
            const easeIn  = Math.min((ts - entry.enteredTime) / EASE_IN_MS, 1);
            const easeOut = Math.pow(1 - age / TRAIL_MS, 1.6);
            card.style.opacity = (easeIn * easeOut * MAX_OPACITY).toFixed(3);
          }
        });

        for (let i = 0; i < dynCols; i++) {
          const pos = i % 2 === 1 ? (baseOffset + staggerPx) % halfH : baseOffset;
          const t   = `translateY(-${pos.toFixed(1)}px)`;
          cols[i].style.transform      = t;
          colorCols[i].style.transform = t;
        }

        frameId = requestAnimationFrame(tick);
      }
      frameId = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(frameId);
      darkCard.removeEventListener("mouseenter", onEnter);
      darkCard.removeEventListener("mouseleave", onLeave);
      darkCard.removeEventListener("mousemove",  onMove);
      ro.disconnect();
      bwInner.innerHTML    = "";
      colorInner.innerHTML = "";
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Render ────────────────────────────────────────────────────────────────

  // Grid inner is a plain flex row — column count is set imperatively in the
  // effect so it always fills 100vw at the correct BASE_COLS density.
  const gridInnerStyle: React.CSSProperties = {
    position: "absolute", inset: "-30% -6%",
    display: "flex", gap: RESPONSIVE_GAP,
    transform: "rotateX(42deg)", transformStyle: "preserve-3d", transformOrigin: "50% 0%",
  };

  // Stages are 100vw wide so they always cover the viewport during the reframe.
  // The card's overflow:hidden crops symmetrically as the animation narrows.
  const stageBase: React.CSSProperties = {
    position: "absolute", top: 0, bottom: 0,
    left: "50%", width: "100vw", transform: "translateX(-50%)",
    pointerEvents: "none", overflow: "hidden", borderRadius: "inherit",
    perspective: "900px", perspectiveOrigin: "50% -20%",
    transition: "opacity 2500ms ease-out",
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-6 md:py-8 lg:py-12"
    >
      <div
        className="mx-auto px-4 md:px-8 lg:px-12"
        style={{
          maxWidth: visible ? "1440px" : "100vw",
          ...(visible ? {} : { paddingLeft: 0, paddingRight: 0 }),
          transition: skipReframe ? "none" : `max-width ${reframeDuration}ms cubic-bezier(0.4, 0, 0.2, 1), padding-left ${reframeDuration}ms cubic-bezier(0.4, 0, 0.2, 1), padding-right ${reframeDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
      >
        {/* Dark card */}
        <div
          ref={darkCardRef}
          className="relative bg-[#21222c] overflow-hidden flex flex-col items-center gap-6 p-6 md:gap-8 md:p-12 lg:gap-12 lg:p-24"
          style={{
            borderRadius: visible ? "1rem" : 0,
            transition: skipReframe ? "none" : `border-radius ${reframeDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        >
          {/* ── Background mosaic (shown when gridBackdrop is on) ── */}
          {gridBackdrop && (
            <>
              {/* BW grid stage */}
              <div style={{ ...stageBase, zIndex: 1, filter: "saturate(0) brightness(0.45) contrast(0.85)", opacity: fadeVisible ? 0.20 : 0 }}>
                <div ref={bwInnerRef} style={gridInnerStyle} />
              </div>

              {/* Colour grid stage (mouse-trail reveal) */}
              <div style={{ ...stageBase, zIndex: 2, opacity: fadeVisible ? 1 : 0 }}>
                <div ref={colorInnerRef} style={gridInnerStyle} />
              </div>

              {/* Blur overlay */}
              <div style={{
                position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none",
                backdropFilter: "blur(7px)", WebkitBackdropFilter: "blur(7px)",
                WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 20%, transparent 58%)",
                maskImage:        "linear-gradient(to bottom, black 0%, black 20%, transparent 58%)",
              }} />

              {/* Top colour fade + radial vignette */}
              <div style={{
                position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none",
                background:
                  "linear-gradient(to bottom, rgba(14,15,20,0.97) 0%, rgba(14,15,20,0.0) 30%), " +
                  "radial-gradient(ellipse 60% 50% at 50% 42%, rgba(14,15,20,0.55) 0%, transparent 100%)",
              }} />

              {/* Bottom colour fade */}
              <div style={{
                position: "absolute", inset: 0, zIndex: 4, pointerEvents: "none",
                background: "linear-gradient(to top, rgba(14,15,20,0.95) 0%, rgba(14,15,20,0.0) 30%)",
              }} />
            </>
          )}

          {/* ── Header ── */}
          <div className="relative flex flex-col items-center gap-6 w-full max-w-[646px]" style={{ zIndex: 5 }}>
            <div
              className="flex flex-col items-center gap-3 w-full"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(22px)",
                transition: "opacity 0.65s ease-out 0.2s, transform 0.65s ease-out 0.2s",
              }}
            >
              <div className="flex flex-col items-center gap-2 text-center w-full">
                <p className="font-body text-[12px] leading-4 font-medium uppercase tracking-[0.04em] text-white/[0.72]">
                  New to off-the-plan?
                </p>
                <h2 className="font-heading text-[32px] leading-[40px] font-semibold tracking-[-0.5px] text-white text-center md:text-[36px] md:leading-[44px]">
                  Everything to know before buying new
                </h2>
              </div>
              <p className="font-body text-[18px] leading-6 font-normal text-white/[0.88] text-center">
                Apartments &amp; Developments brings new developments together,{" "}
                <br className="hidden md:block" />
                so you can compare what&apos;s available and buy with confidence.
              </p>
            </div>

            <button
              type="button"
              className="flex items-center gap-1 bg-[#0170cb] hover:bg-[#00399d] text-white rounded-full px-4 py-2 font-body text-[16px] leading-6 font-medium"
              onMouseEnter={() => { isOverBenefitRef.current = true;  }}
              onMouseLeave={() => { isOverBenefitRef.current = false; }}
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(14px)",
                transition: "opacity 0.6s ease-out 0.36s, transform 0.6s ease-out 0.36s, background-color 0.3s ease-out",
              }}
            >
              Start with our guides
              <svg width="20" height="20" viewBox="0 0 256 256" fill="none" stroke="white"
                strokeWidth={16} strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true" className="shrink-0">
                <line x1="40" y1="128" x2="216" y2="128" />
                <polyline points="144 56 216 128 144 200" />
              </svg>
            </button>
          </div>

          {/* ── Feature Cards ── */}
          <div
            className="relative grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6 w-full max-w-[1152px]"
            style={{ zIndex: 5 }}
            onMouseEnter={() => { isOverBenefitRef.current = true;  }}
            onMouseLeave={() => { isOverBenefitRef.current = false; }}
          >
            {CARDS.map(({ Icon, title, body }, i) => (
              <div
                key={title}
                className="bg-white border border-[rgba(33,34,44,0.16)] rounded-2xl shadow-[0px_24px_48px_-12px_rgba(0,13,61,0.18)] p-4 flex flex-row items-start gap-3 md:flex-col md:gap-6 md:p-6 lg:p-8"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(28px)",
                  transition: `opacity 0.55s ease-out ${0.46 + i * 0.15}s, transform 0.55s ease-out ${0.46 + i * 0.15}s`,
                }}
              >
                <div className="shrink-0 flex items-center justify-center rounded-[8px] bg-[#ebf2ff] size-12 md:size-14">
                  <Icon className="size-5 md:size-6 text-[#0170cb]" />
                </div>
                <div className="flex flex-col gap-1 md:gap-2 min-w-0 flex-1">
                  <h3 className="font-heading text-[20px] leading-7 font-semibold tracking-[-0.5px] text-[#101017] md:text-[24px] md:leading-8">
                    {title}
                  </h3>
                  <p className="font-body text-[16px] leading-6 text-[#333541]">
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
