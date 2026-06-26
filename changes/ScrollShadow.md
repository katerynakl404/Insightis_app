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

## Kit-demo dimensions (`.ssh`, kit-theme.css ~1627)

Prod is **headless** (behavior wrapper; the only token it touches is `var(--background)`). The kit ships a styled demo so reviewers see the fade in context — these are demo values, not a prod contract:

| Element | Selector | Exact size / padding / radius |
|---|---|---|
| Shell | `.ssh` | width **220px**; height **96px**; border **1px solid** `var(--border)`; radius **6px**; bg `var(--card)`; `position:relative`; `overflow:hidden` (line 1627) |
| Scroll inner | `.ssh-inner` | padding **8px 12px**; font-size **.875rem (14px)**; line-height **1.5**; color `var(--ink-body)`; `overflow-y:auto`; height **100%** (line 1628) |
| Fade band (top & bottom) | `.ssh::before` / `::after` | `content:""`; `position:absolute`; `left:0`; `right:0`; **height 24px**; `pointer-events:none`; `z-index:1` (line 1629) |
| Top gradient | `.ssh::before` | `top:0`; `background:linear-gradient(180deg, var(--bg) 0%, transparent 100%)` (line 1630) |
| Bottom gradient | `.ssh::after` | `bottom:0`; `background:linear-gradient(0deg, var(--bg) 0%, transparent 100%)` (line 1631) |

**DOM/markup:** `<div class="ssh"><div class="ssh-inner">…scrollable content…</div></div>`. The shell (`.ssh`) is the positioning context (`position:relative`) and clips overflow; the two fade bands are generated pseudo-elements on `.ssh` (no markup), absolutely positioned and stacked above the inner content via `z-index:1`. No icons/SVG.

> ⚠ The fade-band height in the **kit demo is 24px**, whereas the React component's **default `size` prop is 40px** (table above). Both are valid — the demo just renders a shorter band — but a dev reproducing from the demo gets 24px, from the prop default gets 40px. Stated explicitly so the two aren't conflated.
>
> Props recap: `size` (band length, default **40px**), `offset` (default **0px**), `orientation` (default **vertical** → top/bottom bands; horizontal → left/right), `visibility` (default **auto** — band shows only when content overflows that edge).

## ⚠ Best-practice states — to define
- **Reduced-motion** — the shadow fade has no transition, so nothing to adapt.
- **A11y** — the gradient is presentational; the inner scroll container should expose `tabindex="0"` if focusable so keyboard users can scroll. Not enforced by the component today; document for consumers.

> Summary: ScrollShadow is a behavior wrapper. The only token it touches (`--background`) is governed by [`changes/colors.md`](colors.md).
