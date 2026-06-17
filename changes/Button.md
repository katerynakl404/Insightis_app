# Button — prod → expected

Source: `@insightis/ui` `Button/index.tsx` (cva) + `globals.css`.

All Expected values resolve to **kit primitives only** (Brand 50–900 · Tertiary 50–950 · Slate 50–950 · Grey 50–950 · Red 50–950). Black-with-alpha (`rgba(0,0,0,α)`) is the universal shadow convention.

## Primary
| State | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Default | fill `accent` `#07827F` (`border-gradient-inner-accent`), text = background; **themed** (lighter in dark — `#fff` contrast drops to 3.89:1) | — | flat fill `--btn-primary-bg` `#07807E` (Brand-600), text `--btn-primary-text` `#FFFFFF` — **theme-independent**, AA in both themes | Gradient replaced with flat fill; theme-independence fixes dark contrast |
| Hover | gradient `primary→secondary` | — | `--btn-primary-bg-hover` `#066867` (Brand-700) | One step darker on hover |
| Pressed | pressed gradient + inset shadow | — | `--btn-primary-bg-press` `#0E5862` (**Tertiary-800** — replaces the off-palette `#055454`) | bg-shift-only press feedback; no inset shadow |
| Focus | global ring (slate / off-white) | — | ring `--focus-ring-brand` `#07807E` 2px + 2px `Surface/Card` gap | Brand-tinted ring; consistent with Outlined/Tertiary |
| Disabled | transparent + `border-gradient-inner-border`, text `content-light` | — | bg `State/Disabled`, text `Text/Inactive` | Neutral disabled palette |
| **Loading (new)** | — (no built-in loading state) | — | spinner uses `currentColor`, label retained, `aria-busy="true"` + `pointer-events:none`, **opacity .65** — keeps the variant fill, does not swap to disabled palette | `--opacity-disabled` reusable token; variant colour preserved so loading is distinguishable from disabled |

## Secondary  *(restyled — filled card-style; teal border moves to Outlined)*
| State | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Default | border `secondary` (teal), text `content-body`, bg transparent | bg `Surface/Card`, border `Stroke/Border` (Slate-200), text `Text/Body` | bg `Surface/Card`, border `--btn-secondary-border` (Slate-300 light / Grey-600 dark), text `Text/Body` | Border stepped up one stop from Stroke/Border (Slate-200) so the card-fill reads distinct from a borderless surface |
| Hover | border `accent`, bg `primary/5`, icon `accent` | bg `--btn-secondary-bg-hover` = `Brand/Primary @ 5%` over `Surface/Card`, border `Stroke/Border_Hover`, text `Text/Body` | bg `--btn-secondary-bg-hover` = `Brand/Primary @ 5%` over `Surface/Card`, border `--btn-secondary-border-hover` (Slate-400 light / Grey-500 dark), text `Text/Body` | Border hover lifted to match the bolder default border step |
| Pressed | bg `primary/5` + inset | — | bg `State/Pressed` | Neutral pressed surface |
| Focus | global ring (slate / off-white) | — | ring `--focus-ring-brand` 2px + 2px `Surface/Card` gap | Brand-tinted ring |
| Disabled | border + text `content-light` | — | bg `State/Disabled`, text `Text/Inactive`, border `--btn-secondary-border` | Inherits the same border token as default |

> Emphasis shifts from a teal-coloured stroke to a card-tone fill — Secondary becomes a lower-emphasis filled action while still reading distinct from the page surface.

## Outlined  *(takes the teal-bordered styling that previously sat under Secondary)*
| State | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Default | border `border` (neutral), bg `card` (opaque), text `content-body` | — | border `Brand/Secondary` (teal), bg transparent, text `Text/Body` | Teal border moves from old Secondary to Outlined |
| Hover | text `accent`, border `Stroke/Border_Hover` | — | border `Brand/Primary_Hover`, bg `Brand/Primary @6%` | Brand-tinted overlay on hover |
| Pressed | text+border `accent` + inset | — | border `Brand/Primary_Hover`, bg `Brand/Primary @8%` | Deeper overlay on press |
| Focus | global ring (slate / off-white) | — | ring `--focus-ring-brand` 2px + 2px `Surface/Card` gap | Brand-tinted ring |
| Disabled | text `content-secondary` | — | border + text `Text/Inactive`, bg transparent | Neutral disabled |

