# Table — prod → expected

Baseline: [`../current/Table.md`](../current/Table.md).

| State / part | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Header text | `content-secondary` `#62748E` | — | `Text/Secondary` `#64748B` | hex shift only — [colors](colors.md) |
| Header fill | — | — | **none** — `th` carries no background | Kit convention across **all** tables (Files · Connections · Metrics): the header is plain (bottom border + `Text/Secondary` label only), never a filled band. Files' page-local `thead th{background:var(--card2)}` tint was removed 2026-07-09 for consistency. |
| Body text | `content-body` `#314158` | — | `Text/Body` `#334155` | hex shift only |
| Row border | `Stroke/Border` `#F0F5FA` | — | `--border` `#E2E8F0` (light) / `#2A2834` (dark) | hex shift only |
| Row hover | `State/Hover` `#F0F8FB` | — | `--tbl-row-hover` — the smallest step on the overlay ladder (`--tint-3`) | Hover is a **smaller step off the row than selected → less contrast than the selected/pressed state**, the same ladder in both themes. Rule: `tbody tr:hover td{background:var(--tbl-row-hover)}`. Token is shared with all kit tables — reuse, don't reinvent. |
| Row selected | — did not exist | — | **new** — `tr.is-selected td{background:var(--tbl-row-pressed)}` | `--tbl-row-pressed` — the `--tint-6` step of the state ladder (brand-tinted on light, neutral on dark). Same strength as a control's hover, so a control on a selected row stacks a visible step above it instead of matching it. |
| Hover while selected | — did not exist | — | **no separate surface** — `table.tbl tbody tr.is-selected td` outranks the hover rule | The selected overlay with the hover step stacked in (`--tint-12`), written as one value: blending two *translucent* tokens 50/50 would land lighter than selected alone. A distinct third surface (≠ plain hover, ≠ plain selected). `.is-selected.s-hover` mirrors it for storybook. |
| Row pressed (transient) | — did not exist | — | **new** — `tr:active td{background:var(--tbl-row-pressed)}` | Bg-shift-only press feedback. Same token as selected state so the two collapse visually — transient press is indistinguishable from selection, which is intentional (they share the same surface). `.s-pressed` mirrors it for storybook. |
| Badge in a row | badge had no border → vanished when a Secondary badge sat on a selected/hover row (fill == `--card2` == row bg) | — | **no table-specific rule** — the kit Badge is bordered by default (`--badge-border`), so every badge stays defined in every row state | The hairline is tinted from the badge's own text colour and belongs to the Badge, not the table: same markup, same rendering in a row, a card or a page. See [Badge](Badge.md) → *Border variations*. |
| **Preview rendering** *(kit fix)* | only 2 rows rendered in the kit — read as "incomplete" | — | **expanded to 4 rows + 3 columns**; States table now covers header, default, hover, selected, hover-while-selected, pressed, and badge-in-row | Bug-fix to the kit only — no prod-code impact. |

## Row state resolution — developer handoff

Every row state is a **translucent overlay**, so states composite instead of replacing each other: a control inside a row always lands one step deeper than the row it sits on. Strength comes from the shared `--tint-N` scale; the hue is per theme (`--brand-primary` on light, `--ink-primary` on dark) and is already baked into the token — consumers only ever write `var(--token)`.

| # | State | Selector (exactly as shipped) | Token | Overlay |
|---|---|---|---|---|
| 1 | Rest | `table.tbl tbody tr td` | — | transparent |
| 2 | Hover | `table.tbl tbody tr:hover td` | `--tbl-row-hover` | `--tint-4` |
| 3 | Pressed (transient) | `table.tbl tbody tr:active td`, guarded — see below | `--tbl-row-pressed` | `--tint-8` |
| 4 | Selected | `table.tbl tbody tr.is-selected td` | `--tbl-row-pressed` | `--tint-8` |
| 5 | Selected + hover | — no rule of its own | stays at #4 | `--tint-8` |
| 6 | Selected + pressed | — no rule of its own | stays at #4 | `--tint-8` |
| 7 | Control hover inside any row | `.iconbtn:hover` etc. | `--state-hover` | `--tint-8` **on top of** the row's own overlay |
| 8 | Control pressed inside any row | `.iconbtn:active` etc. | `--state-pressed` | `--tint-12` **on top of** the row's own overlay — and the row itself stays at step 2, not step 3 |

Storybook mirrors (`.s-hover` / `.s-pressed` / `.is-selected`) sit on the same rules so a static demo renders exactly what a real pointer produces.

