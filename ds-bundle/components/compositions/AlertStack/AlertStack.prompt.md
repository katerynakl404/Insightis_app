AlertStack from @devart/ui-react. Use via `window.DevartUI.AlertStack` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `AlertStack.html`): Playground, Custom Labels, Two, Three, Keeps Scroll, Keyboard, Open, Single, Wrapped notices.

## Props

```ts
interface AlertStackProps {
  /** The notices — `Alert`s. The deck paints each folded notice's edge from the child's own `variant` prop, so a wrapper comp */
  children: React.ReactNode;
  lessLabel?: string;
  open?: boolean;
  defaultOpen?: boolean;
  ref?: React.Ref;
  moreLabel?: (count: number) => string;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  id?: string;
  style?: CSSProperties;
}
```

## Examples

```jsx
// Playground
export const Playground: StoryObj<PlaygroundArgs> = {
  args: { count: 3, open: false, lessLabel: 'Show Less' },
  argTypes: {
    count: { control: { type: 'range', min: 1, max: NOTICES.length } },
    open: { control: 'boolean' },
    lessLabel: { control: 'text' },
    defaultOpen: { table: { disable: true } },
    moreLabel: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
  },
  render: function Render({ count, ...args }) {
    const [, updateArgs] = useArgs<PlaygroundArgs>();
    return (
      <AlertStack {...args} onOpenChange={(open) => updateArgs({ open })}>
        {NOTICES.slice(0, count)}
      </AlertStack>
    );
  },
};

const ukPlural = new Intl.PluralRules('uk');
const ukMoreLabel = (count: number) =>
  `Показати ще ${count} ${ukPlural.select(count) === 'many' ? 'сповіщень' : 'сповіщення'}`;

/**
 * `moreLabel` takes the number of notices behind the first, so the label can
 * pluralise and be translated. It is the edge's accessible name — read out, not
 * shown.
 */

// Custom Labels
export const CustomLabels: Story = {
  render: () => (
    <AlertStack moreLabel={ukMoreLabel} lessLabel="Згорнути">
      {[blocked, restored, trial]}
    </AlertStack>
  ),
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Показати ще 2 сповіщення' })
    );
    await expect(
      canvas.getByRole('button', { name: 'Згорнути' })
    ).toHaveFocus();
  },
};

/** Two notices: one edge under the first. */

// Two
export const Two: Story = {
  render: () => <AlertStack>{[blocked, restored]}</AlertStack>,
  play: async ({ canvas }) => {
    const edge = canvas.getByRole('button', { name: 'Show 1 more notice' });
    await expect(edge).toHaveAttribute('aria-expanded', 'false');
    // The edge is in the colours of the notice it stands for.
    await expect(edge.className).toContain('bg-alert-bg-success');
    await expect(canvas.queryByText(RESTORED)).not.toBeInTheDocument();
  },
};

/** Three or more: two edges, the second further in. Opens and folds again. */
```

### Playground

```jsx
/* Playground */ compose(S, "Playground")
```

### CustomLabels

```jsx
/* Custom Labels */ compose(S, "CustomLabels")
```

### Two

```jsx
/* Two */ compose(S, "Two")
```

### Three

```jsx
/* Three */ compose(S, "Three")
```

### KeepsScroll

```jsx
/* Keeps Scroll */ compose(S, "KeepsScroll")
```

### Keyboard

```jsx
/* Keyboard */ compose(S, "Keyboard")
```

### Open

```jsx
/* Open */ compose(S, "Open")
```

### Single

```jsx
/* Single */ compose(S, "Single")
```

### WrappedNotices

```jsx
/* Wrapped notices */ compose(S, "WrappedNotices")
```
