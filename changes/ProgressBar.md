# ProgressBar — prod → expected

| Part | Current (prod) | Expected |
|---|---|---|
| Track | `background` | `Surface/Chips` (`var(--chips)`, sub-perceptible shift) |
| Fill | `primary-gradient` | `Brand/Primary` (`var(--brand-primary)`) / gradient (value re-bound, ≈ same) |

> Essentially **no visible change** — fill and track stay teal.

## Reproduction values

Geometry differs between the base component and its scoped variants — disambiguated here:

| Selector | Height | Radius | Track | Fill |
|---|---|---|---|---|
| `.progress` (base Expected, kit-theme.css ~1002–1003) | `.5rem` (8px) | `9999px` (full pill) | `var(--chips)` | `var(--brand-primary)` |
| `.sb-tok .progress` (scoped variant, line 995) | `4px` | `.5rem` | `var(--bg)` | — |
| `.prod .progress` (scoped variant, line 406) | `4px` | (inherits) | `var(--bg)` | `var(--p-grad)` |

- The base `.progress` is an **8px** bar with a **full pill** radius (`9999px`).
- The **4px** height is only the scoped `.sb-tok` / `.prod` variants — not the base component.
- `--progress-track` (= `var(--card2)`, line 57) is the token used specifically by the **tokens-meter** bar; it is not applied by the base `.progress` track (which uses `var(--chips)`).

## No change (—)
Gradient direction.
