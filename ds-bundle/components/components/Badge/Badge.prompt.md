Badge from @devart/ui-react. Use via `window.DevartUI.Badge` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Badge.html`): Badge, Primary, Variants, Sizes, With Dot, With Icon, Removable, Flat.

## Props

```ts
interface BadgeProps {
  withDot?: boolean;
  removeLabel?: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  onDelete?: MouseEventHandler<HTMLButtonElement>;
  /** Text shown on hover and on keyboard focus. A badge is a STATUS, never a control: it carries no action, and a tooltip is  */
  tooltip?: React.ReactNode;
  tooltipSide?: "top" | "right" | "bottom" | "left";
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  flat?: boolean;
  variant?: "error" | "success" | "brand" | "primary" | "secondary" | "attention" | "green";
  size?: "sm" | "md" | "lg" | "xl";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "rounded" | "full";
}
```

## Examples

```jsx
// Badge
export const Page: Story = {
  name: 'Badge',
  render: () => (
    <ChangePage group="Badge" title="Badge">
      <ChangeCase
        after={
          <div className="flex flex-col gap-4">
            <VariantRow />
            <RowWithChip />
          </div>
        }
        afterNote="a hairline mixed from currentColor, on every variant"
        before={
          <div className="flex flex-col gap-4">
            <VariantRow old />
            <RowWithChip old />
          </div>
        }
        beforeNote="border-transparent — the chip is its fill and nothing else"
        beforeSource={
          <>
            the published base with <Code>border-transparent</Code> put back
            through <Code>className</Code>. Five of the seven variants declared
            it themselves; <Code>brand</Code> and <Code>green</Code> already had
            a border, which is the inconsistency the change removes.
          </>
        }
        files={['src/components/Badge/index.tsx', 'globals.css']}
        footnote={
          <>
            Hover a row in the lower panel. <Code>--badge-border</Code> is a{' '}
            <Code>color-mix()</Code> from <Code>currentColor</Code>, so the
            hairline is the chip's own hue on every variant rather than a
            seventh token to keep in sync. It matters where a fill meets a
            surface it matches: <Code>secondary</Code> sits on{' '}
            <Code>--surface-card2</Code>, which is also roughly where a hovered
            row lands, so without the line the chip dissolves into the row under
            the pointer. <Code>flat</Code> is the opt-out, for a chip already
            inside a bordered container.
          </>
// …

// Primary
export const Primary: Story = {};

// Variants
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Badge {...args} variant="primary">
        Primary
      </Badge>
      <Badge {...args} variant="secondary">
        Secondary
      </Badge>
      <Badge {...args} variant="attention">
        Attention
      </Badge>
      <Badge {...args} variant="success">
        Success
      </Badge>
      <Badge {...args} variant="error">
        Error
      </Badge>
      <Badge {...args} variant="brand">
        Brand
      </Badge>
      <Badge {...args} variant="green">
        Green
      </Badge>
    </div>
  ),
};

/**
 * Size steps. `md` is the default; `sm` is the table-column step — the
 * reference specifies height 20px / padding 0 6px for it, so a badge in a
 * badge column never out-weighs the text rows around it.
 */
```

### Page

```jsx
/* Badge */ compose(S, "Page")
```

### Primary

```jsx
/* Primary */ compose(S2, "Primary")
```

### Variants

```jsx
/* Variants */ compose(S2, "Variants")
```

### Sizes

```jsx
/* Sizes */ compose(S2, "Sizes")
```

### WithDot

```jsx
/* With Dot */ compose(S2, "WithDot")
```

### WithIcon

```jsx
/* With Icon */ compose(S2, "WithIcon")
```

### Removable

```jsx
/* Removable */ compose(S2, "Removable")
```

### Flat

```jsx
/* Flat */ compose(S2, "Flat")
```
