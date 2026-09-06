# Insightis — UX audit

**4 September 2026**

**Prod:** https://insightis-app.devart.info · **Component kit:** https://insightis-app.devart.info/ui-kit

**Design source of truth** — approved page mockups (open in a browser):

| Page | Mockup |
|---|---|
| Files | https://katerynakl404.github.io/Insightis_app/pages/approved/data-sources_files-landing.html |
| Connections | https://katerynakl404.github.io/Insightis_app/pages/approved/data-sources_connections-landing.html |
| Chat | https://katerynakl404.github.io/Insightis_app/pages/approved/chat_page-landing.html |
| Metrics | https://katerynakl404.github.io/Insightis_app/pages/approved/metrics-landing.html |

**Kit stylesheet (all classes referenced below):** https://github.com/katerynakl404/Insightis_app/blob/main/pages/kit-theme.css
**Per-page specs:** https://github.com/katerynakl404/Insightis_app/blob/main/page-changes/INDEX.md

---

## How to read this

**42 items in four parts.** Numbering runs straight through — #1 to #42 — so an item can be cited by
number alone.

| Part | What | Items | Found by |
|---|---|---|---|
| **1 · Screens — behaviour** | what a user hits on prod | #1–#20 | using the product |
| **2 · Design system** | rules the system has and the code bypasses | #21–#27 | walking all 20 routes |
| **3 · Screens — detail** | per-screen findings | #28–#33 | measuring the rendered pages |
| **4 · Component kit** | the kit as built | #34–#42 | reading the kit source |

Severity within each part: 🟠 **Important** (behaviour, states, accessibility) ·
🟡 **Minor** (visual consistency).

**Parts 2 and 4 are where the leverage is.** Several Part 1 items are symptoms of a shared
cause in the components, so fixing one component fixes every copy of it. Measured across the app:
what looks like hundreds of sites is **~60 patterns**, and only **24 of them have to change**.

Each item is written as **Problem → Expected → Fix**. Where a fix names a class, that class already
exists in the kit stylesheet linked above.

---

# Part 1 · Screens — behaviour
## 🟠 Important

### #1 · Files, Chats · "Select all" shows when there is nothing to bulk-select
- **Problem:** the bulk affordance renders where it has no work to do — "0 files **Select all**" when a filter matches nothing (Files), and "1 conversation **Select all**" with a single item (Chats Library).
- **Expected** (spec rules 4 / 27):
  - **0 files total (first run):** hide the whole library block (count, filter chips, list). Keep the drop zone + "No files yet" empty state.
  - **0 from a filter:** keep the filter chips, **hide the count/Select all row**, show a "No matches found" empty state with a hint to switch back to All.
- **Fix:** don't render the meta row when the visible set is empty; distinguish the two empty states; and show "Select all" only from **two** items upward.

### #2 · Files · "Download" in the truncated-preview banner is not a link
- **Problem:** the banner reads "Preview truncated. Download to see the full file." — "Download" is plain text. A direct call to action that does nothing.
- **Expected:** the design already specifies this banner — kit `.cp-fp-banner` (warning tokens, full-bleed strip flush under the panel header), with **"Download" as a kit `.link`** inside the sentence. Live in the chat file-preview panel.
- **Fix:** wrap the word in `.link` with the same handler as the panel header's Download button.

### #3 · All pages · Menu items have no icons
- **Problem:** every action menu is text only. Slower to scan, actions aren't distinguishable at a glance, and the destructive item doesn't read as destructive until it's read.
- **Expected:** a 16 × 16 leading icon on every action-menu item. The kit already supports it — the menu item has an 8px gap and an icon class inherits `currentColor`, so the icon in a destructive item turns red automatically. **All of this already ships in the design mockups**, so each menu below can be copied rather than re-derived.

**Every drop menu in the product — the full list.**

Action menus (icons required):

| # | Surface | Trigger | Items, in order |
|---|---|---|---|
| 1 | **Sidebar — chat row** (Pinned + Recent sections) | `···` on row hover | Pin / Unpin · Rename · Delete |
| 2 | **Chats Library — list row** | `···` on row hover | Pin / Unpin · Select / Deselect · Rename · Delete |
| 3 | **Files — table row** | `···` on row hover | Add to Chat · Rename · Download · Delete |
| 4 | **Chat page — conversation title** | `···` beside the title | Pin · Rename · Delete |
| 5 | **Metrics — table row** | `···` on row hover | Edit · Duplicate · Delete |
| 6 | **Data Sources → Connections — row** | `···` on row hover | Edit · Test Connection · Disconnect |

