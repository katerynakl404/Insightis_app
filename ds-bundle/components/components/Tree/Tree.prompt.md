Tree from @devart/ui-react. Use via `window.DevartUI.Tree` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Tree.html`): Default, With Actions, Searched, Loading.

## Props

```ts
interface TreeProps {
  /** The edge of what holds the tree, in px, at both ends of every row — 24 in a card, under its title; 16 in a pane beside a */
  inset?: number;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: () => {
    const { open, set } = useOpen(['sakila', 'public', 'actor', 'billing']);
    return (
      <Card variant="outline" className="w-[36rem] overflow-clip p-0">
        <Tree inset={24}>
          <Rows nodes={DATA} level={0} open={open} set={set} />
        </Tree>
      </Card>
    );
  },
};

/** The controls at the right edge: a press on them never folds the row. A node gone from the source is struck through. */

// With Actions
export const WithActions: Story = {
  render: () => {
    const { open, set } = useOpen(['sakila', 'public']);
    const [on, setOn] = useState(() => new Set(['sakila', 'public', 'actor']));
    return (
      <Card variant="outline" className="w-[36rem] overflow-clip p-0">
        <Tree inset={24}>
          <TreeItem
            variant="head"
            name="Finance warehouse"
            expandable
            open
            actions={
              <Badge variant="success" size="sm" rounded="full" withDot>
                Active
              </Badge>
            }
          />
          <Rows
            nodes={DATA}
            level={1}
            open={open}
            set={set}
            actions={(n) =>
              n.deleted ? null : (
                <Switch
                  checked={on.has(n.id)}
                  aria-label={`Include ${n.name}`}
                  onCheckedChange={(v) =>
                    setOn((s) => {
                      const out = new Set(s);
                      if (v) out.add(n.id);
                      else out.delete(n.id);
                      return out;
                    })
                  }
                />
              )
            }
          />
// …

// Searched
export const Searched: Story = {
  render: () => {
    const [query, setQuery] = useState('invo');
    const all = ['sakila', 'public', 'actor', 'billing', 'invoices'];
    const { open, set } = useOpen(all);
    return (
      <div className="flex w-[36rem] flex-col gap-3">
        <InputGroup>
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search the tree"
          />
        </InputGroup>
        <Card variant="outline" className="overflow-clip p-0">
          <Tree inset={24}>
            <Rows nodes={DATA} level={0} open={open} set={set} query={query} />
          </Tree>
        </Card>
      </div>
    );
  },
};

/** A branch reading its children, and a name being read again. */
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### WithActions

```jsx
/* With Actions */ compose(S, "WithActions")
```

### Searched

```jsx
/* Searched */ compose(S, "Searched")
```

### Loading

```jsx
/* Loading */ compose(S, "Loading")
```
