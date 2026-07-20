import * as React from 'react';
import { CircularProgress } from 'insightis-kit';

export function Values() {
  return (
    <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
      <CircularProgress value={25}>25%</CircularProgress>
      <CircularProgress value={65}>65%</CircularProgress>
      <CircularProgress value={100}>100%</CircularProgress>
    </div>
  );
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
      <CircularProgress value={65} size={40} strokeWidth={2.5}>
        65%
      </CircularProgress>
      <CircularProgress value={65} size={48} strokeWidth={3}>
        65%
      </CircularProgress>
      <CircularProgress value={65} size={56} strokeWidth={3}>
        65%
      </CircularProgress>
    </div>
  );
}

export function SecondaryVariant() {
  return (
    <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
      <CircularProgress value={40} variant="secondary">
        40%
      </CircularProgress>
      <CircularProgress value={80} variant="secondary" size={48} strokeWidth={3}>
        80%
      </CircularProgress>
    </div>
  );
}
