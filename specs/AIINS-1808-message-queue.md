# AIINS-1808 — Message queue in AI Chat

**Corrected specification.** Epic INS-MJ9P · stories AIINS-1806 / 1810 / 1813. Supersedes the original AIINS-1808 text.

Built against: [`../pages/concept/chat_page-queue.html`](../pages/concept/chat_page-queue.html) · screen diff [`../page-changes/chat_page-queue.md`](../page-changes/chat_page-queue.md).

> **How corrections are marked.** Nothing is removed quietly. Where this document drops something the original asked for, the original wording stays on the page ~~struck through~~ with a **`DELETED`** note and the reason. Where it adds something the original has no entry for, the heading carries **`NEW`**. Everything unmarked is the original requirement, unchanged.

---

## 1. The problem

While the assistant is answering, the person cannot say anything. Send is replaced by Stop in the same slot, Enter does nothing, and text typed during a reply has no stated fate — it sits in the field, and whether it will ever be sent is something the person has to guess.

This is not an edge case. The most common moment to think of a follow-up is while reading the answer to the last one.

## 2. What we are building

A **queue**: a holding area between the conversation and the composer. Anything typed during a reply goes into it, in order, and leaves it one message at a time as the assistant becomes free. Until a message is sent, it is fully the person's: they can reorder it, edit it, or remove it.

The queue is a promise the product makes. Every rule below exists to make that promise legible: what is waiting, in what order, when it will go, and what to do when it cannot.

---

## 3. The model

A queue belongs to **one chat**. It holds messages; each message has text and, optionally, one attachment.

| Property | Rule |
|---|---|
| Order | explicit, 1-based, shown on every row. Order decides what is asked next. |
| Capacity | **unbounded.** |
| Lifetime | survives a page reload. |
| Ownership | every message is editable and removable until the moment it is sent. |
| Draining | one message leaves per completed turn, from the front. |

> ~~**Capacity: maximum 10 messages. At 10 the queue is full: the counter reads `10 / 10 · Full`, turns Attention, and Send is disabled with a tooltip giving the reason.**~~
> **`DELETED`** — the limit was dropped from the feature. With it go the `n / 10` counter, the attention state at the ceiling, the disabled Send that confirmed it, and state **B3**. A queue that cannot fill cannot have a full state. The counter is now a sentence, not a ratio.

### 3.1 When a turn is over

A turn ends when the assistant has finished everything it is doing — including a tool call or a Python run that produces no visible text. **An answer that looks finished is not a finished turn.** The queue waits for the turn, never for the text to stop arriving.

> ~~**State B5 — "reply looks finished, turn is not": the band must show that the queue is still waiting although the text has stopped."**~~
> **`DELETED` as a state, kept as a rule.** B5 rendered pixel-identical to B2, because the correct behaviour is that *nothing changes*. A state whose entire content is "the picture does not change" documents the same picture twice. The requirement now lives here, where it can be tested.

---

## 4. The composer

### 4.1 One action, two faces

The composer has **one** action control. It shows **Stop** while a reply is running *and the field is empty*; otherwise it shows **Send**.

> ~~**Stop and Send/Queue are two separate buttons side by side.**~~
> **`DELETED`** — two controls next to each other is what *creates* the mis-click the requirement was written to prevent: aiming to send a question and stopping the answer instead. That mistake needs text in the field, and with text in the field this slot is always Send, so the mis-click has nowhere to happen. (Design owner, 2026-09-29.)
>
> **Accepted consequence, stated rather than hidden:** with a draft in the field there is no Stop. To stop the reply, clear the field.

### 4.2 Enter and the placeholder

- During a reply, **Enter queues**. It does not send, and it does not do nothing.
- The placeholder says so: `Ask a follow-up — it will wait its turn`, replacing the idle `Ask anything about your data…`.
- Queueing is announced to assistive tech as *"Queued, N waiting"*.

