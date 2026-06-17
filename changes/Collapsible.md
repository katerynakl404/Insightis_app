# Collapsible — prod → expected

Source: `@insightis/ui` `Collapsible/index.tsx`. Baseline: [`../current/Collapsible.md`](../current/Collapsible.md).

**No component-level change (—).** Collapsible is a pure Radix re-export with no styling of its own; consumers style the trigger and content. There are no tokens to migrate.

| Part | Current (prod) · was | Expected · became |
|---|---|---|
| `Collapsible` (Root) | Radix Root, no own classes | — no change |
| `CollapsibleTrigger` | Radix Trigger, no own classes (consumer renders a Button) | — no change |
| `CollapsibleContent` | Radix Content, no own classes | — no change |

## A11y / behavioral notes
- Trigger inherits visual states from whatever element it wraps (typically a `Button` — for which states are covered in [`Button`](Button.md)).
- Content exposes `data-state="open"|"closed"` for entry/exit transitions — consumer adds the animation.

## ⚠ Best-practice states — to define (consumer-level)
- Focus ring on the trigger button (delegate to Button's `--focus-ring-brand`).
- Open/closed icon affordance (chevron rotation) — convention only, not a token change.
- Reduced-motion fallback for the open/close animation.
