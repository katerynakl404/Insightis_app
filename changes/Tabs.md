# Tabs — prod → expected

Baseline: [`../current/Tabs.md`](../current/Tabs.md).

| State | Current (prod) | Expected | Specification |
|---|---|---|---|
| Active | underline + text `accent` `#07827F` | `--brand-primary` `#07807E` (≈ same) | hex shift only ([colors](colors.md)) |
| Default (inactive) | text `content-secondary` `#62748E` | `--ink-secondary` `#64748B` | hex shift only |
| Hover | bg `State/Hover` `#F0F8FB` + text `content-body` | `--state-hover` `#F1F5F9` (light) / `#21212C` (dark), text `--ink-body` | hex shift only |
| **Focus** *(new)* | ⚠ undefined in prod (relied on user-agent default) | **new** — `box-shadow:0 0 0 2px Surface/Card, 0 0 0 4px --focus-ring-brand` | Brand-tinted ring (tabs are nav, not form). Matches `.sbx-nav-item` and `.link` focus rings already in the kit. WCAG 2.4.7. |
| **Disabled** *(new — recipe change)* | `disabled:opacity-50` (hardcoded 50%) | **new** — `opacity:var(--opacity-disabled)` (.65) + `pointer-events:none` + `cursor:not-allowed` | Unifies disabled treatment with Button / IconButton / Switch / Checkbox. No colour override — fade-from-base only. |

## No change (—)

Item padding 8/12 px, text-sm, active underline 2 px, trigger icon sizing/coloring (04.06 prod state).

## Token map used

`--brand-primary` (active text + underline) · `--ink-secondary` (default text) · `--ink-body` (hover text) · `--state-hover` (hover bg) · `--focus-ring-brand` (focus ring) · `--card` (focus-ring gap colour) · `--opacity-disabled` (disabled opacity). All resolve correctly in both themes via existing semantic aliases. No new tokens introduced.

## Accessibility & consistency self-check

```
Consistency: PASS — focus ring matches .sbx-nav-item / .link recipe; disabled recipe matches Button / IconButton / Switch / Checkbox via the shared --opacity-disabled token. No raw hex in any .tab rule.
Accessibility:
  ✓ Active text vs page bg — light #07807E / #F8FAFC = 4.97:1 (target 4.5:1, 1.4.3); dark #148F8D / #0F0E14 = 6.60:1
  ✓ Inactive text vs page bg — light #64748B / #F8FAFC = 4.61:1; dark #9CA3AF / #0F0E14 = 8.18:1
  ✓ Hover text vs page bg — light #334155 / #F8FAFC = 10.36:1; dark #F4F4F5 / #0F0E14 = 15.10:1
  ✓ Focus ring visibility — brand-tinted 2-px halo with 2-px Surface/Card gap, visible against any underlying surface (1.4.11 / 2.4.7)
  ✓ Hit target — tab default 36×36 px (8/12 padding around text-sm with descenders); ≥ 24×24 (2.5.8 desktop PASS)
  ✓ Status not by colour alone — active state also carries the 2-px underline; not colour-only (1.4.1)
  ✓ Disabled — opacity-faded but text + underline still perceivable; accessible name preserved
```
