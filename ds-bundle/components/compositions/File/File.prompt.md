File from @devart/ui-react. Use via `window.DevartUI.File` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `File.html`): Default, Name Only, Loading, Uploading, Error State, Clickable, Custom Icon, Interactive States, Variants.

## Props

```ts
interface FileProps {
  className?: string;
  name: string;
  fileSize?: string;
  /** Upload progress 0–100; when set, replaces the `fileSize` caption with a progress bar. */
  progress?: number;
  isLoading?: boolean;
  isError?: boolean;
  icon?: React.ReactNode;
  rightSlot?: React.ReactNode;
  onClick?: () => void;
  onDismiss?: () => void;
  /** Accessible name of the ✕ button. */
  dismissLabel?: string;
  onRetry?: () => void;
  variant?: "default" | "tertiary";
  size?: "sm" | "md" | "lg" | "xl" | "xs";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "rounded" | "full";
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: (args) => (
    <div className="w-72">
      <File {...args} />
    </div>
  ),
};

/** No handlers → no trailing controls, just the chip. */

// Name Only
export const NameOnly: Story = {
  args: { fileSize: undefined, onDismiss: undefined },
  render: (args) => (
    <div className="w-72">
      <File {...args} />
    </div>
  ),
};

// Loading
export const Loading: Story = {
  args: { isLoading: true },
  render: (args) => (
    <div className="w-72">
      <File {...args} />
    </div>
  ),
};

/** `progress` replaces the size caption with a live progress bar + percent. */
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### NameOnly

```jsx
/* Name Only */ compose(S, "NameOnly")
```

### Loading

```jsx
/* Loading */ compose(S, "Loading")
```

### Uploading

```jsx
/* Uploading */ compose(S, "Uploading")
```

### ErrorState

```jsx
/* Error State */ compose(S, "ErrorState")
```

### Clickable

```jsx
/* Clickable */ compose(S, "Clickable")
```

### CustomIcon

```jsx
/* Custom Icon */ compose(S, "CustomIcon")
```

### InteractiveStates

```jsx
/* Interactive States */ compose(S, "InteractiveStates")
```

### Variants

```jsx
/* Variants */ compose(S, "Variants")
```
