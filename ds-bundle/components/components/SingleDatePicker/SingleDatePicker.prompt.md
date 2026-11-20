SingleDatePicker from @devart/ui-react. Use via `window.DevartUI.SingleDatePicker` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `SingleDatePicker.html`): Datepicker, Single, Range, Calendar Single, Calendar Range.

## Props

```ts
interface SingleDatePickerProps {
  selected?: Date;
  className?: string;
  confirmLabel?: string;
  startMonth?: Date;
  endMonth?: Date;
  onSelect?: (date: Date | undefined) => void;
  onConfirm?: (date: Date | undefined) => void;
}
```

## Examples

```jsx
// Datepicker
export const Page: Story = {
  name: 'Datepicker',
  render: () => (
    <ChangePage
      intro="Open, and the same in upstream — the change log keeps it under Open against the kit rather than in its index."
      title="Datepicker"
    >
      <ChangeCase
        after={
          <p className="max-w-[60ch] text-ink-body text-sm leading-5">
            Nothing to render: the three states this was filed against —{' '}
            <em>hover</em>, <em>today</em>, <em>disabled</em> — all exist, in{' '}
            <Code>Calendar.tsx</Code>'s <Code>classNames</Code> map rather than
            in <Code>CalendarDayButton.tsx</Code> where the report looked. What
            survives is one detail: the focus ring is the only one in the
            package that is not the shared recipe.
          </p>
        }
        afterNote="mostly retracted — see the catalog's own Datepicker stories"
        files={['src/components/Datepicker/Calendar.tsx']}
        footnote={
          <>
            Kept as a section because a retraction is worth as much as the
            finding was: the next person reading{' '}
            <Code>CalendarDayButton.tsx</Code> alone will reach the same wrong
            conclusion. The surviving item is real — <Code>--shadow-focus</Code>
            , 2px plus a 2px gap, is what <Code>Button</Code>,{' '}
            <Code>IconButton</Code>, <Code>Switch</Code>,{' '}
            <Code>SegmentedControl</Code> and <Code>StepSlider</Code> all use,
            and the calendar day is the one control that does not.
          </>
        }
        n={29}
        state="proposed"
        title="One bespoke focus ring, not three missing states"
        why="Filed after reading one file, and three quarters of it was wrong. The quarter that is not: a calendar day focuses differently from every other control in the package."
      />
    </ChangePage>
  ),
};
// …

// Single
export const Single: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(new Date());
    return (
      <SingleDatePicker
        {...args}
        selected={date}
        onSelect={(next) => {
          setDate(next);
          args.onSelect?.(next);
        }}
      />
    );
  },
};

// DateRangePicker renders side-by-side months and selects a { from, to } range.

// Range
export const Range: StoryObj<typeof DateRangePicker> = {
  render: () => {
    const today = new Date();
    const [range, setRange] = useState<DateRange | undefined>({
      from: today,
      to: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5),
    });
    return (
      <div className="w-[36rem] max-w-full">
        <DateRangePicker
          selected={range}
          confirmLabel="Set range"
          onSelect={setRange}
          onConfirm={fn()}
        />
      </div>
    );
  },
};

// The underlying Calendar (react-day-picker) in single mode with disabled dates.
// `mode` is fixed here because react-day-picker types `selected`/`onSelect`
// against the mode discriminant, so a single control cannot switch it safely;
// `captionLayout` and `showOutsideDays` are the live controls.
```

### Page

```jsx
/* Datepicker */ compose(S, "Page")
```

### Single

```jsx
/* Single */ compose(S2, "Single")
```

### Range

```jsx
/* Range */ compose(S2, "Range")
```

### CalendarSingle

```jsx
/* Calendar Single */ compose(S2, "CalendarSingle")
```

### CalendarRange

```jsx
/* Calendar Range */ compose(S2, "CalendarRange")
```
