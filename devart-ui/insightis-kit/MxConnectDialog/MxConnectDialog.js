/* MxConnectDialog — "New connection", the two-step wizard a Connect press opens (#mx-conn-dlg in
   the original; kit-theme.css "ConnectWizard bits", shipped on Metrics and on Data Sources →
   Connections). DevartUI Modal (lg, 36rem) at the wizard's fixed 580px height.

     Step 1 of 2  the data source's own connection form, drawn as a depiction (.ds-intg-*): Account,
                  API Key, two ticked options, Metadata Cache. Its palette is the provider's, not
                  ours, so it does not re-theme (the original's fixed --intg-* colours, kept).
                  Footer: Save → "Saving…" (disabled) for 1.4s → step 2.
     Step 2 of 2  Connection name (prefilled with the source's name) + Description (optional).
                  Footer: Save Connection → onCreate(name).
   The progress line under the title fills 50% → 100%.

   <IK.MxConnectDialog open={bool} onOpenChange={fn} source="Google Analytics" onCreate={fn} />
     source      the data source being connected ('' → "New Connection")
     onCreate    (connectionName) — the dialog closes itself first
   Re-opening always starts again at step 1 with the name reset to the source.
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  IK.defineIcons({
    /* verbatim from pages/approved/metrics-landing.html */
    'mx-intg-check': { viewBox: '0 0 12 12', inner: '<polyline points="2 6 5 9 10 3"/>' },
    'mx-intg-chevron': '<polyline points="6 9 12 15 18 9"/>'
  });

  function Frame() {
    return h('div', { className: 'ik-mx-intg' },
      h('div', { className: 'ik-mx-intg-row' }, h('div', { className: 'ik-mx-intg-lbl' }, 'Account'), h('div', { className: 'ik-mx-intg-field is-empty' }, 'placeholder')),
      h('div', { className: 'ik-mx-intg-row' }, h('div', { className: 'ik-mx-intg-lbl' }, 'API Key'), h('div', { className: 'ik-mx-intg-field' }, '••••••••••')),
      ['Use Custom Objects', 'Use Custom Fields'].map(function (t) {
        return h('div', { key: t, className: 'ik-mx-intg-check' },
          h('span', { className: 'ik-mx-intg-check-ic' }, h(IK.Icon, { name: 'mx-intg-check', size: 9 })),
          h('span', { className: 'ik-mx-intg-check-lbl' }, t));
      }),
      h('div', { className: 'ik-mx-intg-row' }, h('div', { className: 'ik-mx-intg-lbl' }, 'Metadata Cache'),
        h('div', { className: 'ik-mx-intg-select' }, h('span', null, 'Infinite'), h(IK.Icon, { name: 'mx-intg-chevron', size: 12, className: 'ik-mx-intg-muted' }))));
  }

  IK.MxConnectDialog = function MxConnectDialog(p) {
    var source = p.source || 'New Connection';
    var st = R.useState(1), step = st[0], setStep = st[1];
    var sv = R.useState(false), saving = sv[0], setSaving = sv[1];
    var nm = R.useState(source), name = nm[0], setName = nm[1];
    var ds = R.useState(''), desc = ds[0], setDesc = ds[1];
    var nameRef = R.useRef(null), timer = R.useRef(0);

    R.useEffect(function () {
      if (!p.open) return;
      clearTimeout(timer.current);
      setStep(1); setSaving(false); setName(source); setDesc('');
    }, [p.open, source]);
    R.useEffect(function () { return function () { clearTimeout(timer.current); }; }, []);

    function save1() {
      setSaving(true);
      timer.current = setTimeout(function () {
        setStep(2); setSaving(false);
        setTimeout(function () { if (nameRef.current) nameRef.current.focus(); }, 50);
      }, 1400);
    }
    function create() {
      var label = name.trim() || source || 'Connection';
      if (p.onOpenChange) p.onOpenChange(false);
      if (p.onCreate) p.onCreate(label);
    }

    return h(D.Modal, { open: !!p.open, onOpenChange: p.onOpenChange },
      h(D.ModalContent, { size: 'lg', className: 'ik-mx-wizard', 'aria-describedby': undefined },
        h(D.ModalHeader, { className: 'pe-10' }, h(D.ModalTitle, null, 'New connection')),
        h('div', { className: 'flex flex-none flex-col gap-1.5 pb-3.5' },
          h(D.Typography, { element: 'span', textStyle: 'body12', textColor: 'secondary' }, 'Step ' + step + ' of 2'),
          h(D.ProgressBar, { value: step === 1 ? 50 : 100, size: 'md', rounded: 'full', 'aria-label': 'Step ' + step + ' of 2' })),
        /* the step: 20px under the progress line and above the footer, like the original's step inset */
        h('div', { className: 'flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pt-5 pb-1' },
          step === 1
            ? [h('div', { key: 'src', className: 'flex items-center gap-3' },
                h(D.ConnectorLogo, { connector: source, size: 'sm' }),
                h(D.Typography, { element: 'span', textStyle: 'label14', textColor: 'primary' }, source + ' connection')),
               h(Frame, { key: 'frame' })]
            : [h(D.InputGroup, { key: 'n', size: 'md', label: 'Connection name', inputId: 'ik-mx-conn-name' },
                h(D.InputGroupInput, { ref: nameRef, type: 'text', placeholder: 'Connection name', autoComplete: 'off', value: name, onChange: function (e) { setName(e.target.value); } })),
               h(D.TextArea, {
                 key: 'd', id: 'ik-mx-conn-desc', rows: 4, placeholder: 'What is this connection used for?', value: desc,
                 onChange: function (e) { setDesc(e.target.value); },
                 label: h(IK.Fragment, null, 'Description ', h('span', { className: 'font-normal text-ink-secondary' }, '(optional)'))
               })]),
        h(D.ModalFooter, null,
          step === 1
            ? h(D.Button, { variant: 'primary', size: 'sm', type: 'button', disabled: saving, onClick: save1 }, saving ? 'Saving…' : 'Save')
            : h(D.Button, { variant: 'primary', size: 'sm', type: 'button', onClick: create }, 'Save Connection'))));
  };
})();
