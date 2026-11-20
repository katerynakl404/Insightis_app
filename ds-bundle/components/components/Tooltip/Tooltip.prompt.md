Tooltip from @devart/ui-react. Use via `window.DevartUI.Tooltip` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Tooltip.html`): Tooltip, Default, On Icon Button, Sides, Widths.

## Props

```ts
interface TooltipProps {
  /** What touch does. `auto` opens the tooltip on a LONG PRESS, leaving the tap to whatever the trigger is for; `off` leaves  */
  touchGestures?: "off" | "auto";
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  /** The duration from when the pointer enters the trigger until the tooltip gets opened. This will override the prop with th */
  delayDuration?: number;
  /** When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger. */
  disableHoverableContent?: boolean;
}
```

## Examples

```jsx
// Tooltip
export const Page: Story = {
  name: 'Tooltip',
  render: () => (
    <ChangePage group="Tooltip" title="Tooltip">
      <ChangeCase
        after={
          <TryIt action="Hover either trigger">
            <TooltipProvider>
              <div className="flex items-center gap-8">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TriggerBox inlineFlex>
                      <Info className="size-3.5 text-ink-icon" />
                    </TriggerBox>
                  </TooltipTrigger>
                  <TooltipContent side="top">Read replica</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-ink-body text-sm underline decoration-dotted">
                      A text trigger
                    </span>
                  </TooltipTrigger>
                  <TooltipContent side="top">Read replica</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </TryIt>
        }
        afterNote="arrow 8×4 · visible gap 4px · trigger hugs the icon"
        before={
          <TryIt action="Hover either trigger">
            <TooltipPrimitive.Provider>
              <div className="flex items-center gap-8">
                <TooltipPrimitive.Root>
                  <TooltipPrimitive.Trigger asChild>
                    <TriggerBox>
                      <Info className="size-3.5 text-ink-icon" />
                    </TriggerBox>
                  </TooltipPrimitive.Trigger>
// …

// Default
export const Default: Story = {
  render: (args) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="secondary">Hover me</Button>
      </TooltipTrigger>
      <TooltipContent {...args} />
    </Tooltip>
  ),
};

// On Icon Button
export const OnIconButton: Story = {
  args: { children: 'More information' },
  render: (args) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <IconButton variant="tertiary" aria-label="More information">
          <Info />
        </IconButton>
      </TooltipTrigger>
      <TooltipContent {...args} />
    </Tooltip>
  ),
};
```

### Page

```jsx
/* Tooltip */ compose(S, "Page")
```

### Default

```jsx
/* Default */ compose(S2, "Default")
```

### OnIconButton

```jsx
/* On Icon Button */ compose(S2, "OnIconButton")
```

### Sides

```jsx
/* Sides */ compose(S2, "Sides")
```

### Widths

```jsx
/* Widths */ compose(S2, "Widths")
```
