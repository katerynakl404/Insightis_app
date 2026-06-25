# IconButton — prod → expected

Source: `@insightis/ui` `Button/index.tsx` (cva) + `globals.css`.

**IconButton mirrors the full Button variant set — Primary / Secondary / Outlined / Tertiary / Destructive Outlined** — each reusing the corresponding Button tokens 1:1. No IconButton-specific colour tokens are introduced. The CSS base (`.iconbtn`) is stripped down to shape/size only; colour comes from the variant class.

## Base geometry (`.iconbtn` — shape/size only, one size)

| Property | Value | Notes |
|---|---|---|
| Width × Height | `2.25rem` × `2.25rem` (36 × 36px) | Single size — no xs/sm/lg/xl scale (unlike Button). Square footprint. |
| Radius | `.375rem` (6px) | Matches Button `md`. |
| Border | `1px solid transparent` | Variant class supplies the visible colour. |
| Transition | `all .12s` | Matches Button. |
| Icon glyph | ≤18px typical (consumer-set) | **Icon size is flexible / consumer-set by design — not enforced by `.iconbtn`.** `.iconbtn` sizes only the button box; the glyph size comes from the consumer's inline SVG `width`/`height`. 18px is the typical/default, but it may be smaller per-instance (e.g. `.mx-tbl-actions .iconbtn svg{width:13px;height:13px}` in table action rows). Intentional — no base `.iconbtn svg{...}` rule, so each context picks its own glyph size. |

## Variants

Single size (36×36) — variants differ in colour only, all reusing Button tokens 1:1. **No per-variant geometry deviation.** The only token-level deviation across the set is the **focus-ring exception** on Destructive Outlined (see States table).

| Variant | Class | Default tokens | Mirrors Button | Deviation from Button |
|---|---|---|---|---|
| Primary | `.iconbtn-primary` | bg `--btn-primary-bg`, icon `--btn-primary-text` | `.btn-primary` | none |
| Secondary | `.iconbtn-secondary` | bg `Surface/Card` (`--btn-secondary-bg`), border `--btn-secondary-border` (Slate-300 light / Grey-600 dark), icon `Text/Body` | `.btn-secondary` | none |
| Outlined | `.iconbtn-outline` | border `Brand/Secondary`, bg transparent, icon `Text/Body` | `.btn-outline` | none |
| **Tertiary** *(new)* | `.iconbtn-tertiary` | bg transparent, no border, icon `Text/Body` | `.btn-tertiary` | none |
| **Destructive Outlined** *(new)* | `.iconbtn-outline-destructive` | border `--btn-outline-destructive-border` (`Feedback/Red` light Red-700 / dark Red-800), bg transparent, icon `Text/Body` (label stays neutral — mirrors Outlined; the border carries the danger identity) | `.btn-outline-destructive` | **focus ring = `--focus-ring` (neutral), not `--focus-ring-brand`** — avoids red-on-red |

> **Resolved — aligned to Button (`--btn-secondary-border`).** `.iconbtn-secondary:active` now uses `border-color:var(--btn-secondary-border)` (Slate-300), matching `.s-pressed.iconbtn-secondary` (forced-state) and the Button secondary pressed border. The earlier `--border` (Slate-200) value — one stop lighter — has been corrected, so real-interactive and forced-state pressed now agree.

## States (applies to all variants — uses the corresponding Button rules)

| State | Tokens (resolves per variant) |
|---|---|
| Default | variant defaults (see table above) |
| Hover | `--btn-primary-bg-hover` (Primary) / `--btn-secondary-bg-hover` = `Brand/Primary @ 5%` over `Surface/Card` + border `--btn-secondary-border-hover` (Secondary — see [`colors.md`](colors.md) for why a brand tint replaced the earlier `State/Hover`) / `var(--btn-outline-bg-hover)` (Outlined + Tertiary, + `Brand/Primary_Hover` border on Outlined) |
| Pressed | `--btn-primary-bg-press` / `State/Pressed` / `Brand/Primary @8%` — bg-shift only, no transform or shadow (Outline also keeps the `Brand/Primary_Hover` border from hover) |
| Focus | ring 2px + 2px `Surface/Card` gap. Ring colour is `--focus-ring-brand` for Primary / Secondary / Outlined / Tertiary, but **`--focus-ring` (neutral) for Destructive Outlined** (`.iconbtn-outline-destructive` — mirrors Button Destructive; the red identity is carried by the border, not the focus ring) |
| Disabled | bg `State/Disabled` (Primary/Secondary) or icon `Text/Inactive` (Outlined/Tertiary, bg transparent) |
| Loading | spinner uses `currentColor`, `aria-busy="true"`, `pointer-events:none`, `--opacity-disabled` — variant colour preserved |

## Prod baseline

Prod ships a single IconButton style (≈ Secondary's new look — neutral border, card bg, hover recolours icon to accent). The Primary, Outlined, and Tertiary variants are new; their "Current (prod)" cells in the kit show `— did not exist`.

## Diff from prod (Secondary — the variant that mostly matches the existing prod look)

| Property | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Border default | `border` `#F0F5FA` | `Stroke/Border` `#E2E8F0` (Slate-200) | `--btn-secondary-border` (Slate-300 light / Grey-600 dark — see [Button](Button.md)) | Aligns with Button Secondary border token; slightly darker than Slate-200 for improved contrast |
| Hover icon | `accent` `#07827F` | unchanged (icon stays `Text/Body`); bg shifts to `--btn-secondary-bg-hover` | — (no change from v1.0) | Icon colour itself unchanged; bg affordance carries the hover |
| Hover border | `Stroke/Border_Hover` | `Stroke/Border_Hover` (kept) | `--btn-secondary-border-hover` | Token-aligned; resolves to same value as `Stroke/Border_Hover` |
| Disabled | `border-gradient-inner-border`, icon `content-light` | bg `State/Disabled`, icon `Text/Inactive` | — (no change from v1.0) | Mirrors Button Secondary disabled recipe |

## Tooltip

| Property | Current (prod) | Expected | Specification |
|---|---|---|---|
| Tooltip on hover | — no tooltip | `[data-tip]` CSS-only bubble above the button | Required — icon-only buttons must label themselves |
| Enter delay (cold) | — | 300 ms (`transition-delay: .3s` on `:hover::after`) | First tooltip in a session; gives the eye time to land before the overlay appears |
| Enter delay (warm) | — | 0 ms (`.tt-warm [data-tip]:hover::after` — no delay) | Subsequent tooltips within 600 ms of leaving a previous one; keeps fast scanning fluid |
| Leave duration | — | 100 ms (`transition: opacity .1s, transform .1s` on resting `::after`) | Short fade — the bubble exits before the eye chases it |
| Warm-up window | — | 600 ms (JS `setTimeout` clears `.tt-warm` on `<body>`) | CSS reads `.tt-warm` body class; JS sets it on `mouseout` of any `[data-tip]` and clears after 600 ms with no new hover |

## No change (—)
Size 36×36, radius `md 6px`, icon ≤18px typical (consumer-set / flexible by design — no base CSS rule; see Base geometry table), transition .12s.

## Token reuse note

Every IconButton state resolves to a Button-level token. If a downstream colour change to `--btn-primary-bg` is made, both Button Primary and IconButton Primary update in lock-step — no parallel IconButton token file is required.
