# ScrollShadow — current (prod)

Live baseline from `@insightis/ui` `ScrollShadow/index.tsx` + `hooks/use-scroll-shadow`.

A scroll container that automatically renders fade gradients at the overflow edges (top/bottom for vertical, left/right for horizontal).

## Spec
- Container: `overflow-y-auto` (vertical, default) or `overflow-x-auto` (horizontal).
- Shadow rendering: handled via inline styles set by `useScrollShadow` (CSS mask + linear gradients).
- Props:
  - `size` (px, default `40`) — shadow band thickness.
  - `offset` (px, default `0`) — distance from the edge before the shadow starts fading.
  - `orientation` `"vertical" | "horizontal"` (default vertical).
  - `visibility` `"auto" | "top" | "bottom" | "both" | "none"` (default auto — fades only on the overflowing side).
  - `isEnabled` (default `true`) — short-circuits the hook.

## Shadow color & token usage
- The hook does **not** define its own color; it uses `linear-gradient(... transparent → background ...)`, picking up `--background` from the active theme.
- No own border / radius — the consumer styles the wrapper.

## States
- **No overflow** — no shadow rendered (both edges flush).
- **Overflowing on one side only** — shadow on that side only.
- **Overflowing on both sides** — shadows on both edges.
- `onVisibilityChange` callback fires when the visible edges change.
- No hover / focus / disabled state.