Nothing else explains queueing — no tour, no hint card. The placeholder, the control and the band appearing are the explanation.

### 4.3 Attachments

A message is queued **with its attachment**. The file travels with the text, is shown on the row, and comes back to the composer with it if the message is edited.

> ~~**State C6b — the attachment is lost after a reload; the row shows the message without its file.**~~
> **`DELETED`** — a queued file stays linked across a reload. The state cannot occur, and specifying it would ask the designer to draw a failure the system does not have.

---

## 5. The band

The strip between the conversation and the composer.

### 5.1 It exists only when it holds something

No empty frame, no zero-height placeholder, no "0 queued". The space directly above the composer is the most-used area of the product and is never spent on a container with nothing in it.

> ~~**State B0 — empty queue.**~~
> **`DELETED`** — "empty queue" is *no band at all*, which is already state **A1**. An entry for it invites an empty frame to be designed.

### 5.2 It is part of the composer, not a tray on top of it

Same surface family, same corner, directly above it — the band and the composer read as one stack. The contrast that separates the rows is carried by the rows themselves on hover, not by darkening the tray.

### 5.3 The header

One line: the count, and when the queue leaves — `3 queued · sends after this reply`. The wording does not change while a tool call runs (§ 3.1).

### 5.4 It grows upward

Adding a message must not move the composer. The band is stacked above it and the conversation absorbs the height, so the control under the pointer stays where it is.

### 5.5 Height, scrolling and Expand — **`NEW`**

The original has no entry for a queue longer than the box.

- Collapsed, the list is three rows tall and scrolls, pinned to its end so the message just added is the one on screen.
- **Whether anything is hidden is measured, never counted.** With wrapping and attachments, three rows can overflow and five can fit, so a row count cannot answer the question.
- **Expand appears exactly when the list is clipped** — and is *absent*, not disabled, when it is not. There is nothing for it to do.
- **Expand points up.** The panel grows upward out of the composer, so the arrow points the way the panel will move. It turns back down once open.
- Expanded, the band may take **half the screen**. The queue and the conversation then get the same room, and neither reads as the subordinate one.
- The scroller's edges fade where there is more content past them — top as well as bottom, because a scroller that has been scrolled has content above it too.

---

## 6. The row

### 6.1 It must never read as an input

This is the single biggest risk in the feature: a queued row mistaken for a second text field and typed into. The row is borderless, transparent, on the band's own surface, with a default cursor — and because editing moves the text to the composer (§ 6.4), **nothing in the band is ever typeable**.

### 6.2 Text wraps

A row shows its message in full, on as many lines as it needs. Nothing truncates.

> ~~**The message is truncated to one line; the full text is available in a tooltip and in edit mode.**~~
> **`DELETED`** — a queued message is something the person is about to send, and they have to be able to read all of it before they do. With nothing hidden there is nothing for a tooltip to recover, so the tooltip went with the truncation.

On a wrapped row, the order number and the row's controls stay aligned to the **first line**. Centred on the whole row they drift into the middle of a paragraph and stop reading as that message's marker.

### 6.3 Two controls, plus the grip

Drag grip · Edit · Remove. That is the whole set, revealed on hover **or focus-within**, so the row is never mouse-only.

> ~~**Remove sits in a row kebab menu, together with Move up and Move down.**~~
> **`DELETED`** — Move up/down duplicated the drag grip and the keyboard path for a third time. Once they were gone the kebab held a single item, which is a menu whose only purpose is to hide one button. Removal is cheap to undo (§ 6.5), so it does not need hiding.

The grip is a surface you drag, not a button you press: no hover pill, no button background.

### 6.4 Edit is not an editor

Edit takes the message **out** of the queue and puts its text — and its attachment — back into the composer, with the caret at the end. There is no second writing surface in the product, and the band never contains one.

