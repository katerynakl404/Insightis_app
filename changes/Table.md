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
| **Shell** | `.mx-tbl` | `background:var(--card)` · `border:1px solid var(--border)` · `border-radius:.5rem` · `overflow:hidden`. Defines local `--mx-prov-indent:calc(1rem + 13px + .5rem)` — the shared left-alignment line (header pad 1rem + collapse chevron 13px + cell gap .5rem) for the provider logo, metric toggles, "Metric name" header, connector icon, and empty-state text. Inner `table.tbl`: `border-collapse:collapse;table-layout:fixed;width:100%`. First/last `thead` cells round to `.5rem` (top corners). `tbody tr:last-child td{border-bottom:none}` removes the last row's bottom border so it doesn't double with the shell border. `tbody tr{cursor:pointer;transition:background .1s}`. When a kebab is open, `.mx-tbl:has([data-kbp][aria-expanded="true"]){overflow:visible}` so the menu isn't clipped. |
| **Name-column header** | `th.mx-th-name` | `padding-left:var(--mx-prov-indent)` · `white-space:nowrap` · `overflow:visible` — sits in the toggle column, aligns to the indent line, overflows right over the empty name-column header. |
| **Provider group row** | `tr.mx-prov-group` | Full-width collapsed cell (`colspan` all). `cursor:pointer` (whole header is the collapse trigger). Cell: `td{padding:.625rem 1rem;background:var(--mx-group-band);border-bottom:1px solid var(--border)}` — `--mx-group-band` is `--slate-150` (light) / `--grey-700` (dark), deliberately distinct from `--state-hover` so a hovered metric row never looks identical to a static group header. Hover/active are pinned to the same band (`:hover td,:active td{background:var(--mx-group-band) !important}`) — the row does not react to pointer state. Inner cell wrapper `.mx-prov-group-cell{display:flex;align-items:center;gap:.5rem}` contains: collapse chevron (`.mx-prov-collapse-btn`), provider icon (`.mx-prov-ic`), group name (`.mx-prov-group-name`), hover-revealed "+ Add Metric" button (`.mx-add-metric-hover-btn`, `opacity:0→1` on `tr:hover` over `.15s`). Chevron rotates −90° when collapsed via `tr.mx-prov-group.is-collapsed .mx-prov-collapse-btn svg{transform:rotate(-90deg)}`. |
| **Collapse chevron** | `.mx-prov-collapse-btn` | `background:none;border:none;padding:0;cursor:pointer;color:var(--ink-secondary);flex:none;line-height:0;display:flex;align-items:center`. SVG (13×13px chevron `polyline points="6 9 12 15 18 9"`) animates `transition:transform .2s`. |
| **Provider icon** | `.mx-prov-ic` | `1.25rem × 1.25rem` · `border-radius:.25rem` · `display:inline-flex;align-items:center;justify-content:center;flex:none` · `background:var(--icon-wrapper-bg)` (5% brand tint over `--bg`) · `border:1px solid var(--border)`. NOT bare — it is the same bordered container as the provider-card icon (`#prov-card`). Child `img{width:65%;height:65%;object-fit:contain;display:block}`. Dark-mode override: `.dark .mx-prov-ic img[src*="github"]{filter:invert(1)}`. |
| **Group name** | `.mx-prov-group-name` | `font-size:.875rem` · `font-weight:600` · `color:var(--ink)` · `flex:1;min-width:0`. |
| **Metric child row** | `tr.mx-metric-child` | 6-cell row: toggle · name · alias · description · badge · actions. Inherits `cursor:pointer` from the shell. Cells: `td{padding:.4375rem 1rem;height:2.875rem;box-sizing:border-box}` — fixed 2.875rem row height so every row is identical regardless of content (cells use `vertical-align:middle`). First cell `td:first-child{padding-left:var(--mx-prov-indent)}` aligns the toggle to the shared indent line. Hover/selected/pressed follow canonical base `.tbl` rules (`--tbl-row-hover` / `--tbl-row-pressed`); `.mx-tbl` only adds `cursor:pointer`. |
| **Toggle cell** | `.swt` inside `.mx-swt-wrap` | `.mx-swt-wrap{display:inline-flex;align-items:center}`. Reuses kit `.swt` component. `is-on` class on the wrapper mirrors switch state for layout. When nested in a name cell: `.mx-tbl-name .mx-swt-wrap{display:inline-flex;vertical-align:middle;margin-right:.5rem}`. |
| **Name cell** | `.mx-tbl-name` | `font-weight:500` · `color:var(--ink-body)` · `vertical-align:middle` · `white-space:nowrap`. May contain inline `.badge` (`display:inline;vertical-align:middle`) or `.mx-tbl-sub` subtitle. Reusable on any kit table — not scoped to `.mx-tbl`. |
| **Alias cell** | `.mx-tbl-alias` | `font-size:.75rem` · `color:var(--ink-secondary)` · `width:9rem`. Plain text alias string (e.g. `@issues_created`). |
| **Description cell** | `.mx-tbl-desc` | `font-size:.75rem` · `color:var(--ink-secondary)` · `max-width:18rem` · `overflow:hidden;text-overflow:ellipsis;white-space:nowrap` · `vertical-align:middle` — single-line truncated. Reusable on any kit table. |
| **Badge cell** | `.mx-tbl-badge` | `vertical-align:middle;white-space:nowrap`. Inner `.badge-sm`. Custom metrics → `badge-primary` "Custom". Built-in metrics → `badge-secondary` "Built-in". |
| **Subtitle** | `.mx-tbl-sub` | `display:block;font-size:.75rem;color:var(--ink-secondary);font-weight:400;margin-top:.0625rem` (becomes inline inside `.mx-tbl-name`). |
| **Actions cell** | `.mx-tbl-actions` | `width:3rem` · `padding-right:.5rem` · `position:relative` · `text-align:right` · `vertical-align:middle` · `white-space:nowrap`. Icon buttons `.iconbtn{width:1.625rem;height:1.625rem;opacity:0;transition:opacity .12s;display:inline-flex;align-items:center;justify-content:center}` with `svg{width:13px;height:13px}` — hidden at rest, revealed on `tr:hover .mx-tbl-actions .iconbtn{opacity:1}`. On a hovered row: button `:hover{background:var(--state-pressed);color:var(--ink)}` and `:active{background:color-mix(in srgb,var(--brand-primary) 12%,transparent);color:var(--ink)}`. |
| **Kebab** | `[data-kbp]` + `.kbp-menu` | Kebab trigger always visible (`[data-kbp]{opacity:1}`). `[aria-expanded="true"]` shows `background:var(--state-pressed);color:var(--ink)`. Menu `.kbp-menu{position:absolute;top:calc(100% + 2px);right:0;left:auto;display:none;z-index:30}` shown via `[data-kbp][aria-expanded="true"] ~ .kbp-menu{display:block}`. Open row raises its actions cell: `tr:has([data-kbp][aria-expanded="true"]) .mx-tbl-actions{z-index:30}`. |
| **Delete button** | `.mx-del-btn` | `color:var(--fb-red-text);opacity:.6;transition:opacity .15s`; `:hover{opacity:1}`. For custom-metric delete actions. |
| **No-built-in row** | `tr.mx-no-builtin-row` | `cursor:default !important`; non-interactive (`:hover td,:active td{background:inherit !important}`). Cell `td{padding:.6rem 1rem;padding-left:var(--mx-prov-indent);border-bottom:1px solid var(--border);min-height:2.875rem}`. |

