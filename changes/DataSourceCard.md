# Data Source Card — prod → expected

Connector-catalog card used on the [Data Sources → Connections](../pages/concept/data-sources_connections-landing.html) page. Storybook section: `#dscard` in [`../insightis-preview-kit.html`](../insightis-preview-kit.html).

> **New component — no prod equivalent.** The Connections catalog did not ship this card on prod; the storybook Current column is **⚠ pending capture** for every state. The Expected column below is the agreed contract, derived from the live mockup CSS/JS in `pages/concept/data-sources_connections-landing.html` (the `.ds-card` rules + `dsCardHtml()` / `dsMarkWrap()` builders). Treat an empty Current cell as "not yet measured", not "did not exist".

> **CSS location.** All `.ds-card` / `.ds-conn-row` component CSS lives in `pages/kit-theme.css` (block `/* ===== Data source card (ds-card / ds-conn-row) ===== */`, after the ProviderCard `.prov-*` rules). Only page-composition rules — the grid column counts (`.ds-grid`, `.ds-app.ds-v2/.ds-v3 .ds-grid`), the category bar (`#ds-cats`), and the Connected-section show/hide animation (`.ds-conn-section`, tied to `.ds-app.has-connections` page state) — remain in the page `<style>` block, since they encode page-state layout rather than the component itself.

## Variants

One builder — `dsCardHtml(c)` — emits the same `.ds-card` markup for every variant. The active variant is selected by the class on the **grid container** `.ds-app` (`.ds-v1` horizontal row · `.ds-v2` compact tile · `.ds-v3` large tile), which re-scopes the card's layout. Connected connectors are always excluded from the catalog (they live in the separate Connected list).

| Variant | Container class | Layout | Logo size | Tile height | Connect affordance |
|---|---|---|---|---|---|
| Style 1 — horizontal row | `.ds-app.ds-v1` (base `.ds-card`) | `flex` row, logo + name + (hover Connect) | `3rem` | auto (`.75rem .875rem` pad) | `.ds-card-hover` is `display:none` at base → no Connect surface in v1 (see note) |
| Style 2 — compact tile | `.ds-app.ds-v2` | vertical, centered | `2.75rem` | `7.5rem` fixed | hover/tap scrim reveals `.ds-card-connect` |
| Style 3 — large tile | `.ds-app.ds-v3` | vertical, centered | `3.5rem` | `9.5rem` fixed | hover/tap scrim reveals `.ds-card-connect` |

> **⚠ Storybook vs. builder divergence (Style 1).** The storybook `#dscard` Style-1 preview shows an always-visible `btn btn-sm btn-tertiary` `+` button on each row, but the live `dsCardHtml()` emits only `.ds-card-hover` (the scrim+Connect block), and base `.ds-card-hover{display:none}` hides it entirely in v1. So as built, v1 rows currently have **no** Connect button. This is an unresolved contract conflict — surface it before relying on either reading; do not silently pick one.

## Self-reproducing spec — base card (`.ds-card`, Style 1 shell)

| Property | Value / token |
|---|---|
| `position` | `relative` (anchors the flame badge + tile scrim) |
| `display` | `flex`; `align-items:center`; `gap:.75rem` |
| `padding` | `.75rem .875rem` |
| `border` | `1px solid var(--border)` |
| `border-radius` | `.5rem` (8px) |
| `background` | `var(--card)` |
| `box-shadow` (rest) | `var(--shadow-rest)` = `0 1px 2px 0 rgba(15,23,42,.03)` (ghost depth) |
| `transition` | `box-shadow .18s, border-color .18s, transform .18s` |
| `cursor` | `pointer` (set inline in markup; whole card is the tap target) |
| `role` | `listitem` |

### Sub-parts

| Sub-part | Class | Spec |
|---|---|---|
| Logo wrapper | `.ds-logo-wrap` | inline span, `position:relative; flex:none; display:inline-flex` (anchors the flame badge) |
| Connector logo | `.logo-spr.<slug>` | plain sprite, **no container / border / backing**; `--logo-size:3rem` (base/v1). Defined in [`kit-theme.css`](../pages/kit-theme.css) `.logo-spr`. |
| Body | `.ds-card-body` | `flex:1; min-width:0; display:flex; flex-direction:column; gap:.125rem` |
| Head row | `.ds-card-head` | `display:flex; align-items:center; gap:.375rem; min-width:0` |
| Name | `.ds-card-name` | `font-size:.875rem` (14px) · `line-height:1.25rem` (20px) · `font-weight:400` · `color:var(--ink)`. Maps to Typography **text-sm** — see [`../current/typography.md`](../current/typography.md). Name only — no category, no description. |

