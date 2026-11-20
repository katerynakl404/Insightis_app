import * as React from 'react';

/**
 * ToastMessage — from @devart/ui-react@1.0.0 (./changes/components/Toast.stories.tsx).
 */
export interface ToastMessageProps {
  variant?: "info" | "error" | "success" | "warning";
  message: React.ReactNode;
  description?: string;
  action?: ToastAction;
  icon?: React.ReactNode;
  duration?: number;
  onClose?: () => void;
  /** Accessible label for the close button. */
  closeLabel?: string;
  style?: CSSProperties;
  /** Allows getting a ref to the component instance. Once the component unmounts, React will set `ref.current` to `null` (or  */
  ref?: React.Ref;
  className?: string;
  id?: string;
  children?: React.ReactNode;
}

export declare const ToastMessage: React.ComponentType<ToastMessageProps>;
