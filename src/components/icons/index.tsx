// Phosphor Icons (regular weight), 256×256 viewBox, stroke 16, round caps.

type IconProps = { className?: string };

export function MenuIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="40" y1="64" x2="216" y2="64" />
      <line x1="40" y1="128" x2="216" y2="128" />
      <line x1="40" y1="192" x2="216" y2="192" />
    </svg>
  );
}

export function SearchIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="112" cy="112" r="80" />
      <line x1="168.57" y1="168.57" x2="224" y2="224" />
    </svg>
  );
}

export function ArrowRightIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="40" y1="128" x2="216" y2="128" />
      <polyline points="144 56 216 128 144 200" />
    </svg>
  );
}

export function SunIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="128" cy="128" r="60" />
      <line x1="128" y1="28" x2="128" y2="52" />
      <line x1="128" y1="204" x2="128" y2="228" />
      <line x1="28" y1="128" x2="52" y2="128" />
      <line x1="204" y1="128" x2="228" y2="128" />
      <line x1="69.1" y1="69.1" x2="86.4" y2="86.4" />
      <line x1="169.6" y1="169.6" x2="186.9" y2="186.9" />
      <line x1="186.9" y1="69.1" x2="169.6" y2="86.4" />
      <line x1="86.4" y1="169.6" x2="69.1" y2="186.9" />
    </svg>
  );
}

export function MoonIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M235.54 150.21a104.06 104.06 0 0 1-121.75-121.75 104 104 0 1 0 121.75 121.75z" />
    </svg>
  );
}

export function XIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="200" y1="56" x2="56" y2="200" />
      <line x1="56" y1="56" x2="200" y2="200" />
    </svg>
  );
}

export function GridFourIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="32" y="32" width="80" height="80" rx="8" />
      <rect x="144" y="32" width="80" height="80" rx="8" />
      <rect x="32" y="144" width="80" height="80" rx="8" />
      <rect x="144" y="144" width="80" height="80" rx="8" />
    </svg>
  );
}

export function SlideshowIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="32" y="56" width="192" height="144" rx="8" />
      <line x1="96" y1="220" x2="160" y2="220" />
      <line x1="128" y1="200" x2="128" y2="220" />
    </svg>
  );
}

export function AccordionIcon({ className = "w-5 h-5" }: IconProps) {
  // A list where the first item has an expanded card beneath it
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="32" y1="68" x2="224" y2="68" />
      <rect x="32" y="84" width="192" height="60" rx="8" />
      <line x1="32" y1="160" x2="224" y2="160" />
      <line x1="32" y1="192" x2="224" y2="192" />
    </svg>
  );
}

export function MapPinIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="128" cy="104" r="32" />
      <path d="M208 104c0 72-80 128-80 128s-80-56-80-128a80 80 0 0 1 160 0Z" />
    </svg>
  );
}

export function ProhibitIcon({ className = "w-5 h-5" }: IconProps) {
  // "None" — circle with a slash
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="128" cy="128" r="96" />
      <line x1="60" y1="60" x2="196" y2="196" />
    </svg>
  );
}

export function PillIcon({ className = "w-5 h-5" }: IconProps) {
  // A bar with a small pill below it
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="32" y="56" width="192" height="56" rx="28" />
      <rect x="80" y="148" width="96" height="44" rx="22" />
    </svg>
  );
}

export function ColumnsIcon({ className = "w-5 h-5" }: IconProps) {
  // Two pills side by side
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="28" y="88" width="84" height="80" rx="40" />
      <rect x="144" y="88" width="84" height="80" rx="40" />
    </svg>
  );
}

export function TabsIcon({ className = "w-5 h-5" }: IconProps) {
  // A small control above a bar
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="80" y="48" width="96" height="40" rx="20" />
      <rect x="32" y="120" width="192" height="56" rx="28" />
    </svg>
  );
}

export function BannerIcon({ className = "w-5 h-5" }: IconProps) {
  // A small strip above a bar
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="48" y="40" width="160" height="40" rx="12" />
      <rect x="32" y="112" width="192" height="64" rx="32" />
    </svg>
  );
}

export function CursorClickIcon({ className = "w-5 h-5" }: IconProps) {
  // Hover / pointer interaction
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M212.7 152.2 174 165l-12.8 38.7a8 8 0 0 1-14.9.6L98.3 84.3a8 8 0 0 1 10.4-10.4l119 48a8 8 0 0 1-.6 14.9Z" />
      <line x1="48" y1="48" x2="64" y2="64" />
      <line x1="32" y1="104" x2="56" y2="104" />
      <line x1="104" y1="32" x2="104" y2="56" />
    </svg>
  );
}

