import * as React from 'react';
import { Switch } from 'insightis-kit';

export function WithLabel() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Switch defaultChecked aria-label="Auto-refresh metrics" />
        <span>Auto-refresh metrics</span>
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <Switch aria-label="Email digest" />
        <span>Email digest</span>
      </label>
    </div>
  );
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
      <Switch checked aria-label="Default on" />
      <Switch aria-label="Default off" />
      <Switch size="sm" checked aria-label="Small on" />
      <Switch size="sm" aria-label="Small off" />
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
      <Switch disabled aria-label="Disabled off" />
      <Switch disabled checked aria-label="Disabled on" />
    </div>
  );
}
