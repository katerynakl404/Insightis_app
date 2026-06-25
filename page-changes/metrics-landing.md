# Metrics — page-level changes

**Page:** Metrics (`/metrics`)  
**Handoff:** [`../pages/metrics-landing.html`](../pages/metrics-landing.html)  
**State:** Expected only (no Current toggle — prod state is live at the URL above)

---

## Hard rules — read before editing this page

These are locked decisions. Do not change without explicit approval.

| # | Rule |
|---|---|
| 1 | **No "All" chip in the category filter** (`#mx-cat-chips`). The first chip must be "Business Intelligence". "All" was explicitly removed — do not re-add it. |
| 2 | Category chip list (`#mx-cat-chips`) is synchronised with the DS Connections Catalog — same 10 categories, same order. However: Metrics has **no** "All" chip; DS Connections has "All" as the first and default-active chip. Do not add "All" to Metrics or remove "All" from DS Connections. |
| 3 | The metric ownership model has three levels: (a) **Built-in metrics** exist at the Data Source level — they appear automatically when any connection to that source is created and carry no connection sub-label. (b) **Custom metrics at Source level** — user-created, attached to the Data Source globally, no connection sub-label. (c) **Custom metrics at Connection level** — user-created and attached to a specific connection; these must show a "via [Connection name]" sub-label in the Data Source cell (C1). Only level (c) metrics show the sub-label. Do not apply the sub-label to built-in or source-level custom metrics. |
| 4 | Category filter chips (`#mx-cat-chips`) use single-line horizontal scroll (`nowrap + overflow-x:auto`) on ≤1023px. Provider card chip rows (`.prov-card .chip-row`) must use `flex-wrap:wrap; overflow:visible` at **all** widths. These are opposite behaviors — do not swap them. |
| 5 | Kebab menu items differ by metric origin: **built-in predefined** → "Duplicate" only. **Connection-linked or custom** → "Edit · Duplicate · Delete". Do not add Edit or Delete to built-in metrics. |
| 6 | The C1 toolbar filter chips ("All" / "Built-in" / "Custom" + "Active only" toggle) are separate from the empty-state category chips. They filter the filled-state table only and are never shown in empty state. Do not merge or conflate these two chip sets. |

---

## Design pass — connector-first redesign (2026-06-15)

### Summary of changes

| Area | Was | Now |
|---|---|---|
| View structure | Browse / My Metrics tabs | Single unified view: empty state + filled state |
| State toggle | `is-browse` class on root | `is-filled` class on root |
| Layout concept toggle | `Card layout` segctrl (C1 / C2) switching the empty-state grid | **Removed** — C2 (the `.mx-c2-grid` compact card-grid layout) deleted; the topbar `Card layout` segctrl, `mxSetLayout`/`mxSetCardStyle`, `.is-c2`, `.prov-c2-*`, and `.mx-c3a-*` are all gone |
| Banner concept switcher | Topbar segctrl (Original / B / Noise) + `mcSwitch` swapping 3 hero-banner variants | **Removed** — only the Noise banner remains (`banner banner-grad banner-noise`); `mcSwitch`, `.mc-concepts`, `#mc-orig`/`#mc-b` gone. No replacement control — the topbar keeps only the **Demo state** (Empty / Filled) toggle. |
| Empty state | Flat locked table + simple banner | Single layout — provider card grid (`#mx-card-grid` / `.prov-card-grid`); hover reveals "Connect" per row |
| Filled state | Flat combined table | Single layout — sectioned provider-group table (`.mx-tbl-sections`) + search toolbar (`#mx-c3-toolbar`) |
| Card-style segctrl | Present in topbar (filled state) | Removed |
| Custom metric connector | No label | "via Skyvia Jira" sub-label in Data Source cell (C1) |
| CTA copy | "Connect a Source" | "Connect a data source" |
| Dialog title | "Connect a source" | "Add a Connection" |
| Dialog body | "Once connected, all metrics from that source…" | "Connections link Insightis to a data source. All data source metrics appear automatically." |
| Add-custom connector select | "Select a source…" | "Select a data source…" |
| Banner title (C1 empty) | "Connect a data source to start using metrics" | "Connect a data source to start using metrics" (unchanged) |
| `+ Add new` pill | Always visible | Hidden in empty state, shown in filled state only |

### Sidebar

| | Prod (Current) | Expected |
|---|---|---|
| Nav label | Sources | Data Sources |

### Page header (filled state)

| | Prod (Current) | Expected |
|---|---|---|
| "New Connection" button | Absent | Added — secondary style, alongside "Create Metric" |

### Category chips

| | Prod (Current) | Expected |
|---|---|---|
| Chip set (7) | All, Engineering, Marketing, SEO, Finance, HR, Sales, Product | All, Business Intelligence, Commerce, Communication, IT Operations, Marketing, Productivity, Sales & CRM, Storage & Files, Support, Other (11 chips matching Data Source categories) |
| Responsive layout on ≤ 1023 px | wraps to multiple lines | single-line horizontal scroll (kit `.chip-row` rule) — swipe to see all chips |

