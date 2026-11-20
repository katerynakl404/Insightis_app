import * as React from 'react';

/**
 * ConfirmationDialog — from @devart/ui-react@1.0.0 (./changes/components/ConfirmationDialog.stories.tsx).
 */
export interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  /** The question's one paragraph. Inline marks are fine — the name it is about in bold — since it renders inside a `<p>`; a  */
  description: React.ReactNode;
  confirmLabel: string;
  cancelLabel: string;
  icon?: React.ReactNode;
  bodySlot?: React.ReactNode;
  isLoading?: boolean;
  variant?: "primary" | "destructive";
  isCloseButtonVisible?: boolean;
  className?: string;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => Promise<void> | void;
  onCancel?: () => void;
  onError?: (error: unknown) => void;
}

export declare const ConfirmationDialog: React.ComponentType<ConfirmationDialogProps>;
