# Queue Item — prod → expected

Baseline: [`../current/QueueItem.md`](../current/QueueItem.md) — **new component, nothing on prod to diff against.** Storybook: [`#queueitem`](../insightis-preview-kit.html#queueitem). Lives inside [QueueBand](QueueBand.md). Spec: AIINS-1808.

One waiting message. The single biggest risk in this feature is a queued row that reads as a second input and gets typed into, so almost every decision here is about *not* looking like a field.

## The decisions

**Deliberately not a box.** Borderless, transparent, on the band's own surface. A bordered row with a light fill is an input; this is a line of text with a number in front of it.

**The number is the kit's [Counter](Counter.md), not a one-off circle.** The same object had grown twice in this feature — once as the order number here, once as the per-chat count in the sidebar — as a 20px circle in one place and a padded pill in the other. It is one component now, at rest in both: a count is content, not a status.

**The row follows the height of its text.** Nothing truncates. A queued message is something you are about to send, and you have to be able to read all of it before you do — which also means it needs no tooltip, because there is nothing hidden to recover. An earlier version held every row to one line and put the full text in a tooltip; the tooltip went when the truncation did.

`flex:none` is load-bearing: the list is a flex column with a capped height, so without it the rows are free to be shrunk by the container and a two-line message spills out of a box still sized for one.

**On a wrapped row, the number and the actions stay on the FIRST LINE.** Given the row's full height they drift toward the middle of a three-line paragraph and stop reading as the marker for that message. One line box is what they belong to; the rest of the row is the message's.

**Two visible controls, not three.** Grip · Edit · Remove, and that is the set. An earlier version put Remove behind a kebab alongside Move up / Move down. Move up/down duplicated the grip and the keyboard path for a third time, and once they were gone the kebab held a single item — a menu whose purpose was to hide one button. Removal is cheap to undo, so it does not need hiding.

**The grip is not a button.** It is a surface you drag, so it carries no hover pill and no button background — the same rule as an icon inside a field. Edit and Remove are plain tertiary IconButtons.

**An attachment sits under its own text, not beside it.** Beside it, the chip was cut adrift from the sentence it belongs to, and on a long message there was nowhere for it to sit at all. There is no "attachment lost" state: a queued file stays linked, so the state cannot occur.

**Dragging is the kit's engine, never the page's.** `.is-dragging` keeps the row's size and takes away its surface; `.sort-ph` holds the gap it will land in. The engine ignores siblings that are not rendered — unrendered rows report a zero-height box, and counting them landed every drop a position short of where it was let go. See [SortableList](SortableList.md).

**Leaving and arriving are the kit's, mirroring the design system.** A row that is simply gone uses `row-out`: it fades over the first 40% and collapses over the rest, because fading and shrinking together leaves the eye tracking text that is going away while rows arrive underneath it. A row *replaced* by something that belongs in its slot — a removal leaving an undo behind — uses `row-swap-*` instead, which never collapses to zero. See [QueueBand](QueueBand.md).

## Token map

| Slot | Token |
|---|---|
| order number | the [Counter](Counter.md) component at rest |
| message | `Body/M` at `--ink-body` |
| hover | `--state-hover` |
| attachment | `.badge.badge-sm.badge-secondary` |
| actions | tertiary IconButton at the row's size step |

## No change (—)

Nothing: there is no prod counterpart.

## Accessibility self-check

- The row is focusable and every control inside it is reachable; `focus-within` reveals the same set hover does, so the row is never mouse-only.
- The grip is `tabindex="-1"` and labelled for assistive tech, with reordering also available from the keyboard through the kit's engine — the drag is never the only path.
- Nothing is conveyed by colour alone: order is a number, an attachment is a named chip.
- Hover and focus overlays stack rather than replace, so a focused row inside a hovered band still reads as focused.
- When a row leaves the queue, focus moves to the next row or back to the composer, never to `<body>`.
