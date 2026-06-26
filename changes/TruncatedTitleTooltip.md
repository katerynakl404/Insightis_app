# TruncatedTitleTooltip — change

## Consumer changes (Expected)

| Surface | Prod (was) | Expected (became) | Why |
|---|---|---|---|
| **Sidebar — chat row** (`.sbx-chat`) | Wired: chat-row labels that overflow showed the full title in a tooltip on hover/focus (default `right` placement) | **Dropped.** No `title=` / no `TruncatedTitleTooltip` on `.sbx-chat`. The persistent right-edge gradient fade (`--chat-fade`, 36 px) already signals truncation; a tooltip duplicates the information without adding interaction value, and adds visual noise to a dense list. The kebab → `Rename` menu item gives users the same access to the full label when needed. | Sidebar is the densest list surface in the kit; reducing transient overlays keeps the column quiet. See [`Sidebar.md`](Sidebar.md) — *Chat row states › Default*. |

The component stays in the kit for other consumers (Chats Library row, breadcrumbs, anywhere a label can overflow). Only the **sidebar chat-row wiring** is removed.

## Reused component — Tooltip dimensions

TruncatedTitleTooltip has no surface of its own: when a label overflows it renders the full text inside the standard [`Tooltip`](Tooltip.md) bubble. The kit ships a **CSS-only** tooltip — the trigger element carries `data-tip="<full text>"` and the bubble is drawn by `[data-tip]::after` (`content:attr(data-tip)`). There is no Radix dependency; an optional JS engine (`<html class="tt-js">`) suppresses the CSS `::after` fallback and takes over positioning. A static demo class `.tt` (kit-theme.css line 741) reproduces the same chip for the storybook.

### Bubble — full reproduction (`[data-tip]::after`, kit-theme.css lines 748–767)

A developer can rebuild the bubble from these values alone — no need to open `Tooltip.md`:

| Property | Exact value |
|---|---|
| `content` | `attr(data-tip)` (the full untruncated label) |
| `position` | `absolute`; `z-index:9999` (clears all page-shell stacking contexts) |
| Default placement | **top** — `bottom:calc(100% + 5px); left:50%` (5px gap above the anchor) |
| Background | `var(--ink)` |
| Text color | `var(--card)` (theme-inverted chip) |
| Font-size | `.75rem` (12px, `text-xs`) |
| Font-family | `inherit` |
| Font-weight | **400** |
| Line-height | **1.35** |
| Border-radius | **6px** |
| Padding | **4px 8px** |
| `white-space` | `nowrap` |
| `pointer-events` | `none` |
| Rest state | `opacity:0`; `transform:translateX(-50%) translateY(3px)` |

### Reveal states & timing

| State | Selector | Behaviour |
|---|---|---|
| Rest (hidden) | `[data-tip]::after` | `opacity:0`, slid `translateY(3px)`; `transition:opacity .1s,transform .1s` (the **100ms leave**) |
| Cold enter | `[data-tip]:hover::after`, `[data-tip]:focus-visible::after` | `opacity:1`; `transform:…translateY(0)`; `transition:opacity .12s .3s,transform .12s .3s` — **300ms delay + 120ms** fade |
| Warm enter | `.tt-warm [data-tip]:hover::after` / `:focus-visible::after` | same target, `transition:opacity .12s,transform .12s` — **0ms delay + 120ms** fade (within the warm-up window after a recent tooltip) |
| JS active | `html.tt-js [data-tip]::after` (+ hover/side variants) | `display:none` — CSS fallback suppressed so the JS engine owns positioning |

### Placement variants (`data-tip-side`)

Default (no attribute) = **top**. Override via `data-tip-side="right|bottom|left"` on the trigger:

| Side | Rest position | Rest transform → enter transform |
|---|---|---|
| `right` | `bottom:auto; top:50%; left:calc(100% + 5px)` | `translateY(-50%) translateX(-3px)` → `translateX(0)` |
| `bottom` | `bottom:auto; top:calc(100% + 5px); left:50%` | `translateX(-50%) translateY(-3px)` → `translateY(0)` |

Each side variant repeats the cold (`.12s .3s`) / warm (`.12s`) transitions of the default. No arrow is rendered at any placement (intentional — proximity + slide-in are the cues at this scale).

> Reference line — Tooltip bubble: **bg `--ink` · text `--card` · 12px/400/1.35 · padding 4px 8px · radius 6px · 5px anchor offset · z-index 9999**. Full Tooltip spec: [`Tooltip`](Tooltip.md).

## Truncation trigger behaviour
The trigger is the truncated label element itself (no extra chrome): the consumer's text element gets `text-overflow:ellipsis` (or a gradient fade) plus the `data-tip="<full text>"` attribute. The bubble appears **only when the label is truncated** (`scrollWidth > clientWidth`, re-measured on hover/focus). It shows the **full untruncated string** and uses the kit default placement **top** (`[data-tip]::after`); a consumer may opt into `data-tip-side="right"` etc. No dimensions are added by the wrapper — it only conditionally exposes the `data-tip` attribute when overflow is detected.
