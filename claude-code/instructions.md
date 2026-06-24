# Claude Code — working with the Insightis design-handoff artifact

This repo turns requested UI changes into a visual **Expected** state, applies them to the
preview kit, and records a change file per component. Use Claude Code as the engine that
designs the expected state, edits the kit, and keeps the change files in sync.

## Folder map

| Path | Purpose |
|---|---|
| `insightis-preview-kit.html` | The visual kit. Per component: **Preview** (Current vs Expected) + **States** table (each state: Current, Expected, Specification). Markup + the inline `<script>` block only — **no inline CSS**. |
| **`pages/kit-theme.css`** | **All of the kit's CSS** (tokens in `:root` / `.dark` / `.prod` + every component selector + state classes). Linked from `insightis-preview-kit.html` via `<link rel="stylesheet">`. **Edit CSS here, never in the HTML.** |
| `current/` | **Source of truth for what is LIVE on prod.** One file per component/property. Mirrors the real `@insightis/ui` code (`globals.css` + component classes). |
| `changes/` | One file per component/property. Each documents the diff **`current/` → Expected**. Relative links from the kit point here. |
| `token-diff-report.md` | Authoritative color-token migration reference (prod tokens → new system). |
| `pages/` | Full-page composition mockups + the shared `kit-theme.css`. |
| `logo/` | Brand logos (light/dark). |
| **`archive/`** | **Local graveyard for retired design iterations. NOT pushed to git (`.gitignore`'d). NEVER referenced by live pages, the kit, or any change/current doc — `archive/` must be deletable at any time without breaking the artifact. When the user says "send X to archive", create `archive/YYYY-MM-DD-<slug>/` with the original CSS/HTML/JS fragments saved verbatim + a README covering What / Why / How to restore.** Full conventions: `archive/README.md`. |

## The golden rule (read carefully)

**Changes are always written relative to the present state in `current/` — never relative to a previous iteration.**

`current/` is a moving baseline: prod keeps shipping, so `current/` will be updated over time.
A `changes/<X>.md` file must always describe Expected **as a diff from the current `current/<X>.md`**,
not from whatever the component looked like in an earlier change. If `current/` moves, the
matching change file must be re-derived against the new `current/`.

## Workflow A — a change is requested for a component

1. Read `current/<Component>.md` → this is the live baseline.
2. Design the **Expected** state using `token-diff-report.md` tokens + UX best practices.
3. Edit `insightis-preview-kit.html`:
   - Update that component's **Expected** cells (Preview + States).
   - Fill any empty "Best-practice states — to fill" rows you are now defining (give them real Current/Expected/Spec).
4. Write/update `changes/<Component>.md`:
   - Table: `State | Current (prod) | Expected | Specification`.
   - Diff strictly against `current/<Component>.md`.
   - States/props with no change → `—`.
5. Keep the relative link in the kit (`changes/<Component>.md`) intact.

## Workflow B — prod updated (current changed)

1. Re-read the real code for the component (the `ui` package / platform repo).
2. Update `current/<Component>.md` to the new live state.
3. Update the kit's `.prod` tokens / `.prod <selector>` overrides so the **Current** column matches the new prod.
4. Re-derive every affected `changes/<Component>.md` against the **new** `current/`.

## Workflow C — per-screen change page (md)

Full-screen work (a `pages/*.html` mockup) gets a live markdown change page in **`page-changes/`** showing
**only the Current → Expected differences**. Naming + format rules live in one place —
[`../page-changes/INDEX.md`](../page-changes/INDEX.md). Follow it; don't restate it here.

## Conventions

- **Language:** all files in English.
- **Styling:** pure CSS only (no Tailwind CDN / no JS-driven styling) so the kit renders in any preview.
- **Where the CSS lives — read carefully.** The kit's CSS is in **`pages/kit-theme.css`** (external stylesheet linked from the HTML's `<head>`). `insightis-preview-kit.html` has **no `<style>` block** — any selector you find inside it is dead CSS that the browser never reads. Before editing any rule:
  1. `grep -n "<selector>" pages/kit-theme.css` to confirm the live location.
  2. Make the edit in `pages/kit-theme.css`, never in the HTML.
  3. If you find yourself adding `<style>…</style>` to the HTML, stop — you're about to ship a no-op. Failure mode to watch for: kit suddenly renders raw / unstyled / SVG icons huge → the new rule landed in the HTML and is being ignored.
