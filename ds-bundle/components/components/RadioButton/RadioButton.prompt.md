RadioButton from @devart/ui-react. Use via `window.DevartUI.RadioButton` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `RadioButton.html`): Default, Group, Selected, Disabled, Error State, Label Positions.

## Props

```ts
interface RadioButtonProps {
  label?: React.ReactNode;
  labelClassName?: string;
  value: string;
  style?: CSSProperties;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  checked?: boolean;
  required?: boolean;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  variant?: "primary";
  size?: "md";
  labelPosition?: "top" | "right" | "bottom" | "left";
  gap?: "sm" | "md" | "lg";
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: (args) => (
    <RadioGroup defaultValue="option">
      <RadioButton {...args} />
    </RadioGroup>
  ),
};

// Group
export const Group: Story = {
  render: (args) => (
    <RadioGroup defaultValue="banana">
      <RadioButton {...args} label="Apple" value="apple" />
      <RadioButton {...args} label="Banana" value="banana" />
      <RadioButton {...args} label="Cherry" value="cherry" />
    </RadioGroup>
  ),
};

// Selected
export const Selected: Story = {
  args: { label: 'Selected', value: 'selected' },
  render: (args) => (
    <RadioGroup value="selected">
      <RadioButton {...args} />
    </RadioGroup>
  ),
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Group

```jsx
/* Group */ compose(S, "Group")
```

### Selected

```jsx
/* Selected */ compose(S, "Selected")
```

### Disabled

```jsx
/* Disabled */ compose(S, "Disabled")
```

### ErrorState

```jsx
/* Error State */ compose(S, "ErrorState")
```

### LabelPositions

```jsx
/* Label Positions */ compose(S, "LabelPositions")
```
