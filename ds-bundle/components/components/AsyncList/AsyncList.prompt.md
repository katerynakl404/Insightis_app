AsyncList from @devart/ui-react. Use via `window.DevartUI.AsyncList` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `AsyncList.html`): Default, Initial Loading, Loading Next Page, Empty, Error State, Grid Layout, With Selection.

## Props

```ts
interface AsyncListProps {
  items: T[];
  isLoading: boolean;
  isLoadingNextPage: boolean;
  emptyContent: React.ReactNode;
  loadingContent: React.ReactNode;
  errorContent?: React.ReactNode;
  isError?: boolean;
  containerProps?: HTMLAttributes<HTMLDivElement> & { [key: `data-${string}`]: string; };
  containerClassName?: string;
  renderItem: (item: T, index: number) => ReactNode;
  /** Replaces the default `items.map(renderItem)` for the populated state. The seam exists so an application can window, grou */
  renderItems?: (items: T[], renderItem: (item: T, index: number) => ReactNode) => ReactNode;
}
```

## Examples

```jsx
// Default
export const Default: Story = {};

// Initial Loading
export const InitialLoading: Story = {
  args: { items: [], isLoading: true },
};

/** Items stay on screen while the next page arrives. */

// Loading Next Page
export const LoadingNextPage: Story = {
  args: { isLoadingNextPage: true },
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### InitialLoading

```jsx
/* Initial Loading */ compose(S, "InitialLoading")
```

### LoadingNextPage

```jsx
/* Loading Next Page */ compose(S, "LoadingNextPage")
```

### Empty

```jsx
/* Empty */ compose(S, "Empty")
```

### ErrorState

```jsx
/* Error State */ compose(S, "ErrorState")
```

### GridLayout

```jsx
/* Grid Layout */ compose(S, "GridLayout")
```

### WithSelection

```jsx
/* With Selection */ compose(S, "WithSelection")
```
