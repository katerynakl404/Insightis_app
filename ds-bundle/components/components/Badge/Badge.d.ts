import * as React from 'react';

/**
 * Badge — from @devart/ui-react@1.0.0 (./changes/components/Badge.stories.tsx).
 */
export interface BadgeProps {
  withDot?: boolean;
  removeLabel?: string;
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  onDelete?: MouseEventHandler<HTMLButtonElement>;
  /** Text shown on hover and on keyboard focus. A badge is a STATUS, never a control: it carries no action, and a tooltip is  */
  tooltip?: React.ReactNode;
  tooltipSide?: "top" | "right" | "bottom" | "left";
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  flat?: boolean;
  variant?: "error" | "success" | "brand" | "primary" | "secondary" | "attention" | "green";
  size?: "sm" | "md" | "lg" | "xl";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "rounded" | "full";
}

export declare const Badge: React.ComponentType<BadgeProps>;
