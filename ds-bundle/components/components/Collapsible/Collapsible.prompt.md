Collapsible from @devart/ui-react. Use via `window.DevartUI.Collapsible` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Collapsible.html`): Open, Interactive.

## Props

```ts
interface CollapsibleProps {
  defaultOpen?: boolean;
  open?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
}
```

## Examples

```jsx
// Open
export const Open: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <Collapsible {...args} className="flex w-80 flex-col gap-2">
      <div className="flex items-center justify-between">
        <Typography weight="medium">Advanced options</Typography>
        <CollapsibleTrigger asChild>
          <Button variant="tertiary" size="sm" rightSlot={<ChevronDown />}>
            Toggle
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent className="flex flex-col gap-2 rounded-lg border border-stroke bg-surface-card p-3">
        <Typography textColor="secondary">Enable beta features</Typography>
        <Typography textColor="secondary">
          Share anonymous usage data
        </Typography>
        <Typography textColor="secondary">Show experimental UI</Typography>
      </CollapsibleContent>
    </Collapsible>
  ),
};

// Interactive
export const Interactive: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <Collapsible
        {...args}
        open={open}
        onOpenChange={setOpen}
        className="flex w-80 flex-col gap-2"
      >
        <div className="flex items-center justify-between">
          <Typography weight="medium">
            {open ? 'Hide details' : 'Show details'}
          </Typography>
          <CollapsibleTrigger asChild>
            <Button variant="tertiary" size="sm" rightSlot={<ChevronDown />}>
              Toggle
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="flex flex-col gap-2 rounded-lg border border-stroke bg-surface-card p-3">
          <Typography textColor="secondary">
            This panel is controlled with useState.
          </Typography>
          <Typography textColor="secondary">
            The open state is driven from the parent component.
          </Typography>
        </CollapsibleContent>
      </Collapsible>
    );
  },
};
```

### Open

```jsx
/* Open */ compose(S, "Open")
```

### Interactive

```jsx
/* Interactive */ compose(S, "Interactive")
```
