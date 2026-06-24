# Chip — prod → expected

Single-select filter pill. Pill shape (radius `full`), height `1.75rem` (28px).

| State | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Default | bg transparent, border `Stroke/Border` `#F0F5FA`, text `--ink-body` | — | bg `--card`, border `--border`, text `--ink-body` | Card surface with light border at rest |
| Hover | bg `State/Hover`, border `--border-hover`, text `--ink` | — | bg `State/Hover`, no border | Hover surface, still no border |
| **Active (selected)** | bg `color-mix(Brand/Primary @20%, transparent)` · border `--p-primary` · text `--p-primary` — **alpha tint** | — | bg `--state-pressed` · border `--ink-highlight` · text `--ink-highlight`; `cursor: default` — no hover | Outlined + pressed-surface fill; active is non-interactive (locked state) |
| Active · Hover | same teal alpha tint | — | locked — same as Active | Active chip has no hover state |
| Focus | browser default (no ring) | — | ring `0 0 0 2px --card, 0 0 0 4px --focus-ring-brand` | Brand-tinted focus ring; matches Button / IconButton |
| Disabled | `opacity: .5` | — | `opacity: var(--opacity-disabled)` (.65) | Reusable token; .65 chosen to remain legible |
| `.chip-n` count | `--ink-inactive` rest · alpha-tint text when active | — | `--ink-inactive` rest · 70% `--ink-highlight` when active | Matches the active border/text token |

## Container — responsive behaviour

| | Prod (Current) | Expected |
|---|---|---|
| `.chip-row` on ≤ 767 px (tablet + mobile) | wraps to multiple lines | single-line horizontal scroll — `flex-wrap:nowrap; overflow-x:auto; scrollbar-width:none`; native scrollbar hidden |
| `.chip-row` edge fade | none | **scroll-driven only.** JS sets `data-chip-scroll` = `none \| start \| middle \| end`; the CSS `mask-image` shows the fade **only while the row overflows** — right edge at `start`, both edges in `middle`, left edge at `end`, **no fade when it fits** (`none`). `padding-inline-end:2.5rem` applied only in the scrolling states so the last chip clears the fade. Recomputed on scroll, content change (`MutationObserver`), and resize. |
| `.prov-card .chip-row` at any width | wraps freely | **unchanged — always wraps** (higher specificity; hard requirement) |

## No change (—)
Radius `full`, height `1.75rem` (28px), padding `0 .75rem`, font `.8125rem` / weight 500, hover surface `State/Hover`.
