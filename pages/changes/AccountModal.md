# AccountModal — prod → expected

Source: `@insightis/ui` Sidebar user-row action → Account settings dialog.  
Baseline: [`../../current/Sidebar.md`](../../current/Sidebar.md) (user-row section).  
Handoff page: [`../user_profile-modal.html`](../user_profile-modal.html)

---

## Overview

**Current (prod):** clicking the user row opens a full-screen split-panel dialog —
left nav (Account / Support sections) + right panel with section content. No backdrop; fills
the viewport. On mobile (<768px) the dialog becomes a bottom Sheet component.

**Expected:** same split-panel dialog, now styled with design-system tokens — centered
overlay modal with semi-transparent backdrop, `--card` surface, `--border`/`--shadow` per
the kit, and all interactive elements using kit components. Responsive behaviour mirrors
prod: modal on desktop, full-height sheet on mobile.

---

## Entry point — Account popover

The modal is reached via the `.sbx-pop-account` floating popover (anchored above the
sidebar user row). Clicking any nav item in the popover calls `acctOpenModal(sectionId)`.

---

## Button positioning rule (locked)

**Right-aligned, primary on the far right.** All button rows in the modal follow this rule:

- Button groups are right-aligned (`justify-content:flex-end` or `margin-left:auto` on a single button).
- Within a group: secondary/outline variants come first (left), the primary action is always last (rightmost).
- On mobile with `flex-wrap:wrap`, single buttons use `margin-left:auto` so they stay right-aligned on the wrapped row.

| Section | Button order (left → right) |
|---|---|
| Manage plan | View usage (outline) → **Upgrade plan (primary)** |
| Billing — payment | Update (outline) — single, right via `space-between` |
| Balance hero | Update plan (outline) → **Buy credits (primary)** |
| Delete account | single button, `margin-left:auto` → always right |
| Feedback | Attach file (secondary) → **Send feedback (primary)** |

---

## Desktop modal (>767px)

### Dimensions & surface

| Property | Value |
|---|---|
| Overlay backdrop | `rgba(15,23,42,.45)`, `padding:1.5rem`, `position:absolute;inset:0` |
| Modal size | `width:100%; max-width:860px; height:90dvh; max-height:40rem (640px)` |
| Modal surface | `background:var(--card); border:1px solid var(--border); border-radius:.75rem` |
| Modal shadow | `0 20px 40px -8px rgba(15,23,42,.2), 0 8px 16px -4px rgba(15,23,42,.12)` |
| Layout | `display:flex` (row) — nav sidebar left + body right |

### Left nav

| Property | Value |
|---|---|
| Width | `11rem` (176px), `flex:none` |
| Padding / gap | `1rem .75rem` / `.875rem` — matches `.sbx-pop.is-open` |
| Markup | `.acct-modal-nav` wrapping `.sbx-pop-sect` / `.sbx-pop-label` / `.sbx-pop-list` / `.sbx-pop-item` — same classes as the floating popover |
| Active state | `.sbx-pop-item.active` — defined centrally in `kit-theme.css`; auto-syncs with sidebar active recipe |
| Log Out | `.sbx-pop-item.danger` inside `.acct-nav-foot` (auto-`margin-top` + `border-top` separator) |
| Close button | `.acct-close` icon-btn top-right of body header; `aria-label="Close account settings"` |

### State table

| Aspect | Current (prod) | Expected |
|---|---|---|
| Trigger | user row click → split panel | popover nav item → `acctOpenModal(sectionId)` |
| Surface | full-viewport, no backdrop | centered overlay, `rgba` backdrop, `border-radius:.75rem` |
| Header title | static "My account" | dynamic via `acctSetSection()` |
| Header actions | none | empty — `acctSectionActions = {}` (Balance CTAs live in content, not header) |
| Left nav active | teal highlight | `var(--state-pressed)` bg via kit-central `.sbx-pop-item.active` |
| Log Out | red text + icon | `.sbx-pop-item.danger` + `.acct-nav-foot` border-top separator |

---

## Right panel sections

### My account

| Element | Expected |
|---|---|
| Email row | `acct-field-row`: email address + `.link` "Change password" button |
| Delete account | `acct-section` row: title + `.acct-danger-warn` warning text + `btn btn-outline-destructive btn-sm` |
| Theme | `.segctrl-group` wrapper → `.segctrl-label` "Theme" + `.segctrl.is-md` (Light / Dark / System, full-width) |

### Manage plan

| Element | Expected |
|---|---|
| Current plan | "Professional" label in `--ink` |
| CTAs | `btn btn-primary btn-sm` "Upgrade plan" + `btn btn-outline btn-sm` "View usage" |