Row 1 is one component rendered on **every page that has the sidebar** — Chat, Chat page, Chats Library, Files, Connections, Metrics. Fix it once and six pages are covered.

**Icon map (Lucide):**

| Action | Icon |
|---|---|
| Add to Chat | `message-square-plus` |
| Rename | `pencil` |
| Edit | `square-pen` |
| Duplicate | `copy` |
| Download | `download` |
| Pin / Unpin | `pin` / `pin-off` |
| Select / Deselect | `list-checks` / `list-x` |
| Test Connection | `plug-zap` |
| Delete | `trash-2` |
| Disconnect | `unplug` |

- **Fix:** add the leading icon to the six action menus above. Since the same actions repeat across surfaces, define the icon set once and reference it — don't paste SVG paths per menu.

### #4 · Connections · "New connection" wizard — two problems in one state
The wizard is a **host dialog of ours wrapping an integrated third-party connection surface**. That boundary decides how each of these is fixable, so it is called out per item. Please confirm the boundary is where this assumes it is.

**We own:** the outer dialog — width, height, header, progress line, footer, the Save button and its pending state, and the page scrim.
**The embed owns:** the connection form itself and, most likely, the error dialog with its own backdrop and buttons. Anything painted inside it cannot be repositioned or restyled from our side — so for those parts the fix is either configuration, a vendor request, or lifting the interaction up into our host.

**a) The error dialog is not centred.** It sits low and right — its right edge lines up with the wizard's — and covers the very fields the user is asked to correct.
- If it is painted **inside the embed**, we cannot centre it from outside: `position: fixed` inside an embedded document anchors to that document's own box, not to our page. Two real options:
  1. **Preferred** — the embed reports the failed test to the host; we suppress its dialog and render our own kit dialog, centred in the viewport (`position: fixed; inset: 0` + flex centring, the recipe the wizard's own overlay already uses). This also puts the error into our design system for free.
  2. If the embed exposes configuration for its modals, set it there.
- If it turns out to be **ours**, then it is simply option 1 already: centre it on the viewport, never relative to the parent dialog.

**b) Two backdrops are stacked.** The page is dimmed by our scrim; the wizard's body is then dimmed a second time, so the form reads as disabled and the stack looks broken.
- The inner dim belongs to the embed. The fix is to not add a second one over the same area: when the embed opens a modal, the host must not dim its own body as well. One scrim for the whole stack.

- **Note:** the embed's own visual style differing from our design system is expected and out of scope. Positioning and the backdrop stack are not.

### #5 · Files · Upload tray — only the chevron expands it
- **The component:** the plate that rises during and after an upload — *"5 uploads complete"* with a chevron and a ✕, and the file list underneath. In the design it is the **Upload tray** (`.upl-tray`): a floating card, `max-width: 26rem`, with a header row (`.upl-bar`) and a scrolling list (`.upl-list`, `max-height: 14rem`). The bar is its collapsed state, not the whole thing.
- **Problem:** only the small chevron expands it. Clicking the header does nothing, so the list looks unavailable.
- **Expected:** the header is one target. In the design that is already how it is built — **`.upl-head` is a `<button>` at `flex:1`**, so it fills the row beside the ✕ and the whole strip is clickable. It carries `cursor:pointer`, a hover state, keyboard focus and `aria-expanded`; the chevron is a state indicator that rotates, not the target.
- **✕ stays its own button** (`.upl-x`, 32px) outside the header, so closing is never read as expanding.
- **Fix:** make the header the button rather than moving a handler onto a `div` — a real `<button>` brings focus, Enter/Space and the accessible name with it.
### #6 · Chats, Files · Some icon-only buttons are missing their tooltip
- **Problem:** tooltips exist on most icon-only buttons, but a few are missing theirs, so those controls have to be guessed. Confirmed:

  | Control | Missing tooltip |
  |---|---|
  | Pin icon on a chat row | **Unpin** (pinned) / **Pin** (not pinned) — on hover nothing appears, so the user can't tell the icon will unpin |
  | Upload bar chevron | **Expand** / **Collapse** |
  | ✕ on the upload bar | **Dismiss** |

- **Expected:** every icon-only button carries a tooltip plus a matching `aria-label` with the same text. The labels above follow the naming already used elsewhere in the product (e.g. the ✕ in the selection row is **Exit selection**).
- **Fix:** add the three missing tooltips through the same engine the existing ones use — **~300ms hover delay, no warm-up** (it must not appear instantly even right after a neighbouring tooltip; locked rule: Files spec rule 23), hidden on `mousedown` so it doesn't linger after a click (rule 18).

