import * as React from 'react';
import { Separator } from 'insightis-kit';

export function Variants() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, width: 160 }}>
      <Separator />
      <Separator variant="primary" />
      <Separator variant="secondary" />
    </div>
  );
}

export function Vertical() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
      <span>Overview</span>
      <Separator orientation="vertical" />
      <span>Metrics</span>
      <Separator orientation="vertical" variant="primary" />
      <span>Sources</span>
    </div>
  );
}

export function Semantic() {
  return (
    <div style={{ width: 220 }}>
      <div style={{ fontSize: 14, paddingBottom: 10 }}>Connected sources</div>
      <Separator decorative={false} />
      <div style={{ fontSize: 14, paddingTop: 10 }}>Available integrations</div>
    </div>
  );
}
