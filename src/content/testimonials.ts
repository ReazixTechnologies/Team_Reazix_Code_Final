import type { Testimonial } from "@/types";

// Add real quotes only, with written permission and the person's real name, role
// and company. Leave this array empty until you have them — Testimonials.tsx
// renders CredibilityBlock instead, which is honest and still persuasive.
export const testimonials: Testimonial[] = [];

export const TESTIMONIALS_EYEBROW = "In their words";

export const TESTIMONIALS_HEADING = "Clients who took the risk.";

export const TESTIMONIALS_RAIL_ARIA_LABEL = "Client testimonials — drag or use arrow keys to scroll";

export const TESTIMONIALS_DRAG_CURSOR_LABEL = "Drag";

export const TESTIMONIALS_PROJECT_LINK_LABEL = "See the project";

export interface CredibilityItem {
  title: string;
  description: string;
}

/** The honest alternative shown while `testimonials` is empty — verifiable commitments instead of praise. */
export const CREDIBILITY_ITEMS: CredibilityItem[] = [
  {
    title: "Fixed scope, fixed price",
    description: "You approve the number before we start. It does not move unless you change the scope.",
  },
  {
    title: "Staging access from week one",
    description: "You can open the build any day. No black box.",
  },
  {
    title: "Code and accounts are yours",
    description: "Repositories, hosting and analytics are in your name from day one. No hostage situations.",
  },
];

export const CREDIBILITY_EYEBROW = "In their words";

export const CREDIBILITY_HEADING = "We do not have a wall of logos yet.";

export const CREDIBILITY_NOTE =
  "We are a young studio. What we can offer instead of a wall of logos is unusually clear terms.";
