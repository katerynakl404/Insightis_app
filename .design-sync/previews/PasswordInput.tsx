import * as React from 'react';
import { PasswordInput } from 'insightis-kit';

export function Default() {
  return (
    <div style={{ width: 280 }}>
      <PasswordInput label="Password" defaultValue="hunter2" />
    </div>
  );
}

export function Visible() {
  return (
    <div style={{ width: 280 }}>
      <PasswordInput label="New password" defaultValue="correct-horse-battery" defaultVisible />
    </div>
  );
}

export function ErrorState() {
  return (
    <div style={{ width: 280 }}>
      <PasswordInput label="Current password" defaultValue="wrong-pass" error />
    </div>
  );
}

export function Disabled() {
  return (
    <div style={{ width: 280 }}>
      <PasswordInput label="Password" placeholder="Managed by SSO" disabled />
    </div>
  );
}
