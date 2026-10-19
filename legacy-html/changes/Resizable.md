# Resizable — change

**No change (—).** New component, live on prod since 04.06 (see `../current/Resizable.md`).
**Headless / behaviour component** — split panels driven by drag interaction; layout dimensions come from the consumer. Expected stays empty until a change is requested.

## Kit-demo dimensions (`.rsz` example)

Concrete values from `pages/kit-theme.css:1479–1482` so the storybook demo is reproducible:

| Element | Selector | Dimensions / padding | Colour |
|---|---|---|---|
| Container | `.rsz` | demo box **240px wide × 60px tall**, **radius .5rem (8px)**, `overflow:hidden`, `display:flex` | **border 1px** `--border` |
| Panel | `.rsz .p` | `flex:1`, centred flex (no own padding) | bg `--card2`, text `--ink-secondary`, font **.75rem** |
| Handle (rest) | `.rsz .hd` | **width 6px** (full panel height), `cursor:col-resize` | bg `--border` |
| Handle (hover) | `.rsz .hd:hover` | (same 6px) | bg `color-mix(in srgb, --brand-primary 30%, transparent)` (**brand @ 30%**) |

⚠ The storybook spec text and the `#resizable` sub-caption both state a **drag state = `primary/50` (brand @ 50%)**, but **no `.rsz .hd:active` / drag rule exists in `kit-theme.css`** — only the 30% hover. The 50% drag colour is documented intent, not yet implemented in the kit demo.

## DOM / markup structure

Reproducible markup for the kit demo (exactly as shipped — no icons, no inline SVG):

```html
<div class="rsz">
  <div class="p">Panel A</div>
  <div class="hd"></div>
  <div class="p">Panel B</div>
</div>
```

- Outer `div.rsz` = horizontal flex container (`display:flex`); fixed demo size 240×60px.
- Two `div.p` panels, each `flex:1`, centring their text via `align-items:center; justify-content:center` (no own padding/line-height).
- One empty `div.hd` drag handle between them, fixed `6px` wide, full container height, `cursor:col-resize`.

## States & transitions

| State | Selector | Spec |
|---|---|---|
| Handle rest | `.rsz .hd` | bg `var(--border)`; width 6px; `cursor:col-resize` |
| Handle hover | `.rsz .hd:hover` | bg `color-mix(in srgb, var(--brand-primary) 30%, transparent)` |
| Handle drag | — | **not implemented** in CSS (no `:active`/`.is-dragging` rule); spec-intent only = `primary/50` |

No `transition` is declared on `.rsz .hd` (hover swap is instant). No `:focus-visible`, `:disabled`, `.dark` overrides, `@media`, or pseudo-elements exist for any `.rsz` selector — the four rules at `kit-theme.css:1486–1489` are the complete ruleset.
