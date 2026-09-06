# Modal — prod → expected

Modal's shell tokens stay close to prod; the changes are mostly inherited from the components it embeds (Button + text colours).

| Part | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Border | `Stroke/Border` `#F0F5FA` | — | `#E2E8F0` (Slate-200) | Bumped one step for visibility — matches `--border` light token update |
| Title | `content-primary` `#111827` | — | `Text/Primary` `#0F172A` (Slate-900) | Token rename; visually near-identical |
| Body text | `content-secondary` | — | `Text/Secondary` (Slate-500 / Grey-400) | Token rename |
| **Cancel action** | `Button outline` (teal border / transparent bg) | — | **`Button secondary`** — filled card-style, lower emphasis than Outlined; hover always lighter than default | Emphasis shift: secondary fills with `Surface/Card` so "Cancel" reads below the primary destructive action |
| **Destructive action** | `Button destructive` (themed: light `#C10007`, dark `#7D1B1B` ⚠ failed AA) | — | **`Button destructive`** — now uses theme-independent `Feedback/Red` (`#B91C1C`, Red-700) with hover `Feedback/Error_Hover` (Red-800) and press `Feedback/Error_Press` (Red-850). AA in both themes. | Dark theme was 2.76:1 against Card surface — failed WCAG AA. Fix at semantic layer (`--fb-red` pinned to Red-700, theme-independent). |

## Component reuse note

The Modal kit demo previously rendered its Expected column under the `.prod` scope, so the inner Cancel/Delete buttons resolved against prod tokens — masking the fact that both Button variants have changed. The Expected column now uses the default token scope:

- Cancel `<button class="btn btn-sm btn-secondary">` (was `btn-outline`)
- Delete `<button class="btn btn-sm btn-destructive">` (unchanged classname; new tokens under the hood)

## No change (—)
Surface `Card` — the React/Tailwind value that renders the same as the shipped kit (`bg-card` = `--card`), so it's kept as-is. (Radius, padding, shadow and overlay are **not** "no change": the kit `.dlg` overrides them visually — see "Resolved" below.)

## Kit reproduction — shipped `.dlg` values (kit-theme.css 933–943)

The values above describe the React/Radix/Tailwind prod component. The **shipped kit** `.dlg` modal diverges — these are the values to reproduce from the kit:

| Part | Selector | Shipped value |
|---|---|---|
| Overlay | `.dlg-overlay` | `background:var(--overlay-scrim)` = `rgba(15,23,42,.45)` light / `rgba(2,6,23,.6)` dark (NOT `black/80`) |
| Shell | `.dlg` | `background:var(--card); border:1px solid var(--border); border-radius:.875rem` (14px); `box-shadow:var(--shadow-modal)` (deepest elevation rung — light `0 20px 40px -8px rgba(0,0,0,.22)`, dark boosted `0 24px 48px -12px rgba(0,0,0,.72), 0 8px 18px -6px rgba(0,0,0,.55), inset 0 1px 0 0 rgba(255,255,255,.05)`); `max-width:calc(100vw - 2rem); display:flex; flex-direction:column` |
| Header | `.dlg-hdr` | `display:flex; align-items:center; gap:.75rem; padding:.875rem 1.25rem .5rem; flex:none` |
| Title | `.dlg-title` | `font-size:1.25rem; line-height:1.75rem; font-weight:500; color:var(--ink); margin:0; flex:1; min-width:0` |
| Progress wrapper | `.dlg-progress` | `padding:0 1.25rem .875rem; flex:none; display:flex; flex-direction:column; gap:.375rem` (omit entire block on single-step dialogs) |
| Progress text | `.dlg-progress-txt` | `font-size:.75rem; color:var(--ink-secondary)` (e.g. "Step 1 of 2") |
| Progress track | `.dlg-progress-track` | `height:4px; background:var(--border); border-radius:99px; overflow:hidden` — 4px grid step, same as `.toast .toast-prog` and `.upl-item .progress` |
| Progress fill | `.dlg-progress-fill` | `height:100%; background:var(--brand-primary); border-radius:99px; transition:width .4s ease`; width set inline per step (e.g. `width:50%`) |
| Body | `.dlg-body` | `flex:1; overflow:hidden; position:relative; min-height:0` |
| Step | `.dlg-step` | `position:absolute; inset:0; overflow-y:auto; padding:1.25rem; display:flex; flex-direction:column; gap:1rem` — all steps stacked in same space, no layout shift |
| Hidden step | `.dlg-step.is-hidden` | `display:none` |
| Footer | `.dlg-ftr` | `border-top:1px solid var(--border); padding:.875rem 1.25rem; display:flex; justify-content:flex-end; gap:.5rem; flex:none` |

