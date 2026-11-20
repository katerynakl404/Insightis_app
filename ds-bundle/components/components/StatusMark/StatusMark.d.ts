import * as React from 'react';

/**
 * StatusMark — from @devart/ui-react@1.0.0 (./src/components/StatusMark/StatusMark.stories.tsx).
 */
export interface StatusMarkProps {
  ref?: React.Ref;
  style?: CSSProperties;
  className?: string;
  id?: string;
  variant?: "error" | "warning" | "neutral";
  size?: "sm" | "md";
  interactive?: boolean;
}

export declare const StatusMark: React.ComponentType<StatusMarkProps>;
