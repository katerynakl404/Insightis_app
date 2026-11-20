import * as React from 'react';

/**
 * ClampedText — from @devart/ui-react@1.0.0 (./src/components/ClampedText/ClampedText.stories.tsx).
 */
export interface ClampedTextProps {
  text: string;
  /** How many lines show before See more. */
  lines?: 1 | 2 | 3 | 4 | 5 | 6;
  textStyle?: unknown;
  textColor?: "body" | "inherit" | "success" | "warning" | "primary" | "secondary" | "destructive" | "light" | "accent" | "white";
  /** Show the whole text somewhere else instead of opening it in place. */
  onMore?: () => void;
  moreLabel?: string;
  lessLabel?: string;
  className?: string;
}

export declare const ClampedText: React.ComponentType<ClampedTextProps>;
