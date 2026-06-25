# Overlay — prod → expected

Reusable full-viewport backdrop utility. Storybook section: [`#overlay`](../insightis-preview-kit.html#overlay). CSS: [`../pages/kit-theme.css`](../pages/kit-theme.css) (`/* Overlay — reusable full-viewport backdrop */`).

**New component — no prod equivalent.** This file documents its introduction, not a delta. `.ov` is a pure CSS utility (no React component, no JS of its own) used to dim the page behind any slide-over panel or modal and to host dismiss-on-click.

| Property | Current (prod) · was | Expected · became | Specification |
|---|---|---|---|
| component | — no prod equivalent (new utility) | **introduced** | CSS-only class `.ov` + state modifier `.ov.is-open` |
| `position` | — | `fixed` | pins to the viewport regardless of scroll (Tailwind `fixed`) |
| `inset` | — | `0` | `top/right/bottom/left: 0` → covers full viewport (Tailwind `inset-0`) |
| `background` | — | `rgba(15,23,42,.45)` (light) / `rgba(2,6,23,.6)` (dark) | scrim token `--overlay-scrim` — see token note below |
| `z-index` | — | `40` | sits **below** panels (`41+`) and modals (`50+`) — see layering below |
| `display` (default) | — | `none` | hidden until opened; no backdrop painted at rest |
| `display` (`.is-open`) | — | `block` | `.ov.is-open` reveals the backdrop |

## Recreate `.ov` from scratch (self-reproducing spec)

Two rules, nothing more:

```css
/* Overlay — reusable full-viewport backdrop */
.ov{
  position: fixed;          /* Tailwind: fixed                        */
  inset: 0;                 /* Tailwind: inset-0  (top/right/bottom/left:0) */
  background: var(--overlay-scrim); /* light rgba(15,23,42,.45) / dark rgba(2,6,23,.6) */
  z-index: 40;              /* Tailwind: z-40                         */
  display: none;            /* hidden by default — Tailwind: hidden   */
}
.ov.is-open{
  display: block;           /* Tailwind: block — open state           */
}
```

**Scrim token (single source of truth).** Per the repo colour-token rule, the dimmer strength is tokenised once as `--overlay-scrim`:

| Theme | `--overlay-scrim` raw value | Defined at |
|---|---|---|
| Light (default) | `rgba(15,23,42,.45)` — slate-900 @ 45 % | `pages/kit-theme.css` `:root` |
| Dark (`.dark`) | `rgba(2,6,23,.6)` — near-black @ 60 % | `pages/kit-theme.css` `.dark` |

`.ov` reads `var(--overlay-scrim)`; it never inlines an `rgba(...)`. The same token backs `.dlg-overlay` (modal scrim, `z-index:60`) and `.cl-side-backdrop` (sidebar drawer, `z-index:55`), so all three dimmers stay visually identical and theme-adaptive from one edit point.

## How it composes (z-index layering)

`.ov` is the **floor** of the overlay stack. Place the surface it backs as a DOM child so the backdrop and the dismiss-on-click handler are co-located:

```html
<div id="my-ov" class="ov" onclick="if(event.target===this)closePanel()">
  <div id="my-panel" role="dialog">…</div>
</div>
```

```js
document.getElementById('my-ov').classList.add('is-open');    // open
document.getElementById('my-ov').classList.remove('is-open'); // close
```

Layer order (low → high), so a panel/modal always paints **above** the dim:

| Layer | `z-index` | Token / class |
|---|---|---|
| Page content | (auto / 0) | — |
| **`.ov` backdrop** | **40** | `.ov` |
| Slide-over panel | `41`+ | consumer panel |
| Sidebar drawer backdrop | `55` | `.cl-side-backdrop` |
| Modal scrim | `60` | `.dlg-overlay` |
| Modal dialog | `60`+ | `.dlg` |

Dismiss-on-click: the `event.target===this` guard fires only when the backdrop itself (not the child panel) is clicked.

## No change (—)
Nothing — the component is net-new. No prod markup, no React export, no migration.

## ⚠ Best-practice — to consider
- **Fade transition** — `.is-open` is an instant `display` flip (no animation). A `opacity`/`visibility` transition would soften open/close, but `display:none↔block` can't be transitioned directly; would need a `.ov{transition:opacity .2s}` + `visibility` recipe (cf. `.cl-side-backdrop`, which already does `transition: opacity .2s ease`).
- **`backdrop-filter: blur(2px)`** — `.cl-side-backdrop` blurs the page behind it; `.ov` does not. Decide whether the generic overlay should match that treatment for consistency.
- **Focus trapping / `aria`** — `.ov` is presentation only; the consuming panel must own `role="dialog"`, `aria-modal`, focus trap, and `Esc`-to-close. Document this expectation wherever `.ov` is adopted.
- **`pointer-events`** — while open, `.ov` captures clicks (intended, for dismiss). Confirm no underlying control needs to remain interactive through the scrim.

## Accessibility / consistency self-check
- **Scrim contrast** — `rgba(15,23,42,.45)` (light) / `rgba(2,6,23,.6)` (dark) sufficiently dims page content to signal an inactive state while keeping it faintly legible; dark theme uses a heavier 60 % because the underlying surface is already dark.
- **Token discipline ✓** — single `--overlay-scrim` source of truth, theme-adaptive, shared with `.dlg-overlay` + `.cl-side-backdrop`. No inline `rgba()` in the `.ov` rule. **Resolved:** the live `.ov` rule in `pages/kit-theme.css` now reads `background:var(--overlay-scrim)` (was a hard-coded `rgba(15,23,42,.35)`). All overlays unify on the token — `rgba(15,23,42,.45)` light / `rgba(2,6,23,.6)` dark — so `.ov`, `.dlg-overlay`, and `.cl-side-backdrop` share one scrim strength.
- **Layering ✓** — `z-index:40` keeps the backdrop strictly below every panel (`41+`) and modal (`50/60`), so the dimmed surface never occludes the active surface.
- **Keyboard ✓ (delegated)** — `.ov` adds no keyboard semantics; dismiss-on-`Esc` and focus management are the responsibility of the hosted `role="dialog"` panel.
- **Reduced motion ✓** — default open/close is an instant `display` toggle, so it is motion-safe; any future fade must honour `prefers-reduced-motion`.

> Summary: net-new CSS-only backdrop. Two rules (`.ov`, `.ov.is-open`), `position:fixed; inset:0; z-index:40; display:none→block`, scrim via `--overlay-scrim`. Resolved: the live `.ov` rule now uses `var(--overlay-scrim)` (`.45` light / `.6` dark) instead of the earlier literal `rgba(15,23,42,.35)` — all overlays unified on the token.
