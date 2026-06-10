"use client";

import { useState } from "react";
import Image from "next/image";
import {
  SearchIcon,
  BedIcon,
  BathtubIcon,
  DeskIcon,
  PoolIcon,
  CarIcon,
  BuildingIcon,
} from "./icons";
import { useSectionContainerClass } from "./LayoutProvider";

// ── Types ────────────────────────────────────────────────────────────────────

type BadgeVariant = "green" | "blue";

type Development = {
  id: string;
  name: string;
  suburb: string;
  developer: string;
  image: string;
  badge?: { label: string; variant: BadgeVariant };
  priceFrom: string;
  types: string;
  beds: string;
  baths: string;
  study: string;
  pool: string;
  cars: string;
  stage: string;
  moveIn: string;
  sold: string;
  total: number;
};

type StateChip = {
  id: string;
  label: string;
  fullName: string;
  count: number;
  ctaImage: string;
};

// ── Static data ───────────────────────────────────────────────────────────────

const STATE_CHIPS: StateChip[] = [
  { id: "qld", label: "QLD", fullName: "Queensland",           count: 128, ctaImage: "/states/qld.jpg"  },
  { id: "vic", label: "VIC", fullName: "Victoria",             count: 167, ctaImage: "/states/vic.jpg"  },
  { id: "nsw", label: "NSW", fullName: "New South Wales",      count: 165, ctaImage: "/states/nsw.jpg"  },
  { id: "sa",  label: "SA",  fullName: "South Australia",      count:  54, ctaImage: "/states/sa.jpg"   },
  { id: "wa",  label: "WA",  fullName: "Western Australia",    count:  48, ctaImage: "/states/wa.jpg"   },
  { id: "act", label: "ACT", fullName: "Australian Capital Territory", count: 22, ctaImage: "/states/act.jpg" },
];

