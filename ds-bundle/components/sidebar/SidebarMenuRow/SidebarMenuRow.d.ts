import * as React from 'react';

/**
 * SidebarMenuRow — from @devart/ui-react@1.0.0 (./src/components/Sidebar/SidebarMenuRow.stories.tsx).
 */
export interface SidebarMenuRowProps {
  icon?: LucideIcon;
  label: string;
  isExternal?: boolean;
  trailingSlot?: React.ReactNode;
  className?: string;
  onSelect?: () => void;
}

export declare const SidebarMenuRow: React.ComponentType<SidebarMenuRowProps>;
