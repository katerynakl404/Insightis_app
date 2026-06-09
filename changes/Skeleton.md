# Skeleton — prod → expected

Source: `@insightis/ui` `Skeleton/index.tsx`. Baseline: [`../current/Skeleton.md`](../current/Skeleton.md).

**No component-level change (—).** Skeleton is a wrapper over `bg-chip` + an animated `::after` overlay; the only token shift is the `Surface/Chips` hex (documented in [`colors`](colors.md)).

| State | Current (prod) · was | Expected · became |
|---|---|---|
| Loading (`isLoaded=false`) | `bg-chip pointer-events-none relative overflow-hidden`, animation `shimmer` (default) / `pulse` / `none` | — no change (hex → [colors](colors.md)) |
| Loaded (`isLoaded=true`) | renders children directly (wrapper unmounted) | — no change |

## Variants — no change
- `animation`: shimmer (default) / pulse / none.
- `rounded`: none / sm / md (default) / lg / xl / full.

## ⚠ Best-practice — to consider
- **Reduced-motion** — the shimmer respects user's `prefers-reduced-motion` only if the Tailwind animation utility does (verify; otherwise add an explicit `motion-reduce:animate-none`).
- **Contrast** — `bg-chip` against `bg-card` is ~3% perceptual delta in light mode. ⚠ visually subtle — keep, but document for designers.

> Summary: Skeleton has no component-level change. Only the underlying `Surface/Chips` token shifts (light `#F1F5F9` → `#F8FAFC`, dark `#2A2834` → `#2A2834`), documented in [`colors`](colors.md).
