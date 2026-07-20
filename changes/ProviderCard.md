# Provider Card — prod → expected

Storybook: `#prov-card` in [`../insightis-preview-kit.html`](../insightis-preview-kit.html). New component — no `current/` baseline.

**Current (prod):** — no prod equivalent (new component). The change is its **introduction**.

Data-source / integration card used in empty-state provider grids. Composed of: brand-tinted icon wrapper, name + connection-status row, an (optional, currently hidden) divider + metrics-label, a `chip-meta` chip row, and a full-width CTA footer. A ghost-dashed **Browse variant** (`.is-browse`) presents a centred "explore more" prompt. The card reuses the **[Chip](Chip.md)** (`chip-meta` variant) and **[Button](Button.md)** (`btn-primary btn-sm`) components — see Composition.

This card uses the repo's **locked card-hover recipe** (shared lift family with `.hov-card`, `.ds-card`). Document it exactly as below; do not re-derive.

---

## Container — `.prov-card`

| Property | Value | Token / utility |
|---|---|---|
| display | `flex; flex-direction: column` | — |
| gap | `0.75rem` (12px) | — |
| padding | `1rem 1.125rem` (16px / 18px) | — |
| background | `var(--card)` | Surface/Card |
| border | `1px solid var(--border)` | Stroke/Border |
| radius | `0.75rem` (12px) | — |
| shadow (rest) | `var(--shadow-rest)` = `0 1px 2px 0 rgba(15,23,42,.03)` | ghost depth |
| transition | `box-shadow .18s, border-color .18s, transform .18s` | ≈ `--motion-base` |

### States (LOCKED card-hover recipe — shared lift family)
| State | Spec |
|---|---|
| **Rest** | bg `var(--card)`, border `var(--border)`, shadow `var(--shadow-rest)` |
| **Hover** | `box-shadow: var(--shadow-lift-hover)` (`0 6px 16px -3px rgba(15,23,42,.09), 0 2px 4px -1px rgba(15,23,42,.05)`); `border-color: var(--card-lift-border)` (`color-mix(in srgb, var(--brand-primary) 22%, var(--border))`); `transform: translateY(-2px)`; `will-change: transform` |
| **Focus** | `outline: none; box-shadow: var(--shadow-focus)` (2px card gap + 2px `--focus-ring` halo) |

> Note: the lift family uses `--card-lift-border` (22% brand tint **over** `--border`), distinct from the flat-row family's `--card-border-hover` (25% over transparent). The provider card lifts `translateY(-2px)`; `.hov-card` lifts `-1px`. Both share `--shadow-lift-hover`. Do not substitute `border-color: var(--border-hover)` — that token is reserved for form inputs.

---

## Grid — `.prov-card-grid`
`display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: .875rem` (14px). Content-aware reflow — no viewport breakpoints, sidebar-safe.

---

## Head — `.prov-card-head`
`display: flex; align-items: center; gap: .875rem` (14px). Holds the icon wrapper + info column.

### Icon wrapper — `.prov-ic-w` *(LOCKED bg token)*
| Property | Value | Token |
|---|---|---|
| size | `2.75rem × 2.75rem` (44×44) | — |
| radius | `0.625rem` (10px) | — |
| border | `1px solid var(--border)` | Stroke/Border |
| background | `var(--icon-wrapper-bg)` = `color-mix(in srgb, var(--brand-primary) 5%, var(--bg))` | **LOCKED** — 5% brand tint over page bg |
| shadow | `0 1px 3px rgba(15,23,42,.08)` | — |
| layout | `display:flex; align-items:center; justify-content:center; flex:none; overflow:hidden` | — |
| `img` child | `1.625rem × 1.625rem` (26px), `object-fit: contain` | — |
| `.is-azure` modifier | `background:#0078D4; border-color:#0078D4; color:#fff; font-size:.5rem; font-weight:700` | branded full-fill exception (Azure) |