## Resolved — kit `.dlg` authoritative where it diverges visually

Decision (same rule as [`Popover.md`](Popover.md)): a React/Tailwind value is kept only where it renders the **same** as the shipped kit (e.g. Surface = `Card` = `--card`). Where the React/Tailwind value would render **differently** — the four properties below — the shipped kit `.dlg` value is **authoritative**, and the React/Tailwind value is a superseded prod-reference only (not the target).

| Property | React/Tailwind (superseded prod-reference) | Shipped kit (`.dlg`) — **authoritative** |
|---|---|---|
| Overlay | `black/80` | **`--overlay-scrim`** (`rgba(15,23,42,.45)` light / `rgba(2,6,23,.6)` dark) |
| Radius | `lg/xl` | **`.875rem` (14px)** |
| Box-shadow | `shadow-lg` (Tailwind) | **`var(--shadow-modal)`** — light `0 20px 40px -8px rgba(0,0,0,.22)`, theme-aware dark override |
| Padding | 16px (uniform) | header **`.875rem 1.25rem .5rem`**; step **`1.25rem`** |

## Sizing
## Sizes — S, M and L

Three sizes, named to match the existing `.menu.is-sm/.is-md/.is-lg` family so every floating surface
shares one size vocabulary.

| Size | Class | Cap | For |
|---|---|---|---|
| **S** | `.dlg.is-sm` | `max-width: 360px` (`22.5rem`) | **Informational** popups — a confirm the user only has to read and answer: *Delete file?* · *Delete chat?* · *Delete N files?* · *Disconnect X?*. One sentence of body, two footer buttons. |
| **M** | `.dlg.is-md` | `max-width: 480px` (`30rem`) | **The default.** Anything the user has to fill in: Rename file / Rename chat, Edit connection, Create metric. |
| **L** | `.dlg.is-lg` | `max-width: 576px` (`36rem`) | The multi-step **"New connection" wizard**, which is implemented twice — `ds-conn-dlg` (Connections) and `mx-conn-dlg` (Metrics): same title, same two steps, same shell. Always paired with `.var-wizard`. |

**Why S is narrower.** A one-sentence question in a 480px box reads as an under-filled form — the
eye expects fields that are not there. Dropping the cap to 360px makes the confirm read as a
question, and makes the two dialog roles (read-and-answer vs fill-in) distinguishable before the
user reads a word.

**Both are max widths, not fixed widths.** `width:100%` lets the dialog take the width it is
entitled to and the cap stops it there, so it shrinks to fit a narrow viewport instead of
overflowing it. Each cap is `min(…, var(--dlg-max-viewport))`: a size variant sets its own
`max-width`, which overrides the base `.dlg` rule, so it has to re-assert the viewport gutter or a
320px screen would render the dialog edge-to-edge. `--dlg-max-viewport` (`calc(100vw - 2rem)`) is a
token precisely because all three rules need it.

**L earned its step from content, not symmetry.** At 480px the wizard clipped real data: a long
connector name broke mid-word and the two-line Token field was squeezed. That was a measured
problem on prod, not a preference — which is the bar a new size variant has to clear.

**All three caps sit on the 4px grid:** 360 / 480 / 576 = 90 / 120 / 144 steps.

**`.dlg.var-wizard`** carries the wizard body height (`height:580px`, itself 145 grid steps, plus
`max-height:calc(100vh - 2rem)` so a short screen scrolls the step instead of clipping it). It is a
separate axis from width on purpose: the height exists so the dialog does not jump between steps,
which is a different decision from how wide the form needs to be.

**Every dialog in the artifact now uses this shell.** Five of them previously re-implemented it in
markup — `.dlg-overlay`'s position/inset/z-index/centring/scrim *and* `.dlg`'s
background/border/radius/width/flex, plus a raw `box-shadow: 0 20px 40px -8px rgba(0,0,0,.22)`
instead of `--shadow-modal` (so they carried a light-theme shadow in dark). Converted to
`.dlg-overlay` + `.dlg.is-sm|.is-md`: New connection (Connections), Disconnect confirm, Edit
connection, Connect source (Metrics), Create metric. Their open/close JS was untouched —
`style.display = 'flex'` and the `#mx-add-dlg.is-open` toggle both still win over the class.

