# Queue Band — prod → expected

Baseline: [`../current/QueueBand.md`](../current/QueueBand.md) — **new component, nothing on prod to diff against.** Storybook: [`#queueband`](../insightis-preview-kit.html#queueband). Screen: [`../pages/concept/chat_page-queue.html`](../pages/concept/chat_page-queue.html) (states B0–B5). Spec: AIINS-1808.

The strip between the conversation thread and the composer that holds follow-up questions typed while the assistant is still answering. It is the container; its contents are [QueueItem](QueueItem.md), [QueuePause](QueuePause.md), a count header and an optional inline note.

## Why it exists

A reply in AI Chat now runs long — the assistant calls tools and writes and runs Python inside one answer — and people watching it already know their next question. Today that question has nowhere to go: the composer refuses it, so people learn to wait, and the ones who type anyway have no idea what will happen to the text. The band is the place the question waits.

## The three decisions the shape encodes

**It is not a box, and the rows in it are not boxes.** The single largest risk in this feature is that a queued row reads as a second input and gets typed into. The band is a filled `--surface-card2` tray with borderless, transparent rows; the composer below it is a bordered `--surface-card` panel. A list inside a tray next to a box — two different objects, not two boxes.

**It exists only when it holds something.** No empty frame, no reserved height, no zero-state. This is the most-used area of the product, and a permanent container would cost every person vertical space so that the minority who type ahead get a label. B0 is therefore "no band", not "empty band".

**The header never reacts to the streamed text.** It states the count and when the queue leaves, and keeps saying it while a tool or Python call runs (R3) — an answer that looks finished is not a finished turn. B5 is deliberately pixel-identical to B1; that is the state that proves the header is driven by the turn, not by whether characters are arriving.

## Growth direction (R: the composer must not jump)

The band is stacked above the composer inside the composer area, and the thread above it absorbs the height. Adding a row grows the band **upward**; the composer under the person's pointer does not move. This is a consumer requirement on the page layout, not a property of the component, and it is what `pages/concept/chat_page-queue.html` implements.

## DOM / markup contract

- Outer `<div class="mqb">`, wrapped by the consuming page in `role="region"` + `aria-label="Queued messages"`.
- Optional pause block first: `<div class="mqp is-…">` — see [QueuePause](QueuePause.md). When a pause is shown the count header is **replaced**, not stacked beside it: the reason supersedes the "sends after…" promise.
- Header `<div class="mqb-head">` = decorative `.mqb-head-ic` glyph + `<span class="mqb-head-t">` + optional `<button class="btn btn-tertiary btn-xs mqb-head-act" aria-expanded>` collapse toggle.
- List `<ul class="mqb-list">`, items are `<li class="mqi">`. Add `.is-clamped` to collapse past the visible count.
- Optional `<div class="mqb-note" role="status">` after the list; `.is-full` for the queue-limit warning.

## Tokens

| Token | Role here |
|---|---|
| `--surface-card2` | tray fill — one step off the page, no border needed |
| `--radius-xl` (`--radius-lg` on phones) | tray corner, deliberately below the composer's 16px so the band reads as subordinate |
| `--ts-label-m-*` · `--ink-secondary` | header type + colour |
| `--ink-inactive` | header glyph (decorative, `aria-hidden`) |
| `--ts-body-s-*` · `--ink-secondary` | inline note |
| `--fb-attention-text` | `.mqb-note.is-full` text **and** glyph |
| `--mq-item-h` | shared row rhythm (see [QueueItem](QueueItem.md)) |

No new colour tokens. `--mq-item-h` and `--mq-rail` are the only additions to `:root`, both dimensional and both with two consumers.

## Copy

| Where | Text |
|---|---|
| Header, 1 message | `Queued · 1 · sends after this reply` |
| Header, several | `Queued · {n} · sends one by one after this reply` |
| Header, at the limit | `Queued · {max} of {max} · sends one by one after this reply` |
| Header, holding an edit | `Queued · {n} · waiting for your edit` |
| Header, phone | `Queued · {n}` |
| Collapse toggle | `+{n} more` |
| Queue full | `Queue is full ({max} of {max}). Remove a message or wait for the next one to send.` |

## Open — needs a decision before this is final

**Q7 · how many rows before the collapse.** Built at 3 on desktop / 2 on phones (`.is-clamped`), with 5 / 3 (`.is-clamped-5`) implemented as the alternative and switchable on the concept page. Three keeps the band under a quarter of the composer area at the common count; five shows a fuller picture at the cost of the thread.

**Q6 · input held during conversation compression** (INS-ULRG / AIINS-1285) must end up on this same band. What that surface looks like today is not captured, so the merge is specified but not yet drawn.

## Accessibility self-check

- Header and note are inside a `role="status"` region, so a queued / sent / paused change is announced without moving focus. Announcements: *"Queued, 2 waiting"*, *"Sent: …"*, *"Queue paused: …"*.
- Header text 12px / weight 500 on the tray measures **5.03:1** light · **10.81:1** dark — over the 4.5:1 floor.
- `.mqb-note.is-full` measures **4.58:1** light · **7.04:1** dark, and pairs the attention colour with an alert glyph and an explicit sentence, so the limit is never carried by colour alone (1.4.1).
- Tray-to-page contrast is 1.05:1 light / 1.21:1 dark — intentionally almost nothing. The tray is a grouping cue, not a boundary the eye has to find; the rows and header inside it carry the meaning and all clear their own floors.
- The collapse toggle is a real `<button>` with `aria-expanded`, at the `btn-xs` 28px height.