## Hover — elevation lift (LOCKED recipe, all variants)

`.ds-card:hover`:

| Property | Value / token |
|---|---|
| `box-shadow` | `var(--shadow-lift-hover)` = `0 6px 16px -3px rgba(15,23,42,.09), 0 2px 4px -1px rgba(15,23,42,.05)` |
| `border-color` | `var(--card-lift-border)` = `color-mix(in srgb, var(--brand-primary) 22%, var(--border))` |
| `transform` | `translateY(-1px)` |

This is the **lift-family** hover (deeper shadow + lift + 22% brand-tinted border over `--border`), shared with [`.prov-card` / `.hov-card`](ProviderCard.md). It is **not** the flat card-row hover (`--state-hover` bg + 25% tint over transparent) used by `.chat-row` / `.ds-conn-row`. Catalog tiles lift; list rows tint. Do not swap one for the other.

## Style 2 / Style 3 — tile overrides

Scoped under `.ds-app.ds-v2 .ds-card` (and `.ds-v3`). Base shell otherwise inherited.

| Property | Style 2 (`.ds-v2`) | Style 3 (`.ds-v3`) |
|---|---|---|
| `flex-direction` | `column` | `column` |
| `align-items` / `justify-content` | `center` / `center` | `center` / `center` |
| `text-align` | `center` | `center` |
| `gap` | `.5rem` | `.5rem` |
| `padding` | `.875rem .75rem` | `1.25rem 1rem` |
| `height` | `7.5rem` (fixed) | `9.5rem` (fixed) |
| logo `--logo-size` | `2.75rem` | `3.5rem` |
| `.ds-card-name` | `.875rem`/`1.25rem`, 2-line clamp | `1rem`/`1.5rem`, 2-line clamp |
| `.ds-card-body` | `flex:0 0 auto; align-items:center` | `flex:0 0 auto; align-items:center` |
| `.ds-card-head` | `justify-content:center` | `justify-content:center` |

Name clamp (both tiles): `display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden` — long names cap at 2 lines without growing the fixed-height tile.

Grid container (set on `.ds-grid`, not the card): v2 `grid-template-columns:repeat(auto-fill,minmax(7.5rem,1fr)); gap:.5rem` · v3 `repeat(auto-fill,minmax(max(10rem,(100% - 5 * .75rem)/6),1fr)); gap:.75rem` (caps at 6/row).

## Hover scrim + Connect reveal (tile variants only)

Base `.ds-card-hover{display:none}`. In v2/v3 it becomes a full-cover scrim:

| Element | Property | Value / token |
|---|---|---|
| `.ds-card-hover` (scrim) | layout | `display:flex; align-items:center; justify-content:center; position:absolute; inset:0; border-radius:inherit` |
| | `background` | `color-mix(in srgb, var(--card) 78%, transparent)` |
| | rest | `opacity:0; pointer-events:none` |
| | transition | `opacity var(--motion-slow) var(--motion-ease)` = `240ms cubic-bezier(.4,0,.2,1)` |
| `.ds-card-connect` (button) | rest | `transform:translateY(.375rem)` |
| | transition | `transform var(--motion-slow) var(--motion-ease)` |
| `.ds-card-connect span` | label gap | `margin-left:.25rem` |

Reveal trigger: `.ds-card:hover` **and** `.ds-card:focus-within` → scrim `opacity:1; pointer-events:auto`, button `translateY(0)` (slide-up).

**Touch / no-hover** (`@media (hover:none)`): hover is unavailable, so the same reveal is driven by `.is-active` (added on first tap via `dsCardTap()`); tapping the scrim again or another tile removes it. On a hover-capable device a body tap connects directly (scrim already revealed).

## Popular marker — flame badge

Rendered by `dsMarkWrap(c)` only when `c.popular === true`, overlaid on the logo wrapper's top-right corner:

