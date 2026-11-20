ConfirmationDialog from @devart/ui-react. Use via `window.DevartUI.ConfirmationDialog` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `ConfirmationDialog.html`): ConfirmationDialog, Default, Destructive, With Icon, Loading.

## Props

```ts
interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  /** The question's one paragraph. Inline marks are fine — the name it is about in bold — since it renders inside a `<p>`; a  */
  description: React.ReactNode;
  confirmLabel: string;
  cancelLabel: string;
  icon?: React.ReactNode;
  bodySlot?: React.ReactNode;
  isLoading?: boolean;
  variant?: "primary" | "destructive";
  isCloseButtonVisible?: boolean;
  className?: string;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void> | void;
  onCancel?: () => void;
  onError?: (error: unknown) => void;
}
```

## Examples

```jsx
// ConfirmationDialog
export const Page: Story = {
  name: 'ConfirmationDialog',
  render: () => (
    <ChangePage group="ConfirmationDialog" title="ConfirmationDialog">
      <ChangeCase
        after={
          <TryIt action="Open it — the two names stand out of the question">
            <RemoveDialog
              description={
                <>
                  Remove <strong>Finance warehouse</strong> from{' '}
                  <strong>Data Analyze</strong>? Its members lose access to the
                  data at once.
                </>
              }
            />
          </TryIt>
        }
        afterNote="description: ReactNode — inline marks, one paragraph"
        before={
          <TryIt action="Open it — the names run on as plain text">
            <RemoveDialog description="Remove Finance warehouse from Data Analyze? Its members lose access to the data at once." />
          </TryIt>
        }
        beforeNote="description: string"
        beforeSource={
          <>
            the same dialog with its <Code>description</Code> a string — all the
            published type takes. The change is a type, so this is what the
            developers' component draws for any call it accepts; both halves are
            the live component.
          </>
        }
        files={['src/components/ConfirmationDialog/index.tsx']}
        footnote={
          <>
            It renders inside a <Code>&lt;p&gt;</Code> already, so the type
            allows inline content and no more; a second block still goes in{' '}
            <Code>bodySlot</Code>.
          </>
// …

// Default
export const Default: Story = {
  play: async (context) => {
    const { args, userEvent } = context;
    const dialog = await openDialog(context);
    await expect(dialog).toHaveAccessibleName('Switch to yearly billing?');
    await expect(dialog).toHaveAccessibleDescription(
      'You will be billed once a year from today. The new period starts immediately.'
    );
    await expect(
      within(dialog).getByRole('button', { name: 'Switch' })
    ).toHaveFocus();

    await userEvent.click(
      within(dialog).getByRole('button', { name: 'Cancel' })
    );
    await expect(args.onCancel).toHaveBeenCalledOnce();
    await expect(args.onOpenChange).toHaveBeenCalledWith(false);
    await waitForClose();

    const reopened = await openDialog(context);
    await userEvent.click(
      within(reopened).getByRole('button', { name: 'Switch' })
    );
    await expect(args.onConfirm).toHaveBeenCalledOnce();
    await waitForClose();
  },
};

const deleteError = new Error('The file could not be deleted.');

/** A rejected `onConfirm` reaches `onError`, and the dialog stays open. */

// Destructive
export const Destructive: Story = {
  args: {
    variant: 'destructive',
    title: 'Delete file?',
    description:
      "This action can't be undone. The file will be permanently removed.",
    confirmLabel: 'Delete',
    onConfirm: fn(() => Promise.reject(deleteError)),
  },
  play: async (context) => {
    const { args, userEvent } = context;
    const dialog = await openDialog(context);

    await userEvent.click(
      within(dialog).getByRole('button', { name: 'Delete' })
    );
    await expect(args.onConfirm).toHaveBeenCalledOnce();
    await waitFor(() => expect(args.onError).toHaveBeenCalledOnce());
    await expect(args.onError).toHaveBeenCalledWith(deleteError);
    await expect(args.onOpenChange).not.toHaveBeenCalled();
    await expect(dialog).toBeVisible();
  },
};

/** An icon leads the title, `bodySlot` follows the description, and the close button dismisses. */
```

### Page

```jsx
/* ConfirmationDialog */ compose(S, "Page")
```

### Default

```jsx
/* Default */ compose(S2, "Default")
```

### Destructive

```jsx
/* Destructive */ compose(S2, "Destructive")
```

### WithIcon

```jsx
/* With Icon */ compose(S2, "WithIcon")
```

### Loading

```jsx
/* Loading */ compose(S2, "Loading")
```
