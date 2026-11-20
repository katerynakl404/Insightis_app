Counter from @devart/ui-react. Use via `window.DevartUI.Counter` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Counter.html`): Default, Active, States, Sizes, In A List.

## Props

```ts
interface CounterProps {
  ref?: React.Ref;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  size?: "sm" | "md";
  active?: boolean;
}
```

## Examples

```jsx
// Default
export const Default: Story = {};

// Active
export const Active: Story = { args: { active: true } };

/** Both states beside each other, and the digits that prove the box does not stretch. */

// States
export const States: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Counter>1</Counter>
      <Counter>10</Counter>
      <Counter active>1</Counter>
      <Counter active>10</Counter>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'A second digit does not widen the box — the same rule every mark in the kit follows. If a count outgrows it, the box grows on BOTH axes or the count is abbreviated; it never becomes an oval.',
      },
    },
  },
};

/** Both steps, and the thing each one sits next to. A size is only right relative to its
 *  neighbour, so neither is shown on its own. */
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Active

```jsx
/* Active */ compose(S, "Active")
```

### States

```jsx
/* States */ compose(S, "States")
```

### Sizes

```jsx
/* Sizes */ compose(S, "Sizes")
```

### InAList

```jsx
/* In A List */ compose(S, "InAList")
```
