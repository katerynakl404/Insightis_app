import * as React from 'react';

/**
 * Autocomplete — from @devart/ui-react@1.0.0 (./changes/components/Autocomplete.stories.tsx).
 */
export interface AutocompleteProps<T extends {
    id: string;
}, Multiple extends boolean | undefined = false, FreeSolo extends boolean | undefined = false> {
  ref?: React.Ref;
  size?: "sm" | "md" | "lg" | "xl" | "xs";
  badgeVariant?: "error" | "success" | "brand" | "primary" | "secondary" | "attention" | "green";
  placeholder?: string;
  label?: React.ReactNode;
  /** Marks the label with an asterisk and sets `aria-required` on the input — the same contract as `InputGroup` and `TextArea */
  required?: boolean;
  className?: string;
  inputClassName?: string;
  listboxClassName?: string;
  noOptionsText?: React.ReactNode;
  loadingText?: React.ReactNode;
  /** Accessible name of the clear button. */
  clearLabel?: string;
  /** Accessible name of the button that opens the list. */
  popupIndicatorLabel?: string;
  isLoading?: boolean;
  startAddon?: React.ReactNode;
  endAddon?: React.ReactNode;
  disableFiltering?: boolean;
  renderOption?: (option: T, props: { selected: boolean; }) => ReactNode;
  renderBadge?: (option: T, onDelete: (e: MouseEvent<HTMLButtonElement>) => void) => ReactNode;
  options: readonly T[];
  value?: AutocompleteValue<T, Multiple>;
  defaultValue?: AutocompleteValue<T, Multiple>;
  inputValue?: string;
  defaultInputValue?: string;
  isMultipleSelect?: Multiple;
  isFreeSoloSelect?: FreeSolo;
  open?: boolean;
  openOnFocus?: boolean;
  autoHighlight?: boolean;
  autoSelect?: boolean;
  autoComplete?: boolean;
  clearOnBlur?: boolean;
  clearOnEscape?: boolean;
  selectOnFocus?: boolean;
  blurOnSelect?: boolean | "touch" | "mouse";
  disableClearable?: boolean;
  disableCloseOnSelect?: boolean;
  disableListWrap?: boolean;
  includeInputInList?: boolean;
  handleHomeEndKeys?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  filterSelectedOptions?: boolean;
  id?: string;
  onChange?: (event: SyntheticEvent | null, value: AutocompleteValue<T, Multiple>, reason: ChangeReason, details?: ChangeDetails<T>) => void;
  onInputChange?: (event: SyntheticEvent | null, value: string, reason: InputChangeReason) => void;
  onOpen?: (event: SyntheticEvent) => void;
  onClose?: (event: SyntheticEvent | null, reason: CloseReason) => void;
  onHighlightChange?: (event: SyntheticEvent | null, option: T, reason: HighlightReason) => void;
  getOptionLabel?: (option: T | (FreeSolo extends true ? string : never)) => string;
  getOptionKey?: (option: T) => string;
  isOptionEqualToValue?: (option: T, value: T) => boolean;
  filterOptions?: (options: T[], state: FilterOptionsState<T>) => T[];
  getOptionDisabled?: (option?: T) => boolean;
  groupBy?: (option: T) => string;
}

export declare const Autocomplete: React.ComponentType<AutocompleteProps>;
