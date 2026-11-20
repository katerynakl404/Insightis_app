import * as React from 'react';

/**
 * SidebarPanelHeader — from @devart/ui-react@1.0.0 (./src/components/Sidebar/SidebarPanelHeader.stories.tsx).
 */
export interface SidebarPanelHeaderProps {
  /** The brand mark, usually wrapped in the consumer's own home link. Must be a single element: the row's layout and focus cl */
  logoIcon: React.ReactNode;
  /** Defaults to a plain `SidebarTrigger`; pass one to control its label. */
  sidebarTrigger?: React.ReactNode;
  className?: string;
}

export declare const SidebarPanelHeader: React.ComponentType<SidebarPanelHeaderProps>;
