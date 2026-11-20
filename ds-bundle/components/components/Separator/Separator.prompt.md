Separator from @devart/ui-react. Use via `window.DevartUI.Separator` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Separator.html`): Horizontal, Vertical, Variants.

## Props

```ts
interface SeparatorProps {
  style?: React.CSSProperties;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  /** Whether or not the component is purely decorative. When true, accessibility-related attributes are updated so that that  */
  decorative?: boolean;
  variant?: "primary" | "secondary" | "border";
  orientation?: "horizontal" | "vertical";
}
```

## Examples

```jsx
// Horizontal
export const Horizontal: Story = {
  render: (args) => (
    <div className="w-64">
      <Separator {...args} orientation="horizontal" />
    </div>
  ),
};

// Vertical
export const Vertical: Story = {
  render: (args) => (
    <div className="flex h-16 items-center">
      <Separator {...args} orientation="vertical" />
    </div>
  ),
};

// Variants
export const Variants: Story = {
  render: (args) => (
    <div className="flex w-64 flex-col gap-4">
      <Separator {...args} orientation="horizontal" variant="primary" />
      <Separator {...args} orientation="horizontal" variant="secondary" />
      <Separator {...args} orientation="horizontal" variant="border" />
    </div>
  ),
};
```

### Horizontal

```jsx
/* Horizontal */ compose(S, "Horizontal")
```

### Vertical

```jsx
/* Vertical */ compose(S, "Vertical")
```

### Variants

```jsx
/* Variants */ compose(S, "Variants")
```
