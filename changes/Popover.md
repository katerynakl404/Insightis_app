# Popover — prod → expected

Source: `@insightis/ui` `Popover/index.tsx` + `PopoverContent.tsx`. Baseline: [`../current/Popover.md`](../current/Popover.md).

## PopoverContent
| State | Current (prod) · was | v1.0 | Expected · became | Specification |
|---|---|---|---|---|
| Open | `z-50 w-72 rounded-md border border-border bg-background text-content-primary p-4 shadow-md outline-none`; entry `animate-in fade-in-0 zoom-in-95` + side slide-in | — | — no change (hex → [colors](colors.md)) | bg becomes `Surface/Background` (`#F8FAFC` / dark `#0F0E14`) — matches the rest of the new system |
| Closed | exit `animate-out fade-out-0 zoom-out-95` | — | — no change | — |
| Focus trap | Radix default (focus enters content on open, returns to trigger on close) | — | — no change | a11y wired by Radix |

## Pop item states
| State | Current (prod) · was | v1.0 | Expected · became | Specification |
|---|---|---|---|---|
| Default | `Text/Body`, transparent bg | — | `Text/Body`, transparent bg | No change |
| Hover | `primary/10` bg | — | `State/Hover` (`--state-hover`) | Unified neutral hover |
| Pressed / Active | — not defined | — | `State/Pressed` (`--state-pressed`) via `.sbx-pop-item:active` + `.sbx-pop-item.active` | `.active` class marks the "currently open route" in nav-style popovers; bg-only signal, text stays `--ink-body` |
| Focus | — | — | `--shadow-focus-brand` (2px Card gap + 2px Brand ring) | Matches rest of kit |

## ⚠ Note — surface bg
PopoverContent uses `bg-background`, not `bg-card`. On light prod this is `#F8FAFC` (subtle off-white) while Dropdown / Tooltip / Modal sit on `bg-card` (`#FFFFFF`). Inconsistency carries forward into the new system. Decide whether to harmonize when the next pass is done — flag, don't fix here.

## No change (—)
Default `align="center"`, `sideOffset={4}`, animation set, portalling, transform origin (`--radix-popover-content-transform-origin`).

## Variants (consumer compositions documented in the kit)

| Variant | Where it's used | Note |
|---|---|---|
| **Account menu** *(documented this iteration)* | Sidebar footer — `<button class="sb-user">` opens it | Two labelled sections (`Account`, `Support`) of `SelectMenuItem` rows + a segmented theme switcher (sun / moon / monitor-smartphone, per prod — slot walks the surface ladder: light `var(--chips)` → pill `var(--card)`; dark `var(--bg)` → pill `var(--card2)`, same dark recipe as `.segctrl`) + plain `Sign Out` row. Surface `Surface/Background`, border `Stroke/Border` (`--border-width`), radius 4 px, padding 8 px, shadow `drop-shadow-lg`. Previously filed under Stepper in the kit by mistake; relocated to the Popover section. |
| **Subscription tokens** *(documented this iteration)* | Sidebar footer — tokens-meter button opens it | Plan header (20 px shield-check badge in `Brand/Tertiary` + 14 px `font-medium` plan name), two metered rows (Subscription Tokens with `Brand/Tertiary` progress, Purchased Credits with `Feedback/Green`), two CTAs (`Button primary` Buy Credits + `Button secondary` Upgrade Plan — `--card` bg, neutral `--border`, `--ink-body` text; both h36 `rounded-full`). Same shell as the Account variant. Previously filed under Stepper; relocated to the Popover section. |

## Subscription tokens — icon assets *(this iteration)*

| Slot | Current (prod) | Expected | Specification |
|---|---|---|---|
| Plan badge (next to "Basic") | 21×16 inline base64 PNG embedded in `.sbx-pop-tok-head .plan-badge` | external SVG `achievement-shield.svg` referenced via `background: url("achievement-shield.svg") center/contain no-repeat` | Pure-vector, themeable, no raster. Source = Figma-exported SVG (gradients preserved). Relative URL from kit HTML. |
| Subscription Tokens coin (24×24) | inline base64 PNG embedded in `.sbx-pop-tok-meter .coin` | external SVG `coin-blue.svg` | Teal-family coin (matches `Brand/Tertiary` progress bar in same row). Hand-built pure-vector with reeded edge and shadow-only emboss. |
| Purchased Credits coin (16×16) | inline base64 PNG embedded in `.sbx-pop-tok-meter .coin.sm` | external SVG `coin-green.svg` | Green-family coin (matches `Feedback/Green` progress bar in same row). Same construction as blue, only palette swap. |

No size / layout / spacing / colour change. Only the icon source format changes (PNG → SVG). Both prod-demo and Expected popover copies share the same CSS class, so both columns of the kit pick up the new SVG references automatically.

## ⚠ Best-practice states — to define
- **Trigger focus / hover / pressed** — delegated to the consumer's Button / IconButton, already covered there.
- **Arrow** — Radix supports `<Popover.Arrow>` but Insightis doesn't expose / style it.
- **Sizes** — only one width (`w-72` = 288px); no `sm` / `lg` width variants.
- **Dismiss-on-outside-click / Esc** — Radix defaults, document them for consumers.
