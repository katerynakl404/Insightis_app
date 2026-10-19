# legacy-html/ — the previous approach, archived 2026-10-16

## What

Everything the Insightis design handoff was built on before the prototypes moved to DevartUI —
plain HTML pages on one hand-written stylesheet, a storybook of its own, and the docs that
tracked every change from prod to the expected design. Moved here as whole trees, so every
relative link between these files still works exactly as before.

| Path | What it is |
|---|---|
| [`pages/`](pages/) | The HTML/CSS prototypes — `approved/`, `concept/`, `concept/auth/` — on [`pages/kit-theme.css`](pages/kit-theme.css) (all CSS, every token) and [`pages/kit-kit.js`](pages/kit-kit.js) (shared behaviour: tooltips, menus, plan lock …) |
| [`insightis-preview-kit.html`](insightis-preview-kit.html) | The kit's storybook — every component, every state, the live "Spec (live)" panel |
| [`current/`](current/) · [`changes/`](changes/) · [`page-changes/`](page-changes/) | The prod state, the prod → Expected change per component, and per screen |
| [`components/`](components/) · [`skeletons/`](skeletons/) | Component markup fragments and per-component skeleton pages |
| [`claude-code/`](claude-code/) | The working rules of the kit ([`instructions.md`](claude-code/instructions.md)) and its override check |
| [`reports/`](reports/) · [`specs/`](specs/) | Dated audits and reports; the corrected briefs (ТЗ) |
| [`CHANGELOG.md`](CHANGELOG.md) · [`dark-token-changelog.md`](dark-token-changelog.md) | The release log of the kit; the dark-theme token log |
| [`HANDOFF-README.md`](HANDOFF-README.md) | The repository's README as it was, verbatim |
| [`CLAUDE.md`](CLAUDE.md) | The project instructions as they were, verbatim — they still apply to anything done inside this folder |
| `archive/`, `a11y/`, `release-notes/`, `insightis-preview-kit.html.bak` | Local only, never in git (as before): retired kit iterations, accessibility self-checks, release notes |

## Why

On 2026-10-08 every prototype was rebuilt on `@devart/ui-react` in [`../devart-ui/`](../devart-ui/README.md),
and on 2026-10-15 all of them were verified against these originals (pixel, text and
interactive-state comparison). Two living prototypes of the same screens are two sources of
truth, so the HTML/CSS one is frozen here: "все що стосувалось попереднього підходу має бути
занесено в одну папку та заархівовано" (2026-10-16).

## What still reads it

- **The originals.** `devart-ui/tools/compare.mjs`, `interact.mjs` and `measure.mjs` load each
  page from `legacy-html/pages/<page>.html` and its rebuild from `devart-ui/pages/<page>.html`.
- **The locked page rules.** `page-changes/<page>.md` still binds the matching devart-ui page.
- **Old links.** The published addresses (`…/Insightis_app/pages/…`, `…/insightis-preview-kit.html`,
  `…/changes/…` and the rest) are redirected here by [`../404.html`](../404.html) on GitHub Pages.
  GitHub's own file view (`github.com/…/blob/main/pages/…`) has no redirects — use
  `…/blob/main/legacy-html/pages/…` there.

Frozen means no new work lands here. A fix the devart-ui pages need is made in `devart-ui/`.

## How to restore

1. Move each entry of the table back to the repository root (`git mv legacy-html/<path> <path>`;
   `HANDOFF-README.md` goes back as `README.md`, `CLAUDE.md` replaces the root one).
2. Point the three devart-ui tools back at `pages/` (`path.join(repo, 'pages', rel)` and the
   `${BASE}/pages/` URLs in `compare.mjs`, `interact.mjs`, `measure.mjs`).
3. Undo the 12 links rewritten for the move — the ones that cross this folder's edge: `changes/Radius.md`
   (`../../CLAUDE.md` → `../CLAUDE.md`), `pages/approved/user_profile-modal.ds.html`
   (`../../../ds-bundle/` → `../../ds-bundle/`), the root `CLAUDE.md`, `devart-ui/README.md` and
   `working/README.md`.
4. The Claude Code commands and skills of this approach were retired the same day; their old
   versions are in `claude-tooling/` (local only): copy `claude-tooling/commands/*` back into
   `.claude/commands/` and `claude-tooling/skills/*` over `.claude/skills/`.
5. The `Insightis/legacy-html/…` mentions in дизайн DevartUI and in AI connectivity
   (`DESIGN-SYSTEM-CHANGES.md`, `ActivityTray.md`, `StatusView.md`, `tailwind-preset.ts`) go back to
   `Insightis/…`.
6. Delete `../404.html` and the `legacy-html/` entry from the root README.
