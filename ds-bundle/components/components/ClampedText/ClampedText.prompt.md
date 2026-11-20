ClampedText from @devart/ui-react. Use via `window.DevartUI.ClampedText` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `ClampedText.html`): Default, Fits Whole, Long Word, Handed Over.

## Props

```ts
interface ClampedTextProps {
  text: string;
  /** How many lines show before See more. */
  lines?: 1 | 2 | 3 | 4 | 5 | 6;
  textStyle?: unknown;
  textColor?: "body" | "inherit" | "success" | "warning" | "primary" | "secondary" | "destructive" | "light" | "accent" | "white";
  /** Show the whole text somewhere else instead of opening it in place. */
  onMore?: () => void;
  moreLabel?: string;
  lessLabel?: string;
  className?: string;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: (args) => (
    <div className="w-80">
      <ClampedText {...args} />
    </div>
  ),
};

/** Short enough to fit: no See more. */

// Fits Whole
export const FitsWhole: Story = {
  args: { text: 'Ad-hoc analytics and reporting for the data team.' },
  render: (args) => (
    <div className="w-80">
      <ClampedText {...args} />
    </div>
  ),
};

/** A word longer than the line — an id typed without spaces, a URL: it breaks
 * where it has to, so the clamp counts its lines and See more appears. */

// Long Word
export const LongWord: Story = {
  args: {
    text: `${'412'.repeat(80)} https://reports.example.com/finance/warehouse/views/monthly-close/2026/11/general-ledger-reconciliation`,
  },
  render: (args) => (
    <div className="w-80">
      <ClampedText {...args} />
    </div>
  ),
};

/** Handed over: See more asks the caller to show the whole text elsewhere. */
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### FitsWhole

```jsx
/* Fits Whole */ compose(S, "FitsWhole")
```

### LongWord

```jsx
/* Long Word */ compose(S, "LongWord")
```

### HandedOver

```jsx
/* Handed Over */ compose(S, "HandedOver")
```
