import * as React from 'react';
import { Selector } from 'insightis-kit';

const CONNECTORS = ['All sources', 'Snowflake', 'Salesforce', 'BigQuery'];

export function Default() {
  return (
    <div style={{ width: 220 }}>
      <Selector label="Connector" options={CONNECTORS} value="Snowflake" />
    </div>
  );
}

export function Placeholder() {
  return (
    <div style={{ width: 220 }}>
      <Selector label="Time range" placeholder="Select a range" options={['Last 7 days', 'Last 30 days', 'Last quarter']} />
    </div>
  );
}

export function OpenState() {
  return (
    <div style={{ width: 220, minHeight: 240 }}>
      <Selector label="Connector" options={CONNECTORS} value="Snowflake" open />
    </div>
  );
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 220 }}>
      <Selector size="sm" options={['Small · 32px']} value="Small · 32px" />
      <Selector size="md" options={['Medium · 36px']} value="Medium · 36px" />
      <Selector size="lg" options={['Large · 40px']} value="Large · 40px" />
      <Selector size="xl" options={['Extra large · 44px']} value="Extra large · 44px" />
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ width: 220 }}>
      <Selector label="Connector" options={CONNECTORS} value="Snowflake" disabled />
    </div>
  );
}
