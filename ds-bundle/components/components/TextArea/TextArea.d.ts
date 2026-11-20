import * as React from 'react';

/**
 * TextArea — from @devart/ui-react@1.0.0 (./changes/components/TextArea.stories.tsx).
 * @replaces textarea
 */
export interface TextAreaProps {
  maxRowsBeforeScroll?: number;
  ref?: React.Ref;
  label?: React.ReactNode;
  isInvalid?: boolean;
  errorText?: string;
  showCount?: boolean;
  softLimit?: boolean;
  /** Guidance under the field, beside the counter; an error takes its place. */
  hintText?: React.ReactNode;
  /** Marks the label with an asterisk and makes the field required. */
  required?: boolean;
  className?: string;
  id?: string;
  style?: CSSProperties;
  children?: React.ReactNode;
  variant?: "outline";
  size?: "sm" | "md" | "lg" | "xl" | "xs";
  rounded?: "md" | "lg" | "xl" | "3xl";
}

export declare const TextArea: React.ComponentType<TextAreaProps>;
