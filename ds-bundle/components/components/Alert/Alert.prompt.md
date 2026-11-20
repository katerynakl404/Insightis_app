Alert from @devart/ui-react. Use via `window.DevartUI.Alert` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Alert.html`): Alert, Default, With Actions, Actions On Narrow Screen, Sizes, Variants, With Illustration, Illustration Variants, Title Only, Description Only.

## Props

```ts
interface AlertProps {
  /** Optional. Without it the description is the whole message — an Alert that explains rather than announces, where a title  */
  title?: string;
  description?: React.ReactNode;
  titleClassName?: string;
  descriptionClassName?: string;
  /** Leading glyph. Use the mark Toast uses for the same variant — circle-check, circle-i, triangle-!, circle-x — so one even */
  icon?: React.ReactNode;
  iconClassName?: string;
  /** Leading illustration in place of `icon`: the given glyph (or an SVG drawn in `currentColor`) on a round plate filled wit */
  illustration?: React.ReactNode;
  illustrationClassName?: string;
  /** Trailing controls. House rule: the primary action goes LAST, on the right. */
  actions?: React.ReactNode;
  actionsClassName?: string;
  ref?: React.Ref;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  variant?: "info" | "error" | "success" | "warning" | "neutral";
  size?: "sm" | "md";
  withIllustration?: boolean;
}
```

## Examples

```jsx
// Alert
export const Page: Story = {
  name: 'Alert',
  render: () => (
    <ChangePage group="Alert" title="Alert">
      <ChangeCase
        after={
          <div className="flex w-full flex-col gap-4">
            <Captioned caption="no title — the paragraph is the message">
              <Alert
                description={`${LEAD} ${REST}`}
                icon={<Info />}
                variant="info"
              />
            </Captioned>
          </div>
        }
        afterNote="the description alone, in ink-primary, the glyph on its first line"
        before={
          <div className="flex w-full flex-col gap-4">
            <Captioned
              caption={
                <>
                  <Code>title=""</Code> — the only way to say no headline
                </>
              }
            >
              <UpstreamAlert
                description={`${LEAD} ${REST}`}
                icon={<Info />}
                title=""
                variant="info"
              />
            </Captioned>
            <Captioned caption="the first sentence lifted out to serve as the title">
              <UpstreamAlert
                description={REST}
                icon={<Info />}
                title={LEAD}
                variant="info"
              />
// …

// Default
export const Default: Story = {};

// With Actions
export const WithActions: Story = {
  args: {
    variant: 'error',
    icon: <ErrorIcon />,
    title: 'Queue paused · the last reply didn’t finish',
    description: '2 messages kept · nothing sent or charged',
    actions: (
      <>
        <Button variant="secondary" size="xs">
          Resume
        </Button>
        <Button size="xs">Retry</Button>
      </>
    ),
  },
  play: async ({ canvas }) => {
    const alert = canvas.getByRole('status');
    await expect(alert).toHaveTextContent(
      'Queue paused · the last reply didn’t finish'
    );
    await expect(within(alert).getAllByRole('button')).toHaveLength(2);
    await expect(alert.querySelector('svg')?.parentElement).toHaveAttribute(
      'aria-hidden',
      'true'
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'The primary action sits LAST, on the right. Secondary choices are read first and the commitment is read last.',
      },
    },
  },
};

/** Under `sm` the actions drop under the copy instead of squeezing it into a column of
 *  single words. */
```

### Page

```jsx
/* Alert */ compose(S, "Page")
```

### Default

```jsx
/* Default */ compose(S2, "Default")
```

### WithActions

```jsx
/* With Actions */ compose(S2, "WithActions")
```

### ActionsOnNarrowScreen

```jsx
/* Actions On Narrow Screen */ compose(S2, "ActionsOnNarrowScreen")
```

### Sizes

```jsx
/* Sizes */ compose(S2, "Sizes")
```

### Variants

```jsx
/* Variants */ compose(S2, "Variants")
```

### WithIllustration

```jsx
/* With Illustration */ compose(S2, "WithIllustration")
```

### IllustrationVariants

```jsx
/* Illustration Variants */ compose(S2, "IllustrationVariants")
```

### TitleOnly

```jsx
/* Title Only */ compose(S2, "TitleOnly")
```

### DescriptionOnly

```jsx
/* Description Only */ compose(S2, "DescriptionOnly")
```

## Related

`AlertStack`
