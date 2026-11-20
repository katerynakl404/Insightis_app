Avatar from @devart/ui-react. Use via `window.DevartUI.Avatar` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Avatar.html`): With Fallback, Sizes, Rounding.

## Props

```ts
interface AvatarProps {
  style?: CSSProperties;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  size?: "sm" | "md" | "lg" | "xl" | "xs" | "xxs";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "full";
}
```

## Examples

```jsx
// With Fallback
export const WithFallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <AvatarImage src="/broken-link.png" alt="Jane Doe" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  ),
};

// Sizes
export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      {(['xxs', 'xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Avatar {...args} key={size} size={size}>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};

// Rounding
export const Rounding: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      {(['none', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((rounded) => (
        <Avatar {...args} key={rounded} rounded={rounded}>
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
};
```

### WithFallback

```jsx
/* With Fallback */ compose(S, "WithFallback")
```

### Sizes

```jsx
/* Sizes */ compose(S, "Sizes")
```

### Rounding

```jsx
/* Rounding */ compose(S, "Rounding")
```
