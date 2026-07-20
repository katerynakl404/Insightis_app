import * as React from 'react';
import { Overlay, Popover } from 'insightis-kit';

/* .ov is position:fixed inset:0 — the transform on the wrapper creates a containing
   block so the backdrop fills the demo box instead of the viewport (layout only). */
function Stage({ children }: { children?: React.ReactNode }) {
  return (
    <div style={{ position: 'relative', width: 280, height: 160, overflow: 'hidden', transform: 'translateZ(0)' }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.75rem' }}>
        Page content
      </div>
      {children}
    </div>
  );
}

export function Backdrop() {
  return (
    <Stage>
      <Overlay open />
    </Stage>
  );
}

export function WithPanel() {
  return (
    <Stage>
      <Overlay open>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Popover title="Session Expired">Sign in again to keep exploring your metrics</Popover>
        </div>
      </Overlay>
    </Stage>
  );
}
