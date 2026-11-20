ProgressBar from @devart/ui-react. Use via `window.DevartUI.ProgressBar` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `ProgressBar.html`): ProgressBar, Default, Empty, Half, Full, Variants, Sizes, States.

## Props

```ts
interface ProgressBarProps {
  value?: number;
  max?: number;
  getValueLabel?: (value: number, max: number) => string;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  variant?: "primary" | "attention" | "green" | "tertiary" | "destructive";
  size?: "md" | "lg";
  rounded?: "lg" | "full";
  trackVariant?: "default" | "destructive";
}
```

## Examples

```jsx
// ProgressBar
export const Page: Story = {
  name: 'ProgressBar',
  render: () => (
    <ChangePage group="ProgressBar" title="ProgressBar">
      <ChangeCase
        after={<MembersWithAccess split />}
        afterNote='variant="green" · trackVariant="destructive"'
        before={<MembersWithAccess />}
        beforeNote="the green half on the neutral track"
        beforeSource={
          <>
            the live bar without <Code>trackVariant</Code>, which defaults to
            the published track exactly — <Code>bg-surface-chips</Code>, moved
            from the base into <Code>default</Code>.
          </>
        }
        files={['src/components/ProgressBar/index.tsx']}
        footnote={
          <>
            The indicator's <Code>variant</Code> is unchanged; only what the
            unfilled part means is new. <Code>default</Code> is "nothing yet",
            for a bar that counts toward a goal; <Code>destructive</Code> is the
            other answer, for a bar that splits a whole in two — allowed and
            denied, passed and failed.
          </>
        }
        n={105}
        state="draft"
        title="ProgressBar — trackVariant"
        why="On the grey track the Denied half read as “nothing yet”, so a bar that was half denied looked half empty."
      />
    </ChangePage>
  ),
};

// Default
export const Default: Story = {};

// Empty
export const Empty: Story = {
  args: { value: 0 },
};
```

### Page

```jsx
/* ProgressBar */ compose(S, "Page")
```

### Default

```jsx
/* Default */ compose(S2, "Default")
```

### Empty

```jsx
/* Empty */ compose(S2, "Empty")
```

### Half

```jsx
/* Half */ compose(S2, "Half")
```

### Full

```jsx
/* Full */ compose(S2, "Full")
```

### Variants

```jsx
/* Variants */ compose(S2, "Variants")
```

### Sizes

```jsx
/* Sizes */ compose(S2, "Sizes")
```

### States

```jsx
/* States */ compose(S2, "States")
```
