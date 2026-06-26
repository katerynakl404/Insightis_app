# Autocomplete — prod → expected

Source: `@insightis/ui` `Autocomplete/index.tsx` + `hooks/use-autocomplete`. Baseline: [`../current/Autocomplete.md`](../current/Autocomplete.md).

**Autocomplete is a composition** of [`InputGroup`](InputGroup.md) (outline variant) + [`DropdownMenu`](Dropdown.md) + (multi-select) [`Badge`](Badge.md) + [`IconButton`](IconButton.md). It has **no own visual tokens** beyond a few padding spacers.

## Concrete dimensions — kit demo (`.acpl*`, kit-theme.css ~1692)

| Element | Selector | Exact size / padding / radius |
|---|---|---|
| Root wrapper | `.acpl` | width **280px**; `display:flex`; `flex-direction:column`; gap **6px**; `position:relative` (line 1700) |
| Label | `.acpl-lbl` | font-size **.75rem (12px)**, weight **500**, color `var(--ink)` (line 1701) |
| Trigger control (= InputGroup outline/lg shell) | `.acpl-ctrl` | `display:flex`; `align-items:center`; `flex-wrap:wrap`; **min-height 40px**; border **1px solid** `var(--border)`; radius **6px**; bg `var(--card)`; padding **5px** all sides; gap **6px**; wraps badges (line 1702) |
| Text input | `.acpl-ctrl input` | `flex:1`; min-width **8ch**; height **1.5rem (24px)**; padding **0 4px**; font-size **.875rem (14px)**; `background:transparent`; `border:none`; `outline:none`; color `var(--ink)`; `font-family:inherit` (line 1705). Placeholder color `var(--ink-inactive)` (line 1706) |
| Trailing actions group | `.acpl-end` | `display:inline-flex`; `align-items:center`; gap **2px**; padding-right **4px** (line 1707) |
| Clear / chevron button | `.iconbtn-mini` | **24px × 24px**; `display:inline-flex` centered; radius **4px**; `background:transparent`; `border:none`; color `var(--ink-secondary)`; `cursor:pointer` (line 1708). **:hover** → color `var(--brand-primary)` (line 1709) |
| Chevron icon | `.chev` | **16px × 16px**; rotates **180°** when root has `.is-open` (`.acpl.is-open .acpl-end .chev`, line 1710); transition **transform .2s (200ms)** (line 1711) |
| Listbox | `.acpl-list` | margin-top **4px**; border **1px solid** `var(--border)`; radius **8px**; padding **4px**; bg `var(--card)`; shadow `var(--shadow-overlay)` (floating-surface rung — light `0 10px 15px -3px rgba(0,0,0,.12), 0 4px 6px -4px rgba(0,0,0,.08)`, theme-aware dark; normalised from the prior single-layer `0 4px 6px -1px rgba(0,0,0,.1)`) |
| Option row | `.acpl-opt` | padding **6px 10px**; radius **4px**; font-size **.875rem (14px)**; color `var(--ink-body)`; `cursor:pointer` (line 1714); **:hover / `[data-highlighted]`** bg `var(--state-hover)` (line 1715) |
| Empty / no-results | `.acpl-empty` | padding **16px 8px**; `text-align:center`; font-size **.875rem (14px)**; color `var(--ink-secondary)` (line 1716) |

> Reference lines — Trigger ≈ InputGroup outline (border 1px, radius 6px, bg `--card`); [`InputGroup`](InputGroup.md). Multi-select Badge `default/secondary` (`.acpl-ctrl .badge`, line 1703): **height 1.5rem (24px)**, padding **0 6px**, font-size **.75rem (12px)**. Close-btn `.b-x` (line 1704): margin-left **4px**, font-weight **600**, color `var(--ink-secondary)`, `cursor:pointer`; full spec [`Badge`](Badge.md).

> **DOM / markup** (verbatim from storybook): `<div class="acpl is-open">` › `<span class="acpl-lbl">` (label) + `<div class="acpl-ctrl">` containing zero-or-more `<span class="badge badge-secondary">label <span class="b-x">×</span></span>`, then `<input placeholder="…">`, then `<div class="acpl-end">` holding `<button class="iconbtn-mini" aria-label="Clear">✕</button>` + chevron SVG `<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>`. The listbox is a sibling `<div class="acpl-list">` with `<div class="acpl-opt" [data-highlighted]>…</div>` rows.
>
> **No-results / empty** uses `<div class="acpl-empty">…</div>` in place of the `.acpl-opt` rows.
>
> **Dark mode** — no `.dark` overrides exist for any `.acpl*` selector; all colours resolve through the semantic tokens above, which already carry their own dark values.

| State | Current (prod) · was | Expected · became | Specification |
|---|---|---|---|
| Default | `InputGroup variant="outline" size="lg"` shell + chevron-down trailing | — no change | inherits InputGroup |
| Open | root gets `.is-open`; chevron rotated 180° (`.acpl.is-open .acpl-end .chev`, 200ms transition) | — no change | matches Dropdown's open affordance |
| Focus | — | **shipped:** `.acpl:focus-within .acpl-ctrl` → `border-color: var(--ink)` (line 1712). Forward-looking: inherit `--focus-ring-brand` once [`InputGroup`](InputGroup.md) is upgraded | focus-within darkens the control border to ink; brand ring is a planned upgrade, not shipped |
| Hover | clear button fades in on `group-hover` / `group-focus-within` / open | — no change | UX detail — preserve |
| Error | propagates via `InputGroup isInvalid` | — no change (hex → [colors](colors.md)) | red/20 border, red/5 bg |
| Disabled | DropdownMenuTrigger `disabled`; clear/popup hidden | — no change | parent InputGroup also `opacity-50` |
| Read-only | clear hidden; selection preserved | — no change | — |
| Loading (`isLoading`) | `loadingText` rendered inside listbox | ⚠ no spinner affordance — to define | recommend inline `Spinner` 16px before / after `loadingText` for visual progress |
| No results | `px-2 py-4 text-center text-muted-foreground text-sm` | — no change (hex → [colors](colors.md)) | text → `Text/Secondary` |

## Multi-select badges
| Property | Current (prod) · was | Expected · became |
|---|---|---|
| Badge variant default | `secondary` | — no change |
| Badge per-size padding | xs `py-[3px] ps-[3px] gap-[3px]` / sm–xl `py-[5px] ps-[5px] gap-1.5` | — no change |
| Delete affordance | each Badge has its own close button (`onDelete`) | — no change (hex → [colors](colors.md)) |

## ⚠ Best-practice states — to define
- **Loading spinner** inside the listbox or trailing addon while `isLoading`.
- **Keyboard navigation** affordance — current option should have a visible `bg-state-hover` independent of mouse hover (Radix listbox `data-highlighted`).
- **Selected-but-not-active** distinction for multi-select badges (e.g. dim when read-only).
- **Empty-state custom CTA slot** (e.g. "Create new tag «foo»") for free-solo mode.

## No change (—)
Trigger layout, badge list grammar, clear / popup IconButton wiring, listbox width binding (`--radix-dropdown-menu-trigger-width`), focus-out / close-auto-focus prevention.
