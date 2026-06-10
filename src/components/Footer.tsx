"use client";

import { useState } from "react";
import { useSectionContainerClass } from "./LayoutProvider";

// ── Data ─────────────────────────────────────────────────────────────────────

const FOOTER_STATES = [
  { id: "victoria", label: "Victoria" },
  { id: "nsw", label: "New South Wales" },
  { id: "qld", label: "Queensland" },
] as const;

type FooterStateId = (typeof FOOTER_STATES)[number]["id"];

const SUBURB_DATA: Record<FooterStateId, { heading: string; suburbs: string[] }> = {
  victoria: {
    heading: "New apartments in Melbourne",
    suburbs: [
      "Southbank", "Docklands", "South Yarra",
      "Carlton", "Richmond", "Collingwood",
      "Clifton Hill", "South Melbourne",
    ],
  },
  nsw: {
    heading: "New apartments in Sydney",
    suburbs: [
      "Surry Hills", "Pyrmont", "Parramatta",
      "Chatswood", "Newtown", "Bondi Junction",
      "Zetland", "Mascot",
    ],
  },
  qld: {
    heading: "New apartments in Brisbane",
    suburbs: [
      "South Brisbane", "Fortitude Valley", "New Farm",
      "Kangaroo Point", "West End", "Woolloongabba",
      "Bowen Hills", "Newstead",
    ],
  },
};

const NEW_HOMES_LINKS = [
  "Off-the-plan Apartments",
  "Off-the-plan Townhouses",
  "Off-the-plan Penthouses",
];

const BUILD_TO_LIVE_LINKS = [
  "How to buy off the plan",
  "Apartments vs. Houses",
  "Inspecting a display suite",
  "Sunset Clauses explained",
  "How to review an off-the-plan contract",
  "FIRB guide for foreign buyers",
  "Preparing for off-the-plan settlement",
];

// ── Icons ─────────────────────────────────────────────────────────────────────

