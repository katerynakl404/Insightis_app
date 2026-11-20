SelectableListCard from @devart/ui-react. Use via `window.DevartUI.SelectableListCard` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `SelectableListCard.html`): SelectableListCard, Row, Row Selected, Card, Card Idle, Card With Selection, Row Keyboard, Row With Menu, Row Selected With Menu, Interactive.

## Props

```ts
interface SelectableListCardProps {
  layout?: "row" | "card";
  cardClassName?: string;
  cardContent: React.ReactNode;
  rightSlot?: React.ReactNode;
  selectedClassName?: string;
  /** Also announced on the item itself, as `aria-selected`. */
  isSelected: boolean;
  checkboxAriaLabel?: string;
  onCheckboxToggle: () => void;
  /** A click on the item, or Enter / Space while the item itself has focus. */
  onCardClick: () => void;
}
```

## Examples

```jsx
// SelectableListCard
export const Page: Story = {
  name: 'SelectableListCard',
  render: () => (
    <ChangePage group="SelectableListCard" title="SelectableListCard">
      <ChangeCase
        after={
          <TryIt action="Press Tab into the list, then Enter; hover a row for its ⋮">
            <List />
          </TryIt>
        }
        afterNote="a tab stop with the system ring · Enter and Space open it · menu"
        before={
          <TryIt action="Press Tab — the items are skipped; only a click opens one">
            <List old />
          </TryIt>
        }
        beforeNote="a click and nothing else"
        beforeSource={
          <>
            the developers' own component, vendored unchanged from their 1.4.0
            into <Code>changes/upstream/SelectableListCard.tsx</Code>. The{' '}
            <Code>Card</Code> and <Code>Checkbox</Code> under it are the live
            ones in both halves, so only the item's own markup differs.
          </>
        }
        files={['src/components/SelectableListCard/index.tsx']}
        footnote={
          <>
            Enter and Space open the item only while the item itself has focus —
            a key from a control inside it is that control's. The item also
            carries <Code>aria-selected</Code>, which nothing here can show: it
            means something to assistive tech only under a list or grid role,
            which the caller gives. The ⋮ is <Code>RowMenuButton</Code> (§137),
            held to <Code>-my-0.5</Code> so a row with a menu stays 44px.
          </>
        }
        n={138}
        title="Keyboard, aria-selected, menu"
        why="The item opened on a click and nothing else — not a tab stop, no key, no focus ring on the card layout — and a row that needed a menu had to build its own ⋮."
      />
// …

// Row
export const Row: Story = {
  args: {
    layout: 'row',
    cardClassName: 'justify-between',
  },
  /**
   * Until the list has a selection the row's checkbox is not merely faded but
   * out of the layout entirely, so a click anywhere on the row is a row click.
   */
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByText('report.pdf'));
    await expect(args.onCardClick).toHaveBeenCalledOnce();
    await expect(args.onCheckboxToggle).not.toHaveBeenCalled();

    await expect(
      canvas.getByRole('checkbox', { name: 'Select report.pdf', hidden: true })
    ).not.toBeVisible();
  },
  render: (args) => (
    <InList hasSelection={false}>
      <SelectableListCard {...args} />
    </InList>
  ),
};

// Row Selected
export const RowSelected: Story = {
  args: {
    layout: 'row',
    isSelected: true,
    cardClassName: 'justify-between',
  },
  /** The checkbox swallows its click, so toggling it never counts as a row click. */
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByText('report.pdf'));
    await expect(args.onCardClick).toHaveBeenCalledOnce();

    const checkbox = canvas.getByRole('checkbox', {
      name: 'Select report.pdf',
    });
    await expect(checkbox).toBeVisible();
    await expect(checkbox).toBeChecked();

    await userEvent.click(checkbox);
    await expect(args.onCheckboxToggle).toHaveBeenCalledOnce();
    await expect(args.onCardClick).toHaveBeenCalledOnce();
  },
  render: (args) => (
    <InList hasSelection>
      <SelectableListCard {...args} />
    </InList>
  ),
};
```

### Page

```jsx
/* SelectableListCard */ compose(S, "Page")
```

### Row

```jsx
/* Row */ compose(S2, "Row")
```

### RowSelected

```jsx
/* Row Selected */ compose(S2, "RowSelected")
```

### Card

```jsx
/* Card */ compose(S2, "Card")
```

### CardIdle

```jsx
/* Card Idle */ compose(S2, "CardIdle")
```

### CardWithSelection

```jsx
/* Card With Selection */ compose(S2, "CardWithSelection")
```

### RowKeyboard

```jsx
/* Row Keyboard */ compose(S2, "RowKeyboard")
```

### RowWithMenu

```jsx
/* Row With Menu */ compose(S2, "RowWithMenu")
```

### RowSelectedWithMenu

```jsx
/* Row Selected With Menu */ compose(S2, "RowSelectedWithMenu")
```

### Interactive

```jsx
/* Interactive */ compose(S2, "Interactive")
```
