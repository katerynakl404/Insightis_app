# Chat Shell & Composer — current (prod)

**Ships on prod**, and has since AI Chat launched — but it has never existed as a component anywhere in this kit.

What prod renders, read from the live app:

- The composer is a TipTap/ProseMirror editor inside a rounded panel: `max-w-chat-container` (820px), 8px of padding, a 16px corner, a hairline border, the card colour at 72% over a 10px backdrop blur, and a transition on `border-color, box-shadow`.
- Its hover border is guarded — `[&:hover:not(:focus-within)]` — so a composer you are already typing in does not change colour when the pointer crosses it.
- The thread above it is a masked scroller; a turn slides under the header and under the composer rather than being cut across a line of text.

In this kit the whole of that lived in **four page `<style>` blocks as four hand-kept copies**. A note from 30.06 classified it as "LAYOUT glue" and therefore out of scope for the kit. That was true when it was written. It stopped being true as padding, a radius, a hover border, a focus border and a transition were added to it one at a time, and nobody re-opened the question.

Baseline for the Expected design: [`../changes/ChatShell.md`](../changes/ChatShell.md).
