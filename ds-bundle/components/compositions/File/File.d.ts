import * as React from 'react';

/**
 * File — from @devart/ui-react@1.0.0 (./src/components/File/File.stories.tsx).
 */
export interface FileProps {
  className?: string;
  name: string;
  fileSize?: string;
  /** Upload progress 0–100; when set, replaces the `fileSize` caption with a progress bar. */
  progress?: number;
  isLoading?: boolean;
  isError?: boolean;
  icon?: React.ReactNode;
  rightSlot?: React.ReactNode;
  onClick?: () => void;
  onDismiss?: () => void;
  /** Accessible name of the ✕ button. */
  dismissLabel?: string;
  onRetry?: () => void;
  variant?: "default" | "tertiary";
  size?: "sm" | "md" | "lg" | "xl" | "xs";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "rounded" | "full";
}

export declare const File: React.ComponentType<FileProps>;
