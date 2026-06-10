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