const DEVELOPMENTS: Record<string, Development[]> = {
  qld: [
    {
      id: "oro-newstead",
      name: "ORO Newstead",
      suburb: "Newstead, Queensland 4006",
      developer: "Panettiere Developments",
      image: "/areas/a7.jpg",
      badge: { label: "Price Updated", variant: "green" },
      priceFrom: "$1,249,000",
      types: "Apartments, Penthouses",
      beds: "1–4", baths: "1–3", study: "0–1", pool: "0–1", cars: "0–2",
      stage: "Pre-construction", moveIn: "Late 2027", sold: "10%", total: 186,
    },
    {
      id: "rivara-west-end",
      name: "Rivara West End",
      suburb: "West End, Queensland 4101",
      developer: "Traders in Purple",
      image: "/areas/a6.jpg",
      badge: { label: "New Images", variant: "green" },
      priceFrom: "$2,165,000",
      types: "Apartments, Penthouses",
      beds: "2–4", baths: "2–3", study: "0–1", pool: "0–1", cars: "1–2",
      stage: "Construction commenced", moveIn: "Late 2028", sold: "60%", total: 80,
    },
    {
      id: "victoria-albert",
      name: "Victoria & Albert, Broadbeach",
      suburb: "Broadbeach, Queensland 4218",
      developer: "Iris Capital",
      image: "/areas/a5.jpg",
      badge: { label: "New", variant: "blue" },
      priceFrom: "$3,200,000",
      types: "Apartments, Penthouses",
      beds: "2–4", baths: "2–3", study: "0–1", pool: "0–1", cars: "1–2",
      stage: "Pre-construction", moveIn: "Late 2027", sold: "75%", total: 35,
    },
  ],
  vic: [
    {
      id: "the-arc-southbank",
      name: "The Arc Southbank",
      suburb: "Southbank, Victoria 3006",
      developer: "MAB Corporation",
      image: "/areas/a1.jpg",
      badge: { label: "New", variant: "blue" },
      priceFrom: "$620,000",
      types: "Apartments",
      beds: "1–3", baths: "1–2", study: "0–1", pool: "0–0", cars: "0–1",
      stage: "Pre-construction", moveIn: "Mid 2027", sold: "35%", total: 220,
    },
    {
      id: "bayside-one",
      name: "Bayside One",
      suburb: "Brighton, Victoria 3186",
      developer: "Glenvill Developments",
      image: "/areas/a2.jpg",
      badge: { label: "Price Updated", variant: "green" },
      priceFrom: "$980,000",
      types: "Townhouses, Apartments",
      beds: "2–4", baths: "2–3", study: "0–1", pool: "0–1", cars: "1–2",
      stage: "Construction commenced", moveIn: "Early 2027", sold: "52%", total: 96,
    },
    {
      id: "northern-quarter",
      name: "Northern Quarter",
      suburb: "Brunswick, Victoria 3056",
      developer: "Nightingale Housing",
      image: "/areas/a3.jpg",
      priceFrom: "$530,000",
      types: "Apartments",
      beds: "1–3", baths: "1–2", study: "0–1", pool: "0–0", cars: "0–1",
      stage: "Construction commenced", moveIn: "Late 2026", sold: "88%", total: 68,
    },
  ],
  nsw: [
    {
      id: "one-sydney-harbour",
      name: "One Sydney Harbour",
      suburb: "Barangaroo, NSW 2000",
      developer: "Lendlease",
      image: "/areas/a4.jpg",
      badge: { label: "New Images", variant: "green" },
      priceFrom: "$2,450,000",
      types: "Apartments, Penthouses",
      beds: "1–4", baths: "1–4", study: "0–1", pool: "0–1", cars: "1–3",
      stage: "Construction commenced", moveIn: "Mid 2027", sold: "70%", total: 214,
    },
    {
      id: "northern-beaches-collection",
      name: "Northern Beaches Collection",
      suburb: "Manly, NSW 2095",
      developer: "Mirvac",
      image: "/areas/a5.jpg",
      badge: { label: "New", variant: "blue" },
      priceFrom: "$1,195,000",
      types: "Apartments",
      beds: "1–3", baths: "1–2", study: "0–1", pool: "0–0", cars: "0–2",
      stage: "Pre-construction", moveIn: "Late 2027", sold: "20%", total: 142,
    },
    {
      id: "inner-west-quarter",
      name: "Inner West Quarter",
      suburb: "Newtown, NSW 2042",
      developer: "Deicorp",
      image: "/areas/a6.jpg",
      priceFrom: "$745,000",
      types: "Apartments",
      beds: "1–3", baths: "1–2", study: "0–1", pool: "0–0", cars: "0–1",
      stage: "Pre-construction", moveIn: "Late 2028", sold: "5%", total: 178,
    },
  ],
  sa: [
    {
      id: "east-end-terraces",
      name: "East End Terraces",
      suburb: "Adelaide, SA 5000",
      developer: "Renewal SA",
      image: "/areas/a3.jpg",
      badge: { label: "Price Updated", variant: "green" },
      priceFrom: "$490,000",
      types: "Apartments, Townhouses",
      beds: "1–3", baths: "1–2", study: "0–1", pool: "0–0", cars: "0–1",
      stage: "Construction commenced", moveIn: "Early 2027", sold: "45%", total: 84,
    },
    {
      id: "glenelg-residences",
      name: "Glenelg Residences",
      suburb: "Glenelg, SA 5045",
      developer: "Cedar Woods",
      image: "/areas/a2.jpg",
      priceFrom: "$620,000",
      types: "Apartments",
      beds: "1–3", baths: "1–2", study: "0–0", pool: "0–1", cars: "0–1",
      stage: "Pre-construction", moveIn: "Mid 2027", sold: "18%", total: 56,
    },
    {
      id: "norwood-place",
      name: "Norwood Place",
      suburb: "Norwood, SA 5067",
      developer: "Lantrak",
      image: "/areas/a1.jpg",
      badge: { label: "New", variant: "blue" },
      priceFrom: "$560,000",
      types: "Apartments",
      beds: "1–2", baths: "1–2", study: "0–1", pool: "0–0", cars: "0–1",
      stage: "Pre-construction", moveIn: "Late 2028", sold: "0%", total: 48,
    },
  ],
  wa: [
    {
      id: "perth-city-quarter",
      name: "Perth City Quarter",
      suburb: "Perth, WA 6000",
      developer: "Blackburne",
      image: "/areas/a7.jpg",
      badge: { label: "New Images", variant: "green" },
      priceFrom: "$485,000",
      types: "Apartments",
      beds: "1–3", baths: "1–2", study: "0–1", pool: "0–0", cars: "0–1",
      stage: "Construction commenced", moveIn: "Early 2027", sold: "55%", total: 132,
    },
    {
      id: "scarborough-edge",
      name: "Scarborough Edge",
      suburb: "Scarborough, WA 6019",
      developer: "Finbar",
      image: "/areas/a4.jpg",
      priceFrom: "$695,000",
      types: "Apartments",
      beds: "1–3", baths: "1–2", study: "0–0", pool: "0–1", cars: "0–1",
      stage: "Pre-construction", moveIn: "Late 2027", sold: "30%", total: 74,
    },
    {
      id: "cottesloe-grove",
      name: "Cottesloe Grove",
      suburb: "Cottesloe, WA 6011",
      developer: "Iris Capital",
      image: "/areas/a5.jpg",
      badge: { label: "New", variant: "blue" },
      priceFrom: "$1,150,000",
      types: "Apartments, Townhouses",
      beds: "2–4", baths: "2–3", study: "0–1", pool: "0–1", cars: "1–2",
      stage: "Pre-construction", moveIn: "Mid 2028", sold: "8%", total: 42,
    },
  ],
  act: [
    {
      id: "city-gate-canberra",
      name: "City Gate Canberra",
      suburb: "City, ACT 2601",
      developer: "Geocon",
      image: "/areas/a2.jpg",
      badge: { label: "Price Updated", variant: "green" },
      priceFrom: "$465,000",
      types: "Apartments",
      beds: "1–3", baths: "1–2", study: "0–1", pool: "0–0", cars: "0–1",
      stage: "Construction commenced", moveIn: "Mid 2026", sold: "72%", total: 160,
    },
    {
      id: "kingston-foreshore",
      name: "Kingston Foreshore",
      suburb: "Kingston, ACT 2604",
      developer: "Morris Property Group",
      image: "/areas/a3.jpg",
      priceFrom: "$680,000",
      types: "Apartments, Townhouses",
      beds: "1–3", baths: "1–2", study: "0–1", pool: "0–0", cars: "0–2",
      stage: "Pre-construction", moveIn: "Late 2027", sold: "25%", total: 88,
    },
    {
      id: "woden-central",
      name: "Woden Central",
      suburb: "Phillip, ACT 2606",
      developer: "Amalgamated Property",
      image: "/areas/a1.jpg",
      badge: { label: "New", variant: "blue" },
      priceFrom: "$420,000",
      types: "Apartments",
      beds: "1–2", baths: "1–1", study: "0–0", pool: "0–0", cars: "0–1",
      stage: "Pre-construction", moveIn: "Early 2028", sold: "0%", total: 110,
    },
  ],
};

