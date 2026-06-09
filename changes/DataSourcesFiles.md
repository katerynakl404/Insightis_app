# DataSourcesFiles — Changes (Current → Expected)

| State / Element | Current (prod) | Expected | Specification |
|---|---|---|---|
| **Tab bar — count badges** | None | `.badge.badge-secondary` inline in each tab label: Connections (4) · Files (N) | Tab counts give instant inventory at a glance; count reflects live `FILES.length` |
| **Tab bar — action button** | None | `.btn.btn-outline.btn-sm` with upload icon prefix, right-aligned in tab row via flex; label "Browse Files" | Consistent upload entry point visible without scrolling; stays in the tab row per spec |
| **Tab bar — border** | `.tabset` owns `border-bottom` | `.dsf-tabrow` wrapper owns `border-bottom`; `.tabset` has `border-bottom:none` so both tabs and button share one underline hairline | Avoids double border when action button is inline |
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
| **Typography** | Ad-hoc sizes | All text via existing type-scale classes and tokens (`--ink`, `--ink-secondary`, `.8125rem`, `.875rem`, `.75rem`) — no hardcoded sizes | Token-enforced type scale |

## Accessibility checks

Consistency: PASS — all colors reference tokens; sizes and spacing use 4px-step scale; both Light and Dark themes covered; state coverage includes default / hover / selected / checked / disabled on interactive elements.

Accessibility: PASS
- Drop zone has `role="region"` + `aria-label`; Browse Files buttons have explicit labels.
- Checkboxes expose `role="checkbox"` + `aria-checked`.
- Kebab buttons have `aria-haspopup="menu"` + `aria-expanded`; Escape dismisses.
- Delete uses `.danger` class (red text + icon) — status not conveyed by color alone.
- All interactive elements have visible `:focus-visible` rings via kit tokens.
- Hit targets ≥ 24×24px (`.chat-row-more` 24×24; `.dsf-meta-iconbtn` 24×24; drop zone full-width).
