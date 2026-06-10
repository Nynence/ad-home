import Navbar from "@/components/Navbar";
import HomeHero from "@/components/HomeHero";
import { LayoutProvider } from "@/components/LayoutProvider";

export default function HomePage() {
  return (
    <LayoutProvider>
      <Navbar />
      {/* flex-col so HomeHero's flex-1 can fill the remaining viewport height */}
      <main className="flex flex-col">
        <HomeHero />

        {/* Placeholder for subsequent sections — lets the hero search bar
            demonstrate its scroll-docking behaviour. */}
        <section className="border-t border-[var(--border-subtle)] bg-[var(--background-secondary)] px-6 py-32">
          <div className="mx-auto max-w-[1200px]">
            <h2 className="font-heading text-[32px] font-semibold tracking-[-0.5px] text-[var(--content-primary)]">
              Featured developments
            </h2>
            <p className="mt-2 max-w-[560px] font-body text-[18px] leading-6 text-[var(--content-secondary)]">
              More sections of the homepage continue below. Scroll to watch the
              search bar dock to the bottom and glide to the centre.
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-64 rounded-2xl border border-[var(--border-light)] bg-[var(--surface-primary)]"
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </LayoutProvider>
  );
}
