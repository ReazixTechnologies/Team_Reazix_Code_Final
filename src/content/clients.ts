import type { ClientLogo } from "@/types";

/**
 * Real client logos don't exist yet, so this ships as target-industry wordmarks —
 * LogoMark falls back to a styled text wordmark whenever `svg` is omitted.
 *
 * To swap in a real client logo later: add `svg: "<svg>...</svg>"` (the logo's inline
 * markup, sized to sit in a ~32px-tall box) to that entry. Only paste markup from a
 * trusted source — LogoMark renders it directly.
 */
export const CLIENTS: ClientLogo[] = [
  { name: "SaaS" },
  { name: "Fintech" },
  { name: "Real Estate" },
  { name: "Healthcare" },
  { name: "E-Commerce" },
  { name: "AI Startups" },
  { name: "Enterprise" },
  { name: "D2C Brands" },
];
