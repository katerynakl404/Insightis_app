import * as React from 'react';
import { ProgressBar } from 'insightis-kit';

function LabeledBar({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
        <span>{label}</span>
        <span style={{ opacity: 0.7 }}>{value}%</span>
      </div>
      <ProgressBar value={value} style={{ width: '100%' }} />
    </div>
  );
}

export function Values() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      <LabeledBar label="Syncing Postgres warehouse" value={24} />
      <LabeledBar label="Importing metrics catalog" value={64} />
      <LabeledBar label="Indexing chat history" value={92} />
    </div>
  );
}

export function Range() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
      <LabeledBar label="Queued" value={0} />
      <LabeledBar label="Halfway" value={50} />
      <LabeledBar label="Complete" value={100} />
    </div>
  );
}