// ── Badge colours ─────────────────────────────────────────────────────────────

const BADGE_STYLES: Record<BadgeVariant, string> = {
  green: "bg-[#e6faef] text-[#0da34b]",
  blue:  "bg-[#ebf2ff] text-[var(--content-brand)]",
};

// ── Sub-components ────────────────────────────────────────────────────────────

function ConfigItem({ icon, value }: { icon: React.ReactNode; value: string }) {
  return (
    <span className="flex items-center gap-1.5 text-[var(--content-tertiary)]">
      {icon}
      <span className="font-body text-[14px] leading-5">{value}</span>
    </span>
  );
}

function DevCard({ dev }: { dev: Development }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-[var(--border-light)] bg-[var(--surface-primary)]">
      {/* Thumbnail */}
      <div className="relative aspect-[350/196] w-full overflow-hidden">
        <Image
          src={dev.image}
          alt={dev.name}
          fill
          className="object-cover"
          sizes="(min-width:1024px) 33vw, 100vw"
        />

        {/* Badge */}
        {dev.badge && (
          <span
            className={[
              "absolute left-6 top-6 rounded-[4px] px-1 py-0.5 font-body text-[12px] font-semibold uppercase leading-4 shadow-[0px_4px_4px_rgba(0,13,61,0.1),0px_2px_2px_rgba(0,13,61,0.06)]",
              BADGE_STYLES[dev.badge.variant],
            ].join(" ")}
          >
            {dev.badge.label}
          </span>
        )}

        {/* Image dots */}
        <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={[
                "block h-1.5 rounded-full transition-all",
                i === 0 ? "w-4 bg-white" : "w-1.5 bg-white/50",
              ].join(" ")}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col">
        {/* Overview */}
        <div className="flex flex-col gap-4 px-6 pt-6">
          {/* Name / suburb / developer */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <p className="font-heading text-[24px] font-semibold leading-8 tracking-[-0.5px] text-[var(--content-primary)] truncate">
                {dev.name}
              </p>
              <p className="font-body text-[18px] leading-6 text-[var(--content-secondary)]">
                {dev.suburb}
              </p>
            </div>
            <p className="font-body text-[12px] font-medium uppercase tracking-[0.02em] leading-4 text-[var(--content-tertiary)]">
              By {dev.developer}
            </p>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-[var(--border-light)]" />

          {/* Price + config */}
          <div className="flex flex-col gap-2 pb-4">
            <div className="flex flex-col">
              <p className="font-body text-[18px] font-semibold leading-6 tracking-[-0.25px] text-[var(--content-primary)]">
                From {dev.priceFrom}
              </p>
              <p className="font-body text-[14px] leading-5 text-[var(--content-secondary)]">
                {dev.types}
              </p>
            </div>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              <ConfigItem icon={<BedIcon className="size-4" />}     value={dev.beds} />
              <ConfigItem icon={<BathtubIcon className="size-4" />} value={dev.baths} />
              <ConfigItem icon={<DeskIcon className="size-4" />}    value={dev.study} />
              <ConfigItem icon={<PoolIcon className="size-4" />}    value={dev.pool} />
              <ConfigItem icon={<CarIcon className="size-4" />}     value={dev.cars} />
            </div>
          </div>
        </div>

        {/* Data box */}
        <div className="mt-auto px-3 pb-3">
          <div className="overflow-hidden rounded-[12px] border border-[var(--border-subtle)] bg-[var(--surface-primary)]">
            {/* Build stage row */}
            <div className="flex flex-wrap items-center justify-between gap-y-0.5 p-3">
              <span className="flex items-center gap-1">
                <span className="inline-block h-3 w-3 rounded-full border-2 border-[var(--surface-subtle-brand)] bg-[var(--content-brand)]" />
                <span className="font-body text-[12px] font-medium leading-4 text-[var(--content-primary)]">
                  {dev.stage}
                </span>
              </span>
              <span className="font-body text-[12px] leading-4 text-[var(--content-tertiary)]">
                Move-in {dev.moveIn}
              </span>
            </div>

            {/* Availability row */}
            <div className="flex flex-wrap items-center justify-between gap-y-0.5 border-t border-[var(--border-subtle)] p-3">
              <span className="flex items-center gap-1">
                <BuildingIcon className="size-4 text-[var(--content-secondary)]" />
                <span className="font-body text-[12px] font-medium leading-4 text-[var(--content-primary)]">
                  {dev.sold} Sold
                </span>
              </span>
              <span className="font-body text-[12px] leading-4 text-[var(--content-tertiary)]">
                {dev.total} Total Residences
              </span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────

export default function ActiveOnMarket() {
  const containerClass = useSectionContainerClass();
  const [activeState, setActiveState] = useState("qld");

  const selected = STATE_CHIPS.find((s) => s.id === activeState)!;
  const devs = DEVELOPMENTS[activeState] ?? [];

  return (
    <section
      aria-label="Active on the Market"
      className="w-full bg-[var(--background-secondary)] pt-12 pb-24"
    >
      <div className={containerClass}>
        <div className="flex flex-col gap-8">
          {/* ── Header: title + state chips ── */}
          <div className="flex flex-col gap-8">
            <h2 className="font-heading text-[36px] font-semibold leading-[44px] tracking-[-0.5px] text-[var(--content-primary)]">
              Active on the Market
            </h2>

            {/* State chips */}
            <div className="flex flex-wrap gap-2">
              {STATE_CHIPS.map((s) => {
                const isActive = s.id === activeState;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveState(s.id)}
                    className={[
                      "rounded-full px-4 py-2 font-body text-[16px] font-medium leading-6 transition-all duration-150",
                      isActive
                        ? "border-2 border-[var(--content-brand)] bg-[var(--surface-subtle-brand)] text-[var(--content-primary)]"
                        : "border border-[var(--border-light)] bg-[var(--surface-primary)] text-[var(--content-primary)] hover:bg-[var(--surface-secondary)]",
                    ].join(" ")}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Development cards ── */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {devs.map((dev) => (
              <DevCard key={dev.id} dev={dev} />
            ))}
          </div>

          {/* ── CTA ── */}
          <div className="flex justify-center">
            <a
              href={`/search?state=${activeState}`}
              className="flex max-w-[560px] w-full items-center gap-3 rounded-2xl border border-[var(--border-light)] bg-[var(--surface-primary)] py-4 pl-4 pr-6 transition-shadow duration-300 hover:shadow-[var(--shadow-md)]"
            >
              {/* Thumbnail */}
              <div className="relative h-[46px] w-[46px] shrink-0 overflow-hidden rounded-[12px]">
                <Image
                  src={selected.ctaImage}
                  alt={selected.fullName}
                  fill
                  className="object-cover"
                  sizes="46px"
                />
              </div>

              {/* Text */}
              <div className="flex flex-1 flex-col">
                <span className="font-body text-[16px] font-semibold leading-6 tracking-[-0.25px] text-[var(--content-primary)]">
                  See All in {selected.fullName}
                </span>
                <span className="font-body text-[14px] leading-5 text-[var(--content-secondary)]">
                  {selected.count} developments
                </span>
              </div>

              {/* Search icon */}
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--border-light)] bg-[var(--surface-primary)]">
                <SearchIcon className="size-5 text-[var(--content-secondary)]" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
