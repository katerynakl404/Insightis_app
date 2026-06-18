# TruncatedTitleTooltip — change

## Consumer changes (Expected)

| Surface | Prod (was) | Expected (became) | Why |
|---|---|---|---|
| **Sidebar — chat row** (`.sbx-chat`) | Wired: chat-row labels that overflow showed the full title in a tooltip on hover/focus (default `right` placement) | **Dropped.** No `title=` / no `TruncatedTitleTooltip` on `.sbx-chat`. The persistent right-edge gradient fade (`--chat-fade`, 36 px) already signals truncation; a tooltip duplicates the information without adding interaction value, and adds visual noise to a dense list. The kebab → `Rename` menu item gives users the same access to the full label when needed. | Sidebar is the densest list surface in the kit; reducing transient overlays keeps the column quiet. See [`Sidebar.md`](Sidebar.md) — *Chat row states › Default*. |

The component stays in the kit for other consumers (Chats Library row, breadcrumbs, anywhere a label can overflow). Only the **sidebar chat-row wiring** is removed.
