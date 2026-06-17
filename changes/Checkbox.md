# Checkbox — prod → expected

Baseline: [`../current/Checkbox.md`](../current/Checkbox.md).

Every interactive state is now documented in **both** the unchecked and checked conditions, side-by-side in the states table. Two amendments vs the prior iteration of this change file: (1) **Disabled** moves from a colour-shift to the unified opacity recipe (matches prod's `opacity-50` original intent + lines up with Switch / Button / IconButton / Tabs); (2) a new **Error** row is added with both conditions.

| State | Current (prod) | v1.0 | Expected (unchecked) | Expected (checked) | Specification |
|---|---|---|---|---|---|
| Default | unchecked: border `border`, bg `card` · checked: bg+border `accent`, mark `#FFF` | — | border `Stroke/Border_Hover`, bg `Surface/Card` | bg + border `Brand/Primary`, mark `Content/On_Solid` | stronger default border for visibility (border + box ≥ 3:1 vs Card); hex shift only on checked fill |
| Hover *(new)* | ⚠ undefined | — | border `Text/Secondary` (neutral, no brand tint) | bg `Brand/Primary_Hover` | signals interactivity before click without colour-cueing the action; hover for checked matches Button Primary hover |
| Focus *(new)* | ⚠ undefined (was `ring-2 ring-ring ring-offset-2`) | — | `box-shadow:0 0 0 2px Surface/Card, 0 0 0 4px State/Focus_Ring` (neutral) | identical neutral ring | brand colour reserved for the checked fill + Button focus; form-control focus stays neutral. Same ring shape in both positions. |
| Indeterminate *(new)* | ⚠ undefined | — | (n/a — tri-state contract) | bg + border `Brand/Primary`, mark = 10 × 2 px white horizontal bar | required for "some selected" cases (tables, tree-lists). Single position only — indeterminate is neither checked nor unchecked. |
| **Error *(new)*** | ⚠ undefined | — | border `--input-error`, bg unchanged | bg + border `--input-error`, mark `Content/On_Solid` | mirrors Input `.s-error` border treatment. Error has higher priority than checked → bg follows error colour when both apply. |
| **Disabled *(amended → opacity recipe)*** | opacity 50% (both positions) | — | `opacity:var(--opacity-disabled)` (.65) + `cursor:not-allowed` + `pointer-events:none` — fades from `--card` / `--border-hover` base | same opacity recipe — fades from `--brand-primary` base; **mark + indeterminate bar drop from `#FFF` to `Text/Inactive`** so the disabled mark reads as muted (consistent with disabled-text language across the system). 1.4.3 exempts the mark/bg contrast for disabled components. | Was: kit had bg + border colour swap to `--state-disabled` — a divergence from prod's opacity-based recipe. Now reunified with the rest of the kit's disabled treatments. No colour override on the surfaces; only the mark shifts. |

## No change (—)

Size 20 × 20 (kit uses 18 × 18 for ministage compactness), radius `md` 6 px, mark stroke `Content/On_Solid`, label font-size / weight / gap scale, indeterminate's single-position behaviour.

## Token map used

`--card` (Surface/Card) · `--border-hover` (Stroke/Border_Hover, default border) · `--ink-secondary` (Text/Secondary, hover border) · `--brand-primary` (Brand/Primary, checked fill + indeterminate) · `--brand-hover` (Brand/Primary_Hover, checked hover fill) · `--input-error` (border + checked bg in error state — theme-adaptive) · `--focus-ring` (State/Focus_Ring — **neutral**, used by the outer ring) · `--opacity-disabled` (.65, shared with Switch / Button / IconButton / Tabs) · `--content-on-solid` (mark + indeterminate bar). All resolve correctly in both themes via existing semantic aliases. Brand colour appears **only** on the checked fill + indeterminate.

## Accessibility & consistency self-check
```
Consistency: PASS — disabled recipe now unified with Switch / Button / IconButton / Tabs via --opacity-disabled. Focus ring shared with Switch (form-control neutral). Error border shared with Input .s-error. Indeterminate added for parity with the WAI-ARIA tri-state contract.
Accessibility:
  ✓ Focus ring vs Card — light #0F172A / #FFFFFF = 17.85:1; dark #F1F5F9 / #17171E = 16.10:1 (target 3:1, 1.4.11) — neutral State/Focus_Ring
  ✓ Checked fill vs Card — light #07807E / #FFFFFF = 5.07:1; dark #148F8D / #17171E = 4.54:1 (target 3:1 for UI 1.4.11; comfortable margin)
  ✓ Mark contrast — Content/On_Solid #FFFFFF on Brand/Primary = same 5.07:1 / 4.54:1
  ✓ Error border vs Card — light #B91C1C / #FFFFFF = 8.39:1; dark #EF4444 / #17171E = 5.32:1
  ✓ Focus-visible affordance preserved — 2 px Card gap + 2 px neutral ring (2.4.7)
  ✓ Status not by colour alone — Checked shows the white tick, Indeterminate shows a white bar (1.4.1)
  ✓ Disabled — opacity .65 retains perceivability but signals non-interactive via cursor + pointer-events; accessible name unaffected. Same dim level whether checked or unchecked. Disabled-checked mark shifts from #FFF (1.24:1 vs disabled-bg) to Text/Inactive — visually coherent with disabled text, contrast exempt per 1.4.3 (inactive component).
```
