Spinner from @devart/ui-react. Use via `window.DevartUI.Spinner` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Spinner.html`): Default, Sizes, Colors.

## Props

```ts
interface SpinnerProps {
  /** Accessible label announced while the spinner is visible. */
  label?: string;
  style?: CSSProperties;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  color?: "inherit" | "success" | "warning" | "primary" | "secondary" | "destructive" | "accent" | "white" | "muted";
  size?: "sm" | "md" | "lg" | "xl" | "xs";
}
```

## Examples

```jsx
// Default
export const Default: Story = {};

// Sizes
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-6">
      <Spinner {...args} size="xs" />
      <Spinner {...args} size="sm" />
      <Spinner {...args} size="md" />
      <Spinner {...args} size="lg" />
      <Spinner {...args} size="xl" />
    </div>
  ),
};

// Colors
export const Colors: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-6">
      <Spinner {...args} color="primary" />
      <Spinner {...args} color="secondary" />
      <Spinner {...args} color="muted" />
      <Spinner {...args} color="accent" />
      <Spinner {...args} color="success" />
      <Spinner {...args} color="destructive" />
      <Spinner {...args} color="warning" />
    </div>
  ),
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Sizes

```jsx
/* Sizes */ compose(S, "Sizes")
```

### Colors

```jsx
/* Colors */ compose(S, "Colors")
```
