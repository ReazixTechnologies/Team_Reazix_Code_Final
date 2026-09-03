import type { Faq, FaqCategory } from "@/types";

export const FAQ_CATEGORIES: FaqCategory[] = ["Process", "Pricing", "Technical", "Working Together"];

// The Pricing entries below (why-no-hourly, scope-changes, equity) intentionally mirror
// PricingFaqTeaser (src/components/sections/pricing/PricingFaqTeaser.tsx) — that teaser
// reads three short answers, these are the full versions. Keep both in sync if you edit.
export const FAQS: Faq[] = [
  // PROCESS
  {
    id: "process-timeline",
    category: "Process",
    question: "How long does a typical project take?",
    answer:
      "Most engagements run four to fourteen weeks depending on scope — a marketing site closer to a month, a full product build closer to three. We give you a specific timeline once we understand what you're building, not before.",
  },
  {
    id: "process-inputs",
    category: "Process",
    question: "What do you need from us to start?",
    answer:
      "Brand assets if you have them, access to any existing systems we're integrating with, and one point of contact who can make decisions. Everything else — strategy, design, content structure — we can help build from scratch.",
  },
  {
    id: "process-involvement",
    category: "Process",
    question: "How involved do I have to be?",
    answer:
      "As involved as you want, with two exceptions: the kickoff workshop and the review checkpoints. Outside of those, we run independently and bring you decisions, not open questions.",
  },
  {
    id: "process-unhappy",
    category: "Process",
    question: "What happens if we are not happy with the design?",
    answer:
      "Every tier includes revision rounds built into the scope, and we review direction with you before moving to full execution. If something's off, we fix it before it compounds — that's what the rounds are for.",
  },
  {
    id: "process-existing-team",
    category: "Process",
    question: "Do you work with our existing team?",
    answer:
      "Yes, regularly. We slot into whatever your internal designers, developers or marketers are already doing rather than replacing them, and we're explicit up front about who owns what.",
  },
  // PRICING
  {
    id: "pricing-hourly",
    category: "Pricing",
    question: "Why do you not charge hourly?",
    answer:
      "Hourly billing rewards slow work and punishes efficiency. A fixed number, agreed before we start, means our incentives and yours point in the same direction.",
  },
  {
    id: "pricing-scope-change",
    category: "Pricing",
    question: "What if the scope changes mid-project?",
    answer:
      "We scope the change on its own terms and quote it before any work starts on it. The original number never moves retroactively — you're never billed for something you didn't approve.",
  },
  {
    id: "pricing-equity",
    category: "Pricing",
    question: "Do you take equity or revenue share?",
    answer:
      "Not as a substitute for payment. We're a service business, not a co-founder — that keeps our priorities aligned with your deadline, not your cap table.",
  },
  {
    id: "pricing-terms",
    category: "Pricing",
    question: "What are the payment terms?",
    answer:
      "Typically 50% to begin and 50% on delivery, split into milestones on longer engagements. Retainers are billed monthly, in advance.",
  },
  {
    id: "pricing-cheaper",
    category: "Pricing",
    question: "Is there a cheaper option?",
    answer:
      "No — and if budget is the primary constraint, we're probably not the right studio for this project. We don't compete on hourly rate or offshore markup; if that's what you need, a freelancer or a lower-cost shop will serve you better than we will.",
  },
  // TECHNICAL
  {
    id: "technical-stack",
    category: "Technical",
    question: "What stack do you build on and why?",
    answer:
      "React, TypeScript and Tailwind on the frontend; Node and Postgres for most backends — pragmatic, widely supported choices, not a portfolio of exotic frameworks. We pick a stack that will still have documentation and hires available in three years.",
  },
  {
    id: "technical-ownership",
    category: "Technical",
    question: "Who owns the code?",
    answer:
      "You do. Every repository, credential and account is created in your name from day one — nothing sits in an account we control that you'd need to negotiate to get back.",
  },
  {
    id: "technical-maintain",
    category: "Technical",
    question: "Can our developers maintain it after handover?",
    answer:
      "Yes. We write for a team that isn't us — documented, conventional, no clever abstractions that only make sense to the person who wrote them — and we do a formal handover walkthrough at the end of every build.",
  },
  {
    id: "technical-ai",
    category: "Technical",
    question: "Do you do AI work seriously or as a buzzword?",
    answer:
      "Seriously — we build production RAG systems, agents and workflow automation that have to work under real data and real failure modes, not demo-day happy paths. If a feature doesn't earn its complexity, we'll tell you to skip it.",
  },
  {
    id: "technical-hosting",
    category: "Technical",
    question: "What about hosting and ongoing costs?",
    answer:
      "We recommend infrastructure sized to your actual traffic, not the biggest plan available, and we're transparent about what it costs before you commit. Hosting accounts are yours; we don't mark up infrastructure.",
  },
  // WORKING TOGETHER
  {
    id: "working-timezone",
    category: "Working Together",
    question: "Where are you based and what timezone do you work in?",
    answer:
      "We're based in India and work IST, with meeting hours that overlap US and European business hours for active clients. Async communication covers the rest.",
  },
  {
    id: "working-communication",
    category: "Working Together",
    question: "How do we communicate?",
    answer:
      "A shared channel — Slack or your preference — for daily back-and-forth, plus a weekly call on active projects. No status meetings for the sake of status meetings.",
  },
  {
    id: "working-after-launch",
    category: "Working Together",
    question: "What happens after launch?",
    answer:
      "Every tier includes a post-launch support window, and most clients move to a monthly retainer afterward. Either way, you're never handed a finished build with no path to keep improving it.",
  },
  {
    id: "working-start-small",
    category: "Working Together",
    question: "Can we start small?",
    answer:
      "Yes — a lot of relationships start with a single service or a Launch-tier project before scaling into a larger engagement. We'd rather earn the bigger scope than sell it upfront.",
  },
];

export const FAQ_EYEBROW = "Before you commit";

export const FAQ_HEADING = "Questions worth answering honestly.";
