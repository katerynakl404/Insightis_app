# Chat — message queue · Current → Expected

Screen: [`../pages/concept/chat_page-queue.html`](../pages/concept/chat_page-queue.html) · Spec: AIINS-1808 (epic INS-MJ9P, stories AIINS-1806 / 1810 / 1813).

This is **the chat screen**, not a feature mockup: the shell, sidebar, chat header, thread and composer are the approved `chat_page-landing.html`, and the queue is layered onto them. A **State** picker in the review strip above the page drives this same page into 19 states, and `Live` leaves it free to interact with — type during a reply, queue, reorder, edit, remove with Undo, Stop, Resume, and every pause.

Everything visual comes from the kit. New components: [QueueBand](../changes/QueueBand.md) · [QueueItem](../changes/QueueItem.md) · [Alert](../changes/Alert.md) · [Radio](../changes/Radio.md) · [SortableList](../changes/SortableList.md). Changed on prod: [AskUserPanel](../changes/AskUserPanel.md) · [ThinkingIndicator](../changes/ThinkingIndicator.md). Composer change: [Button → Composer action slot](../changes/Button.md) — **one button, two faces**, overriding the spec's R4 on the design owner's call (2026-09-29).

## The state list

`live` · `A1` `A2` `A3` · `B1` `B2` `B2f` `B4` · `D1` `D2` `D3` `D4` · `E2` `E3` `E3b` · `Q2`

Groups the spec names that are deliberately absent:

- **A4 (mobile)** — every state is responsive, so a separate mobile state would mean the others are not. Narrow the window on any of them.
- **B0 (empty queue)** — the band renders only when it holds something, so "empty queue" is *no band*, which is A1.
- **B3 (queue full)** — the limit was dropped from the feature. A queue that cannot fill cannot have a full state.
- **C1–C6 (row states)** — hover, focus, drag, removed and so on work on every state that has rows. Freezing them as their own entries documented a row that can only exist standing still.

Two states were merged away during review: **B5** rendered pixel-identical to B2, and **E1** said with different words what E2 says with its own control.

## Motion is prod's, not ours

Every animation on this page is the value the live app already ships, read from `insightis-app.devart.info` and `ds-bundle/_ds_bundle.css` on 2026-09-29:

| What | Prod | Used for |
|---|---|---|
| appearance | `animate-in fade-in-0 slide-in-from-bottom-1` → `@keyframes enter`, **0.15s**, **4px** | a row entering the band — note prod does **not** animate thread messages at all |
| disappearance | `animate-out` → `@keyframes exit`, mirrored | a row leaving for the thread |
| streaming caret | a **1px hairline in the text's own colour**, `caret-blink 1.25s ease-out infinite` | the reply being written |
| streaming text | arrives in bursts of 3–7 words, not letter by letter | the reply being written |
| hover reveal | `transition-opacity duration-150`, hidden only from `lg` up | row grip + actions |
| reduced motion | `motion-safe:` / `motion-reduce:` | all of the above — shortened to one frame, never removed, because the element retires on the animation's own end |

Three list moves are the design system's, not this page's: `row-out` (a row leaving), `row-in` (one arriving) and `row-swap-out` / `row-swap-in` (one slot whose contents change — a removal leaving an undo behind, and the undo putting the message back). The page hands over the measured height and waits; it owns none of the recipe.

The app has **no bespoke keyframes for messages**, so the queue does not invent one either. The hover reveal uses the kit's `--motion-fast` rather than prod's one-off 150ms: the kit's motion scale is its own agreed contract.

## Differences from the current chat screen

| Area | Current (prod) | Expected |
|---|---|---|
| Composer while a reply streams | Send is replaced by Stop in the same slot; Enter does nothing; typed text has no stated fate | **still one button in one slot**: Stop while the field is empty, Send the moment there is text; Enter queues; the placeholder says so |
| Between the thread and the composer | nothing | the Queue Band, rendered only when the queue is non-empty |
| Composer placeholder during a reply | unchanged from idle | `Ask a follow-up — it will wait its turn` |
| A stopped reply | the reply stops | the reply stops **and** the queue pauses with a named reason and a Resume |
| AskUserPanel options | a row of buttons; "Other" unboxed | still buttons — pressing one answers; "Other" is boxed like the rest — see [AskUserPanel](../changes/AskUserPanel.md) |
| Waiting for a reply | "Thinking" + dots | the same, with the label itself carrying the wait — see [ThinkingIndicator](../changes/ThinkingIndicator.md) |
| Leaving with work pending | — | a system dialog at size S; **Leave is destructive**, because it throws away queued text and its attachments |

