# Data Sources — page-level changes

## Tab structure

| | Prod (Current) | Expected |
|---|---|---|
| Tab 1 label | Connections | Providers Catalog |
| Tab 1 content | Table of connected sources | Search + category chip filters + connector card grid |
| Tab 2 label | Files | My Connections |
| Tab 2 initial state | Always enabled | Disabled until at least one provider is connected |
| Tab 2 content | File upload drop zone | Compact connected-source list with status dots + banner |

## Layout changes

- **Search** moves from page-level into the Providers Catalog panel (above chip filters)
- **My Connections tab** is disabled on load; JS enables it on first successful connection and re-disables it when the last connection is removed
- **Banner** in My Connections uses `.banner.banner-grad` (same gradient style as the Metrics page); collapses via `.is-dismissed` once connections exist
- **"Add new" button** is hidden while on the Catalog tab; appears only on the My Connections tab
- **Files panel** removed — Files is now a separate top-level route

## Out of scope

- Files page (separate route, separate handoff)
- Connector detail / OAuth flow screens
