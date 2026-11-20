StepProgress from @devart/ui-react. Use via `window.DevartUI.StepProgress` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `StepProgress.html`): StepProgress, Default, Progress, Interactive, Read Only, Small, Dark Theme.

## Props

```ts
interface StepProgressProps {
  steps: StepProgressStep[];
  current: number;
  label?: React.ReactNode;
  labelPosition?: "top" | "right" | "bottom" | "left";
  showStepTitle?: boolean;
  "aria-label": string;
  onStepSelect?: (index: number) => void;
  /** Extension of this package. */
  size?: "sm" | "md";
  style?: CSSProperties;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
}
```

## Examples

```jsx
// StepProgress
export const Page: Story = {
  name: 'StepProgress',
  render: () => (
    <ChangePage group="StepProgress" title="StepProgress">
      <ChangeCase
        after={<Readouts Component={StepProgress} size="sm" />}
        afterNote='size="sm" — label 12px, gaps 8 / 6 / 4 · no bubble without a title'
        before={<Readouts Component={UpstreamStepProgress} />}
        beforeNote="the one size — label 14px, gaps 12 / 8 / 6 · an empty bubble"
        beforeSource={
          <>
            the developers' own component, vendored unchanged from their 1.4.0
            into <Code>changes/upstream/StepProgress/</Code> — the StepProgress
            their storybook ships, not a replica of it.
          </>
        }
        files={[
          'src/components/StepProgress/StepProgress.tsx',
          'src/components/StepProgress/StepProgressHeader.tsx',
          'src/components/StepProgress/StepProgressBar.tsx',
        ]}
        footnote={
          <>
            <Code>sm</Code> is the read-out a tour card carries (§122): the
            label one type step down, the gap to the bars 12 → 8 beside them and
            8 → 6 above or below, stretched bars 4px apart instead of 6. The
            third point draws nothing: each bar now carries{' '}
            <Code>data-state</Code> — <Code>done</Code>, <Code>current</Code>,{' '}
            <Code>upcoming</Code> — for a consumer to style or test by.
          </>
        }
        n={117}
        state="draft"
        title="StepProgress — size, a state on each bar"
        why="The read-out had one size: in a tour card its 14px label stood level with the card's own body text. And a selectable step with no title opened a tooltip with nothing in it."
      />
    </ChangePage>
  ),
};

// Default
export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole('group', { name: 'Questions' })
    ).toBeInTheDocument();

    await expect(
      canvas.getByRole('button', { name: 'Time period, question 1 of 4' })
    ).toHaveAttribute('aria-current', 'step');
  },
};

/**
 * Two questions answered, the third on screen. Done and current bars share the
 * brand fill; `aria-current` and the "answered" name tell them apart.
 */

// Progress
export const Progress: Story = {
  args: { answeredCount: 2, current: 2 },
  play: async ({ canvas }) => {
    const buttons = canvas.getAllByRole('button');

    await expect(
      buttons.filter((button) => button.hasAttribute('aria-current'))
    ).toEqual([
      canvas.getByRole('button', { name: 'Sections, question 3 of 4' }),
    ]);
    await expect(
      canvas.getByRole('button', {
        name: 'Time period, question 1 of 4, answered',
      })
    ).not.toHaveAttribute('aria-current');
  },
};

/** Every bar moves to its question; the label follows. */
```

### Page

```jsx
/* StepProgress */ compose(S, "Page")
```

### Default

```jsx
/* Default */ compose(S2, "Default")
```

### Progress

```jsx
/* Progress */ compose(S2, "Progress")
```

### Interactive

```jsx
/* Interactive */ compose(S2, "Interactive")
```

### ReadOnly

```jsx
/* Read Only */ compose(S2, "ReadOnly")
```

### Small

```jsx
/* Small */ compose(S2, "Small")
```

### DarkTheme

```jsx
/* Dark Theme */ compose(S2, "DarkTheme")
```
