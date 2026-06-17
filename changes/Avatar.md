# Avatar — prod → expected

Baseline: [`../current/Avatar.md`](../current/Avatar.md).

| Part | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Initials bg | `background` (Slate-50, light neutral surface) | `Brand/Primary` (`--brand-primary`) | — | Defined in v1.0; no change this iteration |
| Initials text | `content-body` (`--ink-body`) | `Text/Secondary` *(doc error — CSS had `#fff`)* | `Content/On_Solid` (`--content-on-solid`, white) | v1.0 doc mistakenly wrote `Text/Secondary`; CSS had raw `#fff`. Fixed this iteration: tokenised to `--content-on-solid` (white, theme-independent). Same token as Button primary text, Checkbox mark, Switch thumb. 5.07:1 on Brand-600 light / 4.54:1 dark (target 3:1 UI, 1.4.11). |
| Counter chip bg | `chip` (`#FAFAFA`) | `Surface/Chips` `--chips` (`#F8FAFC`) | — | Hex shift only (→ [colors](colors.md)); no change this iteration |
| Counter chip text | `content-secondary` | `Text/Secondary` `--ink-secondary` | — | Hex shift only |

## No change (—)

Size 32 px (`size-8`), radius `full`, font-size `.75rem`, font-weight 600.

## Token map used

`--brand-primary` (initials bg) · `--content-on-solid` (initials text — **always white**, theme-independent; shared with Button/Primary, Checkbox mark, Switch thumb) · `--chips` (counter bg) · `--ink-secondary` (counter text).