### #7 · Connections · A tooltip fires the moment a dialog opens, untouched
- **Problem:** opening "New connection" shows the **Close** tooltip immediately. The pointer never went near the button. The tooltip lands over the progress line, and the dialog reads as already interacted with.
- **Two ways this happens, and both need closing:**
  1. **Focus.** When the dialog opens, focus moves to its first focusable element — and `.dlg-hdr` starts with Close. If the tooltip opens on focus, it appears with no pointer involved at all.
  2. **Mount under the pointer.** If the dialog happens to paint under the cursor, the browser fires `mouseover` on the new button without the user moving.
- **A hover delay fixes neither.** A delay measures intent over time; in both cases the trigger genuinely is focused or hovered. Waiting 300ms only postpones the same wrong tooltip.
- **Expected:** a tooltip opens from **deliberate** attention — pointer *movement* over the trigger, or **keyboard** focus (`:focus-visible`). Never from programmatic focus, never from a `mouseover` that arrives with no preceding `mousemove` on that element.
- **Fix:** arm the timer on `mousemove` rather than `mouseover`, and gate the focus path on `:focus-visible` so a focus the user did not ask for shows nothing. The rest of the contract stays — 300ms delay, no warm-up, hide on `mousedown`.
- **Same class of bug elsewhere:** every surface that takes focus or appears under the cursor — menus, popovers, the upload tray. Fixing the engine covers all of them.

### #8 · Files · Selection row uses bespoke controls instead of design-system ones
- **Problem:** the row above the list is hand-built, so it carries two type scales inside one control group — count and Select/Deselect all at 14px, Download and Delete at 12px.
- **Expected — swap the custom markup for design-system components:**

  | Control | Use |
  |---|---|
  | `Select all` / `Deselect all` | DS **link** |
  | `Download` | DS **tertiary button** |
  | `Delete` | DS **tertiary button**, destructive |
  | `✕` | DS **icon button** |
  | `N files` / `N selected` | 14px, weight 400, secondary text colour |

- Size: **`.btn-sm`** — the smallest step that carries 14px type. 32px tall, 12px side padding, 8px icon gap, type style **Label 14**. The whole row then sits on one scale.
- **Fix:** rebuild the row from these components rather than resizing the current markup.

### #9 · Metrics · Duplicate name/alias error points at no field
- **Problem:** saving "Create metric" with a name or alias that already exists prints one red sentence — "A metric with this name or alias already exists" — pinned under the **last** field in the form. Three things are wrong at once:
  1. It sits directly beneath the **Data source** select, which has nothing to do with the collision, so it reads as that field's error.
  2. It never says **which** of the two collided. "name **or** alias" leaves the user to change one, press Save, and find out by trial.
  3. Neither Name nor Alias is marked, so nothing on screen connects the message to a control. On a scrolled form the message can be off-screen entirely.
- **Expected — split the message from the target:**

  | Half | Where it goes |
  |---|---|
  | The **message** | An **error toast**, top-right (DS Toast, `error` variant). Title `Metric not saved`; description names the value that collided — "The alias **@mrr_growth** already belongs to another metric — change the highlighted field". When both collide, one toast names both. |
  | The **target** | The offending control itself: DS input error state (red border) + `aria-invalid="true"`, and **focus moves into it** with its text selected. Both fields are marked when both collide. |

