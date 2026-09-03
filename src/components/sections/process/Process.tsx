import { ProcessIntro } from "./ProcessIntro";
import { ProcessLoop } from "./ProcessLoop";
import { ProcessMobile } from "./ProcessMobile";
import { ProcessTimeline } from "./ProcessTimeline";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Sells predictability: a calm, procedural walk through the seven phases. */
export function Process() {
  const reducedMotion = useReducedMotion();
  const isCompact = useMediaQuery("(max-width: 1023px)");
  const useMobileLayout = reducedMotion || isCompact;

  return (
    <section id="process" aria-labelledby="process-heading" className="relative bg-void">
      <ProcessIntro />
      {useMobileLayout ? <ProcessMobile /> : <ProcessTimeline />}
      <ProcessLoop />
    </section>
  );
}