> `--icon-wrapper-bg` is shared with `.mx-prov-ic` (metrics-table rows). Changing it requires updating both components + this doc.

### Info column — `.prov-card-info`
`flex:1; min-width:0; display:flex; flex-direction:column; align-items:flex-start`.

| Part | Class | Spec |
|---|---|---|
| Name | `.prov-card-name` | `font-weight:600; font-size:.875rem` (14px); `color:var(--ink)` (Text/Body); `line-height:1.25`; `margin:0 0 .125rem`; truncated (`white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:100%`) |
| Status row | `.prov-card-status` | `display:inline-flex; align-items:center; gap:.25rem` (4px) |
| Status dot | `.prov-card-dot` | `.4375rem × .4375rem` (7px); `border-radius:9999px`; `background:var(--ink-inactive)`; `flex:none; display:inline-block`. (Storybook overrides bg inline per status; default = inactive grey.) |
| Status text | `.prov-card-status-text` | `font-size:.75rem` (12px); `color:var(--ink-secondary)` (Text/Secondary) |

---

## Divider + metrics label — intentionally not rendered (reserved markup)

The divider and metrics label are **intentionally hidden** in the current card design — `display:none` is by design, not a bug or discrepancy. The storybook markup keeps the `<hr>` + label elements as **reserved markup** (so the treatment can be re-enabled later), but the current design deliberately renders neither.

| Part | Class | Spec |
|---|---|---|
| Divider | `.prov-card-divider` | **`display:none`** (intentional — not rendered in the current design). Reserved markup; when re-enabled it is a 1px `border-top` rule. |
| Metrics label | `.prov-card-metrics-label` | **`display:none`** (intentional — not rendered in the current design). Reserved markup; intended treatment when shown: small-caps uppercase label in `--ink-inactive`. |
| Spacer rule | `.prov-card-divider + div` | `flex:1` — the element following the divider grows to push the footer to the card bottom (keeps CTA bottom-aligned regardless of chip count). |

> Live behaviour (by design): divider + label are not rendered; the metrics `chip-meta` row sits directly under the head, the `+ div{flex:1}` spacer fills remaining height, footer pins to the bottom. The storybook rendering the elements while CSS hides them is the intended reserved-markup pattern, not a kit/storybook mismatch.

---

## Metrics chips — `.chip-meta` (reused Chip variant)
See **Composition** — `chip-meta` is the [Chip](Chip.md) component's metric variant; not re-documented here. Layout wrapper inside the card: `.prov-card .chip-row` → `gap:.25rem` (4px); `flex-wrap:wrap; overflow:visible; align-items:center` (all chips always visible, wrap freely). Each chip carries a trailing `.chip-meta-arrow` (10×10, `color:var(--brand-primary)`).

---

## Footer — `.prov-card-footer` (CTA)
`display:flex; align-items:center; justify-content:flex-end; gap:.5rem`. The button stretches full width: `.prov-card-footer .btn{width:100%}`. CTA is a [Button](Button.md) `btn-primary btn-sm` — not re-documented; only deviation is the `width:100%` stretch applied by the footer.

---

## Browse variant — `.prov-card.is-browse`

Ghost-dashed "explore more" card. Differences from the default card:

| Property | Default `.prov-card` | `.is-browse` override |
|---|---|---|
| alignment | column, top-aligned | `align-items:center; justify-content:center; text-align:center` |
| background | `var(--card)` | `var(--bg)` (page bg — recedes) |
| border | `1px solid var(--border)` | `1.5px dashed color-mix(in srgb, var(--ink-secondary) 35%, transparent)` |
| cursor | (none) | `pointer` |
| **Hover** | lift shadow + `translateY(-2px)` + brand border | `background:var(--state-hover)`; `transform:none`; `box-shadow:none`; `border-color:color-mix(in srgb, var(--ink-secondary) 55%, transparent)` (no lift, just dash darken + tint) |

