# Link — current (prod)

No dedicated `Link` component exists in prod. Inline text-links use native `<a>` elements with theme colour pulled from `text-accent` (`hsl(179 94% 26%)` light, `hsl(178 94% 30%)` dark) and the browser's default underline rendered at the baseline (always on, no hover-triggered reveal).

> **DOM inspection note (2026-06-17):** The prod SPA (`/chat`) has zero `<a>` elements in the rendered DOM — all navigation is React Router (`<button>` / `<div>`). No live `<a>` instance was found to inspect. The Current (prod) values above are derived from source code (`text-accent` utility class convention), not computed styles.

- **Markup:** raw `<a href="…">…</a>` with utility classes scattered per usage (no shared class).
- **Colour:** `text-accent` token — Brand teal at full saturation.
- **Underline:** browser default — always visible, tight against the text baseline.
- **Hover:** no change (underline already on, colour unchanged).
- **Focus:** browser-default focus ring (varies by user agent — usually a thin dotted outline).
- **Disabled:** ⚠ undefined — no convention for unclickable link styling.
