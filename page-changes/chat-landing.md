# chat-landing — Current vs Expected

Page: `pages/chat-landing.html` · Reference: `/chat` (captured live, signed-in — light only; dark is part of the expected delivery)

Chat landing hero: Sidebar shell + centered title + prompt composer (textarea, attach, Connections, Insightis Ultra, Send) + suggestion pills. The composer/pills/dropdowns layout mirrors prod; the deltas are title emphasis, background, the top-right cluster, the three designed composer dropdowns, and the component token migration.

> **Composer dropdowns are a kit component.** The Attach / Connections / Models menus use one unified class set (`.cl-dropdown` / `.cl-attach` triggers + `.cl-attach-menu` / `.cl-conn-menu` / `.cl-model-menu` internals) applied identically on **both** `chat-landing.html` and `chat_page-landing.html`. **All** of their CSS — triggers, menu anchoring, file chip, and menu internals — now lives in the **single source** `pages/kit-theme.css` and is catalogued in the storybook (`insightis-preview-kit.html` → **Composer dropdowns** / `#composer-menus`). Page `<style>` keeps only composer **layout** glue (`.cl-composer` / `.cl-prompt` / `.cl-send`) and per-page responsive reflow.

## Layout (Expected)

- Centered hero (max 680px): title, composer card, three suggestion pills.
- Background: **static** radial brand-tertiary glow (`.cl-shell` gradient + blurred `::before` pool); **frosted-glass** sidebar + composer (translucent `--card` + `backdrop-filter` blur).
- **No top-right icon cluster.**
- Themes: ships light + dark (`.dark` re-themes; the background mix differs per theme — see delta).

## Current → Expected delta

