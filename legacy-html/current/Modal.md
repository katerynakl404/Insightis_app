# Modal — current (prod)

> **DOM inspection note (2026-06-17):** Modal renders only on user interaction (e.g. delete-chat confirmation). Prod values derived from Tailwind source-code class names, not computed styles.

Panel: `flex flex-col max-h-[90dvh] max-w-lg fixed top-1/2 left-1/2 -translate-1/2 z-[100]
rounded-lg border border-border bg-card p-4 shadow-lg`, slide/zoom animation.
Overlay `bg-black/80`. Header `mb-3 flex flex-col gap-1.5` (align left/center/right).
Footer `mt-3 flex items-center gap-3`. Close = IconButton (rounded-full) with X `text-content-body`.
