import * as React from 'react';
import { Autocomplete } from 'insightis-kit';

export function Default() {
  return <Autocomplete label="Data source" placeholder="Search connections" />;
}

export function OpenList() {
  return (
    <div style={{ minHeight: 240 }}>
      <Autocomplete
        label="Data source"
        placeholder="Search connections"
        defaultValue="S"
        open
        items={['Snowflake', 'Salesforce', 'SQL Server', 'Segment']}
        highlighted={0}
        onClear={() => {}}
      />
    </div>
  );
}

export function MultiSelect() {
  return (
    <div style={{ minHeight: 220 }}>
      <Autocomplete
        label="Metrics"
        placeholder="Add…"
        open
        values={['Revenue', 'Churn rate']}
        items={['Active users', 'Conversion rate', 'Net retention']}
        highlighted={1}
        onRemoveValue={() => {}}
        onClear={() => {}}
      />
    </div>
  );
}

export function NoResults() {
  return (
    <div style={{ minHeight: 160 }}>
      <Autocomplete
        label="Metrics"
        defaultValue="quarterly margin"
        open
        items={[]}
        emptyText="No matching metrics"
        onClear={() => {}}
      />
    </div>
  );
}
