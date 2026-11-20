TextArea from @devart/ui-react. Use via `window.DevartUI.TextArea` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `TextArea.html`): TextArea, Default, With Label, With Value, Error State, With Count, Count Near Limit, Count Over Soft Limit, Count Without Limit, Disabled, Sizes.

## Props

```ts
interface TextAreaProps {
  maxRowsBeforeScroll?: number;
  ref?: React.Ref;
  label?: React.ReactNode;
  isInvalid?: boolean;
  errorText?: string;
  showCount?: boolean;
  softLimit?: boolean;
  /** Guidance under the field, beside the counter; an error takes its place. */
  hintText?: React.ReactNode;
  /** Marks the label with an asterisk and makes the field required. */
  required?: boolean;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  variant?: "outline";
  size?: "sm" | "md" | "lg" | "xl" | "xs";
  rounded?: "md" | "lg" | "xl" | "3xl";
}
```

## Examples

```jsx
// TextArea
export const Page: Story = {
  name: 'TextArea',
  render: () => (
    <ChangePage group="TextArea" title="TextArea">
      <ChangeCase
        after={
          <div className="w-[360px]">
            <TextArea
              defaultValue="Answer in the user's language."
              hintText={AI_WARNING}
              label="AI instructions"
              maxLength={4000}
              showCount
            />
          </div>
        }
        afterNote="hintText — the left half of the row the counter already owned"
        before={
          <div className="flex w-[360px] flex-col">
            <TextArea
              defaultValue="Answer in the user's language."
              label="AI instructions"
            />
            <div className="mt-1 flex items-start justify-between gap-4">
              <Typography
                className="min-w-0 flex-1"
                textColor="secondary"
                textStyle="body12"
                variant="span"
              >
                {AI_WARNING}
              </Typography>
              <Typography
                className="shrink-0 whitespace-nowrap tabular-nums"
                textColor="secondary"
                textStyle="body12"
                variant="span"
              >
                29/4000
              </Typography>
// …

// Default
export const Default: Story = {
  /**
   * The field grows with its content and stops at `maxRowsBeforeScroll`, after
   * which it scrolls instead. Both halves matter: without the cap a long
   * message pushes the send button off the screen.
   */
  play: async ({ canvas, userEvent }) => {
    const field = canvas.getByPlaceholderText('Type your message…');
    const initialHeight = field.offsetHeight;

    await userEvent.click(field);
    await userEvent.keyboard('{Enter}x'.repeat(10));

    const grownHeight = field.offsetHeight;
    await expect(grownHeight).toBeGreaterThan(initialHeight);
    await expect(field.style.overflowY).toBe('hidden');

    await userEvent.keyboard('{Enter}x'.repeat(20));
    const cappedHeight = field.offsetHeight;
    await expect(field.style.overflowY).toBe('auto');

    // Past the cap the field scrolls instead of growing — without that, a long
    // message would push everything below it off the screen.
    await userEvent.keyboard('{Enter}x'.repeat(10));
    await expect(field.offsetHeight).toBe(cappedHeight);
  },
  render: (args) => (
    <div className="w-96">
      <TextArea {...args} />
    </div>
  ),
};

// With Label
export const WithLabel: Story = {
  args: { label: 'Description' },
  render: (args) => (
    <div className="w-96">
      <TextArea {...args} />
    </div>
  ),
};
```

### Page

```jsx
/* TextArea */ compose(S, "Page")
```

### Default

```jsx
/* Default */ compose(S2, "Default")
```

### WithLabel

```jsx
/* With Label */ compose(S2, "WithLabel")
```

### WithValue

```jsx
/* With Value */ compose(S2, "WithValue")
```

### ErrorState

```jsx
/* Error State */ compose(S2, "ErrorState")
```

### WithCount

```jsx
/* With Count */ compose(S2, "WithCount")
```

### CountNearLimit

```jsx
/* Count Near Limit */ compose(S2, "CountNearLimit")
```

### CountOverSoftLimit

```jsx
/* Count Over Soft Limit */ compose(S2, "CountOverSoftLimit")
```

### CountWithoutLimit

```jsx
/* Count Without Limit */ compose(S2, "CountWithoutLimit")
```

### Disabled

```jsx
/* Disabled */ compose(S2, "Disabled")
```

### Sizes

```jsx
/* Sizes */ compose(S2, "Sizes")
```
