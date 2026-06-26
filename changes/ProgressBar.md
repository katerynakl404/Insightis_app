# ProgressBar — prod → expected

| Part | Current (prod) | Expected |
|---|---|---|
| Track | `background` | `Surface/Chips` (`var(--chips)`, sub-perceptible shift) |
| Fill | `primary-gradient` | `Brand/Primary` (`var(--brand-primary)`) / gradient (value re-bound, ≈ same) |

> Essentially **no visible change** — fill and track stay teal.

## DOM / markup

Two elements, no icon, no text:

```html
<div class="progress"><span style="width:64%"></span></div>
```

- **Track** = the `.progress` block element.
- **Fill** = a single child `<span>` whose **inline `width:<pct>%`** sets the determinate value (e.g. `width:64%`). The fill carries no class — it is targeted via the `.progress > span` child selector.

## Reproduction values

Geometry differs between the base component and its scoped variants — disambiguated here:

| Selector | Height | Radius | Track | Fill |
|---|---|---|---|---|
| `.progress` (base Expected, kit-theme.css:1005–1006) | `.5rem` (8px) | `9999px` (full pill) | `var(--chips)` | `var(--brand-primary)` |
| `.sb-tok .progress` (scoped variant, line 998) | `4px` | `.5rem` | `var(--bg)` | inherits base `var(--brand-primary)` |
| `.prod .progress` (scoped variant, line 409) | `4px` | (inherits `9999px`) | `var(--bg)` | `.prod .progress>span` → `var(--p-grad)` |

- The base `.progress` is an **8px** bar, fixed **`width:160px`**, **full pill** radius (`9999px`), and **`overflow:hidden`** so the fill leading edge is clipped to the pill.
- The fill is a child `<span>` (`.progress>span`): `display:block; height:100%; border-radius:9999px; background:var(--brand-primary)`; its inline `width:<pct>%` is the determinate value.
- No transition, no hover/focus/active/disabled state, no `@media` rule, and no `.progress`-specific dark override (the bar re-themes via its semantic tokens).
- The **4px** height is only the scoped `.sb-tok` / `.prod` variants — not the base component.
- `--progress-track` (= `var(--card2)`, line 57) is the token used specifically by the **tokens-meter** bar; it is not applied by the base `.progress` track (which uses `var(--chips)`).

## No change (—)
Gradient direction.