export function ListIcon({ className = "w-5 h-5" }: IconProps) {
  // Underline-style list (lines)
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line x1="40" y1="80" x2="216" y2="80" />
      <line x1="40" y1="128" x2="216" y2="128" />
      <line x1="40" y1="176" x2="216" y2="176" />
    </svg>
  );
}

export function CardsIcon({ className = "w-5 h-5" }: IconProps) {
  // Card-style list (stacked filled rows)
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="32" y="48" width="192" height="56" rx="12" />
      <rect x="32" y="152" width="192" height="56" rx="12" />
    </svg>
  );
}

export function CaretDownIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="208 96 128 176 48 96" />
    </svg>
  );
}

export function CaretUpIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="48 160 128 80 208 160" />
    </svg>
  );
}

export function BinocularsIcon({ className = "w-5 h-5" }: IconProps) {
  // Phosphor Binoculars (regular) — fill-based, no stroke.
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M237.2,151.87v0a47.1,47.1,0,0,0-2.35-5.45L193.26,51.8a7.82,7.82,0,0,0-1.66-2.44,32,32,0,0,0-45.26,0A8,8,0,0,0,144,55V80H112V55a8,8,0,0,0-2.34-5.66,32,32,0,0,0-45.26,0,7.82,7.82,0,0,0-1.66,2.44L21.15,146.4a47.1,47.1,0,0,0-2.35,5.45v0A48,48,0,1,0,112,168V96h32v72a48,48,0,1,0,93.2-16.13ZM76.71,59.75a16,16,0,0,1,19.29-1v73.51a47.9,47.9,0,0,0-46.79-9.92ZM64,200a32,32,0,1,1,32-32A32,32,0,0,1,64,200ZM160,58.74a16,16,0,0,1,19.29,1l27.5,62.58A47.9,47.9,0,0,0,160,132.25ZM192,200a32,32,0,1,1,32-32A32,32,0,0,1,192,200Z" />
    </svg>
  );
}

// ── OTP section icons ────────────────────────────────────────────────────────

export function LockSimpleIcon({ className = "w-5 h-5" }: IconProps) {
  // Exact Figma path — 24×24 viewBox, stroke-based
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8.25 8.25V5.25C8.25 4.25544 8.64509 3.30161 9.34835 2.59835C10.0516 1.89509 11.0054 1.5 12 1.5C12.9946 1.5 13.9484 1.89509 14.6517 2.59835C15.3549 3.30161 15.75 4.25544 15.75 5.25V8.25M4.5 8.25H19.5C19.9142 8.25 20.25 8.58579 20.25 9V19.5C20.25 19.9142 19.9142 20.25 19.5 20.25H4.5C4.08579 20.25 3.75 19.9142 3.75 19.5V9C3.75 8.58579 4.08579 8.25 4.5 8.25Z" />
    </svg>
  );
}

export function ClockFaceIcon({ className = "w-5 h-5" }: IconProps) {
  // Exact Figma path — 24×24 viewBox, stroke-based
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 6.75V12H17.25M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" />
    </svg>
  );
}

export function SparkleIcon({ className = "w-5 h-5" }: IconProps) {
  // Exact Figma path — 24×24 viewBox, stroke-based
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M16.5 1.5V6M21 6.75v3M14.25 3.75h4.5M19.5 8.25H22.5M7.9 16.1l-5.165-1.903a.75.75 0 0 1 0-1.393L7.9 10.9l1.903-5.165a.75.75 0 0 1 1.393 0L13.1 10.9l5.164 1.903a.75.75 0 0 1 0 1.393L13.1 16.1l-1.903 5.164a.75.75 0 0 1-1.393 0Z" />
    </svg>
  );
}

// ── Development card detail icons (used in ActiveOnMarket) ───────────────────

export function BedIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <path d="M24,104V56a8,8,0,0,1,8-8H224a8,8,0,0,1,8,8V104" />
      <rect x="24" y="104" width="208" height="96" rx="8" />
      <line x1="24" y1="152" x2="232" y2="152" />
      <rect x="52" y="72" width="60" height="32" rx="4" />
      <rect x="144" y="72" width="60" height="32" rx="4" />
    </svg>
  );
}

export function BathtubIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <line x1="24" y1="120" x2="232" y2="120" />
      <path d="M24,120v48a64,64,0,0,0,128,0V120" />
      <path d="M24,120V72a24,24,0,0,1,48,0v8" />
    </svg>
  );
}

export function DeskIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="72" width="224" height="20" rx="4" />
      <line x1="60" y1="92" x2="60" y2="216" />
      <line x1="196" y1="92" x2="196" y2="216" />
      <path d="M196,148H96a8,8,0,0,1-8-8V92" />
    </svg>
  );
}

