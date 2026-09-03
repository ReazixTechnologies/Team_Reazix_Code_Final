import { motion } from "motion/react";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ChoiceGroup } from "./ChoiceGroup";
import { FormField } from "./FormField";
import { FormProgress } from "./FormProgress";
import { SubmitButton } from "./SubmitButton";
import { buttonClasses } from "@/components/ui/Button";
import {
  BACK_LABEL,
  BUDGET_FIELD_LABEL,
  BUDGET_HELPER,
  BUDGET_OPTIONS,
  COMPANY_LABEL,
  COMPANY_OPTIONAL_HINT,
  EMAIL_LABEL,
  ERROR_BODY,
  ERROR_HEADING,
  ERROR_RETRY_LABEL,
  HONEYPOT_FIELD_NAME,
  MESSAGE_LABEL,
  MESSAGE_PLACEHOLDER,
  NAME_LABEL,
  NEXT_LABEL,
  PROJECT_TYPE_FIELD_LABEL,
  PROJECT_TYPE_OPTIONS,
  REFERRAL_LABEL,
  REFERRAL_OPTIONAL_HINT,
  SERVICES_FIELD_LABEL,
  SERVICES_HELPER,
  STEP_1_HEADING,
  STEP_2_HEADING,
  STEP_3_HEADING,
  STEP_LABELS,
  SUCCESS_BODY,
  SUCCESS_FROM_PREFIX,
  SUCCESS_HEADING,
  TIMELINE_FIELD_LABEL,
  TIMELINE_OPTIONS,
} from "@/content/contact";
import { SERVICES } from "@/content/services";
import { siteConfig } from "@/content/site";
import { useContactForm, type ContactFieldErrors } from "@/hooks/useContactForm";
import { useCurrency } from "@/hooks/useCurrency";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** A checkmark that draws itself once — the success confirmation's visual anchor. */
function DrawnCheckmark() {
  const reducedMotion = useReducedMotion();
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <motion.circle
        cx="28"
        cy="28"
        r="26"
        stroke="var(--color-ember)"
        strokeWidth="1.5"
        initial={reducedMotion ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.6, ease: EASE }}
      />
      <motion.path
        d="M17 29L24.5 36.5L39 20"
        stroke="var(--color-ember)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reducedMotion ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reducedMotion ? 0 : 0.5, ease: EASE, delay: reducedMotion ? 0 : 0.5 }}
      />
    </svg>
  );
}

interface SuccessPanelProps {
  email: string;
}

function SuccessPanel({ email }: SuccessPanelProps) {
  return (
    <div role="status" className="flex flex-col items-center gap-6 py-12 text-center">
      <DrawnCheckmark />
      <h3 className="font-display text-h3 font-light text-text">{SUCCESS_HEADING}</h3>
      <p className="max-w-sm text-body text-text-muted">{SUCCESS_BODY}</p>
      <p className="font-mono text-label uppercase tracking-[0.22em] text-text-faint">
        {SUCCESS_FROM_PREFIX} {email}
      </p>
    </div>
  );
}

interface ErrorPanelProps {
  onRetry: () => void;
}

function ErrorPanel({ onRetry }: ErrorPanelProps) {
  return (
    <div role="alert" className="flex flex-col items-center gap-6 py-12 text-center">
      <h3 className="font-display text-h3 font-light text-text">{ERROR_HEADING}</h3>
      <p className="max-w-sm text-body text-text-muted">
        {ERROR_BODY} <a href={`mailto:${siteConfig.email}`} className="text-ember underline underline-offset-4">{siteConfig.email}</a>
      </p>
      <button type="button" onClick={onRetry} data-cursor="hover" className={buttonClasses({ variant: "outline", size: "md" })}>
        {ERROR_RETRY_LABEL}
      </button>
    </div>
  );
}

const EXIT_DURATION_MS = 300;

