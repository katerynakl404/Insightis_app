# IconButton — prod → expected

Source: `@insightis/ui` `Button/index.tsx` (cva) + `globals.css`.

**IconButton mirrors the full Button variant set — Primary / Secondary / Outlined / Tertiary / Destructive Outlined** — each reusing the corresponding Button tokens 1:1. No IconButton-specific colour tokens are introduced. The CSS base (`.iconbtn`) is stripped down to shape/size only; colour comes from the variant class.

## Base geometry (`.iconbtn` — shape/size only)

| Property | Value | Notes |
|---|---|---|
| Display / layout | `display:inline-flex; align-items:center; justify-content:center` | Centers the glyph in the square box. |
| Width × Height | `2.25rem` × `2.25rem` (36 × 36px) | Base = the `md` step. Square footprint. A size class picks another step — see **Sizes** below. |
| Radius | `.375rem` (6px) | Matches Button `md`. |
| Border | `1px solid transparent` | Variant class supplies the visible colour. |
| Cursor | `pointer` (`not-allowed` when `:disabled`) | Set on base; disabled variants override to `not-allowed`. |
| Flex | `flex:none` | **Added** — the box is a fixed-size square and must never be squashed by the flex row it sits in (`.dlg-hdr`, `.meta-row-end`, `.cp-fp-head`). 29 consumers across 9 pages were hand-adding this inline alongside an inline size; both are now the base plus a ladder class. |
| Font | `font-family:inherit` | No own type tokens — icon-only, no text. |
| Transition | `all .12s` | Matches Button. |
| Icon glyph | `16px` (`14px` on the two smallest steps) | **Changed** — see the Sizes section for why the "consumer-set glyph" contract had to go. |

### DOM / markup contract

```html
<button class="iconbtn iconbtn-{variant} [iconbtn-{size}]" aria-label="Add" data-tip="Add">
  <svg viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2"><path d="…"/></svg>
</button>
```

- Root element: `<button>` (or `<span class="iconbtn …">` when nested inside another button, e.g. `.sbx-chat-more` inside a chat row). Always carries `class="iconbtn iconbtn-{variant}"` — base class + exactly one variant class.
- **`aria-label` is required** — icon-only control has no text. Add `data-tip` for the hover tooltip (see Tooltip section); typically mirrors the `aria-label`.
- Icon is an **inline `<svg>`** with `viewBox="0 0 24 24"` and `stroke="currentColor"` (the box sizes the glyph — do not put `width`/`height` on the SVG) (or `fill="currentColor"` for solid glyphs) so the glyph inherits the variant's `color`. No `<img>` / icon-font.
- Loading: add `s-loading` (forced-state demo) / `aria-busy="true"` and replace the glyph with `<span class="spinner"></span>`.

## Sizes  *(new — the ladder `.iconbtn` did not have)*

| Class | Box | Glyph | Mirrors |
|---|---|---|---|
| `.iconbtn.is-row` | 24 × 24 | 14px | — (one step **below** Button) |
| `.iconbtn-xs` | 28 × 28 | 14px | `.btn-xs` |
| `.iconbtn-sm` | 32 × 32 | 16px | `.btn-sm` |
| `.iconbtn-md` | 36 × 36 | 16px | `.btn-md` — same as the base, explicit for symmetry |
| `.iconbtn-lg` | 40 × 40 | 16px | `.btn-lg` |
| `.iconbtn-xl` | 44 × 44 | 16px | `.btn-xl` |

Radius tightens to `.25rem` on the two smallest steps so a 24px box does not read as a pill.

> **Why the ladder.** Button shipped five sizes and IconButton shipped one, so every surface that
> needed a smaller icon button wrote its own size rule — `.cp-fp-actions .iconbtn` at 28px, and a
> `.mx-tbl-actions .iconbtn` 24px branch that turned out to be **dead** (every row carrying those
> buttons is a `.mx-metric-child`, which re-overrode it back to 36px, so four size declarations
> existed only to cancel each other out), plus the molecules (`.cl-attach` 32, `.sbx-collapse` 28,
> `.chat-row-more` / `.sbx-chat-more` / `.toast-x` / `.sht-x` / `.igrp-clear` at 24) each carrying
> its own box **and** its own glyph size. The
> steps now match Button step for step, so an icon-only control lines up with a text button of the
> same size class. `.is-row` is deliberately outside that ladder: 24px is under the 28px minimum a
> text button needs to stay tappable, but an icon-only control gets there on the padded box around
> a 14px glyph, and 24px is the size eight row-action controls already use.

