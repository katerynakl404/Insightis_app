# Insightis — QA report for development

**Prod:** https://insightis-app.devart.info

**Design source of truth** — approved page mockups (open in a browser):

| Page | Mockup |
|---|---|
| Files | https://katerynakl404.github.io/Insightis_app/pages/approved/data-sources_files-landing.html |
| Connections | https://katerynakl404.github.io/Insightis_app/pages/approved/data-sources_connections-landing.html |
| Chat | https://katerynakl404.github.io/Insightis_app/pages/approved/chat_page-landing.html |
| Metrics | https://katerynakl404.github.io/Insightis_app/pages/approved/metrics-landing.html |

**Kit stylesheet (all classes referenced below):** https://github.com/katerynakl404/Insightis_app/blob/main/pages/kit-theme.css
**Per-page specs:** https://github.com/katerynakl404/Insightis_app/blob/main/page-changes/INDEX.md

Sections are by severity; each item names its page.
🟠 Important (behaviour, states) · 🟡 Minor (visual consistency)

---

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
| Select / Deselect | `square-check` / `square` |
| Test Connection | `plug-zap` |
| Delete | `trash-2` |
| Disconnect | `unplug` |

- **Fix:** add the leading icon to the six action menus above. Since the same actions repeat across surfaces, define the icon set once and reference it — don't paste SVG paths per menu.

### #4 · Connections · "New connection" wizard — four problems in one state
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

**c) The wizard is too narrow, so content clips.** The connector name is cut mid-word ("Acuity Scheduling connec") and the two-field Token row is squeezed.
- **Fully ours, and the highest-value fix here** — the embed is being squeezed by the host dialog's width. Widen the host dialog, keep `max-width: calc(100vw - 2rem)` for small screens, and check the embed's own minimum width so it isn't horizontally scrolled inside our box. Long connector names should ellipsize, never clip mid-word.

**d) The Save button is stuck in a loading state.** Behind the error, Save still spins — the wizard claims a save is in progress while a dialog says it failed.
- **Ours.** The pending state must clear when the embed reports the failure. If the embed emits no such event, that is an integration gap worth raising with the vendor — without it the host can never know the operation ended.

- **Note:** the embed's own visual style differing from our design system is expected and out of scope. Positioning, the backdrop stack, the host width, and the stuck Save state are not.

### #5 · Files · Upload bar — only the chevron is clickable
- **Problem:** "5 uploads complete" expands only via the small chevron. Clicking the bar itself does nothing, so the file list looks unavailable.
- **Expected:** the whole bar (except ✕) is one click target for expand/collapse — `cursor:pointer`, hover state, keyboard focus, `role="button"` + `aria-expanded`. The chevron stays a state indicator, not the only target. ✕ stops propagation so closing isn't read as expanding.
- **Fix:** move the expand handler from the chevron to the bar; keep ✕ as its own button.

### #6 · Chats, Files · Some icon-only buttons are missing their tooltip
- **Problem:** tooltips exist on most icon-only buttons, but a few are missing theirs, so those controls have to be guessed. Confirmed:

  | Control | Missing tooltip |
  |---|---|
  | Pin icon on a chat row | **Unpin** (pinned) / **Pin** (not pinned) — on hover nothing appears, so the user can't tell the icon will unpin |
  | Upload bar chevron | **Expand** / **Collapse** |
  | ✕ on the upload bar | **Dismiss** |

- **Expected:** every icon-only button carries a tooltip plus a matching `aria-label` with the same text. The labels above follow the naming already used elsewhere in the product (e.g. the ✕ in the selection row is **Exit selection**).
- **Fix:** add the three missing tooltips through the same engine the existing ones use — **~300ms hover delay, no warm-up** (it must not appear instantly even right after a neighbouring tooltip; locked rule: Files spec rule 23), hidden on `mousedown` so it doesn't linger after a click (rule 18).

### #7 · Files · Selection row uses bespoke controls instead of design-system ones
- **Problem:** the row above the list is hand-built. Two consequences:
  1. Two type scales inside one control group — count and Select/Deselect all at 14px, Download and Delete at 12px.
  2. Download and Delete behave as bare text, not buttons — no hit area, no hover / pressed / focus state, no disabled state when nothing is selected.
