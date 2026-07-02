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
| 4 | The whole **library block** (`.dsf-library` = meta row + filter chips + list) is hidden when file count is 0 — only the drop zone remains. |
| 5 | Primary action button stays in the title row. Do not move it into the tab bar. |
| 6 | Drop zone drag state is controlled by the `.is-dragover` class (adds `background:var(--state-hover)` + `border-style:solid`). Do not use inline JS styles for drag state. |
| 7 | Drop zone is a **kit component** (`.dsf-drop*` in `kit-theme.css`, storybook `#dropzone`, [changes/DropZone.md](../changes/DropZone.md)) — a centered dashed drop target with the upload icon **inline with the title**, helper line + **Browse Files** button. It has full states: **rest / hover / focus (`:focus-within`) / drag-over (`.is-dragover`)**. Do not make it a horizontal bar, keep the icon on the title's row, and don't re-add page-level `.dsf-drop` CSS (it lives in the kit). |
| 8 | Drop zone sub text does **not** list accepted formats. Keep it to the purpose line ("…available to query in chats"). Do not append `(.csv, .xls, .xlsx)`. |
| 9 | Source filter is three kit `.chip` filters in a `.dsf-filter` wrapper: **All / Artifacts / Uploaded**. Active chip carries `.is-active` + `aria-pressed="true"`. Mirrors the Metrics toolbar chip pattern — do not reimplement chip visuals. |
| 10 | Each file row shows a **source status badge** (`.badge.badge-sm`) after the file name: Artifact = `badge-primary`, Uploaded = `badge-secondary`. Status is label-driven (not colour-only). |
| 11 | Changing the source filter resets the bulk-selection context (clears `editMode` + all `selected`) so a hidden selected file from a prior filter can't be silently bulk-actioned. |
| 12 | List controls are **flat** (no filled band), consistent with the Chats Library page: a plain `.meta-row` (count + Select all / bulk actions) on top, then the `.dsf-filter` chip row below it, then the list. Do **not** reintroduce a `--card2` control band or any other new toolbar pattern without asking. |
| 13 | Concept layout variants live on **one page** toggled by a `.segctrl` (Cards / Table). The toggle is a **demo control** — it sits in the **topbar next to the Light/Dark theme toggle, never in the page content**. `viewMode` drives `dsfRender()` → `dsfRenderCards()` (kit `.chat-row`) or `dsfRenderTable()` (kit `table.tbl`, columns: checkbox · Name · Source · Size · Modified · kebab). |
| 14 | The list is **paginated at `PAGE_SIZE = 20`**: only the first 20 of the filtered set render, and a **Load more** button (`#dsf-more`, kit `.btn.btn-secondary.btn-sm`, showing the remaining count) reveals the next batch. Pagination resets to 20 on filter change. Select-all / count still act on the full filtered set, not just the loaded page. |
| 15 | Select-all differs by view: **Cards** use the meta-row **"Select all"** link; **Table** uses a **shared header checkbox** (first column) that drives bulk selection — all / indeterminate (dash) / none — and the meta-row "Select all" link is omitted in table view (redundant). Both act on the full filtered set. |
| 16 | Order inside the library block: **filter chips → actions/meta row → list**. The actions (bulk-action bar / cards "Select all") sit **between the chips and the list**, not above the chips. |
| 17 | **No file count by default.** Don't show "N files" at rest. The meta row shows only the cards "Select all" link (table default meta is empty → hidden); during selection it shows "N selected" + bulk actions. |
| 18 | Hover tooltips must **not linger after a click**: the tooltip engine hides on `mousedown` (a clicked button often re-renders/removes itself while hovered, so no `mouseout` fires). |

---

## Layout / composition changes

- **Drop zone — dashed drop target.** Centered dashed zone (reads as drag-and-drop): upload icon inline with the title (`.dsf-drop-head`), helper line + Browse button below, `1.25rem 1.5rem` padding. Sub line has no accepted-formats parenthetical and uses `text-wrap:balance`.
- **Source filter.** Kit `.chip` filters (All / Artifacts / Uploaded) in a flat `.dsf-filter` row. Filtering re-derives the list, count, and selection from the visible set (`dsfVisible()`); changing the filter resets the selection context.
- **Per-row source status.** `FILES[].origin` (`'artifact' | 'uploaded'`) drives a `.badge.badge-sm` — Artifact = `badge-primary`, Uploaded = `badge-secondary`. New uploads default to `origin:'uploaded'`.
- **Flat controls (Chats-Library-consistent).** `.ds-page-body` is a flat flex column; the library block is a plain `.meta-row` (count + Select all) + `.dsf-filter` chip row + list — **no filled control band** (the earlier `--card2` `.dsf-toolbar` band was a new pattern and was removed).
- **Cards / Table on one page.** A `.segctrl` (Cards / Table) in the **topbar next to the theme toggle** (demo control, not content) toggles `viewMode`; `dsfRender()` dispatches to `dsfRenderCards()` (kit `.chat-row`) or `dsfRenderTable()` (kit `table.tbl`). Shared drop zone, filters, selection, and delete logic. (The short-lived separate `-table.html` page was removed — variants belong on one page behind the toggle.)
- **Pagination.** Seed grew to 24 rows; the list renders `PAGE_SIZE = 20` at a time with a **Load more** button (`#dsf-more`) that reveals the next batch and shows the remaining count. Resets to 20 on filter change; count + Select all operate on the whole filtered set. Works in both layouts.

## Out of scope

- Reuses existing `.chip` (filter), `.badge` (status), `table.tbl` (table view), `.segctrl` (view toggle) as-is. **DropZone (`.dsf-drop*`) was promoted to a kit component** — CSS moved to `kit-theme.css`, storybook `#dropzone` added, `changes/DropZone.md` created. Remaining page-only glue: `.dsf-library`, `.dsf-filter`, `.dsf-tbl*`.

## A11y / consistency self-check

- [x] Source filter chips expose `aria-pressed`; group has `role="group"` + `aria-label`.
- [x] Status conveyed by **label** (Artifact / Uploaded), not colour alone (1.4.1).
- [x] Badge variants are token-driven (`--badge-primary-*`, `--badge-secondary-*`); no raw colour.
- [x] Spacing on the 4px step (drop `1.25rem/1.5rem`, body gap `1rem`, library gap `.5rem`); no `.cl-page` gap override.
- [x] Chip + segmented-control hit targets ≥ 24px; focus-visible rings inherited from kit.
- [x] View toggle uses `role="tablist"`/`tab` + `aria-selected`; controls are flat and consistent with Chats Library (no bespoke band).
