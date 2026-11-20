ListPageLayout from @devart/ui-react. Use via `window.DevartUI.ListPageLayout` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `ListPageLayout.html`): ListPageLayout, Sticky header (small screens only), Without Header, Short Content, Narrow Column, Condensing header (small screens only), Condensing header (tablet), Condensing header (wide screens: never), Body Inset.

## Props

```ts
interface ListPageLayoutProps {
  children: React.ReactNode;
  /** The header above the list, sticky below `lg`. As a render function it receives the header's state, so a header that cond */
  stickyHeader?: boolean | ((state: ListPageLayoutHeaderState) => ReactNode) | React.ReactNode;
  stickyHeaderClassName?: string;
  scrollRestorationId?: string;
  /** The centred column that holds the header and the body — its max width. */
  contentClassName?: string;
  /** The body under the header. It owns the list's side and bottom inset (`pb-3`) and the 12px between blocks, which `content */
  bodyClassName?: string;
  /** Pixels of scroll after which the sticky header condenses: its inset tightens and a render-function header receives `cond */
  condenseAfter?: number;
  onScrollElementChange?: (element: HTMLDivElement | null) => void;
}
```

## Examples

```jsx
// ListPageLayout
export const Page: Story = {
  name: 'ListPageLayout',
  globals: { viewport: { value: 'tablet', isRotated: false } },
  render: () => (
    <ChangePage
      group="ListPageLayout"
      intro="Opens at the tablet viewport: the header is sticky, and so can condense, only below lg (1024px). From lg up it scrolls away with the page."
      title="ListPageLayout"
    >
      <ChangeCase
        after={
          <TryIt action="Scroll past 60px — the inset tightens and the title steps down">
            <Window condensing />
          </TryIt>
        }
        afterNote="condenseAfter={60} · header as ({ condensed }) => …"
        before={
          <TryIt action="Scroll the list — the header keeps its full height">
            <Window />
          </TryIt>
        }
        beforeNote="the header as a node — it sticks and never changes"
        beforeSource={
          <>
            the live layout with <Code>condenseAfter</Code> omitted and the
            header passed as a node, which renders as the published layout: the
            same sticky header at the same height however far the list goes.
          </>
        }
        files={[
          'src/components/ListPageLayout/index.tsx',
          'src/components/ListPageLayout/use-list-header-height.ts',
        ]}
        footnote={
          <>
            Condensed, the header's inset tightens to 6px over{' '}
            <Code>--motion-slow</Code> and a render-function{' '}
            <Code>stickyHeader</Code> receives <Code>condensed</Code> to hand to{' '}
            <Code>PageHeader</Code> — no context, no <Code>cloneElement</Code>.
            The kit's <Code>scrollTop &gt; 60</Code> flickered when parked just
// …

// Sticky header (small screens only)
export const WithStickyHeader: Story = {
  name: 'Sticky header (small screens only)',
  globals: { viewport: { value: 'mobile1', isRotated: false } },
  args: {
    stickyHeader: <PageHeader title="Files" />,
    contentClassName: 'max-w-5xl',
    children: <Rows />,
  },
  /**
   * The shadow follows the scroll position: hidden at the top, shown once the
   * page has moved, hidden again when it comes back. The container itself
   * takes focus, so the list is scrollable by keyboard before any row is.
   */
  play: async ({ canvasElement }) => {
    const scroller = canvasElement.querySelector(
      '.overflow-y-auto'
    ) as HTMLElement;
    const shadow = canvasElement.querySelector('.top-full') as HTMLElement;
    await expect(scroller).toHaveAttribute('tabindex', '0');
    await expect(shadow).toHaveStyle({ opacity: '0' });
    await expect(scroller.scrollHeight).toBeGreaterThan(scroller.clientHeight);

    scroller.scrollTop = 200;
    scroller.dispatchEvent(new Event('scroll'));
    await waitFor(() => expect(shadow.style.opacity).toBe('1'));

    scroller.scrollTop = 0;
    scroller.dispatchEvent(new Event('scroll'));
    await waitFor(() => expect(shadow.style.opacity).toBe('0'));
  },
};

/** No header: the layout is just the scroll container and the content column. */

// Without Header
export const WithoutHeader: Story = {
  args: {
    contentClassName: 'max-w-5xl',
    children: <Rows />,
  },
};

/** Short content — the page does not scroll, so no shadow ever appears. */
```

### Page

```jsx
/* ListPageLayout */ compose(S, "Page")
```

### WithStickyHeader

```jsx
/* Sticky header (small screens only) */ compose(S2, "WithStickyHeader")
```

### WithoutHeader

```jsx
/* Without Header */ compose(S2, "WithoutHeader")
```

### ShortContent

```jsx
/* Short Content */ compose(S2, "ShortContent")
```

### NarrowColumn

```jsx
/* Narrow Column */ compose(S2, "NarrowColumn")
```

### CondensingHeader

```jsx
/* Condensing header (small screens only) */ compose(S2, "CondensingHeader")
```

### CondensingHeaderTablet

```jsx
/* Condensing header (tablet) */ compose(S2, "CondensingHeaderTablet")
```

### CondensingHeaderWideScreen

```jsx
/* Condensing header (wide screens: never) */ compose(S2, "CondensingHeaderWideScreen")
```

### BodyInset

```jsx
/* Body Inset */ compose(S2, "BodyInset")
```
