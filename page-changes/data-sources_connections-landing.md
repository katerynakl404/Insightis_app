# Data Sources — page-level changes

**Page:** Data Sources — Connections (`/data-sources`)  
**Handoff:** [`../pages/approved/data-sources_connections-landing.html`](../pages/approved/data-sources_connections-landing.html)  
**Status:** ✅ Approved (погоджено) — 2026-06-30  
**Loading state:** in-page toggle — top SegmentedControl, Loaded/Skeleton (catalog chips + V3 tile grid; connected list)

## Hard rules — read before editing this page

These are locked decisions. Do not change without explicit approval.

| # | Rule |
|---|---|
| 1 | "My Connections" tab is disabled on initial page load until at least one data source is connected. JS enables it on first successful connection and re-disables it when the last connection is removed. Do not enable it unconditionally or via a URL param. |
| 2 | Category chips in the Catalog (`#ds-cats`) include "All" as the **first chip, selected by default**. This is the inverse of the Metrics page which has no "All" chip. Do not remove "All" from DS Connections. |
| 3 | Category chip list in the Catalog (excluding "All") must match the Metrics page chip list exactly — same 10 categories, same order. If categories change, both pages must be updated simultaneously. |
| 4 | Search bar lives inside the Catalog tab panel (above `#ds-cats`), not at page level. Do not move it to the page header or outside the tab panel. |
| 5 | "Create Connection" button is hidden while the Catalog tab is active and visible only on the My Connections tab. Do not show it on both tabs simultaneously. **Its click switches to the Catalog tab** (`dsSwitchTab('catalog', …)`) so the user browses connectors and connects from a catalog card — it must NOT open a from-scratch `dsConnect(null)` dialog. |
| 6 | **No active/enable toggle in My Connections** (removed 2026-06-25). Connection rows (table + card view) and the detail sidepanel must NOT show a `.swt` active/inactive switch. A connection's only state indicator is the status dot/badge (active / error). Do not re-add the `dsToggleEnabled` / `dsPanelToggle` / `dsSetEnabled` functions, the `enabled` flag, or the "Active" table column — the table is 4 columns (Connection name / Data Source / Description / Actions, 28% / 22% / 40% / 10%). |

---

## Tab structure

| | Prod (Current) | Expected |
|---|---|---|
| Tab 1 label | Connections | Catalog |
| Tab 1 content | Table of connected sources | Search + category chip filters + connector card grid |
| Tab 2 label | Files | My Connections |
| Tab 2 initial state | Always enabled | Disabled until at least one data source is connected |
| Tab 2 content | File upload drop zone | Compact connected-source list with status dots + banner |

## Layout changes

- **Category chip filters** (`#ds-cats`) scroll horizontally on tablet + mobile (≤ 1023 px) — no wrapping. Desktop keeps `flex-wrap:wrap`. Override lives in the page `<style>` block on `#ds-cats` (needed because the ID selector has higher specificity than the kit `.chip-row` rule).
- **Search** moves from page-level into the Catalog panel (above chip filters); placeholder reads "Search data sources…"
- **My Connections tab** is disabled on load; JS enables it on first successful connection and re-disables it when the last connection is removed
- **Banner** in My Connections uses `.banner.banner-grad` (same gradient style as the Metrics page); collapses via `.is-dismissed` once connections exist; label reads "Browse the Catalog"
- **Connected list rows** (`.ds-conn-row`, card view) use the kit's flat list-row hover recipe — same as `.chat-row`: softened rest border (`color-mix(--border 45%, transparent)` + `--shadow-rest`), hover → `background:var(--state-hover)` + `border-color:var(--card-border-hover)` + `box-shadow:var(--shadow-card-hover)`. Previously the row had no hover state and a full-strength rest border.
- **"Add new" button** is hidden while on the Catalog tab; appears only on the My Connections tab
- **Files panel** removed — Files is now a separate top-level route
- **Concept 1 / Concept 2 toggle** removed from topbar — single unified concept only

## Sidebar

| | Prod (Current) | Expected |
|---|---|---|
| Nav label | Sources | Data Sources |

## Catalog cards

**Approved layout: vertical tile (`.ds-app.ds-v3`).** The card-layout exploration is resolved — **Variant 3 is approved** and is the only catalog layout. Variant 1 (horizontal row) and Variant 2 (compact ~7.5rem tile) and the topbar layout toggle are removed.

| | Prod (Current) | Expected |
|---|---|---|
| Card layout | C1 horizontal + C2 variant + layout toggle | **Variant 3 only** — vertical tile, no toggle |
| Tile | — | Compact ~**square** vertical tile: small logo on top (`2.5rem`), name below (`text-14`, 2-line clamp, centred), fixed `8rem` height (≈ the ~8rem column width at 8/row) |
| Columns | — | Capped at **8 per row** (`auto-fill` + `max(7rem, (100% − 7·gap)/8)`), reflows down when narrower (updated 2026-06-25 from 6) |
| Connect | — | Revealed over a translucent scrim on **hover** (desktop) / **tap** (touch, `.is-active`); tap scrim or another tile to collapse |
| Logo | bordered container | Plain sprite logo, no container (`.logo-spr`) |
| Category text on card | Present (`.ds-card-cat`) | Removed — `.ds-card-cat` element and class gone |

