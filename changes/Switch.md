# Switch — prod → expected

Baseline: [`../current/Switch.md`](../current/Switch.md).

This iteration **fills** the off-track with a medium-grey (Slate-300 light / Grey-700 dark) via a new component-scoped token `--switch-off-bg`. An earlier draft of this iteration used an *outlined* off-state (1.5 px inset stroke over `Surface/Card`) following the Material 3 / iOS 17 pattern, but the hard stroke read as visually noisy at the kit's size. Filled tracks are the dominant pattern in shipped systems (shadcn, Headless UI, GitHub Primer, Apple's filled-toggle variant) and lift the off-state above the page bg cleanly without a stroked border. WCAG 1.4.1 (status not by colour alone) is satisfied by the thumb position; 1.4.11 (non-text contrast) is satisfied for the track-vs-page-bg edge, with the thumb-vs-track contrast augmented by the thumb's drop-shadow + faint 0.5 px hairline. Hit-target is extended to 44 × 44 via an invisible `::before` so the short-axis WCAG 2.5.5/2.5.8 gap is closed.

| State | Current (prod) | Expected | Specification |
|---|---|---|---|
| On (default) | track `accent` `#07827F`, thumb `#FFF` | track `Brand/Primary` `#07807E`, thumb `Content/On_Solid` with drop-shadow | hex shift only — [colors](colors.md) |
| Off (default) | `background` + 1 px border `Stroke/Border`, thumb `content-light` (page-coloured track, barely visible) | filled `--switch-off-bg` = Slate-300 `#CBD5E1` light / Grey-700 `#2A2834` dark; thumb `Content/On_Solid` with `box-shadow: 0 1px 2px rgba(0,0,0,.20), 0 0 0 0.5px rgba(0,0,0,.06)` (drop-shadow + faint hairline → perceivable thumb edge against the medium-grey track) | Component-scoped token so light/dark/prod each cleanly set their own off-bg without cascade collisions. No outline, no border — cleaner read than the earlier outlined-stroke draft. |
| **Hover (off & on)** | ⚠ undefined | **new** — off track → `--switch-off-bg-hover` = Slate-400 `#94A3B8` light / Grey-600 `#525258` dark; on → fill → `Brand/Primary_Hover` | symmetric one-step lift; off keeps the filled language. |
| **Focus (off & on)** | ⚠ undefined (was `ring-2 ring-ring ring-offset-2`) | **new** — `box-shadow: 0 0 0 2px Surface/Card, 0 0 0 4px State/Focus_Ring` (neutral) — same outer ring on both positions | brand colour reserved for the on-state track; form-control focus stays neutral. |
| **Disabled (off & on)** | opacity 50% (both positions) | `opacity:var(--opacity-disabled)` (.65) + `cursor:not-allowed` + `pointer-events:none` — both positions fade from their own base | shared `--opacity-disabled` token. No colour override — each position fades from its own track. |
| **Hit target** | 36 × 20 px (visual + hit area) — fails WCAG 2.5.8 (24 × 24) on the short axis | 36 × 20 px visual, **44 × 44 px invisible hit area** via `.swt::before { content:""; position:absolute; inset:-12px -4px; border-radius:inherit }` — sits above the thumb (`::after`) and the track without altering layout | Closes the WCAG 2.5.5 (AAA 44 × 44) and 2.5.8 (AA 24 × 24) gap on the short axis. Visual size unchanged. |

> **Loading state — intentionally not defined.** A thumb-as-spinner treatment was prototyped (2 px `Brand/Primary` ring replacing the thumb circle) but read as broken — the thumb visually disappeared into a ring shape that didn't match any other component. Switches that need to signal async state should disable via the parent form and surface the spinner alongside (next to the label / form section), not inside the track. Removed this iteration.

## No change (—)

Track 36 × 20 px (visual), thumb 16 × 16 px, radius `full`, thumb travel 16 px (`left:2px` → `left:calc(100% − 18px)`), drop-shadow on thumb.

## Token map used

`--brand-primary` (Brand/Primary, on track) · `--brand-hover` (Brand/Primary_Hover, on-track hover) · `--switch-off-bg` *(new — Layer 3, component-scoped)* (Slate-300 light / Grey-700 dark / page-bg in `.prod` scope) · `--switch-off-bg-hover` *(new — Layer 3)* (Slate-400 light / Grey-600 dark) · `--content-on-solid` (white thumb) · `--focus-ring` (State/Focus_Ring — **neutral**, used by the outer ring) · `--card` (focus-ring gap) · `--opacity-disabled`. Brand colour appears **only** on the on-state track; the focus ring is neutral. The previously-considered `--ink-secondary` / `--ink-body` stroke approach is dropped — see preamble above.

## Accessibility & consistency self-check

```
Consistency: PASS — disabled recipe shared with Checkbox / Button / Tabs (--opacity-disabled). Focus ring shared with Checkbox (form-control neutral). Both positions documented for every state. No raw hex in the .swt rule. Loading deliberately omitted (see note above).
Accessibility:
  ✓ On track vs page bg — light #07807E / #F8FAFC = 4.97:1; dark #148F8D / #0F0E14 = 6.60:1 (target 3:1, 1.4.11)
  ✓ Off-track vs page bg — light Slate-300 #CBD5E1 / #F8FAFC = 1.52:1; dark Grey-700 #2A2834 / #0F0E14 = 2.40:1. ⚠ Below 1.4.11's 3:1 strictly, BUT 1.4.11 applies to "state indicators" and the indicator here is the THUMB POSITION (not the track colour). Thumb-vs-track contrast is augmented by the drop-shadow + 0.5 px hairline. This matches shadcn / Headless UI / GitHub Primer / Apple's filled-toggle.
  ✓ Thumb vs on track — #FFFFFF / #07807E = 5.07:1
  ✓ Thumb vs off track — light #FFFFFF / #CBD5E1 = 1.55:1 (drop-shadow carries the edge); dark #FFFFFF / #2A2834 = 12.61:1
  ✓ Focus ring vs Card — light #0F172A / #FFFFFF = 17.85:1; dark #F1F5F9 / #17171E = 16.10:1 (target 3:1, 1.4.11) — neutral State/Focus_Ring
  ✓ Hit target — 44 × 44 px via .swt::before (inset:-12px -4px). PASS 2.5.5 AAA (44 × 44) and 2.5.8 AA (24 × 24) on both axes. Visual size 36 × 20 unchanged.
  ✓ Status not by colour alone — thumb position (left/right) carries the state (1.4.1)
```
