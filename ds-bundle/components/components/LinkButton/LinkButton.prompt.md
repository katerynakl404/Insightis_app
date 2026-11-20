LinkButton from @devart/ui-react. Use via `window.DevartUI.LinkButton` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `LinkButton.html`): Primary, In Text, Variants, With Trailing Glyph, Disabled, Inline, As Button.

## Props

```ts
interface LinkButtonProps {
  /** Render the child element instead of an `<a>` — a router link. */
  asChild?: boolean;
  disabled?: boolean;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  ref?: React.Ref;
  style?: CSSProperties;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "white";
  inline?: boolean;
}
```

## Examples

```jsx
// Primary
export const Primary: Story = {};

/** A link takes the size of the text it sits in — that is what makes it a link. */

// In Text
export const InText: Story = {
  render: () => (
    <Typography element="p" textColor="secondary" className="max-w-md">
      A connection has to be added to a workspace and then given a scope in it —
      see <LinkButton href="#">how scopes work</LinkButton> for the difference.
    </Typography>
  ),
};

// Variants
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <LinkButton href="#">Primary — the default</LinkButton>
      <LinkButton href="#" variant="secondary">
        Secondary — inside copy it must not outshout the sentence
      </LinkButton>
      <div className="rounded-md bg-brand-primary p-3">
        <LinkButton href="#" variant="white">
          White — on a solid fill
        </LinkButton>
      </div>
    </div>
  ),
};
```

### Primary

```jsx
/* Primary */ compose(S, "Primary")
```

### InText

```jsx
/* In Text */ compose(S, "InText")
```

### Variants

```jsx
/* Variants */ compose(S, "Variants")
```

### WithTrailingGlyph

```jsx
/* With Trailing Glyph */ compose(S, "WithTrailingGlyph")
```

### Disabled

```jsx
/* Disabled */ compose(S, "Disabled")
```

### Inline

```jsx
/* Inline */ compose(S, "Inline")
```

### AsButton

```jsx
/* As Button */ compose(S, "AsButton")
```
