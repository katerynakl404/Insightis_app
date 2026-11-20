import * as React from 'react';

/**
 * DropdownMenu — from @devart/ui-react@1.0.0 (./changes/components/DropdownMenu.stories.tsx).
 */
export interface DropdownMenuProps {
  children?: React.ReactNode;
  dir?: "ltr" | "rtl";
  open?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
}

export declare const DropdownMenu: React.ComponentType<DropdownMenuProps>;
