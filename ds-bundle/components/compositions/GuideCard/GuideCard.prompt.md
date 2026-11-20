GuideCard from @devart/ui-react. Use via `window.DevartUI.GuideCard` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `GuideCard.html`): Default, With Progress, Minimal, Last Step, Sides, Arrow Offset From Css Variable, Nudge, Leaving, Dark Theme.

## Props

```ts
interface GuideCardProps {
  header?: React.ReactNode;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  titleId?: string;
  descriptionId?: string;
  footer?: React.ReactNode;
  width?: "md" | "lg";
  side?: "top" | "right" | "bottom" | "left";
  arrowOffset?: string | number;
  nudgeCount?: number;
  isLeaving?: boolean;
  style?: CSSProperties;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
  children?: React.ReactNode;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  play: async ({ args, canvas }) => {
    const title = canvas.getByRole('heading', { level: 3 });

    await expect(title).toHaveAttribute('id', args.titleId);
  },
};

/** `header` carries the progress; `width="lg"` is 464px. */

// With Progress
export const WithProgress: Story = {
  args: { header: 'progress', width: 'lg' },
};

/** Title and body, nothing else. */

// Minimal
export const Minimal: Story = {
  args: { icon: 'none', children: 'short', footer: 'none' },
};

/** The last step: Back on the left, the finishing action on the right. */
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### WithProgress

```jsx
/* With Progress */ compose(S, "WithProgress")
```

### Minimal

```jsx
/* Minimal */ compose(S, "Minimal")
```

### LastStep

```jsx
/* Last Step */ compose(S, "LastStep")
```

### Sides

```jsx
/* Sides */ compose(S, "Sides")
```

### ArrowOffsetFromCssVariable

```jsx
/* Arrow Offset From Css Variable */ compose(S, "ArrowOffsetFromCssVariable")
```

### Nudge

```jsx
/* Nudge */ compose(S, "Nudge")
```

### Leaving

```jsx
/* Leaving */ compose(S, "Leaving")
```

### DarkTheme

```jsx
/* Dark Theme */ compose(S, "DarkTheme")
```
