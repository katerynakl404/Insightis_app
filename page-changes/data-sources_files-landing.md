# Data Sources Files — page-level changes

**Page:** Data Sources → Files (`/data-sources/files`)
**Handoff:** [`../pages/concept/data-sources_files-landing.html`](../pages/concept/data-sources_files-landing.html)
**State:** Expected only (no Current toggle — prod state is live at the URL above)

---

## Hard rules — read before editing this page

These are locked decisions. Do not change without explicit approval.

| # | Rule |
|---|---|
| 1 | Drop zone is always visible above the file list regardless of file count. Never hide or collapse it when files exist. |
| 2 | File row kebab (···) is hidden at rest (`opacity:0`) and fades in on row hover — same pattern as Chats Library. |
| 3 | File row checkbox is hidden at rest and appears on row hover or when any item is selected — same pattern as Chats Library. |
| 4 | File count and bulk-action bar (`.meta-row`) is hidden when file count is 0. Do not show it in the empty state. |
| 5 | Primary action button stays in the title row. Do not move it into the tab bar. |
| 6 | Drop zone drag state is controlled by the `.is-dragover` class (adds `background:var(--state-hover)` + `border-style:solid`). Do not use inline JS styles for drag state. |

---
