import * as React from 'react';

/**
 * Sidebar — from @devart/ui-react@1.0.0 (./changes/components/Sidebar.stories.tsx).
 */
export interface SidebarProps {
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  side?: "right" | "left";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "none" | "offcanvas" | "icon";
  sheetClassname?: string;
}

export declare const Sidebar: React.ComponentType<SidebarProps>;
