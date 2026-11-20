import * as React from 'react';

/**
 * Select — from @devart/ui-react@1.0.0 (./src/components/Select/Select.stories.tsx).
 * @replaces select
 */
export interface SelectProps<T extends SelectOptionBase = SelectOption> {
  options: readonly T[];
  /** The chosen option's `id`; `null` shows the placeholder. */
  value?: string;
  defaultValue?: string;
  /** The trigger's `id`, which the label points at; generated when omitted. */
  id?: string;
  /** Submits the chosen `id` with a form. */
  name?: string;
  label?: React.ReactNode;
  "aria-label"?: string;
  placeholder?: string;
  /** Asterisk on the label; the value can't be cleared, even with `clearable`. */
  required?: boolean;
  disabled?: boolean;
  isInvalid?: boolean;
  errorText?: string;
  /** Adds a clear button; Backspace and Delete clear too. */
  clearable?: boolean;
  clearLabel?: string;
  className?: string;
  /** Gets `null` when the value is cleared. */
  onValueChange?: (id: string | null) => void;
  /** Defaults to the option's `label`. */
  getOptionLabel?: (option: T) => string;
  getOptionDisabled?: (option: T) => boolean;
  size?: "sm" | "md" | "lg" | "xl" | "xs";
}

export declare const Select: React.ComponentType<SelectProps>;
