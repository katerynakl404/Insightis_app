# Modal — prod → expected

Modal's shell tokens stay close to prod; the changes are mostly inherited from the components it embeds (Button + text colours).

| Part | Current (prod) | Expected |
|---|---|---|
| Border | `Stroke/Border` `#F0F5FA` | `#E2E8F0` (Slate-200) |
| Title | `content-primary` `#111827` | `Text/Primary` `#0F172A` (Slate-900) |
| Body text | `content-secondary` | `Text/Secondary` (Slate-500 / Grey-400) |
| **Cancel action** | `Button outline` (teal border / transparent bg) | **`Button secondary`** — filled card-style, lower emphasis than Outlined; hover always lighter than default |
| **Destructive action** | `Button destructive` (themed: light `#C10007`, dark `#7D1B1B` ⚠ failed AA) | **`Button destructive`** — now uses theme-independent `Feedback/Red` (`#B91C1C`, Red-700) with hover `Feedback/Error_Hover` (Red-800) and press `Feedback/Error_Press` (Red-850). AA in both themes. |

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
