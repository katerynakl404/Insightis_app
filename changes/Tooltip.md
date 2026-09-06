# Tooltip — prod → expected

Baseline: [`../current/Tooltip.md`](../current/Tooltip.md).

| State | Current (prod) | Expected | Specification |
|---|---|---|---|
| Default — light mode | bg `chip` / Text-Primary, text hardcoded `#FFF` | bg `--ink`, text `--card` (= `#FFFFFF`) | hex shift only ([colors](colors.md)) — visual result unchanged in light |
| Default — dark mode | ⚠ broken — bg lightens to `--ink` `#F9FAFB` but text stays hardcoded `#FFF` → invisible | **fixed** — bg `--ink` `#F9FAFB`, text `--card` `#17171E` (dark Card surface) | Root cause: hardcoded `color:#fff`, not a missing token. Replaced with `var(--card)` — the same theme-aware token used everywhere else as a surface, used here as text on the inverted ink chip. |
| Max width | `white-space:nowrap`, no cap — the bubble grew to whatever a single line needed | **capped** — `max-width: var(--tip-max-w)` (**18rem / 288px**) + `width: max-content` + `white-space: normal` | See "Max width" below. |
| Inline style → class | every Tooltip occurrence inlined `background:var(--ink);color:#fff;font-size:.75rem;border-radius:6px;padding:4px 8px` | **new** — shared `.tt` class in `pages/kit-theme.css` | Single source of truth — eliminates the chance of the bug recurring in TruncatedTitleTooltip or any future tooltip surface. |

## Concrete dimensions (`.tt`, `pages/kit-theme.css:738`)

`.tt{display:inline-flex; align-items:center; background:var(--ink); color:var(--card); font-size:.75rem; border-radius:6px; padding:4px 8px}`

| Property | Value |
|---|---|
| Font size | **.75rem (12px)** — `text-xs` |
| Padding | **4px top/bottom · 8px left/right** |
| Radius | **6px** (`md`) |
| Background | `--ink` (Text/Primary) |
| Text | `--card` (Surface/Card, theme-aware) |
| Layout | `inline-flex`, vertically centred · no fixed width/height (hugs content) |

No min-width or fixed height — the bubble sizes to its label, up to `--tip-max-w`.

The static `.tt` chip is the **swatch only** (used in storybook previews to show the surface). The real tooltip rendered on a trigger is the `[data-tip]` engine below — they share the same visual recipe (bg `--ink`, text `--card`, `.75rem`, radius 6px, padding 4/8px).

## Max width

The bubble was `white-space: nowrap` with no cap, so its width was whatever one line of the label
needed. That held while every tip was two or three words. It broke the first time a tip carried a
full sentence — the Thinking row's *"Turn on to receive smarter answers. Higher effort means more
thorough answers but higher credit usage"* rendered ~550px wide and ran off a phone viewport.

The JS positioner already clamps the bubble to the viewport, but it clamps **position**, not width:
with an un-cappable width there is nothing for it to clamp back into.

**`--tip-max-w: 18rem` (288px)** — the same width as `.menu.is-md`, so the kit states one
comfortable popover width rather than inventing a second. It sits between the common caps in
shipped systems (Bootstrap 200 · Polaris ~200 · **Carbon 288** · Material/MUI 300 · Atlassian 300).

Three declarations carry it, and all three matter:

| Declaration | Why |
|---|---|
| `max-width: var(--tip-max-w)` | the ceiling |
| `width: max-content` | a short tip still hugs its text instead of stretching to the ceiling |
| `white-space: normal` | long copy wraps rather than being clipped |

It is a **token, not a literal**, because the bubble has two renderers that must agree: the
JS engine node (`pages/kit-kit.js`) and the CSS `[data-tip]::after` fallback. `.tt`, the static
swatch, carries **all three** too — with only `max-width` it collapsed into a narrow column, because a
flex item sizes to fit-content, not max-content, unless told otherwise.

**Blast radius:** of the 48 distinct `data-tip` strings in the kit, **6** are long enough to wrap —
four storybook token-map tips (selector lists), the Connections failure reason, and the Thinking
tip. The other 42 render identically to before.

## Live tooltip engine — `[data-tip]` (`pages/kit-theme.css:743–788`)

Any element carrying a `data-tip="…"` attribute becomes a tooltip anchor; the bubble is rendered by `::after` (CSS fallback) **or** a JS-positioned fixed node (when the engine is active). No separate markup is required — the trigger element is the anchor.

### Anchor + bubble (CSS fallback)

`[data-tip]{position:relative}` — the trigger is the positioning context.

`[data-tip]::after` resting (hidden) state:

| Property | Value |
|---|---|
| Content | `attr(data-tip)` (the attribute text) |
| Position | `position:absolute`; default **top** placement: `bottom:calc(100% + 5px); left:50%` |
| Resting transform | `translateX(-50%) translateY(3px)` (offset down 3px, fades up into place) |
| Background | `var(--ink)` |
| Text | `var(--card)` |
| Font size | `.75rem` (12px, `text-xs`) |
| Font family | `inherit` |
| Font weight | `400` |
| Line height | `1.35` |
| Radius | `6px` (`md`) |
| Padding | `4px 8px` |
| Wrap | `white-space:nowrap` (single line) |
| Pointer events | `none` |
| Opacity | `0` (hidden at rest) |
| Transition | `opacity .1s, transform .1s` (leave timing) |
| Stacking | `z-index:9999` (clears page-shell stacking contexts) |

