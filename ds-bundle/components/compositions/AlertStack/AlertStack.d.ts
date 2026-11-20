import * as React from 'react';

/**
 * AlertStack — from @devart/ui-react@1.0.0 (./src/components/AlertStack/AlertStack.stories.tsx).
 */
export interface AlertStackProps {
  /** The notices — `Alert`s. The deck paints each folded notice's edge from the child's own `variant` prop, so a wrapper comp */
  children: React.ReactNode;
  lessLabel?: string;
  open?: boolean;
  defaultOpen?: boolean;
  ref?: React.Ref;
  moreLabel?: (count: number) => string;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  id?: string;
  style?: CSSProperties;
}

export declare const AlertStack: React.ComponentType<AlertStackProps>;
