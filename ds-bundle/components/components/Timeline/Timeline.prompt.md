Timeline from @devart/ui-react. Use via `window.DevartUI.Timeline` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

Variants (see `Timeline.html`): Default, Step Statuses, Controlled, With Step Icons, Standalone Step.

## Props

```ts
interface TimelineProps {
  defaultOpen?: boolean;
  open?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
}
```

## Examples

```jsx
// Default
export const Default: Story = {
  render: (args) => (
    <Timeline {...args} className="w-96">
      <TimelineHeader icon={<Wrench />}>Tool calls</TimelineHeader>
      <TimelineContent>
        <TimelineStep status="success" title="postgres-mcp · list_tables">
          Found 12 tables in schema public.
        </TimelineStep>
        <TimelineStep status="success" title="postgres-mcp · run_query">
          Returned 248 rows in 312ms.
        </TimelineStep>
        <TimelineStep status="error" title="files-mcp · read_file">
          File not found: q3-report.xlsx.
        </TimelineStep>
        <TimelineStep status="pending" title="semantics-mcp · define_metric" />
      </TimelineContent>
    </Timeline>
  ),
};

// Step Statuses
export const StepStatuses: Story = {
  render: (args) => (
    <Timeline {...args} className="w-96">
      <TimelineHeader icon={<Wrench />}>Step statuses</TimelineHeader>
      <TimelineContent>
        <TimelineStep status="pending" title="Waiting for connection" />
        <TimelineStep status="active" title="Fetching metric definitions" />
        <TimelineStep status="success" title="Validated 34 metrics" defaultOpen>
          All metrics passed schema validation.
        </TimelineStep>
        <TimelineStep status="error" title="Failed to publish catalog">
          Connection to the semantics service timed out.
        </TimelineStep>
      </TimelineContent>
    </Timeline>
  ),
};

// Controlled
export const Controlled: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <Timeline {...args} open={open} onOpenChange={setOpen} className="w-96">
        <TimelineHeader icon={<Wrench />}>
          {open ? 'Hide tool calls' : 'Show tool calls'}
        </TimelineHeader>
        <TimelineContent>
          <TimelineStep status="success" title="chat-mcp · search_docs">
            Matched 6 relevant documents.
          </TimelineStep>
          <TimelineStep status="success" title="chat-mcp · summarize">
            Summary generated from 6 documents.
          </TimelineStep>
        </TimelineContent>
      </Timeline>
    );
  },
};
```

### Default

```jsx
/* Default */ compose(S, "Default")
```

### StepStatuses

```jsx
/* Step Statuses */ compose(S, "StepStatuses")
```

### Controlled

```jsx
/* Controlled */ compose(S, "Controlled")
```

### WithStepIcons

```jsx
/* With Step Icons */ compose(S, "WithStepIcons")
```

### StandaloneStep

```jsx
/* Standalone Step */ compose(S, "StandaloneStep")
```
