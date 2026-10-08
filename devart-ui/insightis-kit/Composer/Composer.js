/* Composer — the chat prompt card and everything in its tools row (".cl-composer" and the
   composer-menu set ".cl-attach-menu" / ".cl-conn-menu" / ".cl-model-menu" in the original;
   page-changes/chat-landing.md is the contract). One component for every chat screen.

     [file chip]                       one attached file (name + size + ✕), above the prompt
     prompt                            'text' → a <textarea>; 'rich' → IK.ChatPrompt (@-mentions)
     [📎] [⧉ Connections ˅] [🧠 Insightis Light (Medium) ˅]                 [➤ Send]

   Attach   IconButton (tertiary sm) → DropdownMenu: Choose File (accent row) · Recent files.
            Tooltip "Attach file", hidden while the menu is open. One file only: once a file is
            attached the button goes aria-disabled and tips "Only one file allowed".
   Conns    the connections the chat may use: logo · name · Switch (the row toggles, the menu
            stays open) · Manage Connections. Free: the trigger is locked (padlock replaces its
            glyph, reads disabled, hover/click → the connections upgrade popover, never opens).
   Model    Insightis Light / Medium / Pro (check on the chosen one) · Thinking (Switch + info
            tip) · Effort (StepSlider Low/Medium/High). Thinking gates Effort: off → the Effort
            row is disabled IN PLACE and tips "Turn on Thinking to set effort"; the trigger
            reads "Insightis Light (Medium)" and drops the level when thinking is off.
            Free: Medium / Pro are locked rows (padlock trails, their own upgrade popover). A
            locked model cannot stay selected: the plan flipping to Free moves the choice back to
            Light and says so in a toast (C8) — the page must render one D.Toaster.
   Async lists (Recent files, Connections) paint a skeleton first and resolve to `popState`
   650 ms later; changing popState while a menu is open re-renders it at once. Every state
   keeps the menu chrome (Choose File / Recent files / Manage Connections) so nothing jumps.
     loading — 3 skeleton rows · empty — StatusView xs (Free connections: the upsell + CTA)
     filled — 3 rows · scroll — 12 rows in a scroller capped to the room above the trigger.

   h(IK.Composer, {
     prompt: 'text' | 'rich',        default 'text'
     value, onValueChange,           the text prompt, controlled (optional — uncontrolled otherwise)
     promptRef,                      ref to the <textarea> / editable element (focus from outside)
     placeholder,                    default 'Ask anything about your data…' (rich: '…, or type @ to reference a metric…')
     metrics, seed,                  rich only → IK.ChatPrompt (seed: aliases pre-inserted, ['mrr'])
     popState: 'loading' | 'empty' | 'filled' | 'scroll'   default 'filled' (design-review switch)
     plan,                           'paid' | 'free', default IK.usePlan()
     attachment, onAttachmentChange, the attached file name (null = none); uncontrolled if omitted
     sendHref, onSend,               Send navigates / calls back
     sendLabelCollapse: true,        < 480px Send becomes icon-only (landing) — false keeps "Send"
     sendIdle: 'disabled' | 'filled' an empty prompt: the disabled Send (landing) or Send keeping
                                     its brand fill, inert (the chat page)
     modelIcon: 'model' | 'model-brain'   the trigger glyph (the two chat pages draw different ones)
     className
   })

   Parts, for stories and other hosts: IK.ComposerAttach, IK.ComposerConnections,
   IK.ComposerModel, IK.ComposerFileChip, IK.ComposerSend, IK.composerFileSize(name).
   Data: IK.COMPOSER_FILES, IK.COMPOSER_CONNECTIONS, IK.COMPOSER_MODELS, IK.EFFORT_LEVELS. */
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  /* Verbatim from the original composer markup. */
  IK.defineIcons({
    'cmp-attach': '<path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>',
    'cmp-chevron': '<polyline points="6 9 12 15 18 9"/>',
    'cmp-send': '<line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>',
    'cmp-upload': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>',
    'cmp-file-row': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
    'cmp-file-chip': '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/>',
    'cmp-x': '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>',
    'cmp-gear': '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/>',
    'cmp-check': '<polyline points="20 6 9 17 4 12"/>',
    /* chat_page-landing's model trigger draws lucide's newer brain */
    'model-brain': '<path d="M12 18V5"/><path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4"/><path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5"/><path d="M17.997 5.125a4 4 0 0 1 2.526 5.77"/><path d="M18 18a4 4 0 0 0 2-7.464"/><path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517"/><path d="M6 18a4 4 0 0 1-2-7.464"/><path d="M6.003 5.125a4 4 0 0 0-2.526 5.77"/>'
  });

  IK.COMPOSER_CONNECTIONS = [
    { logo: 'PostgreSQL', name: 'Production DB', on: true },
    { logo: 'Salesforce', name: 'Main CRM', on: true },
    { logo: 'HubSpot', name: 'Marketing Hub', on: false },
    { logo: 'PostgreSQL', name: 'Analytics DW', on: true },
    { logo: 'PostgreSQL', name: 'Billing DB', on: false },
    { logo: 'Salesforce', name: 'Sales Sandbox', on: false },
    { logo: 'HubSpot', name: 'Support Tickets', on: true },
    { logo: 'PostgreSQL', name: 'Inventory DB', on: false },
    { logo: 'PostgreSQL', name: 'Web Event Logs', on: true },
    { logo: 'Salesforce', name: 'Partner CRM', on: false },
    { logo: 'HubSpot', name: 'Product Catalog', on: false },
    { logo: 'PostgreSQL', name: 'User Directory', on: false }
  ];
  IK.COMPOSER_FILES = ['Q3-revenue.csv', 'customers-export.xlsx', 'churn-analysis.pdf', 'ad-spend-2024.xlsx', 'cohort-retention.csv', 'nps-survey-q3.pdf', 'pipeline-q4.xlsx', 'refunds-2024.csv', 'sessions-raw.csv', 'ltv-model.xlsx', 'campaign-utm.csv', 'forecast-2025.pdf'];
  /* Each locked model names itself in its own upgrade popover (Free has Light only). */
  IK.COMPOSER_MODELS = [
    { name: 'Insightis Light' },
    { name: 'Insightis Medium', feature: 'model-medium' },
    { name: 'Insightis Pro', feature: 'model-pro' }
  ];
  IK.EFFORT_LEVELS = ['Low', 'Medium', 'High'];
  var LOAD_MS = 650;

  /* Deterministic mock size from the name — the same file always reads the same size. */
  IK.composerFileSize = function (name) {
    var s = 0; for (var i = 0; i < name.length; i++) s += name.charCodeAt(i);
    return ((s % 180) / 10 + 2).toFixed(1) + ' KB';
  };

  /* An async list: skeleton on every open, then the target state. */
  function useListPhase(open, popState) {
    var s = R.useState('loading'), phase = s[0], setPhase = s[1];
    var first = R.useRef(true);
    R.useEffect(function () {
      if (!open) { first.current = true; return; }
      setPhase('loading');
      if (popState === 'loading') return;
      var t = setTimeout(function () { first.current = false; setPhase(popState); }, LOAD_MS);
      return function () { clearTimeout(t); };
    }, [open]);
    /* The switch moved while the menu is open → straight to the new state, no second skeleton. */
    R.useEffect(function () { if (open) { first.current = false; setPhase(popState); } }, [popState]);
    return phase;
  }

  /* The scroller in the Scrolling state is capped to the room above its trigger (the menu opens
     upward and must never slide under the review bar): clamp(112, space − chrome, 320). */
  function useFitScroll(scrollRef, menuRef, triggerRef, deps) {
    R.useLayoutEffect(function () {
      var sc = scrollRef.current, menu = menuRef.current, trig = triggerRef.current;
      if (!sc || !menu || !trig) return;
      sc.style.maxHeight = 'none';
      var avail = trig.getBoundingClientRect().top - 56;
      var chrome = menu.offsetHeight - sc.offsetHeight;
      sc.style.maxHeight = Math.max(112, Math.min(avail - chrome, 320)) + 'px';
    }, deps);
  }

  /* ── Triggers ─────────────────────────────────────────────────────────────────────────── */
  /* A composer dropdown trigger: tertiary Button, leading glyph, label, chevron that turns
     while the menu is open. Spreads props + ref (asChild-safe). */
  var Trigger = R.forwardRef(function Trigger(p, ref) {
    var rest = Object.assign({}, p);
    ['icon', 'label', 'locked', 'className'].forEach(function (k) { delete rest[k]; });
    return h(D.Button, Object.assign({ ref: ref, type: 'button', variant: 'tertiary', size: 'sm' }, rest, {
      className: IK.cx('ik-cmp-trigger', p.className),
      leftSlot: typeof p.icon === 'string' ? h(IK.Icon, { name: p.icon }) : p.icon,
      rightSlot: h(IK.Icon, { name: 'cmp-chevron', className: IK.cx('ik-cmp-chev', !p.locked && 'text-ink-secondary') })
    }), h('span', { className: 'ik-cmp-trigger-lbl' }, p.label));
  });

  /* ── Rows ─────────────────────────────────────────────────────────────────────────────── */
  function SkelConnRow(p) {
    return h('div', { className: 'ik-cmp-skel-row is-conn', 'aria-hidden': 'true' },
      h(D.Skeleton, { rounded: 'full', className: 'size-6 shrink-0' }),
      h('span', { className: 'ik-cmp-skel-text' }, h(D.Skeleton, { className: 'ik-cmp-skel-bar w-32' })),
      h(D.Skeleton, { rounded: 'full', className: 'ik-cmp-skel-swt' }));
  }
  function SkelFileRow() {
    /* The original's file skeleton carries a sized-less icon placeholder (0×0) before its bar;
       the row keeps that gap. */
    return h('div', { className: 'ik-cmp-skel-row', 'aria-hidden': 'true' },
      h('span', { className: 'ik-cmp-skel-ic' }),
      h('span', { className: 'ik-cmp-skel-text' }, h(D.Skeleton, { className: 'ik-cmp-skel-bar w-36' })));
  }
  function Skels(p) { var out = []; for (var i = 0; i < 3; i++) out.push(h(p.row, { key: i })); return out; }

  function MenuEmpty(p) {
    return h(D.StatusView, {
      size: 'xs', surface: 'embedded', tone: 'muted',
      icon: h(IK.Icon, { name: p.icon }), title: p.title, description: p.description, actions: p.actions
    });
  }

  /* ── Attach ───────────────────────────────────────────────────────────────────────────── */
  IK.ComposerAttach = function ComposerAttach(p) {
    var o = R.useState(!!p.defaultOpen), open = o[0], setOpen = o[1];
    var t = R.useState(false), tip = t[0], setTip = t[1];
    var phase = useListPhase(open, p.popState || 'filled');
    var disabled = !!p.disabled;
    var trigRef = R.useRef(null), menuRef = R.useRef(null), scRef = R.useRef(null);
    useFitScroll(scRef, menuRef, trigRef, [phase, open]);
    var files = IK.COMPOSER_FILES;
    function pick(name) { setOpen(false); if (p.onPick) p.onPick(name); }
    var list;
    if (phase === 'loading') list = Skels({ row: SkelFileRow });
    else if (phase === 'empty') list = h(MenuEmpty, { icon: 'cmp-file-row', title: 'No recent files', description: 'Upload a file to use it in this chat' });
    else {
      var rows = (phase === 'scroll' ? files : files.slice(0, 3)).map(function (f) {
        return h(D.DropdownMenuItem, { key: f, onSelect: function () { pick(f); } },
          h(IK.Icon, { name: 'cmp-file-row', className: 'text-ink-secondary' }),
          h('span', { className: 'min-w-0 flex-1 truncate text-ink-primary' }, f));
      });
      list = phase === 'scroll' ? h('div', { ref: scRef, className: 'ik-cmp-scroll' }, rows) : rows;
    }
    var btn = h(D.IconButton, {
      ref: trigRef, variant: 'tertiary', size: 'sm', type: 'button',
      'aria-label': 'Attach file', 'aria-disabled': disabled ? 'true' : undefined,
      onClick: disabled ? function (e) { e.preventDefault(); } : undefined
    }, h(IK.Icon, { name: 'cmp-attach' }));
    return h(D.DropdownMenu, { open: open && !disabled, onOpenChange: function (v) { if (!disabled) setOpen(v); if (v) setTip(false); }, modal: false },
      h(D.Tooltip, { open: tip && !open, onOpenChange: setTip },
        h(D.TooltipTrigger, { asChild: true },
          disabled ? btn : h(D.DropdownMenuTrigger, { asChild: true }, btn)),
        h(D.TooltipContent, { side: 'top' }, disabled ? 'Only one file allowed' : 'Attach file')),
      h(D.DropdownMenuContent, { ref: menuRef, side: 'top', align: 'start', sideOffset: 8, className: 'w-64', onOpenAutoFocus: p.defaultOpen ? function (e) { e.preventDefault(); } : undefined },
        h(D.DropdownMenuItem, { variant: 'accent', onSelect: function () { pick('data-upload.csv'); } },
          h(IK.Icon, { name: 'cmp-upload' }), 'Choose File'),
        h(D.DropdownMenuSeparator, null),
        h(D.DropdownMenuLabel, null, 'Recent files'),
        list));
  };

  /* ── Connections ──────────────────────────────────────────────────────────────────────── */
  function ConnRow(p) {
    var c = p.conn;
    var item = h(D.DropdownMenuItem, {
      className: 'ik-cmp-conn-row',
      onSelect: function (e) { e.preventDefault(); if (!p.locked) p.onToggle(c.name); }
    },
      h(D.ConnectorLogo, { connector: c.logo, size: 'xs', label: c.logo + ' logo' }),
      h('span', { className: 'ik-cmp-name min-w-0 flex-1 truncate font-medium text-ink-primary' }, c.name),
      h(D.Switch, { size: 'sm', checked: !p.locked && !!p.on, tabIndex: -1, 'aria-label': 'Use ' + c.name + ' in this chat', className: 'ms-auto', onClick: function (e) { e.preventDefault(); } }));
    if (!p.locked) return item;
    return h(IK.Locked, { feature: 'connections', locked: true }, item);
  }

  IK.ComposerConnections = function ComposerConnections(p) {
    var plan = p.plan || IK.usePlan()[0];
    var free = plan === 'free';
    var o = R.useState(!!p.defaultOpen), open = o[0], setOpen = o[1];
    var st = R.useState(function () {
      var m = {}; IK.COMPOSER_CONNECTIONS.forEach(function (c) { m[c.name] = c.on; }); return m;
    }), on = st[0], setOn = st[1];
    var phase = useListPhase(open, p.popState || 'filled');
    var trigRef = R.useRef(null), menuRef = R.useRef(null), scRef = R.useRef(null);
    useFitScroll(scRef, menuRef, trigRef, [phase, open]);
    function toggle(name) { setOn(function (prev) { var n = Object.assign({}, prev); n[name] = !prev[name]; return n; }); }

    var list, scrolling = phase === 'scroll';
    if (phase === 'loading') list = Skels({ row: SkelConnRow });
    else if (phase === 'empty') {
      list = free
        /* U5 — on Free the empty state is not "you have none yet" but "this is what the paid plan
           does": the upsell names the feature and its button is the way to it. */
        ? h(MenuEmpty, { icon: 'connections', title: 'Connections are on paid plans',
            description: 'Ask about live data from your tools, not just uploaded files',
            actions: h(IK.Locked, { feature: 'connections', locked: true, clickOnly: true, marker: 'none' },
              h(D.Button, { variant: 'primary', size: 'sm', type: 'button' }, 'Upgrade to Unlock')) })
        : h(MenuEmpty, { icon: 'connections', title: 'No connections yet', description: 'Connect a source to use it in this chat' });
    } else {
      var rows = (scrolling ? IK.COMPOSER_CONNECTIONS : IK.COMPOSER_CONNECTIONS.slice(0, 3)).map(function (c) {
        return h(ConnRow, { key: c.name, conn: c, on: on[c.name], locked: free, onToggle: toggle });
      });
      list = scrolling ? h('div', { ref: scRef, className: 'ik-cmp-scroll' }, rows) : rows;
    }

    function trigger(extra) {
      return h(Trigger, Object.assign({ ref: trigRef, icon: 'connections', label: 'Connections' }, extra));
    }
    var trig = free
      ? h(IK.Locked, { feature: 'connections', locked: true, menuTrigger: true, look: 'disabled', side: 'top' }, function (lock) {
          return h(D.DropdownMenuTrigger, Object.assign({ asChild: true }, lock.props),
            trigger({ icon: lock.glyph, locked: true }));
        })
      : h(D.DropdownMenuTrigger, { asChild: true }, trigger());

    return h(D.DropdownMenu, { open: open && !free, onOpenChange: function (v) { if (!free || !v) setOpen(v); }, modal: false },
      trig,
      h(D.DropdownMenuContent, { ref: menuRef, side: 'top', align: 'start', sideOffset: 8, className: 'w-64', onOpenAutoFocus: p.defaultOpen ? function (e) { e.preventDefault(); } : undefined },
        list,
        h(D.DropdownMenuSeparator, { className: scrolling ? undefined : 'ik-cmp-conn-sep' }),
        h(D.DropdownMenuItem, { variant: 'accent', asChild: true },
          h('a', { href: IK.pageHref ? IK.pageHref('approved/data-sources_connections-landing.html') : '#' },
            h('span', { className: 'ik-cmp-lead' }, h(IK.Icon, { name: 'cmp-gear' })), 'Manage Connections'))));
  };

  /* ── Model ────────────────────────────────────────────────────────────────────────────── */
  IK.ComposerModel = function ComposerModel(p) {
    var plan = p.plan || IK.usePlan()[0];
    var free = plan === 'free';
    var o = R.useState(!!p.defaultOpen), open = o[0], setOpen = o[1];
    var model = p.model, thinking = p.thinking, effort = p.effort;

    var rows = IK.COMPOSER_MODELS.map(function (m) {
      var checked = m.name === model;
      var locked = free && !!m.feature;
      var item = h(D.DropdownMenuItem, {
        key: m.name, role: 'menuitemradio', 'aria-checked': checked ? 'true' : 'false',
        onSelect: function () { if (!locked) p.onModel(m.name); }
      },
        h('span', { className: 'ik-cmp-name min-w-0 flex-1 truncate font-medium text-ink-primary' }, m.name),
        h(IK.Icon, { name: 'cmp-check', className: IK.cx('text-ink-highlight', !checked && 'opacity-0') }));
      return locked ? h(IK.Locked, { key: m.name, feature: m.feature, locked: true }, item) : item;
    });

    var effortRow = h(D.DropdownMenuRow, {
      className: IK.cx('ik-cmp-opt', !thinking && 'is-disabled')
    },
      h('span', { className: 'ik-cmp-opt-lbl' }, 'Effort ', h('span', { className: 'ik-cmp-opt-val' }, '(' + effort + ')')),
      h(D.StepSlider, {
        size: 'sm', 'aria-label': 'Effort', disabled: !thinking, showStepTooltips: true,
        steps: IK.EFFORT_LEVELS.map(function (l) { return { value: l, label: l }; }),
        value: effort, onValueChange: p.onEffort, className: 'ik-cmp-steps'
      }));

    return h(D.DropdownMenu, { open: open, onOpenChange: setOpen, modal: false },
      h(D.DropdownMenuTrigger, { asChild: true },
        h(Trigger, { icon: p.icon || 'model', label: [model, thinking ? h('span', { key: 'v', className: 'ik-cmp-trigger-val' }, ' (' + effort + ')') : null] })),
      h(D.DropdownMenuContent, { side: 'top', align: 'start', sideOffset: 8, className: 'w-64', onOpenAutoFocus: p.defaultOpen ? function (e) { e.preventDefault(); } : undefined },
        rows,
        h(D.DropdownMenuSeparator, null),
        h(D.DropdownMenuRow, { className: 'ik-cmp-opt' },
          h('span', { className: 'ik-cmp-opt-lbl' }, 'Thinking',
            h(IK.Tip, { tip: 'Turn on to receive smarter answers. Higher effort means more thorough answers but higher credit usage' },
              h('span', { className: 'ik-cmp-info', role: 'img', 'aria-label': 'Turn on to receive smarter answers. Higher effort means more thorough answers but higher credit usage' },
                h(IK.Icon, { name: 'info', size: 14 })))),
          h(D.Switch, { size: 'sm', checked: thinking, 'aria-label': 'Thinking', onCheckedChange: p.onThinking })),
        thinking ? effortRow : h(IK.Tip, { tip: 'Turn on Thinking to set effort' }, effortRow)));
  };

  /* ── File chip ────────────────────────────────────────────────────────────────────────── */
  IK.ComposerFileChip = function ComposerFileChip(p) {
    return h('div', { className: 'ik-cmp-chip' },
      h(D.File, {
        name: p.name, fileSize: p.size || IK.composerFileSize(p.name),
        icon: h(IK.Icon, { name: 'cmp-file-chip', size: 20, className: 'shrink-0 text-brand-primary' }),
        rightSlot: h(IK.Tip, { tip: 'Remove file' },
          h(D.IconButton, { variant: 'tertiary', size: '2xs', type: 'button', 'aria-label': 'Remove file', onClick: p.onRemove },
            h(IK.Icon, { name: 'cmp-x' })))
      }));
  };

  /* ── Send ─────────────────────────────────────────────────────────────────────────────── */
  IK.ComposerSend = function ComposerSend(p) {
    var empty = !p.ready;
    var filledIdle = p.idle === 'filled';
    var props = {
      variant: 'primary', size: 'sm', type: 'button', 'aria-label': 'Send message',
      className: IK.cx('ik-cmp-send', empty && filledIdle && 'pointer-events-none'),
      disabled: empty && !filledIdle ? true : undefined,
      'aria-disabled': empty && filledIdle ? 'true' : undefined,
      leftSlot: h(IK.Icon, { name: 'cmp-send' }),
      onClick: empty ? undefined : function (e) { if (p.onClick) p.onClick(e); if (p.href) location.href = p.href; }
    };
    var label = p.collapse === false ? 'Send' : h('span', { className: 'ik-cmp-send-lbl' }, 'Send');
    return h(D.Button, props, label);
  };

  /* ── The card ─────────────────────────────────────────────────────────────────────────── */
  IK.Composer = function Composer(p) {
    var plan = p.plan || IK.usePlan()[0];
    var rich = p.prompt === 'rich';
    var tv = R.useState(p.defaultValue || ''), textOwn = tv[0], setTextOwn = tv[1];
    var text = p.value != null ? p.value : textOwn;
    function setText(v) { if (p.value == null) setTextOwn(v); if (p.onValueChange) p.onValueChange(v); }
    var rv = R.useState(false), richHas = rv[0], setRichHas = rv[1];

    var af = R.useState(p.attachment || null), fileOwn = af[0], setFileOwn = af[1];
    var file = p.attachment !== undefined && p.onAttachmentChange ? p.attachment : fileOwn;
    function setFile(v) { setFileOwn(v); if (p.onAttachmentChange) p.onAttachmentChange(v); }

    var ms = R.useState('Insightis Light'), model = ms[0], setModel = ms[1];
    var ts = R.useState(true), thinking = ts[0], setThinking = ts[1];
    var es = R.useState('Medium'), effort = es[0], setEffort = es[1];

    /* C8 — a paid model cannot stay selected on Free: back to Light, said once in a toast. */
    R.useEffect(function () {
      if (plan !== 'free') return;
      var m = IK.COMPOSER_MODELS.filter(function (x) { return x.name === model; })[0];
      if (!m || !m.feature) return;
      setModel('Insightis Light');
      if (D.toast) D.toast.info(h('span', null, 'Switched to ', h('strong', null, 'Insightis Light')),
        { id: 'cl-c8', description: model + ' is on a paid plan. Light answers this chat until you upgrade.' });
    }, [plan]);

    var placeholder = p.placeholder || (rich ? 'Ask anything about your data, or type @ to reference a metric…' : 'Ask anything about your data…');
    var prompt = rich
      ? h(IK.ChatPrompt, { ref: p.promptRef, placeholder: placeholder, metrics: p.metrics, seed: p.seed, plan: plan, onContentChange: setRichHas })
      : h('textarea', {
          ref: p.promptRef, className: 'ik-cmp-prompt', rows: 2, placeholder: placeholder, value: text,
          onChange: function (e) { setText(e.target.value); }
        });
    var ready = rich ? richHas : !!(text && text.trim());

    return h('div', { className: IK.cx('ik-composer', p.className) },
      file ? h(IK.ComposerFileChip, { name: file, onRemove: function () { setFile(null); } }) : null,
      prompt,
      h('div', { className: 'ik-cmp-foot' },
        h('div', { className: 'ik-cmp-tools' },
          h(IK.ComposerAttach, { popState: p.popState, disabled: !!file, onPick: setFile }),
          h(IK.ComposerConnections, { popState: p.popState, plan: plan }),
          h(IK.ComposerModel, {
            plan: plan, icon: p.modelIcon, model: model, thinking: thinking, effort: effort,
            onModel: setModel, onThinking: setThinking, onEffort: setEffort
          })),
        h(IK.ComposerSend, {
          ready: ready, idle: p.sendIdle, collapse: p.sendLabelCollapse !== false,
          href: p.sendHref, onClick: p.onSend
        })));
  };
})();
