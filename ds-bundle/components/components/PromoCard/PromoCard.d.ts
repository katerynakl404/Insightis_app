import * as React from 'react';

/**
 * PromoCard — from @devart/ui-react@1.0.0 (./changes/components/PromoCard.stories.tsx).
 */
export interface PromoCardProps {
  /** Leading glyph. A 20px outline mark in Brand/Primary. */
  icon?: React.ReactNode;
  /** The offer, in two or three words. */
  title: React.ReactNode;
  /** One line of what it gives. */
  description?: React.ReactNode;
  /** Where the card goes. Rendered as an anchor when given, a button otherwise. */
  href?: string;
  dismissLabel?: string;
  /** Points at the link or the button, so `ref.current.focus()` focuses the card. */
  ref?: React.Ref;
  onSelect?: () => void;
  /** Omit to render a card that cannot be dismissed. The dismiss unmounts with the card, so the consumer moves focus after di */
  onDismiss?: () => void;
  style?: CSSProperties;
  className?: string;
  id?: string;
  children?: React.ReactNode;
}

export declare const PromoCard: React.ComponentType<PromoCardProps>;
