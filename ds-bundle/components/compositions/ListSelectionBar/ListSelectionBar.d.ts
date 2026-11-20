import * as React from 'react';

/**
 * ListSelectionBar — from @devart/ui-react@1.0.0 (./src/components/ListSelectionBar/ListSelectionBar.stories.tsx).
 */
export interface ListSelectionBarProps {
  className?: string;
  style?: CSSProperties;
  /** Caption shown while nothing is selected, e.g. "24 files". */
  title: string;
  /** Caption shown while something is selected, e.g. "3 selected". */
  selectedText: string;
  isPending: boolean;
  selectedCount: number;
  allSelected: boolean;
  isEmpty?: boolean;
  sticky?: boolean;
  /** CSS length for the sticky `top` offset — a page whose header is itself sticky passes its height here. Taking a length ra */
  stickyOffset?: string;
  selectAllLabel?: string;
  deselectAllLabel?: string;
  exitSelectionLabel?: string;
  rightSlot?: React.ReactNode;
  onClearSelection: () => void;
  onSelectAll?: () => void;
}

export declare const ListSelectionBar: React.ComponentType<ListSelectionBarProps>;
