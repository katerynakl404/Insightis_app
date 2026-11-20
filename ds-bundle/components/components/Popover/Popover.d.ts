import * as React from 'react';

/**
 * Popover — from @devart/ui-react@1.0.0 (./changes/components/Popover.stories.tsx).
 */
export interface PopoverProps {
  /** Also open on mouse hover (pointerType 'mouse' only); tap and pen open by press. */
  openOnHover?: boolean;
  /** ms the pointer must stay on the trigger before a hover opens it. */
  delay?: number;
  /** ms after the pointer leaves trigger or content before a hover-open closes; long enough to travel between them. */
  closeDelay?: number;
  /** When `openOnHover` is on: after a click, pointer-leave no longer closes the popover (default). Set `false` so leave stil */
  pinOnClick?: boolean;
  /** Close on window scroll (outside the content) or resize. */
  closeOnViewportChange?: boolean;
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
}

export declare const Popover: React.ComponentType<PopoverProps>;
