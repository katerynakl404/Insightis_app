# Chat — charts (Generate two charts using random data) · Current → Expected

Screen: [`../pages/concept/chat_page-charts-landing.html`](../pages/concept/chat_page-charts-landing.html) — the chat **Generate two charts using random data** in the sidebar.

This page is where the [AskUserPanel](../changes/AskUserPanel.md) is reviewed in a real chat. The **AskUserPanel** switch in the review strip puts it over the composer in each variant; **Off** is the chat as it is.

| Area | Current (prod) | Expected | Component ref |
|---|---|---|---|
| AskUserPanel — single select | bordered buttons; the list scrolls inside the panel even when it fits | button rows, "Other" opens a field; nothing scrolls under half the window | [AskUserPanel](../changes/AskUserPanel.md) |
| AskUserPanel — several questions | tabs with a dot per unanswered question, radio rows, gated Submit | one question at a time: stepper, Back / Skip, an answer moves on, the last one sends | [AskUserPanel](../changes/AskUserPanel.md) |
| AskUserPanel — multi select | unboxed checkbox rows + Submit | checkbox inside the shared option row; Submit disabled while nothing is ticked | [AskUserPanel](../changes/AskUserPanel.md) · [Checkbox](../changes/Checkbox.md) |
| AskUserPanel — long list | — | capped at half the window; only the options scroll, with the scroll fade | [AskUserPanel](../changes/AskUserPanel.md) |

Answering or dismissing (✕ or Esc) closes the panel and returns the switch to **Off**; a toast shows what was sent. The panel sits in the kit's `.cp-cfc-layer`, as on [chat_page-queue](chat_page-queue.md).

## Out of scope

The chat itself — thread, charts, composer and the Popover state switch — is unchanged.

## A11y / consistency self-check

- [x] Every visual comes from the kit (`.cfc`, `.cp-cfc-layer`); the page adds only the switch and the content.
- [x] The dismiss is a real button in the tab order; Esc closes the panel as the card says.
- [x] The switch is a `role="tablist"` segmented control with `aria-selected`, like the Popover state switch beside it.
