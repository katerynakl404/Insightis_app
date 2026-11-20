ResizablePanelGroup from @devart/ui-react. Use via `window.DevartUI.ResizablePanelGroup` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `ResizablePanelGroup.html`): Horizontal, Vertical, Three Panels.

## Props

```ts
interface ResizablePanelGroupProps {
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  /** Default layout for the Group. ℹ️ This value allows layouts to be remembered between page reloads. ⚠️ Slight layout shift */
  defaultLayout?: Layout;
  /** This library sets custom mouse cursor styles to indicate drag state. Use this prop to disable that behavior for Panels a */
  disableCursor?: boolean;
  /** Disable resize functionality. */
  disabled?: boolean;
  /** Ref attached to the root `HTMLDivElement`. */
  elementRef?: React.Ref;
  /** Exposes the following imperative API: - `getLayout(): Layout` - `setLayout(layout: Layout): void` ℹ️ The `useGroupRef` a */
  groupRef?: React.Ref;
  /** Minimum size of the resizable hit target area (either `Separator` or `Panel` edge) This threshold ensures are large enou */
  resizeTargetMinimumSize?: { coarse: number; fine: number; };
  /** Specifies the resizable orientation ("horizontal" or "vertical"); defaults to "horizontal" */
  orientation?: "horizontal" | "vertical";
}
```

## Examples

```jsx
// Horizontal
export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
  render: (args) => (
    <ResizablePanelGroup {...args} orientation="horizontal">
      <ResizablePanel defaultSize={40} minSize={20}>
        <PanelBody label="Left" />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={60} minSize={20}>
        <PanelBody label="Right" />
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

// Vertical
export const Vertical: Story = {
  args: { orientation: 'vertical' },
  render: (args) => (
    <ResizablePanelGroup {...args} orientation="vertical">
      <ResizablePanel defaultSize={50} minSize={15}>
        <PanelBody label="Top" />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50} minSize={15}>
        <PanelBody label="Bottom" />
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};

// Three Panels
export const ThreePanels: Story = {
  render: (args) => (
    <ResizablePanelGroup {...args} orientation="horizontal">
      <ResizablePanel defaultSize={25} minSize={15}>
        <PanelBody label="Sidebar" />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50} minSize={20}>
        <PanelBody label="Editor" />
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={25} minSize={15}>
        <PanelBody label="Preview" />
      </ResizablePanel>
    </ResizablePanelGroup>
  ),
};
```

### Horizontal

```jsx
/* Horizontal */ compose(S, "Horizontal")
```

### Vertical

```jsx
/* Vertical */ compose(S, "Vertical")
```

### ThreePanels

```jsx
/* Three Panels */ compose(S, "ThreePanels")
```
