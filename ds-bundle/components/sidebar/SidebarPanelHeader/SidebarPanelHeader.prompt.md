SidebarPanelHeader from @devart/ui-react. Use via `window.DevartUI.SidebarPanelHeader` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `SidebarPanelHeader.html`): Expanded, Collapsed Rail.

## Props

```ts
interface SidebarPanelHeaderProps {
  /** The brand mark, usually wrapped in the consumer's own home link. Must be a single element: the row's layout and focus cl */
  logoIcon: React.ReactNode;
  /** Defaults to a plain `SidebarTrigger`; pass one to control its label. */
  sidebarTrigger?: React.ReactNode;
  className?: string;
}
```

## Examples

```jsx
// Expanded
export const Expanded: Story = {
  args: {
    logoIcon: (
      // biome-ignore lint/a11y/useValidAnchor: story-only placeholder link
      <a href="#" aria-label="Home">
        <Wordmark />
      </a>
    ),
  },
  render: (args) => (
    <Shell defaultOpen>
      <SidebarPanelHeader {...args} />
    </Shell>
  ),
};

/**
 * Collapsed to the rail. Hover the square (or tab to it) to swap the mark for
 * the trigger.
 */

// Collapsed Rail
export const CollapsedRail: Story = {
  args: {
    logoIcon: (
      // biome-ignore lint/a11y/useValidAnchor: story-only placeholder link
      <a href="#" aria-label="Home">
        <Wordmark />
      </a>
    ),
    sidebarTrigger: (
      <SidebarTrigger
        className="shrink-0"
        label="Expand sidebar"
        size="xs"
        tooltip
      />
    ),
  },
  render: (args) => (
    <Shell defaultOpen={false}>
      <SidebarPanelHeader {...args} />
    </Shell>
  ),
};
```

### Expanded

```jsx
/* Expanded */ compose(S, "Expanded")
```

### CollapsedRail

```jsx
/* Collapsed Rail */ compose(S, "CollapsedRail")
```
