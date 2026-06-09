# ChatRow — current (prod)

⚠ **Pending capture.** The live page at <https://insightis-app.devart.info/chats> exists but is a React SPA — its rendered DOM was not reachable from this workstation. The Current column in `../changes/ChatRow.md` and in the kit's `#chatrow` storybook section is **not** filled in from real prod markup and should be considered a placeholder until someone:

1. Opens the live `/chats` route while signed in.
2. Captures either a screenshot or the rendered DOM (DevTools → Copy → Copy outerHTML on the chats list container).
3. Pastes the markup / tokens into this file so the Current column can be derived against it.

Until that happens, the `Expected` column on this component is still well-defined (built on existing kit tokens — Checkbox, .state-hover, .brand-primary, .menu/.mi/.mi.danger, etc.), but the *diff* against prod is not.
