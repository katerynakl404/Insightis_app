# Skeleton — current (prod)

Live baseline from `@insightis/ui` `Skeleton/index.tsx`.

A placeholder block that simulates the shape of incoming content while data loads. Renders children once `isLoaded` is true.

## Spec
- Base classes: `skeleton pointer-events-none relative overflow-hidden bg-chip`.
- Default `bg-chip` (`#F8FAFC` / dark `#2A2834`).
- When children are provided (and not loaded yet): wrapper is `inline-block max-w-fit` so the skeleton sizes to its content.

## Variants
- **animation**:
  - `shimmer` (default) — `::after` overlay `animate-skeleton-shimmer bg-skeleton-shimmer` (sweeping light band).
  - `pulse` — `animate-pulse` (Tailwind built-in opacity loop).
  - `none` — static (use for tests / reduced-motion).
- **rounded**: `none` / `sm 2px` / `md 6px` (default) / `lg 8px` / `xl 12px` / `full`.

## States
- **Loading** (`isLoaded=false`, default) — placeholder block visible; children invisible (`pointer-events-none invisible`).
- **Loaded** (`isLoaded=true`) — returns children directly, skeleton wrapper unmounted.
- No hover / focus / disabled state (placeholder is non-interactive).
