# Link — prod → expected

Baseline: [`../current/Link.md`](../current/Link.md).

A new `Link` primitive is introduced as a shared, promoted style — replaces every ad-hoc `<a style="color:var(--brand-primary)…">` usage across the kit with a single reusable class. Lives in [`pages/kit-theme.css`](../pages/kit-theme.css) at the `.link` rule.

| State | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Default | colour `accent` `#07827F` (Brand-600 raw), browser-default underline always on, sitting tight against the baseline | — | colour `--ink-highlight` (resolves to `--brand-primary` = Brand-600 `#07807E` light / `--tertiary-400` = Tertiary-400 `#2EBEC4` dark — theme-adaptive, AA in both), **no underline at rest**, font-weight 500 | underline reveals on hover → reads as quieter inline emphasis in body copy until the cursor signals interactivity |
| Hover *(new)* | (no change from default — underline already on) | — | underline appears, `text-underline-offset: 25%` (of font-size, sits 25% below the baseline), `text-decoration-thickness: 1px` | the 25% offset gives the rule visible breathing room from descenders so it doesn't smudge into the letterforms — crisper than browser-default tight underline. Thickness pinned at 1 px so it doesn't get heavier at larger font sizes. |
| Focus (keyboard) *(new)* | ⚠ browser-default ring | — | `box-shadow: 0 0 0 2px Surface/Card, 0 0 0 4px --focus-ring-brand` + `border-radius: .125rem` | same recipe used by Button / IconButton / nav rows / `.sbx-pop-theme-btn` — one ring shape across the system |
| Disabled *(new)* | ⚠ undefined | — | colour `Text/Inactive`, no underline, `cursor: not-allowed`, `pointer-events: none` | matches Button disabled language; toggle via `.is-disabled` class or `[disabled]` attribute |

## DOM / markup

Single element carrying class `.link` — either an `<a href>` (inline navigation) or a `<button type="button">` (inline action). The rule resets button chrome (`background:none; border:none; padding:0`) so a `<button class="link">` is visually identical to an `<a class="link">`. No wrapper, no icon slot, no pseudo-elements. Disabled state is toggled with the `.is-disabled` class or the `[disabled]` attribute on the same element.

## No change (—)

`font-family`, `font-size`, `line-height`: all `inherit` (explicitly set to `inherit` in the rule), so a link inside `text-xs` body copy renders at 12 px, inside `text-sm` at 14 px, etc. `cursor: pointer` at rest. No `padding` (`0`), `border` (`none`), or `background` (`none`) — the link is text-only. No transition is declared (state changes are instantaneous). No responsive `@media` rules and no separate `.dark` override — theme adaptation happens entirely through `--ink-highlight` resolving per theme.

## Token map used

`--ink-highlight` (default colour, theme-adaptive — resolves to `--brand-primary` Brand-600 `#07807E` light / `--tertiary-400` `#2EBEC4` dark) · `--ink-inactive` (disabled colour) · `--focus-ring-brand` (focus ring) · `--card` (focus-ring gap). All resolve via existing semantic aliases — no new tokens.

`--ink-highlight` is the same token used by `.cl-kw` (gradient-text keywords in chat-landing's hero) and any other "emphasised text" surface. One source of truth for "this text is brand-emphasised" across the system.
