# Insightis — Design Handoff Kit

A workflow and a self-contained preview kit for preparing precise UI-change examples for developers, using the product's real design system.

## Contents

- **`insightis-preview-kit.html`** — a self-contained HTML preview of the design system.
  Opens with a double click in any browser (no dev server, no build, no node_modules).
  It reflects the **current** Figma design system from `token-diff-report.md`:
  - Primitives (Slate, Brand, Tertiary, Red, Grey) and semantic tokens (Surface, Brand, Text, State, Feedback, Stroke) for both light and dark modes.
  - Typography (DM Sans, standard Tailwind scale + semantic levels), radius and spacing scales.
  - Components (Button, IconButton, Badge, Input, TextArea, Checkbox, Switch, Avatar, Tabs, ProgressBar, Spinner, Tooltip, Dropdown, Modal, Table, Pagination).
  - **Component states** rendered statically (default / hover / pressed / focus / disabled), so transient states can be screenshotted for handoff.
  - Light/dark logos from `Insightis platform/logo`, embedded inline and theme-aware.
- **`token-diff-report.md`** — the authoritative color-token migration spec (old → current).
- **`logo/`** — the source SVG logos (`Insightis_Light.svg`, `Insightis_Black.svg`).

## How to request a change (3 steps)

1. **Describe the change** as concretely as possible. For a whole screen, attach a
   screenshot of the current page or its exported HTML (Ctrl+S → "Web page, complete",
   or DevTools → Copy outerHTML). The screen is rebuilt on the real components and the change applied.

2. **You get one HTML mockup file.** Open it, review it, ask for tweaks. Browser
   iteration is free — usage limits only apply to producing the change itself.

3. **Hand off to the developer**: a screenshot of the mockup + a short "replace X with Y"
   spec in component terms (e.g. "Button variant primary → secondary, size md → sm, move to the right toolbar").
   That is the exact specification.

## Why code, not Figma

- The developer gets an example built on the same components as the product → zero guesswork.
- Redrawing in Figma costs more and produces a less accurate artifact.
- The source of truth for edits stays in code, which is editable end to end.

## Keeping usage low

- Tokens and theme are extracted **once** — no need to touch them again.
- Batch several edits into one request instead of many small ones.
- Make tiny visual tweaks (spacing, color, size) directly in the HTML —
  all classes are standard Tailwind plus the `.btn-*` / `.badge-*` helpers.
- If the product theme changes, just update the `:root` block in the kit's `<head>`.

## Accuracy notes

- Colors reflect the current Figma system (`token-diff-report.md`); the platform code
  still uses the old tokens — see the report for the full migration list.
- Complex interactivity (animations, Radix internals) is simplified in mockups —
  enough for a "how it should look" specification.