## Tertiary  *(new variant — lowest-emphasis; borderless ghost with brand-tinted bg highlights)*
| State | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Default | — (did not exist) | — | bg transparent, no border, text `Text/Body` | Ghost — same brand-tinted overlays as Outlined, minus the border |
| Hover | — | — | bg `Brand/Primary @6%` (`color-mix`), text `Text/Body` | Same overlay strength as Outlined hover |
| Pressed | — | — | bg `Brand/Primary @8%` | Same overlay strength as Outlined press |
| Focus | — | — | ring `--focus-ring-brand` 2px + 2px `Surface/Card` gap | Brand-tinted ring |
| Disabled | — | — | text `Text/Inactive`, bg transparent | Neutral disabled |
| Loading | — | — | spinner + label, `aria-busy`, `--opacity-disabled` | Variant fill preserved at reduced opacity |

> Tertiary is Outlined minus the border — same brand-tinted hover/press overlays. Use for lowest-emphasis actions where Outlined is too prominent. No new tokens — every value reuses what Outlined already uses.

## Destructive  *(full state coverage added; semantic Feedback tokens, theme-independent for AA contrast)*
| State | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Default | `border-gradient-inner-red`; themed prod `--fb-red` resolves to `#B91C1C` light (5.94:1) / **`#EF4444` dark (3.76:1 — fails AA)** | — | `Feedback/Red` (`--fb-red`) `#B91C1C` (Red-700) — **theme-independent**, 5.94:1 in both themes | Fix at Feedback semantic layer; `--fb-red` pinned to Red-700 in both themes |
| Hover | red gradient | — | `Feedback/Error_Hover` (`--fb-red-hover`) `#991B1B` (Red-800, 8.39:1) | Darker on hover preserves AA |
| Pressed | — | — | `Feedback/Error_Press` (`--fb-red-press`) `#7F1D1D` (Red-850, 10.34:1) | bg-shift-only press |
| Focus | — | — | ring `--focus-ring` (Slate-900 / Slate-100 — neutral contrast) 2px + 2px `Surface/Card` gap | Neutral ring intentionally avoids red-on-red |
| Disabled | opacity 50% | — | bg `State/Disabled` (neutral grey), text `Text/Inactive` — **no longer red-tinted** | Neutral disabled; red should not tint a non-interactive state |
| **Loading (new)** | — | — | spinner + label, `aria-busy`, `--opacity-disabled` (.65) — variant red retained | Red preserved at .65 opacity; distinguishable from disabled |

> No new tokens introduced for Destructive. Fix is at the **Feedback semantic layer**: `--fb-red` becomes theme-independent at Red-700, with existing semantic siblings `--fb-red-hover` (Red-800, new) and `--fb-red-press` (Red-850, restored to theme-independent).

## Destructive Outlined  *(new variant — low-emphasis destructive action)*

Same red Feedback tokens as Destructive, applied to the Outlined stroke style.

| State | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Default | — (did not exist) | — | border `--btn-outline-destructive-border` (light `Feedback/Red` Red-700 / **dark Red-800**), bg transparent, text `Text/Body` | Dark dims one step — Red-700 reads too saturated against near-black Card |
| Hover | — | — | border `--btn-outline-destructive-border-hover` (light Red-800 / **dark Red-500**), bg `--btn-outline-destructive-bg-hover` (light `Feedback/Red @6%` / **dark @14%**), text `Text/Body` | Dark flips direction (Red-500 = lighter) + bumps overlay to 14% for parity of perceived prominence |
| Pressed | — | — | border `--btn-outline-destructive-border-hover`, bg `--btn-outline-destructive-bg-press` (light `Feedback/Red @8%` / **dark @22%**), text `Text/Body` | Same theme-asymmetry rationale as hover |
| Focus | — | — | ring `--focus-ring` (neutral Slate-900 / Slate-100) — intentionally **not** red, to avoid red-on-red | Neutral ring |
| Disabled | — | — | border + text `Text/Inactive`, bg transparent | No red tint on disabled |
| Loading | — | — | spinner inherits Feedback/Red via `currentColor`, `aria-busy`, `--opacity-disabled` | Red preserved at .65 opacity |