- **Current column:** driven by `.prod` scope (token values + structural overrides) — see the `.prod{…}` and `.prod .selector{…}` blocks in `pages/kit-theme.css`.
- **Expected column:** uses the default `:root` / `.dark` tokens (the new design system).
- **Theme:** Light/Dark toggle re-themes both columns.
- **No-change marker:** `—`. Components with no change show a muted “No change —” link and need no `changes/` file.
- **Links:** relative (`changes/<X>.md`) so a fresh `git clone` works with nothing broken.
- **No empty / placeholder-only "States — was → became" tables.** If every row in a component's states table would be `— no change` or a `⚠ needed` placeholder, drop the entire `<div class="block">…</div>` containing it. The kit shows real diffs only.
- **No iteration-history language in `current/` or `changes/`.** Files describe **Current → Expected**, full stop. Don't narrate the design process — phrases like *"Previous single token …"*, *"X was tried first"*, *"Iteration history:"*, *"Previous attempts:"*, *"Carried over from previous iteration"*, *"was 'too dark' / 'too green' / 'too clinical'"* belong in commit messages, not in the artifact. State the resolved value + its rationale, nothing about paths-not-taken.
- **No "nothing changed" filler prose in `changes/*.md`.** Don't write sentences like *"The component itself is unchanged from prod"*, *"Same behaviour, same visuals, same defaults"*, *"No change in this iteration"* as an intro paragraph. If nothing about the component changed, use the **`No change (—)` marker** (one line) per the prior rule. If only one aspect changed (e.g. consumer wiring, not the component itself), let the relevant section heading + table say it — don't preface with "the component itself didn't change" because the absence of a "Component" section already conveys that. Reader can see what's listed; saying "and the rest didn't change" is value-less verbosity. Failure-to-learn-from example: TruncatedTitleTooltip.md replaced a clean `No change (—)` marker with *"The component itself is unchanged from prod — same behaviour wrapper, same visuals, same right-side default"* — the same information in 5× the words. Caught by user feedback: *"для чого ти додаєш коменти що нічого не змінилось?"*.

## How to start (Claude Code)

1. Open this folder (the one containing `CLAUDE.md`) in Claude Code. It auto-loads `CLAUDE.md`,
   which points here.
2. Give a task prompt. Template:

```
Read claude-code/instructions.md and CLAUDE.md first.
Task: update the <Component> component to this expected design: <describe the change>.
Steps:
  1. Read current/<Component>.md as the live baseline (the "Current" column).
  2. Apply the expected change in insightis-preview-kit.html:
     - update that component's Expected cells (Preview + States),
     - fill any "Best-practice states — to fill" rows you are now defining.
  3. Update changes/<Component>.md as a diff FROM current/<Component>.md
     (table: State | Current | Expected | Specification; mark unchanged as —).
  4. Run the Accessibility & consistency checks below and report PASS/WARN,
     adding a ⚠️ note in changes/<Component>.md for anything that needs attention.
Keep everything English and pure CSS (no external scripts).
```

3. Concrete example — Button:

```
Read claude-code/instructions.md. Update the Button "primary" variant: the expected design
flattens the accent gradient to a solid Brand/Primary fill with a Brand/Primary_Hover hover.
Use current/Button.md as baseline, update insightis-preview-kit.html (Button Primary Expected
cells + states), rewrite changes/Button.md as a diff from current/Button.md, then run the
accessibility & consistency checks and flag issues.
```

## Kit-component reuse rule (hard rule — blocks merge)

**Never create a new CSS class family for a UI pattern that already exists as a kit component**, without explicit user confirmation.

Before writing any new CSS class:
1. Search for an existing kit component that covers the pattern: `Grep "<pattern>" pages/kit-theme.css` and the storybook.
2. If one exists — use it. Compose with a page-scoped wrapper class if page-specific layout adjustments are needed.
3. If you believe a new class is necessary, state: (a) which kit component you considered, (b) specifically why it doesn't cover the case, (c) what the new class would do differently. Wait for confirmation before creating.

