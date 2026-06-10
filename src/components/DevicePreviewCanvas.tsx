"use client";

import { useState } from "react";

type Device = "desktop" | "tablet" | "mobile";

const DEVICES: {
  id: Device;
  label: string;
  width: number | null;
  height: string;
}[] = [
  // Desktop: subtract only the top padding (pt-20 = 80px) so the iframe
  // fills right to the bottom of the viewport with no gap.
  { id: "desktop", label: "Desktop", width: null, height: "calc(100dvh - 80px)" },
  { id: "tablet",  label: "Tablet",  width: 768,  height: "1024px" },
  { id: "mobile",  label: "Mobile",  width: 390,  height: "844px"  },
];

export default function DevicePreviewCanvas() {
  const [device, setDevice] = useState<Device>("desktop");
  const current = DEVICES.find((d) => d.id === device)!;

  const isDesktop = current.id === "desktop";

  return (
    // Desktop: no bottom padding so the frame sits flush to the viewport edge.
    // Tablet / mobile: keep pb-12 so the fixed-height frame has breathing room.
    <div
      className={[
        "flex min-h-screen flex-col items-center bg-[var(--surface-secondary)] pt-20",
        isDesktop ? "" : "pb-12",
      ].join(" ")}
    >
      {/* Floating device toggle */}
      <div className="fixed left-1/2 top-4 z-50 flex -translate-x-1/2 items-center gap-1 rounded-full border border-[var(--border-light)] bg-[var(--surface-primary)] px-2 py-1.5 shadow-[var(--shadow-lg)]">
        {DEVICES.map((d) => (
          <button
            key={d.id}
            onClick={() => setDevice(d.id)}
            className={[
              "rounded-full px-3 py-1 text-[13px] font-medium leading-5 transition-colors duration-200",
              device === d.id
                ? "bg-[var(--surface-inverse-primary)] text-[var(--content-inverse-primary)]"
                : "text-[var(--content-tertiary)] hover:text-[var(--content-primary)]",
            ].join(" ")}
          >
            {d.label}
          </button>
        ))}
      </div>

      {/* Device frame
          overflow-hidden lives on the iframe, not the wrapper, so that
          position:fixed elements inside the iframe stay anchored to the
          iframe's own viewport rather than scrolling with the content. */}
      <div
        className="w-full bg-white shadow-[var(--shadow-xl)] transition-all duration-700 ease-[var(--ease-out)]"
        style={{
          maxWidth: current.width ?? "100%",
          // Desktop: square bottom corners so it merges flush with the viewport edge.
          // Tablet / mobile: fully rounded card.
          borderRadius: isDesktop ? "16px 16px 0 0" : "16px",
        }}
      >
        <iframe
          src="/"
          title={`${current.label} preview`}
          className="block w-full overflow-hidden border-0"
          style={{
            height: current.height,
            borderRadius: isDesktop ? "16px 16px 0 0" : "16px",
          }}
        />
      </div>
    </div>
  );
}
