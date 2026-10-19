# Autocomplete — current (prod)

Live baseline from `@insightis/ui` `Autocomplete/index.tsx` + `hooks/use-autocomplete`.

A combobox built by composing `InputGroup` + `DropdownMenu` + (for multi-select) `BadgeList`. Supports single / multi-select, free-solo input, custom option / badge renderers, clearable, loading state, and free-text filtering.

## Spec — control
- Outer wrap: `relative w-full`.
- Label (optional): Typography `label`, `weight=medium textColor=primary`, `mb-1.5 block`.
- Trigger: `InputGroup variant="outline" size="lg"` (default size), `group h-auto`; when there are selected tags it gets `flex-wrap`.
- Inner content row: `flex flex-1 flex-wrap items-center` + size-dependent padding/gap (xs `py-[3px] ps-[3px] gap-[3px]`; sm–xl `py-[5px] ps-[5px] gap-1.5`).
- Input: `InputGroupInput`, `min-w-8 flex-1 bg-transparent` (`px-0` once there are tags).

## Spec — addons
- **Clear button** (`X`, IconButton transparent) — shown when `!disableClearable && !disabled && !readOnly && isDirty`; fades in on `group-focus-within` / `group-hover` / when open.
- **Popup indicator** (`ChevronDown`, IconButton transparent) — rotates 180° while open (`open && rotate-180`, `transition-transform duration-200`).

## Spec — listbox
- `DropdownMenuContent` width `[--radix-dropdown-menu-trigger-width]`, `overflow-y-auto`.
- Options: `OptionItem` rows.
- Empty state: `px-2 py-4 text-center text-muted-foreground text-sm` (`"No options"` default).
- `onCloseAutoFocus` and `onFocusOutside` are preventDefault'd so the trigger keeps focus.

## Variants
- **Single-select** (default) — selected option label is set as the input value.
- **Multi-select** (`isMultipleSelect`) — selected options rendered as `BadgeList` (Badge `variant=secondary` default; configurable via `badgeVariant`). Each badge has a delete button (`onDelete`).
- **FreeSolo** — accepts arbitrary input not in `options`.

## States
- **Closed** — popup indicator chevron points down.
- **Open** — chevron rotated 180°, dropdown rendered.
- **Disabled** — DropdownMenuTrigger `disabled`; clear/popup buttons hidden.
- **ReadOnly** — clear button hidden; selection preserved.
- **Loading** (`isLoading`) — `loadingText` shown in listbox.
- **Empty results** — `noOptionsText` shown.
- **Error** — propagates through `InputGroup` (`isInvalid` / `errorText` via `inputGroupProps`-style API).
- Focus is delegated to InputGroup ([see InputGroup](InputGroup.md)) — border `content-primary` on focus.
