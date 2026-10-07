# AskUserPanel — prod → expected

Baseline: [`../current/AskUserPanel.md`](../current/AskUserPanel.md). Storybook: [`#askuserpanel`](../insightis-preview-kit.html#askuserpanel). Screen: [`../pages/concept/chat_page-queue.html`](../pages/concept/chat_page-queue.html) (state D1).

The assistant asking for a decision before it can continue. The component is the **whole card** — `.cfc` carries its own surface — not a block of content placed inside another card.

## was → became

| | Current (prod) | Expected |
|---|---|---|
| Card | sits inside the answer card, on its surface | **its own card**, floated over the thread — `.cfc` is the whole panel |
| Card height | the option list scrolls inside the panel even when it fits | follows the content up to **half the window**; nothing scrolls below that, past it only the options do |
| Single select — options | a bordered `<button>` per choice; pressing one submits | — the row stays a button and pressing it is the answer |
| "Other" | unboxed, below the real choices; a field appears once it is chosen | **one of the choices**, boxed like the rest; pressing it opens a field and its own send |
| Several questions | tabs (a dot on each unanswered tab), radio rows, Submit gated with "N questions left to answer" | **one question at a time** — each step is single select; a stepper on the top line; Back / Skip; an answer moves on, the last one sends |
| Multi select — options | unboxed checkbox rows | the **same option row** with an input-backed [Checkbox](Checkbox.md) (`.cbx-in`) inside; Submit, disabled while nothing is ticked |
| Description | Body/L | Body/M |
| Question + dismiss | stacked | **one line**; the dismiss sits on the question's first line |
| Mobile (≤ 600px) | — | "Esc to cancel" hides (no Esc key on a phone); the dismiss stays |

## Three variants, one option row

Single select, several questions and multi select are the same card asking in three ways. Prod draws them as three different lists — bordered buttons for one, unboxed rows for the other two — so the same act of choosing looks different depending on how many answers are wanted. In Expected they share **one option row** (`.cfc-opt`): same box, same hover, same type. Only what sits inside it changes — nothing, where the row is the button; a checkbox, where several may be picked.

## Several questions are single select, one step at a time

Tabs are peers you browse in any order; these questions are a sequence to answer. Tabs also made the model invent a short name for every question, and spread one fact — "not done yet" — over three signals: a dot per tab, a counter and a disabled Submit. One step at a time says it once: the stepper shows how far along, the question is its own title, and pressing an answer moves on, exactly as it does in single select. The last answer sends; there is no Submit to gate.

**Back** returns to a step with its answer still marked (`aria-pressed`), so changing your mind costs one press. **Skip** moves on without an answer — sent as `null`, so the assistant knows the question was seen and passed rather than missed.

The stepper is ProgressBar's recipe cut into segments — track `--surface-chips`, done `--brand-primary` — with the step in words beside it ("Question 2 of 3"), which is also what a screen reader hears.

## Why "Other" is a peer, and why it opens a field

It was unboxed while it was read as an escape hatch — *not a real answer, just a way out*. It is not one. "Other" is an answer to the same question, so it is boxed like the rest. But it is the one answer the card cannot know, so pressing it opens a field for the person's own words instead of sending. The send sits right under the field — the action stays with the answer it sends — and reads **Submit** where it ends the card, **Next** on a step that moves on. It is disabled while the field is empty; Enter sends, Shift+Enter breaks the line.

## Half the window is the ceiling

Prod scrolls the option list inside the panel even when every option would fit — a scrollbar beside four options is a list pretending to be longer than it is. Expected grows with its options up to half the window (`dvh`, so it follows a phone's real screen) and nothing scrolls below that. Past it, the options scroll while the top line and the footer stay put, and the kit's scroll fade shows only while something is actually hidden.

## Three type steps, each a token apart

The question is the primary voice here. An option label set bigger than the question it answers outshouts it, and one at the same weight and ink flattens the card into one block — so the three sit at one size and step down by weight and ink:

- question → `Title/14` on `Text/Primary`
- option label → `Label/L` (weight 500) on `Text/Body` — a button's label, because the row is a button
- description → `Body/M` at weight 400 on `Text/Secondary`

The description was `Body/L` and read as a second paragraph competing with the label; one step down settles it. Weight 400 is explicit because it inherits nothing from the button it sits in — a button's own `font-weight` was making the prose read bold.

## Alignment and focus

**The dismiss sits on the question's first line.** The group is one question line tall and the 28px button overhangs it evenly, so a two-line question no longer centres it between the lines, where it belonged to neither.

**The checkbox centres on the title LINE, not on the row.** The offset is `(20px title line − 18px control) / 2` — off the 4px step on purpose, an optical centring derived from two grid-legal values.

**The focus ring is keyboard-only and drawn once.** `:focus-visible` on a button row, `:has(.cbx-in:focus-visible)` on a checkbox row — never `:focus-within`, which fires on a mouse click too and painted a ring on top of the chosen state. The list keeps `.25rem` of room so the scroller never clips the ring.

## It floats over the thread, it does not sit in it

The card used to render inside the answer card, in the flow of the conversation. It now lifts out and floats directly above the composer, covering the tail of the thread: `.cfc` carries a surface of its own — the component is the whole card — and `.cp-cfc-layer` on the chat page puts it there.

The reason is the queue. The card is the thing the queue is waiting on, and a question you have to scroll back to find reads as optional — meanwhile the queue looks stuck for no visible reason. Floating it means the question and the reason the queue stopped are on screen together, always.

It carries `--shadow-overlay-soft` rather than a heavier border: it sits OVER the conversation, and depth is what says so. Positioning stays with the consumer; the component is the panel itself. Answering fires `cfc:answer` (`pages/kit-kit.js` §11) and the consumer closes the card on it.

## Token map

| Slot | Token |
|---|---|
| card | `--surface-card` · `--stroke-border` · `--radius-xl` · `--shadow-overlay-soft` |
| card gap | `.75rem` |
| option row | `--stroke-border` on `--surface-card`; hover `--state-hover` + `--card-border-hover`; pressed `--state-pressed` |
| chosen row | `--brand-primary` border + `color-mix(--brand-primary, --tint-5, transparent)` |
| question | `Title/14` · `Text/Primary` |
| option label | `Label/L` · `Text/Body` |
| description | `Body/M` · `Text/Secondary` |
| dismiss | `.iconbtn.iconbtn-tertiary.iconbtn-xs` |
| stepper | segments `--surface-chips` / `--brand-primary`; label `Body/M` · `Text/Secondary` |
| Back / Skip | `.btn.btn-tertiary.btn-sm` |
| "Other" field | `.ta.is-block` ([TextArea](TextArea.md)) + `.btn.btn-primary.btn-sm` |
| multi-select control | `.cbx-in` + `.cbx` ([Checkbox](Checkbox.md)); Submit `.btn.btn-primary.btn-sm` |

No new colour tokens; the chosen wash is the sanctioned tint recipe.

## No change (—)

Card padding, the dismiss affordance and the "Esc to cancel" hint keep their prod treatment.

## Accessibility self-check

- Single select and each step: the options are real `<button>`s in a `role="group"` labelled by the question; the whole row — title and description — is the click target and the accessible name.
- Several questions: the step is spoken by the `aria-live` label ("Question 2 of 3"); the segments are `aria-hidden`. When a step changes, focus moves to the new question (`tabindex="-1"`) so it is never dropped to the page.
- The chosen state — remembered answer, open "Other", ticked checkbox — is carried by the border and the wash together, and by `aria-pressed` / `aria-expanded` / `:checked` for assistive tech, never by colour alone (WCAG 1.4.1).
- "Other": the field has an accessible name; its send is a real `disabled` button while the field is empty; Enter sends.
- Multi select: the options are a `role="group"` of real checkboxes, labelled by the question.
- Focus is visualised once, on the row, and only for the keyboard; the scroller leaves room for the ring.
- "Esc to cancel" is stated in the card, and the dismiss button is reachable in the tab order rather than only by the key.
