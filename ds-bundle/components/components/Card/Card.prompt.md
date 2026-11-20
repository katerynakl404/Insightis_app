Card from @devart/ui-react. Use via `window.DevartUI.Card` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Card.html`): Card, Default, Variants, Anatomy, Header Actions, Rounded, Full Width, Sticky Footer, Divided Sticky Footer.

## Props

```ts
interface CardProps {
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  variant?: "row" | "secondary" | "outline" | "ghost" | "elevated";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "rounded";
  fullWidth?: boolean;
}
```

## Examples

```jsx
// Card
export const Page: Story = {
  name: 'Card',
  render: () => (
    <ChangePage group="Card" title="Card">
      <ChangeCase
        after={
          <TryIt action="Hover both — neither border moves">
            <div className="flex gap-3">
              <Card className="w-44" variant="outline">
                <Typography textStyle="title14">Retention</Typography>
                <Typography textColor="secondary" textStyle="body12">
                  A surface. Nothing here is clickable.
                </Typography>
              </Card>
            </div>
          </TryIt>
        }
        afterNote="border-stroke, and it stays"
        before={
          <TryIt action="Hover — the border tints toward brand, and nothing happens">
            <div className="flex gap-3">
              <Card className={`w-44 ${OLD_OUTLINE_HOVER}`} variant="outline">
                <Typography textStyle="title14">Retention</Typography>
                <Typography textColor="secondary" textStyle="body12">
                  A surface. Nothing here is clickable.
                </Typography>
              </Card>
            </div>
          </TryIt>
        }
        beforeNote="hover:border-card-border-hover"
        beforeSource={
          <>
            the published class reapplied through <Code>className</Code> —{' '}
            <Code>hover:border-card-border-hover</Code>, which is the whole of
            the change.
          </>
        }
        files={['src/components/Card/index.tsx']}
        footnote={
// …

// Default
export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader>
        <CardTitle>Usage this month</CardTitle>
        <CardDescription>Resets on the 1st of each month.</CardDescription>
      </CardHeader>
      <CardContent>
        You have used 640 of 1,000 messages included in your plan.
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="secondary" size="sm">
          View details
        </Button>
        <Button size="sm">Upgrade</Button>
      </CardFooter>
    </Card>
  ),
};

// Variants
export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-start gap-4">
      <Card {...args} variant="outline" className="w-72">
        <CardHeader>
          <CardTitle>Outline</CardTitle>
          <CardDescription>
            Bordered surface with a subtle shadow.
          </CardDescription>
        </CardHeader>
        <CardContent>Default variant, best for standalone content.</CardContent>
      </Card>
      <Card {...args} variant="secondary" className="w-72">
        <CardHeader>
          <CardTitle>Secondary</CardTitle>
          <CardDescription>Filled surface with hover feedback.</CardDescription>
        </CardHeader>
        <CardContent>Best for interactive list rows and tiles.</CardContent>
      </Card>
      <Card {...args} className="w-72" variant="elevated">
        <CardHeader>
          <CardTitle>Elevated</CardTitle>
          <CardDescription>
            Lifts on hover — shadow, brand-tinted border, -2px translate.
          </CardDescription>
        </CardHeader>
        <CardContent>The provider / connector tile surface.</CardContent>
      </Card>
      <Card {...args} className="w-72" variant="row">
        <CardContent>Row — compact single-line list item.</CardContent>
      </Card>
      <Card {...args} className="h-32 w-72" variant="ghost">
        <CardContent>
          Ghost — dashed &ldquo;browse more&rdquo; tile.
        </CardContent>
      </Card>
    </div>
  ),
};
// …
```

### Page

```jsx
/* Card */ compose(S, "Page")
```

### Default

```jsx
/* Default */ compose(S2, "Default")
```

### Variants

```jsx
/* Variants */ compose(S2, "Variants")
```

### Anatomy

```jsx
/* Anatomy */ compose(S2, "Anatomy")
```

### HeaderActions

```jsx
/* Header Actions */ compose(S2, "HeaderActions")
```

### Rounded

```jsx
/* Rounded */ compose(S2, "Rounded")
```

### FullWidth

```jsx
/* Full Width */ compose(S2, "FullWidth")
```

### StickyFooter

```jsx
/* Sticky Footer */ compose(S2, "StickyFooter")
```

### DividedStickyFooter

```jsx
/* Divided Sticky Footer */ compose(S2, "DividedStickyFooter")
```
