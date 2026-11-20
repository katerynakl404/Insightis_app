import * as React from 'react';

/**
 * StepSlider — from @devart/ui-react@1.0.0 (./src/components/StepSlider/StepSlider.stories.tsx).
 */
export interface StepSliderProps {
  steps: StepSliderStep[];
  value: string;
  "aria-label": string;
  showStepTooltips?: boolean;
  onValueChange?: (value: string) => void;
  form?: string;
  style?: React.CSSProperties;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  dir?: "ltr" | "rtl";
  id?: string;
  disabled?: boolean;
  name?: string;
  orientation?: "horizontal" | "vertical";
  inverted?: boolean;
  minStepsBetweenThumbs?: number;
  size?: "sm" | "default";
}

export declare const StepSlider: React.ComponentType<StepSliderProps>;