export function PoolIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <line x1="72" y1="24" x2="72" y2="104" />
      <line x1="184" y1="24" x2="184" y2="104" />
      <line x1="72" y1="64" x2="184" y2="64" />
      <path d="M16,144c24,0,24,28,48,28s24-28,48-28,24,28,48,28,24-28,48-28" />
      <path d="M16,200c24,0,24,28,48,28s24-28,48-28,24,28,48,28,24-28,48-28" />
    </svg>
  );
}

export function CarIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <rect x="16" y="104" width="224" height="96" rx="8" />
      <path d="M56,104L80,48h96l24,56" />
      <circle cx="72" cy="200" r="16" />
      <circle cx="184" cy="200" r="16" />
    </svg>
  );
}

export function BuildingIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 256 256" fill="none" stroke="currentColor" strokeWidth={16} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <rect x="24" y="48" width="96" height="184" />
      <rect x="120" y="96" width="112" height="136" />
      <line x1="8" y1="232" x2="248" y2="232" />
      <line x1="56" y1="80" x2="88" y2="80" />
      <line x1="56" y1="112" x2="88" y2="112" />
      <line x1="56" y1="144" x2="88" y2="144" />
      <rect x="52" y="184" width="40" height="48" />
      <line x1="152" y1="128" x2="184" y2="128" />
      <line x1="152" y1="160" x2="184" y2="160" />
    </svg>
  );
}

export function ClockIcon({ className = "w-5 h-5" }: IconProps) {
  // ClockCounterClockwise
  return (
    <svg
      className={className}
      viewBox="0 0 256 256"
      fill="none"
      stroke="currentColor"
      strokeWidth={16}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polyline points="80 104 32 104 32 56" />
      <path d="M65.49 65.49a96 96 0 1 1-1.42 124.6" />
      <polyline points="128 72 128 128 184 128" />
    </svg>
  );
}

export function NewspaperClippingIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M11.25 8.75H15M11.25 11.25H15M2.5 16.875V4.375C2.5 4.20924 2.56585 4.05027 2.68306 3.93306C2.80027 3.81585 2.95924 3.75 3.125 3.75H16.875C17.0408 3.75 17.1997 3.81585 17.3169 3.93306C17.4342 4.05027 17.5 4.20924 17.5 4.375V16.875L15 15.625L12.5 16.875L10 15.625L7.5 16.875L5 15.625L2.5 16.875ZM5 7.5H8.75V12.5H5V7.5Z" />
    </svg>
  );
}

export function UsersThreeIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M18.75 11.25C18.3138 10.6674 17.7477 10.1946 17.0967 9.86913C16.4457 9.54364 15.7278 9.37445 15 9.375C15.4675 9.37477 15.9256 9.24343 16.3223 8.99592C16.7189 8.7484 17.0382 8.39462 17.2439 7.97476C17.4495 7.5549 17.5333 7.08577 17.4858 6.62067C17.4382 6.15556 17.2612 5.71311 16.9748 5.34357C16.6884 4.97403 16.3041 4.6922 15.8656 4.53009C15.427 4.36798 14.9518 4.33209 14.4939 4.42649C14.036 4.5209 13.6138 4.74181 13.2751 5.06414C12.9365 5.38648 12.695 5.79732 12.5781 6.25M1.25 11.25C1.68625 10.6674 2.25234 10.1946 2.90331 9.86913C3.55429 9.54364 4.27219 9.37445 5 9.375C4.53247 9.37477 4.07433 9.24343 3.6777 8.99592C3.28106 8.7484 2.96178 8.39462 2.75611 7.97476C2.55044 7.5549 2.46663 7.08577 2.51419 6.62067C2.56176 6.15556 2.73879 5.71311 3.02518 5.34357C3.31158 4.97403 3.69586 4.6922 4.13439 4.53009C4.57292 4.36798 5.04811 4.33209 5.50601 4.42649C5.96392 4.5209 6.38617 4.74181 6.72482 5.06414C7.06347 5.38648 7.30495 5.79732 7.42184 6.25M10 14.375C11.7259 14.375 13.125 12.9759 13.125 11.25C13.125 9.52411 11.7259 8.125 10 8.125C8.27411 8.125 6.875 9.52411 6.875 11.25C6.875 12.9759 8.27411 14.375 10 14.375ZM10 14.375C9.11627 14.375 8.24784 14.6056 7.48054 15.0441C6.71325 15.4825 6.07366 16.1136 5.625 16.875M10 14.375C10.8837 14.375 11.7522 14.6056 12.5195 15.0441C13.2867 15.4825 13.9263 16.1136 14.375 16.875" />
    </svg>
  );
}
