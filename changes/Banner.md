# Banner — prod → expected

Adds a `.banner-grad` modifier variant. The base `.banner` component is unchanged from prod.

| Part | Current (prod) | Expected | Specification |
|---|---|---|---|
| **Base `.banner`** | Card bg, `--border` border, brand-primary icon bg | — no change | Unchanged; `.banner-grad` is additive |
| **`.banner-grad` root** | — did not exist | `background: var(--grad-teal-dark)`; `border: none` | Gradient driven by `--grad-teal-dark` token (see token map); override `--grad-teal-dark` inline to change direction/stops |
| **`.banner-grad .banner-ic`** | — | `background: var(--banner-grad-ic-bg)` (white @ 18% light / 12% dark); `border: 1.5px solid var(--banner-grad-ic-border)`; `border-radius: 9999px`; `box-shadow: var(--banner-grad-ic-shadow)`; `color: var(--banner-grad-text)` | Circle shape; translucent white bg. Border + shadow are tokenised and theme-aware (lighter/softer on dark) — see token map |
| **`.banner-grad .banner-t`** | — | `color: var(--banner-grad-text)` (white) | Full white for contrast on dark gradient |
| **`.banner-grad .banner-d`** | — | `color: var(--banner-grad-sub)` (white @ 82%); `<b>` inside → `var(--banner-grad-text)` | Slightly dimmed to create title/desc hierarchy on gradient |
| **`.banner-grad .btn-primary`** | — | `background: var(--banner-grad-text)` (white); `color: var(--brand-600)`; hover: `background: var(--banner-grad-btn-hover)` | White button with brand text — highest-contrast CTA on gradient. Theme-independent (token is white in both themes) |
| **`.banner-grad .btn-secondary`** | — | `background: var(--banner-grad-text)` (white); `border-color: var(--slate-300)`; `color: var(--slate-900)`; hover: `background: var(--banner-grad-btn-hover)`, `border-color: var(--slate-400)` | Forced white in BOTH themes — the old "no override / default btn-secondary" rendered a DARK card button on the gradient in dark mode (bug). Migrated into `kit-theme.css` from the metrics page so storybook + concept match |
| **`.banner-noise`** *(variant)* | — | `--grad-teal-dark: var(--grad-noise)` + `::after` soft-light grain (opacity .07 light / .15 dark) | Optional textured gradient; CSS now in `kit-theme.css` (was page-only). Hover tint tokenised as `--banner-grad-btn-hover` |

## Base component — updates

| Part | Before | After | Specification |
|---|---|---|---|
| **`.banner-d`** | No max-width | `max-width: 66ch` | Prevents very long descriptions from spanning the full banner width on wide viewports — keeps line length readable |
| **`.banner-sm` modifier** | — did not exist | Reduces padding to `1rem 1.25rem`; icon `2.5rem / .5rem` radius / `20px` SVG; title `.875rem` / line-height `1.25rem` | Compact variant for secondary or inline banners; add class alongside `.banner`. ⚠ Earlier doc said title `0.9375rem`; shipped CSS (`kit-theme.css:816`) is `font-size:.875rem;line-height:1.25rem` — corrected to match CSS. |
| **`.banner-close` slot** | — did not exist | Optional corner ✕ dismiss button; `position:absolute` top-right, `1.75rem` box; icon `--ink-secondary` → hover `--ink-body` on `--state-hover`; focus ring `--focus-ring-brand`. On `.banner-grad`: `--banner-grad-sub` → hover `--banner-grad-text` on `--banner-grad-ic-bg` overlay. `.banner:has(.banner-close)` reserves `padding-right` so it clears the CTA | Gives a banner a first-class dismiss affordance next to (not colliding with) its CTA. Reuses existing muted/state/gradient tokens — no new tokens. Pair with `.banner-wrap` + `.is-dismissed` for the collapse animation. Hit target 28px (≥ 24px). |

## Self-reproducing spec — base + variants (final contract)

Source: `kit-theme.css:804–848`. The base `.banner` is the default informational variant; `.banner-grad` and `.banner-sm` are additive modifiers applied alongside `.banner`.

### Base `.banner` (default informational) — full dimensions
| Part | Class | Spec |
|---|---|---|
| Root | `.banner` | `display:flex; align-items:center; gap:1.25rem` (20px); `padding:1.625rem 1.5rem` (26px / 24px); `background:var(--card)`; `border:1px solid var(--border)`; `border-radius:.75rem` (12px) |
| Icon wrapper | `.banner-ic` | `width/height:3.75rem` (60px); `display:flex` centred; `border-radius:.875rem` (14px); `background:var(--brand-primary)`; `color:var(--btn-primary-text)`; `flex:none`; `box-shadow:0 6px 16px -4px color-mix(in srgb,var(--brand-primary) 50%,transparent)` |
| Icon SVG | `.banner-ic svg` | `28px × 28px` |
| Body | `.banner-body` | `flex:1; min-width:0; display:flex; flex-direction:column; gap:.375rem` (6px) |
| Title | `.banner-t` | `font-size:1rem`; `font-weight:600`; `color:var(--ink)`; `line-height:1.3`; `margin:0` |
| Description | `.banner-d` | `font-size:.875rem`; `color:var(--ink-body)`; `line-height:1.5`; `margin:0`; `max-width:66ch`. `<b>` inside → `color:var(--ink); font-weight:600` |
| CTA slot | `.banner-cta` | `flex:none` |
| Close (optional) | `.banner-close` | `position:absolute; top/right:.625rem`; `1.75rem` square; `border-radius:.5rem`; icon `16px`; `color:var(--ink-secondary)`; hover `background:var(--state-hover); color:var(--ink-body)`; focus `box-shadow:var(--focus-ring-brand)`. `.banner:has(.banner-close)` adds `padding-right:2.75rem` (reset to base padding at ≤880/600px stack) |

