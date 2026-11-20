FilterMenu from @devart/ui-react. Use via `window.DevartUI.FilterMenu` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `FilterMenu.html`): Default, Chosen, Tree, Tree Open, Interactive.

## Props

```ts
interface FilterMenuProps {
  /** What the filter is about — the pill reads "Label: Value". */
  label: string;
  value: string;
  options: FilterMenuOption[];
  onValueChange: (value: string) => void;
  /** The value that means "no filter". While another is chosen, the pill carries a ✕ that puts this one back. */
  defaultValue?: string;
  clearLabel?: string;
  defaultOpen?: boolean;
  align?: "start" | "end";
  className?: string;
}
```

## Examples

```jsx
// Default
export const Default: Story = {};

/** Something chosen: the pill names it, and ✕ before the chevron clears it. */

// Chosen
export const Chosen: Story = { args: { value: 'custom' } };

/** A hierarchy: each source with its mark, its connections under it, every label on one line. */

// Tree
export const Tree: Story = { args: { label: 'Provider', options: PROVIDERS } };
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Chosen

```jsx
/* Chosen */ compose(S, "Chosen")
```

### Tree

```jsx
/* Tree */ compose(S, "Tree")
```

### TreeOpen

```jsx
/* Tree Open */ compose(S, "TreeOpen")
```

### Interactive

```jsx
/* Interactive */ compose(S, "Interactive")
```