### Billing

| Element | Expected |
|---|---|
| Payment method | "Visa ending in 4242" + `btn btn-outline btn-sm` "Update" |
| Next invoice | date + amount |

### Balance

| Element | Expected |
|---|---|
| Hero row | `.acct-bal-circle` (36px coin) + `.acct-bal-amount` "673 /2,124 credits" — coin + amount only, no buttons |
| Progress bar | Below hero row. `height:4px`, `border-radius:9999px`, track `var(--progress-track)`, fill `var(--brand-primary)` |
| Progress context | Below bar. Two spans: "32% of total credits used" + "1,451 remaining" — `font-size:.75rem; color:var(--ink-secondary)`. Mobile: short variants "32% used" / "1,451 left" via `.acct-show-mobile` |
| CTAs row | Below progress. `.acct-bal-btns` — `justify-content:flex-end` on desktop; `width:100%; .btn{flex:1}` on mobile (equal-width split) |
| Stats tiles | Two flex tiles side-by-side (`gap:.5rem`), `background:var(--bg)`, `border-radius:.375rem`, `padding:.5rem .75rem` |
| Stats tile label | `.acct-field-label` (`font-size:.625rem` = 10px) — "Monthly Credits" / "Extra Credits" |
| Stats tile value | `.acct-sect-title` (`font-size:.9375rem; font-weight:600`) — 1,584 / 540 |
| Credit usage | `.acct-usage-table` — Date / Request type / Spent tokens columns; `border-collapse:collapse` |
| CTAs | `btn btn-outline btn-sm` "Update plan" + `btn btn-primary btn-sm` "Buy credits" — placed **in content** (not header). `acctSectionActions = {}` |

**Token:** `--progress-track: var(--card2)` — new semantic token added to `:root` in `kit-theme.css` (Slate-100 light / Grey-800 dark). Separates "progress track" intent from `--state-hover` which is reserved for interactive hover surfaces.

### Leave feedback (shown as "Feedback")

| Element | Expected |
|---|---|
| Textarea | `.ta`, `rows="5"`, full-width, `max-width:100%`, labelled "Your feedback" (first element in the section — Category segmented control removed) |
| Actions row | `.acct-fb-bottom` (flex, `justify-content:flex-end`, `gap:.5rem`) — `.btn .btn-secondary .btn-sm` "Attach file" (paperclip icon + label) + `.btn .btn-primary .btn-sm` "Send feedback". |

---

## Mobile responsive (≤767px)

### Layout transformation

At `max-width:767px` the centered modal becomes a **full-height bottom sheet**:

| Property | Desktop | Mobile |
|---|---|---|
| Overlay | `padding:1.5rem`, `rgba` backdrop | `padding:0`, `background:transparent` |
| Modal | `max-width:860px; height:90dvh; border-radius:.75rem` | `width:100%; height:100%; border-radius:0; box-shadow:none; border:none; border-top:1px solid var(--border)` |
| Flex direction | `row` (nav left + body right) | `column` (mobile header → nav or body below) |

### Two-state machine

State is driven by `data-mobile-state` attribute on `.acct-modal`. Toggled by `acctSetMobileState(state)`.

| State | Triggered by | Shows | Hides |
|---|---|---|---|
| `menu` | page load (if mobile) | `.acct-modal-nav` (full-width column) | `.acct-modal-body` |
| `section` | tapping any nav item | `.acct-modal-body` | `.acct-modal-nav` |

**JS helpers:**
- `acctIsMobile()` — `window.innerWidth <= 767`
- `acctSetMobileState(state)` — sets attribute + updates mobile title
- `acctMobileBack()` — `section` → back to `menu`; `menu` → `acctCloseModal()`

### Mobile header (`.acct-mobile-hdr`)

Hidden on desktop (`display:none`). Shown at ≤767px as `display:flex`.

| Sub-element | Spec |
|---|---|
| `.acct-mobile-btn.is-back` | chevron-left SVG, 24×24px hit area, always visible at mobile — closes modal from `menu` state, goes back from `section` state |
| `.acct-mobile-title` | `font-size:1.25rem; font-weight:600` — "Settings" in `menu`, section name in `section` |

### Mobile menu state nav

