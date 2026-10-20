/* PickRow — a row to tick in a picker dialog, the AI connectivity prototype's PickRow / PickList
   carried over as it is (its LinkAIUI; "the one the connection page's Add workspaces picker draws"),
   so both products pick things the same way (user, 2026-10-19: "мав бути той самий елемент").
   DevartUI underneath: Card variant "row" + Checkbox + Typography. Not in DevartUI — a candidate
   for дизайн DevartUI (the AI connectivity prototype marks it so too).

     row    the checkbox on the FIRST line (leading), the name at title14, what describes it at
            body12 under it (three lines at most); the whole row ticks — the checkbox stops its own
            click so the pair never toggles twice. Enter / Space tick it too.
     disabled  can't be picked: the checkbox is disabled, the row no longer ticks, its sub-line says why
   IK.PickList — the column of rows, 8px apart, scrolling inside the dialog when it is long, on
            DevartUI's scrollbar-thin in the side gutter.

   h(IK.PickList, null,
     h(IK.PickRow, { checked, onChange(bool), label, title, badge, sub, disabled }))   badge: beside the name                   */
(function () {
  'use strict';
  var IK = window.InsightisKit, R = window.React, D = window.DevartUI, h = IK.h;

  IK.PickList = function PickList(p) {
    /* DevartUI's own thin scrollbar (scrollbar-thin), set in the dialog's side gutter so it never lies
       over the cards — as the AI connectivity PickList does */
    return h('div', { className: IK.cx('ik-pick-list scrollbar-thin flex min-h-0 flex-col gap-2 overflow-y-auto', p.className), role: 'group', 'aria-label': p['aria-label'] }, p.children);
  };

  IK.PickRow = function PickRow(p) {
    var off = !!p.disabled;
    function flip() { if (!off) p.onChange(!p.checked); }
    /* reveal: scroll this row into view when it appears — a workspace just created in place lands at
       the end of a long list, ticked, and the person sees it (user, 2026-10-19) */
    var el = R.useRef(null);
    R.useEffect(function () { if (p.reveal && el.current) el.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); }, [p.reveal]);
    return h(D.Card, {
      ref: el, variant: 'row', role: 'checkbox', 'aria-checked': !!p.checked, 'aria-disabled': off || undefined, tabIndex: off ? -1 : 0,
      className: IK.cx(!off && 'cursor-pointer', p.className),
      onClick: flip,
      onKeyDown: function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); } }
    },
      h('span', { className: 'flex h-5 shrink-0 items-center self-start' },
        h(D.Checkbox, {
          checked: !!p.checked, disabled: off, 'aria-label': p.label || p.title, tabIndex: -1,
          onClick: function (e) { e.stopPropagation(); },
          onCheckedChange: function (v) { if (!off) p.onChange(v === true); }
        })),
      h('span', { className: 'flex min-w-0 flex-col gap-0.5' },
        h('span', { className: 'flex min-w-0 flex-wrap items-center gap-2' },
          h(D.Typography, { element: 'span', textStyle: 'title14', textColor: off ? 'light' : 'primary', className: 'min-w-0 break-words' }, p.title),
          p.badge || null),
        p.sub ? h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary', className: 'line-clamp-3' }, p.sub) : null));
  };
})();
