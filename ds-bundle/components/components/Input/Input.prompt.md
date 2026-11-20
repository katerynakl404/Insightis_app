Input from @devart/ui-react. Use via `window.DevartUI.Input` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Input.html`): Digits Only.

## Props

```ts
interface InputProps {
  /** Takes digits only; a letter typed, pasted or dropped is dropped. */
  digitsOnly?: boolean;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}
```

## Examples

```jsx
// Digits Only
export const DigitsOnly: Story = {
  render: (args) => (
    <div className="w-72">
      <InputGroup label="Port" inputId="input-digits">
        <InputGroupInput {...args} digitsOnly defaultValue="5432" />
      </InputGroup>
    </div>
  ),
};
```

### DigitsOnly

```jsx
/* Digits Only */ compose(S, "DigitsOnly")
```

## Related

`InputGroup`