function SearchIcon({ size = 16 }: { size?: 16 | 20 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <circle cx="6.667" cy="6.667" r="4.417" stroke="currentColor" strokeWidth="1.33" />
      <path d="M10.667 10.667L13.333 13.333" stroke="currentColor" strokeWidth="1.33" strokeLinecap="round" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <path
        d="M3.333 8h9.334M12.667 8L9.333 4.667M12.667 8L9.333 11.333"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
      <path
        d="M4.667 11.333L11.333 4.667M11.333 4.667H6.667M11.333 4.667V9.333"
        stroke="currentColor"
        strokeWidth="1.33"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="white"
        d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19.1C5.12 19.56 12 19.56 12 19.56s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.48z"
      />
      <polygon fill="#21222c" points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ADLogo() {
  return (
    <a href="/" className="block w-fit py-2" aria-label="Apartments & Developments — home">
      <div
        className="font-heading font-bold text-white leading-[1.15]"
        style={{ fontSize: "15px" }}
      >
        Apartments &amp;
      </div>
      <div
        className="font-heading font-bold text-white leading-[1.15]"
        style={{ fontSize: "15px" }}
      >
        Developments
      </div>
    </a>
  );
}

function HorizontalRule() {
  return <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.16)" }} />;
}

// ── Footer ────────────────────────────────────────────────────────────────────

export default function Footer() {
  const [activeState, setActiveState] = useState<FooterStateId>("victoria");
  const containerClass = useSectionContainerClass();
  const stateData = SUBURB_DATA[activeState];

  return (
    <footer className="w-full py-6 md:py-8" style={{ background: "#21222c" }}>
      <div className={containerClass}>
        <div className="flex flex-col gap-6 md:gap-8">

          {/* ── Top row: Logo col + Main content ──────────────── */}
          <div className="flex flex-col md:flex-row md:gap-8 md:py-4">

            {/* Logo + Description + Socials */}
            <div className="flex flex-col gap-4 md:gap-6 md:w-[247px] md:shrink-0">
              <ADLogo />
              <p className="font-body text-[14px] leading-5 text-white/[0.72]">
                Search every off-the-plan apartment and development across Australia
                before the rest of the market catches on.
              </p>
              <div className="flex gap-4">
                <a href="#" aria-label="Facebook" className="opacity-100 hover:opacity-70 transition-opacity">
                  <FacebookIcon />
                </a>
                <a href="#" aria-label="Instagram" className="opacity-100 hover:opacity-70 transition-opacity">
                  <InstagramIcon />
                </a>
                <a href="#" aria-label="LinkedIn" className="opacity-100 hover:opacity-70 transition-opacity">
                  <LinkedInIcon />
                </a>
                <a href="#" aria-label="YouTube" className="opacity-100 hover:opacity-70 transition-opacity">
                  <YouTubeIcon />
                </a>
              </div>
            </div>

            {/* Vertical divider — md+ only */}
            <div
              className="hidden md:block w-px shrink-0 self-stretch"
              style={{ background: "rgba(255,255,255,0.16)" }}
              aria-hidden="true"
            />

            {/* Main content */}
            <div className="flex-1 flex flex-col gap-6 md:gap-8 min-w-0 mt-6 md:mt-0">

              {/* States section */}
              <div className="flex flex-col gap-4 md:gap-6">
                {/* State tab bar */}
                <div
                  className="border-b overflow-x-auto"
                  style={{ borderColor: "rgba(255,255,255,0.16)" }}
                >
                  <div className="flex" role="tablist" aria-label="Browse by state">
                    {FOOTER_STATES.map((s) => (
                      <button
                        key={s.id}
                        role="tab"
                        aria-selected={activeState === s.id}
                        onClick={() => setActiveState(s.id)}
                        className={[
                          "px-6 py-4 font-body text-[16px] leading-6 whitespace-nowrap shrink-0",
                          "border-b-4 -mb-px transition-colors duration-150",
                          activeState === s.id
                            ? "font-semibold text-white border-white"
                            : "font-normal text-white/[0.72] border-transparent hover:text-white",
                        ].join(" ")}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Suburb links */}
                <div className="flex flex-col gap-4">
                  <a
                    href="#"
                    className="flex items-center gap-1 font-body text-[16px] font-medium leading-6 text-white hover:text-white/80 transition-colors w-fit"
                  >
                    {stateData.heading}
                    <SearchIcon size={20} />
                  </a>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-x-4 md:gap-x-8 gap-y-3">
                    {stateData.suburbs.map((suburb) => (
                      <a
                        key={suburb}
                        href="#"
                        className="flex items-center gap-1 font-body text-[14px] leading-5 text-white hover:text-white/80 transition-colors w-fit"
                      >
                        {suburb}
                        <SearchIcon size={16} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <HorizontalRule />

              {/* Secondary content: New Homes + Build to Live */}
              <div className="flex flex-col gap-6 md:flex-row md:gap-8 lg:grid lg:grid-cols-3 lg:gap-x-8">

                {/* New Homes */}
                <div className="flex flex-col gap-4 md:flex-1 lg:flex-none lg:col-span-1">
                  <p className="font-body text-[12px] font-medium leading-4 uppercase tracking-wide text-white/[0.72]">
                    New Homes
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-3">
                    {NEW_HOMES_LINKS.map((link) => (
                      <a
                        key={link}
                        href="#"
                        className="flex items-center gap-1 font-body text-[14px] leading-5 text-white hover:text-white/80 transition-colors w-fit"
                      >
                        {link}
                        <SearchIcon size={16} />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Build to Live */}
                <div className="flex flex-col gap-4 md:flex-1 lg:flex-none lg:col-span-2">
                  <p className="font-body text-[12px] font-medium leading-4 uppercase tracking-wide text-white/[0.72]">
                    Build to Live
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-x-4 lg:gap-x-8 gap-y-3">
                    {BUILD_TO_LIVE_LINKS.map((link) => (
                      <a
                        key={link}
                        href="#"
                        className="flex items-center gap-1 font-body text-[14px] leading-5 text-white hover:text-white/80 transition-colors w-fit"
                      >
                        {link}
                        <ArrowRightIcon />
                      </a>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ── Bottom: Divider + Copyright bar ───────────────── */}
          <HorizontalRule />

          <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center md:justify-between">
            {/* Terms links */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <a
                href="#"
                className="flex items-center gap-1 font-body text-[14px] font-medium leading-5 text-white/[0.72] underline hover:text-white transition-colors"
              >
                AD Group
                <ArrowUpRightIcon />
              </a>
              {/* Pipe separator */}
              <span
                className="w-px h-4 shrink-0"
                style={{ background: "rgba(255,255,255,0.24)" }}
                aria-hidden="true"
              />
              <a
                href="#"
                className="font-body text-[14px] font-medium leading-5 text-white/[0.72] underline hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="font-body text-[14px] font-medium leading-5 text-white/[0.72] underline hover:text-white transition-colors"
              >
                Terms of use
              </a>
              <a
                href="#"
                className="font-body text-[14px] font-medium leading-5 text-white/[0.72] underline hover:text-white transition-colors"
              >
                Advertise with us
              </a>
            </div>
            {/* Copyright */}
            <p className="font-body text-[14px] leading-5 text-white/[0.72] md:text-right">
              © 2026 AD Group (Australia) Holdings Pty Ltd. All rights reserved.
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