> **Why the base glyph rule.** This doc used to state that glyph size was *"flexible /
> consumer-set by design — no base `.iconbtn svg{...}` rule"*. Measured in the live storybook, that
> contract was not holding, in two separate ways. `.btn` has always had `.btn svg{16px; flex:none}`
> and `.iconbtn` had no counterpart, so:
>
> 1. **Icons with no size at all stretched.** The glyph is a replaced element with a 1:1 `viewBox`
>    and no intrinsic size, so it took whatever the box left over — the same bare `.iconbtn`
>    rendered **22×22, 18×18, 16×16 and 14×14** in different demos.
> 2. **Icons with a correct size got shrunk below it.** The missing half was `flex:none`: the svg is
>    a flex item inside an `inline-flex` box, so `.sbx-chat-more`, `.toast-x`, `.sht-x` and
>    `.igrp-clear` all rendered **non-square 10×14** even though each declared a clean `14px × 14px`.
>    Their rules were never wrong — flex-shrink was overriding them.
>
> `.iconbtn svg{16px; flex:none}` now mirrors `.btn svg`, with 14px on `.is-row` / `.iconbtn-xs` the
> way `.btn-xs svg` does. Consumers that genuinely need a different glyph still override the size;
> what they can no longer do is leave it unspecified, or have a correct value silently compressed.

## Variants

Variants differ in colour only, all reusing Button tokens 1:1. **No per-variant geometry deviation** — size is a separate axis (see Sizes). The only token-level deviation across the set is the **focus-ring exception** on Destructive Outlined (see States table).

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
| Hover | `--btn-primary-bg-hover` (Primary) / bg `--state-hover` (neutral — **not** a brand tint; agreed 2026-07-17) + border `--btn-secondary-border-hover` (Secondary) / `var(--btn-outline-bg-hover)` (Outlined + Tertiary, + `Brand/Primary_Hover` border on Outlined) |
| Pressed | `--btn-primary-bg-press` / `State/Pressed` / `Brand/Primary @8%` — bg-shift only, no transform or shadow (Outline also keeps the `Brand/Primary_Hover` border from hover) |
| Focus | every variant (incl. Destructive Outlined) uses the single `--shadow-focus` ring — 2px + 2px `Surface/Card` gap, brand-teal halo via `--focus-ring`. Destructive carries its red identity on the border, not the ring; the teal ring already avoids red-on-red |
| Disabled | bg `State/Disabled` (Primary/Secondary) or icon `Text/Inactive` (Outlined/Tertiary, bg transparent) |
| Loading | spinner (`.spinner`) uses `currentColor`, `aria-busy="true"`, `pointer-events:none`, `opacity:var(--opacity-disabled)` — variant colour preserved. `.s-loading.iconbtn{pointer-events:none;opacity:var(--opacity-disabled)}` |

**Spinner geometry** (shared with Button — `.iconbtn .spinner`): **`16px`, and `14px` on `.is-row` / `.iconbtn-xs`** — the spinner replaces the glyph, so it is the glyph size, on the same two steps as `.btn svg`. It was `.85em`, which measured from a font-size an icon button does not have: the UA form-control default (13.33px in Chrome), giving a frozen ~11.3px. Even where the em resolved, `.85` could not land on the scale — 11.9px and 13.6px. Now both spinner and glyph step together, `border-radius:9999px`, `border:2px solid currentColor` with `border-right-color:transparent`, `display:inline-block`, `animation:btn-spin .7s linear infinite`, `vertical-align:-.1em`.

**Forced-state vs real-interactive** — every state above is implemented twice and the two MUST agree: the `.s-{state}` forced classes (storybook demos) and the live pseudo-classes `:hover` / `:active` / `:focus-visible` / `:disabled`. `:focus-visible` also sets `outline:none` before the ring box-shadow.