## Responsive — `.mx-tbl` at ≤767px (Expected-only)

The metrics molecule restructures to a card-stacked layout (the base `.tbl` is unaffected — only `.mx-tbl` reflows):

- Shell loses its card chrome: `.mx-tbl{background:transparent;border:none;border-radius:0;overflow:visible}`. `--mx-prov-indent` keeps its desktop value.
- The table becomes a flex column: `.mx-tbl .tbl,.mx-tbl .tbl tbody{display:flex;flex-direction:column;gap:0}`; `thead{display:none}`.
- Provider group rows become full-width band blocks (`background:var(--mx-group-band)`, `td{display:block;border:none;background:transparent;padding:.625rem 1rem}`).
- Metric child rows become a CSS grid: `td{display:block;padding:0;border:none;height:auto}` re-flowed into rows — toggle (`nth-child(1)` row 1 / col 1), name (`nth-child(2)` row 1, `font-size:.875rem;font-weight:600;color:var(--ink);line-height:1.25rem`), alias (`nth-child(3)` row 2, `font-size:.75rem;color:var(--ink-tertiary);font-family:ui-monospace,monospace`), description (`nth-child(4)` row 3, full width, `max-width:none;font-size:.8125rem;color:var(--ink-secondary);line-height:1.55;white-space:normal`), badge (`nth-child(5)` row 1 col 3), actions (`nth-child(6)` row 1 col 4). Row hover/active/selected move to the `tr` itself: `:hover{background:var(--tbl-row-hover)}`, `:active{background:var(--tbl-row-pressed)}` (not when a button is active), `.is-selected{background:var(--tbl-row-pressed)}` — the `td`-level base rules are zeroed to `transparent`.
- Action icon buttons and "+ Add Metric" become always-visible (`opacity:1`); the "+ Add Metric" label text is hidden (`.mx-add-metric-label{display:none}`), the button is `1.75rem` square.

