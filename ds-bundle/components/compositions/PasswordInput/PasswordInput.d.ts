import * as React from 'react';

/**
 * PasswordInput — from @devart/ui-react@1.0.0 (./src/components/PasswordInput/PasswordInput.stories.tsx).
 */
export interface PasswordInputProps {
  ref?: React.Ref;
  toggleHideLabel?: string;
  toggleShowLabel?: string;
  inputGroupProps?: InputGroupProps;
  toggleButtonProps?: PasswordToggleButtonProps;
  classNames?: PasswordInputClassNames;
  style?: CSSProperties;
  className?: string;
  id?: string;
  children?: React.ReactNode;
}

export declare const PasswordInput: React.ComponentType<PasswordInputProps>;
