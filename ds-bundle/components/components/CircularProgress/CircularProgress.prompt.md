CircularProgress from @devart/ui-react. Use via `window.DevartUI.CircularProgress` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `CircularProgress.html`): Default, Empty, Half, Full, Variants, Sizes, With Label.

## Props

```ts
interface CircularProgressProps {
  value: number;
  max?: number;
  variant?: "primary" | "secondary";
  size?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
  style?: CSSProperties;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
}
```

## Examples

```jsx
// Default
export const Default: Story = {};

// Empty
export const Empty: Story = {
  args: { value: 0 },
};

// Half
export const Half: Story = {
  args: { value: 50 },
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Empty

```jsx
/* Empty */ compose(S, "Empty")
```

### Half

```jsx
/* Half */ compose(S, "Half")
```

### Full

```jsx
/* Full */ compose(S, "Full")
```

### Variants

```jsx
/* Variants */ compose(S, "Variants")
```

### Sizes

```jsx
/* Sizes */ compose(S, "Sizes")
```

### WithLabel

```jsx
/* With Label */ compose(S, "WithLabel")
```
