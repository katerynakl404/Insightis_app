/* ThinkingIndicator — what the answer card holds while the reply is on its way (changes/ThinkingIndicator.md;
   the original ".cp-thinking"). One line: the word "Thinking" in Body/M on Text/Secondary with a
   Text/Primary highlight sweeping it, and three dots stepping beside it. The word never types itself:
   all three dots are always rendered and only their opacity cycles, so nothing reflows.
   Reduced motion: no sweep, the word in its own flat ink, the dots held at full opacity.

   h(IK.ThinkingIndicator, { label: 'Thinking' }) — put it inside IK.ChatAnswer. */
(function () {
  'use strict';
  var IK = window.InsightisKit, h = IK.h;

  IK.ThinkingIndicator = function ThinkingIndicator(p) {
    return h('div', { className: IK.cx('ik-thinking', p.className) },
      h('span', { className: 'ik-thinking-t' }, p.label || 'Thinking'),
      h('span', { className: 'ik-thinking-dots', 'aria-hidden': 'true' }, h('i', null, '.'), h('i', null, '.'), h('i', null, '.')));
  };
})();
