import * as React from 'react';

/**
 * StepProgress — from @devart/ui-react@1.0.0 (./changes/components/StepProgress.stories.tsx).
 */
export interface StepProgressProps {
  steps: StepProgressStep[];
  current: number;
  label?: React.ReactNode;
  labelPosition?: "top" | "right" | "bottom" | "left";
  showStepTitle?: boolean;
  "aria-label": string;
  onStepSelect?: (index: number) => void;
  /** Extension of this package. */
  size?: "sm" | "md";
  style?: CSSProperties;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
}

export declare const StepProgress: React.ComponentType<StepProgressProps>;
