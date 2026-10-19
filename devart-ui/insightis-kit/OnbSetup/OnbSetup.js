/* OnbSetup — the card of the onboarding's setup steps (1 Role · 2 Goals · 3 Data source), on the
   auth flow's always-dark page (IK.AuthLayout: same surface as sign-up, which it follows).
   One width for every step (48rem), so the card never jumps when the catalog step opens.

     logo · D.StepProgress (fill: "Step N of M" + the step's name over one bar per step)
     title (<h1> on Typography's h3 step: 20px on a phone, 24px from md) · subtitle (Body/14)
     Below 640px the card becomes the screen (edge to edge, no frame, footer on the bottom edge).
     …the step (D.ChoiceGroup of ChoiceCards, or IK.OnbSourcePicker)…
     footer, over a rule, pinned to the window's bottom while the card is taller than it
     (D.CardFooter sticky):  [Back]                                   [Skip] [Continue]
                           (Back as the chat's question card has it: plain tertiary, no glyph)

   h(IK.OnbSetup, {
     progress: IK.onbProgress(path), current: 0,     // 0-based step of the whole flow
     title, subtitle,
     onBack,                        // omitted on step 1
     onSkip, skipLabel: 'Skip',     // step 3: 'Skip for Now'
     onContinue, canContinue,       // omit onContinue → no Continue (step 3 continues by a pick)
     continueLabel: 'Continue',
     leaving                        // the hand-off to the app: the card fades up and out (.28s)
   }, …) */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.OnbSetup = function OnbSetup(p) {
    /* Step to step: the step that leaves stays over the new one for a moment, drifting the way the
       flow goes (left going on, right going back) as it shrinks a little and fades; the new one then
       builds up piece by piece — its title, its subtitle, then each answer rising into place one
       after another — while the card's height eases from one to the other. The logo, the progress
       and the footer never move. (The new step keeps its entrance class for 900ms, the length of
       the longest stagger.) */
    var ks = R.useState(p.current), shownKey = ks[0], setShownKey = ks[1];
    var os = R.useState(null), out = os[0], setOut = os[1];
    var lastContent = R.useRef(null);
    if (p.current !== shownKey) {
      /* the previous render's step becomes the leaving one — React's "derived from the previous
         render" pattern: state set during render, re-rendered before anything is painted */
      setShownKey(p.current);
      setOut({ key: shownKey, node: lastContent.current, back: p.current < shownKey });
    }
    R.useEffect(function () {
      if (!out) return;
      var t = setTimeout(function () { setOut(null); }, 900);
      return function () { clearTimeout(t); };
    }, [out]);
    var goingBack = !!(out && out.back);
    function inertRef(n) { if (n) n.setAttribute('inert', ''); }
    var measure = R.useRef(null), hs = R.useState(null), height = hs[0], setHeight = hs[1];
    R.useLayoutEffect(function () {
      var el = measure.current; if (!el) return;
      setHeight(el.offsetHeight);
      if (!window.ResizeObserver) return;
      var ro = new ResizeObserver(function () { setHeight(el.offsetHeight); });
      ro.observe(el);
      return function () { ro.disconnect(); };
    }, []);
    var content = h(IK.Fragment, null,
      h('div', { className: 'flex flex-col gap-2' },
        /* the step's <h1> takes Typography's responsive heading scale (the h3 step: 20px on a phone,
           24px from md) — it steps down on a small screen the way every h2 in the product does */
        h(D.Typography, { element: 'h1', variant: 'h3', textColor: 'primary', className: 'text-balance' }, p.title),
        p.subtitle ? h(D.Typography, { element: 'p', textStyle: 'body14', textColor: 'secondary' }, p.subtitle) : null),
      p.children);
    R.useLayoutEffect(function () { lastContent.current = content; });
    /* below 640px the setup IS the screen: edge to edge, no card frame around it, the footer on the
       bottom edge; the progress keeps "Step N of M" and its bars, without the step's name (the brief) */
    var phone = D.useMaxWidth ? D.useMaxWidth(640) : false;
    var shell = phone
      ? ['div', { className: IK.cx('ik-onb is-sheet flex flex-col gap-5 bg-surface-card', p.leaving && 'is-leaving', p.className) }]
      : [D.Card, { variant: 'outline', rounded: 'xl', fullWidth: true, className: IK.cx('ik-onb gap-5 p-6', p.leaving && 'is-leaving', p.className) }];
    return h(shell[0], shell[1],
      h('div', { className: 'flex justify-center' }, h(IK.Logo, { height: 24, label: 'Insightis', className: 'ik-auth-logo' })),
      h(D.StepProgress, { fill: true, showStepLabel: !phone, steps: p.progress, current: p.current, 'aria-label': 'Onboarding progress' }),
      h('div', { className: 'ik-onb-stage', style: height != null ? { height: height } : undefined },
        h('div', { ref: measure, className: 'ik-onb-track' },
          /* the leaving step: same key as when it was current, so it is not re-mounted, only faded */
          out ? h('div', { key: out.key, className: IK.cx('ik-onb-step is-out', goingBack && 'is-back'), 'aria-hidden': 'true', ref: inertRef }, out.node) : null,
          h('div', { key: shownKey, className: IK.cx('ik-onb-step', out && 'is-in', goingBack && 'is-back') }, content))),
      /* DevartUI CardFooter, sticky: on step 3 the card outgrows the window and the actions stay in reach */
      h(D.CardFooter, { sticky: true, className: 'ik-onb-foot' },
        p.onBack ? h(D.Button, { variant: 'tertiary', size: 'sm', type: 'button', onClick: p.onBack }, 'Back') : null,
        h('span', { className: 'flex-1' }),
        p.onSkip ? h(D.Button, { variant: 'tertiary', size: 'sm', type: 'button', onClick: p.onSkip }, p.skipLabel || 'Skip') : null,
        p.onContinue ? h(D.Button, { variant: 'primary', size: 'sm', type: 'button', disabled: !p.canContinue, onClick: p.onContinue }, p.continueLabel || 'Continue') : null));
  };
})();
