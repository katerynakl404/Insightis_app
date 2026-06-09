# PasswordInput — current (prod)

Live baseline from `@insightis/ui` `PasswordInput/index.tsx`.

Composition (no own visual tokens): `InputGroup` + leading `Lock` icon + `InputGroupInput[type=password|text]` + trailing `IconButton` toggling visibility (`Eye` / `EyeOff`).

## Spec
- Inherits everything from [InputGroup](InputGroup.md): sizes xs–xl, variants primary/outline, focus / error / disabled.
- Leading addon: `<Lock size-4 shrink-0 aria-hidden>` inside `InputGroupAddon align="inline-start"`.
- Trailing addon: `IconButton variant="transparent" rounded="sm" size="sm"` with `aria-label="Show password" | "Hide password"` (or consumer-provided `toggleShowLabel` / `toggleHideLabel`); icon `Eye` when visible, `EyeOff` when hidden.
- Input type swaps `"password"` ↔ `"text"` on toggle.

## States
- **Default** — InputGroup default; password type, dot masking.
- **Visible** (toggle pressed) — input type `text`, trailing icon `Eye`.
- **Focus / Error / Disabled** — delegated to InputGroup ([see InputGroup](InputGroup.md)).
- No explicit hover; trailing IconButton inherits IconButton transparent hover (text → `Brand/Primary`).

## A11y
- `<Lock>` is `aria-hidden`.
- Trailing IconButton has dynamic `aria-label` reflecting the action (show vs hide).
- Field accepts native input props (`ref`, `name`, `onChange`, react-hook-form `register`).