### Browse sub-parts
| Part | Class | Spec |
|---|---|---|
| Icon | `.prov-card-browse-ic` | `2.5rem × 2.5rem` (40px) dashed circle; `border-radius:9999px`; `border:1.5px dashed color-mix(in srgb, var(--ink-secondary) 45%, transparent)`; centred (`display:flex; align-items:center; justify-content:center`); `color:var(--ink-secondary)`; `flex:none; margin:0 auto .75rem` |
| Label | `.prov-card-browse-label` | `font-size:.875rem` (14px); `font-weight:600`; `color:var(--ink-secondary)`; `margin:0 0 .25rem` |
| Sub | `.prov-card-browse-sub` | `font-size:.75rem` (12px); `color:var(--ink-inactive)`; `margin:0` |

---

## Composition (reused components — not re-documented)

| Embedded | Component | Variant / size | Deviation |
|---|---|---|---|
| Metrics chips | [Chip](Chip.md) | `chip-meta` (metric chip + trailing arrow) | none — wrapper sets `gap` + `flex-wrap` only |
| Footer CTA | [Button](Button.md) | `btn-primary btn-sm` | `width:100%` stretch via `.prov-card-footer .btn` |
| Provider icon | inline SVG / `<img>` in `.prov-ic-w` | — | `.is-azure` brand-fill exception |

---

## Token map

| Token | Value | Layer |
|---|---|---|
| `--card` | Surface/Card | Semantic |
| `--border` | Stroke/Border | Semantic |
| `--bg` | page background | Semantic |
| `--ink` / `--ink-secondary` / `--ink-inactive` | Text/Body · Secondary · Inactive | Semantic |
| `--brand-primary` | brand teal | Semantic |
| `--state-hover` | hover surface | Semantic |
| `--shadow-rest` | `0 1px 2px 0 rgba(15,23,42,.03)` | Component (shadow scale) |
| `--shadow-lift-hover` | `0 6px 16px -3px rgba(15,23,42,.09),0 2px 4px -1px rgba(15,23,42,.05)` | Component (shadow scale) |
| `--shadow-focus` | `0 0 0 2px var(--card),0 0 0 4px var(--focus-ring)` | Component |
| `--card-lift-border` | `color-mix(in srgb, var(--brand-primary) 22%, var(--border))` | Component-scoped |
| `--icon-wrapper-bg` | `color-mix(in srgb, var(--brand-primary) 5%, var(--bg))` | Component-scoped (**LOCKED**, shared w/ `.mx-prov-ic`) |

---

## Accessibility / consistency self-check

- **Hover recipe matches the locked card family** (`.hov-card`, `.ds-card`, `.chat-row`): rest ghost shadow `--shadow-rest`, hover `--shadow-lift-hover` + `--card-lift-border` + `translateY(-2px)`. Not the reserved form-input `--border-hover`. ✔
- **Focus** uses the canonical `--shadow-focus` 2px halo — identical to every other interactive element in the kit. The default card is focusable; the browse variant is `cursor:pointer` and inherits the same focus treatment via `.prov-card:focus-visible`. ✔
- **Colour-token discipline**: every surface/border/text colour flows through a token; the only raw values are the deliberate `.is-azure` brand fill (`#0078D4`) and the dashed-border `color-mix` strengths (35/45/55% over `--ink-secondary`). Repeated overlay strengths in the lift family are tokenised via `--card-lift-border` / `--icon-wrapper-bg`. ✔
- **Status colour ≠ sole signal**: the dot colour is paired with `.prov-card-status-text` ("Not connected" / "Connected") — status is conveyed textually, not by hue alone. ✔
- **Truncation**: `.prov-card-name` ellipsis-truncates; ensure a `title` attribute is added at point-of-use so the full provider name stays available to AT. ⚠ point-of-use
- **Composition over raw**: chips and CTA are kit components (`chip-meta`, `btn-primary btn-sm`), never bare elements. ✔
- **Contrast**: secondary/inactive text on `--card` / `--bg` inherits the kit's AA-verified neutral ramp (Text/Secondary, Text/Inactive). ✔
