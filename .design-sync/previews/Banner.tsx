import * as React from 'react';
import { Banner, Button } from 'insightis-kit';

const sparkIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
  </svg>
);

export function Default() {
  return (
    <Banner
      icon={sparkIcon}
      title="Connect your first data source"
      description={
        <>
          Link a warehouse or upload files — Insightis builds metrics on top of <b>your live data</b>
        </>
      }
      action={<Button size="sm">Add Connection</Button>}
    />
  );
}

export function Gradient() {
  return (
    <Banner
      variant="gradient"
      icon={sparkIcon}
      title="Unlock team workspaces"
      description="Upgrade to Pro for unlimited users and shared metric libraries"
      action={
        <Button size="sm" variant="secondary">
          View Plans
        </Button>
      }
    />
  );
}

export function Small() {
  return (
    <Banner
      size="sm"
      icon={sparkIcon}
      title="New chart types available"
      description="Area and scatter charts just landed in chat answers"
    />
  );
}

export function Dismissible() {
  return (
    <Banner
      dismissible
      icon={sparkIcon}
      title="Scheduled maintenance on Sunday"
      description="Insightis will be read-only from 02:00 to 04:00 UTC"
    />
  );
}
