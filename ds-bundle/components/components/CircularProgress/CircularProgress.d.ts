import * as React from 'react';

/**
 * CircularProgress — from @devart/ui-react@1.0.0 (./src/components/CircularProgress/CircularProgress.stories.tsx).
 */
export interface CircularProgressProps {
  value: number;
  max?: number;
  variant?: "primary" | "secondary";
  size?: number;
  strokeWidth?: number;
  children?: React.ReactNode;
  style?: CSSProperties;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
}

export declare const CircularProgress: React.ComponentType<CircularProgressProps>;
