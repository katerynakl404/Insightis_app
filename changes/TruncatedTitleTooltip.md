# TruncatedTitleTooltip — change

## Consumer changes (Expected)

| Surface | Prod (was) | Expected (became) | Why |
|---|---|---|---|
| **Sidebar — chat row** (`.sbx-chat`) | Wired: chat-row labels that overflow showed the full title in a tooltip on hover/focus (default `right` placement) | **Dropped.** No `title=` / no `TruncatedTitleTooltip` on `.sbx-chat`. The persistent right-edge gradient fade (`--chat-fade`, 36 px) already signals truncation; a tooltip duplicates the information without adding interaction value, and adds visual noise to a dense list. The kebab → `Rename` menu item gives users the same access to the full label when needed. | Sidebar is the densest list surface in the kit; reducing transient overlays keeps the column quiet. See [`Sidebar.md`](Sidebar.md) — *Chat row states › Default*. |

The component stays in the kit for other consumers (Chats Library row, breadcrumbs, anywhere a label can overflow). Only the **sidebar chat-row wiring** is removed.

## Reused component — Tooltip dimensions

TruncatedTitleTooltip has no surface of its own: when a label overflows it renders the full text inside the standard [`Tooltip`](Tooltip.md) bubble (`.tt`). Exact bubble dimensions from `kit-theme.css` line 738:

| Aspect | Selector | Exact value |
|---|---|---|
| Bubble padding | `.tt` | **4px 8px** |
| Bubble radius | `.tt` | **6px** |
| Bubble font-size | `.tt` | **.75rem (12px)** (`text-xs`) |
| Bubble colors | `.tt` | bg `var(--ink)`, text `var(--card)` (theme-inverted chip) |
| Offset from anchor | `[data-tip][...side]` | **5px** gap on the active side (e.g. `top:calc(100% + 5px)`, lines 780–784) |
| Enter / leave timing | `[data-tip]::after` | cold enter **300ms delay + 120ms** fade; warm enter **0ms + 120ms**; leave 100ms (lines 769–777) |

> Reference line — Tooltip: **padding 4px 8px · radius 6px · 12px text · 5px anchor offset**. Full spec: [`Tooltip`](Tooltip.md).

## Truncation trigger behaviour
The trigger is the truncated label element itself (no extra chrome): the consumer's text element gets `text-overflow:ellipsis` (or a gradient fade) and a `title=` / Radix tooltip wiring. The tooltip shows the **full untruncated string** on hover/focus, default placement per consumer (sidebar previously used `right`; the kit default elsewhere is `top`). No dimensions are added by the wrapper — it only conditionally mounts the Tooltip above when overflow is detected.
