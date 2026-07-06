# IconButton — prod → expected

Source: `@insightis/ui` `Button/index.tsx` (cva) + `globals.css`.

**IconButton mirrors the full Button variant set — Primary / Secondary / Outlined / Tertiary / Destructive Outlined** — each reusing the corresponding Button tokens 1:1. No IconButton-specific colour tokens are introduced. The CSS base (`.iconbtn`) is stripped down to shape/size only; colour comes from the variant class.

## Base geometry (`.iconbtn` — shape/size only, one size)

| Property | Value | Notes |
|---|---|---|
| Display / layout | `display:inline-flex; align-items:center; justify-content:center` | Centers the glyph in the square box. |
| Width × Height | `2.25rem` × `2.25rem` (36 × 36px) | Single size — no xs/sm/lg/xl scale (unlike Button). Square footprint. |
| Radius | `.375rem` (6px) | Matches Button `md`. |
| Border | `1px solid transparent` | Variant class supplies the visible colour. |
| Cursor | `pointer` (`not-allowed` when `:disabled`) | Set on base; disabled variants override to `not-allowed`. |
| Font | `font-family:inherit` | No own type tokens — icon-only, no text. |
| Transition | `all .12s` | Matches Button. |
| Icon glyph | ≤18px typical (consumer-set) | **Icon size is flexible / consumer-set by design — not enforced by `.iconbtn`.** `.iconbtn` sizes only the button box; the glyph size comes from the consumer's inline SVG `width`/`height`. 18px is the typical/default, but it may be smaller per-instance (e.g. `.mx-tbl-actions .iconbtn svg{width:12px;height:12px}` in table action rows). Intentional — no base `.iconbtn svg{...}` rule, so each context picks its own glyph size. |

### DOM / markup contract

```html
<button class="iconbtn iconbtn-{variant}" aria-label="Add" data-tip="Add">
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2"><path d="…"/></svg>
</button>
```

- Root element: `<button>` (or `<span class="iconbtn …">` when nested inside another button, e.g. `.sbx-chat-more` inside a chat row). Always carries `class="iconbtn iconbtn-{variant}"` — base class + exactly one variant class.
- **`aria-label` is required** — icon-only control has no text. Add `data-tip` for the hover tooltip (see Tooltip section); typically mirrors the `aria-label`.
- Icon is an **inline `<svg>`** with explicit `width`/`height`, `viewBox="0 0 24 24"`, and `stroke="currentColor"` (or `fill="currentColor"` for solid glyphs) so the glyph inherits the variant's `color`. No `<img>` / icon-font.
- Loading: add `s-loading` (forced-state demo) / `aria-busy="true"` and replace the glyph with `<span class="spinner"></span>`.

## Variants

Single size (36×36) — variants differ in colour only, all reusing Button tokens 1:1. **No per-variant geometry deviation.** The only token-level deviation across the set is the **focus-ring exception** on Destructive Outlined (see States table).

| Variant | Class | Default tokens | Mirrors Button | Deviation from Button |
|---|---|---|---|---|
| Primary | `.iconbtn-primary` | bg `--btn-primary-bg`, icon `--btn-primary-text` | `.btn-primary` | none |
| Secondary | `.iconbtn-secondary` | bg `Surface/Card` (`--btn-secondary-bg`), border `--btn-secondary-border` (Slate-300 light / Grey-600 dark), icon `Text/Body` | `.btn-secondary` | none |
| Outlined | `.iconbtn-outline` | border `Brand/Secondary`, bg transparent, icon `Text/Body` | `.btn-outline` | none |
| **Tertiary** *(new)* | `.iconbtn-tertiary` | bg transparent, no border, icon `Text/Body` | `.btn-tertiary` | none |
| **Destructive Outlined** *(new)* | `.iconbtn-outline-destructive` | border `--btn-outline-destructive-border` (`Feedback/Red` light Red-700 / dark Red-800), bg transparent, icon `Text/Body` (label stays neutral — mirrors Outlined; the border carries the danger identity) | `.btn-outline-destructive` | **focus ring = `--shadow-focus`** (brand-teal, same as every variant) — teal ≠ red, so red-on-red is avoided; the red identity is carried by the border |

> **Resolved — aligned to Button (`--btn-secondary-border`).** `.iconbtn-secondary:active` now uses `border-color:var(--btn-secondary-border)` (Slate-300), matching `.s-pressed.iconbtn-secondary` (forced-state) and the Button secondary pressed border. The earlier `--border` (Slate-200) value — one stop lighter — has been corrected, so real-interactive and forced-state pressed now agree.

## States (applies to all variants — uses the corresponding Button rules)

| State | Tokens (resolves per variant) |
|---|---|
| Default | variant defaults (see table above) |
| Hover | `--btn-primary-bg-hover` (Primary) / `--btn-secondary-bg-hover` = `Brand/Primary @ 5%` over `Surface/Card` + border `--btn-secondary-border-hover` (Secondary — see [`colors.md`](colors.md) for why a brand tint replaced the earlier `State/Hover`) / `var(--btn-outline-bg-hover)` (Outlined + Tertiary, + `Brand/Primary_Hover` border on Outlined) |
| Pressed | `--btn-primary-bg-press` / `State/Pressed` / `Brand/Primary @8%` — bg-shift only, no transform or shadow (Outline also keeps the `Brand/Primary_Hover` border from hover) |
| Focus | every variant (incl. Destructive Outlined) uses the single `--shadow-focus` ring — 2px + 2px `Surface/Card` gap, brand-teal halo via `--focus-ring`. Destructive carries its red identity on the border, not the ring; the teal ring already avoids red-on-red |
| Disabled | bg `State/Disabled` (Primary/Secondary) or icon `Text/Inactive` (Outlined/Tertiary, bg transparent) |
| Loading | spinner (`.spinner`) uses `currentColor`, `aria-busy="true"`, `pointer-events:none`, `opacity:var(--opacity-disabled)` — variant colour preserved. `.s-loading.iconbtn{pointer-events:none;opacity:var(--opacity-disabled)}` |

