import * as React from 'react';
import { Sheet } from 'insightis-kit';

export function Default() {
  return (
    <Sheet
      title="Filter Metrics"
      description="Narrow the library by source, owner or refresh status"
      onClose={() => {}}
    />
  );
}

export function Sides() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'flex-start' }}>
      <Sheet side="top" title="Top" onClose={() => {}} />
      <Sheet side="bottom" title="Bottom" onClose={() => {}} />
      <Sheet side="left" title="Left" onClose={() => {}} />
      <Sheet side="right" title="Right" onClose={() => {}} />
    </div>
  );
}
