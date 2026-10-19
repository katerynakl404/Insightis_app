# Insightis — Design Handoff Kit

A workflow and a self-contained preview kit for preparing precise UI-change examples for developers, using the product's real design system.

## Contents

The kit is **two files** (kept deliberately split):

- **`insightis-preview-kit.html`** — the storybook: component markup + JS. **It has no `<style>` block** — every selector lives in the external stylesheet.
- **`pages/kit-theme.css`** — all CSS, and the **single source of truth for every value**. The three-layer token system (Primitives → Semantic → Component-scoped) for light and dark, the typography / radius / spacing / shadow / opacity scales, and all component rules live here.

The storybook reflects the current design system:
  - Primitives (Slate, Brand, Tertiary, Red, Grey) and semantic tokens (Surface, Brand, Text, State, Feedback, Stroke) for both light and dark modes.
  - Typography (DM Sans, content/prose levels + a separate UI-text size×weight table), and tokenised radius (`--radius-*`), spacing, shadow (`--shadow-*`), opacity scales.
  - Components rendered as live demos with full state coverage (default / hover / pressed / focus / disabled / loading) for screenshotting.
  - **Live "Spec (live)" panel under every component** — see below.
  - Light/dark logos, embedded inline and theme-aware.

### The live Spec inspector (why specs never drift)

Under each component the storybook renders a collapsible **"Spec (live)"** table that reads the **rendered component's computed styles** at view-time and presents a complete, per-state, per-theme values table. Because it derives from the live element, it is **complete by construction and cannot drift** from the CSS. It also **maps values back to tokens** — colours → `--brand-primary` etc., box-shadow → `--shadow-focus`, font-size → `--text-14`, font-weight → `Medium 500`, radius → `--radius-md`, opacity → `--opacity-disabled` — so the spec reads in design-system terms, not raw `rgb()`/px. Size variants get a dedicated **Sizes** panel (height/padding/font per step). `changes/*.md` records the diff + rationale; the panel supplies the values.

### Viewing — use http, not `file://`

**Open the storybook over http** (a local static server, or GitHub Pages), e.g. `http://localhost:8765/insightis-preview-kit.html`. The Spec inspector needs to read the stylesheet (`cssRules`), which Chrome **blocks for `file://`** pages. There is an embedded fallback so token *names* still resolve from `file://`, but http is the supported path and renders everything reliably. (A simple static server is in `.claude/launch.json` / `.claude/static-server.ps1`.)

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
- Make visual tweaks by editing **`pages/kit-theme.css`** (the single source of values) — not the HTML, which carries no styles. The Spec panel re-derives automatically.
- If the product theme changes, update the token blocks (`:root` / `.dark`) in **`pages/kit-theme.css`**. If you add/rename/remove a `--token`, also regenerate the `FALLBACK_TOKEN_NAMES` list in the storybook (the on-page drift banner flags this when viewed over http) — see `CLAUDE.md`.
- **Kit mirrors the concepts:** if a component changes on a concept page (`pages/concept/*.html`), update the kit (storybook demo + `kit-theme.css`) in the same pass. Shared component CSS lives in `kit-theme.css`, never in a page `<style>` block — otherwise the storybook renders the component unstyled.

## Accuracy notes

- Values are authoritative in **`pages/kit-theme.css`**; the live Spec panels derive from it. Per-component change rationale (prod → expected diffs + why) lives in **`changes/*.md`**; the colour-token migration is in **`changes/colors.md`**; per-screen differences in **`page-changes/*.md`**.
- Complex interactivity (animations, Radix internals) is simplified in mockups —
  enough for a "how it should look" specification.
