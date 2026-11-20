import * as React from 'react';

/**
 * PinToggle — from @devart/ui-react@1.0.0 (./src/components/PinToggle/PinToggle.stories.tsx).
 */
export interface PinToggleProps {
  /** Controlled state. Leave it out to let the toggle keep its own. */
  pressed?: boolean;
  defaultPressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  /** The accessible name, and the tooltip while unpinned. It stays the same in both states — `aria-pressed` says which one it */
  pinLabel?: string;
  /** The tooltip while pinned: what a click will do now. */
  unpinLabel?: string;
  style?: CSSProperties;
  ref?: React.Ref;
  className?: string;
  id?: string;
  /** Shown on hover and focus; `true` shows the `aria-label`. A disabled button with a tooltip is rendered `aria-disabled`, s */
  tooltip?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "xs" | "3xs" | "2xs";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "rounded" | "full";
  tooltipSide?: "top" | "right" | "bottom" | "left";
}

export declare const PinToggle: React.ComponentType<PinToggleProps>;
