# Collapsible — prod → expected

Source: `@insightis/ui` `Collapsible/index.tsx`. Baseline: [`../current/Collapsible.md`](../current/Collapsible.md).

**No component-level change (—).** Collapsible is a pure Radix re-export with no styling of its own; consumers style the trigger and content. There are no tokens to migrate.

| Part | Current (prod) · was | Expected · became |
|---|---|---|
| `Collapsible` (Root) | Radix Root, no own classes | — no change |
| `CollapsibleTrigger` | Radix Trigger, no own classes (consumer renders a Button) | — no change |
| `CollapsibleContent` | Radix Content, no own classes | — no change |

## Kit-demo dimensions (`.clps`, kit-theme.css 1536–1543)

Prod is **headless** (Radix re-export, zero styling) — the consumer supplies all dimensions. The kit ships a **styled demo** so reviewers see one concrete realisation; these are the demo's values, not a contract prod must match.

### DOM / markup structure
```html
<div class="clps js-clps" data-state="open">           <!-- Root; toggle data-state open|closed -->
  <button class="clps-trig" type="button">Show details
    <svg class="clps-chev" width="14" height="14" viewBox="0 0 24 24"
         fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>
  </button>
  <div class="clps-cnt">…content…</div>
</div>
```
Trigger is a `<button type="button">`; chevron is an inline 14×14 SVG (`viewBox 0 0 24 24`, `stroke=currentColor`, `stroke-width=2`, down-chevron path `m6 9 6 6 6-6`) so it inherits the trigger's text colour. `data-state="closed"` hides the content and keeps the chevron at 0°.

| Element | Selector | Exact spec |
|---|---|---|
| Shell | `.clps` | width **240px**; border **1px solid** `var(--border)`; radius **6px**; bg `var(--card)`; `overflow:hidden` (line 1536) |
| Trigger | `.clps-trig` | `display:flex`; `align-items:center`; `justify-content:space-between`; gap **8px**; padding **8px 12px**; width **100%**; font-size **.875rem (14px)**, weight **500**, `font-family:inherit`, `text-align:left`, color `var(--ink)`; `cursor:pointer`; `background:transparent`; `border:none` (line 1537) |
| Trigger · hover | `.clps-trig:hover` | bg `var(--state-hover)`; color `var(--brand-primary)` (line 1538) — only interaction state defined; no `:focus-visible`/`:active`/`:disabled` rule (focus ring delegated to consumer's Button) |
| Content | `.clps-cnt` | padding **0 12px 12px** (no top padding); font-size **.875rem (14px)**; color `var(--ink-body)` (line 1539); `display:none` when `.clps[data-state=closed]` (line 1540) |
| Chevron | `.clps-chev` | `transform:rotate(0deg)` when `[data-state=closed]` (line 1541) → `rotate(90deg)` when `[data-state=open]` (line 1542); `transition:transform .15s` (150ms); color `var(--ink-secondary)` (line 1543) |

> Note both: **prod = headless (no own dimensions)**; **kit demo = 240px shell · 6px radius · trigger flex space-between, pad 8px 12px / 14px·500 · content pad 0 12px 12px · chevron 0°→90° @150ms**. No dark-mode override, no `@media` rule — tokens (`--card`, `--border`, `--ink`, `--ink-body`, `--ink-secondary`, `--state-hover`, `--brand-primary`) carry theme adaptation.

## A11y / behavioral notes
- Trigger inherits visual states from whatever element it wraps (typically a `Button` — for which states are covered in [`Button`](Button.md)).
- Content exposes `data-state="open"|"closed"` for entry/exit transitions — consumer adds the animation.

## ⚠ Best-practice states — to define (consumer-level)
- Focus ring on the trigger button (delegate to Button's `--focus-ring-brand`).
- Open/closed icon affordance (chevron rotation) — convention only, not a token change.
- Reduced-motion fallback for the open/close animation.
