import * as React from 'react';

/**
 * IconButton — from @devart/ui-react@1.0.0 (./src/components/IconButton/IconButton.stories.tsx).
 */
export interface IconButtonProps {
  /** The control's name; it has no visible text. */
  "aria-label": string;
  asChild?: boolean;
  /** Replaces the icon with a spinner and blocks pointer interaction while keeping the variant fill. Sets `aria-busy`; does n */
  isLoading?: boolean;
  /** Shown on hover and focus; `true` shows the `aria-label`. A disabled button with a tooltip is rendered `aria-disabled`, s */
  tooltip?: React.ReactNode;
  tooltipSide?: "top" | "right" | "bottom" | "left";
  ref?: React.Ref;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "transparent" | "tertiary" | "destructiveTertiary" | "destructive" | "primaryTertiary" | "outline" | "destructiveOutline";
  size?: "sm" | "md" | "lg" | "xl" | "xs" | "3xs" | "2xs";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "rounded" | "full";
}

export declare const IconButton: React.ComponentType<IconButtonProps>;
