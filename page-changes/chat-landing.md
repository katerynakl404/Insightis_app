# chat-landing — Current vs Expected

Page: `pages/chat-landing.html` · Reference: `/chat` (captured live, signed-in — light only; dark is part of the expected delivery)

Chat landing hero: Sidebar shell + centered title + prompt composer (textarea, attach, Connections, Gemini Pro, Send) + suggestion pills. The composer/pills/dropdowns layout mirrors prod; the deltas are title emphasis, background, the top-right cluster, the three designed composer dropdowns, and the component token migration.

> **Composer dropdowns are shared.** The Attach / Connections / Models menus below use one unified class set (`.cl-dropdown` triggers + `.cl-attach-menu` / `.cl-conn-menu` / `.cl-model-menu` internals) applied identically on **both** `chat-landing.html` and `chat_page-landing.html`. The menu-internal CSS lives once in `pages/kit-theme.css`; the triggers live in each page's `<style>` alongside the rest of the composer chrome.

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
| **Attach button + menu** | Prod icon button, long tooltip, no designed menu | `iconbtn iconbtn-tertiary`, neutral `--state-hover`, brand focus ring. Tooltip shortened to **"Add file"** (system warm-up delay, 300 ms). Menu (`.cl-attach-menu`, **280 px**): secondary **"Choose File"** button (`btn-secondary btn-sm`) + a plain **Recent files** text list (no icons). Single-file rule: after a file is loaded the icon goes **`aria-disabled`** (still hoverable → tooltip **"Only one file allowed"**) and the file shows as a removable chip (`.cl-file-chip`) | [IconButton.md](../changes/IconButton.md) · [Dropdown.md](../changes/Dropdown.md) |
| **Connections menu** | Prod dropdown trigger, flat source list | `.cl-dropdown` trigger states + `.cl-conn-menu` (**280 px** — unified with Models). Two groups: **Your connections** (name = primary, connector type = secondary, each row carries an on/off **toggle** — kit `.swt is-sm` — to include/exclude that source) then **Suggested**, divided by `.menu-sep`; footer **"Manage Connections"** link → connections page (its gear sits in the same 24 px leading column as the logos so all row text shares one left edge). Suggested rows are **links** (`<a>`) that **open the connection window** (connections page), each ending in a **"Connect" outlined pill** (`.cl-conn-add`, revealed on row hover/focus). Connector logos via `.logo-spr` (**24 px**, 4px-grid) | [Dropdown.md](../changes/Dropdown.md) |
| **Models menu** | Prod dropdown trigger | `.cl-dropdown` trigger states + `.cl-model-menu` (**280 px**): provider logo + name + description per row; **single-select** (`role="menuitemradio"`, `aria-checked`). The selected row gets a **persistent brand-tinted surface** (`--state-pressed`) that hover does not override, plus a check + brand-coloured name. Provider logos render via `<img>` (**24 px**) — `gemini.svg` uses a mask+pattern+embedded raster that fails to paint as a CSS background, and its root was missing the `xmlns:xlink` declaration (fixed in the asset) | [Dropdown.md](../changes/Dropdown.md) |

Colour tokens for all of the above resolve through the migrated palette → [colors.md](../changes/colors.md).

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