### Precedence — the part that bites

A row is **always hovered while it is pressed**, so #2 and #3 match at the same time and specificity decides. `table.tbl tbody tr:hover td` scores (0,2,4); writing the press rule as `table.tbl tr:active td` scores (0,2,3) — one element short — so **hover won and the pressed state was unreachable** (the storybook's `.s-pressed` demo still looked right, because that selector did carry `tbody`, which is why the gap survived review). The press rule must carry `tbody` too: equal specificity, later in the file, press wins. Fixed 2026-09-19.

#6 is deliberate, not the same bug: `tr.is-selected:hover td` (0,3,3) outranks the press rule by a class, so pressing an already-selected row gives no extra feedback — selection and press share one surface by design (see the *Row pressed (transient)* row above).

**Rule of thumb for any new row state:** match the element count of the rules you need to beat (`table.tbl tbody tr … td`), and rely on source order rather than adding classes. Never re-declare these colours per page — the tokens already resolve per theme.

## Shared table cell atoms (kit — lifted from pages 2026-07-09)

Reusable table pieces that were page-local now live in `kit-theme.css`. Any table can reuse them; they carry no prod equivalent.

| Atom | Class(es) | Specification |
|---|---|---|
| **File-type icon** | `.dsf-file-ic` + `.type-*` | Coloured rounded square with an uppercase extension label. `width/height:2rem` · `border-radius:.375rem` · `font-size:.5625rem;font-weight:700` · `letter-spacing:var(--tracking-label);text-transform:uppercase` · `color:var(--content-on-solid)` · `background:var(--mark-bg,var(--brand-tertiary))`. Colour flows through `--mark-bg`, set by the type modifier — the single source of the type→colour map: `.type-csv` → `--brand-tertiary`, `.type-xls`/`.type-xlsx` → `--fb-green`. Add a new file type by adding one `.type-x{--mark-bg:…}` line. |
| **Sortable header button** | `.dsft-sortbtn` inside `th[aria-sort]` | Table-agnostic sort trigger that inherits the `th` text styling (`background:transparent;border:none;padding:0;font:inherit;color:inherit;cursor:pointer;display:inline-flex;gap:.25rem`). The 12×12 chevron `svg` sits at `opacity:.5`, lifts to `1` on hover and when the `th` is sorted; `th[aria-sort="ascending"]` rotates it `180°`, `descending` leaves it pointing down. Focus: `:focus-visible` → `--shadow-focus-inset` + `.25rem` radius. Sort direction/behaviour is page JS; this is the visual only. |
| **Compact static table** | `.acct-usage-table` | Read-only compact data table (account "Usage" breakdown, used by `user_profile-modal` + `balance-versions`). Same `th`/`td` recipe as `table.tbl` (`th`: `--text-12`/500/`--ink-secondary`/bottom-border; `td`: `--ink-body`/bottom-border; `border-collapse:collapse`; `tr:last-child td` drops the border) but tighter padding (`th .375rem .5rem`, `td .5rem .5rem`) and **no** interaction states. Was duplicated verbatim in both pages' `<style>` — moved to the kit unchanged (zero visual delta). |

## Metrics table molecule — `.mx-tbl` (Expected-only, new)

The Metrics page composes the base `.tbl` inside a page-specific shell. All atoms listed below are new — no prod equivalent.

