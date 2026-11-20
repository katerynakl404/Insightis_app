import * as React from 'react';

/**
 * ProgressBar — from @devart/ui-react@1.0.0 (./changes/components/ProgressBar.stories.tsx).
 */
export interface ProgressBarProps {
  value?: number;
  max?: number;
  getValueLabel?: (value: number, max: number) => string;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  variant?: "primary" | "attention" | "green" | "tertiary" | "destructive";
  size?: "md" | "lg";
  rounded?: "lg" | "full";
  trackVariant?: "default" | "destructive";
}

export declare const ProgressBar: React.ComponentType<ProgressBarProps>;
