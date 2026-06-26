# Tabs — prod → expected

Baseline: [`../current/Tabs.md`](../current/Tabs.md).

| State | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Active | full-width 2 px `border-bottom` + text `accent` `#07827F` | — | button-width 2 px underline via `::after` (`left:0;right:0`) + text `--ink-highlight`; tabset gap `.5rem` | `--ink-highlight` = `--brand-primary` in light, `--tertiary-400` (#2EBEC4) in dark — same vivid-cyan recipe as `.link`. Underline spans full button width; gap between tabs gives text-width appearance without left-edge indent. |
| Default (inactive) | text `content-secondary` `#62748E` | — | `--ink-secondary` `#64748B` | hex shift only |
| Hover | bg `State/Hover` `#F0F8FB` + text `content-body` | — | text `--ink-body` only — **no background** | ⚠ Prod applied a hover surface tint; the shipped kit rule (`kit-theme.css:730`) is `.tab:hover{color:var(--ink-body)}` — **colour change only, no `background`**. The earlier Expected text claiming a `--state-hover` bg was a doc overstatement; corrected to match CSS. If a hover bg is actually wanted, that is a new contract — surface it, don't assume. |
| **Focus** *(new)* | ⚠ undefined in prod (relied on user-agent default) | — | `box-shadow:0 0 0 2px Surface/Card, 0 0 0 4px --focus-ring` | Brand-tinted ring (tabs are nav, not form). Matches `.sbx-nav-item` and `.link` focus rings already in the kit. WCAG 2.4.7. |
| **Disabled** *(new — recipe change)* | `disabled:opacity-50` (hardcoded 50%) | — | `opacity:var(--opacity-disabled)` (.65) + `pointer-events:none` + `cursor:not-allowed` | Unifies disabled treatment with Button / IconButton / Switch / Checkbox. No colour override — fade-from-base only. |

## Self-reproducing spec — per state (final contract)

Source: `kit-theme.css:731–738`. Base `.tab` and the `.tabset` container are shared by every state; only the listed properties change per state.

**Markup** — each tab is a `<button class="tab">` (add `is-active` for the selected tab); all buttons sit directly inside a `<div class="tabset">` wrapper. No icon SVG in the kit demo (label text only); 04.06 prod added tab-icon coloring, tracked under [colors](colors.md).

**Base `.tab`** — `padding:.5rem .75rem .75rem` (8px top, 12px sides, 12px bottom); `font-size:.875rem` (text-sm); `border:none`; `margin-bottom:-1px` (overlaps the tabset's 1px bottom border); `border-radius:4px 4px 0 0`; `background:none`; `font-family:inherit`; `cursor:pointer`; `position:relative`. Underline element `.tab::after` — `position:absolute; bottom:-1px; left:0; right:0; height:2px; border-radius:1px; background:transparent` (full button-width; revealed per state via `background`); `transition:background .15s`.

**Container `.tabset`** — `display:flex; gap:.5rem; border-bottom:1px solid var(--border)`. The `.5rem` gap is what gives the active underline a text-width *appearance* without a left-edge indent.

| State | Selector | Distinguishing tokens / values |
|---|---|---|
| **Default (inactive)** | `.tab` | text `color:var(--ink-secondary)`; `::after` background transparent (no underline) |
| **Hover** | `.tab:hover` | text `color:var(--ink-body)` — **colour only, no background** |
| **Active** | `.tab.is-active` | text `color:var(--ink-highlight)`; `font-weight:500`; underline shown via `.tab.is-active::after{background:var(--ink-highlight)}` (full button width, 2px, radius 1px) |
| **Focus** | `.tab:focus-visible` | `outline:none; box-shadow:0 0 0 2px var(--card),0 0 0 4px var(--focus-ring)` — brand-tinted 2-layer ring (nav, not form) |
| **Disabled** | `.tab:disabled`, `.tab.s-disabled` | `opacity:var(--opacity-disabled)` (.65); `pointer-events:none`; `cursor:not-allowed`; no colour override (fade-from-base) |

> Storybook static-state mirrors: `.tab.s-active` / `.tab.s-focus` / `.tab.s-disabled` apply the same values as the `:active`-class / `:focus-visible` / `:disabled` interactive states for the States table.

## No change (—)

Item padding 8/12 px, text-sm, active underline height 2 px, underline border-radius 1 px, trigger icon sizing/coloring (04.06 prod state).

## Token map used

`--ink-highlight` (active text + underline — resolves to `--brand-primary` light / `--tertiary-400` dark) · `--ink-secondary` (default text) · `--ink-body` (hover text) · `--state-hover` (hover bg) · `--focus-ring` (focus ring) · `--card` (focus-ring gap colour) · `--opacity-disabled` (disabled opacity). All resolve correctly in both themes via existing semantic aliases. No new tokens introduced.
