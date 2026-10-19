# Sortable List — prod → expected

Baseline: [`../current/SortableList.md`](../current/SortableList.md) — **new behaviour, nothing on prod to diff against.** Storybook: [`#sortable`](../insightis-preview-kit.html#sortable). Implementation: `pages/kit-kit.js` § 4. First consumer: [Queue Band](QueueBand.md).

Drag-to-reorder. This is a **behaviour, not a look** — it ships no component of its own, and any list opts in with three attributes.

```html
<ul data-sortable>
  <li data-sort-item tabindex="0">
    <button data-sort-handle aria-label="Drag to reorder">…</button>
    …
  </li>
</ul>
```

## Why it lives in `kit-kit.js` and not in the page

Reordering is part of a list's contract, the same way the tooltip delay is part of every `[data-tip]`'s. `kit-kit.js` exists because per-page copies drift — seven pages once kept a stale tooltip warm-up and one shipped a second engine of its own. A page that needs different drag behaviour is proposing a contract change, made once here for every consumer.

## The list never owns the data

The list emits `kit:sorted` with `{from, to}` and stops. The consumer reorders its own model and re-renders; the DOM move this code made is reverted by that re-render. That is what lets a list that re-renders and a list that does not both behave, and it is why nothing here reaches into anyone's state.

## Keyboard is not an afterthought

**Alt + ↑ / ↓** on the focused row emits the same event with the same indices. It is what makes drag-to-reorder an accessible pattern rather than a mouse-only flourish, and it costs four lines because the event is already the interface.

Pointer Events carry mouse, pen and touch down one code path; `touch-action:none` on the handle keeps a touch drag from scrolling the page instead of moving the row.

## Two bugs that shaped the final code

Both were the same mistake seen twice: **a list that hides part of itself breaks a drag that assumes every row is measurable.**

1. **Unrendered rows have a zero-size rect at the document origin.** The queue clamps to three rows and a "+N more"; the rest stay in the DOM but unrendered. Every midpoint test against them fails, the placement loop falls straight through, and the row lands at the very end of a list whose tail nobody can see. Fix: only siblings that are actually rendered take part, and a drop below the last visible midpoint anchors after *that* row.

2. **A clamp counted in `nth-child` is thrown off by the placeholder.** The drop placeholder is a child, so `nth-child(n+4)` starts hiding one row early the moment a drag begins — and every drop landed a position short of where it was let go. Fix: the clamp counts rows only, `nth-child(n+4 of .mqi)`.

The first fix attempted for (2) was to suspend the clamp during a drag. It was wrong and is recorded so it is not retried: the band is anchored to the composer and grows upward, so revealing the hidden tail mid-drag moves the whole list out from under the cursor.

## Token map

| Slot | Token |
|---|---|
| handle cursor | `grab` / `grabbing` |
| dragged row | `--shadow-lift-hover`, `--surface-card` |
| placeholder | `--state-hover` fill, `--radius-md` |

No new colour tokens.

## No change (—)

Row appearance, spacing and typography are the consumer's; this adds a handle, a drag state and a placeholder and touches nothing else.

## Accessibility self-check

- Every drag operation is reachable from the keyboard with the same result (Alt + ↑ / ↓ on a focused row).
- The handle is a real `<button>` with an `aria-label`, so it is tabbable and announced.
- Rows carry `tabindex="0"` so the keyboard path has somewhere to land.
- The dragged row keeps its text and contrast throughout — position, not colour, communicates the drag (WCAG 1.4.1).
- Focus returns to the moved row on drop, so a keyboard user is not thrown back to the top of the list.
