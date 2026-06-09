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
- One HTML file per screen, e.g. `dashboard.html`, `chat-sidebar.html`, `settings.html`,
  `empty-state.html`, `form.html`. Each composes real components into a full layout.

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

## Topbar / page chrome

Pages do **not** show the Insightis logo in their topbar — the page's title alone
identifies the screen, and the kit / pages aren't a branded surface in this repo.
The topbar stays compact: a single title `<span class="ttl">` on the left and the
`Current / Expected` + `Light / Dark` toggle buttons (`btn btn-outline btn-xs`) on
the right. Override the kit's default `.topbar{padding:.7rem 1.25rem}` to
`.375rem 1rem` in the page's `<style>` block so the chrome strip is ~40px tall, not
~54px.
