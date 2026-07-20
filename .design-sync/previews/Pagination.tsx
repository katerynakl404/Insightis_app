import * as React from 'react';
import { Pagination } from 'insightis-kit';

/* The nav wrapper carries no kit layout class — the parent supplies the gap. */
const row: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: 8 };

export function MidRange() {
  return <Pagination page={4} pageCount={7} style={row} />;
}

export function Edges() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
      <Pagination page={1} pageCount={5} style={row} />
      <Pagination page={5} pageCount={5} style={row} />
    </div>
  );
}
