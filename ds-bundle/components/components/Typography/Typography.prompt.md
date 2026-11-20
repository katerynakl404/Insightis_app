Typography from @devart/ui-react. Use via `window.DevartUI.Typography` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Typography.html`): Typography, Paragraph, Headings, Colors, Special Blocks, Text Styles.

## Props

```ts
interface TypographyProps {
  variant?: "div" | "h2" | "h3" | "p" | "span" | "blockquote" | "code" | "h1" | "h4" | "h5" | "h6" | "large" | "lead";
  align?: "center" | "right" | "left" | "justify";
  textStyle?: unknown;
  leading?: "none" | "normal" | "tight" | "snug" | "relaxed" | "loose";
  textColor?: "body" | "inherit" | "success" | "warning" | "primary" | "secondary" | "destructive" | "light" | "accent" | "white";
  noWrap?: boolean;
  weight?: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black";
  underline?: boolean;
  lineThrough?: boolean;
  overline?: boolean;
  element?: E;
  ref?: React.Ref;
  children?: React.ReactNode;
}
```

## Examples

```jsx
// Typography
export const Page: Story = {
  name: 'Typography',
  render: () => (
    <ChangePage group="Typography" title="Typography">
      <ChangeCase
        after={<PlanPanel />}
        afterNote="heading18 · title18 — the 24px line prod declares"
        before={<PlanPanel old />}
        beforeNote='variant="large" — 600 on a 28px line'
        beforeSource={
          <>
            the published Typography's one 18px style,{' '}
            <Code>variant="large"</Code> — unchanged since 1.4.0 — with{' '}
            <Code>weight="medium"</Code> for the heading, since there was no 18
            at 500. The tint is each line box.
          </>
        }
        files={['src/components/Typography/index.tsx']}
        footnote={
          <>
            Prod declares <Code>leading-6</Code> on all four elements and still
            renders 28px on the plan panel: <Code>md:text-lg</Code> comes later
            in the stylesheet and brings Tailwind's paired 28px with it. The
            style takes the 24px that was asked for. No <Code>body18</Code>.
          </>
        }
        n={100}
        title="An 18px rung, as prod sets it"
        why="Prod sets 18 in the profile dialog — the plan panel's heading at 500, the plan names and credit amounts at 600, on a 24px line — and the scale had no style for it, so the approved mock-up hand-rolled the credit amount."
      />

      <ChangeCase
        after={<Struck />}
        afterNote="a drawn band through the middle of the x-height"
        before={<Struck old />}
        beforeNote="the browser's stroke, on the tops of the lowercase"
        beforeSource={
          <>
            the old variant's class, <Code>line-through</Code>, put back through{' '}
            <Code>className</Code> with <Code>lineThrough</Code> omitted — the
// …

// Paragraph
export const Paragraph: Story = {};

// Headings
export const Headings: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Typography {...args} variant="h1">
        Heading 1
      </Typography>
      <Typography {...args} variant="h2">
        Heading 2
      </Typography>
      <Typography {...args} variant="h3">
        Heading 3
      </Typography>
      <Typography {...args} variant="h4">
        Heading 4
      </Typography>
      <Typography {...args} variant="h5">
        Heading 5
      </Typography>
      <Typography {...args} variant="h6">
        Heading 6
      </Typography>
    </div>
  ),
};
```

### Page

```jsx
/* Typography */ compose(S, "Page")
```

### Paragraph

```jsx
/* Paragraph */ compose(S2, "Paragraph")
```

### Headings

```jsx
/* Headings */ compose(S2, "Headings")
```

### Colors

```jsx
/* Colors */ compose(S2, "Colors")
```

### SpecialBlocks

```jsx
/* Special Blocks */ compose(S2, "SpecialBlocks")
```

### TextStyles

```jsx
/* Text Styles */ compose(S2, "TextStyles")
```
