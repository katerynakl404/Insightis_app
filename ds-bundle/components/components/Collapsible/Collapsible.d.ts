import * as React from 'react';

/**
 * Collapsible — from @devart/ui-react@1.0.0 (./src/components/Collapsible/Collapsible.stories.tsx).
 */
export interface CollapsibleProps {
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

export declare const Collapsible: React.ComponentType<CollapsibleProps>;
