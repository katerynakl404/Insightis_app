import * as React from 'react';
import { StatusView, Button } from 'insightis-kit';

const infoIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8h.01M11 12h1v4h1" />
  </svg>
);
const checkIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M20 6 9 17l-5-5" />
  </svg>
);
const alertIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v4M12 16h.01" />
  </svg>
);
const boxIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
  </svg>
);

export function Variants() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <StatusView variant="info" icon={infoIcon} title="No metrics yet" description="Create your first metric to see it here" />
      <StatusView variant="success" icon={checkIcon} title="Connection verified" description="Postgres warehouse is ready to query" />
      <StatusView variant="error" icon={alertIcon} title="Sync failed" description="We couldn't reach the warehouse — check the credentials" />
      <StatusView variant="neutral" icon={boxIcon} title="Nothing archived" description="Chats you archive will show up in this list" />
    </div>
  );
}

export function Sizes() {
  const sm = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
  const lg = (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <StatusView size="sm" variant="info" icon={sm} title="Small" description="Compact padding" />
      <StatusView variant="info" icon={infoIcon} title="Medium" description="Default density" />
      <StatusView size="lg" variant="info" icon={lg} title="Large" description="Hero empty state" />
    </div>
  );
}

export function WithAction() {
  return (
    <div style={{ width: 340 }}>
      <StatusView
        variant="info"
        icon={infoIcon}
        title="No data sources connected"
        description="Link a warehouse to start asking questions about your data"
        action={<Button size="sm">Add Connection</Button>}
      />
    </div>
  );
}
