# Banner — prod → expected

Adds a `.banner-grad` modifier variant. The base `.banner` component is unchanged from prod.

| Part | Current (prod) | Expected | Specification |
|---|---|---|---|
| **Base `.banner`** | Card bg, `--border` border, brand-primary icon bg | — no change | Unchanged; `.banner-grad` is additive |
| **`.banner-grad` root** | — did not exist | `background: var(--grad-teal-dark)`; `border: none` | Gradient driven by `--grad-teal-dark` token (see token map); override `--grad-teal-dark` inline to change direction/stops |
| **`.banner-grad .banner-ic`** | — | `background: var(--banner-grad-ic-bg)` (white @ 18%); `border: 1.5px solid rgba(255,255,255,.4)`; `border-radius: 9999px`; `box-shadow: 0 0 0 8px rgba(255,255,255,.07), 0 0 24px rgba(255,255,255,.09)`; `color: var(--banner-grad-text)` | Circle shape; translucent white bg; no glow shadow (gradient bg provides depth) |
| **`.banner-grad .banner-t`** | — | `color: var(--banner-grad-text)` (white) | Full white for contrast on dark gradient |
| **`.banner-grad .banner-d`** | — | `color: var(--banner-grad-sub)` (white @ 82%); `<b>` inside → `var(--banner-grad-text)` | Slightly dimmed to create title/desc hierarchy on gradient |
| **`.banner-grad .btn-primary`** | — | `background: var(--banner-grad-text)` (white); `color: var(--brand-primary)`; hover: `background: var(--banner-grad-sub)` | Inverted: white button with brand text — highest contrast CTA on gradient |
| **`.banner-grad .btn-secondary`** | — | No override — default `btn-secondary` styles apply (card bg, `--ink-body` text, `--btn-secondary-border`) | Solid card-surface button — readable on gradient without custom rules |

## Base component — updates

| Part | Before | After | Specification |
|---|---|---|---|
| **`.banner-d`** | No max-width | `max-width: 66ch` | Prevents very long descriptions from spanning the full banner width on wide viewports — keeps line length readable |
| **`.banner-sm` modifier** | — did not exist | Reduces padding to `1rem 1.25rem`; icon `2.5rem / .5rem` radius / `20px` SVG; title `0.9375rem` | Compact variant for secondary or inline banners; add class alongside `.banner` |

## Responsive behaviour (base `.banner`)

| Breakpoint | Layout change | Specification |
|---|---|---|
| **≤ 880 px** | `flex-direction: column; align-items: flex-start; gap: .875rem; padding: 1.25rem`; icon tightens to `2.75rem / .625rem` radius / `22px` SVG; CTA fills `100%` width (with `max-width: 12rem` so it doesn't span edge-to-edge on landscape phone) | 880 px is the sidebar-hides threshold — below it the banner row gets cramped, so stacking feels natural |
| **≤ 600 px** | Padding further tightens to `1rem`; CTA `max-width` removed — full-width CTA is appropriate at phone width | Single-column phone layout; 600 px = kit `sm` boundary |

## Token map

| Token | Value | Layer |
|---|---|---|
| `--grad-teal-dark` | Light: `linear-gradient(90deg, var(--brand-700) 0%, var(--brand-400) 100%)` · Dark: `linear-gradient(90deg, var(--brand-900) 0%, var(--brand-700) 100%)` | Semantic |
| `--banner-grad-text` | `var(--white)` | Semantic |
| `--banner-grad-sub` | `color-mix(in srgb, var(--white) 82%, transparent)` | Semantic |
| `--banner-grad-ic-bg` | `color-mix(in srgb, var(--white) 18%, transparent)` | Semantic |
