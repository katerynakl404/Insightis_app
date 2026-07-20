import * as React from 'react';
import { Tabs } from 'insightis-kit';

export function Default() {
  return (
    <Tabs
      items={[
        { value: 'overview', label: 'Overview' },
        { value: 'activity', label: 'Activity' },
        { value: 'settings', label: 'Settings' },
      ]}
    />
  );
}

export function ActiveMiddle() {
  return (
    <Tabs
      items={[
        { value: 'connections', label: 'Connections' },
        { value: 'files', label: 'Files' },
        { value: 'metrics', label: 'Metrics' },
      ]}
      defaultValue="files"
    />
  );
}

export function WithDisabled() {
  return (
    <Tabs
      items={[
        { value: 'metrics', label: 'My metrics' },
        { value: 'browse', label: 'Browse catalog' },
        { value: 'archived', label: 'Archived', disabled: true },
      ]}
    />
  );
}