- 18px circle: `position:absolute; top:-5px; right:-5px; width:18px; height:18px; border-radius:50%`
- `background:var(--card)`; white ring `border:1.5px solid var(--card)`
- contains a red flame SVG (`fill:var(--popular-flame)`, 18px), `aria-label="Popular"`

> **Resolved — single live marker, tokenised flame.** The dead `STAR_SVG` sparkle (`.ds-popular`, `--fb-attention`) has been removed (CSS rule + JS var); the flame badge built by `dsMarkWrap()` / `FLAME_BADGE` is the sole popular marker. Its colour now flows through the semantic token `--popular-flame` (`= --red-500`, defined in `kit-theme.css`) instead of the raw `#ef4444`, in both the page JS and the storybook preview.

## Lazy-load / pagination

Catalog paginates at `perPage = 18`. When more items remain, a `.ds-load-sentinel` (`grid-column:1/-1; height:1px; margin:0; padding:0`) is appended after the last card; an `IntersectionObserver` (`rootMargin:200px`) increments `STATE.page` and appends the next page without re-rendering existing cards. Observer disconnects when no items remain. Category/search filter resets `STATE.page = 1` and rebuilds the grid.

## Composition — embedded kit components

Stated as component + variant only; not re-documented here.

- **Connector logo** — `.logo-spr.<slug>` sprite, plain (no container). Spec in [`../pages/kit-theme.css`](../pages/kit-theme.css). Size set per-variant via `--logo-size`.
- **Connect button (tile scrim)** — `btn btn-sm btn-secondary` + `.ds-card-connect` modifier (slide-up reveal). Button base/variants → [`Button.md`](Button.md).
- **Connect button (Style 1, per storybook preview)** — `btn btn-sm btn-tertiary`, icon-only `+`, `aria-label="Connect"`. See the divergence note above — not emitted by the current builder.

## No change (—)

n/a — new component. Shares the lift hover with [`ProviderCard.md`](ProviderCard.md) and the row-list surface with [`DataSourcesFiles.md`](DataSourcesFiles.md) (page-level); neither is re-specified here.

## Token map used

`--card` (surface + scrim mix base) · `--border` (rest border) · `--ink` (name) · `--shadow-rest` (rest ghost depth) · `--shadow-lift-hover` (hover lift) · `--card-lift-border` (hover border = 22% `--brand-primary` over `--border`) · `--brand-primary` (via the lift-border mix) · `--motion-slow` (240ms scrim/button transition) · `--motion-ease` (`cubic-bezier(.4,0,.2,1)`) · `--popular-flame` (`= --red-500`, popular-flame badge fill). Logo via `.logo-spr` sprite. New token added: `--popular-flame` (semantic, references the existing `--red-500` primitive) for the popular flame badge.

## Accessibility / consistency self-check

- **Hover recipe parity** — uses the locked lift recipe (`--shadow-lift-hover` + `--card-lift-border` + `translateY(-1px)`) identical to `.prov-card` / `.hov-card`; no per-card overrides. ✓
- **Keyboard reveal** — tile scrim opens on `:focus-within`, so the Connect button is reachable without a pointer. ✓ (verify the card/button is in the tab order.)
- **Touch parity** — `@media (hover:none)` `.is-active` mirrors the desktop hover reveal; no hover-only dead-ends. ✓
- **Popular not by colour alone** — "Popular" is conveyed by the badge **shape/icon** plus `aria-label="Popular"` (and `data-tip` on the sparkle variant), not colour alone — passes WCAG 1.4.1. ✓
- **Name contrast** — `--ink` on `--card` meets AA. ✓
- **Token discipline — flame badge tokenised.** `FLAME_BADGE` now fills with `var(--popular-flame)` (semantic token → `--red-500` primitive) instead of raw `#ef4444`; colour flows through all three token layers per the colour-token discipline rule. ✓
- **⚠ Style-1 Connect affordance** — as built, v1 rows expose no Connect surface (`.ds-card-hover` hidden, no tertiary button emitted). Resolve against the storybook preview. ✗
- **Dead popular marker removed** — `.ds-popular` CSS rule + `STAR_SVG` JS var (both unreferenced) deleted per the cascading-delete rule; the flame badge is the sole popular marker. ✓
