import { motion } from "motion/react";
import { SUBMIT_LABEL_IDLE, SUBMIT_LABEL_SUBMITTING } from "@/content/contact";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import type { SubmissionStatus } from "@/hooks/useContactForm";

interface SubmitButtonProps {
  status: SubmissionStatus;
}

/** Idle → submitting (label swap + a sweeping indeterminate bar). Success/error swap out the whole form, not this button. */
export function SubmitButton({ status }: SubmitButtonProps) {
  const reducedMotion = useReducedMotion();
  const isSubmitting = status === "submitting";

  return (
    <button
      type="submit"
      disabled={isSubmitting}
      data-cursor="hover"
      aria-busy={isSubmitting}
      className={cn(buttonClasses({ variant: "primary", size: "lg" }), "relative isolate w-full overflow-hidden sm:w-auto")}
    >
      <span className={cn("relative z-10", isSubmitting && "opacity-80")}>
        {isSubmitting ? SUBMIT_LABEL_SUBMITTING : SUBMIT_LABEL_IDLE}
      </span>

      {isSubmitting && !reducedMotion ? (
        <motion.span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-1/3 bg-void/25"
          animate={{ x: ["-100%", "300%"] }}
          transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
        />
      ) : null}
    </button>
  );
}
