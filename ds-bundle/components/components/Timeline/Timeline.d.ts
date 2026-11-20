import * as React from 'react';

/**
 * Timeline — from @devart/ui-react@1.0.0 (./src/components/Timeline/Timeline.stories.tsx).
 */
export interface TimelineProps {
  defaultOpen?: boolean;
  open?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
}

export declare const Timeline: React.ComponentType<TimelineProps>;
