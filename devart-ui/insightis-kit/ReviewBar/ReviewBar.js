/* ReviewBar — the prototype's own chrome, not part of the product.
   The sticky strip above every prototype page: page title, its review status, and the
   switches a reviewer flips to see each state (plan, data state, theme …).

   <IK.ReviewBar
     title="Data Sources"
     status="approved"                       // approved | concept | wip
     controls={[                              // page states, in the original's order
       { label: 'State', value: st, onChange: setSt,
         options: [{ value: 'data', label: 'Data' }, { value: 'empty', label: 'Empty' }] },
     ]}
     plan                                     // adds the Paid / Free switch first (IK.usePlan)
     theme                                    // adds the Light / Dark switch last (default true)
     size="sm"                                // the chat pages' slim 40px strip (their .topbar
                                              // override: 6px 16px padding, is-sm switches)
   >{optional extra nodes, right side}</IK.ReviewBar>

   A control may carry showLabel: true → its label is written beside it, as the original's
   .tb-concept-lbl ("Plan", "Popover state"). `plan` accepts { showLabel: true } for the same.
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, h = IK.h;

  var STATUS = {
    approved: { label: 'Approved',    variant: 'success' },
    concept:  { label: 'Concept',     variant: 'brand' },
    wip:      { label: 'In redesign', variant: 'attention' }
  };

  function Switch(c) {
    var seg = h(D.SegmentedControl, { value: c.value, onValueChange: c.onChange, size: c.size === 'sm' ? 'sm' : undefined },
      h(D.SegmentedControlList, { 'aria-label': c.label, className: 'ik-rb-seg' },
        c.options.map(function (o) {
          return h(D.SegmentedControlTrigger, {
            key: o.value, value: o.value, size: c.size === 'sm' ? 'sm' : 'md', disabled: o.disabled
          }, o.label);
        })));
    if (!c.showLabel) return seg;
    return h('div', { className: 'ik-rb-group', role: 'group', 'aria-label': c.label },
      h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary', className: 'whitespace-nowrap' }, c.label), seg);
  }

  IK.ReviewBar = function ReviewBar(p) {
    var th = IK.useTheme(), theme = th[0], setTheme = th[1];
    var st = STATUS[p.status] || null;
    var pl = IK.usePlan(), plan = pl[0], setPlan = pl[1];
    var controls = (p.controls || []).filter(Boolean);
    if (p.plan) controls = [{
      label: 'Plan', value: plan, onChange: setPlan, showLabel: !!(p.plan && p.plan.showLabel),
      options: [{ value: 'paid', label: 'Paid' }, { value: 'free', label: 'Free' }]
    }].concat(controls);
    if (p.theme !== false) controls = controls.concat([{
      label: 'Theme', value: theme, onChange: setTheme,
      options: [{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]
    }]);

    var sm = p.size === 'sm';
    return h('header', { className: IK.cx('ik-rb', sm && 'is-sm'), 'data-ik-review': '' },
      h('div', { className: 'ik-rb-title' },
        h(D.Typography, { element: 'span', textStyle: 'label14', className: 'whitespace-nowrap text-ink-primary' }, p.title),
        st ? h(D.Badge, { variant: st.variant, size: 'sm', className: 'uppercase tracking-caps' }, st.label) : null),
      h('div', { className: 'ik-rb-controls' },
        p.children,
        controls.map(function (c) { return h(Switch, Object.assign({ key: c.label, size: sm ? 'sm' : 'md' }, c)); })));
  };
})();
