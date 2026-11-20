HighlightText from @devart/ui-react. Use via `window.DevartUI.HighlightText` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `HighlightText.html`): Default, In A Tree.

## Props

```ts
interface HighlightTextProps {
  /** The whole string — a row's name. */
  text: string;
  /** What was searched for. Empty, or only spaces: the text as it is. */
  query?: string;
  /** Added to each marked part. */
  className?: string;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: (args) => (
    <Typography element="span" textStyle="body14" textColor="primary">
      <HighlightText {...args} />
    </Typography>
  ),
};

/* A schema, its tables, their columns — depth, name. */
const TREE: [number, string][] = [
  [0, 'billing'],
  [1, 'invoices'],
  [2, 'invoice_id'],
  [2, 'issued_at'],
  [1, 'payments'],
  [2, 'payment_id'],
  [2, 'invoice_ref'],
  [1, 'refunds'],
  [2, 'refund_id'],
];

/** A tree as a search narrows it: each match stays with the path above it,
 *  and the mark is what tells the matching rows from the rows that place them. */

// In A Tree
export const InATree: Story = {
  render: () => {
    const [query, setQuery] = useState('invo');
    const q = query.trim().toLowerCase();
    const hits = TREE.map(([, name]) => name.toLowerCase().includes(q));
    /* A row stays when it matches, or when a deeper row under it does. */
    const kept = TREE.map(([depth], i) => {
      if (!q || hits[i]) return true;
      for (let j = i + 1; j < TREE.length; j += 1) {
        const row = TREE[j];
        if (!row || row[0] <= depth) break;
        if (hits[j]) return true;
      }
      return false;
    });
    return (
      <div className="flex w-80 flex-col gap-3">
        <InputGroup size="sm" variant="outline">
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search the schema"
          />
        </InputGroup>
        <ul className="flex flex-col rounded-lg border border-stroke">
          {TREE.map(([depth, name], i) =>
            kept[i] ? (
              <li
                key={name}
                className="border-stroke border-b py-2.5 pe-4 last:border-b-0"
                style={{ paddingInlineStart: 16 + depth * 20 }}
              >
                <Typography
                  element="span"
                  textStyle="body14"
                  textColor="primary"
                >
// …
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### InATree

```jsx
/* In A Tree */ compose(S, "InATree")
```
