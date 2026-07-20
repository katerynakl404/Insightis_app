import * as React from 'react';
import { Collapsible } from 'insightis-kit';

export function Open() {
  return (
    <div style={{ width: 320 }}>
      <Collapsible trigger="Connection details" defaultOpen>
        Host db.insightis.internal, port 5432, schema analytics. Read-only role; queries run
        against the replica so production load is unaffected.
      </Collapsible>
    </div>
  );
}

export function Closed() {
  return (
    <div style={{ width: 320 }}>
      <Collapsible trigger="Advanced options">
        SSL mode, connection pooling and sync-window settings live here.
      </Collapsible>
    </div>
  );
}