**Examples of violations (all removed):**
- `.mx-c3-hero` — reimplemented `.banner` (title + description + CTA). Fixed: replaced with `.banner`.
- `.mx-c3-metric-chip` — byte-for-byte duplicate of `.chip-meta`. Fixed: replaced with `.chip-meta`.
- `.mx-cat-chips .chip.is-active` — reimplemented chip active state with a different visual (12% tint vs solid fill). Fixed: removed override, standard `.chip.is-active` used.

**Page-scoped layout classes are fine** — classes like `.mx-cat-header` (flex layout wrapper for a page section) or `.mx-c3-chip-label` (an uppercase label inside a card) are page-layout, not component reimplementations. These can stay in the page's own `<style>` block. The rule targets classes that duplicate a component's visual appearance/behavior.

## Change discipline — never silently rewrite agreed-on values (hard rule)

These rules exist because past iterations let Claude silently re-tune already-agreed component
styles. Result: `kit-theme.css`, storybook demos, `changes/*.md`, and the pages drift apart, and
the design loses its source of truth.

### Before changing any kit component

Run this 3-step check **before** editing a kit selector, token value, or storybook block:

1. **Find the contract.** `grep -n "<selector>" pages/kit-theme.css`, then `grep -n "<selector>" insightis-preview-kit.html`, then `cat changes/<Component>.md`. The CSS rule, the storybook demo inline styles, and the `changes/` "became" column together form the contract.
2. **Compare the three.** If they already agree → the contract is frozen. If they disagree → don't pick one and silently align the others; **surface the conflict to the user** and ask which is authoritative. Quote the file:line of each version.
3. **Wait for the answer** before editing.

The temptation is to spot a subtle inconsistency ("this hover overlay is too strong / the spec text contradicts the demo") and "fix" it inline. Don't. Subtle visual values (hover %, shadow depth, transition curve) carry **intent** that can't be reverse-engineered. The 5-second cost of asking is cheap; an unannounced visual revert is expensive.

### When a kit change IS approved, propagate it everywhere in the same pass

A kit-level change is incomplete until **all four** of these are updated in the same commit:

1. **CSS** — the rule in `pages/kit-theme.css`.
2. **Storybook** — the `#<component>` section in `insightis-preview-kit.html`. Both the Preview cells (Current vs Expected) AND the States table. Inline demo styles in storybook cells **must match** the live CSS rule — a contradiction is a bug.
3. **Changes doc** — the matching row in `changes/<Component>.md`. Update the "became" column, the token-map list, and the accessibility self-check section.
4. **Pages** — `grep` every page (`pages/*.html`) for the selector or markup pattern; update each instance if the markup contract changed (added attributes, new wrapper, new menu items).

Partial propagation is the source of every drift bug. Half-done changes ship lies.

### Tokenise anything that repeats

If the same hover percent, transition duration, scale value, motion curve, or shadow recipe lives on two or more selectors, lift it to a `--token` in `:root`. Existing examples: `--motion-fast/base/slow`, `--motion-ease/ease-out`, `--content-max-narrow/wide`, `--state-hover/pressed`, `--brand-primary/hover/press`, `--focus-ring-brand`. Name new tokens by **intent** (`--hover-lift-overlay`) not by value (`--white-50`).

### "Don't decide without confirmation" rule

Anything tagged in CSS comments as "agreed", "locked", "spec — see #<component>", or documented in `changes/*.md` with a "became" value, is a frozen contract. To change it Claude must:

1. **Quote the current contract** with file:line — `pages/kit-theme.css:907 → background: color-mix(in srgb, white 50%, transparent)`, `changes/Component.md → "lift toward selected"`.
2. **State the observation** that prompted the question — *"on dark theme the 50% white reads as a hot highlight"*.
3. **Propose a replacement** + explain how it preserves the original intent.
4. **Wait for yes/no.** Don't queue the edit speculatively.

Removing a rule, dropping a `.dark` override, replacing a documented mix — all count as proposing a new contract.

### Past failure to learn from

