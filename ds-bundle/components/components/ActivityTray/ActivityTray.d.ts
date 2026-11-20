import * as React from 'react';

/**
 * ActivityTray — from @devart/ui-react@1.0.0 (./changes/components/ActivityTray.stories.tsx).
 */
export interface ActivityTrayProps {
  headerTitle: React.ReactNode;
  headerIcon?: React.ReactNode;
  children?: React.ReactNode;
  /** When `false`, header is not a toggle; list stays open. */
  isCollapsible?: boolean;
  /** `aria-label` for the ✕. Defaults to `"Dismiss"`. */
  dismissLabel?: string;
  /** `aria-label` for the collapse trigger; falls back to title text. */
  toggleLabel?: string;
  /** Auto-remove `dismissible` rows; tray leaves after the last one. */
  autoDismiss?: boolean;
  /** Delay before a dismissible row leaves. Defaults to `4000`. */
  autoDismissDelay?: number;
  /** Classes for the scrollable list. */
  contentClassName?: string;
  /** Shows ✕; called on ✕ click or after auto-dismiss leave. */
  onDismiss?: () => void;
  style?: CSSProperties;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
  asChild?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  disabled?: boolean;
}

export declare const ActivityTray: React.ComponentType<ActivityTrayProps>;