| Part | Class(es) | Specification |
|---|---|---|
| **Shell** | `.mx-tbl` | `background:var(--card)` · `border:1px solid var(--border)` · `border-radius:.5rem` · `overflow:hidden`. Defines local `--mx-prov-indent:calc(1rem + 12px + .5rem)` — the shared left-alignment line (header pad 1rem + collapse chevron 12px + cell gap .5rem) for the provider logo, metric toggles, "Metric name" header, connector icon, and empty-state text. Inner `table.tbl`: `border-collapse:collapse;table-layout:fixed;width:100%`. First/last `thead` cells round to `.5rem` (top corners). `tbody tr:last-child td{border-bottom:none}` removes the last row's bottom border so it doesn't double with the shell border. `tbody tr{cursor:pointer;transition:background .1s}`. When a kebab is open, `.mx-tbl:has([data-kbp][aria-expanded="true"]){overflow:visible}` so the menu isn't clipped. |
| **Name-column header** | `th.mx-th-name` | `padding-left:var(--mx-prov-indent)` · `white-space:nowrap` · `overflow:visible` — sits in the toggle column, aligns to the indent line, overflows right over the empty name-column header. |
| **Provider group row** | `tr.mx-prov-group` | Full-width collapsed cell (`colspan` all). `cursor:pointer` (whole header is the collapse trigger). Cell: `td{padding:.625rem 1rem;background:var(--mx-group-band);border-bottom:1px solid var(--border)}` — `--mx-group-band` is `--slate-150` (light) / `--grey-700` (dark), deliberately distinct from `--state-hover` so a hovered metric row never looks identical to a static group header. Hover/active are pinned to the same band (`:hover td,:active td{background:var(--mx-group-band) !important}`) — the row does not react to pointer state. Inner cell wrapper `.mx-prov-group-cell{display:flex;align-items:center;gap:.5rem}` contains: collapse chevron (`.mx-prov-collapse-btn`), provider icon (`.mx-prov-ic`), group name (`.mx-prov-group-name`), hover-revealed "+ Add Metric" button (`.mx-add-metric-hover-btn`, `opacity:0→1` on `tr:hover` over `.15s`). Chevron rotates −90° when collapsed via `tr.mx-prov-group.is-collapsed .mx-prov-collapse-btn svg{transform:rotate(-90deg)}`. |
| **Collapse chevron** | `.mx-prov-collapse-btn` | `background:none;border:none;padding:0;cursor:pointer;color:var(--ink-secondary);flex:none;line-height:0;display:flex;align-items:center`. SVG (12×12px chevron `polyline points="6 9 12 15 18 9"`) animates `transition:transform .2s`. |
| **Provider icon** | `.mx-prov-ic` | `1.25rem × 1.25rem` · `border-radius:.25rem` · `display:inline-flex;align-items:center;justify-content:center;flex:none` · `background:var(--icon-wrapper-bg)` (5% brand tint over `--bg`) · `border:1px solid var(--border)`. NOT bare — it is the same bordered container as the provider-card icon (`#prov-card`). Child `img{width:65%;height:65%;object-fit:contain;display:block}`. Dark-mode override: `.dark .mx-prov-ic img[src*="github"]{filter:invert(1)}`. |
| **Group name** | `.mx-prov-group-name` | `font-size:.875rem` · `font-weight:600` · `color:var(--ink)` · `flex:1;min-width:0`. |
| **Metric child row** | `tr.mx-metric-child` | 6-cell row: toggle · name · alias · description · badge · actions. Inherits `cursor:pointer` from the shell. Cells: `td{padding:.4375rem 1rem;height:2.875rem;box-sizing:border-box}` — fixed 2.875rem row height so every row is identical regardless of content (cells use `vertical-align:middle`). First cell `td:first-child{padding-left:var(--mx-prov-indent)}` aligns the toggle to the shared indent line. Hover/selected/pressed follow canonical base `.tbl` rules (`--tbl-row-hover` / `--tbl-row-pressed`); `.mx-tbl` only adds `cursor:pointer`. |
| **Toggle cell** | `.swt` inside `.mx-swt-wrap` | `.mx-swt-wrap{display:inline-flex;align-items:center}`. Reuses kit `.swt` component. `is-on` class on the wrapper mirrors switch state for layout. When nested in a name cell: `.mx-tbl-name .mx-swt-wrap{display:inline-flex;vertical-align:middle;margin-right:.5rem}`. |
| **Name cell** | `.mx-tbl-name` | `font-weight:500` · `color:var(--ink-body)` · `vertical-align:middle` · `white-space:nowrap`. May contain inline `.badge` (`display:inline;vertical-align:middle`) or `.mx-tbl-sub` subtitle. Reusable on any kit table — not scoped to `.mx-tbl`. |
| **Alias cell** | `.mx-tbl-alias` | `font-size:.75rem` · `color:var(--ink-secondary)` · `width:9rem`. Plain text alias string (e.g. `@issues_created`). |
| **Description cell** | `.mx-tbl-desc` | `font-size:.75rem` · `color:var(--ink-secondary)` · `max-width:18rem` · `overflow:hidden;text-overflow:ellipsis;white-space:nowrap` · `vertical-align:middle` — single-line truncated. Reusable on any kit table. |
| **Badge cell** | `.mx-tbl-badge` | `vertical-align:middle;white-space:nowrap`. Inner `.badge-sm`. Custom metrics → `badge-primary` "Custom". Built-in metrics → `badge-secondary` "Built-in". |
| **Subtitle** | `.mx-tbl-sub` | `display:block;font-size:.75rem;color:var(--ink-secondary);font-weight:400;margin-top:.0625rem` (becomes inline inside `.mx-tbl-name`). |
| **Actions cell** | `.mx-tbl-actions` | `width:3rem` · `padding-right:.5rem` · `position:relative` · `text-align:right` · `vertical-align:middle` · `white-space:nowrap`. Icon buttons `.iconbtn{width:1.5rem;height:1.5rem;opacity:0;transition:opacity var(--motion-fast);display:inline-flex;align-items:center;justify-content:center}` with `svg{width:14px;height:14px}` — hidden at rest, revealed on `tr:hover .mx-tbl-actions .iconbtn{opacity:1}`. On a hovered row: button `:hover{background:var(--state-pressed);color:var(--ink)}` and `:active{background:color-mix(in srgb,var(--brand-primary) 12%,transparent);color:var(--ink)}`. |
| **Kebab** | `[data-kbp]` + `.kbp-menu` | Kebab trigger always visible (`[data-kbp]{opacity:1}`). `[aria-expanded="true"]` shows `background:var(--state-pressed);color:var(--ink)`. Menu `.kbp-menu{position:absolute;top:calc(100% + 2px);right:0;left:auto;display:none;z-index:30}` shown via `[data-kbp][aria-expanded="true"] ~ .kbp-menu{display:block}`. Open row raises its actions cell: `tr:has([data-kbp][aria-expanded="true"]) .mx-tbl-actions{z-index:30}`. |
| **Delete button** | `.mx-del-btn` | `color:var(--fb-red-text);opacity:.6;transition:opacity .15s`; `:hover{opacity:1}`. For custom-metric delete actions. |
| **Connector sub-row** | `tr.mx-conn-sub-row` + `.mx-conn-sub-label` + `.mx-conn-sub-label-text` | Per-connector sub-header grouping the custom metrics that arrive through one connector (e.g. "Skyvia Jira"). Row is non-interactive: `cursor:default !important`, `:hover td,:active td{background:inherit !important}`. Cell `td{padding:.25rem 1rem;padding-left:var(--mx-prov-indent);height:2.875rem;box-sizing:border-box;vertical-align:middle;border-bottom:1px solid var(--border)}` — same height + indent line as a metric row. Label `.mx-conn-sub-label{font-size:.8125rem;font-weight:600;color:var(--ink-secondary);display:flex;align-items:center;gap:.375rem;width:100%}`; leading link icon (direct child only) `.mx-conn-sub-label > svg{width:12px;height:12px;opacity:.55;flex:none}`; text `.mx-conn-sub-label-text{flex:1;min-width:0}` (ellipsis-truncates). May carry the hover-revealed `.mx-add-metric-hover-btn` (same as the group row). |
| **No-built-in row** | `tr.mx-no-builtin-row` + `.mx-no-builtin-msg` | Empty state shown when a connected provider has no built-in metrics. Row `cursor:default !important`; non-interactive (`:hover td,:active td{background:inherit !important}`). Cell `td{padding:.625rem 1rem;padding-left:var(--mx-prov-indent);border-bottom:1px solid var(--border);min-height:2.875rem}`. Message `.mx-no-builtin-msg{display:flex;align-items:center;gap:.5rem;font-size:.75rem;color:var(--ink-secondary)}`; info icon `svg{color:var(--ink-secondary);opacity:.6;flex:none}` (14×14 set inline); the "Create a custom metric →" trigger reuses the kit `.link` component (`--ink-highlight`) — no bespoke link rule. |
| **Section gap** | `tr.mx-section-gap` | Inter-group spacer. Hidden by default (`display:none`); only the `.mx-tbl-sections` desktop variant shows it as `td{height:1rem;padding:0;border:none;background:transparent}` (collapses to 0 when the next group is hidden). |
| **Collapse state** | `tr.mx-prov-group.is-collapsed` | Clicking a provider group toggles `.is-collapsed` (JS `mxToggleGroup`); the chevron rotates via `.mx-prov-group.is-collapsed .mx-prov-collapse-btn svg{transform:rotate(-90deg)}`, and the group's child rows are hidden. As a standalone collapsed card (`.mx-tbl-sections`) it also rounds its own bottom corners + closes the bottom border. |

