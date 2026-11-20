import * as React from 'react';

/**
 * StatusView — from @devart/ui-react@1.0.0 (./changes/components/StatusView.stories.tsx).
 */
export interface StatusViewProps {
  tone?: "info" | "error" | "success" | "neutral" | "transparent" | "muted";
  icon?: React.ReactNode;
  iconSize?: "base" | "sm" | "md" | "lg" | "xs";
  withIconHalo?: boolean;
  title: string;
  titleSize?: "base" | "sm" | "md" | "lg" | "xs";
  contentWidth?: "sm" | "md";
  description?: React.ReactNode;
  actions?: React.ReactNode;
  actionsOrientation?: "inline" | "stacked";
  retryLabel?: string;
  retryButton?: ButtonProps;
  ref?: React.Ref;
  onRetry?: () => void;
  style?: CSSProperties;
  className?: string;
  id?: string;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xs";
  surface?: "standalone" | "embedded";
}

export declare const StatusView: React.ComponentType<StatusViewProps>;
