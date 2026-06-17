# Autocomplete — prod → expected

Source: `@insightis/ui` `Autocomplete/index.tsx` + `hooks/use-autocomplete`. Baseline: [`../current/Autocomplete.md`](../current/Autocomplete.md).

**Autocomplete is a composition** of [`InputGroup`](InputGroup.md) (outline variant) + [`DropdownMenu`](Dropdown.md) + (multi-select) [`Badge`](Badge.md) + [`IconButton`](IconButton.md). It has **no own visual tokens** beyond a few padding spacers.

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