> Mirrors the Outlined variant 1:1 — **coloured border + neutral `Text/Body` label**. The label stays `--ink-body` to keep consistency with Outlined. `--btn-outline-destructive-bg-hover` / `--btn-outline-destructive-bg-press` are component-scoped tokens so the mix percentages live in exactly one place.

## Token architecture (this iteration — hard rule)

**Every semantic and component token resolves through a primitive.** Raw hex values appear in exactly one place: the Primitives block.

### Tokens introduced / updated this iteration

| Token | Resolves to | Primitive | Notes |
|---|---|---|---|
| `--btn-primary-bg-press` | both themes | `var(--tertiary-800)` | Replaces the previous off-palette `#055454`. |
| `--fb-red` *(updated)* | both themes | `var(--red-700)` | **Now theme-independent** (was `var(--red-500)` in dark — failed AA 3.76:1). |
| `--fb-red-hover` *(new)* | both themes | `var(--red-800)` | Semantic `Feedback/Error_Hover`. |
| `--fb-red-press` *(updated)* | both themes | `var(--red-850)` | Semantic `Feedback/Error_Press`. Now theme-independent. |
| ~~`--press-scale`~~ | — (retired) | — | Removed `transform: scale(.98)` on pressed — visible text-position shift felt wrong. bg-shift-only press feedback instead. |
| `--border` light | light only | `var(--slate-200)` | Was `var(--slate-100)` — bumped for visibility. Dark unchanged at `var(--grey-700)`. |
| `--opacity-disabled` *(new)* | both themes | `.65` | **Reusable opacity token** for disabled / loading treatments. |
| `--btn-outline-destructive-bg-hover` *(new)* | **theme-aware** | light `color-mix(--fb-red 6%, transparent)` · dark `color-mix(--fb-red 14%, transparent)` | Component-scoped overlay. Bumped on dark because @6% red over a near-black Card barely registers. |
| `--btn-outline-destructive-bg-press` *(new)* | **theme-aware** | light `color-mix(--fb-red 8%, transparent)` · dark `color-mix(--fb-red 22%, transparent)` | Pressed counterpart. |
| `--btn-outline-destructive-border` *(new)* | **theme-aware** | light `var(--fb-red)` (Red-700) · dark `var(--red-800)` | Default border. Dark dims — Red-700 on near-black reads too saturated. |
| `--btn-outline-destructive-border-hover` *(new)* | **theme-aware** | light `var(--fb-red-hover)` (Red-800) · dark `var(--red-500)` | Hover/press border. Light goes darker (more contrast on white); dark goes lighter (darker would collapse into bg). |
| `--btn-secondary-border` *(new)* | **theme-aware** | light `var(--slate-300)` · dark `var(--grey-600)` | Default border for Secondary — was `--border` (Slate-200 light / Grey-700 dark). Stepped up one stop so the card-fill Secondary reads distinct from a borderless surface. |
| `--btn-secondary-border-hover` *(new)* | **theme-aware** | light `var(--slate-400)` · dark `var(--grey-500)` | Hover/press border for Secondary — one stop darker than `--btn-secondary-border` in each theme. |

Existing tokens reused: `--btn-primary-bg` (`var(--brand-600)`), `--btn-primary-bg-hover` (`var(--brand-700)`), `--btn-primary-text` (`var(--white)`), `--focus-ring-brand` (`var(--brand-600)`).

## Loading state — design rationale

Reference image showed the Loading button keeping its variant colour with a slight transparency, not the muted disabled palette. Implementation:
- `aria-busy="true"` to announce busy to assistive tech.
- `pointer-events:none` to swallow clicks (instead of `disabled`, which would force the browser's disabled colours).
- `opacity: var(--opacity-disabled)` — reusable token (`.65`), visible but clearly "in progress".
- Spinner uses `currentColor` so it works on any variant.

## No change (—)
Sizes (xs 28 / sm 32 / md 36 / lg 40 / xl 44px), radius `md 6px`, gap 6px, font-medium 500.
