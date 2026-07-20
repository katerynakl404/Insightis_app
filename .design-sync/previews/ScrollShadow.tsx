import * as React from 'react';
import { ScrollShadow } from 'insightis-kit';

export function Default() {
  const metrics = [
    'Monthly recurring revenue',
    'Weekly active users',
    'Churn rate',
    'Net revenue retention',
    'Customer acquisition cost',
    'Average deal size',
    'Trial-to-paid conversion',
    'Support tickets resolved',
    'Issues created',
    'Deploy frequency',
    'Lead response time',
    'Expansion revenue',
  ];
  return (
    <ScrollShadow>
      {metrics.map((m) => (
        <div key={m}>{m}</div>
      ))}
    </ScrollShadow>
  );
}

export function Prose() {
  return (
    <ScrollShadow>
      Insightis builds metrics on top of your live data. Connect a warehouse or upload files, then ask
      questions in plain language — every answer runs against the freshest sync. Definitions live in a
      shared library so the whole team reads the same numbers, and any chart in a chat answer can be
      pinned to a dashboard for daily tracking.
    </ScrollShadow>
  );
}
