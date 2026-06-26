# Chip — prod → expected

Single-select filter pill. Pill shape (radius `full`), height `1.75rem` (28px).

| State | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Default | bg transparent, border `Stroke/Border` `#F0F5FA`, text `--ink-body` | — | bg `--card`, border `--border`, text `--ink-body` | Card surface with light border at rest |
| Hover | bg `State/Hover`, border `--border-hover`, text `--ink` | — | bg `--state-hover`, text `--ink`; border unchanged (rest 1px `--border` persists) | Only bg + text shift on hover; the 1px `--border` stays (it is never removed) |
| Pressed (`:active` / `.s-pressed`) | — | — | bg `--state-pressed`, text `--ink`; border unchanged | Transient press feedback; deeper surface than hover, same `--border` |
| **Active (selected)** | bg `color-mix(Brand/Primary @20%, transparent)` · border `--p-primary` · text `--p-primary` — **alpha tint** | — | bg `--state-pressed` · border `--ink-highlight` · text `--ink-highlight`; `cursor: default` — no hover. Selector: `.chip.is-active`, `.chip[aria-pressed="true"]` | Outlined + pressed-surface fill; active is non-interactive (locked state) |
| Active · Hover | same teal alpha tint | — | locked — same as Active | Active chip has no hover state |
| Focus | browser default (no ring) | — | ring `0 0 0 2px --card, 0 0 0 4px --focus-ring` | Brand-tinted focus ring; matches Button / IconButton |
| Disabled | `opacity: .5` | — | `opacity: var(--opacity-disabled)` (.65) | Reusable token; .65 chosen to remain legible |
| `.chip-n` count | `--ink-inactive` rest · alpha-tint text when active | — | `--ink-inactive` rest · 70% `--ink-highlight` when active | Matches the active border/text token |

## Container — responsive behaviour

| | Prod (Current) | Expected |
|---|---|---|
| `.chip-row` on ≤ 767 px (tablet + mobile) | wraps to multiple lines | single-line horizontal scroll — `flex-wrap:nowrap; overflow-x:auto; scrollbar-width:none`; native scrollbar hidden |
| `.chip-row` edge fade | none | **scroll-driven only.** JS sets `data-chip-scroll` = `none \| start \| middle \| end`; the CSS `mask-image` shows the fade **only while the row overflows** — right edge at `start`, both edges in `middle`, left edge at `end`, **no fade when it fits** (`none`). `padding-inline-end:2.5rem` applied only in the scrolling states so the last chip clears the fade. Recomputed on scroll, content change (`MutationObserver`), and resize. |
| `.prov-card .chip-row` at any width | wraps freely | **unchanged — always wraps** (higher specificity; hard requirement) |

## DOM / markup

`.chip` is a `<button type="button">` (filter pills use `role="tab"` + `aria-selected` + `aria-pressed`; active pill carries `is-active` and/or `aria-pressed="true"`). Optional trailing count is a `<span class="chip-n">N</span>` placed inside the button after the label text. Container is `<div class="chip-row">` (filter sets add `role="tablist"` + `aria-label`).

## Base box (`.chip`)

`display:inline-flex; align-items:center; gap:.375rem`. Height `1.75rem` (28px), padding `0 .75rem`, `border-radius:9999px` (full). Font: `.8125rem` (13px) / weight `500` / `font-family:inherit`. `white-space:nowrap`. Rest: `border:1px solid var(--border)`, `background:var(--card)`, `color:var(--ink-body)`, `cursor:pointer`. Transition: `background .12s, color .12s, border-color .12s`.

States — full token map (CSS-accurate):

- Hover (`:hover`, `.s-hover`): `background:var(--state-hover); color:var(--ink)` — no border or radius change.
- Pressed (`:active`, `.s-pressed`): `background:var(--state-pressed); color:var(--ink)`.
- Active (`.is-active`, `[aria-pressed="true"]`): `background:var(--state-pressed); color:var(--ink-highlight); border-color:var(--ink-highlight); cursor:default`.
- Active hover (`.is-active:hover`, `[aria-pressed="true"]:hover`, `.is-active.s-hover`): locked — `background:var(--state-pressed); border-color:var(--ink-highlight)` (identical to active).
- Focus (`:focus-visible`, `.s-focus`): `outline:none; box-shadow:0 0 0 2px var(--card), 0 0 0 4px var(--focus-ring)`.
- Disabled (`:disabled`, `.s-disabled`): `opacity:var(--opacity-disabled); pointer-events:none; cursor:not-allowed`.

## Count badge (`.chip-n`)

`font-size:.6875rem` (11px), `font-weight:500`, `font-variant-numeric:tabular-nums`, `line-height:inherit`, `display:inline-flex; align-items:center`. Rest color `var(--ink-inactive)`. When inside an active chip (`.chip.is-active .chip-n`, `[aria-pressed="true"] .chip-n`): `color:color-mix(in srgb, var(--ink-highlight) 70%, transparent)`.

## No change (—)
Radius `full`, height `1.75rem` (28px), padding `0 .75rem`, font `.8125rem` / weight 500, hover surface `State/Hover`. No dedicated dark-mode override for `.chip` (it inherits via the themed tokens; the dark override only applies to the separate `.chip-meta` variant).
