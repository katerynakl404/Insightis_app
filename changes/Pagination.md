# Pagination — prod → expected

Pagination is composed entirely of Button + IconButton variants — its visual changes are inherited from those components, not defined separately.

| Part | Current (prod) | Expected |
|---|---|---|
| Active page | `Button primary` (bg `accent` `#07827F`, text `#FFF`) | `Button primary` — inherits new `--btn-primary-bg` `#07807E` (theme-independent, AA-compliant in both themes) |
| Default page | `Button outline` (border `Stroke/Border`, text `content-secondary`) | **`Button secondary`** — filled card-style; lower emphasis than Outlined. Hover bg always lighter than default via the new component-scoped Secondary tokens |
| Prev / Next arrow | bare `iconbtn` (no variant) | **`IconButton secondary`** — matches the default-page bg, visually paired with the page row |
| Disabled arrow | `content-light` | `Text/Inactive` (inherits from `.iconbtn-secondary.s-disabled`) |

## Concrete dimensions (from reused Button / IconButton)

Pagination defines no sizes of its own — these are inherited verbatim from the kit components.

| Element | Reused component + variant | Exact size / padding / radius / gap |
|---|---|---|
| Active page | `Button` `.btn .btn-sm .btn-primary` | **height 2rem (32px)**; padding **0 .625rem (10px)**; radius **.375rem (6px)**; font-size **.875rem (14px)**, weight 500; border 1px (`.btn` line 503, `.btn-sm` line 505) |
| Default page | `Button` `.btn .btn-sm .btn-secondary` | same box as active — **32px · padding 0 10px · radius 6px · 14px/500**; secondary fill via `var(--btn-secondary-bg)` + 1px `var(--btn-secondary-border)` (line 511) |
| Prev / Next arrow | `IconButton` `.iconbtn .iconbtn-secondary` | ⚠ **36px × 36px** (`.iconbtn` `height/width:2.25rem`, line 582) — **does not match the 32px page buttons**; radius **.375rem (6px)**; border 1px `var(--btn-secondary-border)`. To visually pair the arrows with the 32px row a `size="sm"` IconButton would be needed, but the kit has no `.iconbtn-sm` rule. |
| Row gap | n/a (page-layout concern) | not tokenised in `kit-theme.css`; set by the consuming page layout |

> Reference lines — Button `sm`: **h 32px · pad 0 10px · radius 6px**; IconButton base: **36×36 · radius 6px**. Full specs: [`Button`](Button.md), [`IconButton`](IconButton.md).

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
