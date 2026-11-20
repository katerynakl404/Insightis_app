ScrollShadow from @devart/ui-react. Use via `window.DevartUI.ScrollShadow` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `ScrollShadow.html`): Vertical, Horizontal.

## Props

```ts
interface ScrollShadowProps {
  ref?: React.Ref;
  size?: number;
  offset?: number;
  orientation?: "horizontal" | "vertical";
  visibility?: "none" | "auto" | "top" | "right" | "bottom" | "left" | "both";
  isEnabled?: boolean;
  /** Whether this container is itself a Tab stop. - `'auto'` (default) — only when content overflows and no descendant is alr */
  focusable?: boolean | "auto";
  onVisibilityChange?: (visibility: ScrollShadowVisibility) => void;
  style?: CSSProperties;
  className?: string;
  id?: string;
  children?: React.ReactNode;
}
```

## Examples

```jsx
// Vertical
export const Vertical: Story = {
  args: { orientation: 'vertical' },
  /**
   * The fade is a CSS mask rebuilt from the scroll position, so which edge is
   * soft is the whole behaviour: only the far edge at the top, both in the
   * middle, only the near edge at the end. A mask stuck on one shape is the
   * bug this catches.
   */
  play: async ({ canvasElement }) => {
    const region = canvasElement.querySelector(
      '.overflow-y-auto'
    ) as HTMLElement;
    await expect(region).toBeTruthy();

    // Text-only overflow: the container itself is the keyboard scroll stop.
    await waitFor(() => expect(region.getAttribute('tabindex')).toBe('0'));
    await expect(region.getAttribute('role')).toBe('region');

    // The browser reserialises the gradient and drops the default direction, so
    // the assertions read the shape: a soft near edge starts the gradient with
    // `transparent`, a soft far edge ends it with one.
    const nearEdgeSoft = () =>
      region.style.maskImage.startsWith('linear-gradient(transparent');
    const farEdgeSoft = () => region.style.maskImage.endsWith('transparent)');

    await waitFor(() => expect(farEdgeSoft()).toBe(true));
    await expect(nearEdgeSoft()).toBe(false);

    region.scrollTop = 100;
    await waitFor(() => expect(nearEdgeSoft()).toBe(true));
    await expect(farEdgeSoft()).toBe(true);

    region.scrollTop = region.scrollHeight;
    await waitFor(() => expect(farEdgeSoft()).toBe(false));
    await expect(nearEdgeSoft()).toBe(true);
  },
  render: (args) => (
    <ScrollShadow
      {...args}
      className="h-48 w-64 rounded-md border border-stroke p-4"
// …

// Horizontal
export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
  render: (args) => (
    <ScrollShadow
      {...args}
      className="w-64 rounded-md border border-stroke p-4"
    >
      <div className="flex gap-3">
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={`col-${i + 1}`}
            className="flex size-16 shrink-0 items-center justify-center rounded-md bg-surface-chips text-ink-body"
          >
            {i + 1}
          </div>
        ))}
      </div>
    </ScrollShadow>
  ),
};
```

### Vertical

```jsx
/* Vertical */ compose(S, "Vertical")
```

### Horizontal

```jsx
/* Horizontal */ compose(S, "Horizontal")
```
