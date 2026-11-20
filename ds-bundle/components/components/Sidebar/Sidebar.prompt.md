Sidebar from @devart/ui-react. Use via `window.DevartUI.Sidebar` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Sidebar.html`): Sidebar, Expanded, With Promo, Collapsed Icon, Floating Variant, Inset Variant, Nested Group, App Shell, Mobile Overlay, Row States, Chat Item States, Chat Items On A Phone, Footer Rows, Leaving The Phone Layout.

## Props

```ts
interface SidebarProps {
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  side?: "right" | "left";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "none" | "offcanvas" | "icon";
  sheetClassname?: string;
}
```

## Examples

```jsx
// Sidebar
export const Page: Story = {
  name: 'Sidebar',
  render: () => (
    <ChangePage
      intro="The web sidebar: the product mark and the collapse control live in the rail, because a browser tab is no place for them."
      group="Sidebar"
      title="Sidebar"
    >
      <ChangeCase
        after={
          <Shell guides navInset>
            <SidebarHeader>
              <BrandRow />
            </SidebarHeader>
            <SidebarContent>
              <SidebarNavigationItems items={navigation} />
            </SidebarContent>
          </Shell>
        }
        afterNote="ps-4 pe-2 — the mark moves to 16"
        before={
          <Shell guides navInset>
            <SidebarHeader className="ps-0 pe-0">
              <BrandRow />
            </SidebarHeader>
            <SidebarContent>
              <SidebarNavigationItems items={navigation} />
            </SidebarContent>
          </Shell>
        }
        beforeNote="no horizontal padding — the mark sits at 0"
        beforeSource={
          <>
            the live header with its inset removed through{' '}
            <Code>className</Code>, which is what the component carried. The two
            hairlines are x = 8 (amber) and x = 16 (teal).
          </>
        }
        files={[
          'src/components/Sidebar/SidebarHeader.tsx',
// …

// Expanded
export const Expanded: Story = {
  /**
   * The open state lives in the provider and is published as `data-state`, so
   * consumers can style against it. The trigger is the only thing that moves
   * it, and it must move it both ways.
   */
  play: async ({ canvasElement, userEvent }) => {
    const panel = canvasElement.querySelector('[data-state]') as HTMLElement;
    await expect(panel).toHaveAttribute('data-state', 'expanded');

    const trigger = canvasElement.querySelector(
      '[data-sidebar="trigger"]'
    ) as HTMLElement;
    await userEvent.click(trigger);
    await waitFor(() =>
      expect(panel).toHaveAttribute('data-state', 'collapsed')
    );

    await userEvent.click(trigger);
    await waitFor(() =>
      expect(panel).toHaveAttribute('data-state', 'expanded')
    );
  },
  render: (args) => (
    <SidebarProvider defaultOpen>
      <ProductSidebar {...args} />
      <StoryInset collapsible={args.collapsible} />
    </SidebarProvider>
  ),
};

/**
 * The offer above the footer: glyph, what it is, one line of what it gives,
 * and a dismiss. It does NOT name the plan the person is on — the account row
 * below already does. Dismissing it here hides it for the story's lifetime.
 */

// With Promo
export const WithPromo: Story = {
  args: { showPromo: true },
  render: Expanded.render,
};

/**
 * Collapsed to the icon rail: the brand keeps its mark and swaps it for the
 * trigger on hover or focus, the nav keeps its icons with tooltips, and the
 * lists, the promo and the balance leave — none of them has a 48px form. The
 * account row keeps its avatar, and its name as visually hidden text.
 */
```

### Page

```jsx
/* Sidebar */ compose(S, "Page")
```

### Expanded

```jsx
/* Expanded */ compose(S2, "Expanded")
```

### WithPromo

```jsx
/* With Promo */ compose(S2, "WithPromo")
```

### CollapsedIcon

```jsx
/* Collapsed Icon */ compose(S2, "CollapsedIcon")
```

### FloatingVariant

```jsx
/* Floating Variant */ compose(S2, "FloatingVariant")
```

### InsetVariant

```jsx
/* Inset Variant */ compose(S2, "InsetVariant")
```

### NestedGroup

```jsx
/* Nested Group */ compose(S2, "NestedGroup")
```

### AppShell

```jsx
/* App Shell */ compose(S2, "AppShell")
```

### MobileOverlay

```jsx
/* Mobile Overlay */ compose(S2, "MobileOverlay")
```

### RowStates

```jsx
/* Row States */ compose(S2, "RowStates")
```

### ChatItemStates

```jsx
/* Chat Item States */ compose(S2, "ChatItemStates")
```

### ChatItemsOnAPhone

```jsx
/* Chat Items On A Phone */ compose(S2, "ChatItemsOnAPhone")
```

### FooterRows

```jsx
/* Footer Rows */ compose(S2, "FooterRows")
```

### LeavingThePhoneLayout

```jsx
/* Leaving The Phone Layout */ compose(S2, "LeavingThePhoneLayout")
```

## Related

`SidebarMenuRow`, `SidebarMobileTrigger`, `SidebarNavItem`, `SidebarPanelHeader`, `SidebarTrigger`
