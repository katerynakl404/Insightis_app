Button from @devart/ui-react. Use via `window.DevartUI.Button` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Button.html`): Button, Primary, Variants, Sizes, With Icons, Loading, Disabled, With Tooltip, Full Width, As Child.

## Props

```ts
interface ButtonProps {
  asChild?: boolean;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  /** Shows a spinner and blocks pointer interaction while keeping the variant fill (the label is retained). Sets `aria-busy`; */
  isLoading?: boolean;
  /** Shown on hover and focus; `true` shows the `aria-label`. A disabled button with a tooltip is rendered `aria-disabled`, s */
  tooltip?: React.ReactNode;
  tooltipSide?: "top" | "right" | "bottom" | "left";
  ref?: React.Ref;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "transparent" | "tertiary" | "destructiveTertiary" | "destructive" | "primaryTertiary" | "outline" | "destructiveOutline" | "transparentUnderline";
  size?: "sm" | "md" | "lg" | "xl" | "xs";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "rounded" | "full";
  align?: "center" | "right" | "left";
  fullWidth?: boolean;
}
```

## Examples

```jsx
// Button
export const Page: Story = {
  name: 'Button',
  render: () => (
    <ChangePage group="Button and IconButton" title="Button">
      <ChangeCase
        after={<SecondaryOff Btn={Button} Icon={IconButton} />}
        afterNote="no fill — the border and the label carry it"
        before={<SecondaryOff Btn={UpstreamButton} Icon={UpstreamIconButton} />}
        beforeNote="--state-disabled fill, whatever it sits on"
        beforeSource={UPSTREAM_SOURCE}
        files={[
          'src/components/Button/index.tsx',
          'src/components/IconButton/index.tsx',
        ]}
        footnote={
          <>
            Transparent is what <Code>outline</Code> already did, and it is the
            one answer that holds on every surface. <Code>primary</Code> keeps{' '}
            <Code>--state-disabled</Code>: a filled button switched off has
            nothing else to be. The label and the fade in the After half are
            §165; the destructive form is the next case. Switch the toolbar to
            dark to see the fill turn into the brightest thing in the row.
          </>
        }
        n={80}
        title="A disabled secondary has no fill"
        why="An opaque fill depends on where it lands: on a tinted row — a chips row, a banner, a table header — a switched-off button became a block of its own, and on dark the brightest thing in the row."
      />

      <ChangeCase
        after={<TreeRows />}
        afterNote="3xs — a 20px box, a 12px glyph"
        before={<TreeRows old />}
        beforeNote="2xs — a 24px box, a 16px glyph"
        beforeSource={
          <>
            the developers' <Code>IconButton</Code>, vendored, at{' '}
            <Code>2xs</Code> — the smallest box it has. The rows around it are
            the same in both halves.
          </>
// …

// Primary
export const Primary: Story = {};

/** Every boxed variant. Size is independent of variant — any of the five sizes
 * pairs with any of these. */
const BOXED_VARIANTS = [
  ['primary', 'Primary'],
  ['secondary', 'Secondary'],
  ['outline', 'Outline'],
  ['tertiary', 'Tertiary'],
  ['primaryTertiary', 'Tertiary brand'],
  ['destructive', 'Destructive'],
  ['destructiveOutline', 'Destructive outline'],
  ['destructiveTertiary', 'Destructive tertiary'],
] as const;

// Variants
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {BOXED_VARIANTS.map(([variant, label]) => (
        <Button {...args} key={variant} variant={variant}>
          {label}
        </Button>
      ))}
    </div>
  ),
};
```

### Page

```jsx
/* Button */ compose(S, "Page")
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

### WithIcons

```jsx
/* With Icons */ compose(S2, "WithIcons")
```

### Loading

```jsx
/* Loading */ compose(S2, "Loading")
```

### Disabled

```jsx
/* Disabled */ compose(S2, "Disabled")
```

### WithTooltip

```jsx
/* With Tooltip */ compose(S2, "WithTooltip")
```

### FullWidth

```jsx
/* Full Width */ compose(S2, "FullWidth")
```

### AsChild

```jsx
/* As Child */ compose(S2, "AsChild")
```
