ActivityTray from @devart/ui-react. Use via `window.DevartUI.ActivityTray` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `ActivityTray.html`): ActivityTray, Complete, Uploading, Failed, Long Names, Collapsed, Non Collapsible, Controlled, Auto Dismiss, Auto Dismiss With Failure, Clickable Rows, Status As Words.

## Props

```ts
interface ActivityTrayProps {
  headerTitle: React.ReactNode;
  headerIcon?: React.ReactNode;
  children?: React.ReactNode;
  /** When `false`, header is not a toggle; list stays open. */
  isCollapsible?: boolean;
  /** `aria-label` for the ✕. Defaults to `"Dismiss"`. */
  dismissLabel?: string;
  /** `aria-label` for the collapse trigger; falls back to title text. */
  toggleLabel?: string;
  /** Auto-remove `dismissible` rows; tray leaves after the last one. */
  autoDismiss?: boolean;
  /** Delay before a dismissible row leaves. Defaults to `4000`. */
  autoDismissDelay?: number;
  /** Classes for the scrollable list. */
  contentClassName?: string;
  /** Shows ✕; called on ✕ click or after auto-dismiss leave. */
  onDismiss?: () => void;
  style?: CSSProperties;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
  asChild?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  disabled?: boolean;
}
```

## Examples

```jsx
// ActivityTray
export const Page: Story = {
  name: 'ActivityTray',
  render: () => (
    <ChangePage group="ActivityTray" title="ActivityTray">
      <ChangeCase
        after={
          <TryIt action="Scroll the list; hover the chevron and the ✕">
            <Uploads Item={ActivityTrayItem} Tray={ActivityTray} />
          </TryIt>
        }
        afterNote="IconButton's chevron · scrollbar-thin · a balanced error"
        before={
          <TryIt action="Scroll the list; hover the chevron and the ✕">
            <Uploads
              Item={UpstreamActivityTrayItem}
              Tray={UpstreamActivityTray}
            />
          </TryIt>
        }
        beforeNote="its own chevron at stroke 1.5 · the browser's bar"
        beforeSource={
          <>
            the developers' own tray, vendored unchanged from their 1.4.0 into{' '}
            <Code>changes/upstream/ActivityTray/</Code> — the tray their
            storybook ships, not a replica of it. The <Code>IconButton</Code>,{' '}
            <Code>ScrollShadow</Code> and <Code>Typography</Code> under it are
            the live ones in both halves.
          </>
        }
        files={[
          'src/components/ActivityTray/ActivityTrayHeader.tsx',
          'src/components/ActivityTray/ActivityTrayContent.tsx',
          'src/components/ActivityTray/ActivityTrayItem.tsx',
          'src/components/ActivityTray/index.tsx',
        ]}
        footnote={
          <>
            The chevron is the <Code>IconButton</Code> recipe itself —{' '}
            <Code>tertiary</Code>, <Code>xs</Code> — rather than a restatement
            of it, and the ✕ drops its own <Code>stroke-[1.5]</Code>, so both
// …

// Complete
export const Complete: Story = {
  args: {
    headerTitle: '2 uploads complete',
    headerIcon: <CircleCheck aria-hidden />,
    role: 'region',
    'aria-label': 'Upload status',
  },
  render: (args) => (
    <ActivityTray {...args}>
      <ActivityTrayItem
        icon={<Glyph />}
        title="giffycanvas.gif"
        rightSlot="1.2 MB"
        trailingIcon={<CircleCheck aria-hidden className="text-fb-green" />}
      />
      <ActivityTrayItem
        icon={<Glyph />}
        title="Grid.png"
        rightSlot="480 KB"
        trailingIcon={<CircleCheck aria-hidden className="text-fb-green" />}
      />
    </ActivityTray>
  ),
};

// Uploading
export const Uploading: Story = {
  args: {
    headerTitle: '3 uploading',
    // `Spinner` sets `role="status"` + `aria-label="Loading"`, which would
    // turn the trigger's accessible name into "Loading 3 uploading" and put
    // a live region inside a button — a bare decorative glyph avoids both.
    headerIcon: (
      <Loader2
        aria-hidden="true"
        className="animate-spin motion-reduce:animate-none"
      />
    ),
  },
  render: (args) => (
    <ActivityTray {...args}>
      <ActivityTrayItem
        icon={<Glyph />}
        title="quarterly-report-final-v4.pdf"
        hasProgress
        progress={62}
        progressLabel="Uploading quarterly-report-final-v4.pdf"
        rightSlot="62%"
      />
      <ActivityTrayItem
        icon={<Glyph />}
        title="Grid.png"
        hasProgress
        progress={18}
        progressLabel="Uploading Grid.png"
        rightSlot="18%"
      />
      <ActivityTrayItem
        icon={<Glyph />}
        title="notes.txt"
        trailingIcon={<CircleCheck aria-hidden className="text-fb-green" />}
      />
    </ActivityTray>
  ),
};
// …
```

### Page

```jsx
/* ActivityTray */ compose(S, "Page")
```

### Complete

```jsx
/* Complete */ compose(S2, "Complete")
```

### Uploading

```jsx
/* Uploading */ compose(S2, "Uploading")
```

### Failed

```jsx
/* Failed */ compose(S2, "Failed")
```

### LongNames

```jsx
/* Long Names */ compose(S2, "LongNames")
```

### Collapsed

```jsx
/* Collapsed */ compose(S2, "Collapsed")
```

### NonCollapsible

```jsx
/* Non Collapsible */ compose(S2, "NonCollapsible")
```

### Controlled

```jsx
/* Controlled */ compose(S2, "Controlled")
```

### AutoDismiss

```jsx
/* Auto Dismiss */ compose(S2, "AutoDismiss")
```

### AutoDismissWithFailure

```jsx
/* Auto Dismiss With Failure */ compose(S2, "AutoDismissWithFailure")
```

### ClickableRows

```jsx
/* Clickable Rows */ compose(S2, "ClickableRows")
```

### StatusAsWords

```jsx
/* Status As Words */ compose(S2, "StatusAsWords")
```
