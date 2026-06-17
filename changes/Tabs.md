# Tabs — prod → expected

Baseline: [`../current/Tabs.md`](../current/Tabs.md).

| State | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Active | full-width 2 px `border-bottom` + text `accent` `#07827F` | — | button-width 2 px underline via `::after` (`left:0;right:0`) + text `--ink-highlight`; tabset gap `.5rem` | `--ink-highlight` = `--brand-primary` in light, `--tertiary-400` (#2EBEC4) in dark — same vivid-cyan recipe as `.link`. Underline spans full button width; gap between tabs gives text-width appearance without left-edge indent. |
| Default (inactive) | text `content-secondary` `#62748E` | — | `--ink-secondary` `#64748B` | hex shift only |
| Hover | bg `State/Hover` `#F0F8FB` + text `content-body` | — | `--state-hover` `#F1F5F9` (light) / `#21212C` (dark), text `--ink-body` | hex shift only |
| **Focus** *(new)* | ⚠ undefined in prod (relied on user-agent default) | — | `box-shadow:0 0 0 2px Surface/Card, 0 0 0 4px --focus-ring-brand` | Brand-tinted ring (tabs are nav, not form). Matches `.sbx-nav-item` and `.link` focus rings already in the kit. WCAG 2.4.7. |
| **Disabled** *(new — recipe change)* | `disabled:opacity-50` (hardcoded 50%) | — | `opacity:var(--opacity-disabled)` (.65) + `pointer-events:none` + `cursor:not-allowed` | Unifies disabled treatment with Button / IconButton / Switch / Checkbox. No colour override — fade-from-base only. |

## No change (—)

Item padding 8/12 px, text-sm, active underline height 2 px, underline border-radius 1 px, trigger icon sizing/coloring (04.06 prod state).

## Token map used

`--ink-highlight` (active text + underline — resolves to `--brand-primary` light / `--tertiary-400` dark) · `--ink-secondary` (default text) · `--ink-body` (hover text) · `--state-hover` (hover bg) · `--focus-ring-brand` (focus ring) · `--card` (focus-ring gap colour) · `--opacity-disabled` (disabled opacity). All resolve correctly in both themes via existing semantic aliases. No new tokens introduced.
