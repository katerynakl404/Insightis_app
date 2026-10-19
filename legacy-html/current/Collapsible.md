# Collapsible — current (prod)

Live baseline from `@insightis/ui` `Collapsible/index.tsx`.

**Headless re-export** of Radix `@radix-ui/react-collapsible`:
- `Collapsible` = `Root` — state container.
- `CollapsibleTrigger` = `Trigger` — toggles open/closed.
- `CollapsibleContent` = `CollapsibleContent` — panel.

## Spec
- No own visual tokens, no padding, no border, no animation utility class.
- All styling is consumer-provided — Insightis ships Radix's data-attributes (`data-state="open" | "closed"`) and ARIA wiring (`aria-expanded`, `aria-controls`) untouched.

## States
- `data-state="closed"` — content hidden (Radix unmounts or sets `hidden`).
- `data-state="open"` — content visible.
- No hover / focus / disabled / loading defined by this component (delegated to whatever the trigger renders — usually a `Button`).
