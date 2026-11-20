StatusView from @devart/ui-react. Use via `window.DevartUI.StatusView` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `StatusView.html`): StatusView, Neutral, Error State, Error State Custom Retry, Info, Success, Sizes, Tones, Empty State, With Custom Icon, With Action, Part Sizes.

## Props

```ts
interface StatusViewProps {
  tone?: "info" | "error" | "success" | "neutral" | "transparent" | "muted";
  icon?: React.ReactNode;
  iconSize?: "base" | "sm" | "md" | "lg" | "xs";
  withIconHalo?: boolean;
  title: string;
  titleSize?: "base" | "sm" | "md" | "lg" | "xs";
  contentWidth?: "sm" | "md";
  description?: React.ReactNode;
  actions?: React.ReactNode;
  actionsOrientation?: "inline" | "stacked";
  retryLabel?: string;
  retryButton?: ButtonProps;
  ref?: React.Ref;
  onRetry?: () => void;
  style?: CSSProperties;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xs";
  surface?: "standalone" | "embedded";
}
```

## Examples

```jsx
// StatusView
export const Page: Story = {
  name: 'StatusView',
  render: () => (
    <ChangePage group="StatusView" title="StatusView">
      <ChangeCase
        after={
          <StatusView
            actions={<Button size="sm">Clear filters</Button>}
            className="w-full"
            description="No connection matches “prod-eu”. Try a shorter query, or clear the filters."
            icon={<EmptyStateIllustration />}
            title="No connections found"
            withIconHalo={false}
          />
        }
        afterNote="EmptyStateIllustration — 150×104, all tokens"
        before={
          <StatusView
            actions={<Button size="sm">Clear filters</Button>}
            className="w-full"
            description="No connection matches “prod-eu”. Try a shorter query, or clear the filters."
            icon={<SearchX />}
            title="No connections found"
          />
        }
        beforeNote="a lucide glyph in a tinted halo"
        beforeSource="the same StatusView with the only artwork it used to offer."
        files={['src/components/StatusView/index.tsx']}
        footnote={
          <>
            Deliberately not a magnifier: "nothing found" is already said by the
            title, and a magnifier repeats it while saying nothing about what is
            absent. The illustration mirrors the list that is missing. Every
            colour is a token — <Code>--surface-card</Code>,{' '}
            <Code>--stroke-border</Code>, <Code>--ink-inactive</Code> — so it
            re-themes with the page and needs no dark variant. Flip the theme
            toolbar to check that.
          </>
        }
        n={51}
// …

// Neutral
export const Neutral: Story = {};

// Error State
export const ErrorState: Story = {
  args: {
    tone: 'error',
    title: 'Something went wrong',
    description: 'We could not load your data. Please try again.',
    retryLabel: 'Retry',
  },
};
```

### Page

```jsx
/* StatusView */ compose(S, "Page")
```

### Neutral

```jsx
/* Neutral */ compose(S2, "Neutral")
```

### ErrorState

```jsx
/* Error State */ compose(S2, "ErrorState")
```

### ErrorStateCustomRetry

```jsx
/* Error State Custom Retry */ compose(S2, "ErrorStateCustomRetry")
```

### Info

```jsx
/* Info */ compose(S2, "Info")
```

### Success

```jsx
/* Success */ compose(S2, "Success")
```

### Sizes

```jsx
/* Sizes */ compose(S2, "Sizes")
```

### Tones

```jsx
/* Tones */ compose(S2, "Tones")
```

### EmptyState

```jsx
/* Empty State */ compose(S2, "EmptyState")
```

### WithCustomIcon

```jsx
/* With Custom Icon */ compose(S2, "WithCustomIcon")
```

### WithAction

```jsx
/* With Action */ compose(S2, "WithAction")
```

### PartSizes

```jsx
/* Part Sizes */ compose(S2, "PartSizes")
```
