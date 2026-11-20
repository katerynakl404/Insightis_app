StepSlider from @devart/ui-react. Use via `window.DevartUI.StepSlider` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `StepSlider.html`): Default, Interactive, Lowest, Highest, Small, Disabled, With Step Tooltips, Five Stops, In Settings Row, Matches Switch Sizes.

## Props

```ts
interface StepSliderProps {
  steps: StepSliderStep[];
  value: string;
  "aria-label": string;
  showStepTooltips?: boolean;
  onValueChange?: (value: string) => void;
  form?: string;
  style?: React.CSSProperties;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  dir?: "ltr" | "rtl";
  id?: string;
  disabled?: boolean;
  name?: string;
  orientation?: "horizontal" | "vertical";
  inverted?: boolean;
  minStepsBetweenThumbs?: number;
  size?: "sm" | "default";
}
```

## Examples

```jsx
// Default
export const Default: Story = {};

/** Drag the thumb, click a dot, or focus it and use the arrow keys. */

// Interactive
export const Interactive: Story = {
  render: (args) => {
    const [value, setValue] = useState('Medium');

    return (
      <div className="flex items-center gap-3">
        <StepSlider {...args} value={value} onValueChange={setValue} />
        <span className="text-ink-secondary text-sm">{value}</span>
      </div>
    );
  },
};

// Lowest
export const Lowest: Story = { args: { value: 'Low' } };
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Interactive

```jsx
/* Interactive */ compose(S, "Interactive")
```

### Lowest

```jsx
/* Lowest */ compose(S, "Lowest")
```

### Highest

```jsx
/* Highest */ compose(S, "Highest")
```

### Small

```jsx
/* Small */ compose(S, "Small")
```

### Disabled

```jsx
/* Disabled */ compose(S, "Disabled")
```

### WithStepTooltips

```jsx
/* With Step Tooltips */ compose(S, "WithStepTooltips")
```

### FiveStops

```jsx
/* Five Stops */ compose(S, "FiveStops")
```

### InSettingsRow

```jsx
/* In Settings Row */ compose(S, "InSettingsRow")
```

### MatchesSwitchSizes

```jsx
/* Matches Switch Sizes */ compose(S, "MatchesSwitchSizes")
```
