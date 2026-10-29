/* AuthConsentPair — who asks and who answers, at the top of the consent screen (AIINS-1778): the assistant's
   real logo (IK.ConnectorMark: Claude, ChatGPT …; an unknown one gets DevartUI's letter tile) ··· the Insightis
   mark, each in a DevartUI CardIcon — the logo tile DevartUI ships (44px, the border, the icon-wrapper wash, its
   logo at 26px); a hand-built copy of it was replaced on 2026-10-29 (README rule 1b). Decorative — the title names
   the assistant — so the whole pair is aria-hidden. The Insightis mark keeps its brand colour (--logo-mark), as in
   the full logo.

   h(IK.AuthConsentPair, { app: 'Claude' })
   h(IK.AuthConsentPair, { app: 'Claude', gate: h(IK.PlanLock, { plan: 'Pro', glyph: true }) })
     gate — a node set in the middle of the link (dots either side): the plan the connection waits for, so the badge
            reads as part of the pair, not a loose chip under it (user, 2026-10-29: "треба це якось з'єднати") */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  IK.AuthConsentPair = function AuthConsentPair(p) {
    /* decorative but for the gate: the title already names the plan, so the whole pair stays aria-hidden */
    return h('div', { className: IK.cx('ik-consent-pair', p.className), 'aria-hidden': 'true' },
      /* size-auto: the mark takes CardIcon's own logo size (its [&_img] rule), not ConnectorMark's box */
      h(D.CardIcon, null, h(IK.ConnectorMark, { connector: p.app, className: 'size-auto' })),
      h('span', { className: 'ik-consent-link' }, h('i'), h('i'), h('i')),
      p.gate ? h(IK.Fragment, null, p.gate, h('span', { className: 'ik-consent-link' }, h('i'), h('i'), h('i'))) : null,
      h(D.CardIcon, null, h(IK.Logo, { variant: 'mark', height: 24 })));
  };
})();
