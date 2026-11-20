Stepper from @devart/ui-react. Use via `window.DevartUI.Stepper` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Stepper.html`): Horizontal, Vertical, Start On Last Step.

## Props

```ts
interface StepperProps {
  steps: StepRenderer<TData>[];
  initialStep?: number;
  /** Initial shared data available to all steps via `api.data`. */
  initialData?: TData;
  /** Called after the active step changes (not on mount). */
  onStepChange?: (index: number) => void;
  /** Ref to access the stepper API imperatively. */
  ref?: React.Ref;
}
```

## Examples

```jsx
// Horizontal
export const Horizontal: Story = {
  args: { steps: makeSteps('horizontal') },
};

// Vertical
export const Vertical: Story = {
  args: { steps: makeSteps('vertical') },
};

// Start On Last Step
export const StartOnLastStep: Story = {
  args: { steps: makeSteps('horizontal'), initialStep: 2 },
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

### StartOnLastStep

```jsx
/* Start On Last Step */ compose(S, "StartOnLastStep")
```
