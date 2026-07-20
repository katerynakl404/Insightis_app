import * as React from 'react';
import { Badge } from 'insightis-kit';

export function Variants() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge>In progress</Badge>
      <Badge variant="secondary">Paused</Badge>
      <Badge variant="body">Draft</Badge>
      <Badge variant="green" pill>
        Active
      </Badge>
      <Badge variant="attention" pill>
        Pending
      </Badge>
      <Badge variant="red" pill>
        Blocked
      </Badge>
    </div>
  );
}

export function StatusDot() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="green" pill dot>
        Online
      </Badge>
      <Badge variant="attention" pill dot>
        Idle
      </Badge>
      <Badge variant="red" pill dot>
        Offline
      </Badge>
    </div>
  );
}

export function WithIcon() {
  const star = (
    <svg className="b-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
      <path d="M12 2 15 8.5 22 9.5l-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
    </svg>
  );
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge icon={star}>Starred</Badge>
      <Badge variant="secondary" icon={star}>
        Favorite
      </Badge>
    </div>
  );
}

export function Removable() {
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge variant="secondary" onRemove={() => {}} removeLabel="Remove Jira filter">
        Jira
      </Badge>
      <Badge variant="secondary" onRemove={() => {}} removeLabel="Remove GitHub filter">
        GitHub
      </Badge>
      <Badge variant="secondary" onRemove={() => {}} removeLabel="Remove HubSpot filter">
        HubSpot
      </Badge>
    </div>
  );
}

export function Small() {
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
      <Badge size="sm">Custom</Badge>
      <Badge size="sm" variant="secondary">
        Built-in
      </Badge>
      <Badge size="sm" variant="green" pill dot>
        Active
      </Badge>
    </div>
  );
}
