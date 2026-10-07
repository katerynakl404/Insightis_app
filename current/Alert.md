# Alert — current (prod)

**Does not exist on prod.** The kit had two feedback surfaces — [Banner](../changes/Banner.md), which announces, and [Toast](../changes/Toast.md), which floats past and removes itself. Neither states a condition in place and waits for it to be dealt with.

Prod does show the individual conditions this reports: the AskUserPanel sits in the thread, a failed answer prints its own line, the credits balance lives in the sidebar, and Stop is a button in the composer. None of them says anything about work left pending, because on prod nothing can be pending.

Baseline for the Expected design: [`../changes/Alert.md`](../changes/Alert.md).
