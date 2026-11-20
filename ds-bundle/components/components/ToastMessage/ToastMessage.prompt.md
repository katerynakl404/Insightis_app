ToastMessage from @devart/ui-react. Use via `window.DevartUI.ToastMessage` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `ToastMessage.html`): Toast, Message, Appearances, States, Variants, With Action.

## Props

```ts
interface ToastMessageProps {
  variant?: "info" | "error" | "success" | "warning";
  message: React.ReactNode;
  description?: string;
  action?: ToastAction;
  icon?: React.ReactNode;
  duration?: number;
  onClose?: () => void;
  /** Accessible label for the close button. */
  closeLabel?: string;
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
// Toast
export const Page: Story = {
  name: 'Toast',
  render: () => (
    <ChangePage group="Toast" title="Toast">
      <ChangeCase
        after={
          <TryIt action="Fire them — bottom-right, one column of one width">
            <Button
              onClick={() => fire(toast, 'bottom-right')}
              size="sm"
              variant="secondary"
            >
              Test three connections
            </Button>
          </TryIt>
        }
        afterNote="every toast at the Toaster's --width, 356px"
        before={
          <TryIt action="Fire them — bottom-left, each its own width">
            <div className="flex items-center">
              <Button
                onClick={() => fire(upstreamToast, 'bottom-left')}
                size="sm"
                variant="secondary"
              >
                Test three connections
              </Button>
              {/* One Toaster for the page; it is fixed to the window, so where
                  it sits in the tree draws nothing here. */}
              <Toaster expand />
            </div>
          </TryIt>
        }
        beforeNote="each toast fits its own message"
        beforeSource={
          <>
            the developers' own <Code>toast</Code> and <Code>ToastMessage</Code>
            , vendored unchanged from their 1.4.0 into{' '}
            <Code>changes/upstream/Toast</Code>, fired into the same{' '}
            <Code>Toaster</Code> as the After half — only the corner differs.
// …

// Message
export const Message: Story = {
  render: (args) => (
    <div className="w-80">
      <ToastMessage {...args} />
    </div>
  ),
};

/**
 * Every toast appearance, rendered statically.
 *
 * `toast()` is imperative — Sonner only paints a toast after a click — so the
 * trigger-button stories below show none of the four variants at rest. These
 * are the same `ToastMessage` primitives Sonner renders inside the portal,
 * mounted inline so success / info / warning / error and the optional
 * description, action button, close button and countdown strip are all visible
 * without interaction.
 */

// Appearances
export const Appearances: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div className="flex w-full max-w-md flex-col gap-3">
      <ToastMessage
        duration={Number.POSITIVE_INFINITY}
        message="Profile saved."
        onClose={() => undefined}
        variant="success"
      />
      <ToastMessage
        action={{ label: 'View', onClick: () => undefined }}
        description="Dashboard data refreshed automatically."
        duration={Number.POSITIVE_INFINITY}
        message="3 new updates available."
        onClose={() => undefined}
        variant="info"
      />
      <ToastMessage
        description="Click Cancel to go back and save."
        duration={Number.POSITIVE_INFINITY}
        message="Unsaved changes will be lost."
        onClose={() => undefined}
        variant="warning"
      />
      <ToastMessage
        duration={Number.POSITIVE_INFINITY}
        message="Failed to upload. Try again."
        onClose={() => undefined}
        variant="error"
      />
    </div>
  ),
};

/**
 * The optional slots, on one variant: message only, message + description,
 * without the close button, and with the countdown strip running.
 */
```

### Page

```jsx
/* Toast */ compose(S, "Page")
```

### Message

```jsx
/* Message */ compose(S2, "Message")
```

### Appearances

```jsx
/* Appearances */ compose(S2, "Appearances")
```

### States

```jsx
/* States */ compose(S2, "States")
```

### Variants

```jsx
/* Variants */ compose(S2, "Variants")
```

### WithAction

```jsx
/* With Action */ compose(S2, "WithAction")
```