| Assignment | Dialogs |
|---|---|
| **S** | `sbc-del-dlg` (×5 pages) · `dsf-del-dlg` · `ds-disc-dlg` |
| **M** | `sbc-ren-dlg` (×5 pages) · `dsf-ren-dlg` · `ds-edit-dlg` · `mx-add-dlg` |
| **L** | `ds-conn-dlg` · `mx-conn-dlg` (both + `.var-wizard`) |

## Body — two contracts, and the bug that made the second one necessary

**`.dlg-content` — the ordinary dialog** (17 of the 20 in this kit). Sits in normal flow, sizes to
its content, and starts scrolling only once `.dlg` reaches its max-height. Add `.is-stack` for
stacked form fields.

**`.dlg-body` + `.dlg-step` — the wizard shell.** Each step is `overflow-y:auto` inside the
`flex:1; overflow:hidden` body, so long content scrolls within the step while header, progress and
footer stay pinned (`flex:none` on each). Because `.dlg-step` is absolutely positioned it
contributes no height, so a dialog on this pair must set its own (see `.dlg.var-wizard`).

### Why `.dlg-content` exists — the footer escaped the card

**was** every ordinary dialog hand-built its body as a bare `<div>` with inline padding →
**became** the kit class.

`.dlg` is a flex column with `max-height:calc(100vh - 2rem)`. A bare `<div>` child keeps
`min-height:auto`, i.e. its **automatic minimum size** — by spec it refuses to shrink below its
content. So header + body + footer could exceed the cap, and because `.dlg` does not clip, the
excess simply painted outside the rounded card: the footer, being last, ended up **below the
dialog**, floating over the page. Reproduced on Create metric at a 620px window — cap 588px,
children 594px, footer 7px past the edge; it broke on any window shorter than ~626px, which is a
normal 13" laptop. `min-height:0` + `overflow-y:auto` is what makes it impossible.

Two follow-ons the same change needed:

- **A menu inside a scrolling body is clipped by that body, not by the viewport.** The Data source
  select sits at the bottom of Create metric's body and lost 32px of its 42px menu while "room
  below the trigger" still looked fine. `kit-kit.js` now measures the `.menu.is-up` flip against
  the nearest clipping ancestor, so such a menu opens upward on its own. Verified unchanged for
  menus with no inner clipper: on Chats library at a 700px window rows 1-6 still open down and
  rows 7-10 flip up, every menu fully inside its bounds.
- **A wrapper between `.dlg` and its body breaks the flex chain the same way.** The yearly-billing
  dialog wraps body + footer in a state `<div>`; that wrapper takes `display:contents` so its
  children remain `.dlg`'s flex children while the `display:none` toggle keeps working.

### Wizard footer — one per step, and the confirming action is always ours

**was** step 1 of the New-connection wizard had **no footer**: its Save sat inside `.ds-intg-frame`
as a bespoke full-width `.ds-intg-save` → **became** a `.dlg-ftr` per step, each holding a kit
`.btn.btn-primary.btn-sm`, right-aligned like every other dialog.

`.ds-intg-frame` is a **depiction of the provider's own form**, and the block's contract is that
every colour inside it comes from the fixed `--intg-*` palette with no theme response. The Save
broke that twice over: it was painted in `--brand-primary` (theme-responsive, so in dark theme it
would drift while the rest of the depiction held still), and it duplicated `.btn-primary`'s recipe
by hand. It was also in the wrong place — the prod ownership boundary puts the footer **and the
Save button** on the host dialog, not the embed. So the button left the depiction entirely; the
frame now depicts fields only. Its full width had never been declared either — it came from
`.ds-intg-row` being a flex column, which stretched the only child. `.var-save` went with it: a
class in two pages' markup that never had a rule.

Same pass, same reason: the Metadata-Cache chevron inside the depiction carried an inline
`--ink-secondary`; it now uses `--intg-ink-muted`, so nothing inside the frame responds to our theme.

A page that needs different body spacing **composes** rather than copies: `.acct-dlg-body` is now
`.dlg-content.is-stack.acct-dlg-body` and the page rule keeps only its two deviations (`padding-top`,
`gap`) — at `.dlg-content.acct-dlg-body` specificity, so it actually wins over `.is-stack`.

## Still needed (per kit)
- Loading state inside the modal (not yet defined in CSS)
