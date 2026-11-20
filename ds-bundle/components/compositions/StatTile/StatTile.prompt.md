StatTile from @devart/ui-react. Use via `window.DevartUI.StatTile` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `StatTile.html`): Default, Row, Sizes, With Badge.

## Props

```ts
interface StatTileProps {
  /** What is being counted. Overline — it is a caption, not a heading. */
  label: React.ReactNode;
  value: React.ReactNode;
  /** The sentence that makes the number mean something. */
  description?: React.ReactNode;
  /** A badge, a trend, a link — anything that qualifies the value. */
  rightSlot?: React.ReactNode;
  style?: CSSProperties;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
  size?: "sm" | "md";
}
```

## Examples

```jsx
// Default
export const Default: Story = {};

/** A row reads as one object: same size, same order, one number each. */

// Row
export const Row: Story = {
  render: () => (
    <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-3">
      <StatTile
        label="Users"
        value={1}
        description="have access to this workspace"
      />
      <StatTile
        label="Connections"
        value={3}
        description="linked to this workspace"
      />
      <StatTile
        label="Queries"
        value="1,608"
        description="in the last 30 days"
      />
    </div>
  ),
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="flex w-full max-w-xl flex-col gap-4">
      <StatTile
        size="sm"
        label="Queries"
        value="1,608"
        description="in the last 30 days"
      />
      <StatTile
        size="md"
        label="Queries"
        value="1,608"
        description="in the last 30 days"
      />
    </div>
  ),
};

/** `rightSlot` qualifies the number without competing with it. */
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Row

```jsx
/* Row */ compose(S, "Row")
```

### Sizes

```jsx
/* Sizes */ compose(S, "Sizes")
```

### WithBadge

```jsx
/* With Badge */ compose(S, "WithBadge")
```