**SegmentedControl hover.** Documented spec text said "no surface change"; storybook demo inline style said `background: color-mix(white 50%, transparent)`; CSS rule shipped the white-50%/dark-10% recipe — the actual agreement. Claude read only the spec text, removed the bg overlay, broke the design. Correct move: surface the spec-vs-demo conflict and ask which is authoritative; never align silently.

### Revert reference rule (hard rule)

When the user says "revert to the last push", "go back to how it was", "match the pushed state", or any similar phrasing, **the reference is `HEAD`, not the first/initial commit**. Concretely:

1. **Resolve the actual reference**: run `git rev-parse HEAD` (or `git log --oneline -5`) to confirm what "last push" is. The latest commit on the current branch — not whichever commit shows up first when you grep `git log` without context.
2. **Use the resolved SHA, not a guessed one**: `git show HEAD:path/to/file` to read the canonical content. Don't pick a commit by its position in a list (`git log | head -1` is misleading if the working dir or upstream is behind).
3. **Diff before reverting**: `git diff HEAD -- <file>` shows exactly what your working dir has that the pushed version doesn't. Read that diff before destructive operations.
4. **If the file has multiple commits in its history** (e.g., `git log --oneline -- pages/kit-theme.css` returns more than one), and you're unsure WHICH commit the user means by "last push" — **ASK before reverting**. Don't pick one.

**Past failure:** During a Secondary-button revert iteration, Claude used `1cda71f` (initial commit) as the "last push" reference and reverted to the original Slate-200/Grey-700 border. The actual last push (`594f6fb`) included a Variant-B border-darken change that the user wanted KEPT. Claude only caught the mistake when the user asked *"did you take the first push?"*. Correct move was to run `git rev-parse HEAD` first and use `git show HEAD:<file>` for the canonical content.

### "If unsure — ask, don't guess" rule (hard rule)

When the user's request has ambiguity about scope or reference that could materially affect what's changed:

- **Don't guess and execute**. Even if guessing is faster, the cost of "did the wrong thing, now have to revert AND redo" is much higher than the cost of one clarification round-trip.
- **Resolve the ambiguity in writing**: quote the candidate interpretations back, ask which is correct. Examples of ambiguity worth asking about:
  - "Last push" → which commit exactly? (resolve via `git rev-parse HEAD`, confirm)
  - "Revert this" → revert the file? the component? the whole session's changes?
  - "Change the X" → if there are multiple X (e.g. Secondary button vs. Secondary tokens vs. Secondary in a specific page), name them and ask which.
  - Token rename or restructure: ask before propagating across N files.
- **Better to ask once than recover twice.** The user explicitly OK'd this: *"краще перепитай якщо не впевнений"*.

## Accessibility & consistency — Claude must self-check on every change

After applying a change, Claude **must** verify the following and report each as PASS / ⚠️ WARN
(with the specific value), and add a ⚠️ line in the relevant `changes/<X>.md` for any WARN:

**Consistency**
- Colors come from tokens only (no raw hex outside the Primitives layer). Run the full **Colour-token discipline** checklist (see section below) — no inline `color-mix(...)`, no repeated overlays, no primitive references inside component rules, no variant breaking its family's recipe.
- Sizes, radii, spacing match the documented scales (heights, `md/lg/xl`, 4px spacing step).
- **Vertical rhythm** — every `margin-top` / `gap` / `padding` on a page section wrapper is a valid 4px-step rem value (`.5rem`, `.75rem`, `1rem`, `1.25rem`, `1.5rem`, `2rem`, …). No `px` values, no non-step rems, no overrides to `.cl-page` gap. Check page `<style>` blocks and any inline `style=` attributes on section wrappers.
- State coverage parity: every interactive variant defines default / hover / focus / pressed / disabled (+ loading where relevant).
- Both Light and Dark values provided; the component is checked in both themes.
- Naming follows the token map (`Brand/Primary`, `Text/Body`, `State/Hover`, …).
- Links stay relative; English only; pure CSS.

