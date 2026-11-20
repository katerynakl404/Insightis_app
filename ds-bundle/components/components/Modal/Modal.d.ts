import * as React from 'react';

/**
 * Modal — from @devart/ui-react@1.0.0 (./changes/components/Modal.stories.tsx).
 * @replaces dialog
 */
export interface ModalProps {
  children?: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  modal?: boolean;
}

export declare const Modal: React.ComponentType<ModalProps>;