## Responsive — `.mx-tbl` at ≤767px (Expected-only)

Both the base `.tbl` and the `.mx-tbl` molecule reflow to a stacked card layout (`thead{display:none}`), so phones never scroll a table sideways.

**Base tables** (`.dsf-tbl` Files, `.ds-conn-tbl` Connections): each row becomes a `.card-stack-item`-style card — `--card` bg, 1px `--border`, `--card-stack-radius`, rest shadow. Secondary columns stack under the name; row hover/press/selected move from the `td` to the `tr` (`--tbl-row-hover` / `--tbl-row-pressed`), with the `td`-level base rules zeroed to `transparent`.

**Metrics molecule** (`.mx-tbl`): each provider group becomes one card:
- Provider group row = the card top: `--mx-group-band` strip, rounded top, `margin-top:1rem` gap between cards (`:first-child{margin-top:0}`).
- Metric child rows = stitched one-line rows inside the card (`background:var(--card)`, left/right `--border`, hairline divider between; last row rounds the bottom). Grid `grid-template-columns:auto 1fr auto auto` re-flows the 6 cells to a **single line: toggle · name · badge · kebab**. Alias (`nth-child(3)`) and description (`nth-child(4)`) are **`display:none`** on mobile to keep each row single-line. Row hover/active/selected move to the `tr` (`--tbl-row-hover` / `--tbl-row-pressed`); `td`-level base rules zeroed to `transparent`.
- Toggle, kebab (2.25rem / 16px) and "+ Add Metric" are always visible (`opacity:1`); the "+ Add Metric" label is hidden (`.mx-add-metric-label{display:none}`) so the button collapses to a 1.75rem icon.

