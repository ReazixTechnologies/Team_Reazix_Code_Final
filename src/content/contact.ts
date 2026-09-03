export interface ChoiceOption {
  value: string;
  label: string;
}

export interface BudgetOption {
  value: string;
  labelINR: string;
  labelUSD: string;
}

export const CONTACT_INTRO_EYEBROW = "Get in touch";

export const CONTACT_INTRO_HEADING = "Tell us what you are building.";

export const CONTACT_INTRO_DESCRIPTION =
  "Three short steps. No sales sequence afterwards — just a reply from the person who would actually work on it.";

export const CONTACT_PAGE_TITLE = "Contact";

export const CONTACT_PAGE_DESCRIPTION =
  "Tell us what you're building in three short steps — services, budget and timeline, then how to reach you.";

export const STEP_LABELS = ["Project", "Scope", "Contact"];

export const STEP_1_HEADING = "What are you building?";
export const STEP_2_HEADING = "Scope and timeline";
export const STEP_3_HEADING = "How do we reach you?";

export const SERVICES_FIELD_LABEL = "Which services are you after?";
export const SERVICES_HELPER = "Pick as many as apply — this is a starting point, not a commitment.";

export const PROJECT_TYPE_FIELD_LABEL = "What kind of project is this?";
export const PROJECT_TYPE_OPTIONS: ChoiceOption[] = [
  { value: "new-product", label: "New product" },
  { value: "redesign-rebuild", label: "Redesign / rebuild" },
  { value: "ongoing-partnership", label: "Ongoing partnership" },
  { value: "not-sure", label: "Not sure yet" },
];

export const BUDGET_FIELD_LABEL = "Budget range";
export const BUDGET_HELPER = "This helps us propose something real rather than a range with no meaning.";
export const BUDGET_OPTIONS: BudgetOption[] = [
  { value: "under-3l", labelINR: "Under ₹3L", labelUSD: "Under $4K" },
  { value: "3l-10l", labelINR: "₹3–10L", labelUSD: "$4K–13K" },
  { value: "10l-25l", labelINR: "₹10–25L", labelUSD: "$13K–32K" },
  { value: "25l-plus", labelINR: "₹25L+", labelUSD: "$32K+" },
  { value: "not-sure", labelINR: "Not sure yet", labelUSD: "Not sure yet" },
];

export const TIMELINE_FIELD_LABEL = "Timeline";
export const TIMELINE_OPTIONS: ChoiceOption[] = [
  { value: "asap", label: "ASAP" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "3-6-months", label: "3–6 months" },
  { value: "exploring", label: "Just exploring" },
];

export const NAME_LABEL = "Name";
export const EMAIL_LABEL = "Email";
export const COMPANY_LABEL = "Company";
export const COMPANY_OPTIONAL_HINT = "Optional";
export const MESSAGE_LABEL = "What are you trying to achieve?";
export const MESSAGE_PLACEHOLDER = "What are you trying to achieve, and what is in the way?";
export const REFERRAL_LABEL = "How did you find us?";
export const REFERRAL_OPTIONAL_HINT = "Optional";

export const HONEYPOT_FIELD_NAME = "website";

export const VALIDATION_MESSAGES = {
  servicesRequired: "Pick at least one — even a rough guess helps.",
  projectTypeRequired: "Choose the closest fit.",
  budgetRequired: "Pick a range, or ‘Not sure yet’.",
  timelineRequired: "Pick the closest timeline.",
  nameRequired: "We need a name to write back to.",
  emailRequired: "We need an email to write back to.",
  emailInvalid: "That email doesn't look right.",
  messageRequired: "Tell us a little about what you're building.",
  messageTooShort: "A little more detail helps — twenty characters minimum.",
};

export const BACK_LABEL = "Back";
export const NEXT_LABEL = "Continue";

export const SUBMIT_LABEL_IDLE = "Send";
export const SUBMIT_LABEL_SUBMITTING = "Sending";

export const RATE_LIMIT_MESSAGE = "Give it a moment — you already sent this a few seconds ago.";

export const SUCCESS_HEADING = "Thanks — we've got it.";
export const SUCCESS_BODY = "You will hear from a human within 24 hours, usually sooner.";
export const SUCCESS_FROM_PREFIX = "Sent from";

export const ERROR_HEADING = "Something didn't go through.";
export const ERROR_BODY = "Your answers are still here — nothing was lost. In the meantime, email us directly:";
export const ERROR_RETRY_LABEL = "Try again";
export const ERROR_COPY_LABEL = "Copy address";
export const ERROR_COPIED_LABEL = "Copied";

export const ASIDE_RESPONSE_LABEL = "Typical response";
export const ASIDE_RESPONSE_VALUE = "Within 24 hours, Monday to Friday";
export const ASIDE_LOCATION_LABEL = "Location";
export const ASIDE_SOCIALS_LABEL = "Elsewhere";
export const ASIDE_CALL_LINE = "Prefer a call? Send three times that suit you and we will confirm one.";
export const ASIDE_COPY_LABEL = "Copy";
export const ASIDE_COPIED_LABEL = "Copied";
