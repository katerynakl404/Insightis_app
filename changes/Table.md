# Table — prod → expected

Baseline: [`../current/Table.md`](../current/Table.md).

| State / part | Current (prod) | Expected | Specification |
|---|---|---|---|
| Header text | `content-secondary` `#62748E` | `Text/Secondary` `#64748B` | hex shift only — [colors](colors.md) |
| Body text | `content-body` `#314158` | `Text/Body` `#334155` | hex shift only |
| Row border | `Stroke/Border` `#F0F5FA` | `--border` `#E2E8F0` (light) / `#2A2834` (dark) | hex shift only |
| Row hover | `State/Hover` `#F0F8FB` | `--state-hover` `#F1F5F9` (light) / `#21212C` (dark) | hex shift only |
| **Preview rendering** *(kit fix)* | only 2 rows rendered in the kit — read as "incomplete" | **expanded to 4 rows + 3 columns** demonstrating header/default/hover/selected combinations without stage clipping | Bug-fix to the kit only — no prod-code impact. |
| **Header sort icon** *(new)* | — did not exist | **new** — `.tbl th.s-sort{cursor:pointer;user-select:none}` + a 12-px inline-SVG `.sort-ic` glyph with three states: ↕ unsorted (`--ink-secondary`), ↑ ascending / ↓ descending (both `--ink`). Hover: header text → `--ink`. Focus: `box-shadow:inset 0 0 0 2px --focus-ring-brand;border-radius:2px` | Sort affordance visible at all times via the persistent ↕ glyph; active direction conveyed by **glyph shape + colour weight together**, not colour alone (WCAG 1.4.1). |
| **Row selected** *(new)* | — did not exist | **new** — `.tbl tr.is-selected td{background:var(--state-pressed)}`. Hover-while-selected: `.tbl tr.is-selected:hover td{background:color-mix(in srgb,var(--brand-primary) 10%,var(--state-pressed))}` | Reuses existing `--state-pressed` token (brand-50 light / grey-700 dark) — no new tokens. Hover layers a 10% brand tint on top of the pressed surface to keep both states distinguishable when combined. |
| **Row pressed (transient)** *(new)* | — did not exist | **new** — `.tbl tr:active td{background:var(--state-pressed)}` | Bg-shift-only press feedback matching the kit's universal "press = bg-shift" pattern ([colors](colors.md) "Usage pattern"). No transform, no shadow, no text-position shift. |

## No change (—)

Body text-sm, header text-xs, cell padding 12/16 px, wrapper radius `md`, wrapper border, `overflow-x-auto` behaviour, header text weight, row-border placement.

## Token map used

`--ink-secondary` (header default text + unsorted icon) · `--ink` (header active text + sorted icon) · `--ink-body` (cell body text) · `--border` (row border) · `--state-hover` (row hover bg) · `--state-pressed` (row selected + transient pressed bg) · `--brand-primary` (10% mix component for hover-while-selected) · `--focus-ring-brand` (sortable header focus ring). All resolve correctly in both themes via existing semantic aliases. No new tokens introduced.

## Accessibility & consistency self-check

```
Consistency: PASS — selected/pressed reuses --state-pressed (no new tokens); sort focus uses brand inset ring matching nav-style focus across the kit. No raw hex in any .tbl rule.
Accessibility:
  ✓ Body text vs row bg (default) — light #334155 / #FFFFFF = 12.63:1; dark #F4F4F5 / #17171E = 16.36:1 (target 4.5:1, 1.4.3)
  ✓ Body text vs row bg (hover) — light #334155 / #F1F5F9 = 11.78:1; dark #F4F4F5 / #21212C = 13.94:1
  ✓ Body text vs row bg (selected) — light #334155 / #E8F2F5 = 10.48:1; dark #F4F4F5 / #2A2834 = 11.96:1
  ✓ Body text vs hover-while-selected — light ≈ 10.0:1 (brand-tinted overlay barely shifts L); dark ≈ 11.6:1
  ✓ Sort icon active vs header bg — light #0F172A / #FFFFFF = 17.85:1; dark #F9FAFB / #17171E = 16.10:1 (target 3:1 UI, 1.4.11)
  ✓ Sort icon unsorted vs header bg — light #64748B / #FFFFFF = 4.61:1; dark #9CA3AF / #17171E = 8.18:1
  ✓ Focus visibility — sort header shows a 2-px brand inset ring on :focus-visible (2.4.7)
  ✓ Hit target — header cell ≥ 36×24 inclusive of 12/16 padding (2.5.8 desktop)
  ✓ Status not by colour alone — sort direction = glyph shape (↕/↑/↓); selected row = bg + checkbox/handle convention (if paired)
```
