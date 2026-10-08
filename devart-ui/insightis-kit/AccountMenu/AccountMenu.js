/* AccountMenu — the sidebar footer's user row and the account menu it opens (".sbx-user" +
   ".sbx-pop-account"; changes/AccountPopover.md). DevartUI DropdownMenu above the row:

     ACCOUNT   My account · Manage plan · Billing · Balance      → user_profile-modal ?section=…
     SUPPORT   Leave feedback · Resources ↗                       (Resources opens a new tab)
     Theme     Light · Dark · System — DevartUI SegmentedControl (sm), bound to IK.setTheme.
               System follows the OS (prefers-color-scheme) and keeps following it.
               The whole control is ONE menu item: ↑/↓ reach it like any row, ←/→ (or Enter)
               change the theme, so it is keyboard-reachable inside the menu's roving focus.
     Log out

   IK.AccountMenu
     name       'Kateryna K.'      initial  'K'      role  'Admin'
     plan       'free' | 'paid'    default IK.usePlan() → the meta line "Admin · Free" / "Admin · Pro"
     collapsed  true → the row is the avatar alone (icon rail) and the menu opens to the RIGHT
     side / align                  default 'top' / 'start' ('right' / 'end' when collapsed)
     onLogOut, resourcesHref       optional
     iconSet    'classic' → the older glyphs chat_page-landing still draws (Balance, Leave
                feedback, Resources, Dark, System) — that page's copy of the menu drifted
     defaultOpen / open / onOpenChange
     sideOffset  default: 4px above the sidebar FOOTER when opening upward (IK.sidebarFooterOffset)
   IK.UserRow   the trigger alone (avatar, name, meta, ⇕). Spreads props + ref (asChild-safe).
     name, initial, meta, collapsed

   <IK.AccountMenu />                     // in the sidebar footer (IK.AppSidebar renders it)
   <IK.AccountMenu collapsed />           // icon rail
*/
(function () {
  'use strict';
  var IK = window.InsightisKit, D = window.DevartUI, R = window.React, h = IK.h;

  /* Verbatim from the original .sbx-pop-account / .sbx-user markup. */
  IK.defineIcons({
    'acct-user': '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
    'acct-plan': '<rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/>',
    'acct-billing': '<rect width="20" height="12" x="2" y="6" rx="2"/><circle cx="12" cy="12" r="2"/><path d="M6 12h.01M18 12h.01"/>',
    'acct-feedback': '<path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/><path d="M7.5 9.5c0 .687.265 1.383.697 1.844l3.009 3.264a1.14 1.14 0 0 0 .407.314 1 1 0 0 0 .783-.004 1.14 1.14 0 0 0 .398-.31l3.008-3.264A2.77 2.77 0 0 0 16.5 9.5 2.5 2.5 0 0 0 12 8a2.5 2.5 0 0 0-4.5 1.5"/>',
    'acct-resources': '<path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M12 17h.01"/><path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3"/>',
    'arrow-up-right': '<path d="M7 7h10v10"/><path d="m7 17 10-10"/>',
    'theme-dark': '<path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>',
    'theme-system': '<path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"/><path d="M10 19v-3.96 3.15"/><path d="M7 19h5"/><rect width="6" height="10" x="16" y="12" rx="2"/>',
    'log-out': '<path d="m16 17 5-5-5-5"/><path d="M21 12H9"/><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>',
    'chevrons-up-down': '<path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>',
    /* iconSet 'classic' — verbatim from chat_page-landing.html's older copy of this menu */
    'acct-balance-classic': '<path d="M19 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2"/><path d="M3 5a2 2 0 0 0 2 2h15a1 1 0 0 1 1 1v4h-4a2 2 0 0 0 0 4h4v2a1 1 0 0 1-1 1H5a2 2 0 0 1-2-2z"/>',
    'acct-feedback-classic': '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M9 10h6"/><path d="M9 14h4"/>',
    'acct-resources-classic': '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>',
    'theme-system-classic': '<path d="M5.5 20H8"/><path d="M17 9h.01"/><rect width="10" height="16" x="12" y="4" rx="2"/><path d="M8 6H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4"/><circle cx="17" cy="15" r="1"/>'
  });
  var CLASSIC = { 'wallet': 'acct-balance-classic', 'acct-feedback': 'acct-feedback-classic', 'acct-resources': 'acct-resources-classic', 'theme-dark': 'moon', 'theme-system': 'theme-system-classic' };
  function glyph(set, name) { return set === 'classic' && CLASSIC[name] ? CLASSIC[name] : name; }

  /* ── Theme mode: Light / Dark / System ─────────────────────────────────────────────────────
     IK.setTheme stores 'light' | 'dark' (that is what DevartUI reads). "System" is a MODE on top
     of it, remembered beside it, and re-applied whenever the OS flips or a page loads. */
  var MODE_KEY = 'insightis.themeMode';
  var mq = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  function sysTheme() { return mq && mq.matches ? 'dark' : 'light'; }
  function readMode() { try { return localStorage.getItem(MODE_KEY) === 'system' ? 'system' : null; } catch (e) { return null; } }
  function writeMode(m) { try { if (m === 'system') localStorage.setItem(MODE_KEY, 'system'); else localStorage.removeItem(MODE_KEY); } catch (e) {} }
  if (readMode() === 'system' && IK.getTheme() !== sysTheme()) IK.setTheme(sysTheme());
  if (mq && mq.addEventListener) mq.addEventListener('change', function () { if (readMode() === 'system') IK.setTheme(sysTheme()); });

  IK.useThemeMode = function () {
    var th = IK.useTheme(), theme = th[0];
    var s = R.useState(readMode()), sys = s[0], setSys = s[1];
    /* A Light/Dark switch elsewhere (the ReviewBar) that disagrees with the OS ends System mode. */
    R.useEffect(function () { if (sys === 'system' && theme !== sysTheme()) { writeMode(null); setSys(null); } }, [theme]);
    var mode = sys === 'system' ? 'system' : theme;
    function set(m) {
      writeMode(m);
      setSys(m === 'system' ? 'system' : null);
      IK.setTheme(m === 'system' ? sysTheme() : m);
    }
    return [mode, set];
  };

  var THEMES = [
    { value: 'light', label: 'Light', icon: 'sun' },
    { value: 'dark', label: 'Dark', icon: 'theme-dark' },
    { value: 'system', label: 'System', icon: 'theme-system' }
  ];

  IK.UserRow = function UserRow(p) {
    var rest = Object.assign({}, p);
    ['name', 'initial', 'meta', 'collapsed', 'className'].forEach(function (k) { delete rest[k]; });
    var avatar = h(D.Avatar, { size: 'xs', className: 'shrink-0' }, h(D.AvatarFallback, { rounded: 'full', className: 'text-xs font-semibold' }, p.initial));
    if (p.collapsed) {
      return h('button', Object.assign({ type: 'button', 'aria-label': p.name + ' — account' }, rest, {
        className: IK.cx('inline-flex size-8 items-center justify-center rounded-md transition-colors duration-fast hover:bg-state-hover pressed:bg-state-pressed', D.focusRing, p.className)
      }), avatar);
    }
    return h('button', Object.assign({ type: 'button' }, rest, {
      className: IK.cx('flex w-full items-center gap-2 rounded-md p-1 text-left transition-colors duration-fast hover:bg-state-hover pressed:bg-state-pressed', D.focusRing, p.className)
    }),
      avatar,
      /* name 12/600 over a 1px gap over the meta line 10/400 (.sbx-user-info / -meta) */
      h('span', { className: 'flex min-w-0 flex-1 flex-col gap-px' },
        h(D.Typography, { element: 'span', textStyle: 'title12', textColor: 'primary', className: 'truncate' }, p.name),
        h('span', { className: 'truncate text-xxs leading-4 font-normal text-ink-secondary' }, p.meta)),
      h(IK.Icon, { name: 'chevrons-up-down', size: 14, className: 'text-ink-body opacity-70' }));
  };

  function Row(p) {
    var inner = [h(IK.Icon, { key: 'i', name: glyph(p.set, p.icon), size: 16, className: 'text-ink-secondary' }), h('span', { key: 't', className: 'min-w-0 flex-1 truncate' }, p.label)];
    if (p.ext) inner.push(h(IK.Icon, { key: 'x', name: 'arrow-up-right', size: 14, className: 'text-ink-secondary' }));
    if (p.href) {
      return h(D.DropdownMenuItem, { asChild: true },
        h('a', { href: p.href, target: p.ext ? '_blank' : undefined, rel: p.ext ? 'noopener' : undefined,
                 'aria-label': p.ext ? p.label + ' (opens in new tab)' : undefined }, inner));
    }
    return h(D.DropdownMenuItem, { onSelect: p.onSelect, 'aria-label': p.ext ? p.label + ' (opens in new tab)' : undefined }, inner);
  }

  /* The theme switch as ONE menu item — see the header. */
  function ThemeItem(tp) {
    var tm = IK.useThemeMode(), mode = tm[0], setMode = tm[1];
    var i = Math.max(0, THEMES.map(function (t) { return t.value; }).indexOf(mode));
    function step(d) { setMode(THEMES[(i + d + THEMES.length) % THEMES.length].value); }
    /* Pointer on a segment selects THAT segment: its pointer events stop at the segment so the
       row (a Radix menu item, which would treat the press as "select the item" → next theme)
       never sees them. */
    function own(e) { e.stopPropagation(); }
    return h(D.DropdownMenuItem, {
      className: 'ik-theme-item px-1 py-1',
      'aria-label': 'Theme: ' + THEMES[i].label + '. Left and right arrows change it.',
      onSelect: function (e) { e.preventDefault(); step(1); },
      onKeyDown: function (e) {
        if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
        else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
      }
    },
      h(D.SegmentedControl, { value: mode, onValueChange: setMode, size: 'sm', className: 'w-full' },
        h(D.SegmentedControlList, { 'aria-hidden': 'true', className: 'flex w-full' },
          THEMES.map(function (t) {
            /* The tooltip hangs on a wrapper: a Tooltip trigger's own data-state would overwrite
               the segment's data-state="active" and the active pill would never paint. */
            return h(IK.Tip, { key: t.value, tip: t.label },
              h('span', { className: 'flex flex-1' },
                h(D.SegmentedControlTrigger, { value: t.value, tabIndex: -1, 'aria-label': t.label,
                  onPointerDown: own, onPointerUp: own,
                  /* No focus on press: focus stays on the menu item (the segments are a pointer
                     shortcut inside an aria-hidden group; the item is what assistive tech reads). */
                  onMouseDown: function (e) { e.preventDefault(); },
                  onClick: function (e) { e.stopPropagation(); setMode(t.value); } },
                  h(IK.Icon, { name: glyph(tp.set, t.icon), size: 12 }))));
          }))));
  }

  /* The sidebar footer's two panels (this menu and IK.BalancePopover) hang 4px above the FOOTER,
     not above their own row (.sbx-pop-account / .sbx-pop-tokens: bottom calc(100% + 4px) of
     .sbx-foot) — so the Balance row stays in view under the account menu. Offset = the trigger's
     distance below the footer's top edge + 4. Outside a sidebar footer: 4. */
  IK.sidebarFooterOffset = function (el) {
    var f = el && el.closest && el.closest('[data-sidebar=footer]');
    return f ? Math.round(el.getBoundingClientRect().top - f.getBoundingClientRect().top) + 4 : 4;
  };

  IK.AccountMenu = function AccountMenu(p) {
    var trig = R.useRef(null);
    var os = R.useState(!!p.defaultOpen), ownOpen = os[0], setOwnOpen = os[1];
    var planS = IK.usePlan()[0];
    var plan = p.plan || planS;
    var name = p.name || 'Kateryna K.', role = p.role || 'Admin';
    var meta = role + ' · ' + (plan === 'free' ? 'Free' : 'Pro');
    var sec = function (s) { return IK.pageHref('approved/user_profile-modal.html?section=' + s); };
    var open = p.open != null ? p.open : ownOpen;
    var ctl = { open: open, onOpenChange: function (v) { setOwnOpen(v); if (p.onOpenChange) p.onOpenChange(v); } };
    var side = p.side || (p.collapsed ? 'right' : 'top');
    return h(D.DropdownMenu, ctl,
      h(D.DropdownMenuTrigger, { asChild: true },
        h(IK.UserRow, { ref: trig, name: name, initial: p.initial || name.charAt(0), meta: meta, collapsed: p.collapsed, className: p.className })),
      h(D.DropdownMenuContent, {
        side: side, align: p.align || (p.collapsed ? 'end' : 'start'),
        sideOffset: p.sideOffset != null ? p.sideOffset : (side === 'top' && open ? IK.sidebarFooterOffset(trig.current) : 4),
        className: 'w-60', 'aria-label': 'Account'
      },
        h(D.DropdownMenuGroup, null,
          h(D.DropdownMenuLabel, null, 'Account'),
          h(Row, { icon: 'acct-user', label: 'My account', href: sec('my-account') }),
          h(Row, { icon: 'acct-plan', label: 'Manage plan', href: sec('manage-plan') }),
          h(Row, { icon: 'acct-billing', label: 'Billing', href: sec('billing') }),
          h(Row, { icon: 'wallet', label: 'Balance', href: sec('balance'), set: p.iconSet })),
        h(D.DropdownMenuGroup, null,
          h(D.DropdownMenuLabel, null, 'Support'),
          h(Row, { icon: 'acct-feedback', label: 'Leave feedback', href: sec('leave-feedback'), set: p.iconSet }),
          h(Row, { icon: 'acct-resources', label: 'Resources', ext: true, href: p.resourcesHref, set: p.iconSet })),
        h(ThemeItem, { set: p.iconSet }),
        h(Row, { icon: 'log-out', label: 'Log out', onSelect: p.onLogOut })));
  };
})();