- **Expected — swap the custom markup for design-system components:**

  | Control | Use |
  |---|---|
  | `Select all` / `Deselect all` | DS **link** |
  | `Download` | DS **tertiary button** |
  | `Delete` | DS **tertiary button**, destructive |
  | `✕` | DS **icon button** |
  | `N files` / `N selected` | 14px, weight 400, secondary text colour |

- Pick the button size that carries **14px** type, so the whole row sits on one scale.
- **Fix:** rebuild the row from these components rather than adjusting sizes on the current markup — the states and hit areas then come with them.

---

## 🟡 Minor

### #8 · Chat · Attached-file chip and its icon are oversized
- **Problem:** the file chip above the composer ("image (3).png · 130.8 KB") is noticeably bigger than the design — oversized box, oversized document icon, and the two text lines are a step too large. It competes with the composer instead of sitting under it as a quiet attachment.
- **Expected** (kit `.cl-file-chip`):

  | Part | Value |
  |---|---|
  | Box | `padding: 8px`, `gap: 8px`, 1px border, inner radius, `min-width: 10rem`, `max-width: 13rem` |
  | Document icon | **20 × 20**, brand colour |
  | Filename | **12px**, weight 500, `line-height: 1.3` |
  | Size line | **10px**, weight 500, `--ink-secondary` |
  | ✕ button | 24 × 24 box with a **16 × 16** glyph |

- **Fix:** bring the chip to these values — the box shrinks mostly by itself once the icon and the two text sizes are corrected.

### #9 · All pages · Row kebab icon is oversized
- **Problem:** the `···` glyph in list/table rows is larger than the design, so the kebab reads as a primary control rather than a quiet per-row affordance.
- **Expected** (kit `.chat-row-more`): **24 × 24** button with a **14 × 14** glyph, `--ink-secondary` at rest.
- **Fix:** set the glyph to 14 × 14 inside a 24 × 24 button. Note 14px is a deliberate value on our icon scale — do not round it to 12 or 16.

