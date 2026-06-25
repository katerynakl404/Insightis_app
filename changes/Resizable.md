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
