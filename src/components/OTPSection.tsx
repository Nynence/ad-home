"use client";

import { useRef, useEffect, useState } from "react";
import { LockSimpleIcon, ClockFaceIcon, SparkleIcon } from "./icons";

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

// ── Component ─────────────────────────────────────────────────────────────────

export default function OTPSection() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -28% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-6 md:py-8 lg:py-12"
    >
      {/*
        Padding wrapper — always has the final Tailwind padding class so
        the browser knows the target value. Inline style overrides padding
        to 0 before visible, then removes the override so it transitions
        smoothly to the class value. max-width uses a concrete px→px
        interpolation (100vw→1440px) to avoid layout jumps from class toggles.
      */}
      <div
        className="mx-auto px-4 md:px-8 lg:px-12"
        style={{
          maxWidth: visible ? "1440px" : "100vw",
          ...(visible ? {} : { paddingLeft: 0, paddingRight: 0 }),
          transition:
            "max-width 520ms cubic-bezier(0.16, 1, 0.3, 1), padding-left 520ms cubic-bezier(0.16, 1, 0.3, 1), padding-right 520ms cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Dark card — border-radius also transitioned via inline style */}
        <div
          className="bg-[#21222c] overflow-hidden flex flex-col items-center gap-6 p-6 md:gap-8 md:p-12 lg:gap-12 lg:p-24"
          style={{
            borderRadius: visible ? "1rem" : 0,
            transition: "border-radius 520ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* ── Header ── */}
          <div className="flex flex-col items-center gap-6 w-full max-w-[646px]">

            {/* Overline + Heading + Body */}
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

            {/* CTA */}
            <button
              type="button"
              className="flex items-center gap-1 bg-[#0170cb] hover:bg-[#00399d] text-white rounded-full px-4 py-2 font-body text-[16px] leading-6 font-medium"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(14px)",
                transition:
                  "opacity 0.6s ease-out 0.36s, transform 0.6s ease-out 0.36s, background-color 0.3s ease-out",
              }}
            >
              Start with our guides
              <svg
                width="20"
                height="20"
                viewBox="0 0 256 256"
                fill="none"
                stroke="white"
                strokeWidth={16}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="shrink-0"
              >
                <line x1="40" y1="128" x2="216" y2="128" />
                <polyline points="144 56 216 128 144 200" />
              </svg>
            </button>
          </div>

          {/* ── Feature Cards — stagger left → right ── */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6 w-full">
            {CARDS.map(({ Icon, title, body }, i) => (
              <div
                key={title}
                className="bg-white border border-[rgba(33,34,44,0.16)] rounded-2xl shadow-[0px_24px_48px_-12px_rgba(0,13,61,0.18)] p-4 flex flex-row items-start gap-3 md:flex-col md:gap-4 md:p-6 lg:p-8"
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
                  <p className="font-body text-[16px] leading-6 text-[#595c69]">
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
