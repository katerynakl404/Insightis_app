import * as React from 'react';
import { ProviderCard, ProviderBrowseCard, ChipMeta, Button } from 'insightis-kit';

const dbLogo = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
    <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
  </svg>
);

const boardLogo = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 9h6M9 12h6M9 15h4" />
  </svg>
);

const globeIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    <path d="M2 12h20" />
  </svg>
);

export function Connected() {
  return (
    <div style={{ width: 290 }}>
      <ProviderCard
        logo={dbLogo}
        name="Snowflake Production"
        connected
        metrics={
          <>
            <ChipMeta arrow>Monthly revenue</ChipMeta>
            <ChipMeta arrow>Active users</ChipMeta>
            <ChipMeta arrow>Churn rate</ChipMeta>
          </>
        }
        action={
          <Button size="sm" variant="outline">
            Manage
          </Button>
        }
      />
    </div>
  );
}

export function NotConnected() {
  return (
    <div style={{ width: 290 }}>
      <ProviderCard
        logo={boardLogo}
        name="Jira Software"
        metrics={
          <>
            <ChipMeta arrow>Issues created</ChipMeta>
            <ChipMeta arrow>Issues resolved</ChipMeta>
            <ChipMeta arrow>Bug count</ChipMeta>
          </>
        }
        action={<Button size="sm">Connect</Button>}
      />
    </div>
  );
}

export function GridWithBrowse() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '290px 290px', gap: 14, alignItems: 'stretch' }}>
      <ProviderCard
        logo={dbLogo}
        name="BigQuery Analytics"
        connected
        metrics={
          <>
            <ChipMeta arrow>Sessions</ChipMeta>
            <ChipMeta arrow>Conversion rate</ChipMeta>
          </>
        }
        action={
          <Button size="sm" variant="outline">
            Manage
          </Button>
        }
      />
      <ProviderBrowseCard
        icon={globeIcon}
        label="Explore more providers"
        sub="200+ integrations available to connect"
      />
    </div>
  );
}
