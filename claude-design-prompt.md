# Prompt for Claude (design tool) — recreate Insightis pages & components

**Attach these files with the prompt** (they are the source of truth; the prompt alone is not enough):

1. `pages/kit-theme.css` — ALL styling: primitives → semantic → component tokens, light + dark themes, every component rule.
2. `insightis-preview-kit.html` — the component storybook: every component with all states, variants, sizes.
3. Pages (approved = must build): `pages/approved/chat-landing.html`, `data-sources_connections-landing.html`, `data-sources_files-landing.html`, `metrics-landing.html`, `user_profile-modal.html`.
4. Pages (concept = optional, in-progress): `pages/concept/chats-landing.html`, `chat_page-landing.html`, `chat_page-charts-landing.html`, `balance-versions-v2-v3.html`, `coin-review.html`, `tokens-popover-review.html`.
5. `pages/assets/` — logos + coin SVGs used by pages.

---

## The prompt (copy everything below)

You are recreating the design system and screens of **Insightis** — an AI analytics product (chat with your data, metrics catalog, data-source connections). The attached files are the complete, approved design source of truth: `kit-theme.css` holds every visual value, `insightis-preview-kit.html` is the component storybook, and the `pages/*.html` files are the finished screen designs.

**Your task: faithfully reproduce this design system as editable designs here — first the component library, then the pages. This is a reproduction, NOT a redesign.** Never substitute your own taste: when the CSS specifies a value (color, radius, spacing, shadow, font size), use exactly that value. If something is ambiguous, ask instead of inventing.

### Foundations (all defined in kit-theme.css — read them from there, this is just orientation)

- **Font:** DM Sans (fallback: system-ui, sans-serif). Code: ui-monospace.
- **Type scale:** 10 / 11 / 12 / 13 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 48 px tokens (`--text-*`). Tracking scale: tight −0.01em, normal 0, label 0.05em, caps 0.08em.
- **Spacing:** 4px grid with a 2px sub-step allowed. Content widths: narrow 680px, wide 1200px.
- **Color architecture is three-layered:** Primitives (raw hex, e.g. `--brand-600:#07807E`) → Semantic (`--ink`, `--bg`, `--border`, `--state-hover`…) → Component-scoped (`--btn-primary-bg`…). Recreate this as a token/variable structure — components must reference semantic tokens, never raw hex.
- **Key semantic values (light theme):** brand primary `#07807E` (brand-600), page bg slate-50 `#F8FAFC`, card white, text ink slate-900 / body slate-700 / secondary `#5A6A80` / inactive `#7C8CA2`, border slate-200 `#E2E8F0`, destructive red-700, attention orange `#FF6900`, success green `#009966`.
- **Two themes:** light and dark. The `.dark { … }` block in the CSS remaps the semantic layer; build both modes.

### Locked visual rules (do not deviate)

- **Card/list-row hover:** background `--state-hover` + border `color-mix(brand-primary 25%, transparent)` + soft shadow. **Table row hover/selected is neutral grey in both themes — never brand-tinted.**
- **Buttons use Title Case** ("Add New"); form labels and section headings use Sentence case; dialog titles use Title Case.
- Short descriptions / empty-state helper text: no trailing period.
- Icon glyphs may sit on the 2px scale (14px is valid); prefer even font sizes.
- Pages show the **Expected (target) state only** — ignore any `.prod` / "Current" scoping you find in the storybook file; that documents the old production state for comparison.

### Component library to build (each exists in the storybook with full state coverage — replicate every state, variant and size shown there)

Accordion, AccountPopover, Autocomplete, Avatar, Badge, Banner (incl. gradient variant), Button (all variants incl. destructive/outlined/ghost), Card, ChatRow, Checkbox, Chip, CircularProgress, Collapsible, DataSourceCard, Datepicker, DropZone, Dropdown, File, IconButton, Input, InputGroup, Link, MetaRow, Modal, Overlay, Pagination, PasswordInput, Popover, ProgressBar, ProviderCard, Resizable, ScrollShadow, SegmentedControl, Selector, Separator, Sheet, Sidebar, Skeleton, Spinner, StatusView, Stepper, Switch, Table, Tabs, TextArea, Toast, Tooltip, TruncatedTitleTooltip.

Foundations pages to include as documentation frames: Color tokens, Typography scale, Radius, Tracking.

### Pages to build (in this order)

1. **Metrics landing** — metrics catalog: hero, toolbar, table (desktop) / card stack (mobile ≤767px).
2. **Data sources — Connections landing** — provider cards + connections table.
3. **Data sources — Files landing** — file list, drop zone, upload states.
4. **Chat landing** — sidebar with chat list, composer with @-mention metric picker.
5. **User profile modal.**
6. (Optional, concept) Chats library, Chat page + charts, Balance, Coin review, Tokens popover.

Each page: desktop 1440px and mobile 375px, light and dark. Reuse the library components — never draw a detached copy of a component inside a page.

### Working method

1. Start with tokens/variables (primitives + semantic, both themes).
2. Build atoms → molecules → pages, checking each against the storybook rendering.
3. When you finish a component, list any value you could not map to a token — do not silently approximate.
