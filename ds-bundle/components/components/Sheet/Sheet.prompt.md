Sheet from @devart/ui-react. Use via `window.DevartUI.Sheet` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Sheet.html`): Sheet, Default, Initially Open, Sides, Without Close Button.

## Props

```ts
interface SheetProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
}
```

## Examples

```jsx
// Sheet
export const Page: Story = {
  name: 'Sheet',
  render: () => (
    <ChangePage group="Sheet" title="Sheet">
      <ChangeCase
        after={
          <TryIt action="Open the drawer, look down its right edge">
            <Drawer />
          </TryIt>
        }
        afterNote="border-stroke — the line every other edge uses"
        before={
          <TryIt action="Open the drawer, look down its right edge">
            <Drawer className="border-gray-200" />
          </TryIt>
        }
        beforeNote="an uncoloured border-r — Tailwind's grey-200, #E5E7EB"
        beforeSource={
          <>
            today's <Code>SheetContent</Code> with <Code>border-gray-200</Code>{' '}
            through <Code>className</Code>: the colour Tailwind's preflight
            gives a border nobody coloured, so the line is the old one exactly.
            Both drawers carry <Code>.dark</Code>, so the edge reads against a
            dark sheet in either page theme.
          </>
        }
        files={['src/components/Sheet/index.tsx']}
        footnote={
          <>
            The same holds for <Code>border-b</Code> on a top sheet and{' '}
            <Code>border-t</Code> on a bottom one; a right sheet draws no edge.
            The sidebar's phone drawer is a left <Code>Sheet</Code>, which is
            where it was first seen.
          </>
        }
        n={156}
        title="The edge in the system's line"
        why="The side's edge was drawn with no colour, so it took Tailwind's default grey-200 — on a dark sheet, a white stripe down its length."
      />
    </ChangePage>
// …

// Default
export const Default: Story = {
  render: (args) => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">Open sheet</Button>
      </SheetTrigger>
      <SheetContent {...args}>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Save when you are done.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <Typography textColor="body">
            Panel body content goes here.
          </Typography>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="secondary">Cancel</Button>
          </SheetClose>
          <Button>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

// Initially Open
export const InitiallyOpen: Story = {
  render: (args) => (
    <Sheet defaultOpen>
      <SheetTrigger asChild>
        <Button variant="secondary">Open sheet</Button>
      </SheetTrigger>
      <SheetContent {...args}>
        <SheetHeader>
          <SheetTitle>Initially open</SheetTitle>
          <SheetDescription>
            Rendered open so the panel is visible without interaction.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  ),
};
```

### Page

```jsx
/* Sheet */ compose(S, "Page")
```

### Default

```jsx
/* Default */ compose(S2, "Default")
```

### InitiallyOpen

```jsx
/* Initially Open */ compose(S2, "InitiallyOpen")
```

### Sides

```jsx
/* Sides */ compose(S2, "Sides")
```

### WithoutCloseButton

```jsx
/* Without Close Button */ compose(S2, "WithoutCloseButton")
```
