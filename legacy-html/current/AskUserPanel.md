# AskUserPanel — current (prod)

**Exists on prod, inside the answer card.** The assistant asks which field to use and renders the choices as a stack of bordered buttons; "Other" sits unboxed below them. There is no control indicating that exactly one may be chosen, and nothing marks a choice as made — pressing an option submits it immediately.

## Variants

Prod renders three modes of the same panel, chosen by what the assistant asks:

| Mode | Options | Submit | Top line |
|---|---|---|---|
| Single select | a bordered button per option; a "Recommended" badge beside the label; pressing one submits | — | question + "Esc to cancel" + ✕ |
| Multi select | unboxed checkbox rows — the question text itself says "Select one or more" | `Submit` below the list | question + "Esc to cancel" + ✕ |
| Several questions | unboxed radio rows, one question per tab | `Submit`, disabled until every question has an answer, with "N questions left to answer" beside it | tabs (a dot on each unanswered tab) + "Esc to cancel" + ✕; the question sits below |

In every mode the option list scrolls inside the panel when it is taller than the space.

Baseline for the Expected design: [`../changes/AskUserPanel.md`](../changes/AskUserPanel.md).
