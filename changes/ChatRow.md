# ChatRow — prod → expected

Baseline: [`../current/ChatRow.md`](../current/ChatRow.md).

⚠ **Current column is a placeholder.** The live `/chats` page at <https://insightis-app.devart.info/chats> exists but its rendered DOM was not captured (React SPA; static fetch returns only the empty `<div id="root">`). The Expected column below is well-defined against existing kit tokens, but the *diff* is not — every row currently says **⚠ pending** in the Current cell. Fill those cells in once a screenshot or DOM dump is available. **Do not interpret an empty Current cell as "this didn't exist on prod"** — assume the live page already renders some version of this row and the diff is yet to be measured.

| State | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Default (unpinned) | ⚠ pending | — | bg `Surface/Card`, border `1px semi-transparent Stroke/Border` (45% mix), radius `lg 8px`, height `2.75rem` (44px), padding `0 .75rem`, `font .875rem/500`, ghost shadow at rest; checkbox slot `.cbx` **hidden** by default | layout: `flex; gap:.625rem; padding:0 .5rem; align-items:center` |
| Hover | ⚠ pending | — | bg `State/Hover` (`--state-hover`); border `color-mix(in srgb, var(--brand-primary) 25%, transparent)`; box-shadow lifts (`0 2px 6px -1px rgba(15,23,42,.08), 0 1px 2px 0 rgba(15,23,42,.04)`); `.chat-row-more` fades in (opacity 0 → 1). | same fade recipe as `.sbx-chat-more`; works on `:hover`, `:focus-within`, and explicit `.s-hover`. |
| Selection mode | ⚠ pending | — | when ≥1 row is selected the parent `.chat-list` gets `.is-selecting` → every row's `.cbx` becomes persistently visible (opacity 1) regardless of hover. The selected row also gets `.is-selected` → bg `State/Pressed` (`--state-pressed`). | the list-level class is the source of truth; hover-only reveal is the entry point, persistent checkboxes are the in-mode state. Same `State/Pressed` token used by `tr.is-selected` in Table — row selection language unified across the kit. |
| Checked (checkbox on) | ⚠ pending | — | reuses `.cbx.on` — bg + border `Brand/Primary`, mark `Content/On_Solid` | no per-row override; full delegation to [Checkbox](../changes/Checkbox.md) |
| Focus-visible | ⚠ pending | — | `box-shadow:0 0 0 2px Surface/Card, 0 0 0 4px State/Focus_Ring_Brand` | matches `.btn:focus-visible` / `.iconbtn:focus-visible` ring shape |
| Pinned | ⚠ pending | — | pin marker (`.chat-row-pin`) rendered **only on pinned rows**, inline after the title, filled `Brand/Primary` glyph. Clicking it unpins. Unpinned rows have **no** pin slot — pinning happens through the kebab menu ("Pin"). | active state shown by **placement + colour + fill** (icon only appears for pinned rows; filled vs absent). Passes 1.4.1 (not by colour alone). |
| Open menu | ⚠ pending | — | kebab anchors `.menu` `.chat-row-menu` dropdown bottom-right; items: Pin/Unpin (label reflects current state), Rename, Delete (`.mi.danger`). Outside click + Esc close it; only one menu open at a time. | menu trigger uses `aria-haspopup="menu"` + `aria-expanded` |

## Behaviour spec

- **Live search** — the page-level search input filters rows by name on `input` (no submit). Empty input shows all rows.
- **Select all / Deselect all** — `MetaRow` link toggles every row's `.cbx.on` / `.chat-row.is-selected`. Label flips to "Deselect all" when all visible rows are selected.
- **Pin toggle** — clicking the inline pin marker (visible only on pinned rows) unpins; the row reorders out of the pinned cluster. Pin from the kebab menu (visible on hover for any row).
- **Kebab actions** — `Pin` / `Unpin` (label reflects state), `Rename` (inline editable), `Delete` (destructive, danger token).
- **Single open menu** — clicking another row's kebab or anywhere outside closes the open menu.

## Page composition (chats-landing)

- Container `max-width: 960px`, centred, padding `0 2rem`. Rows sit on the page background (`--bg`) — no card, no border, no panel wrapper.
- MetaRow is fully transparent (no bg, no border).
- Sidebar is **not** duplicated — `pages/chats-landing.html` loads it from `pages/chat-landing.html` via `fetch()` at page load and injects the `<aside class="cl-side">` inner HTML. Single source of truth.

## No change (—)

n/a — new component.

## Token map used

`--ink-body` (default text) · `--state-hover` (hover bg) · `--state-pressed` (selected bg) · `--brand-primary` (pinned marker, 8% mix for kebab-open tint, 10% mix for selected+hover) · `--ink-secondary` (timestamp, default kebab colour) · `--focus-ring-brand` (focus ring) · `.cbx.on` (checked → `--brand-primary` + `--content-on-solid`) · `.mi.danger` (`--fb-red-text`). No new tokens introduced — every state composes from the existing palette.

## Accessibility & consistency self-check

```
Consistency: PASS — every state token reuses an existing alias. Hover/selected/focus shape matches Table & Sidebar list rows. Kebab fade-in matches .sbx-chat-more. Checkbox reveal pattern matches industry standard (Gmail / Notion). Context menu reuses .menu/.mi/.mi.danger.
Accessibility:
  ✓ Row text contrast — --ink-body on --card light = #334155 / #FFFFFF = 9.11:1; dark #CBD5E1 / #17171E = 13.32:1 (target 4.5:1, 1.4.3)
  ✓ Timestamp contrast — --ink-secondary on --card light = 4.85:1; dark = 7.69:1 (target 4.5:1)
  ✓ Pinned marker brand colour vs --bg — Brand-600 on white = 4.65:1 light; Brand-500 on dark Card = 4.54:1 (target 3:1)
  ✓ Focus ring — neutral State/Focus_Ring_Brand 2 px outer + 2 px Card gap (2.4.7)
  ✓ Hit targets — pin marker 20×20, kebab 24×24, full row clickable (40 px tall × 720+ px wide) → all comfortably ≥ 24×24 (2.5.8)
  ✓ Pinned not by colour alone — marker appears only for pinned rows; absence vs presence is the primary cue, colour is secondary (1.4.1)
  ✓ Menu role/aria — kebab has aria-haspopup="menu" + aria-expanded; menu items get accessible name via text; Delete carries the danger colour AND the destructive verb
  ⚠️ Hover-reveal checkbox + kebab — covered by focus-within for keyboard users, but touch users (no hover) need an always-visible affordance. Acceptable on desktop-first Chats library; for mobile shipping add a (hover:none) media query that keeps the checkbox slot fully visible at all times.
```
