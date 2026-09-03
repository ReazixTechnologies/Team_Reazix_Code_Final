# Reazix — Foundation (Module 1 of 10)

This module builds the skeleton, design system, and motion engine only. No page
sections (hero, services, pricing, etc.) are implemented yet — those are later
modules. `src/app/page.tsx` currently renders a stack of `SectionPlaceholder`
blocks so scroll and cursor FX are testable end to end.

**Stack:** Next.js 16 (App Router, Turbopack) + TypeScript (strict) + Tailwind
CSS v4 (CSS-first `@theme` config) + `motion/react` (the current package name
for framer-motion — same API, different import path) + `lenis` for smooth
scroll + `clsx`/`tailwind-merge` for the `cn()` utility + `next/font`.

> The brief specified Next.js 15; this repo was already scaffolded on Next.js
> 16 (App Router, same conventions, no breaking changes relevant here), so it
> was kept rather than downgraded.

## Design tokens (`src/app/globals.css`)

All tokens are declared in a single `@theme` block, which makes Tailwind
generate matching utility classes automatically.

**Colors** — `bg-void` / `bg-surface` / `bg-surface-2`, `border-line` /
`border-line-strong`, `text-text` / `text-text-muted` / `text-text-faint`,
and the accent set `ember` / `amber` / `blush` / `violet` / `mint` (usable as
`bg-`, `text-`, `border-`, etc. — e.g. `text-ember`, `bg-ember`).

**Type scale** — fluid, clamp-based utilities: `text-display`, `text-h1`,
`text-h2`, `text-h3`, `text-body`, `text-label`. Each one bundles its own
line-height/letter-spacing via Tailwind's `--text-*--line-height` /
`--text-*--letter-spacing` companions, so `className="text-h2"` is enough —
no separate leading/tracking classes needed. Fonts: `font-display` (Sora),
`font-body` (Inter), `font-mono` (JetBrains Mono).

**Layout** — `max-w-page` (1440px container cap, used by `<Container>`),
`py-section` / `gap-section` etc. (the `clamp(6rem, 12vw, 12rem)` section
rhythm token — apply it for vertical spacing between page sections).

**Radius** — `rounded-sm` (8px), `rounded` (16px), `rounded-lg` (24px),
`rounded-xl` (32px).

**Accessibility** — `:focus-visible` is styled globally (2px `--color-ember`
ring, 2px offset). A skip-to-content link is wired in `layout.tsx`.

## Motion primitives

Shared constants and variants live in `src/lib/motion.ts`: `EASE`,
`EASE_IN_OUT`, `DUR` (`fast`/`base`/`slow`/`xslow`), `STAGGER`
(`tight`/`base`/`loose`), and ready-made variants `fadeUp`, `fadeIn`,
`maskReveal`, `staggerParent`, `scaleIn`. Reuse these instead of inlining new
easing curves or durations, so animation stays consistent across modules.

Components in `src/components/motion/`:

- **`Reveal`** — fade + translate-up when scrolled into view. Wrap any block.
- **`SplitText`** — splits text into words/chars and reveals with a staggered
  mask animation; accessible (`aria-label` on the real text, split spans are
  `aria-hidden`). Use for hero/section headlines.
- **`Magnetic`** — wraps a button/link so it nudges toward the cursor.
- **`Parallax`** — scroll-linked y-translate wrapper.
- **`Marquee`** — infinite horizontal scroller (CSS keyframe driven), pauses
  on hover.
- **`AnimatedCounter`** — counts up from 0 when scrolled into view.

Every motion component checks `useReducedMotion()` and renders static,
un-animated output when it's set — don't bypass that when composing new
components on top of these.

Ambient FX in `src/components/fx/`:

- **`CursorGlow`** — the signature ambient light: a heavy-lag glow blob, a
  fast-follow ring, and a zero-lag dot. Disabled on touch devices and under
  reduced motion. Opt an element into the hover-ring effect with
  `data-cursor="hover"`; opt into the expanded text-label ring with
  `data-cursor-text="View"` (any string). `<Button>` already sets
  `data-cursor="hover"`.
- **`GrainOverlay`** — static, cheap film-grain layer. Nothing to configure.
- **`Spotlight`** — reusable radial glow blob for section backgrounds. Props:
  `color`, `size`, `blur`, `className`.

## UI primitives (`src/components/ui/`)

`Button` (variants `primary`/`ghost`/`outline`, sizes `sm`/`md`/`lg`),
`Container` (max-width + responsive gutters), `SectionHeading` (eyebrow + h2 +
optional description), `Eyebrow`, `Badge`, and `SectionPlaceholder` (delete
usages of this as each real section module lands).

## Content stubs (`src/content/`)

`site.ts` (brand name, tagline, nav links, socials, contact email — real
copy already), plus `services.ts` / `process.ts` / `projects.ts` /
`pricing.ts` / `faqs.ts` as typed, near-empty arrays. Later modules fill
these in — the shapes come from `src/types/index.ts`.

## Scroll & providers

`src/components/providers/SmoothScroll.tsx` wraps the app in a Lenis
instance driven by a single `requestAnimationFrame` loop, and is skipped
entirely under reduced motion. Later modules that need `scrollTo()` (e.g. nav
links) should call `useLenis()`, which returns a `RefObject<Lenis | null>` —
dereference `.current` inside the click handler, not at render time.

## Hooks (`src/hooks/`)

`useMousePosition`, `useMediaQuery` (built on `useSyncExternalStore`, no
hydration flash), `useReducedMotion` (wraps `useMediaQuery`), and
`useScrollProgress` (spring-smoothed `useScroll` wrapper, optionally scoped
to a `target` ref).

## For later modules

- Build each new page section as its own component, compose it into
  `src/app/page.tsx` in place of the matching `<SectionPlaceholder>`, and
  delete that placeholder line.
- Fill in `src/content/*.ts` with real copy as each section is built — types
  already exist in `src/types/index.ts`.
- Reuse the existing tokens, motion primitives, and UI primitives rather than
  introducing new ones; extend them (new variants/props) if a module needs
  something they don't yet support.

## Commands

```bash
npm run dev     # start the dev server
npm run build   # production build (TS + ESLint run as part of this)
npm run lint    # ESLint only
```
