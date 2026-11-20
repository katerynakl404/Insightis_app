SidebarMobileTrigger from @devart/ui-react. Use via `window.DevartUI.SidebarMobileTrigger` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `SidebarMobileTrigger.html`): Default, Secondary, Own Glyph, With Tooltip.

## Props

```ts
interface SidebarMobileTriggerProps {
  /** Overrides `label` as the accessible name; prefer `label`. */
  "aria-label"?: string;
  label?: string;
  icon?: React.ReactNode;
  /** Also shows the accessible name visually — the button is a glyph and nothing else. The same string, so there is no second */
  tooltip?: boolean;
  tooltipSide?: "top" | "right" | "bottom" | "left";
  style?: CSSProperties;
  ref?: React.Ref;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  variant?: "primary" | "secondary" | "transparent" | "tertiary" | "destructiveTertiary" | "destructive" | "primaryTertiary" | "outline" | "destructiveOutline";
  size?: "sm" | "md" | "lg" | "xl" | "xs" | "3xs" | "2xs";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "rounded" | "full";
  /** Replaces the icon with a spinner and blocks pointer interaction while keeping the variant fill. Sets `aria-busy`; does n */
  isLoading?: boolean;
}
```

## Examples

```jsx
// Default
export const Default: Story = {};

/** The button's own variant, for a header that needs an outlined control. */

// Secondary
export const Secondary: Story = {
  args: { variant: 'secondary' },
};

/**
 * The glyph is the same whether the sheet is open or closed: a burger turned
 * a quarter is three vertical lines, not a second state of the same sign.
 * A caller that wants the open state to look different draws it — `icon`
 * takes whatever the glyph should be.
 */

// Own Glyph
export const OwnGlyph: Story = {
  args: { icon: <PanelLeft /> },
};

/**
 * `tooltip` shows the accessible name — the same string, so a caller that
 * names the button "Open sidebar" gets both. It hangs below by default: the
 * button lives at the top of the page.
 */
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Secondary

```jsx
/* Secondary */ compose(S, "Secondary")
```

### OwnGlyph

```jsx
/* Own Glyph */ compose(S, "OwnGlyph")
```

### WithTooltip

```jsx
/* With Tooltip */ compose(S, "WithTooltip")
```
