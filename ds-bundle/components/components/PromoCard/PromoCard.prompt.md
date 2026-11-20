PromoCard from @devart/ui-react. Use via `window.DevartUI.PromoCard` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `PromoCard.html`): PromoCard, Default, Dismissible, Not A Plan, As Button.

## Props

```ts
interface PromoCardProps {
  /** Leading glyph. A 20px outline mark in Brand/Primary. */
  icon?: React.ReactNode;
  /** The offer, in two or three words. */
  title: React.ReactNode;
  /** One line of what it gives. */
  description?: React.ReactNode;
  /** Where the card goes. Rendered as an anchor when given, a button otherwise. */
  href?: string;
  dismissLabel?: string;
  /** Points at the link or the button, so `ref.current.focus()` focuses the card. */
  ref?: React.Ref;
  onSelect?: () => void;
  /** Omit to render a card that cannot be dismissed. The dismiss unmounts with the card, so the consumer moves focus after di */
  onDismiss?: () => void;
  style?: CSSProperties;
  className?: string;
  id?: string;
  children?: React.ReactNode;
}
```

## Examples

```jsx
// PromoCard
export const Page: Story = {
  name: 'PromoCard',
  render: () => (
    <ChangePage group="PromoCard" title="PromoCard">
      <ChangeCase
        after={
          <TryIt action="Hover the card, then move onto the ✕ — the fill holds">
            <Promo Component={PromoCard} />
          </TryIt>
        }
        afterNote="group-hover/promo-card on the root"
        before={
          <TryIt action="Hover the card, then move onto the ✕ — the fill goes">
            <Promo Component={UpstreamPromoCard} />
          </TryIt>
        }
        beforeNote="hover:bg-state-hover on the link"
        beforeSource={
          <>
            the developers' own component, vendored unchanged from their 1.4.0
            into <Code>changes/upstream/PromoCard.tsx</Code> — the PromoCard
            their storybook ships, not a replica of it.
          </>
        }
        files={['src/components/PromoCard/index.tsx']}
        footnote={
          <>
            Over the ✕ the card keeps its fill and the ✕ adds its own tertiary
            wash on top. The hit areas do not change: the link is still the
            card, the ✕ still its own control, a sibling laid over the corner.
          </>
        }
        n={116}
        title="The hover holds over the dismiss"
        why="The ✕ is a sibling of the link, laid over its corner, and the hover was on the link — so the pointer reaching the ✕ left the link, and the card dropped its hover while the pointer was still on it."
      />
    </ChangePage>
  ),
};

// Default
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('link', { name: /Upgrade to Pro/ })
    ).toHaveAttribute('href', '#plan');
    await expect(canvas.queryByRole('button', { name: 'Dismiss' })).toBeNull();
  },
};

// Dismissible
export const Dismissible: Story = {
  args: { onDismiss: fn() },
  play: async ({ args, canvas, userEvent }) => {
    const link = canvas.getByRole('link', { name: /Upgrade to Pro/ });
    const dismiss = canvas.getByRole('button', { name: 'Dismiss' });
    await expect(link).not.toContainElement(dismiss);

    await userEvent.click(dismiss);
    await expect(args.onDismiss).toHaveBeenCalledOnce();
    await expect(args.onSelect).not.toHaveBeenCalled();

    dismiss.blur();
    await userEvent.tab();
    await expect(link).toHaveFocus();
    await userEvent.tab();
    await expect(dismiss).toHaveFocus();
  },
  parameters: {
    docs: {
      description: {
        story:
          'The dismiss is a **sibling** of the link, never nested inside it: a button inside ' +
          'an anchor is not markup, and the whole card is the link’s hit area.',
      },
    },
  },
};
```

### Page

```jsx
/* PromoCard */ compose(S, "Page")
```

### Default

```jsx
/* Default */ compose(S2, "Default")
```

### Dismissible

```jsx
/* Dismissible */ compose(S2, "Dismissible")
```

### NotAPlan

```jsx
/* Not A Plan */ compose(S2, "NotAPlan")
```

### AsButton

```jsx
/* As Button */ compose(S2, "AsButton")
```
