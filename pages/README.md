# pages/ — full-page examples (Current vs Expected)

Full-screen mockups **composed from the existing kit components**, so a developer sees how the
real screens look in the current production design vs the expected (new) design.

## Rules

- **Built from existing components only.** Reuse the same component classes/tokens as
  `../insightis-preview-kit.html` — do not redefine component styling per page. The shared theme +
  component CSS lives in **`kit-theme.css`** (extracted from the kit). Both the kit and every page
  link this one file, so components never drift.
- **Current vs Expected = the same `.prod` mechanism as the kit:**
  - Wrap the page root in `.prod` → renders with **current (prod)** component styles.
  - No `.prod` → renders with **expected** component styles.
  - Each page has a **Current / Expected** toggle (and the **Light / Dark** toggle), so one file
    shows both states of the same screen.
- Pure CSS, English, relative links, renders by double-click (no build / no external scripts).

## Files

- `kit-theme.css` — shared tokens + component CSS (single source of truth).
- One HTML file per screen. Each composes real components into a full layout.

| File | Screen | Key components |
|---|---|---|
| `chat-landing.html` | Chat landing (empty state / hero) | Sidebar (Expected only), Composer, Suggestion chips |
| `chat_page-landing.html` | Chat page (active conversation) | Sidebar (Expected only), Thread, Composer |
| `chats-landing.html` | Chats library | Sidebar (Expected only), ChatRow list, MetaRow, Search |
| `approved/data-sources_connections-landing.html` ✅ | Data Sources — Connections (sidebar `Sources` active) — **approved**, in-page Loaded/Skeleton toggle | Sidebar (Expected only), Banner, ConnectorGrid |
| `approved/data-sources_files-landing.html` ✅ | Files (sidebar `Files` active) — split off from Data Sources into a top-level route — **approved** | Sidebar (Expected only), FileList, drop zone |
| `approved/metrics-landing.html` ✅ | Metrics dashboard — **approved** | Sidebar (Expected only), KPI cards, SegmentedControl, Chart, Tabs, Table |
| `approved/user_profile-modal.html` ✅ | Account / Settings modal (Expected only) — **approved** | Sidebar with account popover open; clicking a nav item opens the full AccountModal dialog; left nav reuses `.sbx-pop-*` |

## How a page is composed

Example (conceptual): a chat screen = `Sidebar` (header brand + CTA, nav rows, Pinned/Recent chat
sections, footer tokens-meter + user row) + main `Table`/`Card` content + `Modal`/`Toast` overlays.
The Current view (`.prod`) shows the prod sidebar/components; the Expected view shows the redesigned
sidebar (per `../changes/Sidebar.md`) and expected component states — all from the same class set.

## Expected-differences sticker

Each page carries a small movable **note sticker** anchored bottom-right that lists,
as bullet points, the **names of every component changed in Expected** vs Current.
Each bullet is a `.link` to the matching `../changes/<Component>.md`. No prose, no
visual deltas — the changes file is the source of truth, the sticker is just the
quick index.

The sticker must be draggable with the mouse (inline `mousedown / mousemove / mouseup`
script — no libraries) and themed via the same kit tokens so it follows Light / Dark
/ `.prod` automatically.

## Responsive behaviour

Pages are responsive in two stages:

- **≥ 1024 px**: full layout — sidebar visible as a fixed-width column, main column takes the rest. The in-sidebar collapse trigger toggles icon-mode in place.
- **< 1024 px**: sidebar is **fully hidden** (no icon rail) and the topbar carries a **hamburger** (`.cl-burger`). Tap → sidebar slides in from the left as a **fixed-position overlay** (`min(18rem, 86vw)`) over the main column with a **full-viewport** semi-opaque backdrop (`inset:0`, `rgba(15,23,42,.45)` light / `rgba(2,6,23,.6)` dark, with a `backdrop-filter:blur(2px)`) dimming the whole page including the topbar. Tap the backdrop or the trigger inside the open sidebar to close. Same overlay/backdrop pattern Metrics uses for its right panel.
- **< 640 px**: main column tightens — title font-size, composer padding, and hero gap all shrink for narrow phones. Composer footer rows are allowed to wrap (`flex-wrap:wrap`) so the Send button can drop to its own row if the dropdown labels don't fit.
- **< 480 px**: composer dropdown labels (`.cl-dropdown-lbl` — "Connections", "Insightis Ultra") and the Send button label (`.cl-send-lbl`) collapse to **icon-only**. Glyphs + `aria-label` carry the meaning. Suggestion pills also tighten (h32, smaller padding + 12px font). Same icon-only-on-mobile pattern OpenAI's chat composer uses.

The implementation uses one root class (`html.side-open`) + the topbar's `<button class="cl-burger">` + a `<div class="cl-side-backdrop">` element. Toggle via an inline `onclick` plus a small auto-apply IIFE that drops `.side-open` whenever the viewport crosses back to desktop. See `chat-landing.html` for the working example; full contract documented in `../changes/Sidebar.md` → *Responsive behaviour*.

## Topbar / page chrome

Pages do **not** show the Insightis logo in their topbar — the page's title alone
identifies the screen, and the kit / pages aren't a branded surface in this repo.
The topbar stays compact: a single title `<span class="ttl">` on the left and the
`Current / Expected` + `Light / Dark` toggle buttons (`btn btn-outline btn-xs`) on
the right. Override the kit's default `.topbar{padding:.7rem 1.25rem}` to
`.375rem 1rem` in the page's `<style>` block so the chrome strip is ~40px tall, not
~54px.
