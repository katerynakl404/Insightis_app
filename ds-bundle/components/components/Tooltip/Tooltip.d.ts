import * as React from 'react';

/**
 * Tooltip — from @devart/ui-react@1.0.0 (./changes/components/Tooltip.stories.tsx).
 */
export interface TooltipProps {
  /** What touch does. `auto` opens the tooltip on a LONG PRESS, leaving the tap to whatever the trigger is for; `off` leaves  */
  touchGestures?: "off" | "auto";
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  /** The duration from when the pointer enters the trigger until the tooltip gets opened. This will override the prop with th */
  delayDuration?: number;
  /** When `true`, trying to hover the content will result in the tooltip closing as the pointer leaves the trigger. */
  disableHoverableContent?: boolean;
}

export declare const Tooltip: React.ComponentType<TooltipProps>;
