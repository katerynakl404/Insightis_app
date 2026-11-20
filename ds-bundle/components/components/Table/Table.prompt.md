Table from @devart/ui-react. Use via `window.DevartUI.Table` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Table.html`): Table, Default, With Footer And Caption, Selectable Rows, Interactive Rows, Sortable Header, With Row Actions, Always Visible Actions, Width Ladder, Fixed Layout, Select All, Empty, Loading.

## Props

```ts
interface TableProps {
  wrapperClassName?: string;
  /** `auto` (the default) sizes every column from its own content, so the layout shifts whenever the data does — a longer sta */
  layout?: "auto" | "fixed";
  /** How much vertical air a row gets. **Draft** — see Table.md. `comfortable` (the default) is 10px above and below, which i */
  density?: "comfortable" | "compact";
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
// Table
export const Page: Story = {
  name: 'Table',
  render: () => (
    <ChangePage group="Table" title="Table">
      <ChangeCase
        after={
          <TryIt action="Hover the Invoice header — label and glyph move together">
            <SortableHeader />
          </TryIt>
        }
        afterNote="hover: both, on ink-icon-hover"
        before={
          <TryIt action="Hover the header — only the words change colour">
            <div className="px-4 py-2.5">
              <button
                className="inline-flex items-center gap-1.5 rounded font-medium text-ink-secondary text-xs leading-4 transition-colors hover:text-ink-body"
                type="button"
              >
                Invoice
                <ChevronsUpDown className="size-3.5 text-ink-inactive" />
              </button>
            </div>
          </TryIt>
        }
        beforeNote="hover: label only, on ink-body"
        beforeSource={
          <>
            a replica of the sort control carrying HEAD's two class strings — on
            the button <Code>transition-colors hover:text-ink-body</Code>, on
            the glyph a bare <Code>text-ink-inactive</Code> with no hover rule
            at all. The button is rendered inside <Code>TableHead</Code> and its
            classes are not reachable from a prop; the After half is the
            catalog's own <Code>Components/Table → SortableHeader</Code>,
            composed rather than rebuilt.
          </>
        }
        files={['src/components/Table/TableHead.tsx']}
        footnote={
          <>
            The mechanism is a <Code>group</Code> on the button and{' '}
// …

// Default
export const Default: Story = {
  render: (args) => (
    <Table {...args}>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.invoice}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell>{row.method}</TableCell>
            <TableCell className="text-right">{row.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};

// With Footer And Caption
export const WithFooterAndCaption: Story = {
  render: (args) => (
    <Table {...args}>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Invoice</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Method</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.invoice}</TableCell>
            <TableCell>{row.status}</TableCell>
            <TableCell>{row.method}</TableCell>
            <TableCell className="text-right">{row.amount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$1,950.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};

// The selected/hover states live on body rows via `data-state=selected`.
```

### Page

```jsx
/* Table */ compose(S, "Page")
```

### Default

```jsx
/* Default */ compose(S2, "Default")
```

### WithFooterAndCaption

```jsx
/* With Footer And Caption */ compose(S2, "WithFooterAndCaption")
```

### SelectableRows

```jsx
/* Selectable Rows */ compose(S2, "SelectableRows")
```

### InteractiveRows

```jsx
/* Interactive Rows */ compose(S2, "InteractiveRows")
```

### SortableHeader

```jsx
/* Sortable Header */ compose(S2, "SortableHeader")
```

### WithRowActions

```jsx
/* With Row Actions */ compose(S2, "WithRowActions")
```

### AlwaysVisibleActions

```jsx
/* Always Visible Actions */ compose(S2, "AlwaysVisibleActions")
```

### WidthLadder

```jsx
/* Width Ladder */ compose(S2, "WidthLadder")
```

### FixedLayout

```jsx
/* Fixed Layout */ compose(S2, "FixedLayout")
```

### SelectAll

```jsx
/* Select All */ compose(S2, "SelectAll")
```

### Empty

```jsx
/* Empty */ compose(S2, "Empty")
```

### Loading

```jsx
/* Loading */ compose(S2, "Loading")
```
