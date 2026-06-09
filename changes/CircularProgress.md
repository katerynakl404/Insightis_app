# CircularProgress — prod → expected

Source: `@insightis/ui` `CircularProgress/index.tsx`. Baseline: [`../current/CircularProgress.md`](../current/CircularProgress.md).

**No component-level change (—).** CircularProgress draws an SVG ring whose colours come from `--background` (track) and `--primary` / `--secondary` (indicator). Only the underlying hex shifts (documented in [`colors`](colors.md)).

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
