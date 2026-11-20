ListSelectionBar from @devart/ui-react. Use via `window.DevartUI.ListSelectionBar` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `ListSelectionBar.html`): Idle, Selecting, All Selected, Empty List, Pending, With Actions, Sticky, Interactive.

## Props

```ts
interface ListSelectionBarProps {
  className?: string;
  style?: CSSProperties;
  /** Caption shown while nothing is selected, e.g. "24 files". */
  title: string;
  /** Caption shown while something is selected, e.g. "3 selected". */
  selectedText: string;
  isPending: boolean;
  selectedCount: number;
  allSelected: boolean;
  isEmpty?: boolean;
  sticky?: boolean;
  /** CSS length for the sticky `top` offset — a page whose header is itself sticky passes its height here. Taking a length ra */
  stickyOffset?: string;
  selectAllLabel?: string;
  deselectAllLabel?: string;
  exitSelectionLabel?: string;
  rightSlot?: React.ReactNode;
  onClearSelection: () => void;
  onSelectAll?: () => void;
}
```

## Examples

```jsx
// Idle
export const Idle: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await expect(canvas.getByText('24 files')).toBeVisible();
    await expect(
      canvas.queryByRole('button', { name: 'Exit Selection' })
    ).not.toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: 'Select All' }));
    await expect(args.onSelectAll).toHaveBeenCalledOnce();
    await expect(args.onClearSelection).not.toHaveBeenCalled();
  },
};

/** With a selection the caption swaps and the exit control appears. */

// Selecting
export const Selecting: Story = {
  args: { selectedCount: 3 },
  play: async ({ args, canvas, userEvent }) => {
    await expect(canvas.getByText('3 selected')).toBeVisible();
    await expect(canvas.queryByText('24 files')).not.toBeInTheDocument();
    // Not everything is selected yet, so the link still offers select-all.
    await expect(
      canvas.getByRole('button', { name: 'Select All' })
    ).toBeEnabled();

    await userEvent.click(
      canvas.getByRole('button', { name: 'Exit Selection' })
    );
    await expect(args.onClearSelection).toHaveBeenCalledOnce();
    await expect(args.onSelectAll).not.toHaveBeenCalled();
  },
};

/** Everything selected — the link becomes deselect-all. */

// All Selected
export const AllSelected: Story = {
  args: { selectedCount: 24, selectedText: '24 selected', allSelected: true },
  play: async ({ args, canvas, userEvent }) => {
    await expect(canvas.getByText('24 selected')).toBeVisible();
    await expect(
      canvas.queryByRole('button', { name: 'Select All' })
    ).not.toBeInTheDocument();

    await userEvent.click(canvas.getByRole('button', { name: 'Deselect All' }));
    await expect(args.onClearSelection).toHaveBeenCalledOnce();
    await expect(args.onSelectAll).not.toHaveBeenCalled();
  },
};

/** Nothing to select: the link is disabled rather than hidden. */
```

### Idle

```jsx
/* Idle */ compose(S, "Idle")
```

### Selecting

```jsx
/* Selecting */ compose(S, "Selecting")
```

### AllSelected

```jsx
/* All Selected */ compose(S, "AllSelected")
```

### EmptyList

```jsx
/* Empty List */ compose(S, "EmptyList")
```

### Pending

```jsx
/* Pending */ compose(S, "Pending")
```

### WithActions

```jsx
/* With Actions */ compose(S, "WithActions")
```

### Sticky

```jsx
/* Sticky */ compose(S, "Sticky")
```

### Interactive

```jsx
/* Interactive */ compose(S, "Interactive")
```