| Property | Value |
|---|---|
| Nav padding / gap | `padding:1rem; gap:1rem` |
| `.sbx-pop-list` | `border:1px solid var(--border); border-radius:.5rem; overflow:hidden; gap:0` |
| `.sbx-pop-item` | `height:2.75rem; padding:.5rem .875rem; border-radius:0; border-bottom:1px solid var(--border); background:var(--card)` |
| `.sbx-pop-item:last-child` | `border-bottom:none` |
| Active item | `background:var(--state-pressed); color:var(--brand-primary)` + `.ic{color:var(--brand-primary)}` |
| `.acct-nav-chev` | Chevron-right SVG (`14×14px`, `margin-left:auto`), hidden on desktop, `display:block` in menu state. Added to: My account, Manage plan, Billing, Balance, Leave feedback. Not added to: Resources (has `.ext`), Sign out (danger action) |
| Log Out | Own bordered card — `border:1px solid var(--border); border-radius:.5rem; background:var(--card); height:2.75rem`. `.acct-nav-foot` loses its desktop `border-top` separator in menu state |

### Mobile section content adaptations

| Element | Desktop | Mobile (≤767px) |
|---|---|---|
| Segctrl buttons (Theme) | Icon + `<span class="segctrl-lbl">` text label | Labels hidden (`segctrl-lbl{display:none}`) — icon only; `aria-label` on each button preserves accessible name |
| Delete account section | `flex-direction:row` (text left, button right) | `flex-wrap:wrap` — button wraps to second row at its natural width |
| Balance progress texts | "32% of total credits used" / "1,451 remaining" | Short variants via `.acct-show-mobile`: "32% used" / "1,451 left". Full text in `.acct-hide-mobile`, hidden at ≤767px |
| Balance CTA buttons | Natural width, right-aligned on wrap row | `flex:1` on each `.btn` inside `.acct-bal-btns` → equal-width split across full row |

---

## New page-scope CSS (`<style>` in `user_profile-modal.html`)

**Layout:** `.acct-overlay`, `.acct-modal`, `.acct-modal-nav`, `.acct-modal-body`, `.acct-header`, `.acct-header-actions`, `.acct-title`, `.acct-close`, `.acct-content`, `.acct-section`, `.acct-sect-title`, `.acct-field-row`, `.acct-field-label`, `.acct-field-val`, `.acct-danger-warn`, `.acct-nav-foot`

**Mobile:** `.acct-mobile-hdr`, `.acct-mobile-btn`, `.acct-mobile-title`, `.acct-nav-chev`, `.acct-hide-mobile`, `.acct-show-mobile`, `.segctrl-lbl`

**Balance:** `.acct-bal-circle`, `.acct-bal-amount`, `.acct-usage-table`

**Feedback:** `.acct-fb-bottom`

**New kit-theme.css additions (this iteration):**
- `--progress-track: var(--card2)` — semantic token in `:root`
- `.segctrl-group` — `display:flex; flex-direction:column; gap:.5rem`
- `.segctrl-label` — `font-size:.875rem; font-weight:600; color:var(--ink)`

Reused kit classes: `.sbx-pop-sect`, `.sbx-pop-label`, `.sbx-pop-list`, `.sbx-pop-item`, `.segctrl`, `.segctrl-btn`, `.sbx-pop-theme`, `.sbx-pop-theme-btn`, `.btn`, `.btn-outline`, `.btn-outline-destructive`, `.btn-primary`, `.btn-sm`, `.link`, `.ta`

---

## Spacing rules

| Token / class | Value | Usage |
|---|---|---|
| `.acct-content` gap | `1.25rem` | between top-level `data-section` blocks |
| `.acct-section` gap | `.75rem` | between direct children within a section |
| `.acct-section` padding-top/bottom | `1.25rem` | breathing room around dividers; suppressed on `:first-child` / `:last-child` |
| `.acct-header` padding | `.5rem 1.25rem` | desktop header row |
| `.acct-modal-nav` padding / gap | `1rem .75rem` / `.875rem` | desktop nav |
| Mobile nav padding / gap | `1rem` / `1rem` | menu state |
| Mobile content padding | `1rem` | section state |

---

## A11y

- Dialog: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` → dynamic title.
- Left nav: `role="navigation"`, `aria-label="Account sections"`.
- Active nav item: `aria-current="true"`.
- Resources: `aria-label="Resources (opens in new tab)"`.
- Close (desktop): `aria-label="Close account settings"`.
- Mobile back: `aria-label="Back"`.
- Theme buttons: `aria-label` per option + `aria-pressed`.

---

## Self-check

**Consistency:** PASS — `--card`/`--border`/kit shadows; hover/pressed via `--state-hover`/`--state-pressed`; `--brand-primary` for active; no raw hex; `--progress-track` isolates track intent from `--state-hover`; chevrons and mobile header use `--ink-secondary`; Log Out uses `--fb-red-text`.

**Accessibility:** PASS — mobile items ≥ 44px hit targets; desktop items ≥ 30px; dialog labeled; active state uses colour + bg (not colour alone); Log Out red text + icon; external link labeled.
