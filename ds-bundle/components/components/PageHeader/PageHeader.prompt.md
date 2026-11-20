PageHeader from @devart/ui-react. Use via `window.DevartUI.PageHeader` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `PageHeader.html`): PageHeader, Default, With Back, With Actions, Back And Actions, With Title Right, With Title Left And Right, With Title Right And Actions, Long Title, Wrap Title, Wrap title (phone), Condensed, Condensed Wrap Title, Loading, Loading With Custom Content, Title Left Only.

## Props

```ts
interface PageHeaderProps {
  /** The page title — an `h2`, the developers' level and the product's. An empty string renders no heading, leaving only `tit */
  title: React.ReactNode;
  /** Renders the back control. Omit it on a top-level page. */
  onBack?: () => void;
  /** Accessible name for the back control. */
  backLabel?: string;
  /** Trailing actions, pushed to the end of the row. */
  actions?: React.ReactNode;
  /** Content immediately before the title — a leading icon, a logo, the mobile sidebar trigger. It opens the row, 12px from w */
  titleLeft?: React.ReactNode;
  /** Content immediately after the title, inside the title cluster — an info control, a status chip, the data source a form i */
  titleRight?: React.ReactNode;
  /** DRAFT. The same header, shorter: a `heading20` where the full one has a `heading30` (`heading24` below `md`), and the ba */
  condensed?: boolean;
  /** The title wraps onto as many lines as it needs instead of truncating. For a title that must be read whole: on a phone a  */
  wrapTitle?: boolean;
  /** Shows `loadingContent` in place of the title. `titleLeft` and the back control stay; `titleRight` and `actions` are not  */
  isLoading?: boolean;
  /** Placeholder for the title while `isLoading`. Defaults to a `Skeleton`. */
  loadingContent?: React.ReactNode;
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
// PageHeader
export const Page: Story = {
  name: 'PageHeader',
  render: () => (
    <ChangePage group="PageHeader" title="PageHeader">
      <ChangeCase
        after={
          <div className="w-full">
            <PageHeader
              actions={SAVE}
              backLabel="Back to connections"
              onBack={noop}
              title="Connect to DB2"
              titleRight={DB2}
            />
          </div>
        }
        afterNote="onBack: a 24px arrow 12px from the title · titleRight 12px"
        before={
          <div className="w-full">
            <UpstreamPageHeader
              actions={SAVE}
              title="Connect to DB2"
              titleLeft={
                <IconButton aria-label="Back" variant="tertiary">
                  <ArrowLeft />
                </IconButton>
              }
              titleRight={DB2}
            />
          </div>
        }
        beforeNote="the arrow passed as titleLeft · everything 8px apart"
        beforeSource={
          <>
            {UPSTREAM_SOURCE} It had no back control, so the arrow is passed the
            way a page had to — through <Code>titleLeft</Code>, the one slot
            before the title — as a default tertiary <Code>IconButton</Code>.
          </>
        }
        files={['src/components/PageHeader/index.tsx']}
// …

// Default
export const Default: Story = {};

/**
 * A drill-down page. The arrow is a 24px glyph in a 36px box, sized against the
 * title, and the box sits 6px from it.
 */

// With Back
export const WithBack: Story = {
  args: { title: 'PostgreSQL', onBack: fn(), backLabel: 'Back to connections' },
};
```

### Page

```jsx
/* PageHeader */ compose(S, "Page")
```

### Default

```jsx
/* Default */ compose(S2, "Default")
```

### WithBack

```jsx
/* With Back */ compose(S2, "WithBack")
```

### WithActions

```jsx
/* With Actions */ compose(S2, "WithActions")
```

### BackAndActions

```jsx
/* Back And Actions */ compose(S2, "BackAndActions")
```

### WithTitleRight

```jsx
/* With Title Right */ compose(S2, "WithTitleRight")
```

### WithTitleLeftAndRight

```jsx
/* With Title Left And Right */ compose(S2, "WithTitleLeftAndRight")
```

### WithTitleRightAndActions

```jsx
/* With Title Right And Actions */ compose(S2, "WithTitleRightAndActions")
```

### LongTitle

```jsx
/* Long Title */ compose(S2, "LongTitle")
```

### WrapTitle

```jsx
/* Wrap Title */ compose(S2, "WrapTitle")
```

### WrapTitleOnPhone

```jsx
/* Wrap title (phone) */ compose(S2, "WrapTitleOnPhone")
```

### Condensed

```jsx
/* Condensed */ compose(S2, "Condensed")
```

### CondensedWrapTitle

```jsx
/* Condensed Wrap Title */ compose(S2, "CondensedWrapTitle")
```

### Loading

```jsx
/* Loading */ compose(S2, "Loading")
```

### LoadingWithCustomContent

```jsx
/* Loading With Custom Content */ compose(S2, "LoadingWithCustomContent")
```

### TitleLeftOnly

```jsx
/* Title Left Only */ compose(S2, "TitleLeftOnly")
```
