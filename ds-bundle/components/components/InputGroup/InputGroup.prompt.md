InputGroup from @devart/ui-react. Use via `window.DevartUI.InputGroup` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `InputGroup.html`): InputGroup, Default, Required, With Leading Icon, With Unit, Error State, Guidance, Disabled, Sizes, Search With Clear.

## Props

```ts
interface InputGroupProps {
  isInvalid?: boolean;
  errorText?: string;
  /** Guidance under the field; an error takes its place. */
  hintText?: React.ReactNode;
  label?: React.ReactNode;
  /** Marks the label with an asterisk and sets `aria-required` on the input. */
  required?: boolean;
  inputId?: string;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  variant?: "outline";
  size?: "sm" | "md" | "lg" | "xl" | "xs";
}
```

## Examples

```jsx
// InputGroup
export const Page: Story = {
  name: 'InputGroup',
  render: () => (
    <ChangePage group="InputGroup" title="InputGroup">
      <ChangeCase
        after={<AddonMatrix />}
        afterNote="[&>svg] — the addon sizes only its own glyph"
        before={
          <div className={OLD_ADDON_DESCENDANT_RULE}>
            <AddonMatrix />
          </div>
        }
        beforeNote="[&_svg] — xs 16px, every larger step 20px"
        beforeSource={
          <>
            the same panels with the old descendant rule put back over them.
            Both halves render the catalog's own stories —{' '}
            <Code>InputGroup → Sizes / SearchWithClear / ErrorState</Code> and{' '}
            <Code>PasswordInput → Sizes</Code> — composed rather than rebuilt,
            so the fields here are the ones the catalog ships and not a
            hand-made lookalike.
          </>
        }
        files={[
          'src/components/InputGroup/InputGroupAddon.tsx',
          'src/components/PasswordInput/index.tsx',
        ]}
        footnote={
          <>
            PasswordInput carried three <Code>!size-4</Code> and a comment
            explaining why; all three are gone, because the workaround existed
            only because of this rule. The addon now sizes its own decorative
            glyph, and a nested control sizes its own.{' '}
            <strong className="font-medium text-ink-body">To fix:</strong>{' '}
            DESIGN-SYSTEM-CHANGES.md §7 still quotes <Code>sm</Code> at{' '}
            <Code>size-5</Code>, while the source has <Code>size-4</Code> — the
            glyph tracks the field (28/32 → 16px, 36/40/44 → 20px, 44 → 24px).
          </>
        }
        n={7}
// …

// Default
export const Default: Story = {
  args: { label: 'Email', inputId: 'group-default' },
  render: (args) => (
    <div className="w-72">
      <InputGroup {...args}>
        <InputGroupInput placeholder="you@example.com" type="email" />
      </InputGroup>
    </div>
  ),
};

/** A required field is marked; an optional one is not. */

// Required
export const Required: Story = {
  args: { label: 'Workspace name', required: true, inputId: 'group-required' },
  render: (args) => (
    <div className="w-72">
      <InputGroup {...args}>
        <InputGroupInput placeholder="e.g. Data Analyze" />
      </InputGroup>
    </div>
  ),
};
```

### Page

```jsx
/* InputGroup */ compose(S, "Page")
```

### Default

```jsx
/* Default */ compose(S2, "Default")
```

### Required

```jsx
/* Required */ compose(S2, "Required")
```

### WithLeadingIcon

```jsx
/* With Leading Icon */ compose(S2, "WithLeadingIcon")
```

### WithUnit

```jsx
/* With Unit */ compose(S2, "WithUnit")
```

### ErrorState

```jsx
/* Error State */ compose(S2, "ErrorState")
```

### Guidance

```jsx
/* Guidance */ compose(S2, "Guidance")
```

### Disabled

```jsx
/* Disabled */ compose(S2, "Disabled")
```

### Sizes

```jsx
/* Sizes */ compose(S2, "Sizes")
```

### SearchWithClear

```jsx
/* Search With Clear */ compose(S2, "SearchWithClear")
```