## `.mx-tbl-sections` variant — desktop section cards (Expected-only, opt-in)

Opt-in by adding `.mx-tbl-sections` to the `.mx-tbl` wrapper (Metrics filled state). Desktop only (≥768px); at ≤767px the responsive recipe above takes over. Shell goes transparent/borderless; `table.tbl{border-collapse:separate;border-spacing:0}`, `thead{display:none}`. Metric/sub/empty cells get `background:var(--card)`; left+right `1px var(--border)` borders; the last/section-terminating row of each group gets a bottom border and rounds its first/last `td` corners to `.5rem`. A `tr.mx-section-gap > td{height:1rem;padding:0;border:none;background:transparent}` provides inter-section spacing (collapses to `0` when the next group is hidden).

## No change (—)

Body text-sm, header text-xs, cell padding 12/16 px, wrapper radius `md`, wrapper border, `overflow-x-auto` behaviour, header text weight, row-border placement.

## Token map used

`--ink-secondary` (header text · alias/desc/sub cells · chevron) · `--ink-body` (cell body text · name cell) · `--ink` (group name · open-kebab text) · `--ink-tertiary` (responsive alias) · `--border` (row + shell border) · `--tbl-row-hover` (row hover bg — canonical for all kit tables) · `--tbl-row-pressed` (row selected + transient pressed bg — canonical for all kit tables) · `--brand-primary` (10% mix for hover-while-selected; 12% mix for actions `:active`) · `--mx-group-band` (provider-group band fill — `--slate-150` light / `--grey-700` dark) · `--icon-wrapper-bg` (`.mx-prov-ic` background — 5% brand tint over `--bg`) · `--card` (`.mx-tbl` shell + section-card surfaces) · `--state-pressed` (actions-button hover · open-kebab bg) · `--fb-red-text` (`.mx-del-btn`). Layout token: `--mx-prov-indent` = `calc(1rem + 13px + .5rem)`.

### Token definitions

| Token | Light | Dark | Prod |
|---|---|---|---|
| `--tbl-row-hover` | `--slate-50` `#F8FAFC` | `--state-hover` (grey-800) | `--state-hover` (teal-tinted) |
| `--tbl-row-pressed` | `--slate-100` `#F1F5F9` | `--grey-800` | `--state-pressed` |

Both tokens are defined in `:root` (light default), `.dark`, and `.prod` scopes in `pages/kit-theme.css`. Use `var(--tbl-row-hover)` and `var(--tbl-row-pressed)` on any new table — do not reach for `--state-hover`/`--state-pressed` in table row contexts.
