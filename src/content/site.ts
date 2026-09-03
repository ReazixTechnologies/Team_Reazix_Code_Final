import type { FooterColumn, NavLink, SocialLink } from "@/types";

export interface SiteConfig {
  name: string;
  tagline: string;
  url: string;
  email: string;
  phone: string;
  location: string;
}

export const siteConfig: SiteConfig = {
  name: "Reazix",
  tagline:
    "We don't just build websites. We design and engineer digital products that help businesses look premium, operate better, and grow.",
  url: "https://reazix.com",
  email: "hello@reazix.com",
  phone: "+91 98765 43210",
  location: "India",
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "/home" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
];

export const socialLinks: SocialLink[] = [
  { label: "LinkedIn", href: "https://linkedin.com/company/reazix" },
  { label: "X", href: "https://x.com/reazix" },
  { label: "Instagram", href: "https://instagram.com/reazix" },
  { label: "Dribbble", href: "https://dribbble.com/reazix" },
  { label: "GitHub", href: "https://github.com/reazix" },
];

export const CLOSING_CTA_EYEBROW = "Next step";

export const CLOSING_CTA_HEADING_LINES = ["One call.", "Thirty minutes.", "A clear number."];

export const CLOSING_CTA_SUPPORTING =
  "No deck, no discovery invoice, no pressure. You describe what you are building, we tell you what it takes and what it costs. If we are not the right studio for it, we will say so and point you somewhere better.";

export const CLOSING_CTA_BUTTON_LABEL = "Book a scoping call";

export const CLOSING_CTA_COPIED_LABEL = "Copied";

export const CLOSING_CTA_REASSURANCES = ["Replies within 24 hours", "No sales sequence", "NDA on request"];

export const footerColumns: FooterColumn[] = [
  {
    title: "Studio",
    links: [
      { label: "About", href: "/about" },
      { label: "Process", href: "/process" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Web Development", href: "/services" },
      { label: "UI/UX Design", href: "/services" },
      { label: "Mobile Apps", href: "/services" },
      { label: "AI Development", href: "/services" },
      { label: "Custom Software", href: "/services" },
      { label: "E-commerce", href: "/services" },
      { label: "SEO & Growth", href: "/services" },
      { label: "3D & Interactive", href: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Work", href: "/work" },
      { label: "Blog", href: "/blog" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: siteConfig.email, href: `mailto:${siteConfig.email}` },
      { label: siteConfig.phone, href: `tel:${siteConfig.phone.replace(/\s+/g, "")}` },
      ...socialLinks,
    ],
  },
];
