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
| Prev / Next arrow | `IconButton` `.iconbtn .iconbtn-secondary` | `.iconbtn` native box is **2.25rem (36px) square** (`.iconbtn` `height/width:2.25rem`, line 585). In Pagination the arrow is **forced to 32px × 32px** via inline `style="height:2rem;width:2rem"` so it pairs flush with the 32px page row. Radius **.375rem (6px)**; border **1px solid `var(--btn-secondary-border)`**; bg `var(--btn-secondary-bg)` (= Card); color `var(--ink-body)`. The kit has no `.iconbtn-sm` rule — the 32px sizing is the inline override, not a variant class. |
| Page button box (active + default) | `Button` `.btn .btn-sm .btn-*` | Pagination forces each numbered button to a **32px × 32px square** via inline `style="width:2rem;padding:0"` — overriding the default `.btn-sm` `padding:0 .625rem`. Height stays `.btn-sm` `2rem (32px)`. |
| Row gap | n/a (page-layout concern) | not tokenised in `kit-theme.css`; set by the consuming page layout |

### Base box recipes (verbatim from CSS)

- `.btn` (line 506): `display:inline-flex;align-items:center;justify-content:center;gap:.375rem;white-space:nowrap;font-weight:500;border-radius:.375rem;transition:all .12s;cursor:pointer;border:1px solid transparent;font-family:inherit`.
- `.btn-sm` (line 508): `height:2rem;padding:0 .625rem;font-size:.875rem`. Line-height inherited (no explicit value).
- `.iconbtn` (line 585): `display:inline-flex;align-items:center;justify-content:center;border-radius:.375rem;height:2.25rem;width:2.25rem;border:1px solid transparent;cursor:pointer;transition:all .12s;font-family:inherit`.

### Variant fills (verbatim from CSS)

- `.btn-primary` (line 512) / `.iconbtn-primary` (line 586): `background:var(--btn-primary-bg)` (`--brand-600`); text `var(--btn-primary-text)` (`--white`).
- `.btn-secondary` (line 514): `border-color:var(--btn-secondary-border)` (`--slate-300`; dark: `--grey-600`); `background:var(--btn-secondary-bg)` (`--card`); `color:var(--ink-body)`.
- `.iconbtn-secondary` (line 587): `background:var(--btn-secondary-bg);border-color:var(--btn-secondary-border);color:var(--ink-body)` — same recipe.

> Reference lines — Button `sm`: **h 32px · pad 0 10px · radius 6px · 14px/500**; IconButton native: **36×36 · radius 6px**. Full specs: [`Button`](Button.md), [`IconButton`](IconButton.md).

## Interaction states (inherited verbatim — reproduced here so the spec stands alone)

All states are forms `:hover` / `:active` / `:focus-visible` / `:disabled`, with matching `.s-hover` / `.s-pressed` / `.s-focus` / `.s-disabled` storybook proxies. Transition on every element: `all .12s`.

| Element | Hover | Pressed (`:active`) | Focus (`:focus-visible`) | Disabled |
|---|---|---|---|---|
| Active page (`.btn-primary`) | `background:var(--btn-primary-bg-hover)` (`--brand-700`) | `background:var(--btn-primary-bg-press)` (`--tertiary-800`) | `outline:none;box-shadow:0 0 0 2px var(--card),0 0 0 4px var(--focus-ring)` | `background:var(--state-disabled);color:var(--ink-inactive);cursor:not-allowed` |
| Default page (`.btn-secondary`) | `background:var(--state-hover);color:var(--ink-body);border-color:var(--btn-secondary-border-hover)` (`--slate-400`; dark `--grey-500`) | `background:var(--state-pressed);color:var(--ink-body)` | `outline:none;box-shadow:0 0 0 2px var(--card),0 0 0 4px var(--focus-ring)` | `background:var(--state-disabled);color:var(--ink-inactive);border-color:var(--btn-secondary-border)` (via `.s-disabled`) |
| Prev / Next (`.iconbtn-secondary`) | `background:var(--state-hover);color:var(--ink-body);border-color:var(--btn-secondary-border-hover)` | `background:var(--state-pressed);color:var(--ink-body);border-color:var(--btn-secondary-border)` | `outline:none;box-shadow:0 0 0 2px var(--card),0 0 0 4px var(--focus-ring)` | `background:var(--state-disabled);color:var(--ink-inactive);border-color:var(--btn-secondary-border)` |

> Disabled-arrow colour = `var(--ink-inactive)` (`Text/Inactive`), per the `.s-disabled.iconbtn-secondary` rule (line 599). Focus ring is **2px `var(--card)` gap + 2px `var(--focus-ring)`** on all three elements — fully shipped, not pending.

## DOM / markup contract

Flat row of `<button>` elements, no wrapper class required by the kit (gap set by consuming page):

```html
<button class="iconbtn iconbtn-secondary" style="height:2rem;width:2rem"><svg …>‹ prev chevron</svg></button>
<button class="btn btn-sm btn-primary" style="width:2rem;padding:0">1</button>
<button class="btn btn-sm btn-secondary" style="width:2rem;padding:0">2</button>
<button class="iconbtn iconbtn-secondary" style="height:2rem;width:2rem"><svg …>› next chevron</svg></button>
```

- Inline `height:2rem;width:2rem` on arrows and `width:2rem;padding:0` on page buttons are **required** — they normalise both element families to a 32px square.
- Arrow glyphs are 18×18 inline SVGs, `viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`. Prev = chevron-left `path d="m15 18-6-6 6-6"` (`.svg-chev-l`); Next = chevron-right `path d="m9 18 6-6-6-6"` (`.svg-chev-r`). Colour follows `currentColor` = the button's `var(--ink-body)`.

## Dark-mode

No Pagination-specific dark rules. Dark theme only re-points the shared tokens: `--btn-secondary-border` → `--grey-600`, `--btn-secondary-border-hover` → `--grey-500` (lines 293–294); `--btn-primary-*` unchanged. Everything re-resolves automatically.

## Component reuse note

The Pagination kit demo previously rendered its Expected column under the `.prod` scope, which meant the inner buttons resolved against prod tokens. That was wrong — Pagination's components have changed (new Primary fill, new Secondary variant, new IconButton variants), so the demo now uses the default token scope and the correct variant classes:

- Prev/Next `<button class="iconbtn iconbtn-secondary">`
- Active page `<button class="btn btn-sm btn-primary">`
- Other pages `<button class="btn btn-sm btn-secondary">`

## No change (—)
Button size 32px, radius `md 6px`, font-medium.

## Still needed
- **Ellipsis (…)** affordance for long page ranges — to define.

*(Focus state is finalized — `.s-focus` / `:focus-visible` on every page button + arrow gives the 2px-gap + 2px `--focus-ring` ring, lines 526/553/596/616/600/620. No longer outstanding.)*
