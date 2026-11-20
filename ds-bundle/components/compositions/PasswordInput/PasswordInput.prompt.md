PasswordInput from @devart/ui-react. Use via `window.DevartUI.PasswordInput` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `PasswordInput.html`): Default, With Label, With Value, Error State, Disabled, Sizes.

## Props

```ts
interface PasswordInputProps {
  ref?: React.Ref;
  toggleHideLabel?: string;
  toggleShowLabel?: string;
  inputGroupProps?: InputGroupProps;
  toggleButtonProps?: PasswordToggleButtonProps;
  classNames?: PasswordInputClassNames;
  style?: CSSProperties;
  className?: string;
  id?: string;
  children?: React.ReactNode;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const field = canvas.getByPlaceholderText('Enter password');
    await expect(field).toHaveAttribute('type', 'password');

    const toggle = canvas.getByRole('button', { name: 'Show password' });
    await userEvent.click(toggle);

    await expect(field).toHaveAttribute('type', 'text');
    // The control renames itself, so the label always describes what the next
    // press will do rather than the current state.
    await expect(
      canvas.getByRole('button', { name: 'Hide password' })
    ).toBeInTheDocument();

    await userEvent.click(
      canvas.getByRole('button', { name: 'Hide password' })
    );
    await expect(field).toHaveAttribute('type', 'password');
  },
  render: (args) => (
    <div className="w-72">
      <PasswordInput {...args} />
    </div>
  ),
};

// With Label
export const WithLabel: Story = {
  render: (args) => (
    <div className="w-72">
      <PasswordInput
        {...args}
        inputGroupProps={{ label: 'Password', inputId: 'pw-with-label' }}
      />
    </div>
  ),
};

// With Value
export const WithValue: Story = {
  args: { defaultValue: 'super-secret' },
  render: (args) => (
    <div className="w-72">
      <PasswordInput
        {...args}
        inputGroupProps={{ label: 'Password', inputId: 'pw-with-value' }}
      />
    </div>
  ),
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### WithLabel

```jsx
/* With Label */ compose(S, "WithLabel")
```

### WithValue

```jsx
/* With Value */ compose(S, "WithValue")
```

### ErrorState

```jsx
/* Error State */ compose(S, "ErrorState")
```

### Disabled

```jsx
/* Disabled */ compose(S, "Disabled")
```

### Sizes

```jsx
/* Sizes */ compose(S, "Sizes")
```
