# CircularProgress — current (prod)

Live baseline from `@insightis/ui` `CircularProgress/index.tsx`.

A determinate SVG ring (track + indicator). Renders an optional `children` node inside the center (e.g. a number, icon, or label).

## Spec
- Wrapper: `relative inline-flex items-center justify-center`, sizes via inline `width / height` (default `40px`).
- SVG: `absolute inset-0`, `aria-hidden`.
- Stroke width default `2.5`.
- Indicator uses `strokeDasharray = circumference`, `strokeDashoffset = circumference - (value/max) * circumference`, `strokeLinecap="round"`, rotated `-90°` so 0° = top.
- Value clamped to `[0, max]` (default `max=100`).

## Variants (`variant`)
- **primary** (default) — track `hsl(var(--background))`, indicator `hsl(var(--primary))`.
- **secondary** — track `hsl(var(--background))`, indicator `hsl(var(--secondary))`.

## Props
- `value` (required), `max` (default 100), `size` (default 40), `strokeWidth` (default 2.5), `children` (centered content).

## A11y
- `role="progressbar"`, `aria-valuenow={clampedValue}`, `aria-valuemin={0}`, `aria-valuemax={max}`.

## States
- **0%** — indicator invisible (full offset).
- **0% < value < max** — partial arc.
- **100%** — closed ring.
- Determinate only — no indeterminate / loading-spin animation.
- No hover / focus / disabled state — display-only.
