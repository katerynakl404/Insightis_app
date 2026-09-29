# Queue Band — current (prod)

**Does not exist on prod.** There is no surface between the conversation thread and the composer in AI Chat today.

What prod does have, per the front-end code (`features/chat/components/MessageInput`), is the absence this component fills: while a reply streams, the Send button is swapped in place for Stop and submission is blocked, so text typed during a reply has nowhere to go and no stated fate. The one adjacent behaviour is the input accepted and held during long-conversation compression (INS-ULRG / AIINS-1285) — it has no shared surface with this component today and is expected to be brought onto it.

Baseline for the Expected design: [`../changes/QueueBand.md`](../changes/QueueBand.md).
