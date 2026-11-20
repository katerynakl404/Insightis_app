SidebarMenuRow from @devart/ui-react. Use via `window.DevartUI.SidebarMenuRow` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `SidebarMenuRow.html`): Default, External, Without Icon, Menu.

## Props

```ts
interface SidebarMenuRowProps {
  icon?: LucideIcon;
  label: string;
  isExternal?: boolean;
  trailingSlot?: React.ReactNode;
  className?: string;
  onSelect?: () => void;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole('button', { name: 'Settings' }));
    await expect(args.onSelect).toHaveBeenCalledOnce();
  },
};

/** `isExternal` adds the outbound arrow; the anchor stays the caller's job. */

// External
export const External: Story = {
  args: { icon: BookOpen, label: 'Documentation', isExternal: true },
  play: async ({ canvas }) => {
    const row = canvas.getByRole('button', { name: 'Documentation' });
    await expect(
      row.querySelector('svg.lucide-arrow-up-right')
    ).toBeInTheDocument();
  },
};

// Without Icon
export const WithoutIcon: Story = {
  args: { icon: undefined, label: 'Sign out' },
  play: async ({ canvas }) => {
    const row = canvas.getByRole('button', { name: 'Sign out' });
    await expect(row.querySelector('svg')).not.toBeInTheDocument();
  },
};

/** The shape a footer popover actually renders. */
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### External

```jsx
/* External */ compose(S, "External")
```

### WithoutIcon

```jsx
/* Without Icon */ compose(S, "WithoutIcon")
```

### Menu

```jsx
/* Menu */ compose(S, "Menu")
```
