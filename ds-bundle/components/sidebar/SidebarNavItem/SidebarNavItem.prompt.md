SidebarNavItem from @devart/ui-react. Use via `window.DevartUI.SidebarNavItem` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `SidebarNavItem.html`): Default, Navigation, Collapsed Rail, Active, Not Activatable, With Badge, With Badge Collapsed, Element Icon.

## Props

```ts
interface SidebarNavItemProps {
  /** The row's glyph. A component — a lucide icon — is rendered at the row's size; an element — a product mark, an `<img>` —  */
  icon: ReactElement<unknown, string | JSXElementConstructor<any>> | ComponentClass<{ className?: string; }, any> | FunctionComponent<{ className?: string; }>;
  label: string;
  /** Trailing content at the row's end — a `Counter`, a `Badge`. The rail has no room for it, so it leaves there; it is the r */
  badge?: React.ReactNode;
  activatable?: boolean;
  withTooltip?: boolean;
  tooltipSide?: "top" | "right" | "bottom" | "left";
  className?: string;
  href?: string;
  asChild?: boolean;
  children?: React.ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: (args) => (
    <Rail defaultOpen>
      <SidebarNavItem {...args} />
    </Rail>
  ),
};

/** The four rows an app shell actually ships, expanded. */

// Navigation
export const Navigation: Story = {
  render: (args) => (
    <Rail defaultOpen>
      <SidebarNavItem
        {...args}
        icon={CirclePlus}
        label="New chat"
        activatable={false}
      />
      <SidebarNavItem {...args} icon={Database} label="Data sources" />
      <SidebarNavItem {...args} icon={ChartPie} label="Metrics" />
      <SidebarNavItem {...args} icon={Folder} label="Files" />
    </Rail>
  ),
};

/**
 * Collapsed, the row becomes a 28px square and the label moves into a tooltip.
 * Callers flip `withTooltip` from the sidebar's own `state`.
 */

// Collapsed Rail
export const CollapsedRail: Story = {
  args: { withTooltip: true },
  render: (args) => (
    <Rail defaultOpen={false}>
      <SidebarNavItem
        {...args}
        icon={CirclePlus}
        label="New chat"
        activatable={false}
      />
      <SidebarNavItem {...args} icon={Database} label="Data sources" />
      <SidebarNavItem {...args} icon={ChartPie} label="Metrics" />
      <SidebarNavItem {...args} icon={Folder} label="Files" />
    </Rail>
  ),
};

/**
 * `asChild` hands the row to the caller's link element. Here a plain anchor
 * carries `aria-current="page"`; a router link carrying `data-status="active"`
 * paints identically.
 */
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### Navigation

```jsx
/* Navigation */ compose(S, "Navigation")
```

### CollapsedRail

```jsx
/* Collapsed Rail */ compose(S, "CollapsedRail")
```

### Active

```jsx
/* Active */ compose(S, "Active")
```

### NotActivatable

```jsx
/* Not Activatable */ compose(S, "NotActivatable")
```

### WithBadge

```jsx
/* With Badge */ compose(S, "WithBadge")
```

### WithBadgeCollapsed

```jsx
/* With Badge Collapsed */ compose(S, "WithBadgeCollapsed")
```

### ElementIcon

```jsx
/* Element Icon */ compose(S, "ElementIcon")
```
