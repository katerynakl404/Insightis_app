# CircularProgress — prod → expected

Source: `@insightis/ui` `CircularProgress/index.tsx`. Baseline: [`../current/CircularProgress.md`](../current/CircularProgress.md).

**No component-level change (—).** **Props-driven SVG component** — geometry is computed from props, not from fixed CSS. CircularProgress draws an SVG ring whose colours come from `--background` (track) and `--primary` / `--secondary` (indicator). Only the underlying hex shifts (documented in [`colors`](colors.md)).

## Concrete dimensions (defaults + kit demo)

Layout wrapper `.cpr` (`pages/kit-theme.css:1711–1713`) plus the SVG ring props:

| Element | Selector / prop | Dimensions / padding | Other |
|---|---|---|---|
| Wrapper | `.cpr` | size = `size` prop, **default 40×40px** · `position:relative; display:inline-flex`, centred (no padding) | — |
| SVG ring | `.cpr svg` | `position:absolute; inset:0` (fills wrapper) | viewBox = `0 0 {size} {size}` |
| Stroke (track + indicator) | `strokeWidth` prop | **default 2.5px** | track `--background`, indicator `--primary` (or `--secondary`), `strokeLinecap="round"` |
| Ring radius | computed | `r = (size − strokeWidth) / 2` → for default 40 / 2.5 = **17.5px**, circumference ≈ 109.96 | rotated **−90°** (0° = 12 o'clock) |
| Centre label | `.cpr .cpr-lbl` | `position:relative` (no padding) | font **.75rem / 600**, colour `--ink` |

Kit-demo scale (storybook `#circularprogress`, lines 2338–2340): 40px ring → strokeWidth 2.5; 48px & 56px rings → strokeWidth 3 (proportional override). ⚠ Note the separate `#spinner` storybook block (line 1063) renders the CircularProgress demo at 40px with **strokeWidth 4** on a 36-unit viewBox — inconsistent with the 2.5 default; both are illustrative demos, not the component default.

| State | Current (prod) · was | Expected · became | Specification |
|---|---|---|---|
| Determinate (`value`) | track `hsl(var(--background))`, indicator `hsl(var(--primary))` (or `--secondary`) | — no change (hex → [colors](colors.md)) | `Brand/Primary` (was `#07827F`, became `#07807E`) |
| 0% | indicator fully offset (invisible) | — no change | — |
| 100% | closed ring | — no change | — |

## Variants — no change
- **primary** (default): indicator `--primary`.
- **secondary**: indicator `--secondary`.

## ⚠ Best-practice states — to define
- **Track color** — uses `--background` (`Surface/Background`) which has very low contrast against most surface bgs. Recommend `Surface/Chips` (`#F1F5F9` / dark `#2A2834`) for a perceptible track at small sizes — same change already made for [`Spinner`](../current/Spinner.md).
- **Indeterminate mode** — currently determinate-only; pair with [`Spinner`](../current/Spinner.md) or add an `indeterminate` prop that spins the ring while pulsing.
- **Center label semantics** — when `children` is a percentage, ensure it's not duplicated for screen readers (already mitigated by `aria-valuenow`; document that `children` should be `aria-hidden`).

## A11y
- `role="progressbar"`, `aria-valuenow`, `aria-valuemin=0`, `aria-valuemax`. ✓
- ⚠ no `aria-label` requirement enforced — consumer should add one (or use `aria-labelledby`).

## No change (—)
Geometry math, default `size=40`, `strokeWidth=2.5`, `max=100`, `strokeLinecap="round"`, `-90°` rotation (12 o'clock origin).
