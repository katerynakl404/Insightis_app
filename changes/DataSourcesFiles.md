# DataSourcesFiles — Changes (Current → Expected)

> **Update (Unreleased):** Files is now a **top-level sidebar destination** (see [`Sidebar.md`](Sidebar.md) — nav row order `Sources → Files → Metrics`), not a tab inside Data Sources. The three `Tab bar — …` rows below are kept for historical context but are no longer the Expected state — there is no tab bar; the `Browse Files` action moved into the page header next to the `Files` h1. The `.dsf-tabrow` / `.tabset` markup was removed from [`pages/approved/data-sources_files-landing.html`](../pages/approved/data-sources_files-landing.html) and [`pages/approved/data-sources_connections-landing.html`](../pages/approved/data-sources_connections-landing.html).

| State / Element | Current (prod) | Expected | Specification |
|---|---|---|---|
| **Tab bar — count badges** *(superseded — tab bar removed)* | None | ~~`.badge.badge-secondary` inline in each tab label: Connections (4) · Files (N)~~ → tab bar deleted; counts are no longer needed since Files has its own route. | Was: tab counts give instant inventory at a glance. Now: the page h1 alone identifies the route. |
| **Tab bar — action button** *(superseded)* | None | ~~`.btn.btn-outline.btn-sm` … right-aligned in tab row~~ → action moved to the page header (right-aligned next to the `Files` h1). | Same button (`btn btn-outline btn-sm` + upload icon); new container is `.ds-page-head` instead of `.dsf-tabrow`. |
| **Tab bar — border** *(superseded — tab bar removed)* | `.tabset` owns `border-bottom` | ~~`.dsf-tabrow` wrapper owns `border-bottom`~~ → no tab bar exists; section divider is no longer needed. | `.dsf-tabrow` CSS is now dead in both data-sources HTML files. |
| **Drop zone — border** | `2px dashed var(--brand-primary)` (teal, heavy) | `2px dashed var(--border)` (soft neutral) | Replaces "heavy colored outline" — softer treatment, brand color reserved for primary actions |
| **Drop zone — background** | Transparent | `var(--card2)` | Gives the drop zone a distinct secondary-surface fill without adding color |
| **Drop zone — drag-over state** | — (none) | `background:var(--state-hover)` + `border-style:solid` | Clear affordance on active drag; no custom colors — uses hover token |
| **Drop zone — format indicators** | Plain text ("Supports CSV, XLS, XLSX") | `.badge.badge-secondary` per format: `.csv` `.xls` `.xlsx` in a flex row below the instruction text | Inline badge/tag components using existing badge token; clearly scannable |
| **Drop zone — Browse Files button** | `.btn.btn-secondary.btn-sm` inside drop zone | `.btn.btn-outline.btn-sm` + upload icon prefix | Outlined button token; consistent with the tab-row action button |
| **Drop zone — visibility** | Always visible | Always visible above the file list regardless of file count | Per spec — drop zone never disappears once files exist |
| **File count row — default state** | Plain text count only | `.meta-row` with `meta-row-count` left + "Select all" `.link` right — identical markup to Chats Library | Establishes parity with Chats Library pattern |
| **File count row — selection state** | — | `.meta-row` switches to bulk action bar: ✕ icon-button + N selected count + Select all link (left) · Download button + Delete button/destructive (right) | Full Chats Library bulk-action pattern; Download uses `dsf-meta-dl` (neutral); Delete uses `dsf-meta-del` (`--fb-red-text`) |
| **File count row — hidden** | N/A | Row hidden (`display:none`) when `FILES.length === 0` | Nothing to show when empty |
| **File rows — checkbox** | Not present | `.cbx` hidden by default; appears on row hover or when `editMode` is true — identical behavior to Chats Library | Checkbox hidden by default per spec |
| **File rows — structure** | File icon + name + size | `.chat-row` shell: `.cbx` + `.dsf-file-ic` + `.chat-row-name` + `.chat-row-time` (size · date) + `.chat-row-more` kebab | Reuses chat-row component from kit-theme.css; no new row CSS |
| **File rows — hover state** | `--state-hover` bg | Same `--state-hover` bg + border-color lift (inherits from `.chat-row:hover`) | Identical to Chats Library row hover |
| **File rows — selected state** | — | `.is-selected` → `--state-pressed` bg + `--brand-primary` border (inherits from `.chat-row.is-selected`) | Identical to Chats Library row selected |
| **File rows — kebab button** | Not present | `.chat-row-more` hidden by default (`opacity:0`); fades in on row hover; one open at a time | Identical behavior to Chats Library kebab |
| **Context menu** | Not present | `.menu.chat-row-menu` anchored to kebab button: Download (with download icon) · Delete (with trash icon, `.danger` class → `--fb-red-text`) | Reuses `.menu`/`.mi`/`.danger` from kit-theme.css |
| **File type icon** | Colored square + extension text | `.dsf-file-ic` colored square: `.type-csv` → `--brand-tertiary`; `.type-xls`/`.type-xlsx` → `--fb-green`; all via `--mark-bg` custom property | Token-based; follows the connector-mark pattern from the Connections tab |
| **Typography** | Ad-hoc sizes | All text via existing type-scale classes and tokens (`--ink`, `--ink-secondary`) at fixed sizes `1rem`/`.8125rem`/`.5625rem` (see reproduction spec for exact per-element sizes) | Token-enforced colours, fixed type-scale sizes |

