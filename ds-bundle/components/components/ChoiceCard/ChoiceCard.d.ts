import * as React from 'react';

/**
 * ChoiceCard — from @devart/ui-react@1.0.0 (./src/components/ChoiceCard/ChoiceCard.stories.tsx).
 */
export interface ChoiceCardProps {
  /** The answer's value — required inside a `ChoiceGroup`. */
  value?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** A short tag after the title ("Recommended"), drawn as a small primary Badge. */
  badge?: React.ReactNode;
  /** A leading glyph on a 36px disc. It leads the row top-aligned; the row keeps its padding and the indicator stays on the t */
  icon?: React.ReactNode;
  /** The mark on the right. `auto`: a checkbox in a multiple group, none everywhere else — in a single group the card itself  */
  indicator?: "none" | "checkbox" | "radio" | "auto";
  disabled?: boolean;
  /** Standalone only (no group): the chosen state. */
  selected?: boolean;
  /** Standalone checkbox card: the checkbox's form name. */
  name?: string;
  className?: string;
  /** Lands on the card's root in every shape — the button, the checkbox label or the expandable wrapper, never the expandable */
  style?: CSSProperties;
  /** Content revealed INSIDE the card while it is chosen (an "Other" answer's field). The card's head becomes the button — `a */
  children?: React.ReactNode;
  ref?: React.Ref;
  /** Standalone only: called with the next chosen state. */
  onSelect?: (selected: boolean) => void;
}

export declare const ChoiceCard: React.ComponentType<ChoiceCardProps>;
