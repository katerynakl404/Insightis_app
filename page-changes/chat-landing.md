# chat-landing — Current vs Expected

Page: `pages/chat-landing.html` · Reference: `/chat` (captured live, signed-in — light only; dark is part of the expected delivery)

Chat landing hero: Sidebar shell + centered title + prompt composer (textarea, attach, Connectors, Gemini Pro, Send) + suggestion pills. The composer/pills/dropdowns layout mirrors prod; the deltas are title emphasis, background, the top-right cluster, and the component token migration.

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
| **Attach button** | Prod icon button | `iconbtn iconbtn-tertiary`, neutral `--state-hover`, brand focus ring | [IconButton.md](../changes/IconButton.md) |
| **Connectors / Gemini Pro dropdowns** | Prod dropdown triggers | `.cl-dd` trigger states + popover styling | [Dropdown.md](../changes/Dropdown.md) |

Colour tokens for all of the above resolve through the migrated palette → [colors.md](../changes/colors.md).

## Out of scope

- **Sidebar** redesign (3 nav rows — Sources, Metrics, Files — plus Pinned/Recent, footer): [Sidebar.md](../changes/Sidebar.md). Prod still shows 4 nav items (Sources, Metrics, Favorites, Chats); the new `Files` row is promoted from a tab inside the Data Sources page.

## A11y / consistency self-check

- Keyword highlight uses `--ink-highlight` (AA in both themes). ✓
- Send disabled state perceivable; pills/attach/dropdowns keep focus-visible rings (2.4.7). ✓
- Background is decorative (`pointer-events:none`, content layered above). ✓
- Verify in **both themes**. ✓

```
Consistency: PASS
Accessibility: PASS
```