**Accessibility (WCAG 2.1)**
- Text contrast ≥ 4.5:1 (normal) / ≥ 3:1 (large ≥ 18px or bold ≥ 14px); UI/icon/border contrast ≥ 3:1 (1.4.3 / 1.4.11).
- Every interactive element has a visible `focus-visible` ring (2.4.7) — not removed without replacement.
- Hit target ≥ 24×24px (2.5.8); aim for 44px on touch.
- Status is never conveyed by color alone (1.4.1) — pair with icon/label/shape.
- Disabled elements remain perceivable but clearly non-interactive; keep an accessible name.
- Toggles/menus expose correct roles/states (`role`, `aria-checked`, `aria-expanded`, `aria-current`).

**Report format (print at the end of each task):**
```
Consistency:  PASS / ⚠️ <what & where>
Accessibility: PASS / ⚠️ <token, measured ratio, target>
Responsive:   PASS / ⚠️ <missing breakpoint or demo block>
```

**Responsive check (run for every `pages/*.html` task):**
- [ ] Page has CSS `@media` rules for the relevant breakpoints (no static inline preview blocks)
- [ ] At `max-width: 1023px`: the sidebar collapses into the off-canvas drawer + burger — **this is handled by the shared kit rule** (`kit-theme.css` `@media (max-width:1023px){.cl-side{display:none!important}}`), so pages do **not** redeclare it
- [ ] At `max-width: 880px`: `.cl-main` padding tightens; multi-column grids reflow
- [ ] At `max-width: 600px`: further stacking / width changes where needed
- [ ] Resize the browser to confirm the layout adapts — do not fake it with an inline copy

Breakpoints to use (prod values only — do not invent others):

| Breakpoint | Query | Typical changes |
|---|---|---|
| Sidebar→drawer | `max-width: 1023px` | **Kit-owned:** `.cl-side` hides into the off-canvas drawer, burger appears. Pages don't redeclare it. |
| Narrow | `max-width: 880px` | `.cl-main` padding tightens; multi-column grids reflow |
| Burger/search/chips | `max-width: 767px` | Burger repositions; chip-rows switch to single-line horizontal scroll |
| Compact | `max-width: 600px` | Further stacking, full-width inputs, single-column grids |

The shared demo `.topbar` (state / variant / theme toggles, `kit-theme.css`) scrolls horizontally (`overflow-x:auto`, children `flex:none`) when it can't fit, instead of squeezing/clipping the controls — no per-page work needed.

A page without `@media` rules reports as `Responsive: ⚠️ WARN — no breakpoints found`.

## Responsive behavior — every page must be genuinely responsive (hard rule)

Pages are design-handoff mockups that the front-end team resizes to review breakpoints. **Do not insert a static inline preview block** (`cp-resp-block` or similar) — that approach is fake responsiveness and was removed. Instead, write real `@media` CSS in the page `<style>` block so resizing the browser naturally shows the adapted layout.

**What to implement:**

```css
/* inside the page <style> block — page-specific reflow only.
   Do NOT redeclare .cl-side{display:none}: the shared kit rule already collapses the sidebar
   into the drawer at ≤1023px (with !important). Pages only handle their own grid/content. */
@media (max-width: 880px) {
  /* page-specific: e.g. grid reflows */
  .ds-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 600px) {
  .ds-grid { grid-template-columns: 1fr; }
  /* further stacking if needed */
}
```

