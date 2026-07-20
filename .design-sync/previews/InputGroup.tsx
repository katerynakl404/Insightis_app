import * as React from 'react';
import { InputGroup } from 'insightis-kit';

const searchIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const penIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

export function Default() {
  return (
    <div style={{ width: 280 }}>
      <InputGroup prefix={searchIcon} placeholder="Search metrics" />
    </div>
  );
}

export function WithLabelAndKbd() {
  return (
    <div style={{ width: 280 }}>
      <InputGroup label="Search" prefix={searchIcon} kbd="⌘K" placeholder="Find a connection…" />
    </div>
  );
}

export function Clearable() {
  return (
    <div style={{ width: 280 }}>
      <InputGroup prefix={searchIcon} clearable placeholder="Search chats" defaultValue="Q3 revenue" />
    </div>
  );
}

export function Outline() {
  return (
    <div style={{ width: 280 }}>
      <InputGroup variant="outline" prefix={penIcon} kbd="⌘K" placeholder="Compose…" />
    </div>
  );
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 280 }}>
      <InputGroup size="xs" prefix={searchIcon} placeholder="Extra small · 28px" />
      <InputGroup size="sm" prefix={searchIcon} placeholder="Small · 32px" />
      <InputGroup size="md" prefix={searchIcon} placeholder="Medium · 36px" />
      <InputGroup size="lg" prefix={searchIcon} placeholder="Large · 40px" />
      <InputGroup size="xl" prefix={searchIcon} placeholder="Extra large · 44px" />
    </div>
  );
}

export function ErrorAndDisabled() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 280 }}>
      <InputGroup prefix={<span>@</span>} error defaultValue="bad@" aria-label="Email" />
      <InputGroup prefix={searchIcon} disabled placeholder="Search is unavailable" />
    </div>
  );
}
