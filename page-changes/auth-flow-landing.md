# Auth flow — sign-up &amp; password (concept)

Folder: [`pages/concept/auth/`](../pages/concept/auth/) — entry [`login.html`](../pages/concept/auth/login.html).

**Multi-page click-through, built on the Insightis kit, dark theme only.** Each screen is its
own HTML page; real buttons/links navigate between them, and a **header screen-switcher**
(`<select>`) on every page jumps to any screen. Reproduces the production sign-up +
password-creation flow.

## Build

- **`../../kit-theme.css`** — the kit is the design system (dark tokens via `<html class="dark">`).
  Controls are kit components: `.btn .btn-primary` / `.btn .btn-outline`, `.igrp .var-outline .is-xl`
  (icon inputs), `.cbx` (Terms). No `kit-theme.css` changes — everything composes.
- **`auth-concept.css`** — page-layout only (`.au-*`): the pre-auth card/shell, header switcher,
  password-requirements list, status blocks (StatusView icon-circle recipe). Restyles no kit component.
- **`auth-concept.js`** — injects the brand logo, builds the header switcher, wires the password
  show/hide toggle, the live requirements checklist, and confirm-password matching.
- Copy from the app's `locales/en/auth.json`; password policy (8 chars + upper/lower/digit/symbol)
  from the app's `PasswordRequirementsList`.

## Logo

Uses the **current** brand lockup (`#lg`) rendered exactly like the kit sidebar
(`.sbx-brand-logo`): mark = `--logo-mark`, wordmark = `--logo-ink`. (The identity server's inline
thin-outline mark was outdated and is not used.)

## Screens (pages)

Sign-up: `register` → `check-email` → `confirm-email` (+ `confirmed` / `confirm-error`) → `login`
→ `signed-in`. Reset: `forgot-password` → `reset-sent` → `reset-password` (+ `reset-done` /
`reset-error`). System: `error` (identity-server authorize error). The header switcher lists all
of them. `illustrations.html` is a showcase of the error-art packs (not a flow screen).

Password requirements are hidden by default and **expand once the field is focused / typed into**
(matches prod). The three error screens (`error`, `confirm-error`, `reset-error`) use cute
custom SVG illustrations; three style packs (Soft / Line / Flat pop) are shown in
`illustrations.html` — the live pages currently use the Soft pack.

## Notes

No kit-component deltas — a flow reproduction, not a kit change. Two "(demo)" links stand in for
the email-gated hops (open confirmation / reset link); `signed-in` is the demo terminal — neither
is a product screen. Dark theme only (no light/theme toggle).
