# Spec-completeness audit — can each component be reproduced from its spec alone?

> **Status: REMEDIATED.** The gaps below were addressed in a follow-up pass — every `changes/<X>.md` was made self-reproducing against the live CSS, and the storybook contradictions/missing rows were corrected (17 components, 29 edits). This report is kept as the point-in-time record of what was found and the root-cause basis for the hardened lockstep rule in [`../claude-code/instructions.md`](../claude-code/instructions.md). Re-run the audit to confirm closure before relying on it again.


Method: one reviewer per component cross-checked `changes/<X>.md` + the storybook section against the live `pages/kit-theme.css`, judging the locked rule — **a developer must be able to rebuild the component from its change doc + storybook WITHOUT reading the stylesheet.** 48 components.

Severity: **blocker** = can't reproduce correctly / spec contradicts the CSS → dev builds the wrong thing · **major** = a real value/state is missing → likely wrong · **minor** = nit/polish.

## Verdict summary

| Verdict | Count | Components |
|---|---|---|
| ❌ **no** | 2 | DataSourcesFiles, Tooltip |
| ⚠️ **partial** | 34 | AccountPopover, Autocomplete, Badge, Banner, Button, Card, ChatRow, Chip, Collapsible, DataSourceCard, Datepicker, Dropdown, File, IconButton, Input, InputGroup, Modal, Pagination, PasswordInput, Popover, ProgressBar, ProviderCard, ScrollShadow, SegmentedControl, Selector, Sheet, Sidebar, Spinner, Stepper, Switch, Table, TextArea, Toast, TruncatedTitleTooltip |
| ✅ **yes** | 12 | Accordion, Avatar, Checkbox, CircularProgress, Link, MetaRow, Overlay★, Resizable, Separator★, Skeleton, StatusView, Tabs |

★ Overlay & Separator returned **zero** gaps — the gold standard.

## 🔴 Priority 1 — spec **contradicts** the CSS (dev would build the WRONG thing)

These are the most dangerous: the doc/storybook states a value the live CSS disproves.

| Component | Contradiction |
|---|---|
| **Button** | Secondary **hover bg**: change doc says `--btn-secondary-bg-hover` (brand 5% tint); storybook + live CSS say `--state-hover` (neutral). Two authoritative docs disagree. **blocker** |
| **Table** (`.mx-tbl`) | Provider-group band: spec says `var(--bg)`; live CSS uses dedicated `--mx-group-band` (slate-150/grey-700). Also no row height (2.875rem), no `--mx-prov-indent` system, `.mx-prov-ic` "bare" claim is false (it has bg+border). **3 blockers** |
| **PasswordInput** | Toggle size stated 3 ways (36 / 28 / 24px); shell height 32 (doc) vs 36 (storybook); error bg "red/5" vs live `transparent`. **2 blockers** |
| **DataSourceCard** | Name `font-weight` — doc + CSS say `400`, **every** storybook demo renders `600`. |
| **SegmentedControl** | Container padding doc `4px` vs CSS `2px`; active recipe in storybook is the stale v1 (weight 600 + outset ring) vs shipped (weight 500 + inset rim); hover-bg token doc `--card` vs CSS `color-mix(card 50%, card2)`. |
| **Sidebar** | Kebab hover/press doc `6/8%` vs CSS `8/12%`; logo size 24×100 vs 18×75; **breakpoint 768 vs 1024** (CSS = 1024); trigger 24 vs 28px; icon-mode nav 32 vs 28px. |
| **File** | Default icon "accent" (not a real token; CSS = `--brand-tertiary`); error svg `60%` vs CSS `75%`; doc claims a "ring red/20" that doesn't exist. |
| **Chip** | Hover: spec says "no border"; CSS keeps the rest border. Pressed state missing entirely. |
| **Popover** | Theme-switcher dark ladder stated backwards: doc `bg→card2`; CSS slot `--card2`, active pill `--chips`. |
| **Datepicker** | Storybook sub-line says day cell `h-8 w-10` / `rounded-md`, contradicting the table's 30px / 6px. |
| **Autocomplete** | Focus border doc "content-primary"; CSS `var(--ink)`. |
| **Card** | Doc claims `.card-c` has a rest ghost shadow (`--shadow-rest`); live rule has **no** box-shadow. |
| **Pagination** | Arrow size 36px (doc) vs 32px (storybook inline). Focus "still needed" (doc) vs "finalized" (storybook). |
| **ProviderCard** | Metrics chips: doc wrapper `.chip-row` (gap 5px); storybook bare div gap 4px → wrong gap + loses `overflow:visible`. |
| **MetaRow** | Action color doc `--brand-primary`; live `.link` = `--ink-highlight`. |
| **IconButton** | Sub-line "icon 18px" (fixed) vs doc "glyph flexible / no base svg rule". |

