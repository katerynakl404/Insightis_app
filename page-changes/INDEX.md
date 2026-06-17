# page-changes/ — page-level change notes

One file per page that has a dedicated handoff HTML in `pages/`. Each lists the components
changed on that screen and links to the relevant `changes/` files.

| Page | File | Primary components |
|---|---|---|
| Chat landing | [chat-landing.md](chat-landing.md) | Sidebar, Button (Send), Dropdown, IconButton, TextArea |
| Chats Library | [chats-landing.md](chats-landing.md) | ChatRow, MetaRow (new), Sidebar |
| Metrics + Account Modal | [metrics-landing.md](metrics-landing.md) | AccountModal (new), Sidebar, Colors (hex-only) |
| Data Sources (Connections) | [data-sources_connections-landing.md](data-sources_connections-landing.md) | Tabs, Banner |

## No floating stickers on pages

The in-page draggable "what changes in Expected" sticker has been removed from every page
mockup — handoff notes live exclusively in this folder. For any new page mockup, add a
`page-changes/<page>.md` entry above (or write a quick `## Out of scope` block for pages
that intentionally have no deltas). Do not reintroduce the `cl-sticker` markup — it was
team-only tooling and is gone for good.
