Tabs from @devart/ui-react. Use via `window.DevartUI.Tabs` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Tabs.html`): Tabs, Default, With Icons, With Disabled Tab, Small.

## Props

```ts
interface TabsProps {
  size?: "sm" | "md";
  className?: string;
  /** The value for the selected tab, if controlled */
  value?: string;
  /** The value of the tab to select by default, if uncontrolled */
  defaultValue?: string;
  /** The orientation the tabs are layed out. Mainly so arrow navigation is done accordingly (left & right vs. up & down) */
  orientation?: "horizontal" | "vertical";
  /** The direction of navigation between toolbar items. */
  dir?: "ltr" | "rtl";
  /** Whether a tab is activated automatically or manually. */
  activationMode?: "manual" | "automatic";
  style?: CSSProperties;
  id?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
}
```

## Examples

```jsx
// Tabs
export const Page: Story = {
  name: 'Tabs',
  render: () => (
    <ChangePage group="Tabs" title="Tabs">
      <ChangeCase
        after={
          <TabsDemo>
            <TabsContent className="flex flex-col gap-2" value="overview">
              <PanelBody label="Overview panel" />
            </TabsContent>
            <TabsContent className="flex flex-col gap-2" value="schema">
              <PanelBody label="Schema panel — the open one" />
            </TabsContent>
          </TabsDemo>
        }
        afterNote="the open panel starts right under the tabs"
        before={
          <TabsDemo>
            <TabsPrimitive.Content
              className={`${TABS_PANEL_CLASSES} flex flex-col gap-2`}
              value="overview"
            >
              <PanelBody label="Overview panel" />
            </TabsPrimitive.Content>
            <TabsPrimitive.Content
              className={`${TABS_PANEL_CLASSES} flex flex-col gap-2`}
              value="schema"
            >
              <PanelBody label="Schema panel — the open one" />
            </TabsPrimitive.Content>
          </TabsDemo>
        }
        beforeNote="16px of nothing above it — and below the whole block"
        beforeSource={
          <>
            the package's own Tabs with the panels swapped for raw{' '}
            <Code>@radix-ui/react-tabs</Code>, which is what{' '}
            <Code>TabsContent</Code> was before the pin. The second tab is open
            on purpose: the closed panel sits <em>above</em> it in the DOM, so
            its dead space is what pushes the open panel down. Measured, the
// …

// Default
export const Default: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="chats">Chats</TabsTrigger>
        <TabsTrigger value="members">Members</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      <TabsContent value="chats">
        <Typography>Chats panel content</Typography>
      </TabsContent>
      <TabsContent value="members">
        <Typography>Members panel content</Typography>
      </TabsContent>
      <TabsContent value="settings">
        <Typography>Settings panel content</Typography>
      </TabsContent>
    </Tabs>
  ),
};

// With Icons
export const WithIcons: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="chats">
          <MessageSquare className="size-4" />
          Chats
        </TabsTrigger>
        <TabsTrigger value="members">
          <Users className="size-4" />
          Members
        </TabsTrigger>
        <TabsTrigger value="settings">
          <Settings className="size-4" />
          Settings
        </TabsTrigger>
      </TabsList>
      <TabsContent value="chats">
        <Typography>Chats panel content</Typography>
      </TabsContent>
      <TabsContent value="members">
        <Typography>Members panel content</Typography>
      </TabsContent>
      <TabsContent value="settings">
        <Typography>Settings panel content</Typography>
      </TabsContent>
    </Tabs>
  ),
};
```

### Page

```jsx
/* Tabs */ compose(S, "Page")
```

### Default

```jsx
/* Default */ compose(S2, "Default")
```

### WithIcons

```jsx
/* With Icons */ compose(S2, "WithIcons")
```

### WithDisabledTab

```jsx
/* With Disabled Tab */ compose(S2, "WithDisabledTab")
```

### Small

```jsx
/* Small */ compose(S2, "Small")
```