## 🟠 Priority 2 — breaks the "rebuild ALONE" rule (defers to other docs / missing CSS)

| Component | Issue |
|---|---|
| **DataSourcesFiles** | No storybook section at all; component CSS lives **inline in the page**, not kit-theme — nothing to reproduce from. All dims undocumented. (**no**) |
| **Tooltip** | Spec documents only the static `.tt` chip; the real `[data-tip]` ::after engine + JS-positioned bubble (delays, warm-up, side variants, fallback) is undocumented. (**no**) |
| **Pagination** | All states deferred to Button.md / IconButton.md. |
| **Toast** | Close-button visuals fully delegated to IconButton-tertiary; markup contract omits the progress strip + action button. |
| **Sheet** | Close-button hover/press/focus delegated to IconButton-tertiary. |
| **TruncatedTitleTooltip** | Typography deferred to Tooltip.md; default placement "right" contradicts CSS default (top). |

## 🟡 Priority 3 — missing values/states (major), reproducible-but-incomplete

- **Input / TextArea** — entire **size-variant scale** (xs/sm/md/lg/xl paddings + font-sizes) undocumented; Input also omits the flex+icon layout. (Input: 1 blocker)
- **AccountPopover / Popover** — `drop-shadow-lg` value never given; dark-mode shadow override undocumented; item hover/focus/active tokens missing; theme-switcher states (blocker on AccountPopover).
- **Modal** — footer padding/gap, progress wrapper, progress text style, step flex/gap/scroll all missing.
- **ChatRow** — rest/hover shadow tokens, focus inner-ring token (`--bg` not `--card`), active scale, pin/kebab sizes & tints, menu-open-keeps-hover, transition tokens.
- **Dropdown** — `.menu` border omitted; disabled state IS implemented but doc says "to define"; `.menu-sep` / `.mi-ic` specs missing; item font-weight unstated.
- **InputGroup** — inner input/placeholder tokens, the clearable-X sub-component, the kbd slot, addon icon-size (per-size claim is false).
- **Banner** — dismiss/collapse animation (`.banner-wrap`/`.is-dismissed`) values; responsive stacked-CTA flex rules.
- **ProgressBar** — fixed track `width:160px` + `overflow:hidden` (both load-bearing) missing.
- **ScrollShadow** — `position:relative` on shell + `content:""`/`position:absolute` on fade bands missing.
- **Badge** — `.rf` pill-radius helper on success/error/attention undocumented; per-variant color-mix recipes vague (Error text uses a distinct `--fb-red-text`).
- **Selector** — `.sel-lbl` sub-part entirely undocumented; wrap width, trigger font-size missing.
- **Spinner** — doc claims to enumerate all spinner rings but omits the 10px `.sbx-spinner`.

## ✅ Solid (yes) — reproducible as-is

Accordion, Avatar, Checkbox, CircularProgress, Link, MetaRow*, Overlay, Resizable, Separator, Skeleton, StatusView, Tabs. (*MetaRow has one token-name nit.) Their only gaps are minor (SVG path data living in storybook markup rather than prose, line-heights left to flex centering, etc.).

## Cross-cutting patterns

1. **SVG glyph data** (paths/viewBox/stroke) lives only in storybook markup, never in the doc prose — fine when storybook counts as part of the spec, but every icon-bearing component flags it.
2. **Transition timings** are raw `.12s`/`.15s` literals, not bound to the `--motion-*` tokens, and are frequently undocumented.
3. **Shadow values** are named (`drop-shadow-lg`) but the literal box-shadow recipe and dark-mode overrides are rarely given.
4. **Composite components** (Pagination, Toast, Sheet, PasswordInput, TruncatedTitleTooltip, DataSourcesFiles) lean on "reuses X" cross-references, which violates the stand-alone rule.
5. **"To define" states** that are actually already implemented in CSS (Dropdown disabled, etc.) — the doc is stale behind the code.
