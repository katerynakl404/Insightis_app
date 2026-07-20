import * as React from 'react';
import { Toast, Button } from 'insightis-kit';

export function Variants() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 360 }}>
      <Toast variant="success">Profile saved.</Toast>
      <Toast variant="info">3 new updates available.</Toast>
      <Toast variant="warning">Unsaved changes will be lost.</Toast>
      <Toast variant="error">Failed to upload — try again.</Toast>
    </div>
  );
}

export function WithDescription() {
  return (
    <div style={{ width: 360 }}>
      <Toast variant="info" description="Dashboard data refreshed automatically.">
        3 new updates available.
      </Toast>
    </div>
  );
}

export function WithAction() {
  return (
    <div style={{ width: 360 }}>
      <Toast
        variant="success"
        description="12,480 rows imported from Postgres."
        action={
          <Button size="xs" variant="outline">
            View Metrics
          </Button>
        }
      >
        Sync complete.
      </Toast>
    </div>
  );
}
