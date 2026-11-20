StatusMark from @devart/ui-react. Use via `window.DevartUI.StatusMark` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `StatusMark.html`): Default, Tones, Sizes, Status Line.

## Props

```ts
interface StatusMarkProps {
  ref?: React.Ref;
  style?: CSSProperties;
  className?: string;
  id?: string;
  variant?: "error" | "warning" | "neutral";
  size?: "sm" | "md";
  interactive?: boolean;
}
```

## Examples

```jsx
// Default
export const Default: Story = {};

/** Three tones, and only three: the note, the warning, the failure. */

// Tones
export const Tones: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <StatusMark variant="neutral" />
      <StatusMark variant="warning" />
      <StatusMark variant="error" />
    </div>
  ),
};

/** 14px beside a 14px name, 16px beside a 16px title. */

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <span className="flex items-center gap-2">
        <StatusMark size="sm" variant="error" />
        <Typography element="span" textColor="primary" textStyle="body14">
          14px, in a row
        </Typography>
      </span>
      <span className="flex items-center gap-2">
        <StatusMark size="md" variant="error" />
        <Typography element="span" textColor="primary" textStyle="body16">
          16px, beside a title
        </Typography>
      </span>
    </div>
  ),
};

/** Where it belongs: the mark before the words that carry it. */
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Tones

```jsx
/* Tones */ compose(S, "Tones")
```

### Sizes

```jsx
/* Sizes */ compose(S, "Sizes")
```

### StatusLine

```jsx
/* Status Line */ compose(S, "StatusLine")
```
