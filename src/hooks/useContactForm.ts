import { useRef, useState } from "react";
import { RATE_LIMIT_MESSAGE, VALIDATION_MESSAGES } from "@/content/contact";
import { submitContact, type ContactPayload } from "@/lib/contactApi";
import { hasMinLength, hasSelection, isRequired, isValidEmail } from "@/lib/validation";

export interface ContactFormValues {
  services: string[];
  projectType: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  company: string;
  message: string;
  referral: string;
  /** Honeypot — real visitors never fill this in. Kept out of the submitted payload. */
  honeypot: string;
}

export type ContactFieldErrors = Partial<Record<keyof ContactFormValues, string>>;

export type SubmissionStatus = "idle" | "submitting" | "success" | "error";

const INITIAL_VALUES: ContactFormValues = {
  services: [],
  projectType: "",
  budget: "",
  timeline: "",
  name: "",
  email: "",
  company: "",
  message: "",
  referral: "",
  honeypot: "",
};

const STEP_COUNT = 3;
const RATE_LIMIT_MS = 30_000;

function validateStep(step: number, values: ContactFormValues): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  if (step === 0) {
    if (!hasSelection(values.services)) errors.services = VALIDATION_MESSAGES.servicesRequired;
    if (!isRequired(values.projectType)) errors.projectType = VALIDATION_MESSAGES.projectTypeRequired;
  }

  if (step === 1) {
    if (!isRequired(values.budget)) errors.budget = VALIDATION_MESSAGES.budgetRequired;
    if (!isRequired(values.timeline)) errors.timeline = VALIDATION_MESSAGES.timelineRequired;
  }

  if (step === 2) {
    if (!isRequired(values.name)) errors.name = VALIDATION_MESSAGES.nameRequired;
    if (!isRequired(values.email)) {
      errors.email = VALIDATION_MESSAGES.emailRequired;
    } else if (!isValidEmail(values.email)) {
      errors.email = VALIDATION_MESSAGES.emailInvalid;
    }
    if (!isRequired(values.message)) {
      errors.message = VALIDATION_MESSAGES.messageRequired;
    } else if (!hasMinLength(values.message, 20)) {
      errors.message = VALIDATION_MESSAGES.messageTooShort;
    }
  }

  return errors;
}

export function useContactForm() {
  const [step, setStep] = useState(0);
  const [furthestStep, setFurthestStep] = useState(0);
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [rateLimitMessage, setRateLimitMessage] = useState<string | null>(null);
  const lastSubmitAt = useRef(0);

  function setField<K extends keyof ContactFormValues>(field: K, value: ContactFormValues[K]) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function toggleService(id: string) {
    setValues((prev) => ({
      ...prev,
      services: prev.services.includes(id) ? prev.services.filter((item) => item !== id) : [...prev.services, id],
    }));
  }

  function goNext() {
    const stepErrors = validateStep(step, values);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) return false;

    const next = Math.min(step + 1, STEP_COUNT - 1);
    setStep(next);
    setFurthestStep((prev) => Math.max(prev, next));
    return true;
  }

  function goBack() {
    setErrors({});
    setStep((prev) => Math.max(prev - 1, 0));
  }

  function goToStep(target: number) {
    if (target > furthestStep || target === step) return;
    setErrors({});
    setStep(target);
  }

  async function submit() {
    const stepErrors = validateStep(2, values);
    setErrors(stepErrors);
    if (Object.keys(stepErrors).length > 0) return;

    const now = Date.now();
    if (lastSubmitAt.current !== 0 && now - lastSubmitAt.current < RATE_LIMIT_MS) {
      setRateLimitMessage(RATE_LIMIT_MESSAGE);
      return;
    }

    setRateLimitMessage(null);
    lastSubmitAt.current = now;
    setStatus("submitting");
    setErrorMessage(null);

    // Honeypot tripped — a real visitor never fills this in. Pretend success without submitting.
    if (values.honeypot.trim().length > 0) {
      setStatus("success");
      return;
    }

    const payload: ContactPayload = {
      services: values.services,
      projectType: values.projectType,
      budget: values.budget,
      timeline: values.timeline,
      name: values.name.trim(),
      email: values.email.trim(),
      company: values.company.trim(),
      message: values.message.trim(),
      referral: values.referral.trim(),
    };

    try {
      await submitContact(payload);
      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Unknown error");
    }
  }

  function retry() {
    setStatus("idle");
    setErrorMessage(null);
  }

  return {
    step,
    stepCount: STEP_COUNT,
    furthestStep,
    values,
    errors,
    status,
    errorMessage,
    rateLimitMessage,
    setField,
    toggleService,
    goNext,
    goBack,
    goToStep,
    submit,
    retry,
  };
}

export type UseContactFormResult = ReturnType<typeof useContactForm>;
