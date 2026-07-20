import * as React from 'react';
import { SegmentedControl } from 'insightis-kit';

const tableIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 5h18v14H3zM3 10h18M9 10v9" />
  </svg>
);

const chartIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 3v18h18M8 17V9M13 17V5M18 17v-7" />
  </svg>
);

const sunIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);

const moonIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

const monitorIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="4" width="20" height="13" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </svg>
);

export function Medium() {
  return (
    <div style={{ maxWidth: 360 }}>
      <SegmentedControl
        aria-label="Answer view"
        items={[
          { value: 'table', label: 'Table', icon: tableIcon },
          { value: 'chart', label: 'Chart', icon: chartIcon },
        ]}
        defaultValue="chart"
      />
    </div>
  );
}

export function SmallIconOnly() {
  return (
    <div style={{ maxWidth: 160 }}>
      <SegmentedControl
        size="sm"
        aria-label="Theme"
        items={[
          { value: 'light', label: 'Light', icon: sunIcon },
          { value: 'dark', label: 'Dark', icon: moonIcon },
          { value: 'system', label: 'System', icon: monitorIcon },
        ]}
        defaultValue="light"
      />
    </div>
  );
}

export function LabelsOnly() {
  return (
    <div style={{ maxWidth: 400 }}>
      <SegmentedControl
        aria-label="Metric scope"
        items={[
          { value: 'mine', label: 'My Metrics' },
          { value: 'team', label: 'Team' },
          { value: 'all', label: 'All' },
        ]}
        defaultValue="mine"
      />
    </div>
  );
}

export function DisabledItem() {
  return (
    <div style={{ maxWidth: 400 }}>
      <SegmentedControl
        aria-label="Export format"
        items={[
          { value: 'csv', label: 'CSV' },
          { value: 'xlsx', label: 'Excel' },
          { value: 'pdf', label: 'PDF', disabled: true },
        ]}
        defaultValue="csv"
      />
    </div>
  );
}