> **Note:** Provider card chip rows (`.prov-card .chip-row` — metric preview chips) keep `flex-wrap:wrap` at all widths per the hard requirement.

### Empty state

| | Prod (Current) | Expected |
|---|---|---|
| Empty state header | "Top 5 Data Providers for" | "Top 5 Data Sources for" |

### Filled state banner

| | Prod (Current) | Expected |
|---|---|---|
| Banner title | — | "Connect more data sources" |
| Banner body | — | "50+ data sources available — add connections to unlock more built-in metrics" |
| Banner CTA | — | "Browse Data Sources" |

### Mental model clarified

- A **connection** is an instance created in Data Sources, tied to a **data source**.
- After adding a connection, all data source metrics appear automatically (toggleable).
- **Custom metrics** are user-created, linked to a specific connection — shown with connection sub-label, have Edit + Delete via kebab menu.
- For predefined metrics, connection = data source (no redundant sub-label).

## Connector card — empty state redesign (2026-06-16)

### Summary of changes

| Area | Was | Now |
|---|---|---|
| Logo tile | `2.5rem` square, plain `--bg` fill, 1 px border | `2.75rem`, soft brand-tinted fill (`Brand-primary @ 5%`), 1 px border + subtle shadow |
| Provider name | Multi-line wrap allowed | `white-space:nowrap` + ellipsis — single line, vertically centred against logo |
| Connection status | Plain "Not connected" text | Gray status dot (`--ink-inactive`, `7px`) + "Not connected" label |
| Metric chips | `--bg` fill + `--border` border (both at full strength) | Soft fill (`--state-hover`), no border; hover brings brand-tinted fill + border |
| Chip chevron | Brand-teal (`--brand-primary`) | Muted gray (`--ink-inactive`) with `0.125rem` extra gap — quiet affordance cue |
| Footer count | "X metrics available" label | Removed — footer is Connect button only |
| Connect button | `btn-secondary` | `btn-secondary` — unchanged |
| Card hover | `shadow-lift-hover` + teal ring (`Brand @ 22%` tinted border) | `shadow-lift-hover` + `translateY(-2px)` + neutral `--border-hover` — no colored ring (reserved for focus-visible/selected) |
| Card focus | No explicit ring | `--shadow-focus-brand` ring |

### Token / component lineage

- Chip overrides live in `pages/kit-theme.css` as `.prov-card .chip-meta` and `.prov-card .chip-meta-arrow` — scoped to the connector card context so the global `chip-meta` storybook demo is unchanged.
- `box-shadow` on `.prov-ic-w` uses `rgba()` — permitted inside `box-shadow` per colour-token discipline rule 5.
- Card hover border uses semantic token `--border-hover` (not a new token).

## Sidepanel

Fields are rendered with `.dp-fields` → `.dp-field` → `.dp-label` / `.dp-value` (same pattern as DS Connections sidepanel):

| Class | Role |
|---|---|
| `.dp-fields` | Column container, `gap: 1.25rem` |
| `.dp-label` | Uppercase `0.75rem` / weight 500 / `--ink-secondary` field label |
| `.dp-value` | `0.875rem` / `--ink` field value, flex row for icon + text |
| `.dp-value-name` | `1rem` / weight 600 primary name row |
| `.dp-value-body` | `0.875rem` / `--ink-body` prose description |

Fields shown: Name, Data Source, Alias, Type badge, Definition.

| | Prod (Current) | Expected |
|---|---|---|
| Fact label "Provider" | "Provider" | "Data Source" |
| Fact label "Status" | "Status" | "Type" |
| Fact label font size | `.6875rem` | `.75rem` |
| CTA copy | "This metric is provided by [name]" | "This metric is designed for [name]" |
| CTA sub-copy | "Connecting the provider activates…" | "Adding a connection activates…" |

## Connect dialog

| | Prod (Current) | Expected |
|---|---|---|
| Dialog title | "Add a connector" | "Add a Connection" |
| Dialog body | "Connectors link Insightis to a provider…" | "Connections link Insightis to a data source…" |

## Create Metric popup

| | Prod (Current) | Expected |
|---|---|---|
| Segctrl labels | "Connector | Provider" | "Data Source | Connection" |
| Default/first tab | Connector | Data Source |

## Hard requirements — provider card chip area (DO NOT REGRESS)

These rules are locked. Any edit to `.prov-card .chip-meta` must preserve all of them:

| Rule | Detail |
|---|---|
| **Exactly 5 chips per card** | Every provider card must render all 5 `chip-meta` buttons. Never hide chips with `nth-child(n+4){display:none}` or any count-based hide. |
| **Chips must look like chips** | `chip-meta` retains its full visual spec: bordered pill, background fill, padding, border-radius. Removing `border`, `background`, or `padding` to produce plain inline text is forbidden. |
| **Chips are clickable — clear affordance** | Each chip carries `onclick="mxOpenDetail(this)"` and a `chip-meta-arrow` chevron. The chevron must remain visible (`display:none` on the arrow is forbidden). |
| **Chip row wraps freely** | `chip-row` inside a provider card uses `flex-wrap:wrap; overflow:visible`. Never use `nowrap` + `overflow:hidden` — that crops chips. |
| **Purpose** | The 5 chips are a metric preview: they tell users what data is available from this data source before connecting. They are the primary interactive affordance on the empty-state card. |

