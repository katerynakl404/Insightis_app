InlineRename from @devart/ui-react. Use via `window.DevartUI.InlineRename` (bundle loaded from the root `_ds_bundle.js`). Wrap the tree in `<TooltipProvider>` (full provider chain in README.md — components read theme/i18n from that context).

A title that turns into a field where it stands — rename in a list row, a card,
a breadcrumb — and back again.

```jsx
{renaming ? (
  <InlineRename
    aria-label="Chat name"
    defaultValue={chat.title}
    onCommit={(title) => { rename(chat.id, title); setRenaming(false); }}
    onCancel={() => setRenaming(false)}
  />
) : (
  <span className="min-w-0 truncate">{chat.title}</span>
)}
```

## Behaviour

| | |
|---|---|
| **opens** | focused, holding the title, all of it selected — typing replaces it, one arrow key keeps it |
| **Enter** | commits the trimmed title |
| **blur** | commits, the same as Enter |
| **Esc** | cancels |
| **empty or unchanged** | a cancel, not a commit |
| **a click inside** | places the caret; it does not activate the row |

The parent owns whether it is showing: render it in place of the title, and
put the title back on `onCommit` or `onCancel`. **Exactly one of the two fires,
once.** Enter commits and so does the blur that follows; the second is
swallowed rather than committing twice.

Empty is a cancel because there is no such thing as a nameless row; unchanged
is a cancel because saving a name that did not change is a request for nothing.
An Enter that picks an IME candidate mid-composition is neither.

Every key typed in it stays in it — a Space must not toggle the row, an arrow
must not move a list's focus.

## Opening it from a menu

Rename is usually a menu item, and Radix runs an item's `onSelect` while the
menu's focus trap still holds. So the field focuses **a tick after it mounts**:
focused at once, it would be pulled back into the menu, blur, and commit as the
menu closed. `RowMenuButton` then leaves the focus where the field took it.

## The box

It replaces a 14px title on a 20px line. The field is **24px** — the row-action
step, level with the IconButtons beside it — and gives the 4px back as a
negative block margin, so the row does not move when the title swaps for it.

| | |
|---|---|
| height | 24px, `-my-0.5` |
| inset | 6px |
| radius | `rounded` (4px) — the step the 24/28px boxes take |
| text | 14px, regular, Text/Primary |
| border | Stroke at rest, Input/Focus while focused — never a ring |
| surface | Surface/Card |

It is the bare `Input` control with that box, rather than an `InputGroup`:
the group's ladder starts at 28px with 12px text, a step too large for a title
in a line of text. It fills the width the title had (`w-full`, `min-w-0`).

A clickable row is `cursor-pointer select-none` and both inherit; the field
puts the text caret and text selection back.

## Props

`defaultValue`, `aria-label` (required — nothing else labels it once the title
is gone), `onCommit(value)`, `onCancel()`. Every other `<input>` prop passes
through; `type`, `value` and `onChange` are the component's own.
