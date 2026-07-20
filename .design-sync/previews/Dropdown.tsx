import * as React from 'react';
import { Dropdown, MenuItem, MenuSeparator } from 'insightis-kit';

export function Default() {
  return (
    <Dropdown>
      <MenuItem>Edit</MenuItem>
      <MenuItem>Duplicate</MenuItem>
      <MenuItem disabled>Move to Folder</MenuItem>
      <MenuSeparator />
      <MenuItem danger>Delete</MenuItem>
    </Dropdown>
  );
}

export function WithIcons() {
  const help = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  );
  const feedback = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      <path d="M13 8H7" />
      <path d="M17 12H7" />
    </svg>
  );
  const guide = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 7v14" />
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z" />
    </svg>
  );
  return (
    <Dropdown>
      <MenuItem icon={help}>Help Center</MenuItem>
      <MenuItem icon={feedback}>Send Feedback</MenuItem>
      <MenuItem icon={guide}>User Guide</MenuItem>
    </Dropdown>
  );
}

export function Sizes() {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <Dropdown size="sm">
        <MenuItem>Rename Chat</MenuItem>
        <MenuItem>Pin Chat</MenuItem>
        <MenuItem danger>Delete Chat</MenuItem>
      </Dropdown>
      <Dropdown size="md">
        <MenuItem>Rename Chat</MenuItem>
        <MenuItem>Pin Chat</MenuItem>
        <MenuItem danger>Delete Chat</MenuItem>
      </Dropdown>
      <Dropdown size="lg">
        <MenuItem>Rename Chat</MenuItem>
        <MenuItem>Pin Chat</MenuItem>
        <MenuItem danger>Delete Chat</MenuItem>
      </Dropdown>
    </div>
  );
}
