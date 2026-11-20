IconHint from @devart/ui-react. Use via `window.DevartUI.IconHint` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `IconHint.html`): Default, Tones, Opens On Keyboard.

## Props

```ts
interface IconHintProps {
  /** The words it exists to show — on hover, on keyboard focus, and on a long press. Required: a mark with nothing to say is  */
  tooltip: React.ReactNode;
  /** The hint's accessible name — "About Finance warehouse". Required. */
  label: string;
  tooltipSide?: "top" | "right" | "bottom" | "left";
  ref?: React.Ref;
  style?: CSSProperties;
  className?: string;
  id?: string;
  variant?: "error" | "warning" | "neutral";
  size?: "sm" | "md";
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: (args) => (
    <Row name="Data Analyze">
      <IconHint {...args} />
    </Row>
  ),
};

/** The three tones, one row each: the note, the warning, the failure. */

// Tones
export const Tones: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <Row name="Finance warehouse">
        <IconHint
          label="About Finance warehouse"
          tooltip="The warehouse the finance team reports from."
        />
      </Row>
      <Row name="Sales, EMEA">
        <IconHint
          label="What is wrong with Sales, EMEA"
          tooltip="Nothing included yet."
          variant="warning"
        />
      </Row>
      <Row name="Oracle ERP (staging)">
        <IconHint
          label="What is wrong with Oracle ERP (staging)"
          tooltip="Connection to host failed. The host is not reachable."
          variant="error"
        />
      </Row>
    </div>
  ),
};

/**
 * Focus is the keyboard's hover: Tab reaches the glyph and the words open,
 * with nothing to press and no action behind it.
 */

// Opens On Keyboard
export const OpensOnKeyboard: Story = {
  render: (args) => (
    <Row name="Finance warehouse">
      <IconHint {...args} label="About Finance warehouse" />
    </Row>
  ),
  play: async ({ canvas, userEvent }) => {
    const hint = canvas.getByRole('img', { name: 'About Finance warehouse' });

    await userEvent.tab();
    await expect(hint).toHaveFocus();
    await waitFor(() =>
      expect(within(document.body).getByRole('tooltip')).toBeVisible()
    );
  },
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Tones

```jsx
/* Tones */ compose(S, "Tones")
```

### OpensOnKeyboard

```jsx
/* Opens On Keyboard */ compose(S, "OpensOnKeyboard")
```
