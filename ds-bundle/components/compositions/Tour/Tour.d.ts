import * as React from 'react';

/**
 * Tour — from @devart/ui-react@1.0.0 (./src/components/Tour/Tour.stories.tsx).
 */
export interface TourProps {
  open?: boolean;
  steps: TourStep[];
  /** 0-based index of the step on screen — the caller holds it. */
  step?: number;
  onStepChange?: (step: number) => void;
  onClose?: (reason: TourCloseReason) => void;
  /** Back on the first step — the tour continues a longer flow. Shows Back there. */
  onBeforeFirst?: () => void;
  /** The flow the tour is part of, for the read-out: its steps and where the tour starts in it. Default: the tour's own steps */
  progress?: { steps: StepProgressStep[]; offset?: number; };
  labels?: TourLabels;
  /** The area the tour may use (selector, element or ref). Default: the viewport. */
  boundary?: string | Element | { current: Element | null; } | readonly TourTarget[];
  /** Grows the lit area on every side. */
  padding?: number;
}

export declare const Tour: React.ComponentType<TourProps>;