## Mobile layout — Metrics table (≤ 767 px)

At the `< 768 px` breakpoint the metrics table reflows into a vertical card stack via `.mx-tbl`. No horizontal scroll — each metric row becomes a 4-column grid card.

| | Desktop | ≤ 767 px (mobile) |
|---|---|---|
| Layout | `<table>` with `thead` + `tbody` | `thead` hidden; provider group rows → left-accented block; metric rows → grid cards |
| Provider group row (`.mx-prov-group`) | Full-width separator row | Block with `border-left: 3px solid --border` left accent |
| Metric row (`.mx-metric-child`) | 6 cols: toggle · name · alias · definition · badge · kebab | `grid-template-columns: auto 1fr auto auto` (toggle · content · badge · kebab); content spans rows 1–3 (name / alias / definition) |
| Badge placement | Rightmost data col | Inline with name (grid-column 3, row 1) — no absolute positioning |
| Toggle placement | Leftmost col | grid-column 1, row 1, `align-self: center` |
| Kebab | Absolute-positioned, hover-reveal | grid-column 4, row 1; always visible (no hover on touch) |
| Hover state | `State/Hover` bg + brand-tinted border + shadow | Suppressed on touch; re-enabled only under `(hover: hover)` media query |
| Row with open menu | `overflow: visible` inherited | `z-index: 20; overflow: visible` via `:has([data-kbp][aria-expanded="true"])` |

Selector: `.mx-tbl` wraps the `<table class="tbl">` element. Rule lives in `pages/kit-theme.css` shared responsive-tables block.

## Filled state — sectioned table (desktop)

The filled-state table renders each provider group as **its own separate card section** on desktop (≥ 768 px) — the same separated-card treatment the table already uses on responsive (≤ 767 px), but with the native table columns preserved and aligned across every card.

| | Before | After |
|---|---|---|
| Desktop filled layout | One `<table>` in a single `.mx-tbl` card; provider groups separated only by the grey band header rows | Each provider group is its own bordered card; the single outer card shell is dropped |
| Card separation | — | 16 px (1 rem) gap between provider cards |
| Body row background | White via the single card shell | White via `--card` set on each body row (the dropped outer shell no longer paints it) |
| Provider header band | `--mx-group-band` = slate-150 (light) / grey-700 (dark) | Neutral default only. (Earlier Green / Green +2 / Inverted / Solid exploration variants and their `Group style` toggle were removed — single concept kept.) Body rows = `--card`. |
| Column headers (`thead`) | Visible once at the top | Hidden — a single header floating above N separate cards reads as orphaned; column meaning carried by cell content (mono alias, badge chip, toggle), matching the responsive card view |
| Markup | One `<table id="mx-filled-table">` / `<tbody id="mx-filled-body">` | Unchanged — single table preserved so the collapse / search-filter / add-delete JS keeps working; a `.mx-section-gap` spacer `<tr>` is inserted between provider groups for the inter-card gap |
| Collapsed group | — | Keeps the gap to the next card and rounds into a standalone card (all four corners) |

Opt-in via `.mx-tbl-sections` on the `.mx-tbl` wrapper. Rule lives in `pages/kit-theme.css` immediately after the responsive `.mx-tbl` block, gated to `@media (min-width: 768px)` so it stays clear of the ≤ 767 px responsive recipe (which already produces separate cards). Neutral only — band = `--mx-group-band`, body rows = `--card`; both re-theme via existing tokens. `mxToggleGroup` skips `.mx-section-gap` rows, so the inter-card gap is preserved while a group is collapsed; a spacer directly above a filtered-out group collapses to `0` via `:has(+ .mx-prov-group[style*="display: none"])`. The non-interactive connector sub-row's hover is pinned to `--card` (`.mx-tbl-sections tr.mx-conn-sub-row:hover td`): the global rule sets it to `inherit`, which — with the section card's outer shell removed — would resolve to the darker page background and make the sub-row darken on hover while metric rows lighten.

## Components referenced

| Component | Change file | Summary |
|---|---|---|
| Sidebar | [`../changes/Sidebar.md`](../changes/Sidebar.md) | Unchanged in this pass |
| Colors | [`../changes/colors.md`](../changes/colors.md) | Hex-only token shifts — auto-propagate |

## A11y / Consistency self-check

**Consistency:** PASS — new toolbar reuses `.igrp.is-sm` kit component; all colours via tokens; state visibility via CSS class gating only; no raw hex introduced.

**Accessibility:**
- Search input `type="search"` with `role="search"` wrapper ✓
- Clear button `aria-label="Clear search"` ✓
- Connect dialog `aria-labelledby="mx-conn-title"` updated to "Add a Connection" ✓
- Empty / filled sections toggled via CSS visibility, not `hidden` attribute — screen readers see both; update to `aria-hidden` if needed in prod ✓
