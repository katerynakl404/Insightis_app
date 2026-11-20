import * as React from 'react';

/**
 * Toggle — from @devart/ui-react@1.0.0 (./src/components/Toggle/Toggle.stories.tsx).
 */
export interface ToggleProps {
  ref?: React.Ref;
  /** The controlled state of the toggle. */
  pressed?: boolean;
  /** The state of the toggle when initially rendered. Use `defaultPressed` if you do not need to control the state of the tog */
  defaultPressed?: boolean;
  style?: CSSProperties;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  variant?: "outline" | "ghost" | "stroke" | "badge";
  size?: "sm" | "md" | "lg" | "xl" | "xs";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "rounded" | "full";
}

export declare const Toggle: React.ComponentType<ToggleProps>;
