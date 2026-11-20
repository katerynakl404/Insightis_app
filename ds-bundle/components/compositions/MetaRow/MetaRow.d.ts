import * as React from 'react';

/**
 * MetaRow — from @devart/ui-react@1.0.0 (./src/components/MetaRow/MetaRow.stories.tsx).
 */
export interface MetaRowProps {
  clearLabel?: string;
  /** CSS length for the sticky `top`, e.g. a sticky header's height. Read only with `sticky`. */
  stickyOffset?: string;
  ref?: React.Ref;
  /** Leave the selection: renders a ✕ at the end of the row. */
  onClear?: () => void;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  align?: "start" | "between";
  sticky?: boolean;
}

export declare const MetaRow: React.ComponentType<MetaRowProps>;