### Variant deviations (only what changes from base)
| Variant | Class | Deviations from base |
|---|---|---|
| **Informational (default)** | `.banner` | — (the base spec above) |
| **Gradient** | `.banner-grad` | root `background:var(--grad-teal-dark); border:none`; `.banner-ic` → translucent-white circle (`background:var(--banner-grad-ic-bg)`, `border:1.5px solid var(--banner-grad-ic-border)`, `border-radius:9999px`, `box-shadow:var(--banner-grad-ic-shadow)`, `color:var(--banner-grad-text)`); title `color:var(--banner-grad-text)`; desc `color:var(--banner-grad-sub)` (`<b>`→`--banner-grad-text`); `.btn-primary` inverted (`background:var(--banner-grad-text); color:var(--brand-primary)`, hover `background:var(--banner-grad-sub)`). `.banner-close` recoloured white (`color:var(--banner-grad-sub)`, hover `color:var(--banner-grad-text)` on a `--banner-grad-ic-bg` overlay). Icon **size/SVG unchanged** from base (3.75rem / 28px) — only shape (circle) + fill change. |
| **Compact** | `.banner-sm` | `padding:1rem 1.25rem` (16px / 20px); `.banner-ic` `2.5rem` (40px) / `border-radius:.5rem` (8px); icon SVG `20px`; title `font-size:.875rem; line-height:1.25rem`. All other base values (gap, body, desc, border) inherited. |

> `.banner-grad` and `.banner-sm` are independent and may combine (compact gradient banner). The gradient changes colour/shape; `-sm` changes size — no conflict.

## Responsive behaviour (base `.banner`)

| Breakpoint | Layout change | Specification |
|---|---|---|
| **≤ 880 px** | `flex-direction: column; align-items: flex-start; gap: .875rem; padding: 1.25rem`; icon tightens to `2.75rem / .625rem` radius / `22px` SVG; `.banner-cta` → `width:100%; display:flex`; its `.btn` → `flex:1; justify-content:center; max-width:12rem` (so the CTA grows to fill the row but doesn't span edge-to-edge on landscape phone) | 880 px is the sidebar-hides threshold — below it the banner row gets cramped, so stacking feels natural |
| **≤ 600 px** | `.banner` padding further tightens to `1rem`; `.banner-cta .btn` `max-width:none` — full-width CTA is appropriate at phone width | Single-column phone layout; 600 px = kit `sm` boundary |

## Dismiss / collapse animation

Source: `kit-theme.css:836–837`. Wrap a `.banner` in a `.banner-wrap` element to make it collapsible; toggle `.is-dismissed` on the wrapper (via JS) to animate it out. The wrapper, not the banner, carries the animation.

| Part | Class | Spec |
|---|---|---|
| Wrapper (open) | `.banner-wrap` | `overflow:hidden; max-height:11rem; opacity:1; transition:max-height .35s cubic-bezier(.4,0,.2,1), opacity .25s ease, margin .35s ease` |
| Wrapper (dismissed) | `.banner-wrap.is-dismissed` | `max-height:0; opacity:0; pointer-events:none; margin-bottom:0` |

> The wrapper collapses height + fades + zeroes its bottom margin in one transition. `max-height:11rem` is the open ceiling — tall enough for a standard banner row; very tall banners would clip, so keep content within ~176px. Dismiss is JS-driven (add `.is-dismissed`); there is no CSS-only trigger.
>
> **Trigger** — the corner `.banner-close` button is the standard dismiss control; wire its `onclick` to add `.is-dismissed` on the parent `.banner-wrap`. (The storybook Default demo shows the alternative: a text "Dismiss" button in the CTA slot.) The wrapper's `overflow:hidden` establishes a BFC, so a banner's own `margin-top` (e.g. the metrics page's `.mx-connect-banner`) is clipped inside the wrapper and collapses with it — no leftover gap.

## Token map

| Token | Value | Layer |
|---|---|---|
| `--grad-teal-dark` | Light: `linear-gradient(135deg, var(--brand-400) 0%, var(--brand-800) 100%)` · Dark: `linear-gradient(135deg, var(--brand-600) 0%, var(--brand-900) 100%)` | Semantic |
| `--banner-grad-text` | `var(--white)` | Semantic |
| `--banner-grad-sub` | `color-mix(in srgb, var(--white) 82%, transparent)` | Semantic |
| `--banner-grad-ic-bg` | Light: `color-mix(in srgb, var(--white) 18%, transparent)` · Dark: `color-mix(in srgb, var(--white) 12%, transparent)` | Semantic |
| `--banner-grad-ic-border` | Light: `rgba(255,255,255,.4)` · Dark: `rgba(255,255,255,.18)` | Semantic |
| `--banner-grad-ic-shadow` | Light: `0 0 0 8px rgba(255,255,255,.07), 0 0 24px rgba(255,255,255,.09)` · Dark: `0 0 0 6px rgba(255,255,255,.04), 0 0 16px rgba(255,255,255,.05)` | Semantic |
