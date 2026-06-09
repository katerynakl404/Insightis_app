# Button — prod → expected

Source: `@insightis/ui` `Button/index.tsx` (cva) + `globals.css`.

All Expected values resolve to **kit primitives only** (Brand 50–900 · Tertiary 50–950 · Slate 50–950 · Grey 50–950 · Red 50–950). Black-with-alpha (`rgba(0,0,0,α)`) is the universal shadow convention.

## Primary
| State | Current (prod) | Expected |
|---|---|---|
| Default | fill `accent` `#07827F` (`border-gradient-inner-accent`), text = background; **themed** (lighter in dark — `#fff` contrast drops to 3.89:1) | flat fill `--btn-primary-bg` `#07807E` (Brand-600), text `--btn-primary-text` `#FFFFFF` — **theme-independent**, AA in both themes |
| Hover | gradient `primary→secondary` | `--btn-primary-bg-hover` `#066867` (Brand-700) |
| Pressed | pressed gradient + inset shadow | `--btn-primary-bg-press` `#0E5862` (**Tertiary-800** — replaces the off-palette `#055454`) |
| Focus | global ring (slate / off-white) | ring `--focus-ring-brand` `#07807E` 2px + 2px `Surface/Card` gap |
| Disabled | transparent + `border-gradient-inner-border`, text `content-light` | bg `State/Disabled`, text `Text/Inactive` |
| **Loading (new)** | — (no built-in loading state) | spinner uses `currentColor`, label retained, `aria-busy="true"` + `pointer-events:none`, **opacity .65** — keeps the variant fill, does not swap to disabled palette |

## Secondary  *(restyled — filled card-style; teal border moves to Outlined)*
| State | Current (prod) | Expected |
|---|---|---|
| Default | border `secondary` (teal), text `content-body`, bg transparent | bg `Surface/Card`, border `Stroke/Border` (Slate-200), text `Text/Body` |
| Hover | border `accent`, bg `primary/5`, icon `accent` | bg `--btn-secondary-bg-hover` = `Brand/Primary @ 5%` over `Surface/Card` (subtle teal tint — distinguishable on **any** neutral surface; an earlier neutral-lift plan collapsed into the surrounding bg in light mode and into the Card surface in dark mode), border `Stroke/Border_Hover`, text `Text/Body` |
| Pressed | bg `primary/5` + inset | bg `State/Pressed` |
| Focus | global ring (slate / off-white) | ring `--focus-ring-brand` 2px + 2px `Surface/Card` gap |
| Disabled | border + text `content-light` | bg `State/Disabled`, text `Text/Inactive`, border `Stroke/Border` |

> Emphasis shifts from a teal-coloured stroke to a card-tone fill — Secondary becomes a lower-emphasis filled action while still reading distinct from the page surface.

## Outlined  *(takes the teal-bordered styling that previously sat under Secondary; same name)*
| State | Current (prod) | Expected |
|---|---|---|
| Default | border `border` (neutral), bg `card` (opaque), text `content-body` | border `Brand/Secondary` (teal), bg transparent, text `Text/Body` |
| Hover | text `accent`, border `Stroke/Border_Hover` | border `Brand/Primary_Hover`, bg `Brand/Primary @6%` |
| Pressed | text+border `accent` + inset | border `Brand/Primary_Hover`, bg `Brand/Primary @8%` |
| Focus | global ring (slate / off-white) | ring `--focus-ring-brand` 2px + 2px `Surface/Card` gap |
| Disabled | text `content-secondary` | border + text `Text/Inactive`, bg transparent |

## Tertiary  *(new variant — lowest-emphasis; borderless ghost with brand-tinted bg highlights)*
| State | Current (prod) | Expected |
|---|---|---|
| Default | — (did not exist) | bg transparent, no border, text `Text/Body` |
| Hover | — | bg `Brand/Primary @6%` (`color-mix`), text `Text/Body` |
| Pressed | — | bg `Brand/Primary @8%` |
| Focus | — | ring `--focus-ring-brand` 2px + 2px `Surface/Card` gap |
| Disabled | — | text `Text/Inactive`, bg transparent |
| Loading | — | spinner + label, `aria-busy`, `--opacity-disabled` |

> Tertiary is Outlined minus the border — same brand-tinted hover/press overlays. Use it for the lowest-emphasis actions (e.g. tertiary toolbar actions, link-style CTAs) where Outlined is too prominent. No new tokens — every value reuses what Outlined already uses.

## Destructive  *(full state coverage added per reference image; semantic Feedback tokens, theme-independent for AA contrast)*
| State | Current (prod) | Expected |
|---|---|---|
| Default | `border-gradient-inner-red`; themed prod `--fb-red` resolves to `#B91C1C` light (5.94:1) / **`#EF4444` dark (3.76:1 — fails AA)** | `Feedback/Red` (`--fb-red`) `#B91C1C` (Red-700) — **theme-independent**, 5.94:1 in both themes |
| Hover | red gradient | `Feedback/Error_Hover` (`--fb-red-hover`) `#991B1B` (Red-800, 8.39:1) |
| Pressed | — | `Feedback/Error_Press` (`--fb-red-press`) `#7F1D1D` (Red-850, 10.34:1) |
| Focus | — | ring `--focus-ring` (Slate-900 / Slate-100 — neutral contrast) 2px + 2px `Surface/Card` gap |
| Disabled | opacity 50% | bg `State/Disabled` (neutral grey), text `Text/Inactive` — **no longer red-tinted** |
| **Loading (new)** | — | spinner + label, `aria-busy`, `--opacity-disabled` (.65) — variant red retained |

