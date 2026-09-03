import type { ProcessStep, ServiceAccent } from "@/types";

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "discovery",
    index: "01",
    phase: "Discovery",
    title: "Understanding the business, not just the brief",
    duration: "Week 1",
    description:
      "We start with your commercial reality — who buys, what stalls deals, where the current product loses people. Before a single screen is designed, we agree on what success actually means in numbers.",
    deliverables: ["Stakeholder interviews", "Competitive audit", "Technical audit", "Success metrics", "Project brief"],
    yourInvolvement: "Two calls, roughly 90 minutes total.",
  },
  {
    id: "strategy",
    index: "02",
    phase: "Strategy",
    title: "Deciding what to build, and what not to",
    duration: "Week 1–2",
    description:
      "Scope, architecture and sequencing. We define the shortest credible path to something real in production — and explicitly park the ideas that belong in v2 so they stop eating the timeline.",
    deliverables: ["Product strategy", "Information architecture", "Tech stack decision", "Scope & phasing plan", "Fixed timeline"],
    yourInvolvement: "One review session. You approve scope before we build.",
  },
  {
    id: "design",
    index: "03",
    phase: "UI/UX Design",
    title: "Interfaces designed around intent",
    duration: "Week 2–4",
    description:
      "Wireframes first, then high-fidelity design and a component system your future developers can actually extend. Every screen is designed against the metric it is supposed to move.",
    deliverables: ["Wireframes", "High-fidelity design", "Design system", "Interactive prototype", "Motion direction"],
    yourInvolvement: "Async feedback in Figma, plus a weekly 30-minute review.",
  },
  {
    id: "development",
    index: "04",
    phase: "Development",
    title: "Engineering it properly the first time",
    duration: "Week 4–10",
    description:
      "Typed, tested, reviewed code in weekly increments on a staging URL you can open any day. No black box, no six-week silence followed by a surprise.",
    deliverables: ["Production codebase", "Staging environment", "Weekly builds", "API & integrations", "Documentation"],
    yourInvolvement: "A weekly demo. Staging access from day one.",
  },
  {
    id: "qa",
    index: "05",
    phase: "Testing & QA",
    title: "Breaking it before your users do",
    duration: "Week 9–11",
    description:
      "Cross-browser and cross-device testing, performance budgets, accessibility checks, security review and load testing — with fixes verified, not just logged.",
    deliverables: ["QA report", "Performance audit", "Accessibility audit", "Security review", "Bug resolution"],
    yourInvolvement: "One UAT round. We hand you a checklist, not a mystery.",
  },
  {
    id: "launch",
    index: "06",
    phase: "Launch",
    title: "A release, not a leap of faith",
    duration: "Week 11–12",
    description:
      "Deployment, DNS, analytics, monitoring and search setup — plus a rollback plan. We are online with you on launch day and watching the dashboards afterwards.",
    deliverables: ["Production deployment", "Analytics & monitoring", "SEO setup", "Handover session", "Rollback plan"],
    yourInvolvement: "Sign-off, and a launch-day call.",
  },
  {
    id: "improvement",
    index: "07",
    phase: "Continuous Improvement",
    title: "The part most agencies skip",
    duration: "Ongoing",
    description:
      "Real usage data arrives and the assumptions get tested. We iterate on what the numbers say, ship improvements on a regular cadence, and keep the product compounding instead of decaying.",
    deliverables: ["Performance monitoring", "Data-led iteration", "Feature releases", "Growth experiments", "Ongoing support"],
    yourInvolvement: "A monthly review. Cancel any time — no lock-in.",
  },
];

/** Accent cycle applied to each step by index (mod 5) — the section shifts hue as the project progresses. */
export const PROCESS_ACCENT_SEQUENCE: ServiceAccent[] = ["ember", "amber", "blush", "violet", "mint"];

export function getProcessAccent(index: number): ServiceAccent {
  return PROCESS_ACCENT_SEQUENCE[index % PROCESS_ACCENT_SEQUENCE.length];
}

export const PROCESS_INTRO_EYEBROW = "How we work";

export const PROCESS_INTRO_HEADING_LINES = ["You will always know", "what happens next."];

export const PROCESS_INTRO_DESCRIPTION =
  "Seven phases, fixed deliverables, and a staging URL from week four. The single most common thing clients tell us is that they stopped worrying — because there was never a week where they did not know exactly where the project stood.";

export const PROCESS_INTRO_FACTS = ["12 weeks typical", "Weekly demos", "Fixed scope, fixed price"];

export const PROCESS_DELIVERABLES_LABEL = "Deliverables";

export const PROCESS_INVOLVEMENT_LABEL = "Your involvement";

export const PROCESS_LOOP_MARK_TOP = "Improve";

export const PROCESS_LOOP_MARK_BOTTOM = "Repeat";

export const PROCESS_LOOP_HEADING = "Launch is the midpoint, not the finish.";

export const PROCESS_LOOP_DESCRIPTION =
  "Products that keep improving beat products that were perfect once. Most of our clients are still with us a year later.";
