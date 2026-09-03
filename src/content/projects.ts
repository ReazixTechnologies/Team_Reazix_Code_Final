// ⚠️ SAMPLE DATA — illustrative only. Replace every entry with real client work,
// real permission, and real measured results before this site goes live.
//
// The cover/gallery images referenced below are generated flat-SVG placeholders
// (see public/images/work/), each watermarked "SAMPLE PLACEHOLDER" — swap them for
// real product screenshots alongside the copy.

import type { Project, WorkFilter } from "@/types";

const ILLUSTRATIVE_NOTE = "Illustrative example — replace with verified results before launch.";

export const PROJECTS: Project[] = [
  {
    slug: "saas-analytics-platform",
    title: "SaaS Analytics Platform",
    client: "Series A SaaS company",
    year: "2026",
    duration: "10 weeks",
    category: "SaaS Platform",
    filter: "Product",
    services: ["Product Strategy", "UI/UX Design", "Web Development"],
    summary:
      "A usage-analytics dashboard rebuilt from a spreadsheet-driven MVP into a product customers trusted enough to upgrade for.",
    challenge:
      "The original dashboard was a fast MVP that had outgrown itself — data loaded slowly, the information architecture didn't match how teams actually made decisions, and the free-to-paid upgrade prompt was buried three clicks deep.",
    approach:
      "We mapped the actual decisions each user persona made in the product, rebuilt the information architecture around those decisions instead of the underlying database schema, and re-engineered the data layer for sub-second load on the views people checked daily.",
    outcome:
      "A dashboard fast and clear enough that the upgrade prompt could sit where the value was obvious, instead of being pushed on people.",
    results: [
      { label: "Dashboard load time", value: 62, suffix: "% faster", note: ILLUSTRATIVE_NOTE },
      { label: "Free-to-paid conversion", value: 2.1, suffix: "x", decimals: 1, note: ILLUSTRATIVE_NOTE },
      { label: "Weekly active usage", value: 34, suffix: "% up", note: ILLUSTRATIVE_NOTE },
    ],
    stack: ["React", "TypeScript", "Node", "Postgres", "Recharts"],
    accent: "ember",
    cover: "/images/work/saas-analytics-platform-cover.svg",
    gallery: [
      "/images/work/saas-analytics-platform-1.svg",
      "/images/work/saas-analytics-platform-2.svg",
      "/images/work/saas-analytics-platform-3.svg",
    ],
  },
  {
    slug: "fintech-dashboard-platform",
    title: "Fintech Dashboard Platform",
    client: "Regional fintech startup",
    year: "2026",
    duration: "12 weeks",
    category: "Fintech",
    filter: "Web",
    services: ["Product Strategy", "UI/UX Design", "Web Development", "Custom Software Development"],
    summary:
      "A compliance-heavy transactions dashboard redesigned so finance teams could reconcile a day's activity without exporting to a spreadsheet first.",
    challenge:
      "Every reconciliation task required exporting raw transaction data to a spreadsheet, because the in-app views couldn't answer the questions finance actually asked — flagged transactions, pending settlements, daily variance.",
    approach:
      "We interviewed the finance team that used the tool daily, rebuilt the transaction views around their actual reconciliation workflow, and added the filtering, flagging and export tools that had previously lived in someone's personal spreadsheet template.",
    outcome: "A dashboard finance could work directly from, with the spreadsheet workaround retired.",
    results: [
      { label: "Manual reconciliation time", value: 70, suffix: "% less", note: ILLUSTRATIVE_NOTE },
      { label: "Monthly export requests", value: 90, suffix: "% fewer", note: ILLUSTRATIVE_NOTE },
      { label: "Dispute resolution speed", value: 2.4, suffix: "x", decimals: 1, note: ILLUSTRATIVE_NOTE },
    ],
    stack: ["React", "TypeScript", "Node", "Postgres", "Stripe"],
    accent: "violet",
    cover: "/images/work/fintech-dashboard-platform-cover.svg",
    gallery: [
      "/images/work/fintech-dashboard-platform-1.svg",
      "/images/work/fintech-dashboard-platform-2.svg",
      "/images/work/fintech-dashboard-platform-3.svg",
    ],
  },
  {
    slug: "real-estate-listings-platform",
    title: "Real Estate Listings Platform",
    client: "Boutique real estate brokerage",
    year: "2025",
    duration: "9 weeks",
    category: "Real Estate",
    filter: "Web",
    services: ["UI/UX Design", "Web Development", "SEO & Digital Marketing"],
    summary:
      "A listings site rebuilt to load fast on mobile networks at open houses, and to rank for the neighborhood searches that actually bring in buyers.",
    challenge:
      "The existing site took over eight seconds to load listing pages on mobile networks — exactly where prospective buyers were opening links from agent texts and social posts.",
    approach:
      "We rebuilt the listings site on a lighter stack, optimized image delivery for real-world mobile networks, and restructured the site's content and metadata around the neighborhood and property-type searches buyers actually use.",
    outcome: "A site fast enough to open comfortably from a text message at a property, with a stronger footprint in local search.",
    results: [
      { label: "Mobile page load time", value: 74, suffix: "% faster", note: ILLUSTRATIVE_NOTE },
      { label: "Organic search traffic", value: 2.8, suffix: "x", decimals: 1, note: ILLUSTRATIVE_NOTE },
      { label: "Listing inquiry rate", value: 45, suffix: "% up", note: ILLUSTRATIVE_NOTE },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind", "Sanity", "Vercel"],
    accent: "amber",
    cover: "/images/work/real-estate-listings-platform-cover.svg",
    gallery: [
      "/images/work/real-estate-listings-platform-1.svg",
      "/images/work/real-estate-listings-platform-2.svg",
      "/images/work/real-estate-listings-platform-3.svg",
    ],
  },
  {
    slug: "patient-intake-mobile-app",
    title: "Patient Intake Mobile App",
    client: "Multi-location healthcare clinic group",
    year: "2025",
    duration: "14 weeks",
    category: "Healthcare",
    filter: "Mobile",
    services: ["Product Strategy", "UI/UX Design", "Mobile App Development"],
    summary: "A patient intake app that replaced a stack of paper clipboard forms across a multi-location clinic group.",
    challenge:
      "New patients filled out the same paper intake forms at every visit, front-desk staff re-keyed that data by hand, and errors from illegible handwriting were a recurring source of scheduling and billing mistakes.",
    approach:
      "We designed a mobile intake flow patients could complete before arriving, built native-feeling apps for iOS and Android with offline support for spotty clinic wifi, and wired submissions directly into the existing practice-management system so front-desk staff stopped re-keying anything.",
    outcome: "Patients arrive with intake already done, and front-desk time shifted from data entry back to actually helping people.",
    results: [
      { label: "Front-desk data entry time", value: 80, suffix: "% less", note: ILLUSTRATIVE_NOTE },
      { label: "Intake form errors", value: 65, suffix: "% fewer", note: ILLUSTRATIVE_NOTE },
      { label: "Patient check-in speed", value: 3.5, suffix: "x", decimals: 1, note: ILLUSTRATIVE_NOTE },
    ],
    stack: ["React Native", "Expo", "TypeScript", "Firebase"],
    accent: "mint",
    cover: "/images/work/patient-intake-mobile-app-cover.svg",
    gallery: [
      "/images/work/patient-intake-mobile-app-1.svg",
      "/images/work/patient-intake-mobile-app-2.svg",
      "/images/work/patient-intake-mobile-app-3.svg",
    ],
  },
  {
    slug: "dtc-storefront-rebuild",
    title: "Direct-to-Consumer Storefront Rebuild",
    client: "Direct-to-consumer apparel brand",
    year: "2026",
    duration: "8 weeks",
    category: "Web",
    filter: "Web",
    services: ["UI/UX Design", "E-commerce Development", "SEO & Digital Marketing"],
    summary: "A checkout rebuilt to remove the steps shoppers were abandoning at, on a storefront that had outgrown its original theme.",
    challenge:
      "The store ran on a heavily customized theme that had accumulated years of one-off tweaks, checkout was four steps long, and mobile shoppers — the majority of traffic — abandoned at a noticeably higher rate than desktop.",
    approach:
      "We rebuilt the storefront on a clean headless setup, cut checkout down to what the payment flow actually required, and rebuilt the mobile purchase path around the thumb-reachable zone instead of a shrunk-down desktop layout.",
    outcome: "A shorter, faster checkout that closed most of the gap between mobile and desktop conversion.",
    results: [
      { label: "Checkout completion rate", value: 28, suffix: "% up", note: ILLUSTRATIVE_NOTE },
      { label: "Mobile conversion rate", value: 1.9, suffix: "x", decimals: 1, note: ILLUSTRATIVE_NOTE },
      { label: "Page load time", value: 55, suffix: "% faster", note: ILLUSTRATIVE_NOTE },
    ],
    stack: ["Shopify", "Hydrogen", "Stripe", "Tailwind"],
    accent: "blush",
    cover: "/images/work/dtc-storefront-rebuild-cover.svg",
    gallery: [
      "/images/work/dtc-storefront-rebuild-1.svg",
      "/images/work/dtc-storefront-rebuild-2.svg",
      "/images/work/dtc-storefront-rebuild-3.svg",
    ],
  },
  {
    slug: "ai-support-assistant",
    title: "AI Support Assistant",
    client: "Applied AI startup",
    year: "2026",
    duration: "11 weeks",
    category: "AI Product",
    filter: "AI",
    services: ["Product Strategy", "AI Development & Integration", "Web Development"],
    summary: "A support assistant that resolves the repetitive tickets on its own and hands the rest to a human with full context already attached.",
    challenge:
      "The support team was buried in repetitive tickets that had clear, documented answers, while genuinely hard tickets waited in the same queue and lost the context customers had already provided.",
    approach:
      "We built a retrieval-augmented assistant trained on the existing help center and ticket history, set clear confidence thresholds for when it resolves a ticket outright versus hands off, and made sure every handoff arrived with the full conversation and retrieved context attached instead of a blank ticket.",
    outcome: "Routine tickets get resolved immediately, and the support team's time went to the tickets that actually needed a person.",
    results: [
      { label: "Tickets resolved without a human", value: 42, suffix: "%", note: ILLUSTRATIVE_NOTE },
      { label: "First response time", value: 85, suffix: "% faster", note: ILLUSTRATIVE_NOTE },
      { label: "Support capacity freed up", value: 1.6, suffix: "x", decimals: 1, note: ILLUSTRATIVE_NOTE },
    ],
    stack: ["Python", "LangChain", "OpenAI", "Anthropic", "Vector DB"],
    accent: "ember",
    cover: "/images/work/ai-support-assistant-cover.svg",
    gallery: [
      "/images/work/ai-support-assistant-1.svg",
      "/images/work/ai-support-assistant-2.svg",
      "/images/work/ai-support-assistant-3.svg",
    ],
  },
];

export const WORK_FILTERS: WorkFilter[] = ["Web", "Product", "Mobile", "AI"];

export interface WorkPreviewItem {
  slug: string;
  size: "large" | "small";
  /** Shortened category shown on the card — not always identical to the project's full `category`. */
  categoryLabel: string;
  /** Display title — the full project title for the featured card, a shortened one for the small cards. */
  title: string;
}

export const WORK_PREVIEW_ITEMS: WorkPreviewItem[] = [
  { slug: "saas-analytics-platform", size: "large", categoryLabel: "SAAS", title: "SaaS Analytics Platform" },
  { slug: "fintech-dashboard-platform", size: "small", categoryLabel: "FINTECH", title: "Dashboard" },
  { slug: "real-estate-listings-platform", size: "small", categoryLabel: "REAL ESTATE", title: "Listings" },
];

export const WORK_PREVIEW_EYEBROW = "Selected work";

export const WORK_PREVIEW_HEADING = "A few products we've helped bring to life.";

export const WORK_PREVIEW_VIEW_ALL_LABEL = "View all projects";

export const WORK_INTRO_EYEBROW = "Selected work";

export const WORK_INTRO_HEADING_LINES = ["Products we shipped.", "Outcomes we can point to."];

export const WORK_INTRO_DESCRIPTION =
  "Every engagement below started as a business problem, not a design brief. The screenshots are the least interesting part.";

export const WORK_FILTER_DEFAULT: WorkFilter = "Web";

export const WORK_ROW_ARIA_PREFIX = "View case study:";

export const WORK_OUTRO_HEADING = "That's the studio's current case-study set.";

export const WORK_OUTRO_DESCRIPTION =
  "Every one of these is sample data until real client work replaces it — ask us for references in the meantime.";

export const WORK_OUTRO_CTA_LABEL = "View all work";

export const WORK_INDEX_EYEBROW = "Work";

export const WORK_INDEX_HEADING = "Selected engagements";

export const WORK_INDEX_DESCRIPTION =
  "A studio this new leads with how it works, not a wall of logos. The case studies below are illustrative until real ones replace them.";

export const WORK_META_LABELS = {
  client: "Client type",
  year: "Year",
  services: "Services",
  stack: "Stack",
  duration: "Duration",
};

export const WORK_CHALLENGE_LABEL = "The challenge";

export const WORK_APPROACH_LABEL = "Our approach";

export const WORK_OUTCOME_LABEL = "The outcome";

export const WORK_RESULTS_LABEL = "The results";

export const WORK_NEXT_PROJECT_LABEL = "Next case study";

export const WORK_CURSOR_VIEW_LABEL = "View";

export const WORK_EMPTY_FILTER_MESSAGE = "No case studies in this category yet.";