## My Connections table

| | Prod (Current) | Expected |
|---|---|---|
| Column: header col 1 | Provider | Data Source |
| Column: Status | Present | Removed |
| Column: Description | Narrower, may wrap | Expanded to fill former Status column space; single-line truncated |
| Column widths | — | 28% / 22% / 40% / 10% |

## Connection row sidepanel

Clicking a connection row opens a new sidepanel on the right side. Fields are rendered with `.dp-fields` → `.dp-field` → `.dp-label` / `.dp-value`:

| Class | Role |
|---|---|
| `.dp-fields` | Column container, `gap: 1.25rem` |
| `.dp-label` | Uppercase `0.75rem` / weight 500 / `--ink-secondary` field label |
| `.dp-value` | `0.875rem` / `--ink` field value, flex row for icon + text |
| `.dp-value-name` | `1rem` / weight 600 primary name row |
| `.dp-value-body` | `0.875rem` / `--ink-body` prose description |

Fields shown:
- Connection name (`.dp-value-name`)
- Data Source (logo + name)
- Status badge
- Description
- Edit / Disconnect actions

## Copy changes

| | Prod (Current) | Expected |
|---|---|---|
| Dialog title — create | — | "New Connection" (Title Case) |
| Dialog title — edit | — | "Edit Connection" (Title Case) |
| Tooltip (disabled metric/action) | "Connect a provider first" | "Connect a data source first" |
| Banner CTA label | "Browse the Providers Catalog" | "Browse the Catalog" |

## Hard requirements — catalog tile `+` Connect button (DO NOT REGRESS)

The connect action on the **Variant 3 catalog tile** (`dsCardHtml`) must use the standard secondary button from the design system, revealed by the hover/tap scrim.

| Rule | Detail |
|---|---|
| **Correct class** | `btn btn-sm btn-secondary` (+ `.ds-card-connect`) — the standard kit secondary button. |
| **Forbidden class** | `iconbtn iconbtn-secondary` — the icon-only square variant, visually wrong here. Flagged repeatedly, fixed 2026-06-18 — do not revert to `iconbtn`. |
| **Reveal (approved)** | Revealed over a translucent scrim (`.ds-card-hover`) on **hover** (desktop) / **tap** (touch, `.is-active`) — the approved Variant 3 behaviour. **Not** shown in the rest state. |
| **Markup location** | Built in `dsCardHtml()` (page `<script>`), inside the `.ds-card-hover` block. |

## Mobile layout — My Connections table (≤ 767 px)

At the `< 768 px` breakpoint (prod's `useIsMobile` threshold) the My Connections table reflows into a vertical card stack via `.ds-conn-tbl`. No horizontal scroll — each row becomes a 2-column grid card.

| | Desktop | ≤ 767 px (mobile) |
|---|---|---|
| Layout | `<table>` with `thead` + `tbody tr` | `thead` hidden; each `tbody tr` → card with `grid-template-columns: 1fr auto` |
| Visual order | col 1 = connection label · col 2 = DS icon+name | **DS icon+name leads** (row 1 via `grid-row`) · connection label as subtitle (row 2) — swapped from DOM order |
| Description | col 3, single-line truncated | col 3 → row 3, `-webkit-line-clamp: 2` |
| Kebab | col 4, hover-reveal | col 4 → right column spanning all rows; always visible (no hover on touch) |
| Hover state | `State/Hover` bg + brand-tinted border + shadow | Suppressed on touch; re-enabled only under `(hover: hover)` media query |
| Row with open menu | `overflow: visible` inherited | `z-index: 20; overflow: visible` via `:has([data-kbp][aria-expanded="true"])` |

Selector: `.ds-conn-tbl` wraps the `<table class="tbl">` element. Rule lives in `pages/kit-theme.css` at the shared responsive-tables block (below the `.mx-tbl` block).

## Connector logos — plain sprite marks (no container)

Every connector logo (catalog cards, My Connections list + table, connect dialog, connection sidepanel) renders as a **plain brand logo with no container** — no border, no background box, no rounded backing. Each connector is its own offline `256×256` brand SVG at `pages/assets/logos/<slug>.svg` (split out of the source sprite); the shared `.logo-spr` class in `kit-theme.css` sets the size and `.logo-spr.<slug>` points at the file. Size per context is set with `--logo-size`.

| | Prod (Current) | Expected |
|---|---|---|
| Logo source | `cdn.simpleicons.org` remote monochrome icons | Offline brand SVGs (`assets/logos/<slug>.svg`), full-colour |
| Container | Bordered square (`1px var(--border)` + `var(--card)` bg) around each logo | None — plain logo sits directly on the surface |
| Catalog set | Mixed; several connectors had no real logo | Trimmed to connectors present in the sprite |

Sizes (`--logo-size`): catalog tile 2.75rem · catalog row 3rem · connect dialog 2.25rem · sidepanel 2rem · My Connections table 1.5rem · inline source mark 0.875rem.

> Dark-theme note: a few sprite logos are near-black (e.g. GitHub, Notion); without the former light backing they have low contrast on the dark surface. Flagged for review if dark theme is in scope.

## Out of scope

- Files page (separate route, separate handoff)
- Connector detail / OAuth flow screens
