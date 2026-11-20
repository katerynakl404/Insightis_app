Banner from @devart/ui-react. Use via `window.DevartUI.Banner` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Banner.html`): Banner, Primary, Variants, Sizes, Dismissible, Optional Slots, Rich Description.

## Props

```ts
interface BannerProps {
  title: string;
  description?: React.ReactNode;
  descriptionClassName?: string;
  titleClassName?: string;
  icon?: React.ReactNode;
  iconClassName?: string;
  action?: React.ReactNode;
  actionClassName?: string;
  /** Renders the corner dismiss button described by the reference anatomy. */
  onDismiss?: () => void;
  /** Accessible label for the corner dismiss button. */
  dismissLabel?: string;
  ref?: React.Ref;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  variant?: "default" | "horizontalWide" | "diagonalAiry" | "diagonalFade" | "horizontalSlab";
  size?: "sm" | "default";
}
```

## Examples

```jsx
// Banner
export const Page: Story = {
  name: 'Banner',
  render: () => (
    <ChangePage group="Banner" title="Banner">
      <ChangeCase
        after={
          <TryIt action="Hover the ✕ — only the glyph brightens">
            <Dismissible Component={Banner} />
          </TryIt>
        }
        afterNote="a 32px glyph-only control — banner-grad-sub → banner-grad-text"
        before={
          <TryIt action="Hover the ✕ — a pale box lands on the artwork">
            <Dismissible Component={UpstreamBanner} />
          </TryIt>
        }
        beforeNote="IconButton tertiary xs — an ink-body glyph, a --state-hover box"
        beforeSource={
          <>
            the developers' own <Code>Banner</Code>, vendored unchanged from
            their 1.4.0 into <Code>changes/upstream/Banner</Code>, its dismiss
            their own <Code>IconButton</Code> vendored beside it. The ✕ is a
            component the Banner renders itself, so no prop reaches it.
          </>
        }
        files={['src/components/Banner/index.tsx']}
        footnote={
          <>
            The 32px box stays — it is the hit area. On the solid variant the
            glyph goes <Code>--ink-icon</Code> → <Code>--ink-icon-hover</Code>.
            The same rule as <Code>InputGroupAction</Code> (§45): an icon docked
            on a surface that already owns hover does not get a surface of its
            own.
          </>
        }
        n={85}
        title="The dismiss answers with colour, not a fill"
        why="The dismiss was a tertiary button: on a gradient its hover fill was a pale box sitting on the artwork, and the ✕ stopped reading as part of the banner."
      />
// …

// Primary
export const Primary: Story = {
  args: {
    icon: <Plug2 />,
    action: (
      <Button variant="primary" size="sm">
        Connect source
      </Button>
    ),
  },
};

// Variants
export const Variants: Story = {
  render: (args) => (
    <div className="flex w-full flex-col gap-4">
      <Banner
        {...args}
        variant="default"
        icon={<Plug2 />}
        action={
          <Button variant="secondary" size="sm">
            Connect source
          </Button>
        }
      />
      <Banner
        {...args}
        variant="horizontalWide"
        icon={<Plug2 />}
        action={
          <Button variant="primary" size="sm">
            Connect source
          </Button>
        }
      />
      <Banner
        {...args}
        variant="diagonalAiry"
        icon={<Sun />}
        action={
          <Button variant="secondary" size="sm">
            Explore metrics
          </Button>
        }
      />
      <Banner
        {...args}
        variant="diagonalFade"
        icon={<Link />}
        action={
          <Button variant="secondary" size="sm">
            Share workspace
// …
```

### Page

```jsx
/* Banner */ compose(S, "Page")
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

### Dismissible

```jsx
/* Dismissible */ compose(S2, "Dismissible")
```

### OptionalSlots

```jsx
/* Optional Slots */ compose(S2, "OptionalSlots")
```

### RichDescription

```jsx
/* Rich Description */ compose(S2, "RichDescription")
```
