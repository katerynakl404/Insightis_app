# Chat Shell & Composer — prod → expected

Baseline: [`../current/ChatShell.md`](../current/ChatShell.md). Storybook: [`#composer`](../insightis-preview-kit.html#composer). Screens: [chat landing](../pages/approved/chat-landing.html) · [chat page](../pages/approved/chat_page-landing.html) · [charts](../pages/concept/chat_page-charts-landing.html) · [message queue](../pages/concept/chat_page-queue.html).

**The design did not change. Its ownership did.** The shell and the composer moved out of four page `<style>` blocks into `pages/kit-theme.css`, where every other component already lives.

## Why this is a change at all

A thing with states is a component. This one has a hover border, a focus border, a transition and a corner — it had been a component for months while still being filed as layout.

The cost had already been paid, quietly. The four copies had drifted:

| | what the copies disagreed on |
|---|---|
| surface | three had lost the translucent card colour and the backdrop blur that prod ships; only the landing page still carried them, by hand |
| hover | all four dropped prod's `:not(:focus-within)` guard, so a focused composer changed its border when the pointer crossed it |
| prompt | the landing screen is a `<textarea>`, the three conversation screens a contenteditable `div` — two controls sharing one class name and two different rule sets |
| motion | raw `.15s` and `.12s` against the kit's own motion steps |

None of that was a decision anybody made. It is what four copies do.

## What was decided in the move

**Prod's surface wins.** The card colour at `--tint-72` over a 10px blur, so the tail of the last answer stays faintly visible under the thing you are typing instead of meeting an opaque slab. Three pages gain it back.

**Prod's hover guard wins.** A focused composer does not take the hover border. Without the guard, moving the mouse across a field you are already typing in swaps its border colour for no reason the typist can act on.

**One rule serves both prompts.** The declarations each control ignores are inert on the other — a div cannot be resized, a textarea wraps on its own — so only the placeholder is written twice, because an empty textarea has an attribute and an empty div has nothing at all.

**Raw durations became motion steps.** The hover and focus transition moves from a hand-typed `.15s` to `--motion-base`, and the message-footer reveal from `.12s` to `--motion-fast`. A 30ms difference on the first; the point is that the next change happens in one place.

**Two raw widths became tokens.** `--chat-max-w` mirrors prod's `max-w-chat-container` and caps the composer, the queue band and every turn alike — the thing you type and the thing you read share one measure. `--radius-3xl` is the 16px corner the composer and the band both use; it had been written as `1rem` in two places.

**One rule was lost in the move, and came back conditional.** The four copies of `.cl-main` were
not identical: the chat **landing**'s copy carried `align-items:center; justify-content:center` and
`padding:1.25rem 1.5rem`, the three conversation screens' copies carried neither, and only theirs
survived the merge. The landing's greeting and composer went from centred in the column to pinned
at its top, leaving ~590px of empty page below them. The centring is back in `kit-theme.css` as
`.cl-main:has(> .cl-hero)` — the condition is the hero, because the hero is the only thing that
differs: a main column holding a thread must stay top-aligned, and a second `.cl-main` variant
would have made the shell two components. The page keeps a one-line comment pointing here instead
of re-declaring it.

**Six rules were deleted rather than moved.** `.cp-inner`, `.cp-metric-grid`, `.cp-metric-card`, `.cp-chart-wrap`, `.cp-chart-svg`, `.cp-actions` were declared in two page `<style>` blocks and used in no markup anywhere. Lifting dead code into the kit would have made it look maintained.

## Composition

`.cl-composer` is composed with `.card-panel`: the panel brings the border, the composer brings the surface and the typing behaviour. Pages own only what is theirs — which turns are in the thread, and page furniture such as the design-review state picker. No page may restate a rule from this section.

## Token map

| Slot | Token |
|---|---|
| composer column | `--chat-max-w` (1.5rem of padding *inside* the cap, matching a thread turn) |
| corner | `--radius-3xl` |
| surface | `--surface-card` at `--tint-72` |
| border | `--stroke-border` → `--field-border-hover` → `--input-focus` |
| motion | `--motion-base` (border, shadow), `--motion-fast` (footer reveal) |
| scrollbar | `--stroke-border`, `--ink-inactive` on hover |

## No change (—)

Every measurement: 820px cap, 8px padding, 16px corner, 48px header, 3-row composer gap. Prod's values, carried over unchanged.

## Accessibility self-check

- The contenteditable prompt keeps `role="textbox"` and `aria-multiline`; the textarea stays a textarea. The visual join does not merge their semantics.
- Focus is drawn once: the panel takes a border on `focus-within` and no ring, because the ring belongs to the control inside that actually took focus.
- The thread's mask is decorative — it dims pixels, never removes content from the accessibility tree.
- The message footer is revealed with opacity and keeps its space in flow, so hovering down a thread never reflows the messages under the pointer.
