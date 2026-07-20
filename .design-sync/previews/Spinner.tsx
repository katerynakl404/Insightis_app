import * as React from 'react';
import { Spinner } from 'insightis-kit';

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 28, alignItems: 'flex-end' }}>
      {[16, 24, 32, 48].map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <Spinner size={s} />
          <span style={{ fontSize: 12, opacity: 0.7 }}>{s}px</span>
        </div>
      ))}
    </div>
  );
}

export function WithLabel() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <Spinner size={20} aria-label="Loading" />
      <span style={{ fontSize: 14 }}>Loading metrics…</span>
    </div>
  );
}
