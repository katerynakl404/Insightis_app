ResizableMainSideLayout from @devart/ui-react. Use via `window.DevartUI.ResizableMainSideLayout` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `ResizableMainSideLayout.html`): Open, Collapsed, Custom Sizes, Interactive.

## Props

```ts
interface ResizableMainSideLayoutProps {
  /** Expands or collapses the side panel. The open state itself is the caller's. */
  sideOpen: boolean;
  mainContent: React.ReactNode;
  sidePanelContent: React.ReactNode;
  groupId?: string;
  mainPanelId?: string;
  sidePanelId?: string;
  mainDefaultSize?: string;
  mainMinSize?: string;
  sideDefaultSize?: string;
  sideMinSize?: string;
  sideMaxSize?: string;
  sideCollapsedSize?: string;
  className?: string;
}
```

## Examples

```jsx
// Open
export const Open: Story = {
  play: async ({ canvasElement }) => {
    const panel = canvasElement.querySelector('#resizable-side') as HTMLElement;
    await expect(panel).not.toHaveAttribute('inert');
    await expect(panel).not.toHaveAttribute('aria-hidden');
    await expect(
      canvasElement.querySelector('[role="separator"]') as HTMLElement
    ).toBeVisible();

    await waitFor(() => expect(publishedSideWidth()).toMatch(POSITIVE_PX));
  },
};

/** Collapsed: the handle is hidden and the main pane takes the full width. */

// Collapsed
export const Collapsed: Story = {
  args: { sideOpen: false },
  /**
   * Collapsed to 0% the pane still holds its content; `inert` and
   * `aria-hidden` keep it out of the tab order and the accessibility tree.
   */
  play: async ({ canvasElement }) => {
    const panel = canvasElement.querySelector('#resizable-side') as HTMLElement;
    await expect(panel).toHaveAttribute('inert');
    await expect(panel).toHaveAttribute('aria-hidden', 'true');
    await expect(
      canvasElement.querySelector('[role="separator"]') as HTMLElement
    ).not.toBeVisible();

    await waitFor(() => expect(publishedSideWidth()).toBe('0px'));
  },
};

// Custom Sizes
export const CustomSizes: Story = {
  args: {
    mainDefaultSize: '50%',
    sideDefaultSize: '50%',
    sideMinSize: '30%',
    sideMaxSize: '70%',
  },
};

/** The open state lives outside, which is what makes the panel controllable. */
```

### Open

```jsx
/* Open */ compose(S, "Open")
```

### Collapsed

```jsx
/* Collapsed */ compose(S, "Collapsed")
```

### CustomSizes

```jsx
/* Custom Sizes */ compose(S, "CustomSizes")
```

### Interactive

```jsx
/* Interactive */ compose(S, "Interactive")
```