**Self-check — add to every page task:**
- [ ] Sidebar collapses to the drawer at ≤1023px — verify it works (kit-owned; don't redeclare in the page)
- [ ] `@media` reflow rules present for the page's own grids/content, tested by resizing
- [ ] Multi-column grids reflow to 1 column (or 2 if explicitly designed)
- [ ] No `cp-resp-block` / static inline preview in the markup

---

## Component fixes belong in the kit — never page-only (hard rule, blocks merge)

If a visual problem involves a kit class (`.btn-*`, `.segctrl*`, `.sbx-*`, `.field`, `.ta`, `.badge`, etc.) **the fix must go into `pages/kit-theme.css`**, not into a page `<style>` block.

**Wrong:**
```css
/* in pages/user_profile-modal.html <style> */
.acct-section .segctrl { padding: 4px }   /* overrides a kit component — belongs in kit-theme.css */
```

**Correct:**
```css
/* in pages/kit-theme.css, next to the component's existing rules */
.segctrl.is-md { padding: 4px }
```

A page `<style>` block is for **layout-only classes that exist nowhere else** (`.acct-overlay`, `.acct-modal`, `.acct-section`, …). The moment a selector targets a kit class, move it to `kit-theme.css`.

**Why this matters:** a page-only fix silently diverges the kit from all pages that use the same component. The kit becomes wrong everywhere except the one page you patched.

**Self-check before adding any CSS to a page `<style>` block:**
- [ ] Does this selector target a kit class? → Move to `kit-theme.css`.
- [ ] Is this a size/spacing/colour that should be consistent across all uses of the component? → Move to `kit-theme.css`.
- [ ] Is this truly page-layout-only (a wrapper, an overlay, a page-specific composition class)? → Page `<style>` is acceptable.

---

## Divider spacing rule — never crowd content against a border

Any element that has a `border-bottom` (or `border-top`) acting as a section divider **must** have matching breathing room on **both sides** of that border:

- Add `padding-bottom` (≥ 1rem, 4px-step) on the element that owns the border so content sits clear of the divider.
- Add `padding-top` (same value, ≥ 1rem) on the **next sibling** so the first line of the following section is not flush against the rule.

Use the CSS `:first-child` / `:last-child` exceptions to suppress redundant padding at the very start and end of a container.

```css
/* Correct pattern */
.section { padding-top: 1.25rem; padding-bottom: 1.25rem; border-bottom: 1px solid var(--border); }
.section:first-child { padding-top: 0; }
.section:last-child  { border-bottom: none; padding-bottom: 0; }
```

**Never** rely solely on a flex/grid `gap` between a bordered element and its sibling — `gap` is measured from the outer edge of the border, leaving the visual space between the border line and the next text equal to zero (no padding) or whatever the sibling's own `padding-top` is. Always set `padding-top` explicitly on the following sibling (or use the pattern above).

---

## Colour-token discipline — simple, reusable, easy to scale

**The principle:** every colour value flows through the three-layer token system. Component rules read `var(--token)`, never inline expressions. The token layer is the single point of edit for any colour tune — change one variable, every consuming surface updates.

**Three layers — do not skip, do not duplicate:**

| Layer | Where | Example |
|---|---|---|
| **Primitives** | `:root` block at top of `pages/kit-theme.css` (the only place raw hex is allowed) | `--brand-600:#07807E` · `--red-700:#B91C1C` |
| **Semantic** | `:root` / `.dark` — maps a primitive to a role; theme-aware where needed | `--brand-primary:var(--brand-600)` · `--ink-body:var(--slate-700)` · `--fb-red:var(--red-700)` |
| **Component-scoped** | `:root` / `.dark` — composes semantics into a component recipe; single source of truth for repeated mixes | `--btn-primary-bg:var(--brand-primary)` · `--btn-outline-destructive-bg-hover:color-mix(in srgb, var(--fb-red) 6%, transparent)` |

**Hard rules:**

1. **No raw colour values in component rules.** Hex codes, `rgb()`, and inline `color-mix(...)` expressions live ONLY in the token layer. A component rule that contains `color-mix(in srgb, var(--fb-red) 6%, transparent)` is wrong — lift it to a `--*-bg-hover` token first.
2. **Tokenise any repeated mix.** If the same `color-mix(...)` (or any other colour expression) appears in more than one rule, lift it to a CSS variable. The percentage / source / overlay must live in exactly one place — a future tune is one edit, not N.
3. **Reuse before inventing.** Before adding `--btn-*-bg-hover` / `--*-overlay-*` / similar, scan the existing semantic + component layer. If three variants need the same `brand @ 6%` overlay, ONE shared token is correct; three parallel tokens are drift.
4. **Variant-pattern symmetry.** A new variant in an existing family must reuse the same colour-token recipe as its siblings. E.g. all Outlined-family variants follow "coloured border + neutral `Text/Body` label" — diverging for one variant breaks the contract. If divergence is intentional, state the rationale in the change file.
5. **rgba(0,0,0,α) exception.** Allowed inside `box-shadow:` declarations only — universal shadow convention, not a colour token. Anywhere else, route through a token.
6. **No primitive references inside component rules.** A component rule that reaches past the semantic layer to grab `var(--slate-700)` directly bypasses the role-mapping that makes themes possible. Add or use a semantic alias instead.

**Self-review checklist — run before completing any colour-touching task:**

- [ ] Did I paste a hex outside the Primitives block? → Lift to a primitive.
- [ ] Is the same `color-mix(...)` / overlay expression now in 2+ rules? → Lift to a component-scoped token.
- [ ] Does my new component-scoped token duplicate an existing one's value? → Reuse the existing token.
- [ ] Does my new variant diverge from its sibling-family recipe (label colour, border colour, focus ring style, hover overlay strength)? → Align to the family OR document the divergence rationale.
- [ ] Did I reference a primitive directly inside a component rule? → Replace with the matching semantic token.
- [ ] Are all overlay percentages (`6%`, `8%`, `12%` …) inside `:root` token definitions, never inside component selectors? → If not, fix.

This rule blocks merge — any colour-touching change must pass the checklist, and the report at the end of the task must explicitly confirm "Colour-token discipline: PASS" or note the WARN(s).

## State-stacking rule — interactive elements nested inside interactive parents

**Before changing any `:hover`, `:active`, `:focus-visible`, `.is-selected`, `[aria-expanded="true"]`, or equivalent state-bg on a CSS rule:**

1. **Identify the stacking context.** Does the element sit inside another element that itself shifts background on interaction (e.g. a row that hovers, a card that selects)?
2. **Enumerate the (parent-state × child-state) matrix.** For each combination, compute what the visible child bg will be and what the visible parent bg will be at that moment.
3. **If any combination produces `child-bg === parent-bg`, the child's recipe is wrong.** The child has visually disappeared into the parent and the user can't tell where the interactive surface is.

**Two categories — different recipes:**

| Category | Recipe | Examples in this kit |
|---|---|---|
| **Standalone interactive** — sits on a *static* surface (the surface itself never changes bg on interaction) | Neutral `--state-hover` / `--state-pressed` | `.mi` (inside static `.menu`), `.cl-dd` (inside static composer footer), `.sbx-nav-item` (inside static nav), `.sbx-pop-item` (inside static popover surface), `.btn-tertiary`, `.btn-secondary` |
| **Nested interactive** — sits inside a *parent that itself hovers / selects / expands*, so a neutral hover here would collapse into the parent's same-token hover | *Contrasting* bg — typically `color-mix(in srgb, var(--brand-primary) 6–12%, transparent)`, or any token that sits visibly above `--state-hover` / `--state-pressed` | `.sbx-chat-more` (inside `.sbx-chat` which hovers), `.chat-row-more` and `.chat-row-pin` (inside `.chat-row` which hovers) |

**Verification you must run before the edit:**

- `grep` for the immediate parent class with `:hover`, `:active`, `.is-selected`, `:has()`, `[aria-expanded="true"]` — find every state where the parent shifts bg.
- For each parent state, mentally resolve `child-bg` at every child state (default / hover / pressed / focus / open).
- A token collision at *any* combination means the child needs a contrasting recipe.

**Why this matters:** the brand-mix-on-hover pattern in this kit is *not* legacy drift — at nested sites it's a deliberate contrast against a hovering parent. Pure-cascade-tidiness is not a reason to remove a contrast that was designed in. Document the intent in a CSS comment at the rule site so future readers see the "why."

**Comment template for nested-interactive rules:**
```
/* Brand-mix is deliberate (not drift): the parent .<parent> hovers to --state-hover, so a
   neutral hover on this child would collapse into the parent's bg. The N% brand mix gives
   the child a contrasting surface ON TOP of the hovered parent. */
```

## Component / property list

Foundations: `colors`, `typography`.
Components: `Button`, `IconButton`, `Input`, `TextArea`, `Checkbox`, `Switch`, `Badge`,
`Avatar`, `Table`, `Tabs`, `ProgressBar`, `Spinner`, `Tooltip`, `Dropdown`, `Modal`, `Pagination`.

For each: a `current/<name>.md` (live baseline) and, when it changes, a `changes/<name>.md` (diff from current).
