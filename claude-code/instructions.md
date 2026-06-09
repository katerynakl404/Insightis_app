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

## Accessibility & consistency — Claude must self-check on every change

After applying a change, Claude **must** verify the following and report each as PASS / ⚠️ WARN
(with the specific value), and add a ⚠️ line in the relevant `changes/<X>.md` for any WARN:

**Consistency**
- Colors come from tokens only (no raw hex outside the Primitives layer).
- Sizes, radii, spacing match the documented scales (heights, `md/lg/xl`, 4px spacing step).
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
Consistency: PASS / ⚠️ <what & where>
Accessibility: PASS / ⚠️ <token, measured ratio, target>
```

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
