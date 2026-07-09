# chats-landing — Current vs Expected

Page: `pages/chats-landing.html` · Reference: `/chats` (captured live, signed-in)

Chats Library list page: Sidebar shell + "Chats Library" heading + search + meta row (count / selection toolbar) + chat-row list (or empty state).

## Layout (Expected)

- Centered **960px** column (`--content-max-width`), padding `0 2rem`; chat rows sit on the page bg (`--bg`) as discrete `--card` items — **no outer card/border wrapper**.
- Search `.field`: leading magnifier + trailing custom **clear ✕** (shown only when filled), live filter on input. **No favorites toggle.**
- Meta row (transparent): default = "N conversation(s)" + **Select** link; selection mode = "N selected" + Select all / Deselect all + **Delete** (danger) + **✕** cancel. Hidden when the list is empty. While a selection is active it pins `position:sticky;top:40px` below the topbar (`.cl-meta-sticky`, `background:var(--bg)` so scrolling rows can't show through, no border), so it stays reachable while the list scrolls — same treatment as the Data Sources (Files) meta row.
- Rows (ChatRow): hover/focus reveals checkbox + kebab; inline filled pin marker on pinned rows only; kebab = Pin/Unpin · Select · Rename (inline) · Delete (danger).
- Empty: **no chats** = bubble icon + "No conversations yet" + secondary "New Chat"; **no match** = magnifier + "No matches" (no CTA).
- Themes: ships light + dark; background stays flat `--bg` in both (no background change).

## Current → Expected delta

| Area | Current (.prod) | Expected | Component ref |
|---|---|---|---|
| **Container / layout** | Meta row and list each wrapped in their own bordered, rounded card; content fills the full main width | No cards/borders; centered 960px column; rows on the page bg, 6px gap | [ChatRow.md](../changes/ChatRow.md) *(page composition)* |
| **Page title** | "Chats Library" as a large display heading | Same text on the `.cl-page-title` scale: weight 500, `1.5rem` → `1.875rem` (≥768px), `Text/Primary`, left | — |
| **Search** | Field + a separate trailing circular **"Show favorites only"** star button | Field + inline **clear ✕** (filled-only), live filtering; **star removed** | — |
| **Meta row** | Always visible, even at 0: "0 conversations · **Select all**" inside a bordered strip | Transparent; default "N conversation(s)" + **Select** (enters mode); selection mode adds Select all/Deselect all + Delete-danger + ✕; **hidden when empty** | [MetaRow.md](../changes/MetaRow.md) |
| **Empty state** | One state inside the list card: "Ready to explore your data?" + **primary** "Start New Chat" (→ `/chat`) | No card; **two** states — *no chats* (bubble + "No conversations yet" + **secondary** "New Chat") and *no match* (magnifier + "No matches", no CTA) | [ChatRow.md](../changes/ChatRow.md) |
| **Chat rows** ⚠️ verify | Not captured — test account has 0 chats; prod *does* support selection ("Select all"), so rows already carry a checkbox affordance | Transparent 40px row (radius 6px); hover→`State/Hover` reveals checkbox+kebab; `.is-selecting`→persistent checkboxes; selected→`State/Pressed`; inline pin marker (pinned only); kebab menu; focus ring | [ChatRow.md](../changes/ChatRow.md) |
| **Favorites filter** | On-page "Show favorites only" star toggle (plus Favorites in sidebar) | On-page toggle **removed** — Favorites is its own destination | — |

⚠️ **Re-capture needed:** open `/chats` with ≥1 conversation, capture the rendered row DOM, and fill the row-level Current cells in `../current/ChatRow.md` + `../changes/ChatRow.md` so the row diff is measured, not assumed.

## Out of scope

- **Sidebar** redesign (3 nav rows — Sources, Metrics, Files — plus Pinned/Recent, compact footer): [Sidebar.md](../changes/Sidebar.md) — the page links the sidebar from `chat-landing.html` rather than redefining it.

## A11y / consistency self-check

- Row text / timestamp / pin-marker / `.link` action contrast verified light + dark per [ChatRow.md](../changes/ChatRow.md) / [MetaRow.md](../changes/MetaRow.md). ✓
- Selection & pinned not by colour alone (label flip "Select all"↔"Deselect all"; pin shown by presence) (1.4.1). ✓
- Focus-visible rings on rows, clear button, meta actions (2.4.7). ✓
- Verify in **both themes**. ✓

```
Consistency: PASS
Accessibility: PASS (row visuals pending live-capture — ⚠️ verify)
```
