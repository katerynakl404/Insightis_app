import * as React from 'react';
import { Button } from 'insightis-kit';

export function Variants() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button>Save Changes</Button>
      <Button variant="secondary">Cancel</Button>
      <Button variant="outline">Export Data</Button>
      <Button variant="tertiary">View All</Button>
      <Button variant="tertiary" brand>
        Show More
      </Button>
      <Button variant="destructive">Delete Metric</Button>
      <Button variant="outline-destructive">Remove Access</Button>
    </div>
  );
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button size="xs">Add New</Button>
      <Button size="sm">Add New</Button>
      <Button size="md">Add New</Button>
      <Button size="lg">Add New</Button>
      <Button size="xl">Add New</Button>
    </div>
  );
}

export function States() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button disabled>Disabled</Button>
      <Button loading>Creating Metric</Button>
      <Button variant="secondary" disabled>
        Disabled
      </Button>
      <Button variant="outline" loading>
        Loading
      </Button>
    </div>
  );
}

export function WithIcon() {
  const plus = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Button icon={plus}>New Connection</Button>
      <Button variant="secondary" icon={plus}>
        Add Filter
      </Button>
    </div>
  );
}
