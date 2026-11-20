ConnectorLogo from @devart/ui-react. Use via `window.DevartUI.ConnectorLogo` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `ConnectorLogo.html`): ConnectorLogo, Pack, Sizes, Fallback And Matching, Catalog Cards.

## Props

```ts
interface ConnectorLogoProps {
  /** The connector, as a name or as its slug — `PostgreSQL`, `postgresql` and `Amazon S3` all resolve to the same mark. */
  connector: string;
  /** Accessible name for the mark. Leave it off when the connector's name is already rendered next to the logo, which is the  */
  label?: string;
  style?: CSSProperties;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
  size?: "sm" | "md" | "lg" | "xs";
}
```

## Examples

```jsx
// ConnectorLogo
export const Page: Story = {
  name: 'ConnectorLogo',
  render: () => (
    <ChangePage group="ConnectorLogo" title="ConnectorLogo">
      <NoPanel
        section={16}
        title="Connector marks as data-URIs, a monogram for the rest"
        why={NOT_UPSTREAM}
      />
      <NoPanel
        section={16}
        title="The DB2 mark — it fell back to a “D”"
        why={NOT_UPSTREAM}
      />
      <NoPanel
        section={16}
        title="The SQLite mark — it fell back to an “S”"
        why={NOT_UPSTREAM}
      />
    </ChangePage>
  ),
};

// Pack
export const Pack: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-4">
      {PACK.map((connector) => (
        <ConnectorLogo {...args} connector={connector} key={connector} />
      ))}
    </div>
  ),
};

// Sizes
export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-end gap-4">
      {(['xs', 'sm', 'md', 'lg'] as const).map((size) => (
        <ConnectorLogo {...args} key={size} size={size} />
      ))}
    </div>
  ),
};

/**
 * A connector outside the pack renders a monogram tile rather than an empty
 * box or a broken image — the row still reads as a row. The same name spelled
 * three ways resolves to the one mark, so a generated page does not have to
 * know the slug.
 */
```

### Page

```jsx
/* ConnectorLogo */ compose(S, "Page")
```

### Pack

```jsx
/* Pack */ compose(S2, "Pack")
```

### Sizes

```jsx
/* Sizes */ compose(S2, "Sizes")
```

### FallbackAndMatching

```jsx
/* Fallback And Matching */ compose(S2, "FallbackAndMatching")
```

### CatalogCards

```jsx
/* Catalog Cards */ compose(S2, "CatalogCards")
```
