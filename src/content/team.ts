export interface TeamMember {
  role: string;
  initials: string;
  focus: string;
}

/** Placeholder roster — swap in real names, photos and bios before launch. */
export const TEAM_MEMBERS: TeamMember[] = [
  { role: "Founder & Engineering Lead", initials: "FE", focus: "Architecture, platform, delivery" },
  { role: "Design Lead", initials: "DL", focus: "Product design, design systems" },
  { role: "AI & Backend Engineer", initials: "AI", focus: "LLM integration, infrastructure" },
  { role: "Growth & Strategy", initials: "GS", focus: "Positioning, SEO, lifecycle" },
];

export const TEAM_EYEBROW = "The team";

export const TEAM_HEADING = "Small on purpose.";

export const TEAM_DESCRIPTION =
  "A senior team across engineering, design, AI and growth — the same people who scope your project are the ones who build it.";
