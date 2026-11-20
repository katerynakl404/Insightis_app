Pagination from @devart/ui-react. Use via `window.DevartUI.Pagination` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Pagination.html`): Pagination, Default, First Page, Last Page, Few Pages, Interactive, With Range.

## Props

```ts
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  siblingCount: number;
  boundaryCount: number;
  showFirstLast: boolean;
  showPrevNext: boolean;
  /** Draw the numbered page buttons. **Draft.** On for everything that is paged by the reader: a page number is a destination */
  showPageNumbers?: boolean;
  /** The rung the whole control is drawn on. **Draft.** `sm` (32px) is the default and is right when the pager is the page's  */
  size?: "sm" | "xs";
  /** How many items the whole list holds. With `pageSize`, the pager reads out its range — "Showing 26–50 of 60", `body12` in */
  totalItems?: number;
  /** Items per page — with `totalItems`, the range readout. **Draft. */
  pageSize?: number;
  onPageChange: (page: number) => void;
  /** Accessible labels for the navigation buttons, overriding their defaults. */
  labels?: { first?: string; previous?: string; next?: string; last?: string; };
}
```

## Examples

```jsx
// Pagination
export const Page: Story = {
  name: 'Pagination',
  render: () => (
    <ChangePage group="Pagination" title="Pagination">
      <ChangeCase
        after={
          <TryIt action="Page through — Prev and Next move the range">
            <LogFooter />
          </TryIt>
        }
        afterNote="showPageNumbers={false} · showFirstLast={false}"
        before={
          <TryIt action="Page through — three buttons that each do what Next does">
            <LogFooter numbers />
          </TryIt>
        }
        beforeNote="showFirstLast={false} — the numbers always drawn"
        beforeSource={
          <>
            the live pager with <Code>showPageNumbers</Code> omitted — it
            defaults to <Code>true</Code>, which is the published pager exactly.
            The range beside it is written by hand in both halves, as pages did.
          </>
        }
        files={['src/components/Pagination/index.tsx']}
        footnote={
          <>
            A page number is right where it is a destination — a table somebody
            searches, sorts and comes back to — so the default stays on. Pair it
            with <Code>showFirstLast={'{false}'}</Code>: First and Last are
            jumps of the same kind, and leaving them in while the numbers go is
            half a decision.
          </>
        }
        n={82}
        state="draft"
        title="showPageNumbers — a stream read in order"
        why="The pager always drew the numbered buttons. Under a connection's log that was three buttons all doing what Next does, and the current one doing nothing at all — what keeps the reader's place there is the range."
      />
// …

// Default
export const Default: Story = {};

// First Page
export const FirstPage: Story = {
  args: { currentPage: 1 },
};
```

### Page

```jsx
/* Pagination */ compose(S, "Page")
```

### Default

```jsx
/* Default */ compose(S2, "Default")
```

### FirstPage

```jsx
/* First Page */ compose(S2, "FirstPage")
```

### LastPage

```jsx
/* Last Page */ compose(S2, "LastPage")
```

### FewPages

```jsx
/* Few Pages */ compose(S2, "FewPages")
```

### Interactive

```jsx
/* Interactive */ compose(S2, "Interactive")
```

### WithRange

```jsx
/* With Range */ compose(S2, "WithRange")
```
