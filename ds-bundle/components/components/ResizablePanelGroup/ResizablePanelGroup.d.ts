import * as React from 'react';

/**
 * ResizablePanelGroup — from @devart/ui-react@1.0.0 (./src/components/Resizable/Resizable.stories.tsx).
 */
export interface ResizablePanelGroupProps {
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  /** Default layout for the Group. ℹ️ This value allows layouts to be remembered between page reloads. ⚠️ Slight layout shift */
  defaultLayout?: Layout;
  /** This library sets custom mouse cursor styles to indicate drag state. Use this prop to disable that behavior for Panels a */
  disableCursor?: boolean;
  /** Disable resize functionality. */
  disabled?: boolean;
  /** Ref attached to the root `HTMLDivElement`. */
  elementRef?: React.Ref;
  /** Exposes the following imperative API: - `getLayout(): Layout` - `setLayout(layout: Layout): void` ℹ️ The `useGroupRef` a */
  groupRef?: React.Ref;
  /** Minimum size of the resizable hit target area (either `Separator` or `Panel` edge) This threshold ensures are large enou */
  resizeTargetMinimumSize?: { coarse: number; fine: number; };
  /** Specifies the resizable orientation ("horizontal" or "vertical"); defaults to "horizontal" */
  orientation?: "horizontal" | "vertical";
}

export declare const ResizablePanelGroup: React.ComponentType<ResizablePanelGroupProps>;
