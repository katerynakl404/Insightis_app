# Chat — charts (Generate two charts using random data) · Current → Expected

Screen: [`../pages/concept/chat_page-charts-landing.html`](../pages/concept/chat_page-charts-landing.html) — the chat **Generate two charts using random data** in the sidebar.

This page is where the [AskUserPanel](../changes/AskUserPanel.md) is reviewed in a real chat. The **AskUserPanel** switch in the review strip puts it over the composer in each variant; **Off** is the chat as it is.

| Area | Current (prod) | Expected | Component ref |
|---|---|---|---|
| AskUserPanel — single select | bordered buttons; the list scrolls inside the panel even when it fits | button rows; "Other" opens a field inside its box; Skip + Submit in the footer | [AskUserPanel](../changes/AskUserPanel.md) |
| AskUserPanel — several questions | tabs with a dot per unanswered question, radio rows, gated Submit | one question at a time, single and multi select mixed: named clickable bars, a pick moves on, Skip + Next | [AskUserPanel](../changes/AskUserPanel.md) |
| AskUserPanel — multi select | unboxed checkbox rows + Submit | checkbox on the right of the shared option row; Skip + Submit, Submit disabled while nothing is ticked | [AskUserPanel](../changes/AskUserPanel.md) · [Checkbox](../changes/Checkbox.md) |
| AskUserPanel — long list | — | capped at three quarters of the window; only the options scroll, on the thin scrollbar, with the scroll fade | [AskUserPanel](../changes/AskUserPanel.md) |

Answering or dismissing (✕ or Esc) closes the panel and returns the switch to **Off** — no toast, the reply starting is the feedback. The chat opens at its newest message. The panel sits in the kit's `.cp-cfc-layer`, as on [chat_page-queue](chat_page-queue.md).

## Out of scope

The chat itself — thread, charts, composer and the Popover state switch — is unchanged.

## A11y / consistency self-check

- [x] Every visual comes from the kit (`.cfc`, `.cp-cfc-layer`); the page adds only the switch and the content.
- [x] The dismiss is a real button in the tab order; Esc closes the panel as the card says.
- [x] The switch is a `role="tablist"` segmented control with `aria-selected`, like the Popover state switch beside it.
