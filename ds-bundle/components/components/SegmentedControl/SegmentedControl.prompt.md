SegmentedControl from @devart/ui-react. Use via `window.DevartUI.SegmentedControl` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `SegmentedControl.html`): SegmentedControl, Default, Sizes, Tones, Deselectable, Disabled, Tinted, Rounded.

## Props

```ts
interface SegmentedControlProps {
  size?: "sm" | "md";
  variant?: "default";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
  /** Nothing selected is a state of its own — Inherit, Not set — and pressing the selected option again returns to it (`onVal */
  deselectable?: boolean;
  /** What a screen reader is told the control is. `tabs` — a view switcher, whose segments show panels (`SegmentedControlCont */
  semantics?: "radio" | "tabs";
  /** The value for the selected tab, if controlled */
  value?: string;
  /** The value of the tab to select by default, if uncontrolled */
  defaultValue?: string;
  /** The orientation the tabs are layed out. Mainly so arrow navigation is done accordingly (left & right vs. up & down) */
  orientation?: "horizontal" | "vertical";
  /** The direction of navigation between toolbar items. */
  dir?: "ltr" | "rtl";
  /** Whether a tab is activated automatically or manually. */
  activationMode?: "manual" | "automatic";
  style?: CSSProperties;
  id?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
}
```

## Examples

```jsx
// SegmentedControl
export const Page: Story = {
  name: 'SegmentedControl',
  render: () => (
    <ChangePage group="SegmentedControl" title="SegmentedControl">
      <ChangeCase
        after={<ScopeColumn toned />}
        afterNote='tone="positive" · tone="negative" — a solid fill'
        before={<ScopeColumn />}
        beforeNote="the neutral pill on every row"
        beforeSource={
          <>
            the live column with <Code>tone</Code> left out — the raised neutral
            pill, the one selected state the published control has.
          </>
        }
        files={['src/components/SegmentedControl/SegmentedControlTrigger.tsx']}
        footnote={
          <>
            The tone is on the trigger, not the control: only the option knows
            whether it is the permissive one. Unselected, both tones are the
            same neutral text as any other trigger — the colour is the answer,
            not the offer. One green and one red in both themes, like the
            destructive button. For alternatives of the same kind — Read / Read
            & write, Light / Dark — the neutral pill stays right.
          </>
        }
        n={73}
        state="draft"
        title="SegmentedControlTrigger — tone"
        why="Included / Excluded is a fact with a consequence. With a neutral pill on every row, finding the exceptions in a column of forty means reading every label — and the exceptions are why anybody scans a scope."
      />

      <ChangeCase
        after={<PermissionTree tinted />}
        afterNote="tinted — the tone's fill at 15%, deeper under the pointer"
        before={<PermissionTree />}
        beforeNote="an inherited row shows nothing selected"
        beforeSource={
          <>
            the live rows without <Code>tinted</Code>: a row with nothing chosen
// …

// Default
export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('list');
    return (
      <SegmentedControl {...args} value={value} onValueChange={setValue}>
        <SegmentedControlList>
          {options.map((option) => (
            <SegmentedControlTrigger key={option.value} value={option.value}>
              <option.icon />
              {option.label}
            </SegmentedControlTrigger>
          ))}
        </SegmentedControlList>
        {options.map((option) => (
          <SegmentedControlContent key={option.value} value={option.value}>
            <Typography>{option.label} view content</Typography>
          </SegmentedControlContent>
        ))}
      </SegmentedControl>
    );
  },
};

// Sizes
export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col items-start gap-4">
      <SegmentedControl {...args} size="sm" defaultValue="list">
        <SegmentedControlList>
          {options.map((option) => (
            <SegmentedControlTrigger key={option.value} value={option.value}>
              {option.label}
            </SegmentedControlTrigger>
          ))}
        </SegmentedControlList>
      </SegmentedControl>
      <SegmentedControl {...args} size="md" defaultValue="list">
        <SegmentedControlList>
          {options.map((option) => (
            <SegmentedControlTrigger key={option.value} value={option.value}>
              {option.label}
            </SegmentedControlTrigger>
          ))}
        </SegmentedControlList>
      </SegmentedControl>
    </div>
  ),
};

/** `tone`: what the selected half MEANS, for two options that are not
 *  equivalent — `positive` fills green, `negative` red. Unselected, both
 *  are neutral and hover as any trigger does. */
```

### Page

```jsx
/* SegmentedControl */ compose(S, "Page")
```

### Default

```jsx
/* Default */ compose(S2, "Default")
```

### Sizes

```jsx
/* Sizes */ compose(S2, "Sizes")
```

### Tones

```jsx
/* Tones */ compose(S2, "Tones")
```

### Deselectable

```jsx
/* Deselectable */ compose(S2, "Deselectable")
```

### Disabled

```jsx
/* Disabled */ compose(S2, "Disabled")
```

### Tinted

```jsx
/* Tinted */ compose(S2, "Tinted")
```

### Rounded

```jsx
/* Rounded */ compose(S2, "Rounded")
```
