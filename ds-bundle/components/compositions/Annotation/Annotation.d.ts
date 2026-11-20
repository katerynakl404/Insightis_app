import * as React from 'react';

/**
 * Annotation — from @devart/ui-react@1.0.0 (./src/components/Annotation/Annotation.stories.tsx).
 */
export interface AnnotationProps {
  /** The control(s) the label points at — the ring goes around their union. */
  target: string | Element | { current: Element | null; } | readonly TourTarget[];
  /** A glyph on a 24px disc before the text. */
  icon?: React.ReactNode;
  /** The label. `<b>`/`<strong>` take Text/Primary 600. */
  children?: React.ReactNode;
}

export declare const Annotation: React.ComponentType<AnnotationProps>;
