import * as React from 'react';

/**
 * IconHint — from @devart/ui-react@1.0.0 (./src/components/IconHint/IconHint.stories.tsx).
 */
export interface IconHintProps {
  /** The words it exists to show — on hover, on keyboard focus, and on a long press. Required: a mark with nothing to say is  */
  tooltip: React.ReactNode;
  /** The hint's accessible name — "About Finance warehouse". Required. */
  label: string;
  tooltipSide?: "top" | "right" | "bottom" | "left";
  ref?: React.Ref;
  style?: CSSProperties;
  className?: string;
  id?: string;
  variant?: "error" | "warning" | "neutral";
  size?: "sm" | "md";
}

export declare const IconHint: React.ComponentType<IconHintProps>;
