Select from @devart/ui-react. Use via `window.DevartUI.Select` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Select.html`): Default, With Value, Clearable, Clear On Click, Unknown Value, Required, In A Form, Empty Id Option, Long List, Sizes, Error State, Disabled.

## Props

```ts
interface SelectProps {
  options: readonly T[];
  /** The chosen option's `id`; `null` shows the placeholder. */
  value?: string;
  defaultValue?: string;
  /** The trigger's `id`, which the label points at; generated when omitted. */
  id?: string;
  /** Submits the chosen `id` with a form. */
  name?: string;
  label?: React.ReactNode;
  "aria-label"?: string;
  placeholder?: string;
  /** Asterisk on the label; the value can't be cleared, even with `clearable`. */
  required?: boolean;
  disabled?: boolean;
  isInvalid?: boolean;
  errorText?: string;
  /** Adds a clear button; Backspace and Delete clear too. */
  clearable?: boolean;
  clearLabel?: string;
  className?: string;
  /** Gets `null` when the value is cleared. */
  onValueChange?: (id: string | null) => void;
  /** Defaults to the option's `label`. */
  getOptionLabel?: (option: T) => string;
  getOptionDisabled?: (option: T) => boolean;
  size?: "sm" | "md" | "lg" | "xl" | "xs";
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: renderSelect,
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('combobox', { name: 'Authentication' });
    await userEvent.click(trigger);
    const page = within(document.body);
    await userEvent.click(
      await page.findByRole('option', { name: 'Public key' })
    );
    await waitFor(() => expect(trigger).toHaveTextContent('Public key'));
    await waitFor(() =>
      expect(page.queryByRole('listbox')).not.toBeInTheDocument()
    );
  },
};

/** The chosen option is marked in the list; Escape closes it. */

// With Value
export const WithValue: Story = {
  args: { value: 'key' },
  render: renderSelect,
  play: async ({ canvas, userEvent }) => {
    const page = within(document.body);
    await userEvent.click(
      canvas.getByRole('combobox', { name: 'Authentication' })
    );
    await expect(
      await page.findByRole('option', { name: 'Public key' })
    ).toHaveAttribute('aria-selected', 'true');
    await userEvent.keyboard('{Escape}');
    await waitFor(() =>
      expect(page.queryByRole('listbox')).not.toBeInTheDocument()
    );
  },
};

/** The clear button empties the field without opening the list. */

// Clearable
export const Clearable: Story = {
  args: { value: 'key', clearable: true },
  render: renderSelect,
  play: async ({ canvas, userEvent }) => {
    const trigger = canvas.getByRole('combobox', { name: 'Authentication' });
    await userEvent.click(
      canvas.getByRole('button', { name: 'Clear selection' })
    );
    await expect(trigger).toHaveTextContent('Choose a method');
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(
      canvas.queryByRole('button', { name: 'Clear selection' })
    ).not.toBeInTheDocument();
  },
};

/**
 * The clear button acts on a click, like any button: a screen-reader or
 * scripted click clears, a right-click does not.
 */
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### WithValue

```jsx
/* With Value */ compose(S, "WithValue")
```

### Clearable

```jsx
/* Clearable */ compose(S, "Clearable")
```

### ClearOnClick

```jsx
/* Clear On Click */ compose(S, "ClearOnClick")
```

### UnknownValue

```jsx
/* Unknown Value */ compose(S, "UnknownValue")
```

### Required

```jsx
/* Required */ compose(S, "Required")
```

### InAForm

```jsx
/* In A Form */ compose(S, "InAForm")
```

### EmptyIdOption

```jsx
/* Empty Id Option */ compose(S, "EmptyIdOption")
```

### LongList

```jsx
/* Long List */ compose(S, "LongList")
```

### Sizes

```jsx
/* Sizes */ compose(S, "Sizes")
```

### ErrorState

```jsx
/* Error State */ compose(S, "ErrorState")
```

### Disabled

```jsx
/* Disabled */ compose(S, "Disabled")
```
