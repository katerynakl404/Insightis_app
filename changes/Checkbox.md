# Checkbox — prod → expected

Baseline: [`../current/Checkbox.md`](../current/Checkbox.md).

Every interactive state is now documented in **both** the unchecked and checked conditions, side-by-side in the states table. Two amendments vs the prior iteration of this change file: (1) **Disabled** moves from a colour-shift to the unified opacity recipe (matches prod's `opacity-50` original intent + lines up with Switch / Button / IconButton / Tabs); (2) a new **Error** row is added with both conditions.

| State | Current (prod) | v1.0 | Expected (unchecked) | Expected (checked) | Specification |
|---|---|---|---|---|---|
| Default | unchecked: border `border`, bg `card` · checked: bg+border `accent`, mark `#FFF` | — | border `Stroke/Border_Hover`, bg `Surface/Card` | bg + border `Brand/Primary`, mark `Content/On_Solid` | stronger default border for visibility (border + box ≥ 3:1 vs Card); hex shift only on checked fill |
| Hover *(new)* | ⚠ undefined | — | border `Text/Secondary` (neutral, no brand tint) | bg `Brand/Primary_Hover` | signals interactivity before click without colour-cueing the action; hover for checked matches Button Primary hover |
| Focus *(new)* | ⚠ undefined (was `ring-2 ring-ring ring-offset-2`) | — | `box-shadow:0 0 0 2px Surface/Card, 0 0 0 4px State/Focus_Ring` (neutral) | identical neutral ring | brand colour reserved for the checked fill + Button focus; form-control focus stays neutral. Same ring shape in both positions. |
| Indeterminate *(new)* | ⚠ undefined | — | (n/a — tri-state contract) | bg + border `Brand/Primary`, mark = `.625rem` (10 px) × 2 px white horizontal bar, radius 1 px (`::before`) | required for "some selected" cases (tables, tree-lists). Single position only — indeterminate is neither checked nor unchecked. |
| **Error *(new)*** | ⚠ undefined | — | border `--input-error`, bg unchanged | bg + border `--input-error`, mark `Content/On_Solid` | mirrors Input `.s-error` border treatment. Error has higher priority than checked → bg follows error colour when both apply. |
| **Disabled *(amended → opacity recipe)*** | opacity 50% (both positions) | — | `opacity:var(--opacity-disabled)` (.65) + `cursor:not-allowed` + `pointer-events:none` — fades from `--card` / `--border-hover` base | same opacity recipe — fades from `--brand-primary` base; **the checked tick + indeterminate bar stay `#FFF` (`--content-on-solid`)** and are muted purely by the container opacity — no separate colour drop, so the mark always reads white, never grey. 1.4.3 exempts the mark/bg contrast for disabled components. | Was: kit had bg + border colour swap to `--state-disabled` — a divergence from prod's opacity-based recipe. Now reunified with the rest of the kit's disabled treatments via opacity only; no colour override on the surfaces OR the mark (the earlier "drop tick to Text/Inactive" was removed — disabled de-emphasis is opacity-only). |

## Reproduction values (kit `.cbx`)

**Element / markup.** The control is a single `<span class="cbx">` (toggled `.on` when checked, `.is-indeterminate` for tri-state). The checkmark lives inside as an inline SVG: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6 9 17l-5-5"/></svg>` — `stroke="currentColor"` inherits the box `color` (`--content-on-solid`), so the same markup stays white when disabled (muted only by the container opacity, no colour drop). Indeterminate state hides the SVG (`.cbx.is-indeterminate svg{display:none}`) and draws its bar via `::before` instead.

**Box / layout.** Box **18 × 18 px** (`1.125rem` — kit uses this for ministage compactness; prod is 20 × 20). Radius **`.25rem` (4 px)** — note `.prod .cbx` is `.375rem` (6 px); the prior doc had Expected/prod swapped. Border **`1.5px solid`** (`--border-hover` unchecked). Bg `--card`. The box is `display:inline-flex; align-items:center; justify-content:center; flex:none` (centres the mark, never shrinks in a flex row), `cursor:pointer`, `vertical-align:middle`, `color:--content-on-solid` (drives the mark). Checked: bg + border `--brand-primary`, mark `--content-on-solid`.

**States / transitions.** Container transition `background-color .12s, border-color .12s, box-shadow .12s`. Mark svg `opacity:0 → 1` on `.on` with `transition: opacity .1s`. Focus-visible sets `outline:none` then the dual ring `box-shadow:0 0 0 2px var(--card),0 0 0 4px var(--focus-ring)` (also reachable via `.s-focus`). Indeterminate bar `::before` — `.625rem` (10 px) × 2 px, `border-radius:1px`, `background:--content-on-solid` (stays white when disabled — muted only by the container opacity).

## No change (—)

Mark stroke `Content/On_Solid`, label font-size / weight / gap scale, indeterminate's single-position behaviour.

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