---

## Reproduction spec (CSS-accurate — stand-alone)

> **Where this lives:** all `.dsf-*` rules ship **inline in the page `<style>`** of [`pages/approved/data-sources_files-landing.html`](../pages/approved/data-sources_files-landing.html), **not** in `pages/kit-theme.css`, and there is **no `#datasourcesfiles` storybook section**. The component is composed from kit primitives (`.chat-row`, `.chat-list`, `.cbx`, `.meta-row`, `.meta-row-count`, `.meta-row-actions`, `.menu`, `.mi`, `.danger`, `.link`, `.btn.btn-outline.btn-sm`) plus the page-local `.dsf-*` rules below. To rebuild, copy the kit primitives plus every rule in this section.

### Layout containers

- **Page head** `.ds-page-head`: `display:flex; align-items:center; justify-content:space-between; gap:.75rem`; child `.cl-page-title` has `margin:0`. Title is `<h1 class="cl-page-title">Files</h1>` (font-weight 500, `1.5rem`/`2rem`, `≥768px` → `1.875rem`/`2.25rem`, `var(--ink)`, left-aligned).
- **Body** `.ds-page-body` holds, in order: drop zone → `.meta-row#dsf-meta` → `.dsf-list.chat-list#dsf-list`.
- **List** `.dsf-list`: `display:flex; flex-direction:column; gap:.375rem; position:relative`. `.dsf-list .chat-list{margin:0}` (resets the chats-landing margin-top override).

### Drop zone `.dsf-drop`

- Border `2px dashed var(--border)`; `border-radius:.75rem`; `background:var(--card2)`.
- `padding:1.25rem 1.5rem`; `display:flex; flex-direction:column; align-items:center; gap:.5rem; text-align:center; cursor:pointer`.
- `transition:background .15s, border-color .15s`.
- **Drag-over** `.dsf-drop.is-dragover`: `background:var(--state-hover); border-style:solid` (toggled by `ondragover`/`ondragleave`/`ondrop` inline handlers).
- Always visible above the list regardless of file count.
- **Children (DOM order):**
  1. `<svg class="dsf-drop-ic">` — `width:3.5rem; height:3.5rem; color:var(--ink-inactive); flex:none`. Glyph: `viewBox="0 0 48 48"`, `fill:none stroke:currentColor stroke-width:1.75`, round caps/joins. Two stacked document rects (back one `opacity:.38` `rotate(-10 20 30)`) + an up-arrow (`line` 32,14→32,6 with `polyline 28,10 32,6 36,10`).
  2. `<p class="dsf-drop-title">Drag & drop files here</p>` — `font-size:1rem; line-height:1.5rem; font-weight:500; color:var(--ink); margin:0`.
  3. `<p class="dsf-drop-sub">` — `font-size:.8125rem; color:var(--ink-secondary); margin:0; max-width:36ch; line-height:1.125rem`. Text: "or click to browse — files you upload are available to query in chats (.csv, .xls, .xlsx)".
  4. `<button class="btn btn-outline btn-sm">Browse Files</button>` — kit button; click calls `event.stopPropagation();dsfBrowseFiles()`.

> Note: the shipped drop zone uses the prose subline (".csv, .xls, .xlsx" inline) **instead of** the `.badge.badge-secondary` per-format chips described in the table row above; the badge treatment is Expected-design intent not yet reflected in the page markup.

### File type icon `.dsf-file-ic`

