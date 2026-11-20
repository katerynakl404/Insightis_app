import * as React from 'react';

/**
 * SingleDatePicker — from @devart/ui-react@1.0.0 (./changes/components/Datepicker.stories.tsx).
 */
export interface SingleDatePickerProps {
  selected?: Date;
  className?: string;
  confirmLabel?: string;
  startMonth?: Date;
  endMonth?: Date;
  onSelect?: (date: Date | undefined) => void;
  onConfirm?: (date: Date | undefined) => void;
}

export declare const SingleDatePicker: React.ComponentType<SingleDatePickerProps>;
