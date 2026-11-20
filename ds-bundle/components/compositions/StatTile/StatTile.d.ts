import * as React from 'react';

/**
 * StatTile — from @devart/ui-react@1.0.0 (./src/components/StatTile/StatTile.stories.tsx).
 */
export interface StatTileProps {
  /** What is being counted. Overline — it is a caption, not a heading. */
  label: React.ReactNode;
  value: React.ReactNode;
  /** The sentence that makes the number mean something. */
  description?: React.ReactNode;
  /** A badge, a trend, a link — anything that qualifies the value. */
  rightSlot?: React.ReactNode;
  style?: CSSProperties;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
  size?: "sm" | "md";
}

export declare const StatTile: React.ComponentType<StatTileProps>;
