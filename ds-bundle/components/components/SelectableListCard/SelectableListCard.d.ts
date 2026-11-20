import * as React from 'react';

/**
 * SelectableListCard — from @devart/ui-react@1.0.0 (./changes/components/SelectableListCard.stories.tsx).
 */
export interface SelectableListCardProps {
  layout?: "row" | "card";
  cardClassName?: string;
  cardContent: React.ReactNode;
  rightSlot?: React.ReactNode;
  selectedClassName?: string;
  /** Also announced on the item itself, as `aria-selected`. */
  isSelected: boolean;
  checkboxAriaLabel?: string;
  onCheckboxToggle: () => void;
  /** A click on the item, or Enter / Space while the item itself has focus. */
  onCardClick: () => void;
}

export declare const SelectableListCard: React.ComponentType<SelectableListCardProps>;
