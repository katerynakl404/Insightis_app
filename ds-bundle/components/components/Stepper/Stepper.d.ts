import * as React from 'react';

/**
 * Stepper — from @devart/ui-react@1.0.0 (./src/components/Stepper/Stepper.stories.tsx).
 */
export interface StepperProps<TData = undefined> {
  steps: StepRenderer<TData>[];
  initialStep?: number;
  /** Initial shared data available to all steps via `api.data`. */
  initialData?: TData;
  /** Called after the active step changes (not on mount). */
  onStepChange?: (index: number) => void;
  /** Ref to access the stepper API imperatively. */
  ref?: React.Ref;
}

export declare const Stepper: React.ComponentType<StepperProps>;
