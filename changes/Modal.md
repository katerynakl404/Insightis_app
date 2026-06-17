# Modal — prod → expected

Modal's shell tokens stay close to prod; the changes are mostly inherited from the components it embeds (Button + text colours).

| Part | Current (prod) | v1.0 | Expected | Specification |
|---|---|---|---|---|
| Border | `Stroke/Border` `#F0F5FA` | — | `#E2E8F0` (Slate-200) | Bumped one step for visibility — matches `--border` light token update |
| Title | `content-primary` `#111827` | — | `Text/Primary` `#0F172A` (Slate-900) | Token rename; visually near-identical |
| Body text | `content-secondary` | — | `Text/Secondary` (Slate-500 / Grey-400) | Token rename |
| **Cancel action** | `Button outline` (teal border / transparent bg) | — | **`Button secondary`** — filled card-style, lower emphasis than Outlined; hover always lighter than default | Emphasis shift: secondary fills with `Surface/Card` so "Cancel" reads below the primary destructive action |
| **Destructive action** | `Button destructive` (themed: light `#C10007`, dark `#7D1B1B` ⚠ failed AA) | — | **`Button destructive`** — now uses theme-independent `Feedback/Red` (`#B91C1C`, Red-700) with hover `Feedback/Error_Hover` (Red-800) and press `Feedback/Error_Press` (Red-850). AA in both themes. | Dark theme was 2.76:1 against Card surface — failed WCAG AA. Fix at semantic layer (`--fb-red` pinned to Red-700, theme-independent). |

## Component reuse note

The Modal kit demo previously rendered its Expected column under the `.prod` scope, so the inner Cancel/Delete buttons resolved against prod tokens — masking the fact that both Button variants have changed. The Expected column now uses the default token scope:

- Cancel `<button class="btn btn-sm btn-secondary">` (was `btn-outline`)
- Delete `<button class="btn btn-sm btn-destructive">` (unchanged classname; new tokens under the hood)

## No change (—)
Surface `Card`, radius `lg/xl`, padding 16px, shadow-lg, overlay `black/80`.

## Still needed (per kit)
- Modal sizes (sm / md / lg)
- Scrollable body pattern
- Loading state inside the modal