/**
 * Drives the step-swap transition with plain CSS transitions instead of AnimatePresence.
 *
 * AnimatePresence's exit-completion callback never fired for this swap in testing (verified
 * with a minimal repro: a bare two-branch ternary + motion.div, no nested fields, still stuck —
 * see git history/PR notes) under this exact motion@13.1.1 + React 19.2 combination, leaving the
 * old step permanently on screen. This hook reproduces the same visual spec deterministically:
 * outgoing opacity 0 / x -40 (0.3s), incoming x 40 -> 0 (0.5s EASE), height free to change via
 * normal layout since the content itself swaps only once the exit finishes.
 */
function useStepTransition(step: number, reducedMotion: boolean) {
  const [displayedStep, setDisplayedStep] = useState(step);
  const [phase, setPhase] = useState<"visible" | "exiting" | "entering">("visible");
  const [trackedStep, setTrackedStep] = useState(step);
  const timeoutRef = useRef<number | null>(null);

  // React's documented "adjusting state when a prop changes" pattern: detect the change
  // during render (not in an effect) and kick off the exit synchronously. reduced motion
  // skips the transition entirely and jumps straight to the new step.
  if (step !== trackedStep) {
    setTrackedStep(step);
    if (reducedMotion) {
      setDisplayedStep(step);
      setPhase("visible");
    } else {
      setPhase("exiting");
    }
  }

  useEffect(() => {
    if (phase !== "exiting") return;

    timeoutRef.current = window.setTimeout(() => {
      setDisplayedStep(step);
      setPhase("entering");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setPhase("visible"));
      });
    }, EXIT_DURATION_MS);

    return () => {
      if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
    };
  }, [phase, step]);

  return { displayedStep, phase };
}

