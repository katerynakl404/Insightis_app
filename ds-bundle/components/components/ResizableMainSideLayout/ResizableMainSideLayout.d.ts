import * as React from 'react';

/**
 * ResizableMainSideLayout — from @devart/ui-react@1.0.0 (./src/components/ResizableMainSideLayout/ResizableMainSideLayout.stories.tsx).
 */
export interface ResizableMainSideLayoutProps {
  /** Expands or collapses the side panel. The open state itself is the caller's. */
  sideOpen: boolean;
  mainContent: React.ReactNode;
  sidePanelContent: React.ReactNode;
  groupId?: string;
  mainPanelId?: string;
  sidePanelId?: string;
  mainDefaultSize?: string;
  mainMinSize?: string;
  sideDefaultSize?: string;
  sideMinSize?: string;
  sideMaxSize?: string;
  sideCollapsedSize?: string;
  className?: string;
}

export declare const ResizableMainSideLayout: React.ComponentType<ResizableMainSideLayoutProps>;
