ToggleGroup from @devart/ui-react. Use via `window.DevartUI.ToggleGroup` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

A group of toggles — for **several independent filters held at once**, where any
combination can be on.

```jsx
<ToggleGroup type="multiple" value={active} onValueChange={setActive}>
  <ToggleGroupItem value="csv">CSV</ToggleGroupItem>
  <ToggleGroupItem value="xlsx">XLSX</ToggleGroupItem>
  <ToggleGroupItem value="pdf">PDF</ToggleGroupItem>
</ToggleGroup>
```

`type="single"` also exists. Use it when exactly one option must be held and
the options are peers; reach for `SegmentedControl` only when the choice changes
how the *same* content is presented rather than which items are shown.

Note that a true filter-chip row — multi-select, clearable, with counts — has no
dedicated component here yet, so a toggle group is the closest honest fit.

## Sizes

`xs` (28) `sm` (32, the default) `md` (36) `lg` (40) — the same box ladder as
`Button` and `IconButton`, so a toggle group lines up beside a button of the
same size. Variants are `default` and `outline`; `outline` is the default and
the right one for a filter bar, where the unselected items still need an edge.

An icon-only toggle needs an `aria-label`, exactly like `IconButton`.

## Props

```ts
interface ToggleGroupProps {
  type: "single" | "multiple";
  /** The controlled stateful value of the item that is pressed. */
  value?: string | string[];
  /** The value of the item that is pressed when initially rendered. Use `defaultValue` if you do not need to control the stat */
  defaultValue?: string | string[];
  /** Whether the group is disabled from user interaction. */
  disabled?: boolean;
  /** Whether the group should maintain roving focus of its buttons. */
  rovingFocus?: boolean;
  loop?: boolean;
  orientation?: "horizontal" | "vertical";
  dir?: "ltr" | "rtl";
  style?: CSSProperties;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  variant?: "outline" | "ghost" | "stroke" | "badge";
  size?: "sm" | "md" | "lg" | "xl" | "xs";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "rounded" | "full";
  scrollIntoGroup?: boolean;
}
```
