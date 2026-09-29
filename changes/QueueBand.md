# Queue Band — prod → expected

Baseline: [`../current/QueueBand.md`](../current/QueueBand.md) — **new component, nothing on prod to diff against.** Storybook: [`#queueband`](../insightis-preview-kit.html#queueband). Screen: [`../pages/concept/chat_page-queue.html`](../pages/concept/chat_page-queue.html) (states B1–B5). Spec: AIINS-1808.

The strip between the conversation thread and the composer that holds follow-up questions typed while the assistant is still answering. It is the container; its contents are [QueueItem](QueueItem.md), an [Alert](Alert.md) when the queue is paused, and a count header.

## Why it exists

A reply in AI Chat now runs long — the assistant calls tools and writes and runs Python inside one answer — and people watching it already know their next question. Today that question has nowhere to go: the composer refuses it, so people learn to wait, and the ones who type anyway have no idea what will happen to the text. The band is the place the question waits.

## The three decisions the shape encodes

**It is not a box, and the rows in it are not boxes.** The single largest risk in this feature is that a queued row reads as a second input and gets typed into. The band is a filled tray with borderless, transparent rows; the composer below it is a bordered panel. A list inside a tray next to a box — two different objects, not two boxes.

**It exists only when it holds something.** No empty frame, no reserved height, no zero-state. This is the most-used area of the product, and a permanent container would cost every person vertical space so that the minority who type ahead get a label. "Queue empty" is therefore *no band*, not an empty one — which is also why there is no separate B0 state.

**The header never reacts to the streamed text.** It states the count and when the queue leaves, and keeps saying it while a tool or Python call runs (R3) — an answer that looks finished is not a finished turn. B5 is deliberately pixel-identical to B1; that is the state that proves the header is driven by the turn, not by whether characters are arriving.

## The ceiling is visible from the first message

The count is a badge reading **`n / 10`**, not a sentence that starts mentioning the maximum only once it is reached. A limit that appears for the first time *at* the limit reads as a fault; a limit that has been on screen since message one reads as a rule. At the maximum the badge turns `badge-attention` and says `10 / 10 · Full`, and the disabled Send in the composer then confirms a limit the band already showed rather than breaking the news.

## Growth direction (R: the composer must not jump)

The band is stacked above the composer inside the composer area, and the thread above it absorbs the height. Adding a row grows the band **upward**; the composer under the person's pointer does not move. This is a consumer requirement on the page layout, not a property of the component, and it is what `pages/concept/chat_page-queue.html` implements.

It is also why a drag must not change how many rows are visible: revealing a clamped tail mid-drag moves the whole list out from under the cursor. See [SortableList](SortableList.md).

## How the list handles more rows than fit

Three answers to Q7, all built, switchable on the concept page rather than living as separate concepts:

| Mode | Class | Behaviour |
|---|---|---|
| 3 rows | `.is-clamped` | 3 on desktop / 2 on phones, rest behind `+N more` |
| 5 rows | `.is-clamped-5` | 5 / 3 |
| Scroll | `.is-scroll` | capped height, **pinned to the end** so the row just added is the one on screen; an icon-only chevron expands the cap |

Rows are one line by default and can wrap (`.is-wrap`) — also a page-level control, because wrapping is a dimension every state has, the way light/dark is, not a state of its own.

**The clamp counts rows, not children** (`nth-child(n+4 of .mqi)`). A drag inserts a placeholder among the children, and a plain count hid one row too early, landing every drop a position short of where it was let go.

## DOM / markup contract

- Outer `<div class="mqb">`, wrapped by the consuming page in `role="region"` + `aria-label="Queued messages"`.
- When paused, an [Alert](Alert.md) comes first and the count header is **replaced**, not stacked beside it: the reason supersedes the "sends after…" promise. The rows then fold away behind a single tertiary toggle (`.mqb-fold`), so the thing that actually needs doing is the only thing competing for attention. They stay reachable — everything is editable until it is sent, so this is disclosure, not a lockout.
- Header `<div class="mqb-head">` = decorative `.mqb-head-ic` glyph + the `n / 10` count badge + `<span class="mqb-head-t">` + an optional trailing action (`+N more`, or an icon-only expand chevron in scroll mode).
- List `<ul class="mqb-list" data-sortable>`, items are `<li class="mqi" data-sort-item>`.

## Tokens

| Token | Role here |
|---|---|
| `--surface-card` + `--stroke-border` | tray fill and edge — the band sits on the page, so it needs its own edge |
| `--radius-xl` (`--radius-lg` on phones) | tray corner, deliberately below the composer's so the band reads as subordinate |
| `--ts-label-m-*` · `--ink-secondary` | header type + colour |
| `--ink-inactive` | header glyph (decorative, `aria-hidden`) |
| `--mq-item-h` | shared row rhythm (see [QueueItem](QueueItem.md)) |

No new colour tokens. `--mq-item-h` is the only dimensional addition.

## Copy

| Where | Text |
|---|---|
| Count badge | `{n} / {max}` — `{max} / {max} · Full` at the limit |
| Header | `queued · sends after this reply` — one line for every count; "one by one" described a numbered list that is already on screen |
| Expand (clamped) | `+{n} more` |
| Expand / collapse (scroll) | icon only, tooltip `Expand` / `Collapse` |
| Queue full (Send tooltip) | `Queue is full ({max} of {max}). Remove a message or wait for the next one to send.` |

## No change (—)

The composer below it, the thread above it and the page's own spacing are untouched; the band is inserted into the composer area and the thread absorbs the height.

## Accessibility self-check

- Header is inside a `role="status"` region, so a queued / sent / paused change is announced without moving focus.
- Header text on the tray measures **5.03:1** light · **10.81:1** dark — over the 4.5:1 floor.
- At the limit the badge pairs the attention colour with the word **Full**, so the ceiling is never carried by colour alone (1.4.1), and the disabled Send carries the reason as a tooltip on its slot — a disabled button fires no pointer events, so a tip on the button itself would never show.
- Tray-to-page contrast is intentionally slight: the tray is a grouping cue, not a boundary the eye has to find; the rows and header inside it carry the meaning and clear their own floors.
- The expand control is a real `<button>` with `aria-expanded`. In scroll mode it is icon-only and carries both an `aria-label` and a tooltip — the chevron rotates rather than the label changing word.
