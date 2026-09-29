# Queue Pause — current (prod)

**Does not exist on prod.** There is no queue, so there is nothing to pause.

The four causes it reports do exist today and each has its own prod surface — the Confirmation Card in the thread, the failed-answer line, the credits balance and the Stop button — but none of them says anything about pending input, because none is pending.

⚠ Whether the failed-answer line in the thread already carries its own Retry is **not verified** (spec Q5, front-end to confirm). If it does, D2 links to it rather than rendering a second one.

Baseline for the Expected design: [`../changes/QueuePause.md`](../changes/QueuePause.md).
