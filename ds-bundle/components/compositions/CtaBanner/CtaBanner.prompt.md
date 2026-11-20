CtaBanner from @devart/ui-react. Use via `window.DevartUI.CtaBanner` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `CtaBanner.html`): Default, Gradient, Small.

## Props

```ts
interface CtaBannerProps {
  title: string;
  description?: React.ReactNode;
  ctaLabel: string;
  variant?: "default" | "horizontalWide" | "diagonalAiry" | "diagonalFade" | "horizontalSlab";
  actionVariant?: "primary" | "secondary" | "transparent" | "tertiary" | "destructiveTertiary" | "destructive" | "primaryTertiary" | "outline" | "destructiveOutline" | "transparentUnderline";
  size?: "sm" | "default";
  icon?: React.ReactNode;
  className?: string;
  ref?: React.Ref;
  onClick: () => void;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const button = canvas.getByRole('button', { name: 'Connect source' });

    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/** Both gradients that repaint the button, as the upgrade and empty states use them. */

// Gradient
export const Gradient: Story = {
  render: (args) => (
    <div className="flex w-full flex-col gap-4">
      <CtaBanner {...args} variant="horizontalWide" icon={<Sun />} />
      <CtaBanner
        {...args}
        variant="diagonalAiry"
        title="Upgrade to connect more sources"
        description={
          <>
            Your plan includes <b>1</b> connection. Upgrade to add more.
          </>
        }
        ctaLabel="Upgrade"
        icon={<Lock />}
      />
    </div>
  ),
  play: async ({ canvas, canvasElement }) => {
    const background = resolveToken(canvasElement, '--banner-grad-text');
    const text = resolveToken(canvasElement, '--banner-grad-btn-text');

    for (const name of ['Connect source', 'Upgrade']) {
      const button = canvas.getByRole('button', { name });
      const style = getComputedStyle(button);

      await expect(style.backgroundColor).toBe(background);
      await expect(style.color).toBe(text);
    }
  },
};

/** `size="sm"`: the compact banner used above a filled list. */

// Small
export const Small: Story = {
  args: {
    size: 'sm',
    title: 'Add a new metric',
    description: 'Connect another source to build more metrics.',
    ctaLabel: 'Browse catalog',
    icon: <Link />,
  },
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole('button', { name: 'Browse catalog' })
    );
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Gradient

```jsx
/* Gradient */ compose(S, "Gradient")
```

### Small

```jsx
/* Small */ compose(S, "Small")
```
