MetaRow from @devart/ui-react. Use via `window.DevartUI.MetaRow` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

The line above a list: what the list holds, and what can be done to a selection.

```jsx
<MetaRow onClear={() => setSelected([])}>
  <MetaRowCount>3 selected</MetaRowCount>
  <LinkButton>Select all</LinkButton>
  <MetaRowActions>
    <Button size="sm" variant="destructiveTertiary" leftSlot={<Trash2 />}>
      Delete
    </Button>
  </MetaRowActions>
</MetaRow>
<Table />
```

## Spacing — the one rule

The row supplies **its own** vertical space and **no outer margin**:

| | |
|---|---|
| vertical padding | 6px top and bottom |
| minimum height | 44px |
| between members | 12px, 8px when it wraps |
| inside `MetaRowActions` | 4px |
| **between the row and the list under it** | **4px** |

```jsx
<div className="flex flex-col gap-1">
  <MetaRow>…</MetaRow>
  <Table>…</Table>
</div>
```

A gap on the stack, not a margin on either. **Never both.** A row with its own padding, a margin under it and a
stack gap around it is three answers to one question, and it is exactly why
this gap drifts from page to page.

The 44px floor is what keeps the list from moving when a selection appears and
the actions arrive — the row is already that tall with nothing in it.

## Why it has no surface

No background, no border, no card. The row belongs to the list under it; give
it a surface and it becomes a toolbar, which is a different thing that sits
above the list rather than introducing it.

For the same reason everything in it reads at one typographic level — the
count, the link and the buttons are all Body — so the row is one sentence
rather than three controls that happen to be on a line.

The one exception is `sticky`, below: a row the list scrolls under takes the
**page** colour, so the rows passing behind it do not show through. Still not
a card's surface, so it still does not read as a toolbar laid over them.

## Sticky

`sticky` pins the row to the top of its scroll container while the list runs
under it, so the count and the selection actions stay in reach on a long list.

```jsx
<MetaRow sticky={selected.size > 0} stickyOffset="3.5rem" onClear={clear}>
  <MetaRowCount>{selected.size} selected</MetaRowCount>
  …
</MetaRow>
```

| | |
|---|---|
| position | `sticky`, `top: stickyOffset` (default `0`) |
| stacking | `z-10`, over the list's rows |
| fill | Surface/Page |

`stickyOffset` is a CSS length: a page whose header is itself sticky passes
the header's height, and the row pins below it rather than behind it. A length
rather than a custom property, so the page's layout variables stay out of the
row's contract. It is read only with `sticky`.

Sticky **while selecting** is the usual shape — `sticky={selected.size > 0}`.
A list nobody is acting on scrolls its count away like any other content; a
list with a selection keeps the actions on it, and the way out of it, in view.

A `sticky` element sticks to its nearest scrolling ancestor, and does nothing
under an ancestor that clips overflow without scrolling.

`MetaRow` and `ListSelectionBar` both stick, the same way, and stay two
components: `ListSelectionBar` owns its select-all toggle and exit control,
`MetaRow` is the open row a page composes.

## What goes in it

- **`MetaRowCount`** — the reading. `Text/Secondary`, regular weight, never
  wraps. "5 connections", "3 selected", "1 connection" (mind the singular).
- **A `LinkButton` beside it** — the action that belongs to the count, and the reason
  the default layout clusters them: "10 conversations · Select all" reads as one
  thing, where two edge-anchored items read as two. It toggles *Select all* →
  *Deselect all* when the selection reaches the total.
- **`MetaRowActions`** — the cluster that acts on the selection, pushed to the far
  edge. Buttons are `size="sm"` and **tertiary**: the row is a reading with
  actions attached, not a toolbar, and an outlined destructive button here
  outweighs the list it introduces.

- **`onClear`** — the way out. See below.

Use `align="between"` when the action belongs on the opposite edge from the
count rather than next to it.

## Leaving the selection

`onClear` renders a ✕ at the very end of the row, after `MetaRowActions`.

It belongs to the component rather than to each page because it is part of the
contract, not a decoration on top of it. A selection changes what the row says
and what the list means, and the only other ways out are untick every row or
guess — so the row that announces the selection is also the row that ends it.

It sits outside `MetaRowActions` on purpose: everything in that cluster *acts on*
the selection, and leaving one is not one of those actions. Give it a handler
whenever there is a selection to leave, and leave it off when the row is only
reporting a count.

## Props

```ts
interface MetaRowProps {
  clearLabel?: string;
  /** CSS length for the sticky `top`, e.g. a sticky header's height. Read only with `sticky`. */
  stickyOffset?: string;
  ref?: React.Ref;
  /** Leave the selection: renders a ✕ at the end of the row. */
  onClear?: () => void;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  align?: "start" | "between";
  sticky?: boolean;
}
```
