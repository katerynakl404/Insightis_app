import * as React from 'react';
import { Checkbox } from 'insightis-kit';

export function WithLabels() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Checkbox defaultChecked />
        <span>Include archived metrics</span>
      </label>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Checkbox />
        <span>Notify me when the sync finishes</span>
      </label>
    </div>
  );
}

export function States() {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Checkbox />
      <Checkbox checked />
      <Checkbox indeterminate />
    </div>
  );
}

export function ErrorState() {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Checkbox error />
      <Checkbox error checked />
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Checkbox disabled />
      <Checkbox disabled checked />
      <Checkbox disabled indeterminate />
    </div>
  );
}
