RowMenuButton from @devart/ui-react. Use via `window.DevartUI.RowMenuButton` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

The ⋮ at the end of a list row, and the menu it opens.

```jsx
<Card variant="row" fullWidth onClick={open}>
  <span className="min-w-0 flex-1 truncate">Q1 revenue commentary</span>
  <RowMenuButton aria-label="More actions for Q1 revenue commentary" className="-my-0.5">
    <DropdownMenuItem><Pin /> Pin</DropdownMenuItem>
    <DropdownMenuItem onSelect={() => setRenaming(true)}><Pencil /> Rename</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem variant="danger"><Trash2 /> Delete</DropdownMenuItem>
  </RowMenuButton>
</Card>
```

`SelectableListCard` renders one for you through its `menu` prop.

## What it is, and what it is not

Not a new look. The trigger is the row-action `IconButton` — `tertiary`,
`2xs`, a 14px `EllipsisVertical` — and the menu is `DropdownMenuContent`,
aligned to the trigger's end. What the part adds is the behaviour every row with
a menu needs, which each row used to hand-roll:

| | |
|---|---|
| **Reveal** | fades in on row hover, on keyboard focus anywhere in the row, and while open |
| **What it is, on hover** | a tooltip with its `aria-label` — as the sidebar chat row's ⋮ (`SidebarChatItem` `menuLabel`); needs a `TooltipProvider` above |
| **No hover to reveal with** | shown at rest below `md` (768px) and on `(hover: none)` |
| **Clicks and keys** | stay with the trigger and the menu — they never reach the row |
| **Focus** | an item that moves focus (Rename) keeps it |

It is its own directory rather than a part of `SelectableListCard` because the
package exports by subpath: a table row or a sidebar row would otherwise import
a list card to get a kebab.

## The reveal

It hangs off **`group/row`** — the hook `Card variant="row"` and `TableRow`
already stamp. Anything else that wants the reveal stamps `group/row` on its
row, or passes `reveal={false}`.

It is opacity, never mounting: the trigger keeps its 24px box at rest, so
nothing in the row moves when it appears. The open state reads `aria-expanded`,
not `data-state`, because a tooltip around the trigger overwrites `data-state`
(SPEC decision 6).

Inside a `TableActionsCell`, which already fades its children, the two reveals
agree; either alone is enough.

## Clicks and keys

The trigger sits inside a clickable row, and the menu is portalled out of the
row in the DOM but **not in React** — so its clicks and keys bubble through the
row's handlers like any child's. The trigger stops its click and its
Enter / Space; the menu stops every click and key. A row needs no guard of its
own for the menu.

## Focus after an item

Radix hands focus back to the trigger once the menu has animated out — long
after the item's `onSelect` ran. When that handler moved focus on purpose
(Rename opening an `InlineRename` in the row), the hand-back would pull the
caret out of the field, and a field that commits on blur would close at once.
`DropdownMenuContent` hands focus back only when it went nowhere — to
`document.body`, with the menu that held it — so Rename keeps its field. After
the pointer the trigger gets focus without a ring; after the keyboard, with one.

## In a row

Give it `-my-0.5` in a one-line `Card variant="row"`: the 24px trigger then
takes the 20px text line's height, and the row stays the 44px a one-line row
is — level with its neighbours that have no menu. `SelectableListCard` does
this, and pushes it to the right edge with `ms-auto`.

## Props

| Prop | Default | |
|---|---|---|
| `children` | — | the menu: `DropdownMenuItem`s, separators, a label |
| `aria-label` | `'More actions'` | in a list of many, add the row's name |
| `reveal` | `true` | `false` shows it at rest |
| `open` / `defaultOpen` / `onOpenChange` / `modal` | — | passed to `DropdownMenu` |

Every other `IconButton` prop (`disabled`, `className`, `ref`, …) goes to the
trigger. `variant`, `size` and `rounded` are fixed — it is the row action.
