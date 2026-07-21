# CLAUDE.md

Project: Insightis design-system handoff artifact.

**Before doing anything, read [`claude-code/instructions.md`](claude-code/instructions.md).**

Quick rules:
- `current/` = the live prod state (source of truth). `changes/` = diffs **from `current/`**, never from a previous iteration.
- When prod updates: update `current/` first, then re-derive `changes/`.
- The kit is **two files**: `insightis-preview-kit.html` (markup + JS) and **`pages/kit-theme.css`** (all CSS). The HTML has *no* `<style>` block — every selector lives in the external stylesheet. **Before editing any CSS, grep the selector in `pages/kit-theme.css` first; do NOT add CSS to the HTML.**
- **Colour-token discipline (hard rule, blocks merge):** every colour flows through three layers — Primitives → Semantic → Component-scoped. Component rules read `var(--token)`, never inline `color-mix(...)` / hex / `rgb()` — with ONE sanctioned exception: the tint-scale wash recipe `color-mix(in srgb, var(--<semantic base>) var(--tint-N), transparent)` (both halves are tokens; literal % is still forbidden). Tokenise any expression that repeats — overlay strength (6%, 8%, …) lives in exactly one place: the `--tint-N` steps in the TINT SCALE block. Reuse before inventing. New variants must follow their sibling-family's recipe (e.g. all Outlined variants = coloured border + neutral `Text/Body` label). Full rule + self-review checklist in [`claude-code/instructions.md`](claude-code/instructions.md) → "Colour-token discipline".
- Current column = `.prod` scope; Expected column = default tokens.
- No change → `—`. Links stay relative so a clone never breaks.
- Per-screen **change pages** live in **`page-changes/`** (one md per `pages/*.html`, **only Current vs Expected differences**). Naming + how-to: single source in [`page-changes/INDEX.md`](page-changes/INDEX.md).

**Page files show Expected state only** — never add a "Current / Expected" toggle button or `.sb-cur` / `.prod` scoping to `pages/*.html` files. The current prod state already exists on the live product; page files are Expected-only design references.

