import * as React from 'react';

/**
 * Alert — from @devart/ui-react@1.0.0 (./changes/components/Alert.stories.tsx).
 */
export interface AlertProps {
  /** Optional. Without it the description is the whole message — an Alert that explains rather than announces, where a title  */
  title?: string;
  description?: React.ReactNode;
  titleClassName?: string;
  descriptionClassName?: string;
  /** Leading glyph. Use the mark Toast uses for the same variant — circle-check, circle-i, triangle-!, circle-x — so one even */
  icon?: React.ReactNode;
  iconClassName?: string;
  /** Leading illustration in place of `icon`: the given glyph (or an SVG drawn in `currentColor`) on a round plate filled wit */
  illustration?: React.ReactNode;
  illustrationClassName?: string;
  /** Trailing controls. House rule: the primary action goes LAST, on the right. */
  actions?: React.ReactNode;
  actionsClassName?: string;
  ref?: React.Ref;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  variant?: "info" | "error" | "success" | "warning" | "neutral";
  size?: "sm" | "md";
  withIllustration?: boolean;
}

export declare const Alert: React.ComponentType<AlertProps>;
