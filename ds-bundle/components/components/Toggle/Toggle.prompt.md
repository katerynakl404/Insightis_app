Toggle from @devart/ui-react. Use via `window.DevartUI.Toggle` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Toggle.html`): Primary, Variants, Sizes, Rounded, With Icon, Disabled, Controlled.

## Props

```ts
interface ToggleProps {
  ref?: React.Ref;
  /** The controlled state of the toggle. */
  pressed?: boolean;
  /** The state of the toggle when initially rendered. Use `defaultPressed` if you do not need to control the state of the tog */
  defaultPressed?: boolean;
  style?: CSSProperties;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  variant?: "outline" | "ghost" | "stroke" | "badge";
  size?: "sm" | "md" | "lg" | "xl" | "xs";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "rounded" | "full";
}
```

## Examples

```jsx
// Primary
export const Primary: Story = {};

// Variants
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <span className="text-ink-secondary text-xs">Off</span>
      <div className="flex flex-wrap items-center gap-3">
        <Toggle {...args} variant="outline">
          Outline
        </Toggle>
        <Toggle {...args} variant="stroke">
          Stroke
        </Toggle>
        <Toggle {...args} variant="ghost">
          Ghost
        </Toggle>
        <Toggle {...args} variant="badge">
          Badge
        </Toggle>
      </div>
      <span className="text-ink-secondary text-xs">On</span>
      <div className="flex flex-wrap items-center gap-3">
        <Toggle {...args} variant="outline" defaultPressed>
          Outline
        </Toggle>
        <Toggle {...args} variant="stroke" defaultPressed>
          Stroke
        </Toggle>
        <Toggle {...args} variant="ghost" defaultPressed>
          Ghost
        </Toggle>
        <Toggle {...args} variant="badge" defaultPressed>
          Badge
        </Toggle>
      </div>
    </div>
  ),
};

// Sizes
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Toggle {...args} size="xs">
        Extra small
      </Toggle>
      <Toggle {...args} size="sm">
        Small
      </Toggle>
      <Toggle {...args} size="md">
        Medium
      </Toggle>
      <Toggle {...args} size="lg">
        Large
      </Toggle>
      <Toggle {...args} size="xl">
        Extra large
      </Toggle>
    </div>
  ),
};
```

### Primary

```jsx
/* Primary */ compose(S, "Primary")
```

### Variants

```jsx
/* Variants */ compose(S, "Variants")
```

### Sizes

```jsx
/* Sizes */ compose(S, "Sizes")
```

### Rounded

```jsx
/* Rounded */ compose(S, "Rounded")
```

### WithIcon

```jsx
/* With Icon */ compose(S, "WithIcon")
```

### Disabled

```jsx
/* Disabled */ compose(S, "Disabled")
```

### Controlled

```jsx
/* Controlled */ compose(S, "Controlled")
```

## Related

`ToggleGroup`
