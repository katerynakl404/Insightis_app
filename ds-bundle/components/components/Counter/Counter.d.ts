import * as React from 'react';

/**
 * Counter — from @devart/ui-react@1.0.0 (./src/components/Counter/Counter.stories.tsx).
 */
export interface CounterProps {
  ref?: React.Ref;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  size?: "sm" | "md";
  active?: boolean;
}

export declare const Counter: React.ComponentType<CounterProps>;
