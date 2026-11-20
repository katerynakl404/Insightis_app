Autocomplete from @devart/ui-react. Use via `window.DevartUI.Autocomplete` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Autocomplete.html`): Autocomplete, Default, With Selection, Multiple Select, With Start Addon, Required, Label Sizes, Disabled, Multiple Select Open, No Results, Loading.

## Props

```ts
interface AutocompleteProps {
  ref?: React.Ref;
  size?: "sm" | "md" | "lg" | "xl" | "xs";
  badgeVariant?: "error" | "success" | "brand" | "primary" | "secondary" | "attention" | "green";
  placeholder?: string;
  label?: React.ReactNode;
  /** Marks the label with an asterisk and sets `aria-required` on the input — the same contract as `InputGroup` and `TextArea */
  required?: boolean;
  className?: string;
  inputClassName?: string;
  listboxClassName?: string;
  noOptionsText?: React.ReactNode;
  loadingText?: React.ReactNode;
  /** Accessible name of the clear button. */
  clearLabel?: string;
  /** Accessible name of the button that opens the list. */
  popupIndicatorLabel?: string;
  isLoading?: boolean;
  startAddon?: React.ReactNode;
  endAddon?: React.ReactNode;
  disableFiltering?: boolean;
  renderOption?: (option: T, props: { selected: boolean; }) => ReactNode;
  renderBadge?: (option: T, onDelete: (e: MouseEvent<HTMLButtonElement>) => void) => ReactNode;
  options: readonly T[];
  value?: AutocompleteValue<T, Multiple>;
  defaultValue?: AutocompleteValue<T, Multiple>;
  inputValue?: string;
  defaultInputValue?: string;
  isMultipleSelect?: Multiple;
  isFreeSoloSelect?: FreeSolo;
  open?: boolean;
  openOnFocus?: boolean;
  autoHighlight?: boolean;
  autoSelect?: boolean;
  autoComplete?: boolean;
  clearOnBlur?: boolean;
  clearOnEscape?: boolean;
  selectOnFocus?: boolean;
  blurOnSelect?: boolean | "touch" | "mouse";
  disableClearable?: boolean;
  disableCloseOnSelect?: boolean;
  disableListWrap?: boolean;
  includeInputInList?: boolean;
  handleHomeEndKeys?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  filterSelectedOptions?: boolean;
  id?: string;
  onChange?: (event: SyntheticEvent | null, value: AutocompleteValue<T, Multiple>, reason: ChangeReason, details?: ChangeDetails<T>) => void;
  onInputChange?: (event: SyntheticEvent | null, value: string, reason: InputChangeReason) => void;
  onOpen?: (event: SyntheticEvent) => void;
  onClose?: (event: SyntheticEvent | null, reason: CloseReason) => void;
  onHighlightChange?: (event: SyntheticEvent | null, option: T, reason: HighlightReason) => void;
  getOptionLabel?: (option: T | (FreeSolo extends true ? string : never)) => string;
  getOptionKey?: (option: T) => string;
  isOptionEqualToValue?: (option: T, value: T) => boolean;
  filterOptions?: (options: T[], state: FilterOptionsState<T>) => T[];
  getOptionDisabled?: (option?: T) => boolean;
  groupBy?: (option: T) => string;
}
```

## Examples

```jsx
// Autocomplete
export const Page: Story = {
  name: 'Autocomplete',
  render: () => (
    <ChangePage group="Autocomplete" title="Autocomplete">
      <ChangeCase
        after={
          <div className="flex w-full max-w-[260px] flex-col gap-1">
            <OptionRow
              classes="aria-selected:bg-state-pressed aria-selected:font-medium aria-selected:text-ink-highlight"
              label="PostgreSQL — selected"
              state="selected"
            />
            <OptionRow
              classes="data-[highlighted=true]:bg-state-hover"
              label="MySQL — highlighted"
              state="highlighted"
            />
          </div>
        }
        afterNote="selected: state-pressed + ink-highlight"
        before={
          <div className="flex w-full max-w-[260px] flex-col gap-1">
            <OptionRow
              classes="aria-selected:bg-state-hover aria-selected:text-ink-primary"
              label="PostgreSQL — selected"
              state="selected"
            />
            <OptionRow
              classes="data-[highlighted=true]:bg-state-hover"
              label="MySQL — highlighted"
              state="highlighted"
            />
          </div>
        }
        beforeNote="both states: state-hover"
        beforeSource={
          <>
            a replica of <Code>OptionItem</Code> carrying the two class strings
            verbatim — the component is internal to Autocomplete and cannot be
            driven into both states from a story.
// …

// Default
export const Default: Story = {
  play: async ({ canvas, userEvent }) => {
    const input = await openMenu(canvas, userEvent);

    await expect(await popup().findAllByRole('option')).toHaveLength(7);

    await userEvent.type(input, 'lo');
    // `findAll` resolves on the list that is already open — wait for the
    // filtered one instead.
    await waitFor(() => expect(popup().getAllByRole('option')).toHaveLength(1));
    const matches = popup().getAllByRole('option');
    await expect(matches[0]).toHaveTextContent('London');

    await userEvent.click(matches[0] as HTMLElement);
    await expect(input).toHaveValue('London');
    await expect(popup().queryByRole('listbox')).not.toBeInTheDocument();
  },
  render: (args) => {
    const [value, setValue] = useState<Option | null>(null);
    return (
      <Autocomplete<Option>
        {...args}
        value={value}
        onChange={(_event, next) => setValue(next)}
      />
    );
  },
};

// With Selection
export const WithSelection: Story = {
  /**
   * Reopening with a selection shows the whole list, not the one option whose
   * label happens to sit in the input — see `useFilteredOptions`.
   */
  play: async ({ canvas, userEvent }) => {
    await openMenu(canvas, userEvent);
    await expect(await popup().findAllByRole('option')).toHaveLength(7);
  },
  render: (args) => {
    const [value, setValue] = useState<Option | null>(CITIES[1] ?? null);
    return (
      <Autocomplete<Option>
        {...args}
        value={value}
        onChange={(_event, next) => setValue(next)}
      />
    );
  },
};

// Multi-select mode: `value` becomes `Option[]`, tags render as removable
// badges. Typed against the `Multiple = true` instantiation.
```

### Page

```jsx
/* Autocomplete */ compose(S, "Page")
```

### Default

```jsx
/* Default */ compose(S2, "Default")
```

### WithSelection

```jsx
/* With Selection */ compose(S2, "WithSelection")
```

### MultipleSelect

```jsx
/* Multiple Select */ compose(S2, "MultipleSelect")
```

### WithStartAddon

```jsx
/* With Start Addon */ compose(S2, "WithStartAddon")
```

### Required

```jsx
/* Required */ compose(S2, "Required")
```

### LabelSizes

```jsx
/* Label Sizes */ compose(S2, "LabelSizes")
```

### Disabled

```jsx
/* Disabled */ compose(S2, "Disabled")
```

### MultipleSelectOpen

```jsx
/* Multiple Select Open */ compose(S2, "MultipleSelectOpen")
```

### NoResults

```jsx
/* No Results */ compose(S2, "NoResults")
```

### Loading

```jsx
/* Loading */ compose(S2, "Loading")
```