Storybook `#table` carries a static ≤767px illustration of the metrics card (viewport-driven live).

## `.mx-tbl-sections` variant — desktop section cards (Expected-only, opt-in)

Opt-in by adding `.mx-tbl-sections` to the `.mx-tbl` wrapper (Metrics filled state). Desktop only (≥768px); at ≤767px the responsive recipe above takes over. Shell goes transparent/borderless; `table.tbl{border-collapse:separate;border-spacing:0}`, `thead{display:none}`. Metric/sub/empty cells get `background:var(--card)`; left+right `1px var(--border)` borders; the last/section-terminating row of each group gets a bottom border and rounds its first/last `td` corners to `.5rem`. A `tr.mx-section-gap > td{height:1rem;padding:0;border:none;background:transparent}` provides inter-section spacing (collapses to `0` when the next group is hidden).

## Storybook `#table` structure

The section opens with an **Overview index** table naming every variant (Base · Row actions · Interactions · Files · Connections · Metrics) with anchor links, then gives each its own demo block: base Preview + States, **Row actions** (kebab rest/open-menu + inline icon buttons + destructive `.mx-del-btn`), **Files table** (`.dsf-tbl` — checkbox · file-type icon · badge · size · sortable Modified · kebab), **Connections table** (`.ds-conn-tbl` — name · source logo+type · description · kebab), the Metrics anatomy + shipped sections variant, mobile responsive, and interaction patterns. Files/Connections specs are authoritative in their `page-changes/*.md`. The file-type icon (`.dsf-file-ic` + `.type-*`) and the sortable-header button (`.dsft-sortbtn` + `th[aria-sort]` chevron) were lifted from the Files page into `kit-theme.css` (2026-07-09) as shared table atoms — see below.

Beyond the plain row it demonstrates the full **Metrics molecule row set** — `tr.mx-prov-group` (collapsible provider header; click toggles `.is-collapsed`, chevron rotates −90°), `tr.mx-conn-sub-row` (per-connector sub-header, `.mx-conn-sub-label`), `tr.mx-no-builtin-row` (empty state with inline "Create a custom metric →"), and `tr.mx-section-gap` (inter-group spacer) — plus the `.mx-tbl-sections` desktop-cards variant.

It also documents the **interaction patterns composed around a table** (not part of `table.tbl` — they reuse kit atoms `.chip` / `.cbx` / `.meta-row`, and their full specs live in the per-page docs, not here):

| Pattern | Kit atoms | Authoritative spec |
|---|---|---|
| **Filtering** — single-select chip row above the table | `.chip` + `.chip-n`, active = `.is-active` + `aria-pressed` | [page-changes/data-sources_files-landing.md](../page-changes/data-sources_files-landing.md) (rule 9) |
| **Bulk actions** — header checkbox select-all (none/indeterminate/all) → `.meta-row` swaps count for ✕ · N selected · Download · Delete (sticky) | `.cbx` (tri-state), `.meta-row` / `.meta-row-count` / `.meta-row-end` + kit `.btn.btn-tertiary.btn-sm` / `+ .is-danger` / `.iconbtn.iconbtn-tertiary.iconbtn-sm` | page-changes rules 15, 19 |
| **Sorting** — column-header button toggles `aria-sort`, chevron flips | page-level `.dsft-sortbtn` (Files) | page-changes rule 25 |

