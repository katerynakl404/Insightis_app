# Autocomplete — prod → expected

Source: `@insightis/ui` `Autocomplete/index.tsx` + `hooks/use-autocomplete`. Baseline: [`../current/Autocomplete.md`](../current/Autocomplete.md).

**Autocomplete is a composition** of [`InputGroup`](InputGroup.md) (outline variant) + [`DropdownMenu`](Dropdown.md) + (multi-select) [`Badge`](Badge.md) + [`IconButton`](IconButton.md). It has **no own visual tokens** beyond a few padding spacers.

## Concrete dimensions — kit demo (`.acpl*`, kit-theme.css ~1692)

| Element | Selector | Exact size / padding / radius |
|---|---|---|
| Root wrapper | `.acpl` | width **280px**; flex column; gap **6px** (line 1692) |
| Label | `.acpl-lbl` | font-size **.75rem (12px)**, weight **500**, color `var(--ink)` |
| Trigger control (= InputGroup outline/lg shell) | `.acpl-ctrl` | **min-height 40px**; border **1px** `var(--border)`; radius **6px**; bg `var(--card)`; padding **5px** all sides; gap **6px**; wraps badges (line 1694) |
| Text input | `.acpl-ctrl input` | height **1.5rem (24px)**; padding **0 4px**; font-size **.875rem (14px)**; min-width 8ch; transparent bg (line 1697) |
| Trailing actions group | `.acpl-end` | gap **2px**; padding-right **4px** (line 1699) |
| Clear / chevron button | `.iconbtn-mini` | **24px × 24px**; radius **4px**; transparent bg (line 1700) |
| Chevron icon | `.chev` | **16px × 16px**; rotates **180°** when `.is-open`; transition **transform .2s (200ms)** (lines 1702–1703) |
| Listbox | `.acpl-list` | margin-top **4px**; border **1px**; radius **8px**; padding **4px**; bg `var(--card)`; shadow `0 4px 6px -1px rgba(0,0,0,.1)` (line 1705) |
| Option row | `.acpl-opt` | padding **6px 10px**; radius **4px**; font-size **.875rem (14px)**; hover/`[data-highlighted]` bg `var(--state-hover)` (lines 1706–1707) |
| Empty / no-results | `.acpl-empty` | padding **16px 8px**; centered; font-size **.875rem (14px)** (line 1708) |

> Reference lines — Trigger ≈ InputGroup outline (border 1px, radius 6px, bg `--card`); [`InputGroup`](InputGroup.md). Multi-select Badge `default/secondary`: **height 1.5rem (24px)**, padding **0 6px**, font-size **.75rem (12px)**, close-btn `.b-x` margin-left 4px (`.acpl-ctrl .badge`, lines 1695–1696); full spec [`Badge`](Badge.md).

| State | Current (prod) · was | Expected · became | Specification |
|---|---|---|---|
| Default | `InputGroup variant="outline" size="lg"` shell + chevron-down trailing | — no change | inherits InputGroup |
| Open | chevron rotated 180° (200ms transition) | — no change | matches Dropdown's open affordance |
| Focus | inherits `InputGroup` focus (border `content-primary`) | inherit `--focus-ring-brand` once [`InputGroup`](InputGroup.md) is upgraded | brand-tinted ring |
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
