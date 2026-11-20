Switch from @devart/ui-react. Use via `window.DevartUI.Switch` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Switch.html`): Switch, With Label, States, Small, Without Label, With Description, With Tooltip, Tertiary Row.

## Props

```ts
interface SwitchProps {
  label?: unknown;
  containerVariant?: "default" | "tertiary";
  labelClassName?: string;
  style?: CSSProperties;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  defaultChecked?: boolean;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  variant?: "accent";
  size?: "sm" | "default";
  rounded?: "default";
  checked?: boolean;
  required?: boolean;
  tooltipSide?: "top" | "right" | "bottom" | "left";
  /** The sm track lines up with the label's first line only beside it. */
  besideLabel?: boolean;
  labelPosition?: "top" | "right" | "bottom" | "left";
  gap?: "sm" | "md" | "lg";
  description?: React.ReactNode;
  tooltip?: boolean | React.ReactNode;
}
```

## Examples

```jsx
// Switch
export const Page: Story = {
  name: 'Switch',
  render: () => (
    <ChangePage group="Switch" title="Switch">
      <ChangeCase
        after={<DescribedRows />}
        afterNote="description — a <label>, and the switch's aria-describedby"
        before={<DescribedRows handBuilt />}
        beforeNote="a bare switch and a text column beside it"
        beforeSource={
          <>
            the row the connection form had to write — the switch named by{' '}
            <Code>aria-label</Code>, its own column of two{' '}
            <Code>Typography</Code> spans beside it — copied from the
            prototype's <Code>_shared/form.jsx</Code> as it stood before the
            prop. The second row is the same markup with <Code>disabled</Code>{' '}
            on the switch.
          </>
        }
        files={['src/components/Switch/index.tsx']}
        footnote={
          <>
            The hand-built row picked its own type — a 600 title in{' '}
            <Code>--ink-primary</Code> where the switch's label is 500 in{' '}
            <Code>--ink-body</Code> — and its words were text, not a label:
            clicking them did nothing, and a screen reader heard "Active,
            switch" with no description. The description is <Code>body12</Code>{' '}
            in <Code>--ink-secondary</Code>, 2px under the label, and fades with
            it when the switch is disabled.
          </>
        }
        n={160}
        state="draft"
        title="Switch — description"
        why="A label with an explanation under it had no place on the switch, so the form built the row twice by hand — and a hand-built row knows nothing of the switch it sits beside."
      />

      <ChangeCase
        after={<ConnectionsTable dense />}
        afterNote="size=sm — 28×16 in a table row"
// …

// With Label
export const WithLabel: Story = {};

// States
export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Switch {...args} label="Off" />
      <Switch {...args} defaultChecked label="On" />
      <Switch {...args} disabled label="Disabled off" />
      <Switch {...args} defaultChecked disabled label="Disabled on" />
    </div>
  ),
};

/**
 * `sm` — 28 x 16 px track with a 12 x 12 px thumb. Same colour tokens and
 * states as the default switch; use it in compact rows where 36 x 20 is too
 * large.
 */
```

### Page

```jsx
/* Switch */ compose(S, "Page")
```

### WithLabel

```jsx
/* With Label */ compose(S2, "WithLabel")
```

### States

```jsx
/* States */ compose(S2, "States")
```

### Small

```jsx
/* Small */ compose(S2, "Small")
```

### WithoutLabel

```jsx
/* Without Label */ compose(S2, "WithoutLabel")
```

### WithDescription

```jsx
/* With Description */ compose(S2, "WithDescription")
```

### WithTooltip

```jsx
/* With Tooltip */ compose(S2, "WithTooltip")
```

### TertiaryRow

```jsx
/* Tertiary Row */ compose(S2, "TertiaryRow")
```
