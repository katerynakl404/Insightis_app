# Pagination — prod → expected

Pagination is composed entirely of Button + IconButton variants — its visual changes are inherited from those components, not defined separately.

| Part | Current (prod) | Expected |
|---|---|---|
| Active page | `Button primary` (bg `accent` `#07827F`, text `#FFF`) | `Button primary` — inherits new `--btn-primary-bg` `#07807E` (theme-independent, AA-compliant in both themes) |
| Default page | `Button outline` (border `Stroke/Border`, text `content-secondary`) | **`Button secondary`** — filled card-style; lower emphasis than Outlined. Hover bg always lighter than default via the new component-scoped Secondary tokens |
| Prev / Next arrow | bare `iconbtn` (no variant) | **`IconButton secondary`** — matches the default-page bg, visually paired with the page row |
| Disabled arrow | `content-light` | `Text/Inactive` (inherits from `.iconbtn-secondary.s-disabled`) |

## Component reuse note

The Pagination kit demo previously rendered its Expected column under the `.prod` scope, which meant the inner buttons resolved against prod tokens. That was wrong — Pagination's components have changed (new Primary fill, new Secondary variant, new IconButton variants), so the demo now uses the default token scope and the correct variant classes:

- Prev/Next `<button class="iconbtn iconbtn-secondary">`
- Active page `<button class="btn btn-sm btn-primary">`
- Other pages `<button class="btn btn-sm btn-secondary">`

## No change (—)
Button size 32px, radius `md 6px`, font-medium.

## Still needed
- **Focus state** for each page button — likely `--focus-ring-brand`.
- **Ellipsis (…)** affordance for long page ranges — to define.
