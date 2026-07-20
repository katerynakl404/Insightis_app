import * as React from 'react';
import { Tooltip, TooltipBubble, Button } from 'insightis-kit';

export function OpenBubble() {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <TooltipBubble>Copy to clipboard</TooltipBubble>
      <TooltipBubble>Refreshed 2 min ago</TooltipBubble>
    </div>
  );
}

export function TriggerAnchor() {
  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '32px 0 8px' }}>
      <Tooltip content="Download as CSV">
        <Button variant="outline" size="sm">
          Export Data
        </Button>
      </Tooltip>
      <Tooltip content="Opens in a new tab" side="right">
        <Button variant="tertiary" size="sm">
          View Source
        </Button>
      </Tooltip>
    </div>
  );
}
