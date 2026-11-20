import * as React from 'react';

/**
 * Tree — from @devart/ui-react@1.0.0 (./src/components/Tree/Tree.stories.tsx).
 */
export interface TreeProps {
  /** The edge of what holds the tree, in px, at both ends of every row — 24 in a card, under its title; 16 in a pane beside a */
  inset?: number;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
}

export declare const Tree: React.ComponentType<TreeProps>;
