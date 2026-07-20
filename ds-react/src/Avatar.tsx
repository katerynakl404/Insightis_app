import * as React from 'react';
import { cx } from './cx';

export interface AvatarProps extends React.ComponentPropsWithoutRef<'span'> {
  /** Image source — renders `<img class="ava ava-img">` instead of the initials fallback. */
  src?: string;
  /** Alt text for the image variant. */
  alt?: string;
  /** Overflow-counter variant (`.ava-count`, e.g. "+5") — neutral chip surface
   *  instead of the brand-filled initials fallback. */
  count?: boolean;
}

/**
 * Avatar — Insightis kit circular avatar (image / initials fallback / +N counter).
 * Fixed 32px (2rem) circle — the kit defines a single size. Renders `.ava` with
 * `.ava-img` (image), `.ava-count` (counter) or `.ava-init` (initials — bg
 * `--brand-primary`, text `--content-on-solid`) from kit-theme.css.
 * Initials / counter text is passed as children.
 */
export function Avatar({ src, alt = '', count = false, className, children, ...rest }: AvatarProps) {
  if (src) {
    // Spread carries span-compatible props; img accepts the shared subset.
    return <img className={cx('ava', 'ava-img', className)} src={src} alt={alt} {...rest} />;
  }
  return (
    <span className={cx('ava', count ? 'ava-count' : 'ava-init', className)} {...rest}>
      {children}
    </span>
  );
}
