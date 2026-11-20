Modal from @devart/ui-react. Use via `window.DevartUI.Modal` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Modal.html`): Modal, Default, Destructive, Initially Open, With Description, Sizes.

## Props

```ts
interface ModalProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
}
```

## Examples

```jsx
// Modal
export const Page: Story = {
  name: 'Modal',
  render: () => (
    <ChangePage group="Modal" title="Modal">
      <ChangeCase
        after={
          <TryIt action="Open it at each size">
            <div className="flex flex-wrap gap-2">
              <ScopeDialog label="sm · 22.5rem" size="sm" />
              <ScopeDialog label="md · 30rem" size="md" />
              <ScopeDialog label="lg · 36rem" size="lg" />
              <ScopeDialog label="xl · 56rem" size="xl" />
            </div>
          </TryIt>
        }
        afterNote="a size per content · capped at 80dvh, the body scrolls"
        before={
          <TryIt action="Open the dialog">
            <ScopeDialog label="The one width · 32rem" style={ONE_WIDTH} />
          </TryIt>
        }
        beforeNote="max-w-lg for every dialog · max-h-[90dvh]"
        beforeSource={
          <>
            today's <Code>ModalContent</Code> with the two old values
            re-declared on it — <Code>--modal-w-md: 32rem</Code>, which is{' '}
            <Code>max-w-lg</Code>, and <Code>--modal-max-h: 90dvh</Code>. Exact
            for both; the rest of the dialog is today's on both sides.
          </>
        }
        files={['src/components/Modal/ModalContent.tsx', 'globals.css']}
        footnote={
          <>
            <Code>xl</Code> is the draft step: 56rem, the 30 → 36 ratio once
            more, for a dialog that holds a tree or a table — a last resort, as
            a surface that wide usually belongs on a screen of its own. The cap
            is 720px on a 900px window. In the design bundle, which compiles
            only enumerated classes, <Code>max-h-[90dvh]</Code> produced nothing
            and there was no cap at all; Storybook compiles it, so the Before
            shows the cap the class meant.
// …

// Default
export const Default: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="secondary">Open modal</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Rename chat</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Typography textColor="body">
            Give this chat a short, descriptive name so it is easier to find
            later.
          </Typography>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="secondary">Cancel</Button>
          </ModalClose>
          <Button>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};

// Destructive
export const Destructive: Story = {
  render: () => (
    <Modal>
      <ModalTrigger asChild>
        <Button variant="destructiveOutline">Delete chat</Button>
      </ModalTrigger>
      <ModalContent>
        <ModalHeader>
          <ModalTitle>Delete chat?</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Typography textColor="body">
            This action cannot be undone. The chat and all its messages will be
            permanently removed.
          </Typography>
        </ModalBody>
        <ModalFooter>
          <ModalClose asChild>
            <Button variant="secondary">Cancel</Button>
          </ModalClose>
          <Button variant="destructive">Delete</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  ),
};
```

### Page

```jsx
/* Modal */ compose(S, "Page")
```

### Default

```jsx
/* Default */ compose(S2, "Default")
```

### Destructive

```jsx
/* Destructive */ compose(S2, "Destructive")
```

### InitiallyOpen

```jsx
/* Initially Open */ compose(S2, "InitiallyOpen")
```

### WithDescription

```jsx
/* With Description */ compose(S2, "WithDescription")
```

### Sizes

```jsx
/* Sizes */ compose(S2, "Sizes")
```
