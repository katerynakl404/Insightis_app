# Data Sources — page-level changes

## Tab structure

| | Prod (Current) | Expected |
|---|---|---|
| Tab 1 label | Connections | Catalog |
| Tab 1 content | Table of connected sources | Search + category chip filters + connector card grid |
| Tab 2 label | Files | My Connections |
| Tab 2 initial state | Always enabled | Disabled until at least one data source is connected |
| Tab 2 content | File upload drop zone | Compact connected-source list with status dots + banner |

## Layout changes

- **Search** moves from page-level into the Catalog panel (above chip filters); placeholder reads "Search data sources…"
- **My Connections tab** is disabled on load; JS enables it on first successful connection and re-disables it when the last connection is removed
- **Banner** in My Connections uses `.banner.banner-grad` (same gradient style as the Metrics page); collapses via `.is-dismissed` once connections exist; label reads "Browse the Catalog"
- **"Add new" button** is hidden while on the Catalog tab; appears only on the My Connections tab
- **Files panel** removed — Files is now a separate top-level route
- **Concept 1 / Concept 2 toggle** removed from topbar — single unified concept only

## Sidebar

| | Prod (Current) | Expected |
|---|---|---|
| Nav label | Sources | Data Sources |

## Catalog cards

| | Prod (Current) | Expected |
|---|---|---|
| Card layout | C1 horizontal + C2 variant | C1 horizontal only — `.ds-card2` variant removed |
| Category text on card | Present (`.ds-card-cat`) | Removed — `.ds-card-cat` element and class gone |

## My Connections table

| | Prod (Current) | Expected |
|---|---|---|
| Column: header col 1 | Provider | Data Source |
| Column: Status | Present | Removed |
| Column: Description | Narrower, may wrap | Expanded to fill former Status column space; single-line truncated |
| Column widths | — | 28% / 22% / 40% / 10% |

## Connection row sidepanel

Clicking a connection row opens a new sidepanel on the right side showing:
- Connection name
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

## Hard requirements — catalog card `+` button (DO NOT REGRESS)

The connect action button on **Card Style 1** (`dsCardHtml`) must use the standard secondary button from the design system.

| Rule | Detail |
|---|---|
| **Correct class** | `btn btn-sm btn-secondary` — the standard kit secondary button. |
| **Forbidden class** | `iconbtn iconbtn-secondary` — that is the icon-only square variant, visually wrong for this context. |
| **Always visible** | The button must be visible in the card's default (rest) state. Never use `opacity:0` or hover-reveal patterns on it. |
| **Markup location** | Built in `dsCardHtml()` in the page `<script>` block — in the `ds-card-act` container. |

This was corrected on 2026-06-18 after being flagged multiple times. Do not revert to `iconbtn`.

## Out of scope

- Files page (separate route, separate handoff)
- Connector detail / OAuth flow screens