Everything else on the chat screen — thread rendering, tool-call traces, Python execution, attachments, connections and model dropdowns, message cost — is untouched. Editing or recalling an already-sent message stays out of scope, as does "Send now" (phase 2).

## Editing is not an editor

Edit takes the message **out** of the queue and puts its text — and its attachment — back into the composer. The band therefore never contains anything typeable, which is what keeps a queued row from reading as a second input.

The consequence is that the spec's R6 and its C5 no longer describe anything: there is no message being edited *while still in the queue*, so there is no turn to hold and nothing to restore on cancel. Confirmed with the design owner 2026-09-29.

## Layout rules this screen owns

- **The composer must not move when a row is added.** The band is stacked above the composer and the thread above it absorbs the height, so the band grows upward.
- **The band matches the composer width.** The two content columns are the same: `.cp-turn-inner` caps at 820px *including* 24px of padding, so `.cp-composer-inner` must carry the same padding inside the same cap — without it the composer ran 48px wider than the messages above it, but only past the cap, which is why it looked right at narrow widths.
- The thread reserves its scrollbar gutter, so nothing shifts sideways when the conversation grows past one screen.
- Page `<style>` holds the review harness and nothing else: the topbar and the state picker. The shell, the sidebar column, the chat header, the thread, the composer area and the composer are the kit's [Chat Shell & Composer](../changes/ChatShell.md) — lifted out of this page and three others in the same pass, because four hand-kept copies had already drifted.

## Fixed in the kit while building this

**A tooltip stranded when its trigger is removed.** `kit-kit.js` hid the tooltip on `mousedown`, with the comment that "a clicked button often re-renders or removes itself while still hovered". This page found the case that guard missed: the composer's action slot re-renders **on typing**, so the hovered Stop button is replaced by Send with no `mousedown` and no `mouseout` — and "Stop the reply" hung over the new button. Closed at the source: the engine remembers the element the tooltip is anchored to and hides when that element is no longer connected. It fixes every `[data-tip]` removed while its tooltip is open, not just this page.

**Disabled controls could still hover.** All thirteen `.btn` / `.iconbtn` hover rules are now guarded with `:not([disabled]):not(.s-disabled)`. A disabled Send lighting up under the pointer promised something it would not do.

**A scroll-to-bottom button that never went away.** It now syncs with the scroll position (and a `ResizeObserver`), and reads the secondary Button tokens instead of a transparent one-off.

**Chat rows had no counter.** `.sbx-chat .nav-badge` exists now, which is what E3 needs to show a queue waiting in another chat.

## Responsive

- `< 768px` — the band tightens its padding; the composer action becomes a 40×40 icon square; row actions are permanently visible.
- `< 1024px` — the sidebar collapses into the off-canvas drawer (kit-owned), and the row grip + actions stop hiding behind hover — prod's own `lg:` rule.
- This is the real chat screen, so it inherits the approved page's responsive behaviour unchanged.

## Checks the spec asks for

- The pauses are distinguishable without reading the text — different glyph **shape** before any accent, and a different primary action.
- A queue row cannot be mistaken for an input — borderless, transparent, `cursor: default`, and nothing in the band is ever typeable.
- The composer action cannot be pressed by mistake — the slot shows Stop only while the field is empty, so it is never Stop when there is something to send. Accepted consequence: with a draft in the field there is no Stop (see [Button](../changes/Button.md)).
- The composer does not jump when a row is added — the band grows upward into the thread.
- Nothing is hidden without saying so — Expand appears exactly when the list is measured as clipped, and the bottom edge fades only while there is more below it.
