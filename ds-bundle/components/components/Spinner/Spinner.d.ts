import * as React from 'react';

/**
 * Spinner — from @devart/ui-react@1.0.0 (./src/components/Spinner/Spinner.stories.tsx).
 */
export interface SpinnerProps {
  /** Accessible label announced while the spinner is visible. */
  label?: string;
  style?: CSSProperties;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  color?: "inherit" | "success" | "warning" | "primary" | "secondary" | "destructive" | "accent" | "white" | "muted";
  size?: "sm" | "md" | "lg" | "xl" | "xs";
}

export declare const Spinner: React.ComponentType<SpinnerProps>;