- Backend must therefore report **which** field collided, not a single combined flag — the current combined message cannot be split by the client. If the API returns one boolean today, that is the change to make first.
- **Rules:** the check runs against the user's own metrics, case- and whitespace-insensitive, `@` ignored on the alias; in edit mode the row being edited is skipped so re-saving it unchanged is not a collision with itself. The field mark clears on that field's next keystroke; the toast is dismissed with the dialog.
- **The toast stack must sit above the dialog layer** — an error raised by a form inside a modal has to be visible over it.
- **Reference:** the same dialog in the design — [Metrics mockup](https://katerynakl404.github.io/Insightis_app/pages/approved/metrics-landing.html) → **Create Metric** → enter an existing name or alias → Save. Spec: [metrics-landing.md](https://github.com/katerynakl404/Insightis_app/blob/main/page-changes/metrics-landing.md) → "Create Metric popup"; toast host contract: [Toast.md](https://github.com/katerynakl404/Insightis_app/blob/main/changes/Toast.md) → "Toaster host".
- **Fix:** delete the bottom-of-form sentence; raise the DS error toast on a failed save and mark + focus the field the server names.

---

## 🟡 Minor

### #10 · Chat · Attached-file chip and its icon are oversized
- **Problem:** the file chip above the composer ("image (3).png · 130.8 KB") is noticeably bigger than the design — oversized box, oversized document icon, and the two text lines are a step too large. It competes with the composer instead of sitting under it as a quiet attachment.
- **Expected** (kit `.cl-file-chip`):

  | Part | Type style / value | Tailwind |
  |---|---|---|
  | Box | `padding: 8px`, `gap: 8px`, 1px border, inner radius | `p-2 gap-2 border rounded` |
  | Box width | `min-width: 10rem`, `max-width: 13rem` | `min-w-40 max-w-52` |
  | Document icon | 20 × 20, brand colour | `size-5 text-brand-primary` |
  | Filename | **Label 12** — 12 / 500 / 16 | `text-xs font-medium leading-4` |
  | Size line | **Label 10** — 10 / 500 / 16, `--ink-secondary` | `text-xxs font-medium leading-4 text-ink-secondary` |
  | ✕ button | 24 × 24 box, 16 × 16 glyph | `size-6` with `size-4` |

- **Fix:** bring the chip to these values. Both text rows are named styles — do not re-derive a line-height from a ratio; `1.3` on 12px lands on 15.6px, which is on no grid.

### #11 · All pages · Row kebab icon is oversized
- **Problem:** the `···` glyph in list/table rows is larger than the design, so the kebab reads as a primary control rather than a quiet per-row affordance.
- **Expected** (kit `.chat-row-more`): **24 × 24** button with a **14 × 14** glyph, `--ink-secondary` at rest.
- **Fix:** set the glyph to 14 × 14 inside a 24 × 24 button. Note 14px is a deliberate value on our icon scale — do not round it to 12 or 16.

### #12 · All dialogs · One width for every dialog — sizes need to be split
- **Problem:** dialogs are not sized by what they hold. A one-line confirmation gets the same width as a full form, so "Delete chat?" reads as a major modal.
- **Expected — three steps, and every dialog maps to one:**

  | Step | Class | Max width | Holds |
  |---|---|---|---|
  | **S** | `.dlg.is-sm` | 360px (`22.5rem`) | a confirm the user only reads and answers — one sentence, two buttons |
  | **M** | `.dlg.is-md` | 480px (`30rem`) | **the default** — anything the user fills in |
  | **L** | `.dlg.is-lg` | 576px (`36rem`) | the multi-step wizard |

- **Every dialog, by step:**

  | Step | Dialogs |
  |---|---|
  | **S** | Delete chat (5 pages) · Delete file · Delete N files · Disconnect connection |
  | **M** | Rename chat (5 pages) · Rename file · Edit connection · Create metric |
  | **L** | New connection wizard — both instances, Connections and Metrics |

- **Rename is M, not S** — the user types into it, so it is a form, not a confirmation. Only Delete and Disconnect are S.
- **Footer buttons — `.btn-sm`**, right-aligned: `Cancel` secondary, then the confirming action (`Delete` destructive / `Save` primary).
- **Fix:** map each dialog to its step above. Start with the S group — it is the largest and the most visibly wrong.
- **Reference:** the same dialogs in the design — [Files mockup](https://katerynakl404.github.io/Insightis_app/pages/approved/data-sources_files-landing.html) → row `···` → Rename / Delete.

### #13 · Account menu · Item labels are too heavy
- **Problem:** the items in the account popover (My account, Manage plan, Balance, Leave feedback, Resources) render at weight 500. Every row reads as emphasised, so nothing stands out and the menu looks heavier than the rest of the sidebar.
- **Expected** (kit `.sbx-pop-item`): **14px / weight 400**, `line-height: 1.25`, `--ink-body`; leading icon 16 × 16 in `--ink-secondary`; the external-link glyph 14 × 14, right-aligned. Section headings above the groups ("Account", "Support") stay the small uppercase eyebrow style.
- **Fix:** set the item label weight to 400 — the design specifies no weight override, so it inherits the 400 body weight.

### #14 · All dialogs · Cancel is not the design system's secondary button
- **Problem:** across dialogs the Cancel button is drawn as an outlined button rather than the DS secondary variant. Confirmed in two places:
  - **"Resolve file conflicts"** (Files) — Cancel carries a brand-coloured border **and** a brand-coloured label beside the solid brand Upload, so two brand-coloured buttons compete in one footer.
  - **"Duplicate metric"** (Metrics) — Cancel is an outlined button beside the solid brand Save.
- **Expected:** every dialog footer is **secondary + primary**, in that order, right-aligned:
  - `Cancel` → DS **secondary** — neutral border, neutral surface, neutral label. No brand colour.
  - The confirming action (`Save` / `Upload` / `Delete`) → DS **primary**, or **destructive** where the action is irreversible. Unchanged.
- **Fix:** swap Cancel to the secondary variant in every dialog, not just these two — the pattern repeats wherever a footer pair appears.
- **Note:** a coloured border is never paired with a coloured label in our system — outlined variants always use a neutral label. The brand-coloured Cancel label in the conflicts dialog is off-system in any variant.

### #15 · All pages · Side padding is inconsistent across controls
- **Problem:** side padding differs between control types and does not scale with size, so text does not start on the same vertical line down a form, and a large control is as tight as a small one. Measured on prod ("Create metric"): single-line inputs, the textarea, the alias input group and the select trigger each use a different value; buttons use one value — `px-2.5` — on all five sizes.
- **Expected — one ladder, climbing the 4px step with height. Buttons and text controls take the identical ladder, so a button and a field of the same size share one edge:**

  | Size | Height | Side padding | Tailwind | Icon gap |
  |---|---|---|---|---|
  | xs | 28px | **8px** | `px-2` | `gap-1` (4px) |
  | sm | 32px | **12px** | `px-3` | `gap-2` (8px) |
  | md | 36px | **12px** | `px-3` | `gap-2` (8px) |
  | lg | 40px | **16px** | `px-4` | `gap-2` (8px) |
  | xl | 44px | **20px** | `px-5` | `gap-2` (8px) |

- **12px repeats at `sm` and `md` on purpose** — those are the two sizes the product actually uses (157 and 80 instances against 3 and 1 for `lg`/`xl`). The sizes people see stay on one rail; only the rare large ones open up.
- **Applies to:** button · single-line input · textarea (horizontal only — vertical padding still scales with height) · input group — the rail lands on the prefix, and the prefix sits **4px** from the text, not 22px · select / dropdown trigger.
- **Icon size follows the label, not the box** — the text steps once, at `xs`, so the icon does too: 16 × 16, and 14 × 14 at `xs`. Set it in the component, never per instance.
- **Fix:** one pass across the shared control CSS, not per form. Afterwards check every screen with a form — Metrics, the connection wizard, rename dialogs, Files filters.
### #16 · All pages · Dropdown trigger icons are oversized
- **Problem:** the icons inside a dropdown trigger — the clear ✕ and the chevron — are drawn larger than the design. In a 36px-tall control they crowd the right edge and pull attention away from the selected value, which is the only thing that should read strongly in that row.
- **Expected:** both icons **16 × 16**, `--ink-secondary`, `flex: none`. The chevron rotates 180° when the menu is open. Value text stays 14px and keeps the remaining width (ellipsis on overflow).
- **Fix:** set both glyphs to 16 × 16. The chevron in the design is already 16 — match the clear ✕ to it so the pair is even.

### #17 · Metrics · Character counter includes the word "chars"
- **Problem:** the counter under the Definition field reads `0 / 1500 chars`. The unit word is redundant — the `N / N` form already reads as a count — and it makes the annotation longer than the value it annotates.
- **Expected:** `0 / 1500`, nothing else. Right-aligned under the field, small inactive text, `aria-live="polite"` so the count change is announced.
- **Fix:** drop `chars` from the counter string. Same treatment on every text field that carries a counter.

### #18 · Chat · Composer menus have a gap between rows
- **Problem:** rows in the composer menus sit apart from each other. Most visible in the model picker (Insightis Light / Medium / Pro), where the list reads as three separate cards rather than one menu.
- **Expected:** in **all three composer menus** — attach, connections, and model — the **gap between rows is 0**. Rows sit flush against each other; the only vertical rhythm comes from each row's own padding, and the only inset is the menu's own 4px padding. A row's hover surface must therefore touch its neighbours' with no dead strip between them.
- **Fix:** remove the gap / row margin in all three menus. Adjust each row's own padding if a row needs more height — never a gap between rows.

### #19 · All dialogs · Right inset collapses to 8px while the left stays 20px
- **Problem:** the content column sits off-centre in every popup — noticeably closer to the right edge than to the left.
- **Cause (measured on prod, "Create metric"):** the dialog container itself is symmetric — `padding: 14px 20px`. The asymmetry is created by the scrollable body inside it, which carries **`margin-right: -20px`** together with **`padding-right: 8px`** (and `padding-left: 0`). The negative margin cancels the container's entire right padding, and only 8px is added back:

  | Side | Result |
  |---|---|
  | Left | 20px (container padding, untouched) |
  | Right | 20 − 20 + 8 = **8px** |

  This is a scrollbar-gutter workaround — pulling the scroll area to the container edge so the scrollbar sits in the padding, with a small gap between content and scrollbar. It costs 12px of right inset permanently, whether the content scrolls or not.
- **Expected:** equal left and right inset on the content, and it must not change depending on whether the body scrolls.
- **Fix:** drop the negative margin / padding pair and let the container's own 20px hold both sides. If the scrollbar must sit at the container edge, apply the same negative-margin-plus-padding trick **symmetrically** (both sides), or reserve the scrollbar gutter instead — but the content's left and right must end up equal either way.

### #20 · 404 · Button order is reversed, and Go back is the wrong variant
- **Problem:** the recovery buttons read **`Go to New Chat` (primary) · `Go back` (secondary)** left to right — the primary sits first. Everywhere else in the product a button pair is ordered secondary, then primary, with the primary last.
- **Expected:** swap them — **`Go back` (secondary) · `Go to New Chat` (primary)**. Same order as every dialog footer (see #13), so the primary action is always the rightmost thing in a pair.
- **Also the wrong variant, and it does not even read as one.** Measured: `Go back` is **outline** — transparent fill, brand-green border. But the border is **0.8px**, so on an ordinary display it barely draws and the button reads as plain inline text. It should be **secondary** — card-tone fill, neutral border, a full 1px. Outline is a brand-weighted variant; a step-back action does not carry brand weight.
- **Fix:** reverse the two buttons and make `Go back` secondary. That swaps the 0.8px brand border for the neutral 1px the secondary variant carries — no sub-pixel border survives. Labels stay as they are.

---

# Part 2 · Design system

Found by walking all 20 routes of the app. These are not screen bugs — each one is a rule the system
already has and the code does not reach for.

## 🟠 Important
### #21 · All pages · Accessible names are missing, borrowed, or recite the whole row
- **Problem:** icon-only controls ship without a name, so a screen reader announces "button". Others borrow the row's entire text, so the name is a paragraph.
- **Fix:** every icon-only control gets an `aria-label` naming its action, not its context. Where a row is clickable, the name is the row's title alone.
- **Where:** every `···` row menu trigger, the composer toolbar, dialog close buttons, and the sidebar collapse toggle.

### #22 · All pages · Heading level is chosen to get a font size
- **Problem:** `h1`–`h6` are picked for how big they render, so document structure follows visual weight rather than meaning. Screen-reader outlines and in-page navigation break.
- **Fix:** the level comes from the content hierarchy; the size comes from a named type style (**#24**). One page, one `h1`.

### #23 · All pages · Arbitrary-value classes are the only thing breaking the 4px scale
- **Problem:** spacing sits on the 4px step everywhere except where someone wrote a value in square brackets — `p-[0.92rem]`, `text-[13px]` and siblings. The scale is not missing; it is bypassed.
- **Fix:** find them with `grep -rnE "[a-z-]+-[[^]]+]" src/`, then round each to the nearest 4px step — `p-[0.92rem]` (14.7px) → `p-4`, `text-[13px]` → the named type style (**#24**). Where a value genuinely fits no step, that is an argument for a new token, never for keeping the literal.

### #24 · All pages · Type is chosen by size, so every use re-decides weight and leading
- **Problem:** the unit of choice is a **size**, so each site picks weight and line-height again. Measured: **14 / 500 renders with three different leadings; 14 / 400 with three more.** Nobody decided that.
- **Fix:** the unit of choice becomes a **named style** carrying size + weight + line-height. The agreed set is 19 styles — full list, the weight × size grid and the migration order are in [the type-scale companion](2026-09-04-insightis-type-scale.md).
- **Scale:** ~1430 text elements from ~60 patterns. Counting only what changes: **24 places in the code, 247 elements.** Component work, not 247 edits.

## 🟡 Minor

### #25 · All pages · Transition durations — 14 values onto three tokens
- **Problem:** `--motion-fast/base/slow` exist and the code types numbers. 21 declarations, **one** uses a token.
- **Fix:** map each raw value to its nearest token — `duration-100` and `duration-150` → `--motion-fast`, `duration-200` → `--motion-base`, `duration-300` → `--motion-slow`. **The two `duration-500` sites — the Sheet and Sidebar panel slides — are out of scope and stay as they are.**

### #26 · All pages · Shadows — four raw values that are really two roles
- **Problem:** four hand-written shadows duplicate what the tokenised elevations already express.
- **Fix:** two roles, two tokens. A shadow that marks a surface **at rest** → `--shadow-rest`; one that marks a surface **lifted under the pointer** → `--shadow-card-hover`. Every one of the four is one or the other; none needs a third value.

### #27 · All pages · Letter-spacing — a scale exists, four values escape it
- **Problem:** prod has a tracking scale; four sites write a value instead. Two of them are **exactly** an existing token re-derived by hand: `.tracking-[0.08em]` = `--tracking-caps`, `.tracking-[-0.01em]` = `--tracking-tight`.
- **Located:** `0.08em` is the uppercase sidebar section labels; `−0.045em` is the 404 numerals.
- **Naming trap:** Tailwind's `.tracking-tight` is −0.025em, ours is −0.01em. Same name, different value.

---

# Part 3 · Screens — detail

## 🟠 Important

### #28 · Chat · The empty state is hidden with `opacity: 0` and stays focusable
- **Problem:** in a conversation that already has messages, the empty state is still in the accessibility tree and still reachable by keyboard. It is invisible, not absent.
- **Fix:** remove it from the DOM, or `display: none` it. Opacity alone hides it from sighted users only.

### #29 · Chat · The connections toggle never states its scope
- **Problem:** turning a source off looks global. It is not — it affects this chat only.
- **Fix:** tooltip on the toggle: **"Only affects this chat"** (no full stop, per the descriptive-text rule).
- **Reference:** the toggle with its tooltip in the design — [Chat mockup](https://katerynakl404.github.io/Insightis_app/pages/approved/chat_page-landing.html) → composer → connections row.

### #30 · Files · The drop zone's accessible name lists formats its visible text never mentions
- **Problem:** the `aria-label` enumerates accepted formats; the visible text does not — the two audiences are told different things.
- **Fix:** the `aria-label` repeats the visible text verbatim and nothing more. The accepted formats move into visible helper text under the drop zone, where both audiences read the same thing.

## 🟡 Minor

### #31 · Metrics · Two badges in one panel, two different sizes
- **Problem:** in the metric detail panel the **ALIAS** chip and the **TYPE** badge sit one above the other at different sizes.
- **Fix:** both are badges — same size. The design system has it: `.badge.badge-sm` — height 20px, padding 0 / 6px, type style **Label 12**, radius 4px.
- **Reference:** the [Metrics mockup](https://katerynakl404.github.io/Insightis_app/pages/approved/metrics-landing.html) uses `.badge.badge-sm` in 14 places, and every badge on the screen is the same size.

### #32 · All dialogs · Destructive confirms never name what is being deleted
- **Problem:** "Are you sure?" without the object. The user confirms from memory.
- **Fix:** the name goes in the description, not a tooltip — *"Delete **Q1 revenue commentary**? This cannot be undone."*

---
### #33 · Account · The delete-account description renders at 12 instead of 14
- **Problem:** under **Delete my account**, the line *"The datasets and chat sessions will also be permanently cleared"* renders at **12px**. It should be 14. It is the sentence that tells the user the deletion also takes their data — the one line in the modal that must be read.
- **Expected:** **Body 14** — 14 / 400 / 20, `--ink-secondary`. That is what the design specifies (`.acct-danger-warn`) and what every other description in the product uses.
- **Fix:** 12 → **Body 14**, `text-sm font-normal leading-5`. Check the other descriptions in the account modal in the same pass — a size that drifted here is unlikely to be the only one.


# Part 4 · Component kit

Read from the kit source — 42 components, 204 files, Tailwind + Radix.

Colours, shadows, motion, max-widths and opacity already flow through CSS variables, with both themes
complete. **So none of the items below asks for a new token — each one asks for an existing token to
be used where a literal is written instead.**

## 🟠 Important

### #34 · Kit · Banner never becomes responsive — its rules are not in the build
- **Problem:** the banner should stack on narrow screens. It never does. At a **423px viewport** it stays a row with a 60px icon and the text crushed into a 224px column three lines deep.
- **Cause:** the nine `max-[880px]:*` / `max-[600px]:*` classes produce **no CSS**. There is no `(max-width: 880px)` rule anywhere in the shipped stylesheet. Arbitrary *values* from the same file compile fine; named `max-md` / `max-lg` compile too. Only the **arbitrary max-width variant** emits nothing.
- **Fix:** replace the two breakpoints with named ones — **`max-md`** (768) for the stack, **`max-sm`** (640) for the padding drop. Both are already in the build.
- Measured at nine widths: the row overflows at none of them down to 640px, so the earlier stack point costs only a two-line description in a narrow band.

### #35 · Kit · Seven interactive components have no focus indicator
- **Measured** across every `.tsx`, not just `index`: **Accordion · Popover · Sheet · Tooltip · ToggleGroup · Stepper · Input** have no `focus-visible` rule and no `Button` underneath. Six others looked the same but are covered because they render `Button` internally.
- **No global fallback:** `globals.css` has exactly one `focus-visible` rule, scoped to a table row. Radix ships no CSS.
- **Standard:** WCAG 2.4.7 Focus Visible, level AA.
- **Fix:** the recipe already exists in Button — `focus-visible:ring-2 ring-offset-2 ring-offset-surface-card` plus a ring colour. Lift it into a shared class and apply it to the seven. One recipe, not seven.

### #36 · Kit · Button padding is `px-2.5` on all five sizes
- A 44px button is as tight horizontally as a 28px one. Heights are already on the 4px grid; padding should be too.

| Size | Height | Now | Should be | Gap |
|---|---|---|---|---|
| xs | 28px | 10px | **8px** | 4px |
| sm | 32px | 10px | **12px** | 8px |
| md | 36px | 10px | **12px** | 8px |
| lg | 40px | 10px | **16px** | 8px |
| xl | 44px | 10px | **20px** | 8px |

- Input, TextArea and Selector take the identical ladder, so a button and a field of the same size share one edge. 12px repeats at `sm` and `md` deliberately — those are the two sizes the product actually uses (157 and 80 uses against 3 and 1).
- The `transparent` variant carries `!p-0` to escape this; once padding lives in one place that override goes.

### #37 · Kit · Every icon-only button with a trailing slot has a doubled gap
- **Measured:** the composer's Connections and Model triggers declare `gap: 6px`; the distance between their icons is **12px**.
- **Why:** three flex children, not two — icon 16px, **an empty `span` at 0px**, chevron 14px. Gap applies between every pair: 6 + 0 + 6.
- **Root cause:** `Button` renders `<span>{children}</span>` unconditionally, even with no label. Any icon-only button with a `rightSlot` gets the phantom child.
- **Fix:** render the wrapper only when `children` is non-empty. The icon-to-chevron pair should then sit at **4px**.

### #38 · Kit · `tertiary` and `ghost` are the same variant
- **Problem:** Button defines twelve variants; two of them are identical in every state — same border, background, text, hover, pressed, focus ring and disabled. `ghost` adds one line, `transition-colors duration-100`, which the base already covers.
- **Keep `tertiary`, remove `ghost`** — `tertiary` has a family, `destructiveTertiary` is its sibling.
- **Replace the call sites first — `ghost` is in use:**

  | File | Sites | Change |
  |---|---|---|
  | `Collapsible.stories.tsx` | 2 | `<Button variant="ghost">` → `variant="tertiary"` |
  | `Sidebar.stories.tsx` | 4 | `<SidebarTrigger variant="ghost" />` → `variant="tertiary"` |
  | `Button.stories.tsx` | 2 | the variant list and its demo |

- ⚠️ **Do not touch `ghost` in `Card`, `CardIcon` and `Toggle`.** Those are those components' own variants under the same name — unrelated to Button's, and they stay.
- **Fix:** replace the six Button call sites, then delete the `ghost` entry from the `cva` map. Alias it to `tertiary` for one release only if something outside this package consumes it.
### #39 · Kit · Two button variants lose the held-open state, only because they are destructive
- `pressed:` is **not** a rename of `:active` — it expands to `&:active`, `&[aria-expanded="true"]` and `&[aria-expanded="true"]:hover`. It means *pressed or held open*, so a button that opened a dropdown keeps its fill.
- `active:` is correct on anything that cannot be held open — InputGroup, Card, Toggle, Switch, File, Sidebar. Nine of seventeen uses are these and they are right.
- **Wrong in three places:** Button's `destructiveTertiary` and `accent`, and IconButton's destructive variant. A destructive tertiary button used as a dropdown trigger goes flat when the menu opens; a neutral one does not.

### #40 · Kit · Motion tokens are defined and used once in twenty-one times
- `duration-100` ×6 · `duration-150` ×4 · `duration-200` ×6 · `duration-300` ×2 · `duration-500` ×2 — against **one** `duration-slow`.
- **`Card` alone uses three different durations**, two of them 60ms apart, one already the token for the third.

### #41 · Kit · Tints — fourteen values, two notations, no scale
- `/[0.06]`, `/[0.08]`, `/[0.12]` alongside `/5`, `/10`, `/15`, `/30`, `/35`, `/40`, `/45`, `/50`, `/55`, `/75`, `/80`.
- `/[0.08]` and `/8` are the same value spelled two ways, so a search for one misses the other.

### #42 · Kit · One variant still disables itself with the old token names
- Everything greys with `bg-state-disabled` + `text-ink-inactive` (9 and 35 uses). `accent` alone uses `bg-chip` + `text-content-light` — three declarations on two adjacent lines, the last survivors of an earlier naming round.

