import * as React from 'react';
import { Avatar } from 'insightis-kit';

export function Initials() {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <Avatar>KA</Avatar>
      <Avatar>LS</Avatar>
      <Avatar>MD</Avatar>
    </div>
  );
}

export function Counter() {
  return <Avatar count>+5</Avatar>;
}

export function TeamGroup() {
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
      <Avatar>KA</Avatar>
      <Avatar>RO</Avatar>
      <Avatar>JB</Avatar>
      <Avatar count>+12</Avatar>
    </div>
  );
}