## No change (—)

Body text-sm, header text-xs, cell padding 12/16 px, wrapper radius `md`, wrapper border, `overflow-x-auto` behaviour, header text weight, row-border placement.

## Token map used

`--ink-secondary` (header text · alias/desc/sub cells · chevron) · `--ink-body` (cell body text · name cell) · `--ink` (group name · open-kebab text) · `--ink-tertiary` (responsive alias) · `--border` (row + shell border) · `--tbl-row-hover` (row hover bg — canonical for all kit tables) · `--tbl-row-pressed` (row selected + transient pressed bg — canonical for all kit tables) · `--brand-primary` (12% mix for actions `:active` only — row hover/selected states are brand-free) · `--mx-group-band` (provider-group band fill — `--slate-150` light / `--grey-700` dark) · `--icon-wrapper-bg` (`.mx-prov-ic` background — 5% brand tint over `--bg`) · `--card` (`.mx-tbl` shell + section-card surfaces) · `--state-hover` (actions-button hover — stacks on the row's own hover overlay) · `--state-pressed` (open-kebab bg) · `--fb-red-text` (`.mx-del-btn`). Layout token: `--mx-prov-indent` = `calc(1rem + 12px + .5rem)`.

### Token definitions

| Token | Light | Dark | Prod |
|---|---|---|---|
| `--tbl-row-hover` | `--tint-4` of `--state-overlay` → `#F8FBFC` | `--tint-4` of `--state-overlay` → `#1C1D24` | `--state-hover` (teal-tinted) |
| `--tbl-row-pressed` | `--tint-8` of `--state-overlay` → `#F0F8F9` | `--tint-8` of `--state-overlay` → `#21222A` | `--state-pressed` |

Same ladder and the same strengths in both themes; only `--state-overlay` differs (`--brand-300` `#46A6B9` light / `--slate-400` dark). See [colors](colors.md) → *Interaction states are a stacking ladder*. Use `var(--tbl-row-hover)` / `var(--tbl-row-pressed)` / `var(--tbl-row-selected-hover)` on any new table — do not reach for `--state-hover`/`--state-pressed` in table row contexts: those are the deeper *control* steps, and a control inside a row is meant to stack on top of the row's own overlay. See [colors](colors.md) → *Interaction states are a stacking ladder*.

## Files table responsive form moved into the kit (2026-09-19)

`table.dsf-tbl`'s ≤767px card form — header dropped, each row a `--card-stack-*` card laid out as `[info | origin badge | kebab]`, with the editing-mode checkbox column and the hover / press / selected / preview states — lived in `data-sources_files-landing.html`'s `<style>`. It is the component's own responsive contract, so it is now in `kit-theme.css`; the page keeps only its toolbar glue (`.dsf-meta-mobile-only`, `#dsf-meta`).

Consequence: the storybook's Files-table block now renders the real card form at phone width instead of a desktop table that no page ships.

### A press on a control is not a press on the row (2026-09-19)

`:active` fires on every ancestor, so pressing a row kebab, a checkbox or a link used to drag the
whole row into `--tbl-row-pressed` as well — two press surfaces at once for one press, and the
control lost its own contrast against the row behind it. The row now opts out:

```css
table.tbl tbody tr:active:not(:where(:has(button:active),:has(a:active),:has([role="checkbox"]:active))) td
```

The guard sits inside `:where()` so it contributes **no specificity** — the rule keeps the exact
weight it had. Selected sits below and carries the same surface anyway, so nothing is being ranked. The
metrics table and the Files card layout already carried their own copies of this guard; the plain
`table.tbl` row was the one place without it, which is why pressing the ⋮ tinted the row behind it.

While a row's own kebab menu is **open** the row holds step 2 (`--tbl-row-hover`), never step 3 —
an open menu is a held press on the *control*, not on the row.
That rule is declared next to the hover rule and wrapped in `:where()`, so press and selected still
win over it without anything opting out.

### Pressed and selected are one surface, not two

The row does not tell them apart and must not be made to: **the checkbox is what communicates
selection.** Both resolve to `--tbl-row-pressed`. There is no hover-while-selected colour, no
selected-vs-pressed ladder to keep in sync, and no rule that special-cases `.is-selected` to stop
the two from fighting — because there is nothing to fight over.
