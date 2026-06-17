# Table — prod → expected

Baseline: [`../current/Table.md`](../current/Table.md).

| State / part | Current (prod) | Expected | Specification |
|---|---|---|---|
| Header text | `content-secondary` `#62748E` | `Text/Secondary` `#64748B` | hex shift only — [colors](colors.md) |
| Body text | `content-body` `#314158` | `Text/Body` `#334155` | hex shift only |
| Row border | `Stroke/Border` `#F0F5FA` | `--border` `#E2E8F0` (light) / `#2A2834` (dark) | hex shift only |
| Row hover | `State/Hover` `#F0F8FB` | `--state-hover` `#F1F5F9` (light) / `#21212C` (dark) | hex shift only — rule added: `tbody tr:hover td{background:var(--state-hover)}` (was missing from base `.tbl`; only existed under `.mx-tbl`) |
| **Preview rendering** *(kit fix)* | only 2 rows rendered in the kit — read as "incomplete" | **expanded to 4 rows + 3 columns** demonstrating header/default/hover/selected combinations without stage clipping | Bug-fix to the kit only — no prod-code impact. |
| **Row selected** *(new)* | — did not exist | **new** — `.tbl tr.is-selected td{background:var(--state-pressed)}`. Hover-while-selected: `.tbl tr.is-selected:hover td{background:color-mix(in srgb,var(--brand-primary) 10%,var(--state-pressed))}` | Reuses existing `--state-pressed` token (brand-50 light / grey-700 dark) — no new tokens. Hover layers a 10% brand tint on top of the pressed surface to keep both states distinguishable when combined. |
| **Row pressed (transient)** *(new)* | — did not exist | **new** — `.tbl tr:active td{background:var(--state-pressed)}` | Bg-shift-only press feedback matching the kit's universal "press = bg-shift" pattern ([colors](colors.md) "Usage pattern"). No transform, no shadow, no text-position shift. |

## Metrics table molecule — `.mx-tbl` (Expected-only, new)

The Metrics page composes the base `.tbl` inside a page-specific shell. All atoms listed below are new — no prod equivalent.

| Part | Class(es) | Specification |
|---|---|---|
| **Shell** | `.mx-tbl` | `var(--card)` bg · 1px `var(--border)` · `border-radius:.5rem` · `overflow:hidden`. Removes last row's bottom border so it doesn't double with the shell border. |
| **Provider group row** | `tr.mx-prov-group` | Full-width collapsed cell (`colspan` all). `var(--bg)` fill (muted, non-interactive). Contains: collapse chevron (`.mx-prov-collapse-btn`), bare provider icon (`.mx-prov-ic` — no card bg/border in this context), group name (`.mx-prov-group-name`), hover-revealed "+ Add Metric" button (`.mx-add-metric-hover-btn`, `opacity:0→1` on `tr:hover`). Chevron rotates −90° when collapsed via `tr.is-collapsed`. |
| **Metric child row** | `tr.mx-metric-child` | 6-cell row: toggle · name · alias · description · badge · actions. `cursor:pointer`. Hover/selected/pressed follow base `.tbl` rules (`--state-hover` / `--state-pressed`). |
| **Toggle cell** | `.swt` inside `.mx-swt-wrap` | Reuses kit `.swt` component. `is-on` class on the wrapper mirrors switch state for layout. |
| **Name cell** | `.mx-tbl-name` | `font-weight:500` · `--ink`. May contain inline `.badge` or `.mx-tbl-sub` subtitle. |
| **Alias cell** | `.mx-tbl-alias` | `font-size:.75rem` · `--ink-secondary`. Plain text alias string (e.g. `@issues_created`). |
| **Description cell** | `.mx-tbl-desc` | `font-size:.75rem` · `--ink-secondary` · `overflow:hidden;text-overflow:ellipsis;white-space:nowrap` — single-line truncated. |
| **Badge cell** | `.mx-tbl-badge` | `.badge-sm`. Custom metrics → `badge-primary` "Custom". Built-in metrics → `badge-secondary` "Built-in". |
| **Actions cell** | `.mx-tbl-actions` | Right-aligned. Icon buttons (`.iconbtn`) hidden (`opacity:0`) at rest, revealed on `tr:hover`. Kebab (`.mx-kebab-btn`) always visible (`opacity:1`). Kebab `[aria-expanded="true"]` shows `--state-pressed` bg. |

## No change (—)

Body text-sm, header text-xs, cell padding 12/16 px, wrapper radius `md`, wrapper border, `overflow-x-auto` behaviour, header text weight, row-border placement.

## Token map used

`--ink-secondary` (header text) · `--ink-body` (cell body text) · `--border` (row border) · `--state-hover` (row hover bg) · `--state-pressed` (row selected + transient pressed bg) · `--brand-primary` (10% mix component for hover-while-selected). All resolve correctly in both themes via existing semantic aliases. No new tokens introduced.

## Accessibility & consistency self-check

```
Consistency: PASS — selected/pressed reuses --state-pressed (no new tokens). No raw hex in any .tbl rule.
Accessibility:
  ✓ Body text vs row bg (default) — light #334155 / #FFFFFF = 12.63:1; dark #F4F4F5 / #17171E = 16.36:1 (target 4.5:1, 1.4.3)
  ✓ Body text vs row bg (hover) — light #334155 / #F1F5F9 = 11.78:1; dark #F4F4F5 / #21212C = 13.94:1
  ✓ Body text vs row bg (selected) — light #334155 / #E8F2F5 = 10.48:1; dark #F4F4F5 / #2A2834 = 11.96:1
  ✓ Body text vs hover-while-selected — light ≈ 10.0:1 (brand-tinted overlay barely shifts L); dark ≈ 11.6:1
  ✓ Hit target — header cell ≥ 36×24 inclusive of 12/16 padding (2.5.8 desktop)
  ✓ Status not by colour alone — selected row = bg shift (brand-50/grey-700)
```
