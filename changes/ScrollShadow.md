# ScrollShadow — prod → expected

Source: `@insightis/ui` `ScrollShadow/index.tsx` + `hooks/use-scroll-shadow`. Baseline: [`../current/ScrollShadow.md`](../current/ScrollShadow.md).

**No component-level change (—).** ScrollShadow has no own colour / radius / border — its shadow is a linear-gradient that picks up `--background` from the active theme.

| Aspect | Current (prod) · was | Expected · became |
|---|---|---|
| Shadow color | `var(--background)` (theme-aware) | — no change (hex shifts → [colors](colors.md)) |
| Default `size` | 40px | — no change |
| Default `offset` | 0px | — no change |
| Default `orientation` | `vertical` | — no change |
| Default `visibility` | `auto` | — no change |

## ⚠ Best-practice states — to define
- **Reduced-motion** — the shadow fade has no transition, so nothing to adapt.
- **A11y** — the gradient is presentational; the inner scroll container should expose `tabindex="0"` if focusable so keyboard users can scroll. Not enforced by the component today; document for consumers.

> Summary: ScrollShadow is a behavior wrapper. The only token it touches (`--background`) is governed by [`changes/colors.md`](colors.md).
