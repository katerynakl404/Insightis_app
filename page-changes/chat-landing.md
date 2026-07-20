# chat-landing — Current vs Expected

Page: `pages/approved/chat-landing.html` · Reference: `/chat` (captured live, signed-in — light only; dark is part of the expected delivery)  
**Status:** ✅ Approved (погоджено) — 2026-07-10

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
| **Attach button + menu** | Prod icon button, long tooltip, no designed menu | `iconbtn iconbtn-tertiary`, neutral `--state-hover`, brand focus ring. Tooltip **"Attach file"** (system warm-up delay, 300 ms); the tooltip is **suppressed while the menu is open** (`aria-expanded="true"`) and hidden on click, so the hover tooltip never overlaps the open menu. Menu (`.cl-attach-menu`, fixed **16rem** width + default **4px** menu padding — same fixed width across all states): a **"Choose File" menu-item row** (`.mi` + upload `.mi-ic`, `--ink-highlight` brand colour + medium weight — **not** a bordered button, so it doesn't dominate the popover or double-up a border against the divider; it gets the same padding/breathing room as every row. The leading icon + brand colour make it scan instantly as the primary action), then a **full-width `.menu-sep` divider** (1px, spans edge-to-edge) separating the upload action from the recent-files list. Then a **"Recent files"** heading (`.cl-menu-label`, styled as a **quiet overline mirroring the sidebar section label `.sbx-sect-label`** — 10px / weight 600 / `.08em` tracking / UPPERCASE / `--ink-inactive` muted slate; caps are display-only via `text-transform`, markup text stays sentence case) over the recent-files list — **each row carries a file glyph** (`.mi-ic`) so the list reads unmistakably as files, with the name in `.cl-file-name` (regular weight, **`--ink`** — darker for legibility, single-line ellipsis). Every row shares one icon column (Choose File + each file), so the popover reads as a clean aligned left column, not a ragged icon-indent. Single-file rule: after a file is loaded the icon goes **`aria-disabled`** (still hoverable → tooltip **"Only one file allowed"**) and the file shows as a removable chip (`.cl-file-chip`) **above the input** (top of the composer, hugging its content — not down in the tools row). The chip **follows the prod chat chip** (verified live) but is tuned more compact: a generic lucide **`file`** glyph in **`--brand-primary`** teal (**18px**) + a two-line meta block — **name** (`--ink`, 12px/500, single-line ellipsis) over **file size** (`--ink-secondary`, 10px/500, e.g. "5.7 KB") — then a **larger `×`** remove button (18px glyph in a 1.5rem hit target). Transparent fill, hairline `--border`, `--radius-inner` (4px) corners, 4×8 padding, max-width 13rem | [IconButton.md](../changes/IconButton.md) · [Dropdown.md](../changes/Dropdown.md) |
| **Connections menu** | Prod dropdown trigger, flat source list | `.cl-dropdown` trigger states + `.cl-conn-menu` (fixed **16rem** width + default **4px** menu padding; **no section label**). Each row is source logo (`.logo-spr`, **24 px**, 4px-grid) + connection **name only** (no connector-type subtext) + an on/off **toggle** (kit `.swt is-sm`) to include/exclude that source. Rows are **single-line → compact** (4 px vertical padding, distinct from the 2-line model rows at 8 px). **No "Suggested" group** (removed). A **full-width divider** with **6px breathing room** below the connection list (flush only while the list is scrolling, so scrolling never reveals a white strip), then the footer **"Manage Connections"** link → connections page (its gear sits in the same 24 px leading column as the logos so all row text shares one left edge) | [Dropdown.md](../changes/Dropdown.md) |
| **Models menu** | Prod dropdown trigger | `.cl-dropdown` trigger states + `.cl-model-menu` (fixed **16rem** width + default **4px** menu padding): two **first-party** models — **Insightis Light** ("Fast, everyday answers") + **Insightis Ultra** ("Deepest reasoning & analysis"), **Light selected by default** (the fast everyday model is the entry default; trigger label + `aria-checked` reflect Light). Each row = Insightis brand mark + name + description; **single-select** (`role="menuitemradio"`, `aria-checked`). The selected row is signalled by a **`--ink-highlight` check only** — **no background fill** (transparent row, normal `.mi` hover), and the model **name stays `--ink`** (no accent recolour). Model logo is the inline brand mark (`<svg class="cl-model-logo"><use href="#lg-mark"/></svg>`, **24 px**, `currentColor` → `--brand-primary`) | [Dropdown.md](../changes/Dropdown.md) |

Colour tokens for all of the above resolve through the migrated palette → [colors.md](../changes/colors.md).

## Popover list states — concept exploration

The composer popovers have four states — **loading · empty · filled · scrolling** — under exploration via a **concept switcher** (kit `SegmentedControl`, design-review only). It lives in the **page topbar** (`.tb-concept`, top of page alongside the "In redesign" tag + Light/Dark toggle — never in the content; compact `SegmentedControl is-sm`, content-width), on **both** `chat-landing.html` and `chat_page-landing.html`. Selecting a state re-renders the **live composer popovers** (loading covers all three — Add-file, Connections **and** Models; empty/filled/scrolling apply to the Add-file + Connections lists):

- **Loading** → the **async** popovers (Add-file, Connections) show **skeleton rows** (kit [Skeleton](../changes/Skeleton.md) `.skel`, shimmer) in place of the row region, with the **chrome pinned** (Choose File / "Recent files" heading / divider / Manage Connections stay). **Models has no loader** — its rows are known client-side (Insightis Light / Ultra), so it renders immediately. Each skeleton row **reuses the same `.mi.<row>` class** as its loaded counterpart (`.cl-file-item` / `.cl-conn-item`) so padding + line-height — and therefore height — match exactly: the popover has an **identical footprint loaded vs loading (Δ = 0px, verified)** and never jumps when content arrives (3 skeleton rows each). Skel placeholders are non-interactive (`pointer-events:none`), dimensions inline per the kit Skeleton pattern. **On open the popover always paints the skeleton first**, then resolves to the target state after a short simulated load (`clSimOpen` → skeleton, `setTimeout` → `clRenderX(clPopState)`) — so the skeleton genuinely precedes content. Because all states share the **fixed 16rem width** **and the chrome stays pinned even when the result is empty**, the resolve is a pure content swap with no resize and no dropped Choose File row (whether it lands on empty or filled).
- **Empty** → `.cl-menu-empty` in the row region: a centered stack — a **tinted icon chip** (`--icon-wrapper-bg`), a **title** (`No connections yet` / `No recent files`), **helper text** (no trailing period; `text-wrap:balance` so no single word orphans onto its own line). **The chrome stays** (unlike before): Files keeps its top Choose File row + divider + "Recent files" heading; Connections keeps its divider + Manage Connections footer. Those existing controls **are** the action, so the empty message carries **no separate CTA** (removing the duplicate Choose File / Create Connection button). Keeping the chrome is what prevents the **loading→empty jump** — a skeleton shows before load and can't know it'll come back empty, so the Choose File row must not appear (skeleton/filled) then vanish (empty). Same **16rem width** as every state.
- **Filled** → the 3 sample rows (this is the page's default — the popovers ship filled).
- **Scrolling** → rows in `.cl-menu-scroll` (heading + footer pinned). The composer popover opens **upward**, so `clFitMenu` (page JS) caps the row region to the **space above the trigger** — it scrolls **earlier** when space is tight and the popover **never slides under the topbar** (up to ~10 rows where height allows). Minimalist scrollbar: a ~4px **floating thumb** (`--border`, inset via `background-clip:padding-box`; darkens to `--ink-inactive` on hover) with no track channel — not the chunky default bar.

The switcher is a concept control (design-review only, not product UI); the live popovers ship in the **filled** state.

### Choose File style — finalized: Row

The Add-file icon **always opens the popover** — it never opens a file picker directly (no "add file without the window"). Choose File inside the popover is the **brand `.mi` row** (`.mi cl-attach-choose`, upload icon + `--ink-highlight`), sharing the file-row left edge. Opening: empty → centered empty-state card; filled/scrolling → recent-files list. `clAttachToggle` opens the popover.

> **Resolved — Version 1 (Row) is the sole style.** An earlier exploration added a Version 2 · Button (full-width `.btn.btn-secondary.btn-sm`) toggled by a topbar `.tb-concept` switcher. Both the Button variant and the switcher are **removed** from `chat-landing.html` + `chat_page-landing.html` (page JS `clBehavior` / `clSetBehavior` / `clApplyChooseStyle` deleted). Row is the only, production style.

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