| Area | Current (.prod) | Expected | Component ref |
|---|---|---|---|
| **Hero title** | "What insight / are you looking for?" in one flat `Text/Primary` colour | Keywords **"insight"** and **"looking for"** wrapped in `.cl-kw`, coloured `--ink-highlight`, weight 600; rest stays weight 500 | — |
| **Background** | Flat `--bg`; opaque sidebar + composer | Radial brand-tertiary glow on `.cl-shell` + blurred `::before` pool (static); frosted-glass sidebar/composer (`--card` 78%/72% + `backdrop-filter` blur 14/10px). **Light:** glow 2% → ::before 8%. **Dark:** 4% → 18%, blur 70px | — |
| **Top-right icons** | Three circular icon-buttons: help, notifications, share | **Removed** (absent by design, not un-mocked) | [IconButton.md](../changes/IconButton.md) |
| **Composer states** | Prompt card with textarea + footer controls | Hover → border `--border-hover`; focus-within → border `--input-focus` (no shadow); textarea stays chromeless | [TextArea.md](../changes/TextArea.md) |
| **Send button** | Prod primary button | Primary flattens gradient → solid `--btn-primary-bg` fill + `--btn-primary-hover`; disabled until textarea has text | [Button.md](../changes/Button.md) |
| **Suggestion pills** | Prod secondary pills | `btn btn-secondary` (`.cl-pill`) per secondary spec (fill/border/hover) | [Button.md](../changes/Button.md) |
| **Attach button + menu** | Prod icon button, long tooltip, no designed menu | `iconbtn iconbtn-tertiary`, neutral `--state-hover`, brand focus ring. Tooltip shortened to **"Add file"** (system warm-up delay, 300 ms); the tooltip is **suppressed while the menu is open** (`aria-expanded="true"`) and hidden on click, so the hover tooltip never overlaps the open menu. Menu (`.cl-attach-menu`, fixed **M** width 18rem + default **4px** menu padding — see the menu size system below): a **"Choose File" menu-item row** (`.mi` + upload `.mi-ic`, `--ink-highlight` brand colour + medium weight — **not** a bordered button, so it doesn't dominate the popover or double-up a border against the divider; it gets the same padding/breathing room as every row. The leading icon + brand colour make it scan instantly as the primary action), then a **full-width `.menu-sep` divider** (1px, spans edge-to-edge) separating the upload action from the recent-files list. Then a **"Recent files"** heading (`.cl-menu-label`, styled as a **quiet overline mirroring the sidebar section label `.sbx-sect-label`** — 10px / weight 600 / `.08em` tracking / UPPERCASE / `--ink-inactive` muted slate; caps are display-only via `text-transform`, markup text stays sentence case) over the recent-files list — **each row carries a file glyph** (`.mi-ic`) so the list reads unmistakably as files, with the name in `.cl-file-name` (regular weight, **`--ink`** — darker for legibility, single-line ellipsis). Every row shares one icon column (Choose File + each file), so the popover reads as a clean aligned left column, not a ragged icon-indent. Single-file rule: after a file is loaded the icon goes **`aria-disabled`** (still hoverable → tooltip **"Only one file allowed"**) and the file shows as a removable chip (`.cl-file-chip`) **above the input** (top of the composer, hugging its content — not down in the tools row) | [IconButton.md](../changes/IconButton.md) · [Dropdown.md](../changes/Dropdown.md) |
| **Connections menu** | Prod dropdown trigger, flat source list | `.cl-dropdown` trigger states + `.cl-conn-menu` (fixed **M** width 18rem + default **4px** menu padding; **no section label**). Each row is source logo (`.logo-spr`, **24 px**, 4px-grid) + connection **name only** (no connector-type subtext) + an on/off **toggle** (kit `.swt is-sm`) to include/exclude that source. Rows are **single-line → compact** (4 px vertical padding, distinct from the 2-line model rows at 8 px). **No "Suggested" group** (removed). A **full-width divider** with **6px breathing room** below the connection list (flush only while the list is scrolling, so scrolling never reveals a white strip), then the footer **"Manage Connections"** link → connections page (its gear sits in the same 24 px leading column as the logos so all row text shares one left edge) | [Dropdown.md](../changes/Dropdown.md) |
| **Models menu** | Prod dropdown trigger | `.cl-dropdown` trigger states + `.cl-model-menu` (fixed **M** width 18rem + default **4px** menu padding): two **first-party** models — **Insightis Light** ("Fast, everyday answers") + **Insightis Ultra** ("Deepest reasoning & analysis"), **Light selected by default** (the fast everyday model is the entry default; trigger label + `aria-checked` reflect Light). Each row = Insightis brand mark + name + description; **single-select** (`role="menuitemradio"`, `aria-checked`). The selected row is signalled by a **`--ink-highlight` check only** — **no background fill** (transparent row, normal `.mi` hover), and the model **name stays `--ink`** (no accent recolour). Model logo is the inline brand mark (`<svg class="cl-model-logo"><use href="#lg-mark"/></svg>`, **24 px**, `currentColor` → `--brand-primary`) | [Dropdown.md](../changes/Dropdown.md) |

Colour tokens for all of the above resolve through the migrated palette → [colors.md](../changes/colors.md).

## Popover list states — concept exploration

The **Connections** and **Add-file** popovers have three list states — **empty · filled · scrolling** — under exploration via a **concept switcher** (kit `SegmentedControl`, design-review only). It lives in the **page topbar** (`.tb-concept`, top of page alongside the "In redesign" tag + Light/Dark toggle — never in the content; compact `SegmentedControl is-sm`, content-width), on **both** `chat-landing.html` and `chat_page-landing.html`. Selecting a state re-renders the **live composer popovers**:

- **Empty** → `.cl-menu-empty`: a modern centered stack — a **tinted icon chip** (`--icon-wrapper-bg`), a **title** (`No connections yet` / `No recent files`), **helper text** (no trailing period; `text-wrap:balance` so no single word orphans onto its own line), then a **CTA** (kit `btn-secondary btn-sm`) — Connections → **Create Connection** (connections page); Files → **Choose File** (upload). Compact sizing — the empty menu drops to **15rem** (240px, vs the 18rem filled menu) via `:has(.cl-menu-empty)`, with a 28px icon chip and 12px padding, so it isn't a big mostly-blank box. The surrounding chrome is hidden while empty — Files' top Choose File row + divider + the "Recent files" heading, Connections' Manage footer + separator — so the empty state reads as one clean, centered action; all restored for filled/scrolling. (Connections has no section label; Files keeps a "Recent files" heading.)
- **Filled** → the 3 sample rows (this is the page's default — the popovers ship filled).
- **Scrolling** → rows in `.cl-menu-scroll` (heading + footer pinned). The composer popover opens **upward**, so `clFitMenu` (page JS) caps the row region to the **space above the trigger** — it scrolls **earlier** when space is tight and the popover **never slides under the topbar** (up to ~10 rows where height allows). Minimalist scrollbar: a ~4px **floating thumb** (`--border`, inset via `background-clip:padding-box`; darkens to `--ink-inactive` on hover) with no track channel — not the chunky default bar.

The switcher is a concept control (design-review only, not product UI); the live popovers ship in the **filled** state.

### Add-file behaviour — two concepts

A **second topbar switcher** (`.tb-concept`, label "Add-file", `SegmentedControl is-sm`) toggles how the Add-file icon behaves **when there are no recent files** (visible only against the **Empty** popover-state):

- **Concept 1 · Direct** — with no recent files, clicking the Add-file icon **opens the file picker directly** (no popover). Once recent files exist (Filled / Scrolling), the icon opens the menu as normal. Rationale: the empty menu adds a click for the one action a first-time user wants (upload), so skip it.
- **Concept 2 · Menu** *(current / default)* — the icon **always opens the menu**; when empty it shows the centered empty-state card (icon + "No recent files" + "Choose File" CTA).

Wiring (page JS): `clBehavior` (`'c1'`/`'c2'`, default `c2`) + `clPopState` track the two concept axes; `clAttachToggle` short-circuits to `clChooseFile()` when `clBehavior==='c1' && clPopState==='empty'`. Both switchers live on `chat-landing.html` and `chat_page-landing.html`. Design-review only — production ships **Concept 2**.

The composer popovers no longer carry the `.menu-wip` "In redesign" stub — it was removed so the popover design reads clean and can be evaluated. (The page-level "In redesign" topbar tag stays.)

## Out of scope

- **Sidebar** redesign (4 nav rows — New Chat, Data Sources, Metrics, Files — plus Pinned/Recent chat sections, footer): [Sidebar.md](../changes/Sidebar.md). Prod still shows 4 nav items (Sources, Metrics, Favorites, Chats); the new `Files` row is promoted from a tab inside the Data Sources page, and the prod `Chats` collapsible group is replaced by the inline Pinned/Recent sections.

## A11y / consistency self-check

- Keyword highlight uses `--ink-highlight` (AA in both themes). ✓
- Send disabled state perceivable; pills/attach/dropdowns keep focus-visible rings (2.4.7). ✓
- Background is decorative (`pointer-events:none`, content layered above). ✓
- Verify in **both themes**. ✓

```
Consistency: PASS
Accessibility: PASS
```