> No new tokens introduced for Destructive. The fix is at the **Feedback semantic layer**: `--fb-red` becomes theme-independent at Red-700, with the existing semantic siblings `--fb-red-hover` (Red-800, new) and `--fb-red-press` (Red-850, restored to theme-independent) handling the interaction states. Pinning Feedback/Red across themes guarantees the danger colour stays recognisable AND accessible.

## Token architecture (this iteration — hard rule)

**Every semantic and component token resolves through a primitive.** Raw hex values appear in exactly one place: the Primitives block. Anything else (`:root`, `.dark`, component-scoped tokens) uses `var(--primitive-name)`. The only exception is `rgba(0,0,0,α)` inside `box-shadow` declarations — universal shadow convention, not a colour token.

### Primitives block (single source of truth)

Defined in `:root` as theme-independent CSS variables. Includes Brand 50–900, Tertiary 50–950, Slate 50–950 (with custom 450), Grey 50–950 (with custom 600/700/800/900/950), Red 50–950 (with custom 400/850/900/950), plus single-purpose `--orange-500`, `--green-light-600`, `--green-dark-500` for Feedback/Attention and Feedback/Green, and achromatic `--white` / `--black`.

### Semantic tokens (light & dark)

Every existing semantic token (`--bg`, `--card`, `--brand-primary`, `--ink-body`, `--fb-red`, …) now reads `var(--<primitive>)`. Two pre-existing off-palette quirks fixed in the process:
- `--logo-ink` light value was `#111827` → now `var(--slate-900)` (visually identical, 1-step deviation removed).
- `--logo-mark` light value was `#07807D` (typo of `#07807E`) → now `var(--brand-600)`.

### Tokens introduced / updated this iteration

| Token | Resolves to | Primitive | Notes |
|---|---|---|---|
| `--btn-primary-bg-press` | both themes | `var(--tertiary-800)` | Replaces the previous off-palette `#055454`. |
| `--fb-red` *(updated)* | both themes | `var(--red-700)` | **Now theme-independent** (was `var(--red-500)` in dark — failed AA 3.76:1). Fixes Destructive dark-theme contrast at the Feedback layer. |
| `--fb-red-hover` *(new)* | both themes | `var(--red-800)` | Semantic `Feedback/Error_Hover`. Darker on hover, preserves AA. |
| `--fb-red-press` *(updated)* | both themes | `var(--red-850)` | Semantic `Feedback/Error_Press`. Now theme-independent. |
| ~~`--press-scale`~~ | — (retired) | — | Briefly used a `transform: scale(.98)` on pressed elements; visible text-position shift made it feel wrong. Retired in favour of **bg-shift-only press feedback** (the Tailwind UI / shadcn / GitHub Primer pattern): every pressed variant uses a darker bg colour, nothing else. No transform, no shadow, no text jump. |
| `--border` light | light only | `var(--slate-200)` | Was `var(--slate-100)` — bumped for visibility. Dark unchanged at `var(--grey-700)`. |
| `--opacity-disabled` *(new)* | both themes | `.65` | **Reusable opacity token** for disabled / loading / "less-interactive" treatments. Applied to `.s-loading.btn` and `.s-loading.iconbtn`. |

> **Naming note:** the Destructive button uses Feedback/* semantic tokens directly — no component-scoped `--btn-destructive-*` family is needed. `Feedback/Red` and its `_Hover` / `_Press` siblings are reusable across any destructive surface (Badge, Banner, etc.). Badge usage of `--fb-red` continues via `color-mix()` alpha; the shift to Red-700 in dark slightly reduces badge text contrast on the darkest surfaces (4.0:1 vs the previous 7.5:1) — still passes AA for large text (≥18 px). If badges need further attention, that's a separate iteration.

Existing tokens reused: `--btn-primary-bg` (`var(--brand-600)`), `--btn-primary-bg-hover` (`var(--brand-700)`), `--btn-primary-text` (`var(--white)`), `--focus-ring-brand` (`var(--brand-600)`).

## Loading state — design rationale

Reference image showed the Loading button keeping its variant colour (red) with a slight transparency, not the muted disabled palette. Implementation:
- `aria-busy="true"` to announce busy to assistive tech.
- `pointer-events:none` to swallow clicks (instead of `disabled`, which would force the browser's disabled colours).
- `opacity: var(--opacity-disabled)` — reusable token (`.65`), visible but clearly "in progress".
- Spinner uses `currentColor` so it works on any variant; same rule covers both Button and IconButton.

## No change (—)
Sizes (xs 28 / sm 32 / md 36 / lg 40 / xl 44px), radius `md 6px`, gap 6px, font-medium 500.