/** The three-step form. Success and error states replace this content entirely; nothing entered is ever lost. */
export function ContactForm() {
  const form = useContactForm();
  const { currency } = useCurrency();
  const reducedMotion = useReducedMotion();
  const { displayedStep, phase } = useStepTransition(form.step, reducedMotion);

  const fieldRefs = useRef<Partial<Record<keyof ContactFieldErrors, HTMLElement | null>>>({});

  useEffect(() => {
    const firstErrorField = Object.keys(form.errors)[0] as keyof ContactFieldErrors | undefined;
    if (firstErrorField) {
      fieldRefs.current[firstErrorField]?.focus();
    }
    // Only re-run when the error set itself changes, not on every value keystroke.
  }, [form.errors]);

  if (form.status === "success") {
    return <SuccessPanel email={form.values.email} />;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (form.step === form.stepCount - 1) {
      void form.submit();
    } else {
      form.goNext();
    }
  }

  const serviceOptions = SERVICES.map((service) => ({ value: service.id, label: service.title, accent: service.accent }));

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-10">
      {/* Honeypot — hidden from sighted users and screen readers alike; real visitors never touch it. */}
      <div aria-hidden="true" tabIndex={-1} className="absolute h-0 w-0 overflow-hidden opacity-0">
        <label htmlFor={HONEYPOT_FIELD_NAME}>Leave this field blank</label>
        <input
          id={HONEYPOT_FIELD_NAME}
          name={HONEYPOT_FIELD_NAME}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.values.honeypot}
          onChange={(event) => form.setField("honeypot", event.target.value)}
        />
      </div>

      <FormProgress step={form.step} furthestStep={form.furthestStep} labels={STEP_LABELS} onStepClick={form.goToStep} />

      {form.status === "error" ? (
        <ErrorPanel onRetry={form.retry} />
      ) : (
        <>
          <div
            className={cn(
              "overflow-hidden transition-[opacity,transform] ease-out-expo",
              phase === "exiting" && "duration-300 opacity-0 -translate-x-10",
              phase === "entering" && "duration-[0ms] opacity-0 translate-x-10",
              phase === "visible" && "duration-500 opacity-100 translate-x-0",
            )}
          >
            {displayedStep === 0 ? (
              <div className="flex flex-col gap-10">
                <h3 className="font-display text-h3 font-light text-text">{STEP_1_HEADING}</h3>

                <ChoiceGroup
                  ref={(el) => {
                    fieldRefs.current.services = el;
                  }}
                  legend={SERVICES_FIELD_LABEL}
                  helper={SERVICES_HELPER}
                  options={serviceOptions}
                  selected={form.values.services}
                  onSelect={form.toggleService}
                  multiple
                  error={form.errors.services}
                />

                <ChoiceGroup
                  ref={(el) => {
                    fieldRefs.current.projectType = el;
                  }}
                  legend={PROJECT_TYPE_FIELD_LABEL}
                  options={PROJECT_TYPE_OPTIONS}
                  selected={form.values.projectType ? [form.values.projectType] : []}
                  onSelect={(value) => form.setField("projectType", value)}
                  error={form.errors.projectType}
                />
              </div>
            ) : displayedStep === 1 ? (
              <div className="flex flex-col gap-10">
                <h3 className="font-display text-h3 font-light text-text">{STEP_2_HEADING}</h3>

                <ChoiceGroup
                  ref={(el) => {
                    fieldRefs.current.budget = el;
                  }}
                  legend={BUDGET_FIELD_LABEL}
                  helper={BUDGET_HELPER}
                  options={BUDGET_OPTIONS.map((option) => ({
                    value: option.value,
                    label: currency === "INR" ? option.labelINR : option.labelUSD,
                  }))}
                  selected={form.values.budget ? [form.values.budget] : []}
                  onSelect={(value) => form.setField("budget", value)}
                  error={form.errors.budget}
                />

                <ChoiceGroup
                  ref={(el) => {
                    fieldRefs.current.timeline = el;
                  }}
                  legend={TIMELINE_FIELD_LABEL}
                  options={TIMELINE_OPTIONS}
                  selected={form.values.timeline ? [form.values.timeline] : []}
                  onSelect={(value) => form.setField("timeline", value)}
                  error={form.errors.timeline}
                />
              </div>
            ) : (
              <div className="flex flex-col gap-8">
                <h3 className="font-display text-h3 font-light text-text">{STEP_3_HEADING}</h3>

                <FormField
                  ref={(el) => {
                    fieldRefs.current.name = el;
                  }}
                  id="name"
                  label={NAME_LABEL}
                  required
                  value={form.values.name}
                  onChange={(value) => form.setField("name", value)}
                  error={form.errors.name}
                  autoComplete="name"
                />

                <FormField
                  ref={(el) => {
                    fieldRefs.current.email = el;
                  }}
                  id="email"
                  type="email"
                  label={EMAIL_LABEL}
                  required
                  value={form.values.email}
                  onChange={(value) => form.setField("email", value)}
                  error={form.errors.email}
                  autoComplete="email"
                />

                <FormField
                  id="company"
                  label={COMPANY_LABEL}
                  hint={COMPANY_OPTIONAL_HINT}
                  value={form.values.company}
                  onChange={(value) => form.setField("company", value)}
                  autoComplete="organization"
                />

                <FormField
                  ref={(el) => {
                    fieldRefs.current.message = el;
                  }}
                  id="message"
                  type="textarea"
                  label={MESSAGE_LABEL}
                  required
                  placeholder={MESSAGE_PLACEHOLDER}
                  value={form.values.message}
                  onChange={(value) => form.setField("message", value)}
                  error={form.errors.message}
                />

                <FormField
                  id="referral"
                  label={REFERRAL_LABEL}
                  hint={REFERRAL_OPTIONAL_HINT}
                  value={form.values.referral}
                  onChange={(value) => form.setField("referral", value)}
                />
              </div>
            )}
          </div>

          {form.rateLimitMessage ? (
            <p role="alert" className="border-l-4 border-ember py-1 pl-3 text-sm text-ember">
              {form.rateLimitMessage}
            </p>
          ) : null}

          <div className="flex items-center justify-between gap-4">
            {form.step > 0 ? (
              <button type="button" onClick={form.goBack} data-cursor="hover" className={buttonClasses({ variant: "ghost", size: "md" })}>
                {BACK_LABEL}
              </button>
            ) : (
              <span aria-hidden="true" />
            )}

            {form.step < form.stepCount - 1 ? (
              <button type="submit" data-cursor="hover" className={buttonClasses({ variant: "primary", size: "lg" })}>
                {NEXT_LABEL}
              </button>
            ) : (
              <SubmitButton status={form.status} />
            )}
          </div>
        </>
      )}
    </form>
  );
}