**Spinner geometry** (shared with Button — `.iconbtn .spinner`): `width/height .85em`, `border-radius:9999px`, `border:2px solid currentColor` with `border-right-color:transparent`, `display:inline-block`, `animation:btn-spin .7s linear infinite`, `vertical-align:-.1em`.

**Forced-state vs real-interactive** — every state above is implemented twice and the two MUST agree: the `.s-{state}` forced classes (storybook demos) and the live pseudo-classes `:hover` / `:active` / `:focus-visible` / `:disabled`. `:focus-visible` also sets `outline:none` before the ring box-shadow.

## Prod baseline

Prod ships a single IconButton style (≈ Secondary's new look — neutral border, card bg, hover recolours icon to accent). The Primary, Outlined, and Tertiary variants are new; their "Current (prod)" cells in the kit show `— did not exist`.

## Diff from prod (Secondary — the variant that mostly matches the existing prod look)

| Property | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Border default | `border` `#F0F5FA` | `Stroke/Border` `#E2E8F0` (Slate-200) | `--btn-secondary-border` (Slate-300 light / Grey-600 dark — see [Button](Button.md)) | Aligns with Button Secondary border token; slightly darker than Slate-200 for improved contrast |
| Hover icon | `accent` `#07827F` | unchanged (icon stays `Text/Body`); bg shifts to `--btn-secondary-bg-hover` | — (no change from v1.0) | Icon colour itself unchanged; bg affordance carries the hover |
| Hover border | `Stroke/Border_Hover` | `Stroke/Border_Hover` (kept) | `--btn-secondary-border-hover` | Token-aligned; resolves to same value as `Stroke/Border_Hover` |
| Disabled | `border-gradient-inner-border`, icon `content-light` | bg `State/Disabled`, icon `Text/Inactive` | — (no change from v1.0) | Mirrors Button Secondary disabled recipe |

## Tooltip

| Property | Current (prod) | Expected | Specification |
|---|---|---|---|
| Tooltip on hover | — no tooltip | `[data-tip]` CSS-only bubble above the button | Required — icon-only buttons must label themselves |
| Enter delay (cold) | — | 300 ms (`transition-delay: .3s` on `:hover::after`) | First tooltip in a session; gives the eye time to land before the overlay appears |
| Enter delay (warm) | — | 0 ms (`.tt-warm [data-tip]:hover::after` — no delay) | Subsequent tooltips within 600 ms of leaving a previous one; keeps fast scanning fluid |
| Leave duration | — | 100 ms (`transition: opacity .1s, transform .1s` on resting `::after`) | Short fade — the bubble exits before the eye chases it |
| Warm-up window | — | 600 ms (JS `setTimeout` clears `.tt-warm` on `<body>`) | CSS reads `.tt-warm` body class; JS sets it on `mouseout` of any `[data-tip]` and clears after 600 ms with no new hover |

## No change (—)
Size 36×36, radius `md 6px`, icon ≤18px typical (consumer-set / flexible by design — no base CSS rule; see Base geometry table), transition .12s.

## Contextual size overrides (consumer-scoped, not part of the base)

The base `.iconbtn` is always 36×36; specific layouts shrink it via a scoping class. These are documented for completeness — the base spec is unchanged.

| Context | Selector | Override |
|---|---|---|
| Table row actions | `.mx-tbl-actions .iconbtn` | `width/height 1.625rem` (26px), `opacity:0` at rest, `transition:opacity .12s`; revealed on `tr:hover` (`opacity:1`). Glyph: `.mx-tbl-actions .iconbtn svg{width:12px;height:12px}`. Hover `background:var(--state-pressed)`, active `background:color-mix(in srgb,var(--brand-primary) 12%,transparent)`, both `color:var(--ink)`. Child-metric rows force `opacity:1`. |
| Autocomplete clear | `.acpl .acpl-end .iconbtn-mini` | Separate `.iconbtn-mini` (not `.iconbtn`): 24×24, transparent, borderless, `color:var(--ink-secondary)`, radius 4px; hover `color:var(--brand-primary)`. |
| Data-source card | `.ds-card .iconbtn` | `background:var(--bg)` (matches card surface). |
| Sidebar collapse / chat-more | `.sbx-collapse`, `.sbx-chat-more` | Use `.iconbtn iconbtn-tertiary` + scoping class; inherit colour/hover/pressed/focus from `.iconbtn-tertiary`, override only size + (for chat-more) absolute positioning / opacity-reveal. |

## Token reuse note

Every IconButton state resolves to a Button-level token. If a downstream colour change to `--btn-primary-bg` is made, both Button Primary and IconButton Primary update in lock-step — no parallel IconButton token file is required.
