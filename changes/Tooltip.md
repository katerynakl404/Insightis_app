# Tooltip — prod → expected

Baseline: [`../current/Tooltip.md`](../current/Tooltip.md).

| State | Current (prod) | Expected | Specification |
|---|---|---|---|
| Default — light mode | bg `chip` / Text-Primary, text hardcoded `#FFF` | bg `--ink`, text `--card` (= `#FFFFFF`) | hex shift only ([colors](colors.md)) — visual result unchanged in light |
| Default — dark mode | ⚠ broken — bg lightens to `--ink` `#F9FAFB` but text stays hardcoded `#FFF` → invisible | **fixed** — bg `--ink` `#F9FAFB`, text `--card` `#17171E` (dark Card surface) | Root cause: hardcoded `color:#fff`, not a missing token. Replaced with `var(--card)` — the same theme-aware token used everywhere else as a surface, used here as text on the inverted ink chip. |
| Inline style → class | every Tooltip occurrence inlined `background:var(--ink);color:#fff;font-size:.75rem;border-radius:6px;padding:4px 8px` | **new** — shared `.tt` class in `pages/kit-theme.css` | Single source of truth — eliminates the chance of the bug recurring in TruncatedTitleTooltip or any future tooltip surface. |

## No change (—)

text-xs (`.75rem`), padding 4/8 px, radius `md` (6 px), placements (top/right/bottom/left), fade/zoom + slide-in animations, Radix transform-origins.

## Token map used

`--ink` (Text/Primary, bg) · `--card` (Surface/Card, theme-aware — reused here as text on the inverted ink chip).
Brand colour never appears on a tooltip; it's a neutral text surface in both themes.

## Accessibility & consistency self-check

```
Consistency: PASS — bg + text now both come from semantic tokens; no raw hex in the .tt rule. Same .tt class reused by Tooltip and TruncatedTitleTooltip — no inline-style drift.
Accessibility:
  ✓ Text vs bg — light #FFFFFF on #0F172A = 17.85:1 (target 4.5:1, 1.4.3)
  ✓ Text vs bg — dark #17171E on #F9FAFB = 16.10:1 (target 4.5:1, 1.4.3)
  ✓ Status not by colour alone — tooltip is text-only; conveys information through its label (1.4.1)
  ✓ Hit target — tooltip is hover-revealed; the trigger element carries 2.5.8 responsibility, not the tooltip itself
```
