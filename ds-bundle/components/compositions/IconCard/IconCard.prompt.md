IconCard from @devart/ui-react. Use via `window.DevartUI.IconCard` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `IconCard.html`): Default, Hover Reveal, Unknown Connector, Long Name, Disabled, Loading, Catalog Grid, Keyboard, Disabled Is Inert.

## Props

```ts
interface IconCardProps {
  /** Gates activation as well as the overlay, so it is declared here rather than inherited from the recipe — a style axis may */
  disabled?: boolean;
  /** Mark above the caption. Decorative — the card is named by `aria-label`. */
  icon: React.ReactNode;
  /** Caption under the icon; clamped to two lines. */
  label: string;
  /** Marker pinned to the icon's top-right corner, e.g. a "popular" flame. */
  badge?: React.ReactNode;
  /** Caption on the hover overlay. */
  actionLabel: string;
  /** Glyph before `actionLabel` on the overlay. */
  actionIcon?: React.ReactNode;
  /** Semantic activation (connect, open, …). Skipped when `disabled`, or when a composed `onClick` / `onKeyDown` calls `preve */
  onActivate?: () => void;
  style?: CSSProperties;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
}
```

## Examples

```jsx
// Default
export const Default: Story = {};

/**
 * The reveal is the tile's reason to exist. At rest it is a mark and a name; on
 * hover a scrim — the card's own surface, mostly opaque — fades in to give the
 * action a ground to sit on, and the action rises 6px into place.
 *
 * Hover the tile, or tab to it: focus reveals it the same way.
 */

// Hover Reveal
export const HoverReveal: Story = {
  args: connectorArgs('Snowflake'),
};

/** An unknown connector falls back to a monogram — never a broken image. */

// Unknown Connector
export const UnknownConnector: Story = {
  args: connectorArgs('Fabrikam', 'Fabrikam DB'),
};

/** Captions clamp to two lines rather than widening the card. */
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### HoverReveal

```jsx
/* Hover Reveal */ compose(S, "HoverReveal")
```

### UnknownConnector

```jsx
/* Unknown Connector */ compose(S, "UnknownConnector")
```

### LongName

```jsx
/* Long Name */ compose(S, "LongName")
```

### Disabled

```jsx
/* Disabled */ compose(S, "Disabled")
```

### Loading

```jsx
/* Loading */ compose(S, "Loading")
```

### CatalogGrid

```jsx
/* Catalog Grid */ compose(S, "CatalogGrid")
```

### Keyboard

```jsx
/* Keyboard */ compose(S, "Keyboard")
```

### DisabledIsInert

```jsx
/* Disabled Is Inert */ compose(S, "DisabledIsInert")
```
