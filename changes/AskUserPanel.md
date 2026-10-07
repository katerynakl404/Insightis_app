# AskUserPanel — prod → expected

Baseline: [`../current/AskUserPanel.md`](../current/AskUserPanel.md). Storybook: [`#askuserpanel`](../insightis-preview-kit.html#askuserpanel). Screens: [`../pages/concept/chat_page-charts-landing.html`](../pages/concept/chat_page-charts-landing.html) (every variant, from the review strip) · [`../pages/concept/chat_page-queue.html`](../pages/concept/chat_page-queue.html) (state D1).

The assistant asking for a decision before it can continue. The component is the **whole card** — `.cfc` carries its own surface — not a block of content placed inside another card.

## was → became

| | Current (prod) | Expected |
|---|---|---|
| Card | sits inside the answer card, on its surface | **its own card**, floated over the thread — `.cfc` is the whole panel |
| Card height | the option list scrolls inside the panel even when it fits | follows the content up to **three quarters of the window**; nothing scrolls below that, past it only the options do, on the kit's thin scrollbar |
| Single select — options | a bordered `<button>` per choice; pressing one submits | — the row stays a button and pressing it is the answer |
| "Other" | unboxed, below the real choices; a field appears below once it is chosen | **one of the choices**, boxed like the rest; the field opens **inside its own box**, and the footer's Submit sends it |
| Several questions | tabs (a dot on each unanswered tab), radio rows, Submit gated with "N questions left to answer" | **one question at a time**, each single or multi select; a stepper — short bars + "Question N of M" — on the top line, every bar clickable; a pick moves on; Back on the left, Skip + Next on the right |
| Multi select — options | unboxed checkbox rows | the **same option row** with an input-backed [Checkbox](Checkbox.md) (`.cbx-in`) **on its right** |
| Footer | Submit (multi select, several questions) | **every variant**: Skip, then the primary (Submit; Next between steps), bottom-right — always shown, disabled until the question on screen has an answer; between steps Back bottom-left, disabled on the first question |
| Description | Body/L | Body/M |
| Question + dismiss | stacked | **one line**; the dismiss sits on the question's first line |
| Mobile (≤ 600px) | — | "Esc to cancel" hides (no Esc key on a phone); the dismiss stays |

## Three variants, one option row

Single select, several questions and multi select are the same card asking in three ways. Prod draws them as three different lists — bordered buttons for one, unboxed rows for the other two — so the same act of choosing looks different depending on how many answers are wanted. In Expected they share **one option row** (`.cfc-opt`): same box, same hover, same type. Only what sits inside it changes — nothing, where the row is the button; a checkbox on the right, where several may be picked. The label leads, as on every other row, and the tick reads as the row's state rather than as a bullet.

## Several questions, one step at a time

Tabs are peers you browse in any order; these questions are a sequence to answer. Tabs also spread one fact — "not done yet" — over three signals: a dot per tab, a counter and a disabled Submit. One step at a time says it once.

**A pick moves on.** Pressing an option answers the question and the next one still open shows — exactly as single select answers on press. "Other" and a multi-select step cannot answer themselves, so they wait for **Next**. Next is always there, disabled until the question on screen has an answer, and reads **Submit** on the last open question. **Skip** moves on without an answer — sent as `null`, so the assistant knows the question was seen and passed rather than missed. **Back**, bottom-left, returns to the previous question — disabled on the first, so it never appears out of nowhere. When no question is left open, the card is answered.

**The stepper is a short bar per question with "Question N of M" beside them.** A bar fills once its question is answered (and while on screen), the label says exactly where you are, and every bar is a button — a 24px target, the bar its mark — that takes you to its question. Bars stretched across the card or carrying names under them took the whole top line to say "2 of 4". The track is `--stroke-border`; ProgressBar's `--surface-chips` vanished on a white card.

## Why "Other" is a peer, and why its field opens inside it

It was unboxed while it was read as an escape hatch — *not a real answer, just a way out*. It is not one. "Other" is an answer to the same question, so it is boxed like the rest. But it is the one answer the card cannot know, so pressing it opens a field for the person's own words — **inside its own box**, under its label, so the answer stays in the row that asked for it. It has no button of its own: the footer's Submit (Next between steps) sends it, from the one place every answer is sent from. Enter sends too; Shift+Enter breaks the line.

## Three quarters of the window is the ceiling

Prod scrolls the option list inside the panel even when every option would fit — a scrollbar beside four options is a list pretending to be longer than it is. Expected grows with its options up to three quarters of the window (`dvh`, so it follows a phone's real screen) and nothing scrolls below that. Half the window was too low: four options with descriptions and a footer already hit it on a laptop screen. Past the ceiling the options scroll on the kit's thin scrollbar, the top line and the footer stay put, and the scroll fade shows only while something is actually hidden.

## Three type steps, each a token apart

The question is the primary voice here. An option label set bigger than the question it answers outshouts it, so the three sit at one size:

- question → `Title/14` on `Text/Primary`
- option label → `Label/L` (weight 500) on `Text/Primary` — a button's label, because the row is a button
- description → `Body/M` at weight 400 on `Text/Secondary`

The label takes the darkest ink because the description sits right under it at the same size: on `Text/Body` the two were one step of grey apart and read as one paragraph. The question keeps the lead by weight — 600 against the label's 500.

The description was `Body/L` and read as a second paragraph competing with the label; one step down settles it. Weight 400 is explicit because it inherits nothing from the button it sits in — a button's own `font-weight` was making the prose read bold.

## Alignment and focus

**The card lines up with the thread.** It takes the composer's column, and the thread's centre now matches it on every chat page (see [ChatShell](ChatShell.md)); before, the messages behind it sat 5px to the left.

**The dismiss sits on the question's first line.** The group is one question line tall and the 28px button overhangs it evenly, so a two-line question no longer centres it between the lines, where it belonged to neither.

**The checkbox centres on the title LINE, not on the row.** The offset is `(20px title line − 18px control) / 2` — off the 4px step on purpose, an optical centring derived from two grid-legal values.

**The focus ring is keyboard-only and drawn once.** `:focus-visible` on a button row, `:has(.cbx-in:focus-visible)` on a checkbox row — never `:focus-within`, which fires on a mouse click too and painted a ring on top of the chosen state. The list keeps `.25rem` of room so the scroller never clips the ring.

## It floats over the thread, it does not sit in it

The card used to render inside the answer card, in the flow of the conversation. It now lifts out and floats directly above the composer, covering the tail of the thread: `.cfc` carries a surface of its own — the component is the whole card — and `.cp-cfc-layer` on the chat page puts it there.

The reason is the queue. The card is the thing the queue is waiting on, and a question you have to scroll back to find reads as optional — meanwhile the queue looks stuck for no visible reason. Floating it means the question and the reason the queue stopped are on screen together, always.

It carries `--shadow-overlay-soft` rather than a heavier border: it sits OVER the conversation, and depth is what says so. Positioning stays with the consumer; the component is the panel itself. Answering fires `cfc:answer` (`pages/kit-kit.js` §11) and the consumer closes the card on it. There is no toast: the reply starting is the feedback.

## Token map

| Slot | Token |
|---|---|
| card | `--surface-card` · `--stroke-border` · `--radius-xl` · `--shadow-overlay-soft` |
| card gap | `.75rem` |
| option row | `--stroke-border` on `--surface-card`; hover `--state-hover` + `--card-border-hover`; pressed `--state-pressed` |
| chosen row | `--brand-primary` border + `color-mix(--brand-primary, --tint-5, transparent)` |
| question | `Title/14` · `Text/Primary` |
| option label | `Label/L` · `Text/Primary` |
| description | `Body/M` · `Text/Secondary` |
| dismiss | `.iconbtn.iconbtn-tertiary.iconbtn-xs` |
| stepper | bar `--stroke-border` / `--brand-primary`; label `Body/M` · `Text/Secondary` |
| footer | Back and Skip `.btn.btn-tertiary.btn-sm`, primary `.btn.btn-primary.btn-sm` |
| "Other" field | `.ta.is-block` ([TextArea](TextArea.md)) |
| multi-select control | `.cbx-in` + `.cbx` ([Checkbox](Checkbox.md)) |
| scrollbar | the kit's thin scrollbar (`.scroll-thin` recipe) |

No new colour tokens; the chosen wash is the sanctioned tint recipe.

## No change (—)

Card padding, the dismiss affordance and the "Esc to cancel" hint keep their prod treatment.

## Accessibility self-check

- Single select and each step: the options are real `<button>`s in a `role="group"` labelled by the question; the whole row — title and description — is the click target and the accessible name.
- Several questions: the bars are a `role="group"` of buttons; each is named "<short title>, question N of M", with ", answered" once answered, and the one on screen carries `aria-current="step"`; the label beside them is `aria-live`. When the step changes, focus moves to the new question (`tabindex="-1"`) so it is never dropped to the page.
- The chosen state — a picked option, an open "Other", a ticked checkbox — is carried by the border and the wash together, and by `aria-pressed` / `aria-expanded` / `:checked` for assistive tech, never by colour alone (WCAG 1.4.1).
- The footer primary is a real `disabled` button until there is an answer; Enter in the "Other" field sends only when it is enabled.
- Multi select: the options are a `role="group"` of real checkboxes, labelled by the question.
- Focus is visualised once, on the row, and only for the keyboard; the scroller leaves room for the ring.
- "Esc to cancel" is stated in the card, and the dismiss button is reachable in the tab order rather than only by the key.
