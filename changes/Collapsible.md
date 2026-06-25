# Collapsible — prod → expected

Source: `@insightis/ui` `Collapsible/index.tsx`. Baseline: [`../current/Collapsible.md`](../current/Collapsible.md).

**No component-level change (—).** Collapsible is a pure Radix re-export with no styling of its own; consumers style the trigger and content. There are no tokens to migrate.

| Part | Current (prod) · was | Expected · became |
|---|---|---|
| `Collapsible` (Root) | Radix Root, no own classes | — no change |
| `CollapsibleTrigger` | Radix Trigger, no own classes (consumer renders a Button) | — no change |
| `CollapsibleContent` | Radix Content, no own classes | — no change |

## Kit-demo dimensions (`.clps`, kit-theme.css ~1529)

Prod is **headless** (Radix re-export, zero styling) — the consumer supplies all dimensions. The kit ships a **styled demo** so reviewers see one concrete realisation; these are the demo's values, not a contract prod must match:

| Element | Selector | Exact size / padding / radius |
|---|---|---|
| Shell | `.clps` | width **240px**; border **1px** `var(--border)`; radius **6px**; bg `var(--card)`; `overflow:hidden` (line 1529) |
| Trigger | `.clps-trig` | padding **8px 12px**; font-size **.875rem (14px)**, weight **500**, color `var(--ink)`; full-width; gap **8px**; transparent bg/no border; hover bg `var(--state-hover)` + `var(--brand-primary)` text (lines 1530–1531) |
| Content | `.clps-cnt` | padding **0 12px 12px** (no top padding); font-size **.875rem (14px)**; color `var(--ink-body)`; hidden when `[data-state=closed]` (lines 1532–1533) |
| Chevron | `.clps-chev` | rotates **0° closed → 90° open**; transition **transform .15s (150ms)**; color `var(--ink-secondary)` (lines 1534–1536) |

> Note both: **prod = headless (no own dimensions)**; **kit demo = 240px shell · 6px radius · trigger pad 8px 12px / 14px·500 · content pad 0 12px 12px · chevron 90° @150ms**.

## A11y / behavioral notes
- Trigger inherits visual states from whatever element it wraps (typically a `Button` — for which states are covered in [`Button`](Button.md)).
- Content exposes `data-state="open"|"closed"` for entry/exit transitions — consumer adds the animation.

## ⚠ Best-practice states — to define (consumer-level)
- Focus ring on the trigger button (delegate to Button's `--focus-ring-brand`).
- Open/closed icon affordance (chevron rotation) — convention only, not a token change.
- Reduced-motion fallback for the open/close animation.
