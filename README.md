# Insightis — prototypes on DevartUI

Every screen of Insightis as a working prototype, built from the real design system
(`@devart/ui-react`, DevartUI): every page, every state, light and dark, desktop and phone.

## What is where

| Folder | What it is |
|---|---|
| [`devart-ui/`](devart-ui/README.md) | **The prototypes.** Pages in `devart-ui/pages/` (`approved/`, `concept/`, `concept/auth/`); what DevartUI does not have lives once in the Insightis kit (`devart-ui/insightis-kit/`, with its own [storybook](devart-ui/insightis-kit/storybook.html)); review chrome in `devart-ui/review-kit/`. Rules, page template, progress: [`devart-ui/README.md`](devart-ui/README.md) |
| [`ds-bundle/`](ds-bundle/README.md) | A vendored copy of the DevartUI bundle, built in **дизайн DevartUI**, the design-system repository (`Design system/devart.ui.react`) |
| [`legacy-html/`](legacy-html/README.md) | **The previous approach, archived 2026-10-16** — the HTML/CSS prototypes on `kit-theme.css`, the preview kit (storybook), the change docs, reports, specs and the changelog. Frozen; still the reference the prototypes are checked against |

`working/` and `knowledge-sharing/` exist only locally (gitignored).

## Viewing

Open over http — a local static server (`.claude/launch.json`) or GitHub Pages:

- Prototypes: `https://katerynakl404.github.io/Insightis_app/devart-ui/pages/approved/chat-landing.html`
- Insightis kit storybook: `https://katerynakl404.github.io/Insightis_app/devart-ui/insightis-kit/storybook.html`
- The archived HTML/CSS version: `https://katerynakl404.github.io/Insightis_app/legacy-html/…`

Addresses published before the archive (`…/Insightis_app/pages/…`, `…/insightis-preview-kit.html`,
`…/changes/…`) still open: [`404.html`](404.html) sends them on to the same file in `legacy-html/`.

The repository's previous README (the design handoff kit) is kept verbatim in
[`legacy-html/HANDOFF-README.md`](legacy-html/HANDOFF-README.md).
