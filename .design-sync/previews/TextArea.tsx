import * as React from 'react';
import { TextArea } from 'insightis-kit';

export function Default() {
  return (
    <div style={{ width: 320 }}>
      <TextArea rows={3} placeholder="Describe what this metric should measure…" />
    </div>
  );
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 320 }}>
      <TextArea size="xs" rows={2} placeholder="Extra small · 28px min" />
      <TextArea size="sm" rows={2} placeholder="Small · 32px min" />
      <TextArea size="md" rows={2} placeholder="Medium · 36px min" />
      <TextArea size="lg" rows={2} placeholder="Large · 40px min" />
      <TextArea size="xl" rows={2} placeholder="Extra large · 44px min" />
    </div>
  );
}

export function ErrorState() {
  return (
    <div style={{ width: 320 }}>
      <TextArea rows={3} defaultValue="SELECT revenue FROM" error="Query is incomplete — expected a table name" />
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ width: 320 }}>
      <TextArea rows={3} disabled defaultValue="Notes are locked while the metric is archived" />
    </div>
  );
}
