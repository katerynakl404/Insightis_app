# PasswordInput — prod → expected

Source: `@insightis/ui` `PasswordInput/index.tsx`. Baseline: [`../current/PasswordInput.md`](../current/PasswordInput.md).

**PasswordInput has no own visual tokens** — it composes [`InputGroup`](InputGroup.md), the `Lock` icon, an `InputGroupInput`, and an [`IconButton`](IconButton.md). Every visual state is delegated.

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
