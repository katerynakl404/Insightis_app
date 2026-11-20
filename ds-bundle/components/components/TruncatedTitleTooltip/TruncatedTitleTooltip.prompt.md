TruncatedTitleTooltip from @devart/ui-react. Use via `window.DevartUI.TruncatedTitleTooltip` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `TruncatedTitleTooltip.html`): Truncated, Not Truncated, Side By Side.

## Props

```ts
interface TruncatedTitleTooltipProps {
  /** Text to show inside the tooltip. */
  title: string;
  /** Trigger element. Tooltip opens only when the resolved target is overflowing. */
  children: React.ReactNode;
  /** Resolves the element whose overflow should be checked, given the trigger element. Defaults to the last `<span>` child of */
  getTruncationTarget?: (trigger: Element) => Element | null;
  /** Tooltip side. Defaults to `top`. */
  side?: "top" | "right" | "bottom" | "left";
  /** Extra classes for the tooltip content. */
  className?: string;
}
```

## Examples

```jsx
// Truncated
export const Truncated: Story = {
  args: { title: longTitle },
  render: (args) => (
    <TruncatedTitleTooltip {...args}>
      <a
        href="#link"
        className="flex w-[200px] min-w-0 items-center text-ink-body"
      >
        <span className="truncate">{longTitle}</span>
      </a>
    </TruncatedTitleTooltip>
  ),
};

/** Text fits the container, so no tooltip appears on hover. */

// Not Truncated
export const NotTruncated: Story = {
  args: { title: 'Short title' },
  render: (args) => (
    <TruncatedTitleTooltip {...args}>
      <a
        href="#link"
        className="flex w-[200px] min-w-0 items-center text-ink-body"
      >
        <span className="truncate">Short title</span>
      </a>
    </TruncatedTitleTooltip>
  ),
};

/** Compare a truncated row (tooltip) against a short row (no tooltip). */

// Side By Side
export const SideBySide: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      <TruncatedTitleTooltip {...args} title={longTitle}>
        <a
          href="#truncated"
          className="flex w-[200px] min-w-0 items-center text-ink-body"
        >
          <span className="truncate">{longTitle}</span>
        </a>
      </TruncatedTitleTooltip>
      <TruncatedTitleTooltip {...args} title="Short title">
        <a
          href="#short"
          className="flex w-[200px] min-w-0 items-center text-ink-body"
        >
          <span className="truncate">Short title</span>
        </a>
      </TruncatedTitleTooltip>
    </div>
  ),
};
```

### Truncated

```jsx
/* Truncated */ compose(S, "Truncated")
```

### NotTruncated

```jsx
/* Not Truncated */ compose(S, "NotTruncated")
```

### SideBySide

```jsx
/* Side By Side */ compose(S, "SideBySide")
```
