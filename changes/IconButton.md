# IconButton — prod → expected

Source: `@insightis/ui` `Button/index.tsx` (cva) + `globals.css`.

**IconButton mirrors the full Button variant set — Primary / Secondary / Outlined / Tertiary / Destructive Outlined** — each reusing the corresponding Button tokens 1:1. No IconButton-specific colour tokens are introduced. The CSS base (`.iconbtn`) is stripped down to shape/size only; colour comes from the variant class.

## Variants

| Variant | Class | Default tokens | Mirrors Button |
|---|---|---|---|
| Primary | `.iconbtn-primary` | bg `--btn-primary-bg`, icon `--btn-primary-text` | `.btn-primary` |
| Secondary | `.iconbtn-secondary` | bg `Surface/Card`, border `--btn-secondary-border` (Slate-300 light / Grey-600 dark), icon `Text/Body` | `.btn-secondary` |
| Outlined | `.iconbtn-outline` | border `Brand/Secondary`, bg transparent, icon `Text/Body` | `.btn-outline` |
| **Tertiary** *(new)* | `.iconbtn-tertiary` | bg transparent, no border, icon `Text/Body` | `.btn-tertiary` |
| **Destructive Outlined** *(new)* | `.iconbtn-outline-destructive` | border `Feedback/Red`, bg transparent, icon `Text/Body` (label stays neutral — mirrors Outlined; the border carries the danger colour identity) | `.btn-outline-destructive` |

## States (applies to all variants — uses the corresponding Button rules)

| State | Tokens (resolves per variant) |
|---|---|
| Default | variant defaults (see table above) |
| Hover | `--btn-primary-bg-hover` (Primary) / `--btn-secondary-bg-hover` = `Brand/Primary @ 5%` over `Surface/Card` + border `--btn-secondary-border-hover` (Secondary — see [`colors.md`](colors.md) for why a brand tint replaced the earlier `State/Hover`) / `var(--btn-outline-bg-hover)` (Outlined + Tertiary, + `Brand/Primary_Hover` border on Outlined) |
| Pressed | `--btn-primary-bg-press` / `State/Pressed` / `Brand/Primary @8%` — bg-shift only, no transform or shadow (Outline also keeps the `Brand/Primary_Hover` border from hover) |
| Focus | ring `--focus-ring-brand` 2px + 2px `Surface/Card` gap |
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

## No change (—)
Size 36×36, radius `md 6px`, icon 18px, transition .12s.

## Token reuse note

Every IconButton state resolves to a Button-level token. If a downstream colour change to `--btn-primary-bg` is made, both Button Primary and IconButton Primary update in lock-step — no parallel IconButton token file is required.
