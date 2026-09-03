import { Marquee } from "@/components/motion/Marquee";
import { CAPABILITY_ROW_1, CAPABILITY_ROW_2 } from "@/content/capabilities";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

interface TickerItemProps {
  label: string;
  /** Tailwind opacity-modified text color class for the dim/resting state. */
  dimClassName: string;
}

function TickerItem({ label, dimClassName }: TickerItemProps) {
  return (
    <span className="group inline-flex shrink-0 items-center" data-cursor="hover">
      <span
        className={cn(
          "whitespace-nowrap font-display text-[clamp(1.75rem,3.5vw,3rem)] font-light transition-colors duration-300 group-hover:text-text",
          dimClassName,
        )}
      >
        {label}
      </span>
      <span
        aria-hidden="true"
        className="mx-6 h-1.5 w-1.5 shrink-0 rotate-45 bg-ember transition-shadow duration-300 group-hover:shadow-[0_0_10px_var(--color-ember)]"
      />
    </span>
  );
}

/** Edge-to-edge, dual-direction scrolling capability band directly under the hero. */
export function CapabilityTicker() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    const allItems = [...CAPABILITY_ROW_1, ...CAPABILITY_ROW_2];
    return (
      <div className="border-y border-line px-5 py-8">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {allItems.map((label) => (
            <span key={label} className="font-display text-lg font-light text-text/60">
              {label}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-[72px] flex-col overflow-hidden border-y border-line sm:h-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[15%]"
        style={{ background: "linear-gradient(to right, var(--color-void), transparent)" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[15%]"
        style={{ background: "linear-gradient(to left, var(--color-void), transparent)" }}
      />

      <Marquee
        speed={40}
        direction="left"
        pauseOnHover={false}
        hoverSlowFactor={0.25}
        className="flex-1 items-center"
      >
        {CAPABILITY_ROW_1.map((label) => (
          <TickerItem key={label} label={label} dimClassName="text-text/[0.18]" />
        ))}
      </Marquee>

      <Marquee
        speed={52}
        direction="right"
        pauseOnHover={false}
        hoverSlowFactor={0.25}
        className="flex-1 items-center"
      >
        {CAPABILITY_ROW_2.map((label) => (
          <TickerItem key={label} label={label} dimClassName="text-text/[0.10]" />
        ))}
      </Marquee>
    </div>
  );
}
