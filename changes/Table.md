# Table — prod → expected

Baseline: [`../current/Table.md`](../current/Table.md).

| State / part | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Header text | `content-secondary` `#62748E` | — | `Text/Secondary` `#64748B` | hex shift only — [colors](colors.md) |
| Body text | `content-body` `#314158` | — | `Text/Body` `#334155` | hex shift only |
| Row border | `Stroke/Border` `#F0F5FA` | — | `--border` `#E2E8F0` (light) / `#2A2834` (dark) | hex shift only |
| Row hover | `State/Hover` `#F0F8FB` | — | `--tbl-row-hover` `#F8FAFC` (light) / `--state-hover` (dark) | Light: softer slate-50 (lighter than slate-100). Rule: `tbody tr:hover td{background:var(--tbl-row-hover)}`. Token is shared with all kit tables — reuse, don't reinvent. |
| Row selected | — did not exist | — | **new** — `tr.is-selected td{background:var(--tbl-row-pressed)}`. Hover-while-selected: `tr.is-selected:hover td{background:color-mix(in srgb,var(--brand-primary) 10%,var(--tbl-row-pressed))}` | Neutral (not brand-tinted): `--tbl-row-pressed` = slate-100 light / grey-800 dark. Hover layers 10% brand tint to keep states distinguishable. |
| Row pressed (transient) | — did not exist | — | **new** — `tr:active td{background:var(--tbl-row-pressed)}` | Bg-shift-only press feedback. Same token as selected state so the two collapse visually — transient press is indistinguishable from selection, which is intentional (they share the same surface). |
| **Preview rendering** *(kit fix)* | only 2 rows rendered in the kit — read as "incomplete" | — | **expanded to 4 rows + 3 columns** demonstrating header/default/hover/selected combinations | Bug-fix to the kit only — no prod-code impact. |

## Metrics table molecule — `.mx-tbl` (Expected-only, new)

The Metrics page composes the base `.tbl` inside a page-specific shell. All atoms listed below are new — no prod equivalent.

| Part | Class(es) | Specification |
|---|---|---|
| **Shell** | `.mx-tbl` | `var(--card)` bg · 1px `var(--border)` · `border-radius:.5rem` · `overflow:hidden`. Removes last row's bottom border so it doesn't double with the shell border. |
| **Provider group row** | `tr.mx-prov-group` | Full-width collapsed cell (`colspan` all). `var(--bg)` fill (muted, non-interactive). Contains: collapse chevron (`.mx-prov-collapse-btn`), bare provider icon (`.mx-prov-ic` — no card bg/border in this context), group name (`.mx-prov-group-name`), hover-revealed "+ Add Metric" button (`.mx-add-metric-hover-btn`, `opacity:0→1` on `tr:hover`). Chevron rotates −90° when collapsed via `tr.is-collapsed`. |
| **Metric child row** | `tr.mx-metric-child` | 6-cell row: toggle · name · alias · description · badge · actions. `cursor:pointer`. Hover/selected/pressed follow canonical base `.tbl` rules (`--tbl-row-hover` / `--tbl-row-pressed`). |
| **Toggle cell** | `.swt` inside `.mx-swt-wrap` | Reuses kit `.swt` component. `is-on` class on the wrapper mirrors switch state for layout. |
| **Name cell** | `.mx-tbl-name` | `font-weight:500` · `--ink-body`. May contain inline `.badge` or `.mx-tbl-sub` subtitle. Reusable on any kit table — not scoped to `.mx-tbl`. |
| **Alias cell** | `.mx-tbl-alias` | `font-size:.75rem` · `--ink-secondary`. Plain text alias string (e.g. `@issues_created`). |
| **Description cell** | `.mx-tbl-desc` | `font-size:.75rem` · `--ink-secondary` · `overflow:hidden;text-overflow:ellipsis;white-space:nowrap` — single-line truncated. Reusable on any kit table. |
| **Badge cell** | `.mx-tbl-badge` | `.badge-sm`. Custom metrics → `badge-primary` "Custom". Built-in metrics → `badge-secondary` "Built-in". |
| **Actions cell** | `.mx-tbl-actions` | Right-aligned. Icon buttons (`.iconbtn`) hidden (`opacity:0`) at rest, revealed on `tr:hover`. Kebab (`.mx-kebab-btn`) always visible (`opacity:1`). Kebab `[aria-expanded="true"]` shows `--state-pressed` bg. |

## No change (—)

Body text-sm, header text-xs, cell padding 12/16 px, wrapper radius `md`, wrapper border, `overflow-x-auto` behaviour, header text weight, row-border placement.

## Token map used

`--ink-secondary` (header text) · `--ink-body` (cell body text) · `--border` (row border) · `--tbl-row-hover` (row hover bg — canonical for all kit tables) · `--tbl-row-pressed` (row selected + transient pressed bg — canonical for all kit tables) · `--brand-primary` (10% mix component for hover-while-selected).

### Token definitions

| Token | Light | Dark | Prod |
|---|---|---|---|
| `--tbl-row-hover` | `--slate-50` `#F8FAFC` | `--state-hover` (grey-800) | `--state-hover` (teal-tinted) |
| `--tbl-row-pressed` | `--slate-100` `#F1F5F9` | `--grey-800` | `--state-pressed` |

Both tokens are defined in `:root` (light default), `.dark`, and `.prod` scopes in `pages/kit-theme.css`. Use `var(--tbl-row-hover)` and `var(--tbl-row-pressed)` on any new table — do not reach for `--state-hover`/`--state-pressed` in table row contexts.
