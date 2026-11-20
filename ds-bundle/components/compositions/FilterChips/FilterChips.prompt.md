FilterChips from @devart/ui-react. Use via `window.DevartUI.FilterChips` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

A single-select filter strip — the pill row that narrows a list.

```jsx
const ITEMS = [
  { value: 'all', label: 'All', count: 24 },
  { value: 'artifacts', label: 'Artifacts', count: 11 },
  { value: 'uploaded', label: 'Uploaded', count: 13 },
];

<FilterChips
  items={ITEMS}
  value={filter}
  // Ignoring '' is what keeps one chip always selected.
  onValueChange={(next) => next && setFilter(next)}
/>
```

One component, data in: `items`, `value`, `onValueChange`, `className`. There
are no child parts and no `size` — the chips are not composed at the call site.

## Not a SegmentedControl

They look nearly identical and are not interchangeable:

| | Changes | Can be "none" |
|---|---|---|
| `FilterChips` | **which items** are shown | only if the caller stores `''` — the usual strip ignores it, so "All" stays active |
| `SegmentedControl` | **how the same items** are presented (Table / Chart) | no |
| `ToggleGroup type="multiple"` | several independent options at once | yes |

If the choice removes rows from a list, it is this component.

## Controlled, and `''` on deselect

The strip holds no state, so the selection can live in a URL parameter or a
store without the strip knowing which. Clicking the active chip again reports
`''` — that is how a single toggle group signals deselection. A filter that must
always have a selection ignores that value rather than storing it; the checked
chip only moves when the caller passes the new `value` back.

## What it is built on

`ToggleGroup type="single"`, `variant="stroke"`, `size="xs"`, `rounded="full"` —
the kit's `.chip`: 28px, a pill, `--stroke-border` edge on `--surface-card`, and
the selected chip in `--ink-highlight` over `--state-pressed`. Each chip exposes
`role="radio"` with `aria-checked`, and the group is a single tab stop with the
arrow keys moving along the row.

## Counts

`count` is optional. **`0` renders** — only `undefined` hides it, so an empty
bucket still shows honestly as `0` rather than disappearing. The count is plain
text inside the chip, deliberately not a `Badge`: a badge inside a chip reads as
a second control and doubles the border noise. It sits in `--ink-inactive` with
tabular figures at the chip's own weight, and takes `--ink-highlight` with the
selected chip.

## Layout

Below `md` (≤767px, the kit's `.chip-row`) the strip is one horizontally scrolling row, with a 32px fade at
whichever edge overflows and no visible scrollbar. From `md` up it wraps. Put it
directly above the list it filters; it fills the width it is given.

## Props

```ts
interface FilterChipsProps {
  items: FilterChipItem[];
  value: string;
  className?: string;
  /** Fires with `''` when the active chip is toggled off, which is how a single Radix toggle group reports deselection. A fil */
  onValueChange: (value: string) => void;
}
```
