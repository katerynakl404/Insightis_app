import * as React from 'react';

/**
 * Separator — from @devart/ui-react@1.0.0 (./src/components/Separator/Separator.stories.tsx).
 */
export interface SeparatorProps {
  style?: React.CSSProperties;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  asChild?: boolean;
  /** Whether or not the component is purely decorative. When true, accessibility-related attributes are updated so that that  */
  decorative?: boolean;
  variant?: "primary" | "secondary" | "border";
  orientation?: "horizontal" | "vertical";
}

export declare const Separator: React.ComponentType<SeparatorProps>;
