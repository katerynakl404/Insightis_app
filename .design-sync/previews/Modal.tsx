import * as React from 'react';
import { Modal, Button, Input } from 'insightis-kit';

/* .dlg-overlay is position:fixed inset:0 — the transform on the wrapper creates a
   containing block so the overlay stays inside the preview cell (layout only). */
function Contain({ height, children }: { height: number; children: React.ReactNode }) {
  return (
    <div style={{ position: 'relative', width: '100%', minWidth: 480, height, overflow: 'hidden', transform: 'translateZ(0)' }}>
      {children}
    </div>
  );
}

export function Confirm() {
  return (
    <Contain height={240}>
      <Modal
        title="Delete Connection"
        onClose={() => {}}
        footer={
          <>
            <Button size="sm" variant="secondary">Cancel</Button>
            <Button size="sm" variant="destructive">Delete</Button>
          </>
        }
        style={{ width: 360, height: 200 }}
      >
        <div style={{ fontSize: '.875rem' }}>
          Production DB will be disconnected and its metrics will stop refreshing. This cannot be undone.
        </div>
      </Modal>
    </Contain>
  );
}

export function WithForm() {
  return (
    <Contain height={300}>
      <Modal
        title="Rename Chat"
        onClose={() => {}}
        footer={
          <>
            <Button size="sm" variant="secondary">Cancel</Button>
            <Button size="sm">Save Changes</Button>
          </>
        }
        style={{ width: 400, height: 190 }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <Input defaultValue="Q3 revenue by region" />
        </div>
      </Modal>
    </Contain>
  );
}