### #10 · All dialogs · One width for every dialog — sizes need to be split
- **Problem:** dialogs are not sized by what they hold. A one-line confirmation gets the same width as a full form, so "Delete chat?" reads as a major modal and its destructive button dominates the screen. The footer buttons are oversized on top of that.
- **Expected:**
  - **Dialog width comes from the design system's size scale, not a value chosen per dialog.** Each dialog picks a step; the step defines its max width.
  - **Rename and Delete use size S** — they hold one line of text and two buttons, nothing more.
  - Larger surfaces step up: a form dialog takes the next size, the connection wizard larger still (see #4c).
  - **Footer buttons — the DS small size**, right-aligned: `Cancel` secondary, then the confirming action (`Delete` destructive / `Save` primary).
- **Fix:** split the widths into the DS size steps and map every dialog to one, instead of a single shared width. Start with the short ones — delete chat, delete file, rename chat, rename file — all at S.
- **Reference:** the same dialogs in the design — [Files mockup](https://katerynakl404.github.io/Insightis_app/pages/approved/data-sources_files-landing.html) → row `···` → Rename / Delete.

### #11 · Account menu · Item labels are too heavy
- **Problem:** the items in the account popover (My account, Manage plan, Balance, Leave feedback, Resources) render at weight 500. Every row reads as emphasised, so nothing stands out and the menu looks heavier than the rest of the sidebar.
- **Expected** (kit `.sbx-pop-item`): **14px / weight 400**, `line-height: 1.25`, `--ink-body`; leading icon 16 × 16 in `--ink-secondary`; the external-link glyph 14 × 14, right-aligned. Section headings above the groups ("Account", "Support") stay the small uppercase eyebrow style.
- **Fix:** set the item label weight to 400 — the design specifies no weight override, so it inherits the 400 body weight.

### #12 · All dialogs · Cancel is not the design system's secondary button
- **Problem:** across dialogs the Cancel button is drawn as an outlined button rather than the DS secondary variant. Confirmed in two places:
  - **"Resolve file conflicts"** (Files) — Cancel carries a brand-coloured border **and** a brand-coloured label beside the solid brand Upload, so two brand-coloured buttons compete in one footer.
  - **"Duplicate metric"** (Metrics) — Cancel is an outlined button beside the solid brand Save.
- **Expected:** every dialog footer is **secondary + primary**, in that order, right-aligned:
  - `Cancel` → DS **secondary** — neutral border, neutral surface, neutral label. No brand colour.
  - The confirming action (`Save` / `Upload` / `Delete`) → DS **primary**, or **destructive** where the action is irreversible. Unchanged.
- **Fix:** swap Cancel to the secondary variant in every dialog, not just these two — the pattern repeats wherever a footer pair appears.
- **Note:** a coloured border is never paired with a coloured label in our system — outlined variants always use a neutral label. The brand-coloured Cancel label in the conflicts dialog is off-system in any variant.

### #13 · All pages · Text controls use inconsistent side padding
- **Problem:** side padding differs between control types, so text does not start on the same vertical line down a form. Measured on prod ("Create metric"): the single-line inputs — Name, Alias, Data source — use **6px**, while the Definition textarea uses **8px**. It is a general problem across **inputs, selects and textareas**, not a Metrics-only one.
- **Expected:** **12px side padding on every text control**, so all field text — typed values, placeholders and selected values alike — sits on one line:

  | Control | Where |
  |---|---|
  | Single-line input | every form |
  | Textarea | Definition, and any other multi-line field |
  | Input group (prefixed field, e.g. Alias `@`) | the text part; the prefix is its own slot before it |
  | Select / dropdown trigger | the selected value and the placeholder |

- **Fix:** set side padding to 12px across all of them in one pass, not per form. Worth checking every screen with a form afterwards — Metrics, the connection wizard, rename dialogs, search fields.
### #14 · All pages · Dropdown trigger icons are oversized
- **Problem:** the icons inside a dropdown trigger — the clear ✕ and the chevron — are drawn larger than the design. In a 36px-tall control they crowd the right edge and pull attention away from the selected value, which is the only thing that should read strongly in that row.
- **Expected:** both icons **16 × 16**, `--ink-secondary`, `flex: none`. The chevron rotates 180° when the menu is open. Value text stays 14px and keeps the remaining width (ellipsis on overflow).
- **Fix:** set both glyphs to 16 × 16. The chevron in the design is already 16 — match the clear ✕ to it so the pair is even.

### #15 · Metrics · Character counter includes the word "chars"
- **Problem:** the counter under the Definition field reads `0 / 1500 chars`. The unit word is redundant — the `N / N` form already reads as a count — and it makes the annotation longer than the value it annotates.
- **Expected:** `0 / 1500`, nothing else. Right-aligned under the field, small inactive text, `aria-live="polite"` so the count change is announced.
- **Fix:** drop `chars` from the counter string. Same treatment on every text field that carries a counter.

### #16 · Chat · Composer menus have a gap between rows
- **Problem:** rows in the composer menus sit apart from each other. Most visible in the model picker (Insightis Light / Medium / Pro), where the list reads as three separate cards rather than one menu.
- **Expected:** in **all three composer menus** — attach, connections, and model — the **gap between rows is 0**. Rows sit flush against each other; the only vertical rhythm comes from each row's own padding, and the only inset is the menu's own 4px padding. A row's hover surface must therefore touch its neighbours' with no dead strip between them.
- **Fix:** remove the gap / row margin in all three menus. Adjust each row's own padding if a row needs more height — never a gap between rows.

### #17 · All dialogs · Right inset collapses to 8px while the left stays 20px
- **Problem:** the content column sits off-centre in every popup — noticeably closer to the right edge than to the left.
- **Cause (measured on prod, "Create metric"):** the dialog container itself is symmetric — `padding: 14px 20px`. The asymmetry is created by the scrollable body inside it, which carries **`margin-right: -20px`** together with **`padding-right: 8px`** (and `padding-left: 0`). The negative margin cancels the container's entire right padding, and only 8px is added back:

  | Side | Result |
  |---|---|
  | Left | 20px (container padding, untouched) |
  | Right | 20 − 20 + 8 = **8px** |

  This is a scrollbar-gutter workaround — pulling the scroll area to the container edge so the scrollbar sits in the padding, with a small gap between content and scrollbar. It costs 12px of right inset permanently, whether the content scrolls or not.
- **Expected:** equal left and right inset on the content, and it must not change depending on whether the body scrolls.
- **Fix:** drop the negative margin / padding pair and let the container's own 20px hold both sides. If the scrollbar must sit at the container edge, apply the same negative-margin-plus-padding trick **symmetrically** (both sides), or reserve the scrollbar gutter instead — but the content's left and right must end up equal either way.