## Prod baseline

Prod ships a single IconButton style (≈ Secondary's new look — neutral border, card bg, hover recolours icon to accent). The Primary, Outlined, and Tertiary variants are new; their "Current (prod)" cells in the kit show `— did not exist`.

## Diff from prod (Secondary — the variant that mostly matches the existing prod look)

| Property | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Border default | `border` `#F0F5FA` | `Stroke/Border` `#E2E8F0` (Slate-200) | `--btn-secondary-border` (Slate-300 light / Grey-600 dark — see [Button](Button.md)) | Aligns with Button Secondary border token; slightly darker than Slate-200 for improved contrast |
| Hover icon | `accent` `#07827F` | unchanged (icon stays `Text/Body`); bg shifts on hover | bg `--state-hover` (neutral — the v1.0 brand-tint hover was reverted; agreed 2026-07-17) | Icon colour itself unchanged; bg affordance carries the hover |
| Hover border | `Stroke/Border_Hover` | `Stroke/Border_Hover` (kept) | `--btn-secondary-border-hover` | Token-aligned; resolves to same value as `Stroke/Border_Hover` |
| Disabled | `border-gradient-inner-border`, icon `content-light` | bg `State/Disabled`, icon `Text/Inactive` | — (no change from v1.0) | Mirrors Button Secondary disabled recipe |

## Tooltip

| Property | Current (prod) | Expected | Specification |
|---|---|---|---|
| Tooltip on hover | — no tooltip | `[data-tip]` CSS-only bubble above the button | Required — icon-only buttons must label themselves |
| Enter delay | — | 300 ms, **unconditional** | Gives the eye time to land before the overlay appears. No warm-up / instant re-show — see [Tooltip.md](Tooltip.md) |
| Leave duration | — | 100 ms (`transition: opacity .1s, transform .1s` on resting `::after`) | Short fade — the bubble exits before the eye chases it |
| Hide on `mousedown` | — | immediate | A clicked icon button often re-renders itself while hovered, so no `mouseout` fires and the tip would linger |
| Accessible name | — | `aria-label` **and** `data-tip`, both required | An icon-only button must label itself for pointer users (tip) and assistive tech (label). Where the two differ, the tip stays short and the `aria-label` carries the fuller, disambiguating phrase (e.g. tip "Copy" / label "Copy arguments"); state-flipping controls update both together |

## No change (—)
Size 36×36, radius `md 6px`, transition `.12s`. (Glyph sizing is **no longer** in this list — it changed; see Base geometry and the Sizes section.)

## Contextual size overrides (consumer-scoped, not part of the base)

The base `.iconbtn` is always 36×36; specific layouts shrink it via a scoping class. These are documented for completeness — the base spec is unchanged.

| Context | Selector | Override |
|---|---|---|
| Table row actions | `.mx-tbl-actions .iconbtn` | `width/height 1.5rem` (24px), `opacity:0` at rest, `transition:opacity var(--motion-fast)`; revealed on `tr:hover` (`opacity:1`). Glyph: `.mx-tbl-actions .iconbtn svg{width:14px;height:14px}`. Hover `background:var(--state-pressed)`, active `background:color-mix(in srgb,var(--brand-primary) 12%,transparent)`, both `color:var(--ink)`. Child-metric rows force `opacity:1`. |
| Autocomplete clear | `.acpl .acpl-end .iconbtn-mini` | Separate `.iconbtn-mini` (not `.iconbtn`): 24×24, transparent, borderless, `color:var(--ink-secondary)`, radius 4px; hover `color:var(--brand-primary)`. |
| Data-source card | `.ds-card .iconbtn` | `background:var(--bg)` (matches card surface). |
| Sidebar collapse / chat-more | `.sbx-collapse`, `.sbx-chat-more` | Use `.iconbtn iconbtn-tertiary` + scoping class; inherit colour/hover/pressed/focus from `.iconbtn-tertiary`, override only size + (for chat-more) absolute positioning / opacity-reveal. |

## Token reuse note

Every IconButton state resolves to a Button-level token. If a downstream colour change to `--btn-primary-bg` is made, both Button Primary and IconButton Primary update in lock-step — no parallel IconButton token file is required.
