# CLAUDE.md

Project: Insightis design-system handoff artifact.

**Before doing anything, read [`claude-code/instructions.md`](claude-code/instructions.md).**

Quick rules:
- `current/` = the live prod state (source of truth). `changes/` = diffs **from `current/`**, never from a previous iteration.
- When prod updates: update `current/` first, then re-derive `changes/`.
- The kit is **two files**: `insightis-preview-kit.html` (markup + JS) and **`pages/kit-theme.css`** (all CSS). The HTML has *no* `<style>` block — every selector lives in the external stylesheet. **Before editing any CSS, grep the selector in `pages/kit-theme.css` first; do NOT add CSS to the HTML.**
- Current column = `.prod` scope; Expected column = default tokens.
- No change → `—`. Links stay relative so a clone never breaks.

## Design decisions (locked)

**Card hover** — all card / list-row components (`.chat-row`, `.ds-card`, `.ds-conn-row`, any future card) use the Chats Library hover recipe — NOT `border-color: var(--border-hover)`:
```css
background: var(--state-hover);
border-color: color-mix(in srgb, var(--brand-primary) 25%, transparent);
box-shadow: 0 2px 6px -1px rgba(15,23,42,.08), 0 1px 2px 0 rgba(15,23,42,.04);
```
Rest state also carries a ghost shadow: `box-shadow: 0 1px 2px 0 rgba(15,23,42,.03)`.
`--border-hover` is reserved for **form inputs only** (`.field`, `.ta`, `.igrp`).

**No raw components in page layout** — never drop a bare `.chip`, `.card`, `.badge`, etc. directly into page layout without wrapping it in a page-specific class. Kit components are always composed, never used raw.
