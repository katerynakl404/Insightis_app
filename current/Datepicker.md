# Datepicker — current (prod)

Live baseline from `@insightis/ui` `Datepicker/`. Built on `react-day-picker` with a Button-based day cell.

## Exports
- `Calendar` — low-level calendar primitive.
- `CalendarDayButton` — Button-based day cell (uses Button `variant="transparent"`, `size="xs"`).
- `SingleDatePicker` — composed picker (calendar + confirm Button).
- `DateRangePicker` — start/end range picker.

## Spec — SingleDatePicker container
- `flex flex-col gap-2`, radius `md 6px`, border `border`, bg `card`.
- Calendar bottom border `border-b border-border` + `pb-3`.
- Confirm button row: `flex items-center gap-2 px-3 pb-3`; button is `Button variant="primary" size="lg" rounded="full" flex-1`.

## Spec — Calendar grid
- Day cell: `h-8 w-10 max-h-fit p-0`, `text-sm font-medium`.
- Day button: `size-full min-w-full py-1.5 rounded-full`.
- Weekday header: `w-10 py-1.5 text-sm font-medium text-content-secondary`.
- Caption (month label): `flex h-8 items-center justify-center`.
- Nav (prev/next chevrons): `flex size-8 items-center justify-center text-content-secondary hover:text-content-primary`.

## Day-cell states (CalendarDayButton)
- **Default** — Button transparent, `font-normal`, text inherits.
- **Selected (single)** — `data-selected-single=true` → bg `primary`, text `background`.
- **Range start** — `data-range-start=true` → bg `primary`, text `background`, radius `rounded-l-(--cell-radius) rounded-r-none`.
- **Range middle** — `data-range-middle=true` → bg `muted` (`= chip` `#F8FAFC` / dark `#2A2834`), text `foreground`, radius none.
- **Range end** — `data-range-end=true` → bg `primary`, text `background`, radius `rounded-r-(--cell-radius) rounded-l-none`.
- **Focus** — `group-data-[focused=true]/day:border-ring ring-[3px] ring-ring/50`.
- **Outside month** — text `content-secondary`.
- **Hover (dark)** — text `foreground`.