**Archive folder rules (`archive/`)** — `archive/` is the local graveyard for retired design iterations. Three hard rules apply:
1. **Nothing live depends on `archive/`.** No `pages/*.html`, `insightis-preview-kit.html`, `pages/kit-theme.css`, `changes/*.md`, or `current/*.md` may `<link>`, `<script src>`, `@import`, or copy-paste from `archive/`. The folder must be deletable at any time without breaking the kit.
2. **Always preserve verbatim what was archived.** When a user says "send X to archive", create `archive/YYYY-MM-DD-<slug>/` with the original CSS/HTML/JS fragments saved as files there, plus a `README.md` covering *What / Why / How to restore*. Don't summarise — preserve the source so it's recoverable by copy-paste.
3. **`archive/` is not pushed to git** (it's in `.gitignore`). When restoring, the user re-introduces selectors / markup / scripts manually using the README as the recipe.

See `archive/README.md` for the full conventions and per-subfolder structure.

**Spacing follows the 4px design-system step** — never override the global `.cl-page` gap in a page `<style>` block. Use `margin-top` on individual section wrappers at valid 4px-step rem values (`.5rem`, `.75rem`, `1rem`, `1.25rem`, `1.5rem`, `2rem`, …).

**Visibility-toggle classes must never sit directly on a kit component** — kit components (`.banner`, `.card`, `.chip-row`, `.swt`, etc.) define their own `display` property (often `flex`). Putting a visibility class such as `mx-c1-only`, `mx-c3-only`, `mx-browse`, `mx-mymetrics` directly on the component overrides that `display` and breaks its layout. **Always wrap in a neutral `<div>`:**
```html
<!-- ✓ correct -->
<div class="mx-c1-only"><div class="banner" …>…</div></div>

<!-- ✗ breaks layout — mx-c1-only{display:block} overrides banner{display:flex} -->
<div class="banner mx-c1-only" …>…</div>
```
This applies to every visibility-toggle class. The wrapper `<div>` has no semantics of its own and does not affect spacing.

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

**Undesigned sub-surfaces (dropdowns, modals, popovers)** — When creating or redesigning a page, list every interactive trigger that opens a surface (dropdown, modal, drawer, popover). For each one, ask: *"Is this in scope, or should I add a WIP placeholder?"* If not in scope, prepend `<div class="menu-wip" aria-hidden="true">…</div>` inside the menu and add a `<div class="pg-wip-tag" aria-hidden="true">In redesign</div>` side label to the page. Do not move a page to approved/finalised without coordinating all opening elements. Markup: `.menu-wip` (amber header row in any `.menu`) and `.pg-wip-tag` (inline amber badge — place inside the topbar title row alongside the page title, wrapped in a `flex` container) are both defined in `pages/kit-theme.css`. **Do not** place `.pg-wip-tag` as a standalone `<div>` directly inside `<body>` — it is an inline badge, not a fixed-position overlay.

## Change discipline (hard rules — read before editing any kit component)

These rules exist because previous iterations let me silently rewrite already-agreed styles. Result: kit-theme.css, storybook demos, changes/*.md, and 6 pages drifted out of sync. Catching it after the fact is painful. The rules below catch it before.

### 1. Don't re-decide what's already documented

If a component has an entry in `changes/<Component>.md` AND a matching block in the `#<component>` storybook section, those values are the **agreed contract**. Reading the doc and noticing a small inconsistency does not give me license to "harmonize" the values silently. Two valid moves:

- **Implement** what the contract says, even if it disagrees with what's currently in `kit-theme.css`. The contract wins; align the CSS to it.
- **Surface the conflict** and ask: *"changes/X.md says Y but kit-theme.css does Z — which one is right?"* Then wait for an answer before editing.

Never invent a third value as "the obvious midpoint". Subtle visual values (hover %, shadow depth, transition duration) carry **intent** that I cannot reverse-engineer from inspection.

### 2. Propagate every kit-level change to all consumers in the same pass

If I touch a rule in `pages/kit-theme.css` (token, selector, recipe), the change is incomplete until I also:

1. Search every page that uses it: `Grep "<class-name>"` over `pages/*.html` + `insightis-preview-kit.html`. If the markup changes too (e.g. added attributes, new wrapper), update every page that copies the component.
2. Update the storybook block in `insightis-preview-kit.html` (`#<component>` section) — both the Preview and the States table. Inline demo styles in storybook cells **must match** the live CSS rule.
3. Update `changes/<Component>.md` — the relevant row in the "was → became" table needs the new spec; the token map and accessibility self-check at the bottom may need new entries.
4. Update `current/<Component>.md` only if prod itself shipped a change (rare).

When any of (1)–(3) is skipped, the artifact lies — the doc says one thing, the CSS does another, two pages render differently. Don't ship a half-propagated change.

**Lockstep applies to EVERY edit, in BOTH directions.** The three surfaces have **distinct jobs** and no longer hand-copy values to each other (that copying is what drifted; the live Spec inspector now derives values):
- **`pages/kit-theme.css`** — implementation + **single source of every value**.
- **storybook `#<component>`** — live demos (full state/variant coverage) + the auto-generated **"Spec (live)" panel** that reads computed styles and maps them to tokens. The panel supplies the values; you don't hand-type them. Your job is correct, complete demo markup (real kit classes, every state + size) so the derived spec is real.
- **`changes/<Component>.md`** — the change *story*: prod→Expected diff, the *why*, token map, `No change (—)`, a11y self-check. NOT a re-dump of values.

Editing one still obligates the others (CSS value tweak → ensure the demo renders the case → record the change + rationale in the doc), but:
- **Values live in CSS, not prose.** Never restate a px/hex/weight/shadow in `changes/*.md` or storybook prose when the panel already derives it — record token NAMES + rationale. If the panel shows a value raw (no token), that's a cue to tokenise, not to document the raw value.
- **Intra-file consistency:** a comment stating a value (`/* scale(.985) */`) must match its rule (`scale(.99)`); fix it in the same edit.
- **Demos use real kit classes + cover every state/variant** — the panel only reflects what the demo renders; inline styles in demos are for layout only, never to fake appearance.
- **Kit mirrors concepts:** a component change on a concept page propagates to the kit (storybook demo + `kit-theme.css`) the same pass; shared component CSS lives in `kit-theme.css`, never a page `<style>` block (molecule CSS hiding in a page `<style>` is why the metrics table / gradient banner / prov-card rendered wrong in the storybook).

Full rule: [`claude-code/instructions.md`](claude-code/instructions.md) → "Lockstep — implementation, live demo, and change-story stay in sync".

### 3. Confirm before modifying agreed-and-already-implemented visuals

Pattern that bit us: user agrees on design X, I implement X, user approves, weeks later I read the code and "improve" X to Y based on my own taste. **Don't.** Anything labelled in the comment as "agreed", "locked", or "spec — see #<component>" — or anything documented in `changes/*.md` with a "became" value — is a frozen contract. To change it I must:

1. Quote the current contract back: *"the current rule is `background: color-mix(...white 50%, transparent)`, documented at kit-theme.css:907 and storybook line 735"*.
2. State the specific concern with an observation: *"on dark theme the 50% white reads as a hot highlight against grey-800"*.
3. Propose a replacement value and explain how it preserves the original intent.
4. Wait for a yes/no.

Removing a rule, dropping an `.dark` override, or replacing a documented mix is the same as proposing a new contract — it requires the same approval cycle.

### 4. Tokenise any value that appears in more than one place

If the same hover %, transition duration, scale value, or shadow recipe needs to live on multiple selectors, lift it to a `--token`. Otherwise the next person (or the next me) will edit one and miss the other, and the visual will drift. Existing examples: `--motion-fast/base/slow`, `--content-max-narrow/wide`, `--state-hover`, `--brand-primary`. New ones are cheap to add — name them by intent ("--hover-lift-overlay") not by value ("--white-50").

**Adding / renaming / removing a `--token` obligates regenerating the storybook fallback list.** The live Spec inspector reads token names from `kit-theme.css` at view-time (drift-proof) — EXCEPT on `file://`, where Chrome blocks `cssRules`/`fetch`, so it falls back to the embedded `FALLBACK_TOKEN_NAMES` array in `insightis-preview-kit.html`. That array is the one hand-synced copy of the token-name set. When you touch the token set, regenerate it in the same pass:
```
grep -oE '\-\-[A-Za-z0-9_-]+[[:space:]]*:' pages/kit-theme.css | sed -E 's/[[:space:]]*:$//' | sort -u
```
paste the comma-joined result into `FALLBACK_TOKEN_NAMES` (regen command is also in the comment above the array). Safety net: when viewed over http the storybook auto-compares the live token set against this array and shows an amber `.spec-drift-note` banner (+ a `console.warn`) listing the new/removed tokens if it's stale — so drift is caught, but fixing it is still a manual regen.

### 4a. Cascading delete — when removing something, remove everything that hangs off it

Whenever a feature, class, function, or block is removed, the deletion is incomplete until every dependent thing is also gone:

- **CSS class removed** → also delete: every markup that uses the class (in `pages/*.html`, `insightis-preview-kit.html`); any JS that references it (`getElementById`, `querySelector`, `classList.toggle`, etc.); any comments that mention the class; any related modifier classes (`.foo-active`, `.foo--variant`); any `changes/<X>.md` row that documents it.
- **JS function removed** → also delete: every call site (inline `onclick`, event listeners, other functions calling it); any DOM elements or attributes that only exist to be its target (`data-action`, `aria-controls` referencing things only this fn touched).
- **Feature / component removed** → also delete: CSS rules, markup occurrences, storybook section in `insightis-preview-kit.html`, `current/<X>.md`, `changes/<X>.md`, the sidebar link in the kit's left nav, page-level inline styles that override it.
- **Markup element removed** → also delete: associated CSS rules that targeted it via class/id; JS handlers attached to it; aria-relationships pointing to it (`aria-controls`, `aria-labelledby`, `aria-describedby`).

The failure mode is "orphan code": a JS handler that runs but its DOM target is gone, a CSS rule that no longer matches anything, a stale comment that references a deleted feature. These accumulate silently and the artifact rots.

Before completing a delete, run a `Grep` sweep for the removed identifier across the whole repo. If anything still references it, that thing is also part of the delete.

### 5. When asked to verify, verify against the live Spec panel + CSS — not against memory

If the user says "this doesn't match what we agreed", the first move is to read the **live Spec (live) panel** for the component (the derived truth) and the `kit-theme.css` rule behind it, plus the rationale in `changes/<Component>.md`. Quote what's there, then compare with the current rendering. CSS/panel is the value truth; the doc holds the *why*. If they disagree with the user, **ask** which is authoritative — don't trust memory silently.

## How this round failed (so I don't repeat it)

Recent example: SegmentedControl hover.
- The storybook spec text said "no surface change" (one reading).
- The storybook demo inline style said `background: color-mix(white 50%, transparent)` (another reading).
- The CSS rule had been the white-50%/dark-10% recipe for months — the **shipped** agreement.
- I read only the spec text, "fixed" the CSS by removing the bg overlay, and broke the agreed-on design.

The right move was: notice the spec text vs. demo style mismatch, surface it, ask which one is authoritative. Not silently align with one and break the other.
