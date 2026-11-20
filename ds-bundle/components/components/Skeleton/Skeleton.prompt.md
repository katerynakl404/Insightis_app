Skeleton from @devart/ui-react. Use via `window.DevartUI.Skeleton` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Skeleton.html`): Default, Animations, Shapes, Rounded, With Content, Loaded.

## Props

```ts
interface SkeletonProps {
  children?: React.ReactNode;
  isLoaded?: boolean;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
  style?: CSSProperties;
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  animation?: "none" | "pulse" | "shimmer";
}
```

## Examples

```jsx
// Default
export const Default: Story = {};

// Animations
export const Animations: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Skeleton {...args} animation="shimmer" className="h-4 w-48" />
      <Skeleton {...args} animation="pulse" className="h-4 w-48" />
      <Skeleton {...args} animation="none" className="h-4 w-48" />
    </div>
  ),
};

// Shapes
export const Shapes: Story = {
  render: (args) => (
    <div className="flex items-center gap-4">
      <Skeleton {...args} rounded="full" className="size-12" />
      <div className="flex flex-col gap-2">
        <Skeleton {...args} rounded="md" className="h-4 w-40" />
        <Skeleton {...args} rounded="md" className="h-4 w-28" />
      </div>
    </div>
  ),
};

/** Every radius step the recipe defines; `md` is the default. */
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Animations

```jsx
/* Animations */ compose(S, "Animations")
```

### Shapes

```jsx
/* Shapes */ compose(S, "Shapes")
```

### Rounded

```jsx
/* Rounded */ compose(S, "Rounded")
```

### WithContent

```jsx
/* With Content */ compose(S, "WithContent")
```

### Loaded

```jsx
/* Loaded */ compose(S, "Loaded")
```
