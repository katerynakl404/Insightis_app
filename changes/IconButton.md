# IconButton — prod → expected

Source: `@insightis/ui` `Button/index.tsx` (cva) + `globals.css`.

**IconButton mirrors the full Button variant set — Primary / Secondary / Outlined / Tertiary** — each reusing the corresponding Button tokens 1:1. No IconButton-specific colour tokens are introduced. The CSS base (`.iconbtn`) is stripped down to shape/size only; colour comes from the variant class.

## Variants

| Variant | Class | Default tokens | Mirrors Button |
|---|---|---|---|
| Primary | `.iconbtn-primary` | bg `--btn-primary-bg`, icon `--btn-primary-text` | `.btn-primary` |
| Secondary | `.iconbtn-secondary` | bg `Surface/Card`, border `Stroke/Border`, icon `Text/Body` | `.btn-secondary` |
| Outlined | `.iconbtn-outline` | border `Brand/Secondary`, bg transparent, icon `Text/Body` | `.btn-outline` |
| **Tertiary** *(new)* | `.iconbtn-tertiary` | bg transparent, no border, icon `Text/Body` | `.btn-tertiary` |

## States (applies to all variants — uses the corresponding Button rules)

| State | Tokens (resolves per variant) |
|---|---|
| Default | variant defaults (see table above) |
| Hover | `--btn-primary-bg-hover` (Primary) / `--btn-secondary-bg-hover` = `Brand/Primary @ 5%` over `Surface/Card` + border `Stroke/Border_Hover` (Secondary — see [`colors.md`](colors.md) for why a brand tint replaced the earlier `State/Hover`) / `Brand/Primary @6%` (Outlined + Tertiary, + `Brand/Primary_Hover` border on Outlined) |
| Pressed | `--btn-primary-bg-press` / `State/Pressed` / `Brand/Primary @8%` — bg-shift only, no transform or shadow (Outline also keeps the `Brand/Primary_Hover` border from hover) |
| Focus | ring `--focus-ring-brand` 2px + 2px `Surface/Card` gap |
| Disabled | bg `State/Disabled` (Primary/Secondary) or icon `Text/Inactive` (Outlined/Tertiary, bg transparent) |
| Loading | spinner uses `currentColor`, `aria-busy="true"`, `pointer-events:none`, `--opacity-disabled` — variant colour preserved |

## Prod baseline

Prod ships a single IconButton style (≈ Secondary's new look — neutral border, card bg, hover recolours icon to accent). The Primary, Outlined, and Tertiary variants are new; their "Current (prod)" cells in the kit show `— did not exist`.

## Diff from prod (Secondary — the variant that mostly matches the existing prod look)

| Property | Current (prod) | Expected |
|---|---|---|
| Border default | `border` `#F0F5FA` | `Stroke/Border` `#E2E8F0` (Slate-200; was Slate-100 — bumped for visibility) |
| Hover icon | `accent` `#07827F` | unchanged (icon stays `Text/Body`); bg shifts to `--btn-secondary-bg-hover` (5 % Brand/Primary tint over Surface/Card) |
| Hover border | `Stroke/Border_Hover` | `Stroke/Border_Hover` (kept) — pairs with the new tinted bg as a second affordance |
| Disabled | `border-gradient-inner-border`, icon `content-light` | bg `State/Disabled`, icon `Text/Inactive` |

## No change (—)
Size 36×36, radius `md 6px`, icon 18px, transition .12s.

## Token reuse note

Every IconButton state resolves to a Button-level token. If a downstream colour change to `--btn-primary-bg` is made, both Button Primary and IconButton Primary update in lock-step — no parallel IconButton token file is required.
