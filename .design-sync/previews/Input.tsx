import * as React from 'react';
import { Input } from 'insightis-kit';

export function Default() {
  return (
    <div style={{ width: 260 }}>
      <Input placeholder="name@devart.com" />
    </div>
  );
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 260 }}>
      <Input size="xs" placeholder="Extra small · 28px" />
      <Input size="sm" placeholder="Small · 32px" />
      <Input size="md" placeholder="Medium · 36px" />
      <Input size="lg" placeholder="Large · 40px" />
      <Input size="xl" placeholder="Extra large · 44px" />
    </div>
  );
}

export function WithIcon() {
  const search = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
  return (
    <div style={{ width: 260 }}>
      <Input icon={search} placeholder="Search metrics" />
    </div>
  );
}

export function ErrorState() {
  return (
    <div style={{ width: 260 }}>
      <Input defaultValue="not-an-email" error="Enter a valid email address" />
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ width: 260 }}>
      <Input disabled placeholder="Connection name" />
    </div>
  );
}
