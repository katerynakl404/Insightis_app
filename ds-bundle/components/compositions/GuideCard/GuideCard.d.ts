import * as React from 'react';

/**
 * GuideCard — from @devart/ui-react@1.0.0 (./src/components/GuideCard/GuideCard.stories.tsx).
 */
export interface GuideCardProps {
  header?: React.ReactNode;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  titleId?: string;
  descriptionId?: string;
  footer?: React.ReactNode;
  width?: "md" | "lg";
  side?: "top" | "right" | "bottom" | "left";
  arrowOffset?: string | number;
  nudgeCount?: number;
  isLeaving?: boolean;
  style?: CSSProperties;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
  children?: React.ReactNode;
}

export declare const GuideCard: React.ComponentType<GuideCardProps>;
