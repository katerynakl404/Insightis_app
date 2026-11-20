import * as React from 'react';

/**
 * Button — from @devart/ui-react@1.0.0 (./changes/components/Button.stories.tsx).
 * @replaces button
 */
export interface ButtonProps {
  asChild?: boolean;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  /** Shows a spinner and blocks pointer interaction while keeping the variant fill (the label is retained). Sets `aria-busy`; */
  isLoading?: boolean;
  /** Shown on hover and focus; `true` shows the `aria-label`. A disabled button with a tooltip is rendered `aria-disabled`, s */
  tooltip?: React.ReactNode;
  tooltipSide?: "top" | "right" | "bottom" | "left";
  ref?: React.Ref;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "transparent" | "tertiary" | "destructiveTertiary" | "destructive" | "primaryTertiary" | "outline" | "destructiveOutline" | "transparentUnderline";
  size?: "sm" | "md" | "lg" | "xl" | "xs";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "rounded" | "full";
  align?: "center" | "right" | "left";
  fullWidth?: boolean;
}

export declare const Button: React.ComponentType<ButtonProps>;
