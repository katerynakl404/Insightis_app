import * as React from 'react';
import { IconButton } from 'insightis-kit';

const plus = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
);

const more = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
);

const refresh = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M3 12a9 9 0 0 1 9-9 9.7 9.7 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
  </svg>
);

const close = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

const trash = (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

export function Variants() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <IconButton aria-label="Add connection">{plus}</IconButton>
      <IconButton variant="secondary" aria-label="More actions">
        {more}
      </IconButton>
      <IconButton variant="outline" aria-label="Refresh data">
        {refresh}
      </IconButton>
      <IconButton variant="tertiary" aria-label="Close">
        {close}
      </IconButton>
      <IconButton variant="outline-destructive" aria-label="Delete metric">
        {trash}
      </IconButton>
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <IconButton disabled aria-label="Add connection">
        {plus}
      </IconButton>
      <IconButton variant="secondary" disabled aria-label="More actions">
        {more}
      </IconButton>
      <IconButton variant="outline" disabled aria-label="Refresh data">
        {refresh}
      </IconButton>
    </div>
  );
}

export function Loading() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <IconButton loading aria-label="Adding connection" />
      <IconButton variant="secondary" loading aria-label="Loading actions" />
      <IconButton variant="outline" loading aria-label="Refreshing data" />
    </div>
  );
}
