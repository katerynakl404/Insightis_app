# Stepper — change

**No change (—).** New headless component, live on prod since 04.06 (see `../current/Stepper.md`).
**Headless, consumer-styled** — the component renders the current step via a render function and ships *no* visual tokens of its own. Expected stays empty until a change is requested.

## Kit-demo dimensions (`.step` example only — not a component contract)

The storybook `#stepper` example styles the headless API with brand tokens. Concrete values (`pages/kit-theme.css:1490–1495`) so the demo is reproducible:

| Element | Selector | Dimensions / padding | Other |
|---|---|---|---|
| Row | `.step` | `display:flex; align-items:center` · **gap 8px** | — |
| Step dot | `.step .dot` | **24×24px**, **radius 9999px** (circle), `display:flex; align-items:center; justify-content:center` | `font-size:.75rem; font-weight:600` |
| Dot — done / active | `.step .dot.done`, `.step .dot.active` | (same 24×24) | bg `--brand-primary`, text `--content-on-solid` |
| Dot — active ring | `.step .dot.active` | `box-shadow: 0 0 0 3px color-mix(in srgb, var(--brand-primary) 25%, transparent)` (**3px** halo) | — |
| Dot — todo | `.step .dot.todo` | (same 24×24) | bg `--chips`, text `--ink-secondary` |
| Connector line | `.step .ln` | **24px wide × 2px tall** | bg `--border` |

These are illustrative kit-demo styles; a real consumer supplies its own dimensions.

### Markup (storybook example)

```html
<div class="step">
  <span class="dot done">✓</span>
  <span class="ln"></span>
  <span class="dot active">2</span>
  <span class="ln"></span>
  <span class="dot todo">3</span>
</div>
```

- Each step indicator is a `<span class="dot …">` carrying exactly one state class: `done` (completed — shows a `✓` glyph, not an SVG), `active` (current — shows the step number + 3px halo ring), or `todo` (upcoming — shows the step number).
- Each connector between dots is a `<span class="ln"></span>` (empty).
- No `:hover`, `:focus-visible`, `:active`, `:disabled`, `.is-*`, pseudo-element, `@media`, `transition`, or `.dark` rule exists for `.step` / `.dot` / `.ln` in the shipped CSS — there are no interaction states, no responsive variants, and no dark-mode overrides; tokens (`--brand-primary`, `--chips`, `--border`, `--content-on-solid`, `--ink-secondary`) carry any theme adaptation.

> Note (this iteration): the kit previously filed two consumer compositions — `Variant — Account menu (used in Sidebar footer)` and `Variant — Subscription tokens (used in Sidebar footer)` — under Stepper by mistake. Both are popover-shaped overlays anchored to the Sidebar footer; they now live in [`changes/Popover.md`](Popover.md). No Stepper-side change.
