import type { ProcessStep } from "@/types";

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "discover",
    index: "01",
    phase: "Discovery",
    title: "Understand the Business",
    duration: "1-2 weeks",
    description:
      "We start by understanding your business, users, and the actual problem you're trying to solve. This ensures we build the right thing from the start.",
    deliverables: ["User Research", "Competitor Analysis", "Problem Definition", "Project Roadmap"],
    yourInvolvement: "Share your vision, goals, and any existing research or data.",
  },
  {
    id: "define",
    index: "02",
    phase: "Definition",
    title: "Translate Requirements into a Plan",
    duration: "1-2 weeks",
    description:
      "We translate requirements into a clear product and system plan, defining scope, features, and technical architecture.",
    deliverables: ["Scope Document", "Feature List", "Technical Architecture", "Design Mockups"],
    yourInvolvement: "Review and approve the plan, provide feedback on designs.",
  },
  {
    id: "design",
    index: "03",
    phase: "Design",
    title: "Create the Experience",
    duration: "2-3 weeks",
    description:
      "We design the user experience, interface, and system architecture to ensure it's intuitive, engaging, and meets business goals.",
    deliverables: ["UI/UX Designs", "Design System", "Interactive Prototypes", "User Flow Diagrams"],
    yourInvolvement: "Review designs, provide feedback, and approve final designs.",
  },
  {
    id: "build",
    index: "04",
    phase: "Build",
    title: "Engineer the Product",
    duration: "4-8 weeks",
    description:
      "We engineer the product with modern technology, ensuring it's scalable, maintainable, and performs well.",
    deliverables: ["Working Product", "Clean Code", "API Documentation", "Testing"],
    yourInvolvement: "Provide content, review progress, and give feedback during development.",
  },
  {
    id: "launch",
    index: "05",
    phase: "Launch",
    title: "Deploy, Test and Deliver",
    duration: "1-2 weeks",
    description:
      "We deploy the product, perform rigorous testing, and ensure everything works perfectly before launch.",
    deliverables: ["Live Deployment", "QA Testing", "Performance Optimization", "Launch Plan"],
    yourInvolvement: "Review the final product, provide final approval, and prepare for launch.",
  },
  {
    id: "evolve",
    index: "06",
    phase: "Evolve",
    title: "Maintain, Improve and Scale",
    duration: "Ongoing",
    description:
      "We continue to maintain, improve, and scale the product based on user feedback and business needs.",
    deliverables: ["Maintenance", "Feature Updates", "Performance Monitoring", "Scale Planning"],
    yourInvolvement: "Share feedback, prioritize new features, and plan for future growth.",
  },
];

// ===== PROCESS INTRO =====
export const PROCESS_INTRO_EYEBROW = "How We Work";
export const PROCESS_INTRO_HEADING_LINES = ["A process built", "for outcomes."];
export const PROCESS_INTRO_DESCRIPTION =
  "We don't follow a rigid playbook. Every engagement starts with understanding your business, then we adapt our process to deliver the right solution.";
export const PROCESS_INTRO_FACTS = ["Discovery", "Definition", "Design", "Build", "Launch", "Evolve"];
export const PROCESS_INTRO_SUPPORTING =
  "We adapt our process to your business, not the other way around.";

// ===== PROCESS LOOP =====
export const PROCESS_LOOP_HEADING = "We don't just build. We loop.";
export const PROCESS_LOOP_DESCRIPTION =
  "Our process is iterative, not linear. We move through discovery, definition, design, build, launch, and evolve — and we loop back as needed to ensure the product is right.";
export const PROCESS_LOOP_PHASES = [
  { phase: "Discovery", icon: "🔍" },
  { phase: "Definition", icon: "📋" },
  { phase: "Design", icon: "🎨" },
  { phase: "Build", icon: "⚙️" },
  { phase: "Launch", icon: "🚀" },
  { phase: "Evolve", icon: "🔄" },
];
export const PROCESS_LOOP_MARK_TOP = "Start";
export const PROCESS_LOOP_MARK_BOTTOM = "Evolve & Loop Back";
export const PROCESS_LOOP_SUPPORTING =
  "Each phase informs the next, and we loop back to refine as we learn more.";

// ===== PROCESS CTA =====
export const PROCESS_CTA_LABEL = "Start a Project";

// ===== PROCESS MOBILE =====
export const PROCESS_MOBILE_HEADING = "Process on the go.";
export const PROCESS_MOBILE_DESCRIPTION = "Our process adapts to how you work.";

// ===== PROCESS STEP LABELS =====
export const PROCESS_DELIVERABLES_LABEL = "Deliverables";
export const PROCESS_INVOLVEMENT_LABEL = "Your Involvement";

// ===== PROCESS OUTRO =====
export const PROCESS_OUTRO_HEADING = "Ready to start your project?";
export const PROCESS_OUTRO_DESCRIPTION =
  "We're here to help you build the right product, the right way.";
export const PROCESS_OUTRO_CTA_LABEL = "Let's Talk";

// ===== PROCESS ACCENT HELPER =====
export const getProcessAccent = (index: number) => {
  const accents = ["ember", "amber", "blush", "violet", "mint", "ember"];
  return accents[index % accents.length];
};