> ~~**R6 — while a message is being edited, the turn is held.** / ~~**C5 — the state of a message being edited while still in the queue.**~~
> **`DELETED`** — there is no message being edited *while queued*: editing removes it. So there is no turn to hold, nothing to save, nothing to cancel, and no state to draw. (Design owner, 2026-09-29.)

### 6.5 Removal is undoable — **`NEW`**

The original describes removal as a single destructive act. It is not, and the difference changes the interaction.

- Removing needs **no confirmation step**. The way back is offered after the fact instead of permission being asked before it.
- The row is **replaced in place** by a note carrying **Undo**. The note takes the gap the message left — at the top of the list it reads as a new event arriving rather than as the hole where something was.
- The note leaves on its own after a fixed window, the same length the product gives a toast. An undo that floats past and an undo that sits in a list must give the same amount of time.
- **Several removals are several notes**, each in its own place, with its own Undo and its own clock. They were removed at different moments and they leave at different moments. One shared note would quietly make the second Undo restore the wrong message.
- Removing the **last** message takes the band with it, and the undo with it. Accepted: a band kept alive only to say "Message removed" shows a header counting a queue that no longer exists.

### 6.6 Reordering

Drag the grip, or **Alt + ↑ / ↓** from the keyboard. The drag is never the only path.

> ~~**C1–C6 — row states: rest, hover, menu open, dragging, drop target, removed, with attachment.**~~
> **`DELETED` as screen states.** They are not states of the screen — they work on every state that has rows. Fixed as separate entries they documented a row that can only exist standing still. They remain states of the row *component*, specified in [QueueItem](../changes/QueueItem.md).

---

## 7. Pauses

The queue stops sending and says why. Four causes, and they must be distinguishable **before any text is read** — a different glyph *shape* first, then colour, and a different primary action.

| Cause | Reads | Primary action | Also |
|---|---|---|---|
| The assistant asked a question | *Waiting for your answer* | — (answer the card) | — |
| The last reply failed | *The last reply didn't finish* | Resume | Retry |
| Out of credits | *You're out of credits* — "nothing was charged" | Buy Credits | — |
| The person pressed Stop | *You stopped the reply* | Resume | Clear Queue |

Supporting line always says what is held: *"N messages are on hold"*.

**Copy rules.** The title is the cause in the words a person would use; the description is what it means for the work they already did. No shared `Queue paused ·` prefix — the same scaffold four times reads as a template, and the band is visibly stopped anyway. *"Nothing was charged"* appears on exactly one of the four, because money is the only one of these that costs anything to get wrong.

**Clear Queue appears only on the neutral pause.** Where the pause names a problem — an unanswered question, a failed reply, an empty balance — the way out is to deal with the problem, and "empty it all" sitting beside *Retry* or *Buy Credits* reads as the product offering to give up on the person's behalf.

**Paused, the rows fold away** behind *Show N Queued Messages*. The thing that actually needs doing is then the only thing competing for attention. The rows stay reachable — everything is editable until it is sent, so this is a disclosure, not a lockout.

**Resume** puts the queue back to waiting. It is the only thing that sends a held queue, and no copy anywhere may promise sending without it.

> ~~**States D1b and D5.**~~
> **`DELETED`** — both restate a pause already covered above with different wording. D5 in particular ("resumed while a reply is still running") is not a state: the queue goes back to waiting and the header already says it sends after this reply.

---

## 8. Reload

The queue survives. On return it is **held**, not running: *"N messages restored — nothing sends until you resume"*, with Resume.

Where the queue legitimately picks itself back up, the same notice states the fact and offers nothing to press: *"N messages restored — sending after this reply"*. **Copy must never describe an outcome the visible control contradicts.**

> ~~**State E1.**~~
> **`DELETED`** — says with different words what the restored state above says, and that one carries the control that makes the difference legible.

---

## 9. A queue in another chat — **`NEW`**

The original stops at the open chat. A queue that keeps working while the person reads somewhere else has to say so where they are.

The chat's row in the sidebar carries a **count**:

- **filled** — that queue is still sending on its own;
- **quiet** — that queue has stopped and is waiting for a person.

Two different situations. A queue working is not a queue stuck. The count never doubles as a selection indicator — the row already shows which chat is open — and it hands its corner over to the row's own menu rather than drawing on top of it.

---

## 10. Leaving with work pending

Navigating away with a non-empty queue raises a confirmation. **Leave is destructive**: it throws away queued text and its attachments.

---

## 11. The state list

Sixteen states, all on one screen, switchable from the review strip; `Live` leaves the page free to interact with.

| | |
|---|---|
| `Live` | free interaction — type during a reply, queue, reorder, edit, remove, undo, stop, resume |
| `A1` | no reply running |
| `A2` | reply running, composer empty |
| `A3` | reply running, text entered |
| `B1` | one message waiting |
| `B2` | several messages |
| `B2f` | **`NEW`** — a queued message carrying a file |
| `B4` | messages leaving one by one |
| `D1` | waiting on a Confirmation Card |
| `D2` | last reply failed |
| `D3` | out of credits |
| `D4` | the person pressed Stop |
| `E2` | after a reload |
| `E3` | **`NEW`** — a queue in another chat, running |
| `E3b` | **`NEW`** — a queue in another chat, stopped |
| `Q2` | after a reload, the queue continues |

> ~~**State A4 — mobile.**~~
> **`DELETED`** — every state is responsive. A separate mobile entry asserts that the others are not, and it fixes one width as if it were a condition. Narrow the window on any state instead.

**B2f** exists because the attachment's *placement* is a decision, not a property: the file sits **under** the text it belongs to. Beside it, the chip is cut adrift from its own sentence and on a long message has nowhere to sit at all.

---

## 12. Responsive

- **< 768px** — the band tightens its padding; the composer's action becomes an icon-only square; row controls are permanently visible, because there is no hover to reveal them with.
- **< 1024px** — the sidebar becomes the off-canvas drawer; row controls stop hiding behind hover, matching the app's own breakpoint.

Everything else is the approved chat screen's behaviour, inherited unchanged.

---

## 13. Accessibility

- The band is a labelled region, reachable as a landmark rather than as loose content above the field.
- Every control is reachable from the keyboard; `focus-within` reveals exactly what hover reveals.
- Reordering has a keyboard path (**Alt + ↑ / ↓**) that is not a workaround for the drag but an equal route.
- Queueing, removal, undo, edit and clearing are announced in a live region. An announcement is built from the captured message, never read back from state after the re-render.
- Expand carries `aria-expanded` and a label naming the action, not the glyph.
- Nothing is carried by colour alone: order is a number, a pause has its own glyph shape, an attachment is a named chip.
- Reduced motion **shortens** every animation to a single frame rather than removing it — elements retire on their animation's end, so removing the animation would remove the retirement with it.

---

## 14. Out of scope

Thread rendering, tool-call traces, Python execution, connections and model dropdowns, message cost — untouched. Editing or recalling an already-sent message is out of scope, as is **Send now** (phase 2; the row keeps the slot for it).

---

## Where the built answer lives

| | |
|---|---|
| Screen, all 16 states | [`../pages/concept/chat_page-queue.html`](../pages/concept/chat_page-queue.html) |
| Screen-level diff vs prod | [`../page-changes/chat_page-queue.md`](../page-changes/chat_page-queue.md) |
| Components | [QueueBand](../changes/QueueBand.md) · [QueueItem](../changes/QueueItem.md) · [Alert](../changes/Alert.md) · [Counter](../changes/Counter.md) · [Radio](../changes/Radio.md) · [ConfirmationCard](../changes/ConfirmationCard.md) · [SortableList](../changes/SortableList.md) · [ThinkingIndicator](../changes/ThinkingIndicator.md) · [Chat Shell & Composer](../changes/ChatShell.md) |
| The one-button composer decision | [Button](../changes/Button.md) |
