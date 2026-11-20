Checkbox from @devart/ui-react. Use via `window.DevartUI.Checkbox` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Checkbox.html`): Checkbox, With Label, States, Disabled With Tooltip, Without Label.

## Props

```ts
interface CheckboxProps {
  label?: React.ReactNode;
  labelClassName?: string;
  checked?: boolean | "indeterminate";
  defaultChecked?: boolean | "indeterminate";
  required?: boolean;
  style?: CSSProperties;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  variant?: "primary";
  size?: "md";
  rounded?: "md";
  labelPosition?: "top" | "right" | "bottom" | "left";
  gap?: "sm" | "md" | "lg";
}
```

## Examples

```jsx
// Checkbox
export const Page: Story = {
  name: 'Checkbox',
  render: () => (
    <ChangePage group="Checkbox" title="Checkbox">
      <ChangeCase
        after={<Marks Component={Checkbox} />}
        afterNote="one 10px grid · stroke 1.5 · 4px a side · bar 8px"
        before={<Marks Component={UpstreamCheckbox} />}
        beforeNote="lucide Check / Minus at 14px, the default stroke"
        beforeSource={UPSTREAM_SOURCE}
        files={['src/components/Checkbox/Checkbox.tsx']}
        footnote={
          <>
            10px in an 18px box leaves 4px a side, a whole device pixel at 100,
            125, 150 and 200%; the 14px glyph sat at 2px, and the halved lucide
            tick sat 0.25px high. The bar is <Code>M1.75 5h6.5</Code> — 8px with
            its round caps, 5px clear of the box each side.
          </>
        }
        n={57}
        title="The tick and the bar at one weight, centred"
        why="The tick read high and to the right, and the bar long and heavier than the tick: two lucide glyphs drawn on a 24-unit grid, shrunk into a box they were not drawn for."
      />

      <ChangeCase
        after={<DisabledMarks Component={Checkbox} />}
        afterNote="the mark keeps content-on-solid, fades with the box"
        before={<DisabledMarks Component={UpstreamCheckbox} />}
        beforeNote="the mark repainted in ink-inactive, then faded again"
        beforeSource={UPSTREAM_SOURCE}
        files={['src/components/Checkbox/Checkbox.tsx']}
        footnote="Disabled is an opacity fade, not a colour swap — the same rule every other control follows."
        n={163}
        title="The disabled mark fades with its box"
        why="A grey mark on a faded brand fill, faded a second time: the tick and the bar all but disappeared, so a disabled checked box read as a disabled empty one."
      />

      <ChangeCase
        after={<Labels Component={Checkbox} />}
        afterNote="text-ink-body, wherever it is placed"
// …

// With Label
export const WithLabel: Story = {};

// States
export const States: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <Checkbox {...args} label="Unchecked" />
      <Checkbox {...args} defaultChecked label="Checked" />
      <Checkbox {...args} checked="indeterminate" label="Indeterminate" />
      <Checkbox {...args} disabled label="Disabled" />
      <Checkbox {...args} defaultChecked disabled label="Disabled checked" />
      <Checkbox
        {...args}
        checked="indeterminate"
        disabled
        label="Disabled indeterminate"
      />
      <Checkbox {...args} aria-invalid label="Invalid" />
      <Checkbox {...args} aria-invalid defaultChecked label="Invalid checked" />
      <Checkbox
        {...args}
        aria-invalid
        checked="indeterminate"
        label="Invalid indeterminate"
      />
    </div>
  ),
};
```

### Page

```jsx
/* Checkbox */ compose(S, "Page")
```

### WithLabel

```jsx
/* With Label */ compose(S2, "WithLabel")
```

### States

```jsx
/* States */ compose(S2, "States")
```

### DisabledWithTooltip

```jsx
/* Disabled With Tooltip */ compose(S2, "DisabledWithTooltip")
```

### WithoutLabel

```jsx
/* Without Label */ compose(S2, "WithoutLabel")
```
