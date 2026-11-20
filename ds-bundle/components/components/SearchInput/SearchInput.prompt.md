SearchInput from @devart/ui-react. Use via `window.DevartUI.SearchInput` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `SearchInput.html`): SearchInput, Default, With Value, Sizes, With Results.

## Props

```ts
interface SearchInputProps {
  placeholder: string;
  value?: string;
  clearLabel?: string;
  size?: "sm" | "md" | "lg" | "xl" | "xs";
  variant?: "outline";
  className?: string;
  ref?: React.Ref;
  "aria-label"?: string;
  autoFocus?: boolean;
  onValueChange?: (value: string) => void;
  onClear?: () => void;
  /** The matches, already filtered by the caller; listed while something is typed. */
  results?: readonly T[];
  /** Defaults to the result's `label`. */
  getResultLabel?: (result: T) => string;
  /** The row; the label alone when omitted. */
  renderResult?: (result: T) => ReactNode;
  /** A result was picked; its label is now in the field. */
  onSelect?: (result: T) => void;
  /** Defaults to `No matches`. */
  emptyText?: React.ReactNode;
}
```

## Examples

```jsx
// SearchInput
export const Page: Story = {
  name: 'SearchInput',
  render: () => (
    <ChangePage group="SearchInput" title="SearchInput">
      <ChangeCase
        after={<Panel />}
        afterNote="the matches under the field while typing"
        before={<Panel upstream />}
        beforeNote="a field and nothing under it"
        beforeSource={
          <>
            the developers' own component, vendored unchanged from their 1.4.0
            into <Code>changes/upstream/SearchInput.tsx</Code>, over the live{' '}
            <Code>InputGroup</Code> — so the field is drawn the same in both
            halves and only <Code>SearchInput</Code> differs. Both get the same
            props; the published one has no <Code>results</Code> and draws the
            field alone.
          </>
        }
        files={[
          'src/components/SearchInput/index.tsx',
          'src/components/SearchInput/SearchInputWithResults.tsx',
          'src/components/SearchInput/types.ts',
        ]}
        footnote={
          <>
            The list opens only while something is typed — not on focus, not on
            a click into the field, not with the picked name still in it — and
            shows seven and a half rows, the half saying there is more. It is{' '}
            <Code>Autocomplete</Code>'s combobox and option row, so the two
            lists look and behave alike. The field also passes on{' '}
            <Code>variant</Code>, <Code>aria-label</Code> and{' '}
            <Code>autoFocus</Code>, which the products already set.
          </>
        }
        n={145}
        title="SearchInput — the matches while typing"
        why="A directory search had no way to offer what it matched."
      />
    </ChangePage>
// …

// Default
export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const field = canvas.getByRole('searchbox');
    await expect(field).toBeVisible();
    await expect(
      canvas.queryByRole('button', { name: 'Clear Search' })
    ).toBeNull();

    await userEvent.type(field, 'q');
    await expect(
      await canvas.findByRole('button', { name: 'Clear Search' })
    ).toBeVisible();
  },
  render: (args) => (
    <div className="w-72">
      <ControlledSearchInput {...args} />
    </div>
  ),
};

/** With a value the clear button is present, reachable by Tab, and hands focus back to the field. */

// With Value
export const WithValue: Story = {
  args: { value: 'Q3 KPI' },
  play: async ({ args, canvas, userEvent }) => {
    const field = canvas.getByRole('searchbox');
    const clear = canvas.getByRole('button', { name: 'Clear Search' });

    await userEvent.click(field);
    await userEvent.tab();
    await expect(clear).toHaveFocus();
    await expect(
      await within(document.body).findByRole('tooltip')
    ).toHaveTextContent('Clear Search');

    await userEvent.click(clear);
    await expect(args.onClear).toHaveBeenCalledOnce();
    await expect(field).toHaveValue('');
    await expect(field).toHaveFocus();
    await expect(
      canvas.queryByRole('button', { name: 'Clear Search' })
    ).toBeNull();
  },
  render: (args) => (
    <div className="w-72">
      <ControlledSearchInput {...args} />
    </div>
  ),
};

const SIZES = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

/**
 * From `sm` up the clear button is a 24px box around a 16px glyph. At `xs`
 * the box is the field's 14px glyph itself, so the ✕ sits 8px in, as the
 * search icon does across from it.
 */
```

### Page

```jsx
/* SearchInput */ compose(S, "Page")
```

### Default

```jsx
/* Default */ compose(S2, "Default")
```

### WithValue

```jsx
/* With Value */ compose(S2, "WithValue")
```

### Sizes

```jsx
/* Sizes */ compose(S2, "Sizes")
```

### WithResults

```jsx
/* With Results */ compose(S2, "WithResults")
```
