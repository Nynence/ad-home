import Link from "next/link";
import { NewspaperClippingIcon, UsersThreeIcon } from "./icons";

// ── Static data ───────────────────────────────────────────────────────────────

type Destination = {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
  href: string;
  Icon: ({ className }: { className?: string }) => React.ReactElement;
};

const DESTINATIONS: Destination[] = [
  {
    id: "the-local",
    eyebrow: "News, insights & guides",
    title: "The Local",
    body: "Our view on everything shaping new home living in Australia; the neighbourhoods, the creators, the design, the market, and the decisions that get you there.",
    cta: "Read The Local",
    href: "/the-local",
    Icon: NewspaperClippingIcon,
  },
  {
    id: "behind-the-build",
    eyebrow: "Get to know the teams",
    title: "Behind The Build",
    body: "Explore the teams behind a development to understand roles, compare track records, and see associated projects.",
    cta: "Explore Behind The Build",
    href: "/behind-the-build",
    Icon: UsersThreeIcon,
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function GetTheFullPicture() {
  return (
    <section
      aria-label="Get the Full Picture"
      className="w-full bg-[var(--background-secondary)] pt-6 pb-12 md:pt-8 md:pb-16 lg:pt-12 lg:pb-24"
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-8 lg:px-12">
        {/* Heading + cards — 32px gap on every breakpoint */}
        <div className="flex flex-col gap-8">
          <h2 className="font-heading text-[32px] font-semibold leading-10 tracking-[-0.5px] text-[var(--content-primary)] md:text-[36px] md:leading-[44px]">
            Get the Full Picture
          </h2>

          {/* Destinations: stacked on mobile, two columns on tablet+ */}
          <div className="flex flex-col gap-8 md:flex-row md:gap-6 lg:gap-8">
            {DESTINATIONS.map(({ id, eyebrow, title, body, cta, href, Icon }) => (
              <div
                key={id}
                className="flex flex-col gap-6 md:flex-1 md:min-w-0"
              >
                {/* Placeholder for a future background/video — fixed aspect ratio */}
                <div
                  className="aspect-[656/360] w-full rounded-2xl bg-[var(--surface-secondary)]"
                  aria-hidden="true"
                />

                <div className="flex w-full max-w-[500px] flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-2">
                      <p className="font-body text-[12px] font-medium uppercase leading-4 text-[var(--content-tertiary)]">
                        {eyebrow}
                      </p>
                      <h3 className="font-heading text-[28px] font-semibold leading-9 tracking-[-0.5px] text-[var(--content-primary)] md:text-[32px] md:leading-10">
                        {title}
                      </h3>
                    </div>
                    <p className="font-body text-[18px] font-normal leading-6 text-[var(--content-secondary)]">
                      {body}
                    </p>
                  </div>

                  <Link
                    href={href}
                    className="inline-flex w-fit items-center justify-center gap-1 rounded-full bg-[var(--surface-inverse-primary)] px-4 py-2 text-[var(--content-inverse-primary)] transition-transform duration-200 active:scale-[0.98]"
                  >
                    <Icon className="h-5 w-5 shrink-0" />
                    <span className="font-body text-[16px] font-medium leading-6">
                      {cta}
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