No arrow — proximity + slide-in are the only visual cues by design.

### Reveal state — `:hover` / `:focus-visible`

`[data-tip]:hover::after, [data-tip]:focus-visible::after`:
- `opacity:1`
- `transform:translateX(-50%) translateY(0)` (settles up into place)
- `transition:opacity .12s .3s, transform .12s .3s` — 300ms delay before show; 100ms leave (from the resting `.1s` transition above).

### Enter delay is unconditional — there is no warm-up

**Every** hover waits the same ~300ms. The former `.tt-warm` "instant re-show within 600ms" path is gone
(CSS rules deleted, JS state removed): a warm-up made rapid successive hovers appear with no delay at all,
which reads as *the delay is broken* rather than as a convenience. One delay, always. Locked — see
[page-changes/data-sources_files-landing.md](../page-changes/data-sources_files-landing.md) rule 23.

### Side variants — `data-tip-side`

Default placement (no attribute) = **top**. Override with `data-tip-side="right|bottom|left"`:

| Side | Resting position | Resting transform | Reveal transform |
|---|---|---|---|
| `right` | `bottom:auto; top:50%; left:calc(100% + 5px)` | `translateY(-50%) translateX(-3px)` | `translateY(-50%) translateX(0)` |
| `bottom` | `bottom:auto; top:calc(100% + 5px); left:50%` | `translateX(-50%) translateY(-3px)` | `translateX(-50%) translateY(0)` |
| `left` | (no dedicated CSS rule — falls back to default top resting until JS positions it) | — | — |

`right`/`bottom` reuse the same `.12s .3s` enter timing as the default.

### JS engine — `html.tt-js` (`pages/kit-kit.js`)

**One engine, shared by every consumer.** It lives in the kit's behaviour layer
[`pages/kit-kit.js`](../pages/kit-kit.js), which every page and the storybook load in `<head>`. No page
may re-implement it — the delay, the placement and the `mousedown` hide are part of the component
contract, and per-page copies are exactly how this drifted before (7 pages kept a warm-up variant and
one page shipped a second, delay-free `#mx-tip` engine of its own).

On load the engine adds `html.tt-js`, which **suppresses the CSS `::after` fallback** (`html.tt-js [data-tip]::after{display:none}` — incl. hover/focus and right/bottom variants). The JS then renders a single shared **fixed-position** node so the tooltip escapes `overflow:hidden` containers and viewport edges:

- One reused `<div aria-hidden="true">` appended to `<body>`; same recipe (`position:fixed; z-index:9999; background:var(--ink); color:var(--card); font-size:.75rem; border-radius:6px; padding:4px 8px; pointer-events:none; white-space:nowrap; font-family:inherit; line-height:1.35; transition:opacity .1s`).
- Positioning: centred over the trigger above it (`top = rect.top − bubbleHeight − 5`); flips **below** (`rect.bottom + 5`) when it would clip the top (`ty < 4`); horizontally clamped to `4px` from each viewport edge.
- Delay: `mouseover` always shows after **300ms**; `mouseout` hides immediately. No warm-up window.
- Also hides on `mousedown`: a clicked control often re-renders or removes itself while still hovered, so no `mouseout` ever fires and the bubble would linger over whatever replaced it.
- Sidebar rail: `.sbx-nav-item` / `.sbx-chats-icon` carry no `data-tip`; the engine derives their text from the hidden `.lbl` (or `aria-label`) **only while `.sbx.is-collapsed`**, so an expanded rail never tips a label the user can already read. Collapsed-rail tooltips render to the right of the icon, vertically centred, flipping left at the viewport edge.
- Reveal transition `opacity .12s`; hide transition `opacity .1s`.

### Per-context suppression

`.sbx:not(.is-collapsed) .sbx-nav-item[data-tip]::after` etc. — sidebar nav/CTA tooltips are suppressed while the sidebar is expanded (label already visible); shown only when collapsed.

## No change (—)

text-xs (`.75rem`), padding 4/8 px, radius `md` (6 px), placements (top/right/bottom/left), fade/zoom + slide-in animations, Radix transform-origins.

## Token map used

`--ink` (Text/Primary, bg) · `--card` (Surface/Card, theme-aware — reused here as text on the inverted ink chip).
Brand colour never appears on a tooltip; it's a neutral text surface in both themes.

## Accessibility & consistency self-check
```
Consistency: PASS — bg + text now both come from semantic tokens; no raw hex in the .tt rule. Same .tt class reused by Tooltip and TruncatedTitleTooltip — no inline-style drift.
Accessibility:
  ✓ Text vs bg — light #FFFFFF on #0F172A = 17.85:1 (target 4.5:1, 1.4.3)
  ✓ Text vs bg — dark #17171E on #F9FAFB = 16.10:1 (target 4.5:1, 1.4.3)
  ✓ Status not by colour alone — tooltip is text-only; conveys information through its label (1.4.1)
  ✓ Hit target — tooltip is hover-revealed; the trigger element carries 2.5.8 responsibility, not the tooltip itself
```
