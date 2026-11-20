Accordion from @devart/ui-react. Use via `window.DevartUI.Accordion` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Accordion.html`): Accordion, Single Collapsible, Multiple, Disabled.

## Props

```ts
interface AccordionProps {
  type: "single" | "multiple";
  /** The controlled stateful value of the accordion item whose content is expanded. */
  value?: string | string[];
  /** The value of the item whose content is expanded when the accordion is initially rendered. Use `defaultValue` if you do n */
  defaultValue?: string | string[];
  /** Whether or not an accordion is disabled from user interaction. */
  disabled?: boolean;
  /** The layout in which the Accordion operates. */
  orientation?: "horizontal" | "vertical";
  /** The language read direction. */
  dir?: "ltr" | "rtl";
  style?: CSSProperties;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
}
```

## Examples

```jsx
// Accordion
export const Page: Story = {
  name: 'Accordion',
  render: () => (
    <ChangePage group="Accordion" title="Accordion">
      <ChangeCase
        after={<Sections standalone />}
        afterNote="variant='standalone' — no rule, every card whole"
        before={<Sections />}
        beforeNote="border-b last:border-b-0 under the card's border"
        beforeSource={
          <>
            the live item without the prop — <Code>variant</Code> defaults to{' '}
            <Code>divided</Code>, which is the published item exactly. The card
            classes on the item are the same in both halves.
          </>
        }
        files={['src/components/Accordion/AccordionItem.tsx']}
        footnote={
          <>
            Inside one shared surface the rule is right, and stays the default.
            Made into a card, the item's divider merges into the card's own
            border — and <Code>last:border-b-0</Code> then takes the bottom edge
            off the last card. Wrapped in a <Code>Card</Code> of its own
            instead, the item is its card's last child, so <Code>last:</Code>{' '}
            hid the rule there already; the variant says which shape the item is
            rather than leaning on that.
          </>
        }
        n={49}
        title="AccordionItem — an item that is its own surface"
        why="The item had one layout, a rule under every item but the last — right for items stacked in one surface, wrong for one card per section, where the page had to override the component to undo it."
      />

      <ChangeCase
        after={<Form size="md" />}
        afterNote="size='md' — text-base, the size of title16"
        before={<Form />}
        beforeNote="text-sm — a step under the section beside it"
        beforeSource={
          <>
// …

// Single Collapsible
export const SingleCollapsible: Story = {
  args: { type: 'single' },
  render: ({ orientation, disabled }) => (
    <Accordion
      type="single"
      collapsible
      defaultValue="billing"
      orientation={orientation}
      disabled={disabled}
    >
      {renderItems()}
    </Accordion>
  ),
};

// Multiple
export const Multiple: Story = {
  args: { type: 'multiple' },
  render: ({ orientation, disabled }) => (
    <Accordion
      type="multiple"
      defaultValue={['billing', 'security']}
      orientation={orientation}
      disabled={disabled}
    >
      {renderItems()}
    </Accordion>
  ),
};
```

### Page

```jsx
/* Accordion */ compose(S, "Page")
```

### SingleCollapsible

```jsx
/* Single Collapsible */ compose(S2, "SingleCollapsible")
```

### Multiple

```jsx
/* Multiple */ compose(S2, "Multiple")
```

### Disabled

```jsx
/* Disabled */ compose(S2, "Disabled")
```
