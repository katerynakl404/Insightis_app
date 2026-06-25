# PasswordInput — prod → expected

Source: `@insightis/ui` `PasswordInput/index.tsx`. Baseline: [`../current/PasswordInput.md`](../current/PasswordInput.md).

**PasswordInput has no own visual tokens** — it composes [`InputGroup`](InputGroup.md), the `Lock` icon, an `InputGroupInput`, and an [`IconButton`](IconButton.md). Every visual state is delegated.

## Composition — reused components & exact dimensions

PasswordInput draws **all** dimensions from the components it composes; it adds nothing of its own.

| Slot | Reused component + variant | Key dimensions (from `kit-theme.css`) |
|---|---|---|
| Shell | [`InputGroup`](InputGroup.md) `variant="transparent"` `size="sm"` `rounded="sm"` | **height 32px** (`.igrp.is-sm{height:32px}`, line 1596); radius **6px** (`.igrp` `border-radius:6px`, line 1575); border **1px** `var(--border)`; bg `var(--bg)` (transparent variant — outline would be `var(--card)`); font-size **.875rem (14px)** |
| Text input | `InputGroupInput` (`.igrp-input`) | fills shell height (`height:100%`); padding **0 8px**; font-size **.875rem (14px)**; placeholder `var(--ink-inactive)` (line 1579) |
| Leading icon | `Lock` inside addon `.igrp-add` | addon padding **0 10px**, gap **8px**; svg **20px × 20px** (`.igrp-add svg`, line 1578) |
| Trailing toggle | [`IconButton`](IconButton.md) `variant="transparent"` `rounded="sm"` `size="sm"` (Eye / EyeOff) | ⚠ kit `.iconbtn` defines only one size: **36px × 36px**, radius **6px (.375rem)**, border 1px transparent (line 582) — there is no `.iconbtn-sm` rule, so the documented `size="sm"` cannot be reproduced from CSS alone; prod's React `size="sm"` IconButton is ~28px. Reproduce as the 36px base unless an `-sm` size token is added. |

> Reference line — InputGroup `size="sm"`: **h 32px · radius 6px · border 1px · input padding 0 8px · 14px text**. IconButton (kit base): **36×36 · radius 6px**. Full specs: [`InputGroup`](InputGroup.md), [`IconButton`](IconButton.md).

| State | Current (prod) · was | Expected · became | Specification |
|---|---|---|---|
| Default | InputGroup default + Lock leading + Eye/EyeOff trailing | — no change | see [`InputGroup`](InputGroup.md) |
| Visible toggle | input type swaps `password` → `text`; trailing icon swaps `EyeOff` → `Eye`; `aria-label` swaps "Show" ↔ "Hide" | — no change (behavior fine) | a11y is correct |
| Focus | inherits from `InputGroup` (border `content-primary`) | inherit `--focus-ring-brand` once [`InputGroup`](InputGroup.md) is upgraded | brand-tinted ring |
| Error | inherits `InputGroup` error styling | — no change (hex → [colors](colors.md)) | red/20 border, red/5 bg, red/60 svg/placeholder |
| Disabled | inherits `InputGroup` (`opacity-50`) | — no change | toggle button is also dimmed via group |

## No change (—)
Icons (Lock leading, Eye / EyeOff trailing), toggle behavior, `aria-label` swap, IconButton variant (`transparent rounded="sm" size="sm"`).

## ⚠ Best-practice states — to define
- **Caps Lock indicator** — surface a warning when caps-lock is on while focused (a11y nice-to-have).
- **Strength meter slot** — currently no surface for it; consumer must compose externally.
- **Match the focus-ring upgrade** queued in [`InputGroup`](InputGroup.md).