- `width:2rem; height:2rem; border-radius:.375rem; display:inline-flex; align-items:center; justify-content:center`.
- `font-size:.5625rem; font-weight:700; letter-spacing:.04em; text-transform:uppercase; flex:none`.
- `color:var(--content-on-solid); background:var(--mark-bg, var(--brand-tertiary))`.
- Type modifiers set `--mark-bg`: `.type-csv → var(--brand-tertiary)`; `.type-xls` and `.type-xlsx → var(--fb-green)`.
- Content is the uppercased extension text (e.g. `CSV`), `aria-hidden="true"`.

### File row (reuses `.chat-row`)

DOM: `<div class="chat-row [is-selected]" role="listitem" data-id tabindex="0">` containing in order:
`<span class="cbx [on]" role="checkbox">` (CHECK svg when on) · `<span class="dsf-file-ic type-…">` · `<span class="chat-row-name">` · `<span class="chat-row-time">{size} · {date}</span>` · `<button class="chat-row-more" aria-haspopup="menu">` (KEBAB svg) · `<div class="menu chat-row-menu" role="menu">`.
All hover / `.is-selected` / checkbox-reveal / `.chat-row-more` opacity-fade / kebab-open behaviour is inherited verbatim from `.chat-row` in kit-theme.css — no local overrides. List toggles `.is-selecting` when `editMode` is true.

**Context menu** `.menu.chat-row-menu` items (both `.mi`, `role="menuitem"`, 14×14 svg, `flex:none`):
- Download — download-glyph svg + "Download".
- Delete — `.mi.danger` (→ `--fb-red-text`) — trash-glyph svg + "Delete".

### Meta / bulk-action row `.meta-row#dsf-meta`

`role="toolbar"`. Hidden via inline `display:none` when `FILES.length === 0`; otherwise `display:''`.

- **Default state (`editMode` false):** `<span class="meta-row-count">{N} file|files</span>`. At ≤767px it also carries a `.link` "Select all" and the `.dsf-meta-sort` control (both `.dsf-meta-mobile-only`) — at desktop the table header checkbox owns select-all and the Modified header owns sorting (rules 15 / 25).
- **Selection state (`editMode` true):** `meta-row-count` "{N} selected" + `.link` ("Select all"/"Deselect all", `.is-disabled` when total 0) + `.meta-row-end` cluster (Download + Delete + exit ✕).

Every control in the row is a **kit component** — `.btn.btn-tertiary.btn-sm` (Download), the same `+ .is-danger` (Delete), `.iconbtn.iconbtn-tertiary.iconbtn-sm` (exit ✕), `.iconbtn.iconbtn-tertiary.iconbtn-xs` (the preview header’s Download / Close, matching the same panel on the chat page), `.meta-row-end` (right-edge cluster). The page-local `.dsf-meta-dl` / `.dsf-meta-del` / `.dsf-meta-iconbtn` / `.dsf-bulk-right` copies are gone, and so is the kit’s interim `.meta-row-btn` family; values live in [Button.md](Button.md) / [IconButton.md](IconButton.md).

### File preview panel `.dsf-preview`

Page glue only: the grid column (3rd `.cl-shell` track via `.has-preview`) and the resize grip
(`.dsf-preview-grip`, 320–720px, width cleared on close). Everything inside is the **kit
file-preview family** — the same components the chat page's file panel uses, so the product no
longer has two file previews behaving differently:

- `.cp-fp-head` + `.cp-fp-title` + two `.iconbtn.iconbtn-tertiary.iconbtn-xs` (Download · Close ✕)
- `.cp-fp-banner` — truncation notice, a persistent **sibling** of the scroll region (never
  injected inside it) so it renders as a full-bleed strip flush under the header, immune to the
  body's padding and scrollbar width. `Download` inside the sentence is the kit `.link`.
- `.cp-fp-body` — the scroll region. Content by type: `.csv` / `.xls` / `.xlsx` → rendered table
  (`.cp-tbl-scroll` + `table.tbl`); `.json` / `.txt` / `.md` → `.cp-fp-json` mono sample;
  everything else → `.cp-fp-empty` (icon + filename + reason + a real Download button).
- `.dsf-preview-meta` — the `size · source · date` line under the content.

**Why the change:** the panel previously rendered no content at all, so it had nowhere to put a
truncation warning and no "showing part of the file" state — while the kit already shipped every
piece needed for the chat panel. Adopting the family removed the page-local `.dsf-preview-head` /
`-title` / `-body` / `-ic` / `-name` copies (cascading delete).

**Truncation trigger:** only when a sample is actually shown *and* the file is bigger than the
sample, derived from the file's own size — so the banner can never appear over a file that fits,
or over `.cp-fp-empty` (nothing shown ⇒ nothing truncated).
