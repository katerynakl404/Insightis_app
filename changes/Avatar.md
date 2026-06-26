# Avatar — prod → expected

Baseline: [`../current/Avatar.md`](../current/Avatar.md).

| Part | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Initials bg | `background` (Slate-50, light neutral surface) | `Brand/Primary` (`--brand-primary`) | — | Defined in v1.0; no change this iteration |
| Initials text | `content-body` (`--ink-body`) | `Text/Secondary` *(doc error — CSS had `#fff`)* | `Content/On_Solid` (`--content-on-solid`, white) | v1.0 doc mistakenly wrote `Text/Secondary`; CSS had raw `#fff`. Fixed this iteration: tokenised to `--content-on-solid` (white, theme-independent). Same token as Button primary text, Checkbox mark, Switch thumb. 5.07:1 on Brand-600 light / 4.54:1 dark (target 3:1 UI, 1.4.11). |
| Counter chip bg | `chip` (`#FAFAFA`) | `Surface/Chips` `--chips` (`#F8FAFC`) | — | Hex shift only (→ [colors](colors.md)); no change this iteration |
| Counter chip text | `content-secondary` | `Text/Secondary` `--ink-secondary` | — | Hex shift only |

## Self-reproducing spec — sizes + types (final contract)

Source: `kit-theme.css:722–725`. One size only — there are **no size variants** in the CSS; every avatar is 32px.

**Base `.ava`** (shared by all three types) — element is an inline `<span class="ava ava-…">`, with the label text (initials / `+N` counter) as its only child; the image type carries an `<img>` child once a source loads. `display:inline-flex; align-items:center; justify-content:center`; `width:2rem; height:2rem` (32px, `size-8`); `border-radius:9999px` (full circle); `font-size:.75rem` (12px); `font-weight:600`. No `line-height` is set — vertical centring is handled by `align-items:center`. No `:hover`/`:focus-visible`/`:active`/`:disabled` states, no transition, no `@media` rule: the avatar is a static, non-interactive element. Add exactly one type modifier below.

| Type | Modifier class | Distinguishing tokens |
|---|---|---|
| **Image** | `.ava-img` | `background:var(--brand-tertiary)` — tertiary-brand backing shown behind/while the image loads (or as fallback tint). Same 32px circle as base. |
| **Initials** | `.ava-init` | `background:var(--brand-primary)`; text `color:var(--content-on-solid)` (white, theme-independent). Holds 2-letter initials at 12px/600. |
| **Count** | `.ava-count` | `background:var(--chips)` (Surface/Chips); text `color:var(--ink-secondary)` (Text/Secondary). Holds the overflow counter (e.g. `+5`). |

> All three are 32px circles differing only by `background` (+ text colour for initials/count). The image type is the only one not previously documented here — added for per-type completeness.

## No change (—)

Size 32 px (`size-8`), radius `full`, font-size `.75rem`, font-weight 600. Image-type backing `--brand-tertiary` is prod state, unchanged this iteration.

## Token map used

`--brand-primary` (initials bg) · `--content-on-solid` (initials text — **always white**, theme-independent; shared with Button/Primary, Checkbox mark, Switch thumb) · `--chips` (counter bg) · `--ink-secondary` (counter text).
