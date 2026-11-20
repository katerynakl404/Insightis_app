DropdownMenu from @devart/ui-react. Use via `window.DevartUI.DropdownMenu` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `DropdownMenu.html`): DropdownMenu, Default, Initially Open, With Selection Items, Item States, External Links, Segmented Item, Focus Return, Non Modal Outside Click.

## Props

```ts
interface DropdownMenuProps {
  children?: React.ReactNode;
  dir?: "ltr" | "rtl";
  open?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
}
```

## Examples

```jsx
// DropdownMenu
export const Page: Story = {
  name: 'DropdownMenu',
  render: () => (
    <ChangePage group="DropdownMenu" title="DropdownMenu">
      <ChangeCase
        after={<RowKindsAfter />}
        afterNote="DropdownMenuRow — no hover · accent — brand ink, medium"
        before={<RowKindsBefore />}
        beforeNote="one kind of row — every row highlights, every row is equal"
        beforeSource={UPSTREAM_SOURCE}
        files={[
          'src/components/DropdownMenu/DropdownMenuItem.tsx',
          'src/components/DropdownMenu/DropdownMenuRow.tsx',
        ]}
        footnote={
          <>
            Hover the Auto-sync row on each side. <Code>accent</Code> is ink and
            weight on the same rail, not a bordered button: at 4px of menu
            padding a second edge lands against the divider and outweighs the
            list. <Code>--ink-highlight</Code> holds AA on light and dark.
          </>
        }
        n={43}
        state="draft"
        title="Two kinds of row it could not draw"
        why="A menu had one row — an item that highlights and acts — so a reading with its own switch promised a click it did not have, and the one action the menu exists for read like every other row. Pages built both out of a Popover instead."
      />

      <ChangeCase
        after={
          <TryIt action="Open the menu from the count">
            <UsedIn handle={<LinkButton>2 workspaces</LinkButton>} />
          </TryIt>
        }
        afterNote="LinkButton — the size of the line it sits in"
        before={
          <TryIt action="Open the menu from the count">
            <UsedIn
              handle={
                <Button
// …

// Default
export const Default: Story = {
  render: (args) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" rightSlot={<MoreHorizontal />}>
          Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent {...args} align="start">
        <DropdownMenuLabel>Chat</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={fn()}>
            <Pencil />
            Rename
            <DropdownMenuShortcut>⌘R</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={fn()}>
            <Copy />
            Duplicate
            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem disabled onSelect={fn()}>
            <Settings />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="danger" onSelect={fn()}>
          <Trash2 />
          Delete
          <DropdownMenuShortcut>⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};

// Initially Open
export const InitiallyOpen: Story = {
  render: (args) => (
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary">Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent {...args} align="start">
        <DropdownMenuItem onSelect={fn()}>
          <Pencil />
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={fn()}>
          <Copy />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="danger" onSelect={fn()}>
          <Trash2 />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
```

### Page

```jsx
/* DropdownMenu */ compose(S, "Page")
```

### Default

```jsx
/* Default */ compose(S2, "Default")
```

### InitiallyOpen

```jsx
/* Initially Open */ compose(S2, "InitiallyOpen")
```

### WithSelectionItems

```jsx
/* With Selection Items */ compose(S2, "WithSelectionItems")
```

### ItemStates

```jsx
/* Item States */ compose(S2, "ItemStates")
```

### ExternalLinks

```jsx
/* External Links */ compose(S2, "ExternalLinks")
```

### SegmentedItem

```jsx
/* Segmented Item */ compose(S2, "SegmentedItem")
```

### FocusReturn

```jsx
/* Focus Return */ compose(S2, "FocusReturn")
```

### NonModalOutsideClick

```jsx
/* Non Modal Outside Click */ compose(S2, "NonModalOutsideClick")
```
