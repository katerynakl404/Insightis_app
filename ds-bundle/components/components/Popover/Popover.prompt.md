Popover from @devart/ui-react. Use via `window.DevartUI.Popover` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Popover.html`): Popover, Default, Initially Open, Sides, Opens On Hover, Pins On Click, Follows Pointer Without Pin, Opens By Keyboard, Mouse Click Keeps Focus, Child Cancelled Click Still Toggles, Opens By Tap, Inside Dropdown Menu, Fallback Side On Narrow Viewport, Preferred Side On Wide Viewport, Closes On Viewport Change.

## Props

```ts
interface PopoverProps {
  /** Also open on mouse hover (pointerType 'mouse' only); tap and pen open by press. */
  openOnHover?: boolean;
  /** ms the pointer must stay on the trigger before a hover opens it. */
  delay?: number;
  /** ms after the pointer leaves trigger or content before a hover-open closes; long enough to travel between them. */
  closeDelay?: number;
  /** When `openOnHover` is on: after a click, pointer-leave no longer closes the popover (default). Set `false` so leave stil */
  pinOnClick?: boolean;
  /** Close on window scroll (outside the content) or resize. */
  closeOnViewportChange?: boolean;
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
}
```

## Examples

```jsx
// Popover
export const Page: Story = {
  name: 'Popover',
  render: () => (
    <ChangePage group="Popover" title="Popover">
      <ChangeCase
        after={
          <TryIt action="Close it: one fades and stays gone">
            <HeldClosed />
          </TryIt>
        }
        afterNote="fill-mode-forwards — the faded end frame holds"
        before={
          <TryIt action="Close it: one fades, then comes back">
            <HeldClosed className="data-[state=closed]:fill-mode-none" />
          </TryIt>
        }
        beforeNote="no fill mode — snaps back to opacity 1 when the fade ends"
        beforeSource={
          <>
            today's <Code>PopoverContent</Code> with{' '}
            <Code>data-[state=closed]:fill-mode-none</Code> through{' '}
            <Code>className</Code>. <Code>cn</Code> drops the newer{' '}
            <Code>fill-mode-forwards</Code> for it, which leaves the closed
            state at the initial <Code>none</Code> — the old computed style
            exactly.
          </>
        }
        files={['src/components/Popover/PopoverContent.tsx']}
        footnote={
          <>
            Both panels are held mounted after they close, so the window between
            the end of the fade and Radix's unmount stays open long enough to
            see. Radix sets <Code>forwards</Code> inline itself at{' '}
            <Code>animationend</Code> but resets it on the next task, so on a
            light page the unmount usually wins the race; on the connections
            page it took over 700ms. The same pattern is on{' '}
            <Code>DropdownMenuContent</Code>, <Code>TooltipContent</Code> and{' '}
            <Code>SheetContent</Code>, left alone because nothing was reported
            there.
          </>
// …

// Default
export const Default: Story = {
  render: (args) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="secondary" leftSlot={<Settings2 />}>
          Open popover
        </Button>
      </PopoverTrigger>
      <PopoverContent {...args}>
        <div className="flex flex-col gap-2">
          <Typography variant="span" weight="medium">
            Dimensions
          </Typography>
          <Typography variant="span" textColor="secondary" className="text-sm">
            Set the width and height for the selected layer.
          </Typography>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

// Initially Open
export const InitiallyOpen: Story = {
  render: (args) => (
    <Popover defaultOpen>
      <PopoverTrigger asChild>
        <Button variant="secondary">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent {...args} aria-label="Rendered open">
        <div className="flex flex-col gap-2">
          <Typography variant="span" weight="medium">
            Rendered open
          </Typography>
          <Typography variant="span" textColor="secondary" className="text-sm">
            Shown open so the panel is visible without interaction.
          </Typography>
        </div>
      </PopoverContent>
    </Popover>
  ),
};
```

### Page

```jsx
/* Popover */ compose(S, "Page")
```

### Default

```jsx
/* Default */ compose(S2, "Default")
```

### InitiallyOpen

```jsx
/* Initially Open */ compose(S2, "InitiallyOpen")
```

### Sides

```jsx
/* Sides */ compose(S2, "Sides")
```

### OpensOnHover

```jsx
/* Opens On Hover */ compose(S2, "OpensOnHover")
```

### PinsOnClick

```jsx
/* Pins On Click */ compose(S2, "PinsOnClick")
```

### FollowsPointerWithoutPin

```jsx
/* Follows Pointer Without Pin */ compose(S2, "FollowsPointerWithoutPin")
```

### OpensByKeyboard

```jsx
/* Opens By Keyboard */ compose(S2, "OpensByKeyboard")
```

### MouseClickKeepsFocus

```jsx
/* Mouse Click Keeps Focus */ compose(S2, "MouseClickKeepsFocus")
```

### ChildCancelledClickStillToggles

```jsx
/* Child Cancelled Click Still Toggles */ compose(S2, "ChildCancelledClickStillToggles")
```

### OpensByTap

```jsx
/* Opens By Tap */ compose(S2, "OpensByTap")
```

### InsideDropdownMenu

```jsx
/* Inside Dropdown Menu */ compose(S2, "InsideDropdownMenu")
```

### FallbackSideOnNarrowViewport

```jsx
/* Fallback Side On Narrow Viewport */ compose(S2, "FallbackSideOnNarrowViewport")
```

### PreferredSideOnWideViewport

```jsx
/* Preferred Side On Wide Viewport */ compose(S2, "PreferredSideOnWideViewport")
```

### ClosesOnViewportChange

```jsx
/* Closes On Viewport Change */ compose(S2, "ClosesOnViewportChange")
```
