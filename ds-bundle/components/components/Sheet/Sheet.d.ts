import * as React from 'react';

/**
 * Sheet — from @devart/ui-react@1.0.0 (./changes/components/Sheet.stories.tsx).
 */
export interface SheetProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
}

export declare const Sheet: React.ComponentType<SheetProps>;
